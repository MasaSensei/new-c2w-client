import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { WorkersService } from "~/services/worker.service";
import { StaggingTailorService } from "~/services/staggingTailor.service";

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

export const useTailoringProgressForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  workers: any[],
  materials: any[]
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
        label: `${material?.CuttingInventoryDetail?.CuttingInventory?.item} (${material?.rolls}x${material?.yards})`,
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

  return { fields, form };
};

export const useTailoringProgressAction = () => {
  const [workers, setWorkers] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const responseWorker = await WorkersService.getAll({ type: "tailors" });
      const responseMaterials = await StaggingTailorService.getAll();
      if (!responseWorker.data.data) {
        setData([]);
      }
      if (!responseMaterials.data.data) {
        setData([]);
      }
      setWorkers(responseWorker.data.data);
      setMaterials(responseMaterials.data.data);
      setData(responseMaterials.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { workers, data, materials, fetchData };
};
