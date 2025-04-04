import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { usePurchaseStore } from "~/stores/useDetailPurchaseStore";
import type { RawMaterial } from "~/types/rawMaterial";
import { RawMaterialService } from "~/services/rawMaterial.service";

const formSchema = z.object({
  total_roll: z.string().min(1, { message: "Total Roll is required" }),
  material: z.string().min(1, { message: "Material is required" }),
  price_per_yard: z.string().min(1, { message: "Price Per Unit is required" }),
  length_in_yard: z.string().min(1, { message: "Length is required" }),
  total_yard: z.string().min(1, { message: "Total Yard is required" }),
  sub_total: z.string().min(1, { message: "Sub Total is required" }),
  remarks: z.string().optional(),
});

export const usePurchaseDetailForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  rawMaterials: RawMaterial[]
) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total_roll: "",
      material: "",
      price_per_yard: "0",
      length_in_yard: "",
      total_yard: "",
      sub_total: "",
      remarks: "-",
    },
  });

  const [rollItems, setRollItems] = useState<
    { total_roll: string; length_in_yard: string }[]
  >([]);
  const [tempRoll, setTempRoll] = useState({
    total_roll: "",
    length_in_yard: "",
  });

  const { addItem } = usePurchaseStore();
  const purchaseItems = usePurchaseStore((state) => state.items);

  const addRoll = () => {
    if (!tempRoll.total_roll || !tempRoll.length_in_yard) return;

    setRollItems((prevItems) => [...prevItems, tempRoll]);
    setTempRoll({ total_roll: "", length_in_yard: "" }); // reset setelah ditambahkan
  };

  const removeRoll = (index: number) => {
    setRollItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(rollItems);
    console.log(purchaseItems);
  }, [purchaseItems]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data submitted:", data);
    addItem(data);
  };

  const fields = [
    {
      name: "total_roll",
      label: "Total Roll",
      inputType: "number" as const,
      disabled: true,
    },
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      placeholder: "Raw Material",
      options: rawMaterials?.map((material) => ({
        value: String(material.id),
        label: `${material?.Item?.item} - ${material?.Color1?.color} - ${material?.Code?.code} - ${material?.Color2?.color}`,
      })),
    },
    {
      name: "total_yard",
      label: "Total Yard",
      inputType: "number" as const,
      disabled: true,
    },
    {
      name: "price_per_yard",
      label: "Price Per Yard",
      inputType: "number" as const,
      placeholder: "Price Per Yard",
    },
    {
      name: "sub_total",
      label: "Sub Total",
      inputType: "number" as const,
      disabled: true,
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "text" as const,
      placeholder: "Remarks",
    },
  ];

  return {
    form,
    onSubmit,
    fields,
    purchaseItems,
    setTempRoll,
    tempRoll,
    rollItems,
    addRoll,
    removeRoll,
  };
};

export const usePurchaseDetailAction = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const rawMaterialRes = await RawMaterialService.getAll();
      setIsLoading(false);
      setRawMaterials(rawMaterialRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return { fetchData, rawMaterials, isLoading, setIsLoading };
};
