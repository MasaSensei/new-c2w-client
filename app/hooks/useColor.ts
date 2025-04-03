import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Color } from "~/types/color";
import { ColorsService } from "~/services/color.service";

const formSchema = z.object({
  color: z.string().min(1, { message: "Color is required" }),
  remarks: z.string().optional(),
});

export const useColorForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "color",
      label: "Color",
      inputType: "text" as const,
      placeholder: "Color Name",
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "text" as const,
      placeholder: "Remarks",
    },
  ];

  const handleEdit = (color: Color) => {
    setSelectedColor(color);
    form.setValue("color", color.color);
    form.setValue("remarks", color.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload = {
        color: data.color.toUpperCase(),
        remarks: data.remarks,
        is_active: true,
      };
      if (selectedColor) {
        await ColorsService.update(
          selectedColor.id as number,
          payload as Color
        );
      } else {
        await ColorsService.create(payload as Color);
      }
      form.reset();
      setSelectedColor(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (color: Color) => {
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
        await ColorsService.delete(color.id as number);
        Swal.fire("Terhapus!", "Data Color berhasil dihapus.", "success");
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  return {
    form,
    fields,
    selectedColor,
    handleEdit,
    onSubmit,
    handleDelete,
  };
};

export const useColorAction = () => {
  const [data, setData] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await ColorsService.getAll();
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
