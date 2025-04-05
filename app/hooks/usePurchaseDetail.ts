import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
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

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [rollItems, setRollItems] = useState<
    { total_roll: string; length_in_yard: string }[]
  >([]);
  const [tempRoll, setTempRoll] = useState({
    total_roll: "",
    length_in_yard: "",
  });

  const { addItem, updateItem, removeItem, resetItems } = usePurchaseStore();
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

    const updatedRolls = [...rollItems, tempRoll];

    const totalRoll = updatedRolls.reduce(
      (sum, item) => sum + Number(item.total_roll || 0),
      0
    );

    const totalYard = updatedRolls.reduce(
      (sum, item) =>
        sum + Number(item.total_roll || 0) * Number(item.length_in_yard || 0),
      0
    );

    const price = Number(form.getValues("price_per_yard") || 0);
    const subTotal = totalYard * price;

    setRollItems(updatedRolls);
    setTempRoll({ total_roll: "", length_in_yard: "" });

    form.setValue("total_roll", totalRoll.toString());
    form.setValue("total_yard", totalYard.toString());
    form.setValue("sub_total", subTotal.toString());

    // Optional: kosongkan length di form input agar tidak bikin bingung
    form.setValue("length_in_yard", "");
  };

  const handleEditRoll = (index: number) => {
    const item = purchaseItemsWithLabel[index];
    if (!item) return;

    // Reset rollItems dengan data dari item
    const newRollItems = item.rollItems ?? [];

    const totalRoll = newRollItems.reduce(
      (sum, roll) => sum + Number(roll.total_roll || 0),
      0
    );

    const totalYard = newRollItems.reduce(
      (sum, roll) =>
        sum + Number(roll.total_roll || 0) * Number(roll.length_in_yard || 0),
      0
    );

    const subTotal = totalYard * Number(item.price_per_yard || 0);

    // Set ke form
    form.setValue("material", item.material); // pastikan kamu punya material ID-nya
    form.setValue("price_per_yard", item.price_per_yard);
    form.setValue("remarks", item.remarks || "");
    form.setValue("total_roll", totalRoll.toString());
    form.setValue("length_in_yard", ""); // kosongin karena pakai rollItems
    form.setValue("total_yard", totalYard.toString());
    form.setValue("sub_total", subTotal.toString());

    // Simpan ulang ke state
    setRollItems(newRollItems);
    setTempRoll({ total_roll: "", length_in_yard: "" });
    setEditIndex(index);
  };

  const removeRoll = (index: number) => {
    const updatedRolls = rollItems.filter((_, i) => i !== index);

    const totalRoll = updatedRolls.reduce(
      (sum, item) => sum + Number(item.total_roll || 0),
      0
    );

    const totalYard = updatedRolls.reduce(
      (sum, item) =>
        sum + Number(item.total_roll || 0) * Number(item.length_in_yard || 0),
      0
    );

    const price = Number(form.getValues("price_per_yard") || 0);
    const subTotal = totalYard * price;

    setRollItems(updatedRolls);

    form.setValue("total_roll", totalRoll.toString());
    form.setValue("total_yard", totalYard.toString());
    form.setValue("sub_total", subTotal.toString());
  };

  const cancelForm = () => {
    resetItems();
    form.reset();
  };

  const handleDeleteRoll = async (index: number) => {
    try {
      await removeItem(index);
      await fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
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
    const updatedRolls = [...rollItems];

    const newItem = {
      ...data,
      rollItems: updatedRolls,
    };

    if (editIndex !== null) {
      // Update kalau sedang edit
      updateItem(editIndex, newItem);
    } else {
      // Tambah baru
      addItem(newItem);
    }

    // Reset semua
    setRollItems([]);
    form.reset();
    setEditIndex(null); // kembali ke mode tambah
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
    handleDeleteRoll,
    handleTest,
    handleEditRoll,
    cancelForm,
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
