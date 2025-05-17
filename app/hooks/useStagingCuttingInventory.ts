import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { RawMaterial } from "~/types/rawMaterial";
import { RawMaterialService } from "~/services/rawMaterial.service";
import { useStagingCuttingInventoryStore } from "~/stores/useStagingCuttingInventoryStore";
import { StaggingMaterialToCuttingService } from "~/services/staggingMaterialToCutting.service";
import type { StaggingMaterialToCutting } from "~/types/staggingMaterialToCutting";

const formSchema = z.object({
  id_raw_material: z.string().min(1, { message: "Item is required" }),
  rolls: z.string(),
  yards: z.string(),
  status: z.string(),
  input_date: z.date(),
  remarks: z.string().optional(),
});

export const useStagingCuttingInventoryForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  rawMaterials: RawMaterial[]
) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [maxRolls, setMaxRolls] = useState<number>(0);

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

  const {
    addStagingCuttingInventory,
    updateStagingCuttingInventory,
    deleteStagingCuttingInventory,
    resetStagingCuttingInventory,
  } = useStagingCuttingInventoryStore();
  const stagingCuttingInventoryNonLabel = useStagingCuttingInventoryStore(
    (state) => state.stagingCuttingInventory
  );

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
      label: `Rolls (${maxRolls})`,
      placeholder: `maks: ${maxRolls}`,
      inputType: "number" as const,
      max: maxRolls,
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

  const addToTabel = (data: z.infer<typeof formSchema>) => {
    const payload = {
      date: new Date(data.input_date).toISOString(),
      material: data.id_raw_material,
      rolls: data.rolls,
      yards: data.yards,
      status: data.status,
      remarks: data.remarks,
    };

    if (editIndex !== null) {
      updateStagingCuttingInventory(editIndex, payload);
    } else {
      addStagingCuttingInventory(payload);
    }
    form.reset({
      id_raw_material: "",
      rolls: "",
      yards: "",
      status: "",
      remarks: "",
    });
  };

  const handleEdit = (index: number) => {
    const item = stagingCuttingInventory[index];
    if (!item) return;

    setEditIndex(index);
    form.setValue("input_date", new Date(item.date));
    form.setValue("id_raw_material", item.material.toString());
    form.setValue("rolls", item.rolls);
    form.setValue("yards", item.yards.toString());
    form.setValue("status", item.status);
    form.setValue("remarks", item.remarks || "");
  };

  const handleDelete = async (index: number) => {
    try {
      await deleteStagingCuttingInventory(index);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialName = (id: string | number) => {
    const m = rawMaterials
      .map((r) => r.PurchaseListDetail?.map((d) => d))
      .flat()
      .find((r) => r?.id === Number(id));

    return m?.material;
  };

  const stagingCuttingInventory = stagingCuttingInventoryNonLabel.map(
    (item, index) => ({
      ...item,
      id: index,
      materialName: getMaterialName(item.material),
    })
  );

  const onSubmit = async () => {
    try {
      const payload: StaggingMaterialToCutting[] = stagingCuttingInventory.map(
        (item) => ({
          input_date: item.date,
          id_purchase_list_detail: Number(item.material),
          rolls: Number(item.rolls),
          yards: Number(item.yards),
          status: item.status,
          is_active: true,
          remarks: item.remarks,
        })
      );
      const send = await StaggingMaterialToCuttingService.create(payload);
      if (send.status === 201) {
        form.reset();
        resetStagingCuttingInventory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscription = form.watch((data, { name }) => {
      const selectedId = Number(data.id_raw_material);

      // Flatten semua detail dari rawMaterials
      const allDetails = rawMaterials.flatMap(
        (raw) => raw.PurchaseListDetail || []
      );

      // Cari detail berdasarkan id
      const selectedDetail = allDetails.find(
        (d) => Number(d.id) === selectedId
      );

      if (selectedDetail) {
        setMaxRolls(selectedDetail.rolls);
      } else {
        setMaxRolls(0);
      }

      if (name === "rolls") {
        const inputRolls = Number(data.rolls);

        if (inputRolls > maxRolls) {
          form.setValue("rolls", maxRolls.toString());
        }

        if (selectedDetail && inputRolls > 0) {
          const totalYards =
            Number(selectedDetail.yardsPerRoll) * Number(form.watch("rolls"));

          form.setValue("yards", totalYards.toString());
        } else {
          form.setValue("yards", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch, rawMaterials, setMaxRolls, maxRolls]);

  return {
    form,
    fields,
    editIndex,
    setEditIndex,
    addToTabel,
    setIsLoading,
    stagingCuttingInventory,
    handleEdit,
    handleDelete,
    onSubmit,
  };
};

export const useStagingCuttingInventoryAction = () => {
  const [data, setData] = useState<StaggingMaterialToCutting[]>([]);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const responseData = await StaggingMaterialToCuttingService.getAll();
      const response = await RawMaterialService.getAll();
      if (!responseData.data.data) {
        setIsLoading(false);
        setRawMaterials([]);
        setData([]);
      }
      setIsLoading(false);
      setData(responseData.data.data);
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

  return { rawMaterials, isLoading, setIsLoading, data, fetchData };
};
