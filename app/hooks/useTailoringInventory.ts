import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useTailoringInventoryStore } from "~/stores/useTailoringInventory";
import TailoringInventoryService from "~/services/tailoringInventory.service";

const formSchema = z.object({
  date: z.date(),
  material: z.string().min(1, { message: "Material is required" }),
  tailors: z.string().min(1, { message: "Tailors is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  yard: z.string().min(1, { message: "Yard is required" }),
});

export const useTailoringInventoryForm = (material: any) => {
  const [maxRolls, setMaxRolls] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      material: "",
      tailors: "",
      rolls: "0",
      yard: "0",
    },
  });

  const {
    addTailoringInventory,
    updateTailoringInventory,
    resetTailoringInventory,
    removeTailoringInventory,
  } = useTailoringInventoryStore();
  const tailoringInventoryNonLabel = useTailoringInventoryStore(
    (state) => state.tailoringInventory
  );

  const uniqueWorkers = Array.from(
    new Map(
      material.map((m: any) => [
        m.TailoringProgressMaterial.TailoringProgress.Worker.id,
        m.TailoringProgressMaterial.TailoringProgress.Worker,
      ])
    ).values()
  );

  const filteredMaterials = material?.filter(
    (m: any) =>
      m?.TailoringProgressMaterial?.TailoringProgress?.Worker?.id?.toString() ===
      selectedWorkerId
  );

  const fields = [
    {
      name: "date",
      label: "Date",
      inputType: "date" as const,
    },
    {
      name: "tailors",
      label: "Tailors",
      inputType: "select" as const,
      options: uniqueWorkers.map((worker: any) => ({
        value: worker.id.toString(),
        label: worker.name.toString(),
      })),
    },
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      options: filteredMaterials.map((m: any) => ({
        value: m.id.toString(),
        label: `${m.TailoringProgressMaterial.material.toString()} (${m.Size.size.toString()})`,
      })),
    },
    {
      name: "rolls",
      label: `Rolls (${maxRolls})`,
      inputType: "number" as const,
      max: maxRolls,
    },
    {
      name: "yard",
      label: "Yard",
      inputType: "number" as const,
      disabled: true,
    },
  ];

  useEffect(() => {
    const subscription = form.watch((data, { name }) => {
      if (name === "tailors") {
        setSelectedWorkerId(data.tailors || null);
        form.setValue("material", ""); // reset pilihan material saat ganti worker
      }

      const selectedId = Number(data.material);
      const selectedDetail = material.find((m: any) => m.id === selectedId);
      console.log(selectedDetail);

      if (selectedDetail) {
        setMaxRolls(selectedDetail.pcs);
      } else {
        setMaxRolls(0);
      }

      if (name === "rolls") {
        const inputRolls = Number(data.rolls);
        console.log(inputRolls);
        if (inputRolls > maxRolls) {
          form.setValue("rolls", maxRolls.toString());
        }

        if (selectedDetail && inputRolls > 0) {
          const yardPerRoll =
            Number(selectedDetail.yards) / Number(selectedDetail.pcs);
          const totalYards = yardPerRoll * inputRolls;
          form.setValue("yard", totalYards.toString());
        } else {
          form.setValue("yard", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch, material, setMaxRolls, maxRolls]);

  const addToTable = (data: z.infer<typeof formSchema>) => {
    const matchedMaterial = material.find(
      (m: any) => Number(m.id) === Number(data.material)
    );

    const payload: any = {
      date: new Date(data.date).toISOString(),
      material: data.material,
      worker:
        matchedMaterial?.TailoringProgressMaterial?.TailoringProgress?.Worker?.id.toString(),
      pcs: Number(data.rolls),
      size: matchedMaterial?.Size?.size.toString(),
      yards: Number(data.yard),
    };

    if (editIndex !== null) {
      updateTailoringInventory(editIndex, payload);
    } else {
      addTailoringInventory(payload);
    }
    form.reset({
      date: form.watch("date"),
      material: form.watch("material"),
      tailors: form.watch("tailors"),
      rolls: form.watch("rolls"),
      yard: form.watch("yard"),
    });
  };

  const handleEdit = (index: number) => {
    const item = tailoringInventoryNonLabel[index];
    if (!item) return;
    setEditIndex(index);
    form.setValue("date", new Date(item.date));
    form.setValue("material", item.material.toString());
    form.setValue("tailors", item.worker.toString());
    form.setValue("rolls", item.pcs.toString());
    form.setValue("yard", item.yards.toString());
  };

  const handleDelete = (index: number) => {
    const item = tailoringInventoryNonLabel[index];
    if (!item) return;
    removeTailoringInventory(index);
  };

  const cancel = () => {
    form.reset({
      date: form.watch("date"),
      material: form.watch("material"),
      tailors: form.watch("tailors"),
      rolls: form.watch("rolls"),
      yard: form.watch("yard"),
    });
    resetTailoringInventory();
  };

  const getMaterialName = (id: string | number) => {
    const m = material.find((r: any) => r.id === Number(id));
    return `${m?.TailoringProgressMaterial?.material}` || "";
  };

  const getWorkerName = (id: string | number) => {
    const m = material.find((r: any) => r.id === Number(id));
    return (
      `${m?.TailoringProgressMaterial?.TailoringProgress?.Worker?.name}` || ""
    );
  };

  const tailoringInventory = tailoringInventoryNonLabel.map((item, i) => ({
    ...item,
    size: item.size,
    worker: getWorkerName(item.worker),
    materialName: getMaterialName(item.material),
  }));

  const onSubmit = async () => {
    try {
      const payload: any = tailoringInventory.map((item) => ({
        date: new Date(item.date).toISOString(),
        id_tailoring_progress_material: Number(item.material),
        item: getMaterialName(item.material),
        pcs: Number(item.pcs),
        yards: Number(item.yards),
        id_size: material.find((r: any) => r.id === Number(item.material))?.Size
          ?.id,
      }));
      console.log(payload);
      const send = await TailoringInventoryService.create(payload);
      if (send.status === 201) {
        form.reset({
          date: form.watch("date"),
          material: form.watch("material"),
          tailors: form.watch("tailors"),
          rolls: form.watch("rolls"),
          yard: form.watch("yard"),
        });
        resetTailoringInventory();
      } else {
        console.error(send);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return {
    form,
    fields,
    editIndex,
    setEditIndex,
    addToTable,
    handleEdit,
    handleDelete,
    cancel,
    tailoringInventory,
    onSubmit,
  };
};

export const useTailoringInventoryAction = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await TailoringInventoryService.getAll();
      if (!response.data.data) {
        setData([]);
      }
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData, isLoading, setIsLoading };
};
