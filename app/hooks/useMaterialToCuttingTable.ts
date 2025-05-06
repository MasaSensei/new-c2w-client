import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const formSchema = z.object({
  date: z.date(),
  material: z.string().min(1, { message: "Material is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  yard: z.string().min(1, { message: "Yard is required" }),
});

export const useMaterialToCuttingTableForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      material: "",
      rolls: "",
      yard: "",
    },
  });

  const fields = [
    {
      name: "date",
      label: "Date",
      inputType: "date" as const,
    },
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      options: [],
    },
    {
      name: "rolls",
      label: "Rolls",
      inputType: "number" as const,
    },
    {
      name: "yard",
      label: "Yard",
      inputType: "number" as const,
    },
  ];

  return { form, fields };
};
