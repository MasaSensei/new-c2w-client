import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

const formSchema = z.object({
  total_roll: z.string().min(1, { message: "Total Roll is required" }),
  material: z.string().min(1, { message: "Material is required" }),
  price_per_yard: z.string().min(1, { message: "Price Per Unit is required" }),
  length_in_yard: z.string().min(1, { message: "Length is required" }),
  total_yard: z.string().min(1, { message: "Total Yard is required" }),
  sub_total: z.string().min(1, { message: "Sub Total is required" }),
  remarks: z.string().optional(),
});

export const usePurchaseDetailForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total_roll: "0",
      material: "0",
      price_per_yard: "0",
      length_in_yard: "0",
      total_yard: "0",
      sub_total: "0",
      remarks: "-",
    },
  });

  const fields = [
    {
      name: "total_roll",
      label: "Total Roll",
      inputType: "number" as const,
      placeholder: "Total Roll",
    },
    {
      name: "material",
      label: "Material",
      inputType: "text" as const,
      placeholder: "Material",
    },
    {
      name: "price_per_yard",
      label: "Price Per Yard",
      inputType: "number" as const,
      placeholder: "Price Per Yard",
    },
    {
      name: "length_in_yard",
      label: "Length In Yard",
      inputType: "number" as const,
      placeholder: "Length In Yard",
    },
    {
      name: "total_yard",
      label: "Total Yard",
      inputType: "number" as const,
      placeholder: "Total Yard",
    },
    {
      name: "sub_total",
      label: "Sub Total",
      inputType: "number" as const,
      placeholder: "Sub Total",
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
