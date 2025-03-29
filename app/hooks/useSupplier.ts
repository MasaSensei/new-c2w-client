import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const formSchema = z.object({
  supplier: z.string().min(1, { message: "Supplier is required" }),
  phone: z.number().min(1, { message: "Phone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  remarks: z.string().optional(),
});

export const useSupplierForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      phone: 0,
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

  return { form, fields };
};
