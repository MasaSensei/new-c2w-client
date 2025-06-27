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
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      po_number: "",
      po_item: "",
    },
  });

  return {
    form,
    fields,
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
