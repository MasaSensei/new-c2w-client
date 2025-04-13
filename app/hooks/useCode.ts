import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { Code } from "~/types/code";
import { CodesService } from "~/services/code.service";
import Swal from "sweetalert2";

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  remarks: z.string().optional(),
});

export const useCodeForm = (
  fetchData: () => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selectedCode, setSelectedCode] = useState<Code | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      remarks: "",
    },
  });

  const fields = [
    {
      name: "code",
      label: "Code",
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

  const handleEdit = (code: Code) => {
    setSelectedCode(code);
    form.setValue("code", code.code);
    form.setValue("remarks", code.remarks || "");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const payload = {
        code: data.code.toUpperCase(),
        remarks: data.remarks || "-",
        is_active: true,
      };
      if (selectedCode) {
        await CodesService.update(selectedCode.id as number, payload as Code);
        form.reset({
          code: "",
        });
      } else {
        await CodesService.create(payload as Code);
      }
      form.reset();
      setSelectedCode(null);
      await fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleDelete = async (code: Code) => {
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
        await CodesService.delete(code.id as number);
        Swal.fire("Terhapus!", "Data Code berhasil dihapus.", "success");
        await fetchData();
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data", "error");
        console.error("Delete error:", error);
      }
    }
  };

  return { form, fields, handleEdit, selectedCode, onSubmit, handleDelete };
};

export const useCodeAction = () => {
  const [data, setData] = useState<Code[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CodesService.getAll();
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
