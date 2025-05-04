import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { Worker } from "~/types/worker";
import { WorkersService } from "~/services/worker.service";
import type { StaggingMaterialToCutting } from "~/types/staggingMaterialToCutting";
import { StaggingMaterialToCuttingService } from "~/services/staggingMaterialToCutting.service";
import { useCuttingProgressStore } from "~/stores/useCuttingProgress";
import CuttingProgressService from "~/services/cuttingProgress.service";
import type { CuttingProgress } from "~/types/cuttingProgress";

const formSchema = z.object({
  date: z.date(),
  end_date: z.date(),
  invoice_number: z.string().min(1, { message: "Invoice Number is required" }),
  id_worker: z.string().min(1, { message: "Worker is required" }),
  id_material: z.string().min(1, { message: "Material is required" }),
  rolls: z.string().optional(),
  yards: z.string().optional(),
  remarks: z.string().optional(),
});

export const useCuttingProgressForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  workers: Worker[],
  materials: StaggingMaterialToCutting[]
) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [maxRolls, setMaxRolls] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      end_date: new Date(),
      invoice_number: "",
      id_worker: "",
      id_material: "",
      rolls: "",
      yards: "",
      remarks: "",
    },
  });

  console.log(materials);

  const {
    addCuttingProgress,
    updateCuttingProgress,
    deleteCuttingProgress,
    resetCuttingProgress,
  } = useCuttingProgressStore();
  const cuttingProgressItem = useCuttingProgressStore(
    (state) => state.cuttingProgress
  );

  const fields = [
    {
      name: "date",
      label: "start Date",
      inputType: "date" as const,
    },
    {
      name: "end_date",
      label: "end Date",
      inputType: "date" as const,
    },
    {
      name: "invoice_number",
      label: "Invoice Number",
      inputType: "text" as const,
    },
    {
      name: "id_worker",
      label: "Worker",
      placeholder: "Select Cutters",
      inputType: "select" as const,
      options: workers.map((worker) => ({
        value: String(worker.id),
        label: worker.name,
      })),
    },
    {
      name: "id_material",
      label: "Material",
      placeholder: "Select Material",
      inputType: "select" as const,
      options: materials.map((material) => ({
        value: String(material.id),
        label: `${material?.PurchaseListDetail?.material} (${material?.rolls}x${material?.yards})`,
      })) as { value: string; label: string }[],
    },
    {
      name: "rolls",
      label: `Rolls (${maxRolls})`,
      inputType: "number" as const,
    },
    {
      name: "yards",
      label: "Yards",
      inputType: "number" as const,
      disabled: true,
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "textarea" as const,
    },
  ];

  useEffect(() => {
    const subscription = form.watch((data, { name }) => {
      const selectedId = Number(data.id_material);
      const material = materials.find((material) => material.id === selectedId);

      if (material) {
        setMaxRolls(material?.rolls || 0);
      } else {
        setMaxRolls(0);
      }

      if (name === "rolls") {
        const inputRolls = Number(data.rolls) || 0;
        if (inputRolls > maxRolls) {
          form.setValue("rolls", String(maxRolls));
        }

        if (selectedId && inputRolls > 0) {
          const totalYards =
            Number(material?.yards) * Number(form.watch("rolls"));
          form.setValue("yards", String(totalYards));
        } else {
          form.setValue("yards", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch, materials, setMaxRolls, maxRolls]);

  const addToTable = (data: z.infer<typeof formSchema>) => {
    const getPurchaseListDetail = materials.find(
      (material) => material.id === Number(data.id_material)
    );

    const payload = {
      id_purchase_list_detail: Number(
        getPurchaseListDetail?.id_purchase_list_detail
      ),
      material: getMaterialName(data.id_material),
      id_worker: Number(data.id_worker),
      id_staging_cutting_inventory: Number(data.id_material),
      rolls: Number(data.rolls),
      yards: data.yards ?? 0,
    };
    if (editIndex !== null) {
      updateCuttingProgress(editIndex, payload);
    } else {
      addCuttingProgress(payload);
    }
    form.reset({
      date: form.watch("date"),
      end_date: form.watch("end_date"),
      id_material: "",
      rolls: "",
      yards: "",
      invoice_number: form.watch("invoice_number"),
      id_worker: form.watch("id_worker"),
      remarks: form.watch("remarks"),
    });
  };

  const handleEdit = (index: number) => {
    const item = cuttingProgressItem[index];
    if (!item) return;
    setEditIndex(index);
    form.setValue("id_material", String(item.id_staging_cutting_inventory));
    form.setValue("rolls", String(item.rolls));
    form.setValue("yards", String(item.yards));
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteCuttingProgress(id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getMaterialName = (id: string | number) => {
    const m = materials.find((r) => r.id === Number(id));
    return `${m?.PurchaseListDetail?.material}`;
  };

  const cuttingProgress = cuttingProgressItem.map((item, index) => ({
    ...item,
    id: index,
    material: getMaterialName(item.id_staging_cutting_inventory),
  }));

  const onSubmit = async () => {
    try {
      const item: any = cuttingProgressItem.map((item) => ({
        id_purchase_list_detail: Number(item.id_purchase_list_detail),
        id_staging_cutting_inventory: Number(item.id_staging_cutting_inventory),
        material: item.material,
        rolls: Number(item.rolls),
        yards: item.yards,
        is_active: true,
      }));
      const payload = {
        date: form.getValues("date") as any,
        end_date: form.getValues("end_date") as any,
        invoice: form.getValues("invoice_number"),
        id_worker: Number(form.getValues("id_worker")),
        materials: item,
        remarks: form.getValues("remarks"),
      };
      if (
        !payload.date ||
        !payload.invoice ||
        !payload.id_worker ||
        !payload.materials
      ) {
        alert("Please fill out all required fields.");
        return;
      }
      console.log(payload);
      await CuttingProgressService.create(payload as CuttingProgress);
      form.reset();
      resetCuttingProgress();
      fetchData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    form.reset();
    resetCuttingProgress();
  };

  return {
    form,
    cancel,
    fields,
    addToTable,
    cuttingProgress,
    handleDeleteItem,
    handleEdit,
    onSubmit,
  };
};

export const useCuttingProgressAction = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [data, setData] = useState<CuttingProgress[]>([]);
  const [materials, setMaterials] = useState<StaggingMaterialToCutting[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CuttingProgressService.getAll();
      console.log(response);
      const responseWorker = await WorkersService.getAll({ type: "cutters" });
      const responseMaterials = await StaggingMaterialToCuttingService.getAll([
        "completed",
      ]);
      if (!response.data.data) {
        setIsLoading(false);
        setData([]);
      }
      if (!responseWorker.data.data) {
        setIsLoading(false);
        setWorkers([]);
      }
      if (!responseMaterials.data.data) {
        setIsLoading(false);
        setMaterials([]);
      }
      setIsLoading(false);
      setWorkers(responseWorker.data.data);
      setMaterials(responseMaterials.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, workers, isLoading, fetchData, setIsLoading, materials };
};
