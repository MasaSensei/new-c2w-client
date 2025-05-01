import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { Worker } from "~/types/worker";
import { WorkersService } from "~/services/worker.service";

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
  data: Worker[]
) => {
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
      options: data.map((material) => ({
        value: material.id,
        label: material.name,
      })),
    },
    {
      name: "id_worker",
      label: "Worker",
      inputType: "select" as const,
      options: data.map((worker) => ({
        value: worker.id,
        label: worker.name,
      })),
    },
    {
      name: "price",
      label: "Price",
      inputType: "currency" as const,
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "textarea" as const,
      placeholder: "Remarks",
    },
  ];

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

  return { form, fields, onSubmit };
};

export const useWorkerAction = ({ type }: { type: string }) => {
  const [data, setData] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await WorkersService.getAll({ type });
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
