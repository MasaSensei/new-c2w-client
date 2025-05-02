import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { Worker } from "~/types/worker";
import { WorkersService } from "~/services/worker.service";
import { CategoriesService } from "~/services/category.service";
import { useWorkerPricesStore } from "~/stores/useWorkerPrices";
import { WorkerPriceService } from "~/services/workerPrice.service";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  minimum_payment: z
    .string()
    .min(1, { message: "Minimum Payment is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  remarks: z.string().optional(),
});

const workerMaterialPricesSchema = z.object({
  id_material: z.string().min(1, { message: "Material is required" }),
  id_worker: z.string().min(1, { message: "Worker is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  remarks: z.string().optional(),
});

export const useWorkerForm = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  fetchData: () => Promise<void>,
  type: string,
  data: Worker[],
  materialData: any[]
) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      remarks: "",
    },
  });

  const workerMaterialPricesForm = useForm<
    z.infer<typeof workerMaterialPricesSchema>
  >({
    resolver: zodResolver(workerMaterialPricesSchema),
    defaultValues: {
      id_material: "",
      id_worker: "",
      price: "",
      remarks: "",
    },
  });

  const {
    addWorkerPrices,
    updateWorkerPrices,
    deleteWorkerPrices,
    resetWorkerPrices,
  } = useWorkerPricesStore((state) => state);

  const workerPrices = useWorkerPricesStore((state) => state.workerPrices);

  const fields = [
    {
      name: "name",
      label: "Name",
      inputType: "text" as const,
      placeholder: "Name",
    },
    {
      name: "phone",
      label: "Phone",
      inputType: "number" as const,
      placeholder: "Phone Number",
    },
    {
      name: "minimum_payment",
      label: "Minimum Payment",
      inputType: "currency" as const,
    },
    {
      name: "address",
      label: "Address",
      inputType: "text" as const,
      placeholder: "Address",
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "textarea" as const,
      placeholder: "Remarks",
    },
  ];

  const workerMaterialPricesFields = [
    {
      name: "id_material",
      label: "Material",
      inputType: "select" as const,
      options: materialData.map((material) => ({
        value: material.id.toString(),
        label: material.category,
      })),
      placeholder: "Material",
    },
    {
      name: "id_worker",
      label: "Worker",
      inputType: "select" as const,
      options: data.map((worker) => ({
        value: worker.id?.toString() || "",
        label: worker.name,
      })),
      placeholder: "Worker",
    },
    {
      name: "price",
      label: "Price",
      inputType: "currency" as const,
      placeholder: "Price",
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "textarea" as const,
      placeholder: "Remarks",
    },
  ];

  const addToTable = (data: z.infer<typeof workerMaterialPricesSchema>) => {
    const payload: any = {
      id_worker: Number(data.id_worker),
      id_material: Number(data.id_material),
      price: Number(data.price),
      remarks: data.remarks || "-",
    };
    if (editIndex !== null) {
      updateWorkerPrices(editIndex, payload);
    } else {
      addWorkerPrices(payload);
    }
    workerMaterialPricesForm.reset();
  };

  const handleEdit = (index: number) => {
    const item = materialData[index];
    if (!item) return;
    setEditIndex(index);
    workerMaterialPricesForm.setValue("id_material", String(item.id_material));
    workerMaterialPricesForm.setValue("id_worker", String(item.id_worker));
    workerMaterialPricesForm.setValue("price", String(item.price));
    workerMaterialPricesForm.setValue("remarks", item.remarks || "");
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteWorkerPrices(id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const workerPricesOnSubmit = async () => {
    try {
      setIsLoading(true);
      const payload = workerPrices.flatMap((item) => ({
        id_worker_detail: Number(item.id_worker_detail),
        id_category: Number(item.id_category),
        price: Number(item.price),
        remarks: item.remarks || "-",
      }));
      await WorkerPriceService.create(payload);
      resetWorkerPrices();
      fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const workers = workerPrices.map((item, index) => ({
    ...item,
    id: index,
  }));

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload: Worker = {
        name: data.name,
        number: data.phone.toString(),
        minimum_cost: Number(data.minimum_payment),
        address: data.address,
        worker_type_name: type,
        remarks: data.remarks || "-",
        is_active: true,
      };
      await WorkersService.create(payload);
      form.reset();
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    fields,
    onSubmit,
    addToTable,
    handleDeleteItem,
    handleEdit,
    workerPricesOnSubmit,
    workerMaterialPricesForm,
    workerMaterialPricesFields,
    workers,
  };
};

export const useWorkerAction = ({ type }: { type: string }) => {
  const [data, setData] = useState<Worker[]>([]);
  const [materialData, setMaterialData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await WorkersService.getAll({ type });
      const material = await CategoriesService.getAll();
      if (!response.data.data) {
        setIsLoading(false);
        setData([]);
      }
      setIsLoading(false);
      setData(response.data.data);
      setMaterialData(material.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData, isLoading, setIsLoading, materialData };
};
