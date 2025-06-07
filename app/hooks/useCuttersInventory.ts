import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMaterialInventoryStore } from "~/stores/useMaterialToCuttingTable";
import { CuttersInventoryService } from "~/services/cuttersInventory.service";

const formSchema = z.object({
  date: z.date(),
  material: z.string().min(1, { message: "Material is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  yard: z.string().min(1, { message: "Yard is required" }),
});

export const useMaterialToCuttingTableForm = (materials: any) => {
  const [maxYards, setMaxYards] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      material: "",
      rolls: "",
      yard: "",
    },
  });
  const { addItem, updateItem, removeItem, resetItems } =
    useMaterialInventoryStore();
  const materialToCuttingTableItem = useMaterialInventoryStore(
    (state) => state.items
  );
  const fields = [
    {
      name: "date",
      label: "Date",
      inputType: "date" as const,
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
      label: "Rolls",
      inputType: "number" as const,
      placeholder: "Rolls",
    },
    {
      name: "yard",
      label: `Rolls (${maxYards})`,
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

  const materialToCuttingTable = materialToCuttingTableItem.map(
    (item, index) => ({
      ...item,
      id: index,
      material: getMaterialName(item.material),
    })
  );

  const addToTabel = (data: z.infer<typeof formSchema>) => {
    const payload: any = {
      date: new Date(data.date).toISOString(),
      material: data.material,
      rolls: Number(data.rolls),
      yard: Number(data.yard),
    };
    if (editIndex !== null) {
      updateItem(editIndex, payload);
    } else {
      addItem(payload);
    }
    form.reset({
      date: new Date(),
      material: "",
      rolls: "",
      yard: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    const item = materialToCuttingTableItem[index];
    if (!item) return;
    setEditIndex(index);
    form.setValue("date", new Date(item.date));
    form.setValue("material", item.material.toString());
    form.setValue("rolls", item.rolls.toString());
    form.setValue("yard", item.yard.toString());
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await removeItem(id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const cancel = () => {
    form.reset();
    resetItems();
  };

  const onSubmit = async () => {
    try {
      const item: any = materialToCuttingTableItem.map((item) => ({
        date: new Date(item.date),
        id_cutting_progress_material: Number(item.material),
        rolls: Number(item.rolls),
        yards: Number(item.yard),
      }));
      const payload: any = {
        items: item,
      };
      await CuttersInventoryService.create(payload.items);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return {
    form,
    fields,
    addToTabel,
    editIndex,
    setEditIndex,
    cancel,
    handleEdit,
    handleDeleteItem,
    onSubmit,
    materialToCuttingTable,
    resetItems,
  };
};

export const useCuttersInventoryAction = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CuttersInventoryService.getAll();
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
