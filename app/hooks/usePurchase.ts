import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import type { Supplier } from "~/types/supplier";
import type { PurchaseList } from "~/types/purchaseList";
import { SuppliersService } from "~/services/supplier.service";
import { PurchaseListService } from "~/services/purchaseList.service";

const formSchema = z.object({
  invoice_date: z.date(),
  invoice_number: z.string().min(1, { message: "Invoice Number is required" }),
  supplier: z.string().min(1, { message: "Supplier is required" }),
  nominal: z.string(),
  jatuh_tempo: z.date(),
  status: z.string().min(1, { message: "Status is required" }),
  harga_dibayar: z.string(),
  penangguhan: z.string(),
  remarks: z.string().optional(),
});

export const usePurchaseForm = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  fetchData: () => Promise<void>,
  suppliers: Supplier[] = []
) => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<PurchaseList | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice_date: new Date(),
      invoice_number: "",
      nominal: "0",
      jatuh_tempo: new Date(),
      status: "",
      harga_dibayar: "0",
      penangguhan: "0",
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
        name: "jatuh_tempo",
        label: "Jatuh Tempo",
        inputType: "date" as const,
        placeholder: "Jatuh Tempo",
      },
      {
        name: "status",
        label: "Status",
        inputType: "select" as const,
        placeholder: "Status",
        options: [
          { value: "paid", label: "Paid" },
          { value: "overdue", label: "Overdue" },
        ],
      },
      {
        name: "harga_dibayar",
        label: "Harga Dibayar",
        inputType: "currency" as const,
        placeholder: "Harga Dibayar",
      },
      {
        name: "penangguhan",
        label: "Penangguhan",
        inputType: "currency" as const,
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

  const handleTest = async (data: Partial<z.infer<typeof formSchema>>) => {
    console.log(data);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload = {
        tanggal: data.invoice_date,
        invoice_number: data.invoice_number,
        id_supplier: Number(data.supplier),
        nominal: data.nominal || 0,
        jatuh_tempo: data.jatuh_tempo,
        status: data.status,
        payment: data.harga_dibayar || 0,
        outstanding: data.penangguhan || 0,
        remarks: data.remarks,
      };

      if (selectedItem) {
        await PurchaseListService.update(
          selectedItem.id as number,
          payload as PurchaseList
        );
      } else {
        await PurchaseListService.create(payload as PurchaseList);
      }
      form.reset();
      setSelectedSupplier(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSupplier) {
      form.setValue("supplier", selectedSupplier.name);
    }
  }, [selectedSupplier]);

  return { form, fields, handleEdit, onSubmit, selectedSupplier, handleTest };
};

export const usePurchaseAction = () => {
  const [data, setData] = useState<PurchaseList[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await PurchaseListService.getAll();
      const responseSupplier = await SuppliersService.getAll();
      if (!responseSupplier.data.data || !response.data.data) {
        setIsLoading(false);
        setData([]);
        setSuppliers([]);
      }
      setData(response.data.data);
      setSuppliers(responseSupplier.data.data);
      setIsLoading(false);
    } catch (error) {
      setData([]);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, suppliers, fetchData, isLoading, setIsLoading };
};
