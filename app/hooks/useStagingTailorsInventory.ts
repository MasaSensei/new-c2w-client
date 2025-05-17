import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useStaggingTailorInventoryStore } from "~/stores/useStagingTailorsInventoryStore";
import { StaggingTailorService } from "~/services/staggingTailor.service";

const formSchema = z.object({
  date: z.date(),
  material: z.string().min(1, { message: "Material is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  yards: z.string().min(1, { message: "Yard is required" }),
  remarks: z.string().optional(),
});

export const useStaggingTailorInventoryForm = (
  fetchData: () => void,
  materials: any[]
) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [maxRolls, setMaxRolls] = useState<number>(0);

  console.log(materials);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      material: "",
      rolls: "",
      status: "",
      yards: "",
      remarks: "",
    },
  });

  const {
    addStagingTailorInventory,
    updateStagingTailorInventory,
    deleteStagingTailorInventory,
    resetStagingTailorInventory,
  } = useStaggingTailorInventoryStore();
  const staggingTailorInventoryNonLabel = useStaggingTailorInventoryStore(
    (state) => state.stagingTailorInventory
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
      options: materials.flatMap((material: any) =>
        material.CuttingInventoryDetail.map((detail: any) => ({
          value: detail.id.toString(),
          label: `${material.item} (${detail.rollsLeft} x ${detail.yardsLeft})`,
        }))
      ),
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
    const payload: any = {
      date: new Date(data.date).toISOString(),
      material: data.material,
      rolls: data.rolls.toString(),
      yards: data.yards.toString(),
      status: data.status,
      remarks: data.remarks,
    };

    if (editIndex !== null) {
      updateStagingTailorInventory(editIndex, payload);
    } else {
      addStagingTailorInventory(payload);
    }
    form.reset({
      date: new Date(),
      material: "",
      rolls: "",
      status: "",
      yards: "",
      remarks: "",
    });
  };

  const handleEdit = (index: number) => {
    const item = staggingTailorInventoryNonLabel[index];
    if (!item) return;

    setEditIndex(index);
    form.setValue("date", new Date(item.date));
    form.setValue("material", item.material.toString());
    form.setValue("rolls", item.rolls.toString());
    form.setValue("yards", item.yards.toString());
    form.setValue("status", item.status);
    form.setValue("remarks", item.remarks || "");
  };

  const handleDelete = async (index: number) => {
    try {
      await deleteStagingTailorInventory(index);
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getMaterialName = (detailId: number | string) => {
    for (const material of materials) {
      const detail = material.CuttingInventoryDetail.find(
        (d: any) => d.id === Number(detailId)
      );
      if (detail) {
        return material.item;
      }
    }
    return "";
  };

  const staggingTailorInventory = staggingTailorInventoryNonLabel.map(
    (r, i) => ({
      ...r,
      index: i,
      materialName: getMaterialName(r.material),
    })
  );

  const onSubmit = async () => {
    try {
      const payload: any = staggingTailorInventory.map((r) => ({
        input_date: new Date(r.date),
        id_cutting_inventory_detail: Number(r.material),
        rolls: Number(r.rolls),
        yards: Number(r.yards),
        status: r.status,
        remarks: r.remarks,
      }));
      const send = await StaggingTailorService.create(payload);
      if (send.status === 201) {
        form.reset({
          date: new Date(),
          material: "",
          rolls: "",
          status: "",
          yards: "",
          remarks: "",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      //   resetStagingTailorInventory();
    }
  };

  const cancelForm = () => {
    resetStagingTailorInventory();
    form.reset({
      date: new Date(),
      material: "",
      rolls: "",
      status: "",
      yards: "",
      remarks: "",
    });
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      const selectedId = Number(value.material);

      const allDetails = materials.flatMap(
        (material) => material.CuttingInventoryDetail || []
      );

      const selectedDetail = allDetails.find(
        (detail) => detail.id === selectedId
      );

      if (selectedDetail) {
        setMaxRolls(selectedDetail.rollsLeft);
      } else {
        setMaxRolls(0);
      }

      if (name === "rolls") {
        const inputRolls = Number(value.rolls);

        if (inputRolls > maxRolls) {
          form.setValue("rolls", maxRolls.toString());
        }

        if (selectedDetail && inputRolls > 0) {
          const totalYards =
            selectedDetail.yardsLeft * Number(form.watch("rolls"));
          form.setValue("yards", totalYards.toString());
          console.log(totalYards);
        } else {
          form.setValue("yards", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [maxRolls, form.watch, materials, setMaxRolls]);

  return {
    form,
    fields,
    addToTabel,
    handleEdit,
    handleDelete,
    onSubmit,
    editIndex,
    cancelForm,
    setEditIndex,
    staggingTailorInventory,
  };
};

export const useStaggingTailorsInventoryAction = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await StaggingTailorService.getAll();
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
