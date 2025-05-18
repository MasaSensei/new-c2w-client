import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const formSchema = z.object({
  date: z.date(),
  size: z.string().min(1, { message: "Size is required" }),
  material: z.string().min(1, { message: "Material is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  yard: z.string().min(1, { message: "Yard is required" }),
});

export const useMaterialToTailorTableForm = (materials: any) => {
  const [maxYards, setMaxYards] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      size: "",
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
      name: "size",
      label: "Size",
      inputType: "select" as const,
      options: [
        { value: "1", label: "Size 1" },
        { value: "2", label: "Size 2" },
        { value: "3", label: "Size 3" },
      ],
      placeholder: "Size",
    },
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      //   options: materials?.map((material: any) => ({
      //     value: material.id.toString(),
      //     label: material.material.toString(),
      //   })),
      options: [
        { value: "1", label: "Material 1 (2x200)" },
        { value: "2", label: "Material 2 (4x800)" },
        { value: "3", label: "Material 3 (5x1000)" },
      ],
      placeholder: "Material",
    },
    {
      name: "rolls",
      label: "Rolls",
      inputType: "number" as const,
      placeholder: "Rolls",
    },
    {
      name: "yard",
      label: `Rolls (${maxYards})`,
      inputType: "number" as const,
      placeholder: "Yard",
    },
  ];

  return { form, fields, editIndex, setEditIndex };
};
