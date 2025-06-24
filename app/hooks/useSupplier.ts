import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Supplier } from "~/types/supplier";
import { SuppliersService } from "~/services/supplier.service";
import { useAuth } from "~/stores/useAuth";

const formSchema = z.object({
  supplier: z.string().min(1, { message: "Supplier is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  remarks: z.string().optional(),
});

const defaultValues = {
  supplier: "",
  phone: "",
  address: "",
  remarks: "",
};

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

function setFormValues(
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>,
  supplier: any | null
) {
  if (supplier) {
    form.setValue("supplier", supplier.supplier_name);
    form.setValue("phone", supplier.supplier_contact);
    form.setValue("address", supplier.supplier_address);
    form.setValue("remarks", supplier.remarks || "");
  } else {
    form.reset(defaultValues);
  }
}

export const useSupplierForm = (fetchData: () => Promise<void>) => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const { token } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleEdit = (supplier: any) => {
    setSelectedSupplier(supplier);
    setFormValues(form, supplier);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload: Supplier = {
        name: data.supplier,
        number: data.phone.toString(),
        address: data.address,
        remarks: data.remarks || "-",
      };
      if (selectedSupplier) {
        await SuppliersService.update(selectedSupplier.id as number, payload);
      } else {
        await SuppliersService.create(payload, token ?? "");
      }
      await fetchData();
      setSelectedSupplier(null);
      form.reset(defaultValues);
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
        await fetchData();
        Swal.fire("Terhapus!", "Data Supplier berhasil dihapus.", "success");
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  useEffect(() => {
    setFormValues(form, selectedSupplier);
  }, [selectedSupplier]);

  return { form, fields, selectedSupplier, handleEdit, onSubmit, handleDelete };
};

export const useSupplierAction = () => {
  const { token } = useAuth();
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await SuppliersService.getAll(token ?? "");
      setData(response.data.result || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  return { data, fetchData };
};
