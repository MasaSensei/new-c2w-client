import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { RawMaterial } from "~/types/rawMaterial";
import { RawMaterialService } from "~/services/rawMaterial.service";

const formSchema = z.object({
  id_raw_material: z.string().min(1, { message: "Item is required" }),
  rolls: z.string().min(1, { message: "Size is required" }),
  yards: z.string().min(1, { message: "Color is required" }),
  status: z.string().min(1, { message: "Color 2 is required" }),
  input_date: z.date(),
  remarks: z.string().optional(),
});

export const useStagingCuttingInventory = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  rawMaterials: RawMaterial[]
) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_raw_material: "",
      rolls: "",
      yards: "",
      status: "",
      input_date: new Date(),
      remarks: "",
    },
  });

  const fields = [
    {
      name: "input_date",
      label: "Date",
      inputType: "date" as const,
    },
    {
      name: "id_raw_material",
      label: "Item",
      inputType: "select" as const,
      options: rawMaterials.flatMap((raw) => {
        return (raw.PurchaseListDetail || []).map((detail) => ({
          value: (detail?.id ?? 0).toString(),
          label: `${detail.PurchaseList?.invoice_number} - ${detail.material}(${detail.rolls}x${detail.yards})`,
        }));
      }),
    },
    {
      name: "rolls",
      label: "Rolls",
      inputType: "number" as const,
    },
    {
      name: "yards",
      label: "Yards",
      inputType: "number" as const,
      disabled: true,
    },
    {
      name: "status",
      label: "Status",
      inputType: "select" as const,
      options: [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "textarea" as const,
    },
  ];

  return { form, fields };
};

export const useStagingCuttingInventoryAction = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await RawMaterialService.getAll();
      if (!response.data.data) {
        setIsLoading(false);
        setRawMaterials([]);
      }
      setIsLoading(false);
      setRawMaterials(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { rawMaterials, isLoading, setIsLoading };
};
