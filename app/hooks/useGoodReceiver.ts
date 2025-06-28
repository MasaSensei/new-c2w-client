import { useAuth } from "~/stores/useAuth";
import { useEffect, useState } from "react";
import { GoodReceiverService } from "~/services/goodReceiver.service";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  po_number: z.string().min(1, { message: "PO Number is required" }),
  po_item: z.string().min(1, { message: "PO Item is required" }),
  total_yard: z.number().min(1, { message: "Total Yard is required" }),
  warna_1: z.string().min(1, { message: "Warna 1 is required" }),
  warna_2: z.string().optional(),
});

const notZustandFormSchema = z.object({
  status: z.string().min(1, { message: "Status is required" }),
  jatuh_tempo: z.string().min(1, { message: "Jatuh Tempo is required" }),
  no_invoice: z.string().min(1, { message: "No Invoice is required" }),
  deskripsi: z.string().optional(),
});

export const useGoodReceiverForm = () => {
  const fields = [
    {
      name: "po_number",
      label: "Pilih Po Number",
      inputType: "text" as const,
      placeholder: "Enter PO Number",
    },
    {
      name: "po_item",
      label: "Pilih PO Item",
      inputType: "text" as const,
      placeholder: "Enter PO Item",
    },
    {
      name: "total_yard",
      label: "Total Yard Yang Dipesan",
      inputType: "number" as const,
      placeholder: "Enter Total Yard",
    },
    {
      name: "warna_1",
      label: "Warna 1",
      inputType: "text" as const,
      placeholder: "Enter Warna 1",
    },
    {
      name: "warna_2",
      label: "Warna 2 (Optional)",
      inputType: "text" as const,
      placeholder: "Enter Warna 2 (Optional)",
    },
  ];

  const notZustandFields = [
    {
      name: "status",
      label: "Status",
      inputType: "select" as const,
      placeholder: "Enter Status",
      options: [
        { value: "Diterima", label: "Diterima" },
        { value: "Ditolak", label: "Ditolak" },
      ],
    },
    {
      name: "jatuh_tempo",
      label: "Jatuh Tempo",
      inputType: "date" as const,
      placeholder: "Enter Jatuh Tempo",
    },
    {
      name: "no_invoice",
      label: "No Invoice",
      inputType: "text" as const,
      placeholder: "Enter No Invoice",
    },
    {
      name: "deskripsi",
      label: "Deskripsi",
      inputType: "textarea" as const,
      placeholder: "Enter Deskripsi",
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      po_number: "",
      po_item: "",
      total_yard: 0,
      warna_1: "",
      warna_2: "",
    },
  });

  const notZustandForm = useForm<z.infer<typeof notZustandFormSchema>>({
    resolver: zodResolver(notZustandFormSchema),
    defaultValues: {
      status: "",
      jatuh_tempo: "",
      no_invoice: "",
      deskripsi: "",
    },
  });

  return {
    form,
    fields,
    notZustandForm,
    notZustandFields,
  };
};

export const useGoodReceiverAction = () => {
  const { token } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GoodReceiverService.getAll(token ?? "");
      setData(response.data.result);
    } catch (error) {
      console.error("Error fetching good receivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return { data, fetchData, loading };
};
