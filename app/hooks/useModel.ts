import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Model } from "~/types/model";
import { ModelsService } from "~/services/model.service";

const formSchema = z.object({
  model: z.string().min(1, { message: "Model is required" }),
  remarks: z.string().optional(),
});

export const useModelForm = (fetchData: () => Promise<void>) => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "model",
      label: "Model",
      inputType: "text" as const,
      placeholder: "ABC-123",
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "text" as const,
      placeholder: "noted",
    },
  ];

  const handleEdit = (model: Model) => {
    setSelectedModel(model);
    form.setValue("model", model.model);
    form.setValue("remarks", model.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        model: data.model,
        remarks: data.remarks || "-",
        is_active: 1,
      };
      if (selectedModel) {
        await ModelsService.update(
          selectedModel.id as number,
          payload as Model
        );
      } else {
        await ModelsService.create(payload as Model);
      }
      form.reset();
      setSelectedModel(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (model: Model) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ModelsService.delete(model.id as number);
        Swal.fire("Terhapus!", "Data Model berhasil dihapus.", "success");
        await fetchData();
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedModel) {
      form.setValue("model", selectedModel.model);
      form.setValue("remarks", selectedModel.remarks || "");
    }
  }, [selectedModel]);

  return {
    form,
    fields,
    selectedModel,
    handleEdit,
    onSubmit,
    handleDelete,
  };
};

export const useModelAction = () => {
  const [data, setData] = useState<Model[]>([]);

  const fetchData = async () => {
    try {
      const response = await ModelsService.getAll();
      if (!response.data.data) {
        setData([]);
      }
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData };
};
