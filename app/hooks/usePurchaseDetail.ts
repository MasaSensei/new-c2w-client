import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { usePurchaseStore } from "~/stores/useDetailPurchaseStore";
import type { RawMaterial } from "~/types/rawMaterial";
import { RawMaterialService } from "~/services/rawMaterial.service";
import type { PurchaseList } from "~/types/purchaseList";
import { PurchaseListService } from "~/services/purchaseList.service";
import { useParams } from "react-router";

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
      price_per_yard: "",
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
  const handleTest = () => {
    addItem({
      material: "1",
      price_per_yard: "2",
      total_roll: "2",
      length_in_yard: "5",
      total_yard: "10",
      sub_total: "20",
      remarks: "-",
    });

    addItem({
      material: "1",
      price_per_yard: "2",
      total_roll: "1",
      length_in_yard: "6",
      total_yard: "6",
      sub_total: "12",
      remarks: "-",
    });

    addItem({
      material: "1",
      price_per_yard: "6",
      total_roll: "1",
      length_in_yard: "6",
      total_yard: "6",
      sub_total: "12",
      remarks: "-",
    });

    console.log("📦 ITEMS:", usePurchaseStore.getState().items);
  };
  const purchaseItems = usePurchaseStore((state) => state.items);
  console.log(purchaseItems);
  const purchaseItemsWithLabel = purchaseItems.map((item) => {
    const material = rawMaterials.find(
      (rawMaterial) => rawMaterial.id === Number(item.material)
    );

    return {
      ...item,
      materialName: `${material?.Item?.item} ${material?.Color1?.color} ${material?.Code?.code} ${material?.Color2?.color}`,
    };
  });

  const addRoll = () => {
    if (!tempRoll.total_roll || !tempRoll.length_in_yard) return;

    setRollItems((prevItems) => [...prevItems, tempRoll]);
    setTempRoll({ total_roll: "", length_in_yard: "" });
    form.setValue("total_roll", String(Number(tempRoll.total_roll)));
    form.setValue("length_in_yard", String(Number(tempRoll.length_in_yard)));
    form.setValue(
      "total_yard",
      String(Number(tempRoll.total_roll) * Number(tempRoll.length_in_yard))
    );
    form.setValue(
      "sub_total",
      String(
        Number(form.getValues("total_yard")) *
          Number(form.getValues("price_per_yard"))
      )
    );
  };

  const removeRoll = (index: number) => {
    setRollItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        total_roll: data.total_roll,
        material: data.material,
        price_per_yard: data.price_per_yard,
        length_in_yard: data.length_in_yard,
        total_yard: data.total_yard,
        sub_total: data.sub_total,
        remarks: data.remarks,
      };
      await addItem(payload);
      form.reset();
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const addToTabel = async (data: z.infer<typeof formSchema>) => {
    const newRollItem = {
      total_roll: data.total_roll,
      length_in_yard: data.length_in_yard,
    };

    const updatedRolls = [...rollItems];

    addItem({
      ...data,
      rollItems: updatedRolls,
    });

    setRollItems([]); // Reset rollItems untuk input selanjutnya
    form.reset();
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
        label: `${material?.Item?.item} ${material?.Color1?.color} ${material?.Code?.code} ${material?.Color2?.color}`,
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
      inputType: "currency" as const,
      placeholder: "Price Per Yard",
    },
    {
      name: "sub_total",
      label: "Sub Total",
      inputType: "currency" as const,
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
    purchaseItemsWithLabel,
    setTempRoll,
    tempRoll,
    rollItems,
    addRoll,
    addToTabel,
    handleTest,
    removeRoll,
  };
};

export const usePurchaseDetailAction = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseList>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useParams();
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const purchaseItemsRes = await PurchaseListService.get(
        Number(router.purchaseListId)
      );
      const rawMaterialRes = await RawMaterialService.getAll();
      if (!purchaseItemsRes.data.data || !rawMaterialRes.data.data) {
        setIsLoading(false);
        setPurchaseItems([] as unknown as PurchaseList);
        setRawMaterials([]);
      }
      setPurchaseItems(purchaseItemsRes.data.data);
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
  return { fetchData, rawMaterials, purchaseItems, isLoading, setIsLoading };
};
