import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePurchaseStore } from "~/stores/useDetailPurchaseStore";
import { RawMaterialService } from "~/services/rawMaterial.service";
import { PurchaseListService } from "~/services/purchaseList.service";
import type { RawMaterial } from "~/types/rawMaterial";
import type { PurchaseList } from "~/types/purchaseList";
import { useDetailPurchaseStoreReturn } from "~/stores/useDetailPurchaseStoreReturn";
import { PurchaseListDetailService } from "~/services/purchaseListDetail.service";
import type { PurchaseListDetail } from "~/types/purchaseListDetail";

const formSchema = z.object({
  jatuh_tempo: z.string(),
  total_roll: z.string(),
  material: z.string(),
  price_per_yard: z.string(),
  length_in_yard: z.string(),
  yard_per_roll: z.string(),
  sub_total: z.string(),
  remarks: z.string().optional(),
});

export const usePurchaseDetailForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  rawMaterials: RawMaterial[],
  purchaseItemsSelected: PurchaseList,
  router: any
) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jatuh_tempo: "",
      total_roll: "",
      material: "",
      price_per_yard: "",
      length_in_yard: "",
      yard_per_roll: "",
      sub_total: "",
      remarks: "-",
    },
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [maxRollsReturn, setMaxRollsReturn] = useState<number>(0);
  const [rollItems, setRollItems] = useState<
    { total_roll: string; length_in_yard: string }[]
  >([]);
  const [tempRoll, setTempRoll] = useState({
    total_roll: "",
    length_in_yard: "",
  });

  const { addItem, updateItem, removeItem, resetItems } = usePurchaseStore();
  const { addItem: addItemReturn, updateItem: updateItemReturn } =
    useDetailPurchaseStoreReturn();
  const purchaseItems = usePurchaseStore((state) => state.items);
  const purchaseItemsReturnNonLabel = useDetailPurchaseStoreReturn(
    (state) => state.items
  );

  const getMaterialName = (id: string | number) => {
    const m = rawMaterials.find((r) => r.id === Number(id));
    return `${m?.Item?.item} ${m?.Color1?.color} ${m?.Code?.code} ${m?.Color2?.color}`;
  };

  const getMaterialNameReturn = (id: string | number) => {
    const m = purchaseItemsSelected?.PurchaseListDetail?.find(
      (r) => r.id === Number(id)
    );
    const n = purchaseItemsSelected?.PurchaseListDetail?.find(
      (r) => r.id === Number(id)
    );
    return n?.material;
  };

  const purchaseItemsReturn = purchaseItemsReturnNonLabel.map((item) => ({
    ...item,
    materialName: getMaterialNameReturn(item.material),
  }));

  const purchaseItemsWithLabel = purchaseItems.map((item) => ({
    ...item,
    materialName: getMaterialName(item.material),
  }));

  const calculateTotals = (rolls = rollItems) => {
    const totalRoll = rolls.reduce(
      (sum, r) => sum + Number(r.total_roll || 0),
      0
    );
    const yardPerRoll = rolls.reduce(
      (sum, r) =>
        sum + Number(r.length_in_yard || 0) / Number(r.total_roll || 0),
      0
    );
    const totalYard = Math.floor(yardPerRoll * 10) / 10;
    const subTotal =
      Number(form.getValues("price_per_yard") || 0) *
      rolls.reduce((sum, r) => sum + Number(r.length_in_yard || 0), 0);

    return { totalRoll, totalYard, subTotal };
  };

  const updateFormWithRolls = (rolls: typeof rollItems) => {
    const { totalRoll, totalYard, subTotal } = calculateTotals(rolls);
    form.setValue("total_roll", totalRoll.toString());
    form.setValue("yard_per_roll", totalYard.toString());
    form.setValue("sub_total", subTotal.toString());
  };

  const addRoll = () => {
    if (!tempRoll.total_roll || !tempRoll.length_in_yard) return;

    const updated = [...rollItems, tempRoll];
    setRollItems(updated);
    updateFormWithRolls(updated);
    setTempRoll({ total_roll: "", length_in_yard: "" });
    form.setValue("length_in_yard", "");
  };

  const removeRoll = (index: number) => {
    const updated = rollItems.filter((_, i) => i !== index);
    setRollItems(updated);
    updateFormWithRolls(updated);
  };

  const handleEditRoll = (index: number) => {
    const item = purchaseItemsWithLabel[index];
    if (!item) return;

    setEditIndex(index);
    setRollItems(item.rollItems ?? []);
    setTempRoll({ total_roll: "", length_in_yard: "" });

    const { totalRoll, totalYard, subTotal } = calculateTotals(item.rollItems);
    form.setValue("material", item.material);
    form.setValue("price_per_yard", item.price_per_yard);
    form.setValue("remarks", item.remarks || "");
    form.setValue("total_roll", totalRoll.toString());
    form.setValue("yard_per_roll", totalYard.toString());
    form.setValue("sub_total", subTotal.toString());
    form.setValue("length_in_yard", "");
  };

  const handleDeleteRoll = async (index: number) => {
    try {
      await removeItem(index);
      await fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const addToTabel = (data: z.infer<typeof formSchema>) => {
    const newItem = { ...data, rollItems };

    if (editIndex !== null) {
      updateItem(editIndex, newItem);
    } else {
      addItem(newItem);
    }

    form.reset();
    setRollItems([]);
    setEditIndex(null);
  };

  const addToTabelReturn = (data: z.infer<typeof formSchema>) => {
    const totalYard = purchaseItemsSelected?.PurchaseListDetail?.reduce(
      (sum, r) => sum + Number(r.yards || 0),
      0
    );
    const totalRoll = purchaseItemsSelected?.PurchaseListDetail?.reduce(
      (sum, r) => sum + Number(r.rolls || 0),
      0
    );
    const payload = {
      ...data,
      length_in_yard:
        Math.floor((Number(totalYard) / Number(totalRoll)) * 10) / 10,
    };

    if (editIndex !== null) {
      updateItemReturn(editIndex, payload as any);
    } else {
      addItemReturn(payload as any);
    }

    // form.reset({
    //   material: "",
    //   price_per_yard: "",
    //   remarks: "",
    // });
    // setRollItems([]);
  };

  const onSubmit = async () => {
    try {
      const payload = purchaseItems
        .filter((i) => i.rollItems?.length)
        .flatMap((i) =>
          i?.rollItems?.map((roll) => ({
            id_purchase_list: Number(router.purchaseListId),
            rolls: Number(roll.total_roll),
            id_raw_material: Number(i.material),
            material: getMaterialName(i.material),
            price_per_yard: i.price_per_yard,
            yards: Number(roll.length_in_yard),
            total: (
              Number(roll.length_in_yard) * Number(i.price_per_yard)
            ).toString(),
            is_active: true,
            remarks: i.remarks || "-",
          }))
        );

      await PurchaseListDetailService.create(payload as PurchaseListDetail[]);
    } catch (error) {
      console.error("Gagal submit:", error);
    }
  };

  const onSubmitReturn = async () => {
    const totalYard = purchaseItemsSelected?.PurchaseListDetail?.reduce(
      (sum, r) => sum + Number(r.yards || 0),
      0
    );
    const totalRoll = purchaseItemsSelected?.PurchaseListDetail?.reduce(
      (sum, r) => sum + Number(r.rolls || 0),
      0
    );
    try {
      const payload = purchaseItemsReturnNonLabel.map((i) => ({
        id_purchase_list: Number(router.purchaseListId),
        rolls: Number(i.total_roll),
        id_raw_material: Number(i.material),
        material: getMaterialNameReturn(i.material),
        price_per_yard: i.price_per_yard,
        yards: Math.floor((Number(totalYard) / Number(totalRoll)) * 10) / 10,
        total: i.sub_total,
        is_active: true,
        remarks: i.remarks || "-",
      }));

      console.log(payload);
      console.log(
        Math.floor((Number(totalYard) / Number(totalRoll)) * 10) / 10
      );

      // await PurchaseListDetailService.create(payload as PurchaseListDetail[]);
    } catch (error) {
      console.error("Gagal submit:", error);
    }
  };

  const cancelForm = () => {
    resetItems();
    form.reset();
  };

  const fields = [
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      placeholder: "Raw Material",
      options: rawMaterials.map((m) => ({
        value: String(m.id),
        label: getMaterialName(m.id || 0),
      })),
    },
    {
      name: "yard_per_roll",
      label: "Yard/Roll",
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

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      const selectedId = Number(value.material);

      const found = purchaseItemsSelected?.PurchaseListDetail?.find(
        (item) => item.id === selectedId
      );

      if (found) {
        setMaxRollsReturn(found.rolls);
      } else {
        setMaxRollsReturn(0);
      }

      if (name === "total_roll") {
        const inputRoll = Number(value.total_roll); // ini roll yang diketik user

        // Batasi jika lebih besar dari rolls maksimal
        if (inputRoll > maxRollsReturn) {
          form.setValue("total_roll", String(maxRollsReturn));
        }

        if (found && inputRoll > 0) {
          const subTotal = (inputRoll / found.rolls) * Number(found.total || 0);
          form.setValue("sub_total", subTotal.toFixed(0));
        } else {
          form.setValue("sub_total", "0");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch, purchaseItemsSelected, maxRollsReturn]);

  const returnFields = [
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      placeholder: "Raw Material",
      options: purchaseItemsSelected?.PurchaseListDetail?.map((m) => ({
        value: String(m.id),
        label: `${m.material} (${m.total})`,
      })),
    },
    {
      name: "total_roll",
      label: `Total Roll: ${maxRollsReturn}`,
      inputType: "number" as const,
      placeholder: `maks: ${maxRollsReturn}`,
      max: maxRollsReturn,
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
    returnFields,
    form,
    fields,
    addToTabelReturn,
    tempRoll,
    rollItems,
    setTempRoll,
    addRoll,
    removeRoll,
    addToTabel,
    onSubmit,
    onSubmitReturn,
    cancelForm,
    handleEditRoll,
    handleDeleteRoll,
    purchaseItemsWithLabel,
    purchaseItemsReturn,
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
      const purchaseRes = await PurchaseListService.get(
        Number(router.purchaseListId)
      );
      const materialRes = await RawMaterialService.getAll();
      setPurchaseItems(purchaseRes.data.data || ({} as PurchaseList));
      setRawMaterials(materialRes.data.data || []);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Purchase Items:", purchaseItems);
  }, []);

  return {
    fetchData,
    rawMaterials,
    purchaseItems: purchaseItems ?? ({} as PurchaseList),
    isLoading,
    setIsLoading,
    router,
  };
};
