import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Customer } from "~/types/customer";
import { CustomersService } from "~/services/customer.service";

const formSchema = z.object({
  name: z.string().min(1, { message: "Customer is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  remarks: z.string().optional(),
});

export const useCustomerForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "name",
      label: "Customer",
      inputType: "text" as const,
      placeholder: "Customer Name",
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

  const handleEdit = (Customer: Customer) => {
    setSelectedCustomer(Customer);
    form.setValue("name", Customer.name);
    form.setValue("phone", Customer.number);
    form.setValue("address", Customer.address);
    form.setValue("remarks", Customer.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload = {
        name: data.name,
        number: data.phone.toString(),
        address: data.address,
        remarks: data.remarks || "-",
        is_active: true,
      };
      if (selectedCustomer) {
        await CustomersService.update(selectedCustomer.id as number, payload);
      } else {
        await CustomersService.create(payload);
      }
      form.reset();
      setSelectedCustomer(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (Customer: Customer) => {
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
        await CustomersService.delete(Customer.id as number);
        Swal.fire("Terhapus!", "Data Customer berhasil dihapus.", "success");
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedCustomer) {
      form.setValue("name", selectedCustomer.name);
      form.setValue("phone", selectedCustomer.number);
      form.setValue("address", selectedCustomer.address);
      form.setValue("remarks", selectedCustomer.remarks || "");
    } else {
      form.reset();
    }
  }, [selectedCustomer]);

  return { form, fields, selectedCustomer, handleEdit, onSubmit, handleDelete };
};

export const useCustomerAction = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CustomersService.getAll();
      if (!response.data.data) {
        setIsLoading(false);
        setData([]);
      }
      setIsLoading(false);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData, isLoading, setIsLoading };
};
