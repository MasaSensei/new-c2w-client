import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Supplier } from "~/types/supplier";
import { SuppliersService } from "~/services/supplier.service";

const formSchema = z.object({
  supplier: z.string().min(1, { message: "Supplier is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  remarks: z.string().optional(),
});

export const useSupplierForm = (fetchData: () => Promise<void>) => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      phone: "",
      address: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "supplier",
      label: "Supplier",
      inputType: "text" as const,
      placeholder: "Supplier Name",
    },
    {
      name: "phone",
      label: "Phone",
      inputType: "number" as const,
      placeholder: "Phone Number",
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
      inputType: "text" as const,
      placeholder: "Remarks",
    },
  ];

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    form.setValue("supplier", supplier.name);
    form.setValue("phone", supplier.number);
    form.setValue("address", supplier.address);
    form.setValue("remarks", supplier.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        name: data.supplier,
        number: data.phone.toString(),
        address: data.address,
        remarks: data.remarks || "-",
        is_active: true,
      };
      if (selectedSupplier) {
        await SuppliersService.update(selectedSupplier.id as number, payload);
        form.reset();
      } else {
        await SuppliersService.create(payload);
      }
      form.reset();
      setSelectedSupplier(null);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (supplier: Supplier) => {
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
        await SuppliersService.delete(supplier.id as number);
        Swal.fire("Terhapus!", "Data Supplier berhasil dihapus.", "success");
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedSupplier) {
      form.setValue("supplier", selectedSupplier.name);
      form.setValue("phone", selectedSupplier.number);
      form.setValue("address", selectedSupplier.address);
      form.setValue("remarks", selectedSupplier.remarks || "");
    } else {
      form.reset();
    }
  }, [selectedSupplier]);

  return { form, fields, selectedSupplier, handleEdit, onSubmit, handleDelete };
};

export const useSupplierAction = () => {
  const [data, setData] = useState<Supplier[]>([]);

  const fetchData = async () => {
    try {
      const response = await SuppliersService.getAll();
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
