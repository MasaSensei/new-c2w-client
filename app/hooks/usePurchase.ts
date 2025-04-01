import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import type { Supplier } from "~/types/supplier";
import { SuppliersService } from "~/services/supplier.service";

const formSchema = z.object({
  invoice_date: z.string().min(1, { message: "Invoice Date is required" }),
  invoice_number: z.string().min(1, { message: "Invoice Number is required" }),
  supplier: z.string().min(1, { message: "Supplier is required" }),
  nominal: z.string().min(1, { message: "Nominal is required" }),
  jatuh_tempo: z.string().min(1, { message: "Jatuh Tempo is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  harga_dibayar: z.string().min(1, { message: "Harga Dibayar is required" }),
  penangguhan: z.string().min(1, { message: "Penangguhan is required" }),
  remarks: z.string().optional(),
});

export const usePurchaseForm = (
  fetchData: () => Promise<void>,
  suppliers: Supplier[] = []
) => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice_date: "",
      invoice_number: "",
      nominal: "",
      jatuh_tempo: "",
      status: "",
      harga_dibayar: "",
      penangguhan: "",
      supplier: "",
      remarks: "",
    },
  });

  const fields = useMemo(
    () => [
      {
        name: "invoice_date",
        label: "Invoice Date",
        inputType: "date" as const,
        placeholder: "Invoice Date",
      },
      {
        name: "invoice_number",
        label: "Invoice Number",
        inputType: "text" as const,
        placeholder: "Invoice Number",
      },
      {
        name: "supplier",
        label: "Supplier",
        inputType: "select" as const,
        placeholder: "Select Supplier",
        options: suppliers.map((supplier) => ({
          value: String(supplier.id),
          label: supplier.name,
        })),
      },
      {
        name: "nominal",
        label: "Nominal",
        inputType: "number" as const,
        placeholder: "Nominal",
      },
      {
        name: "jatuh_tempo",
        label: "Jatuh Tempo",
        inputType: "date" as const,
        placeholder: "Jatuh Tempo",
      },
      {
        name: "status",
        label: "Status",
        inputType: "text" as const,
        placeholder: "Status",
      },
      {
        name: "harga_dibayar",
        label: "Harga Dibayar",
        inputType: "number" as const,
        placeholder: "Harga Dibayar",
      },
      {
        name: "penangguhan",
        label: "Penangguhan",
        inputType: "number" as const,
        placeholder: "Penangguhan",
      },
      {
        name: "remarks",
        label: "Remarks",
        inputType: "textarea" as const,
        placeholder: "Remarks",
      },
    ],
    [suppliers]
  );

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    form.setValue("supplier", supplier.name);
  };

  const onSubmit = async (data: Supplier) => {
    try {
      if (selectedSupplier) {
        await SuppliersService.update(selectedSupplier.id as number, data);
      } else {
        await SuppliersService.create(data);
      }
      form.reset();
      setSelectedSupplier(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    if (selectedSupplier) {
      form.setValue("supplier", selectedSupplier.name);
    }
  }, [selectedSupplier]);

  return { form, fields, handleEdit, onSubmit, selectedSupplier };
};

export const usePurchaseAction = () => {
  const [data, setData] = useState(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const fetchData = async () => {
    try {
      const response = await SuppliersService.getAll();
      if (!response.data.data) {
        setSuppliers([]);
      }
      setSuppliers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, suppliers, fetchData };
};
