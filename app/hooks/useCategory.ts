import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CategoriesService } from "~/services/category.service";
import Swal from "sweetalert2";
import type { Category } from "~/types/category";
import { useState, useEffect } from "react";

const formSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
  remarks: z.string().optional(),
});

export const useCategoryForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "category",
      label: "Category",
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

  const handleEdit = (Category: Category) => {
    setSelectedCategory(Category);
    form.setValue("category", Category.category);
    form.setValue("remarks", Category.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload: Category = {
        category: data.category.toUpperCase(),
        remarks: data.remarks || "-",
        is_active: true,
      };
      if (selectedCategory) {
        await CategoriesService.update(
          selectedCategory.id as number,
          payload as any
        );
        form.reset({
          category: "",
        });
      } else {
        await CategoriesService.create(payload as any);
      }
      form.reset();
      setSelectedCategory(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleDelete = async (Category: Category) => {
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
        await CategoriesService.delete(Category.id as number);
        Swal.fire("Terhapus!", "Data Category berhasil dihapus.", "success");
        await fetchData();
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  return { form, fields, handleEdit, selectedCategory, onSubmit, handleDelete };
};

export const useCategoryAction = () => {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CategoriesService.getAll();
      console.log(response);
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
