import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TailorsInventoryService } from "~/services/tailorsInventory.service";
import { SizesService } from "~/services/size.service";
import { useMaterialToTailorTableStore } from "~/stores/useMaterialToTailorTable";

const formSchema = z.object({
  date: z.date(),
  size: z.string().min(1, { message: "Size is required" }),
  material: z.string().min(1, { message: "Material is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  yard: z.string().min(1, { message: "Yard is required" }),
});

export const useMaterialToTailorTableForm = (materials: any, sizes: any) => {
  const [maxYards, setMaxYards] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      size: "",
      material: "",
      rolls: "",
      yard: "",
    },
  });

  const {
    addMaterialToTailorTable,
    updateMaterialToTailorTable,
    resetMaterialToTailorTable,
    removeMaterialToTailorTable,
  } = useMaterialToTailorTableStore();
  const materialToTailorTableItem = useMaterialToTailorTableStore(
    (state) => state.materialToTailorTable
  );

  const fields = [
    {
      name: "date",
      label: "Date",
      inputType: "date" as const,
    },
    {
      name: "size",
      label: "Size",
      inputType: "select" as const,
      options: sizes?.map((size: any) => ({
        value: size.id.toString(),
        label: size.size.toString(),
      })),
      placeholder: "Size",
    },
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      options: materials?.map((material: any) => ({
        value: material.id.toString(),
        label: material.material.toString(),
      })),

      placeholder: "Material",
    },
    {
      name: "rolls",
      label: "Pcs",
      inputType: "number" as const,
      placeholder: "PCS",
    },
    {
      name: "yard",
      label: `Yards (${maxYards})`,
      inputType: "number" as const,
      placeholder: "Yard",
    },
  ];

  useEffect(() => {
    const subscription = form.watch((data, { name }) => {
      const selectedId = Number(data.material);
      const material = materials.find(
        (material: any) => material.id === selectedId
      );

      if (material) {
        setMaxYards(material?.yards || 0);
      } else {
        setMaxYards(0);
      }

      if (name === "yard") {
        const inputYards = Number(data.yard) || 0;
        if (inputYards > maxYards) {
          form.setValue("yard", maxYards.toString());
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [materials, maxYards, form.watch, setMaxYards]);

  const getMaterialName = (id: string | number) => {
    const m = materials.find((r: any) => r.id === Number(id));
    return `${m?.material}` || "";
  };

  const materialToTailorTable = materialToTailorTableItem.map(
    (item, index) => ({
      ...item,
      id: index,
      size: sizes.find((s: any) => s.id === Number(item.size))?.size,
      material: getMaterialName(item.material),
    })
  );

  const addToTable = (data: z.infer<typeof formSchema>) => {
    const payload: any = {
      date: new Date(data.date).toISOString(),
      size: data.size,
      material: data.material,
      pcs: data.rolls,
      yards: data.yard,
    };

    if (editIndex !== null) {
      updateMaterialToTailorTable(editIndex, payload);
    } else {
      addMaterialToTailorTable(payload);
    }
    form.reset({
      date: new Date(),
      size: "",
      material: "",
      rolls: "",
      yard: "",
    });
  };

  const handleEdit = (index: number) => {
    const item = materialToTailorTableItem[index];
    if (!item) return;
    setEditIndex(index);
    form.setValue("date", new Date(item.date));
    form.setValue("size", item.size.toString());
    form.setValue("material", item.material.toString());
    form.setValue("rolls", item.pcs.toString());
    form.setValue("yard", item.yards.toString());
  };

  const handleDelete = async (index: number) => {
    const item = materialToTailorTableItem[index];
    if (!item) return;
    removeMaterialToTailorTable(index);
  };

  const cancel = () => {
    form.reset();
    resetMaterialToTailorTable();
  };

  const onSubmit = async () => {
    try {
      const item: any = materialToTailorTableItem.map((item) => ({
        date: new Date(item.date),
        id_size: Number(item.size),
        id_tailoring_progress_material: Number(item.material),
        pcs: Number(item.pcs),
        yards: Number(item.yards),
        remarks: "-",
      }));
      const payload: any = {
        items: item,
      };
      console.log(payload);
      await TailorsInventoryService.create(payload.items);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      resetMaterialToTailorTable();
      form.reset({
        date: new Date(),
        size: "",
        material: "",
        rolls: "",
        yard: "",
      });
    }
  };

  return {
    form,
    fields,
    editIndex,
    setEditIndex,
    materialToTailorTable,
    onSubmit,
    handleEdit,
    handleDelete,
    cancel,
    addToTable,
    resetMaterialToTailorTable,
  };
};

export const useTailorsInventoryAction = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await TailorsInventoryService.getAll();
      const sizeResponse = await SizesService.getAll();
      if (!response.data.data) {
        setIsLoading(false);
        setData([]);
      }
      setIsLoading(false);
      setData(response.data.data);
      setSize(sizeResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData, isLoading, setIsLoading, size };
};
