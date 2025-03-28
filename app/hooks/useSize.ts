import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Size } from "~/types/size";
import { SizesService } from "~/services/size.service";

const formSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
  remarks: z.string().optional(),
});

export const useSizeForm = (fetchData: () => Promise<void>) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "size",
      label: "Size",
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

  const handleEdit = (size: Size) => {
    setSelectedSize(size);
    form.setValue("size", size.size);
    form.setValue("remarks", size.remarks || "");
  };

  useEffect(() => {
    if (selectedSize) {
      form.setValue("size", selectedSize.size);
      form.setValue("remarks", selectedSize.remarks || "");
    }
  }, [selectedSize]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        size: data.size,
        remarks: data.remarks || "-",
        is_active: 1,
      };
      if (selectedSize) {
        await SizesService.update(selectedSize.id as number, payload as Size);
      } else {
        await SizesService.create(payload as Size);
      }
      form.reset();
      setSelectedSize(null);
      await fetchData();
      if (selectedSize) {
        await SizesService.update(selectedSize.id as number, payload as Size);
      } else {
        await SizesService.create(payload as Size);
      }
      form.reset();
      setSelectedSize(null);
      await fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while processing the request.",
      });
    }
  };

  const handleDelete = async (size: Size) => {
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
        await SizesService.delete(size.id as number);
        Swal.fire("Terhapus!", "Data Size berhasil dihapus.", "success");
        await fetchData();
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  return {
    form,
    fields,
    onSubmit,
    handleEdit,
    handleDelete,
  };
};

export const useSizeAction = () => {
  const [data, setData] = useState<Size[]>([]);

  const fetchData = async () => {
    try {
      const response = await SizesService.getAll();
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
