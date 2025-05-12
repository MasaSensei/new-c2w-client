import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCuttingInventoryStore } from "~/stores/useCuttingInventory";
import { CuttingInventoryService } from "~/services/cuttingInventory.service";

const formSchema = z.object({
  date: z.date(),
  material: z.string().min(1, { message: "Material is required" }),
  cutters: z.string().min(1, { message: "Cutters is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  yard: z.string().min(1, { message: "Yard is required" }),
});

export const useCuttingInventoryForm = (material: any) => {
  const [maxRolls, setMaxRolls] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      material: "",
      cutters: "",
      rolls: "0",
      yard: "0",
    },
  });

  const filteredMaterials = material?.filter(
    (m: any) =>
      m?.CuttingProgressMaterial?.CuttingProgress?.Worker?.id?.toString() ===
      selectedWorkerId
  );

  const fields = [
    {
      name: "date",
      label: "Date",
      inputType: "date" as const,
    },
    {
      name: "cutters",
      label: "Cutters",
      inputType: "select" as const,
      options: material?.map((material: any) => ({
        value:
          material.CuttingProgressMaterial?.CuttingProgress?.Worker?.id.toString(),
        label: `${material.CuttingProgressMaterial?.CuttingProgress?.Worker?.name}
`,
      })),
    },
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      options: filteredMaterials?.map((material: any) => ({
        value: material.id.toString(),
        label: `${material.CuttingProgressMaterial.material.toString()} (${
          material.rolls
        } x ${material.yards})`,
      })),
    },
    {
      name: "rolls",
      label: "Rolls",
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

  const {
    addCuttingInventory,
    updateCuttingInventory,
    removeCuttingInventory,
    resetCuttingInventory,
  } = useCuttingInventoryStore();
  const cuttingInventoryNonLabel = useCuttingInventoryStore(
    (state) => state.cuttingInventory
  );

  const addToTable = (data: z.infer<typeof formSchema>) => {
    const matchedMaterial = material.find(
      (m: any) => Number(m.id) === Number(data.material)
    );

    const payload: any = {
      date: new Date(data.date).toISOString(),
      material: data.material,
      worker:
        matchedMaterial?.CuttingProgressMaterial?.CuttingProgress?.Worker?.id.toString(),
      rolls: Number(data.rolls),
      yard: Number(data.yard),
    };

    if (editIndex !== null) {
      updateCuttingInventory(editIndex, payload);
    } else {
      addCuttingInventory(payload);
    }
    form.reset({
      date: form.watch("date"),
      material: form.watch("material"),
      cutters: form.watch("cutters"),
      rolls: form.watch("rolls"),
      yard: form.watch("yard"),
    });
  };

  const handleEdit = (index: number) => {
    const item = cuttingInventoryNonLabel[index];
    if (!item) return;
    setEditIndex(index);
    form.setValue("date", new Date(item.date));
    form.setValue("material", item.material.toString());
    form.setValue("rolls", item.rolls.toString());
    form.setValue("yard", item.yard.toString());
  };

  const handleDelete = async (index: number) => {
    try {
      await removeCuttingInventory(index);
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    form.reset();
    resetCuttingInventory();
  };

  const getMaterialName = (id: string | number) => {
    const m = material.find((r: any) => r.id === Number(id));
    return `${m?.CuttingProgressMaterial.material}` || "";
  };

  const getWorkerName = (id: string | number) => {
    const m = material.find(
      (r: any) =>
        r.CuttingProgressMaterial?.CuttingProgress?.Worker?.id === Number(id)
    );
    return `${m?.CuttingProgressMaterial.CuttingProgress.Worker.name}` || "";
  };

  const cuttingInventory = cuttingInventoryNonLabel.map((item, index) => ({
    ...item,
    id: index,
    materialName: getMaterialName(item.material),
    workerName: getWorkerName(item.worker),
  }));

  const onSubmit = async () => {
    try {
      const payload: any = cuttingInventory.map((item) => ({
        date: new Date(item.date).toISOString(),
        material: item.material,
        item: getMaterialName(item.material),
        worker: item.worker,
        rolls: Number(item.rolls),
        yards: Number(item.yard),
      }));
      console.log(payload);
      const send = await CuttingInventoryService.create(payload);
      if (send.status === 201) {
        form.reset({
          date: form.watch("date"),
          material: form.watch("material"),
          rolls: form.watch("rolls"),
          yard: form.watch("yard"),
        });
        resetCuttingInventory();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    const subscription = form.watch((data, { name }) => {
      if (name === "cutters") {
        setSelectedWorkerId(data.cutters || null);
        form.setValue("material", ""); // reset pilihan material saat ganti worker
      }

      const selectedId = Number(data.material);
      const selectedDetail = material.find((m: any) => m.id === selectedId);

      if (selectedDetail) {
        setMaxRolls(selectedDetail.rolls);
      } else {
        setMaxRolls(0);
      }

      if (name === "rolls") {
        const inputRolls = Number(data.rolls);
        if (inputRolls > maxRolls) {
          form.setValue("rolls", maxRolls.toString());
        }

        if (selectedDetail && inputRolls > 0) {
          const totalYards = Number(selectedDetail.yards) * inputRolls;
          form.setValue("yard", totalYards.toString());
        } else {
          form.setValue("yard", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch, material, setMaxRolls, maxRolls]);

  return {
    form,
    fields,
    editIndex,
    setEditIndex,
    addToTable,
    cuttingInventory,
    handleEdit,
    cancel,
    handleDelete,
    onSubmit,
  };
};

export const useCuttingInventoryAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CuttingInventoryService.getAll();
      if (!response.data.data) {
        setIsLoading(false);
        setData([]);
      }
      setIsLoading(false);
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
