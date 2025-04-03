import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Item } from "~/types/item";
import { ItemsService } from "~/services/item.service";

const formSchema = z.object({
  item: z.string().min(1, { message: "Item is required" }),
  remarks: z.string().optional(),
});

export const useItemForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "item",
      label: "Item",
      inputType: "text",
      placeholder: "Enter Item",
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "textarea",
      placeholder: "Enter Remarks",
    },
  ];

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    form.setValue("item", item.item);
    form.setValue("remarks", item.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload = {
        item: data.item,
        remarks: data.remarks,
        is_active: true,
      };
      if (selectedItem) {
        await ItemsService.update(selectedItem.id as number, payload as Item);
      } else {
        await ItemsService.create(payload as Item);
      }
      form.reset();
      setSelectedItem(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item: Item) => {
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
        await ItemsService.delete(item.id as number);
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
    selectedItem,
    handleEdit,
    onSubmit,
    handleDelete,
  };
};

export const useItemAction = () => {
  const [data, setData] = useState<Item[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await ItemsService.getAll();
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
