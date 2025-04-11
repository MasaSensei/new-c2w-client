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

export const useStagingCuttingInventory = () => {
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
      options: [
        { value: "1", label: "Item 1" },
        { value: "2", label: "Item 2" },
        { value: "3", label: "Item 3" },
      ],
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
