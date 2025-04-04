import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { RawMaterial } from "~/types/rawMaterial";
import { RawMaterialService } from "~/services/rawMaterial.service";
import { ColorsService } from "~/services/color.service";
import { ItemsService } from "~/services/item.service";
import { CodesService } from "~/services/code.service";
import type { Item } from "~/types/item";
import type { Color } from "~/types/color";
import type { Code } from "~/types/code";

const formSchema = z.object({
  id_item: z.string().min(1, { message: "Item is required" }),
  id_color: z.string().min(1, { message: "Color is required" }),
  id_color_2: z.string().min(1, { message: "Color 2 is required" }),
  id_code: z.string().min(1, { message: "Code is required" }),
  remarks: z.string().optional(),
});

export const useMaterialInventoryForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  items: Item[],
  colors: Color[],
  codes: Code[]
) => {
  const [selectedItem, setSelectedItem] = useState<RawMaterial | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_item: "0",
      id_color: "0",
      id_color_2: "0",
      id_code: "0",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "id_item",
      label: "Item",
      inputType: "select" as const,
      placeholder: "Select Item",
      options: items.map((item) => ({
        value: String(item.id),
        label: item.item,
      })),
    },
    {
      name: "id_color",
      label: "Color",
      inputType: "select" as const,
      placeholder: "Select Color",
      options: colors.map((item) => ({
        value: String(item.id),
        label: item.color,
      })),
    },
    {
      name: "id_color_2",
      label: "Color 2",
      inputType: "select" as const,
      placeholder: "Select Color 2",
      options: colors.map((item) => ({
        value: String(item.id),
        label: item.color,
      })),
    },
    {
      name: "id_code",
      label: "Code",
      inputType: "select" as const,
      placeholder: "Select Code",
      options: codes.map((item) => ({
        value: String(item.id),
        label: item.code,
      })),
    },
    {
      name: "remarks",
      label: "Remarks",
      inputType: "textarea" as const,
      placeholder: "Remarks",
    },
  ];

  const handleEdit = (item: RawMaterial) => {
    setSelectedItem(item);
    form.setValue("id_item", item.id_item.toLocaleString());
    form.setValue("id_color", item.id_color.toLocaleString());
    form.setValue("id_color_2", item.id_color_2.toLocaleString());
    form.setValue("id_code", item.id_code.toLocaleString());
    form.setValue("remarks", item.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload = {
        id_item: Number(data.id_item),
        id_color: Number(data.id_color),
        id_color_2: Number(data.id_color_2),
        id_code: Number(data.id_code),
        is_active: true,
        remarks: data.remarks,
      };

      if (selectedItem) {
        await RawMaterialService.update(
          selectedItem.id as number,
          payload as RawMaterial
        );
      } else {
        await RawMaterialService.create(payload as RawMaterial);
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

  const handleDelete = async (item: RawMaterial) => {
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
        await RawMaterialService.delete(item.id as number);
        Swal.fire("Terhapus!", "Data Material berhasil dihapus.", "success");
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
    selectedItem,
    setSelectedItem,
    handleEdit,
    handleDelete,
  };
};

export const useMaterialInventoryAction = () => {
  const [data, setData] = useState<RawMaterial[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [codes, setCodes] = useState<Code[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await RawMaterialService.getAll();
      const itemRes = await ItemsService.getAll();
      const colorRes = await ColorsService.getAll();
      const codeRes = await CodesService.getAll();
      if (!response.data.data) {
        setIsLoading(false);
        setData([]);
        setCodes([]);
        setColors([]);
        setItems([]);
      }
      setIsLoading(false);
      setData(response.data.data);
      setItems(itemRes.data.data);
      setColors(colorRes.data.data);
      setCodes(codeRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData, isLoading, setIsLoading, items, colors, codes };
};
