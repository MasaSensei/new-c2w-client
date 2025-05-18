import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const formSchema = z.object({
  date: z.date(),
  material: z.string().min(1, { message: "Material is required" }),
  tailors: z.string().min(1, { message: "Tailors is required" }),
  rolls: z.string().min(1, { message: "Rolls is required" }),
  yard: z.string().min(1, { message: "Yard is required" }),
});

export const useTailoringInventoryForm = () => {
  const [maxRolls, setMaxRolls] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      material: "",
      tailors: "",
      rolls: "0",
      yard: "0",
    },
  });

  const fields = [
    {
      name: "date",
      label: "Date",
      inputType: "date" as const,
    },
    //
    {
      name: "tailors",
      label: "Tailors",
      inputType: "select" as const,
      options: [
        { value: "1", label: "Tailors 1" },
        { value: "2", label: "Tailors 2" },
        { value: "3", label: "Tailors 3" },
      ],
    },
    //
    {
      name: "material",
      label: "Material",
      inputType: "select" as const,
      options: [
        { value: "1", label: "Material 1 (2x200)" },
        { value: "2", label: "Material 2 (4x800)" },
        { value: "3", label: "Material 3 (5x1000)" },
      ],
    },
    {
      name: "rolls",
      label: "Rolls",
      inputType: "number" as const,
      max: maxRolls,
    },
    {
      name: "yard",
      label: "Yard",
      inputType: "number" as const,
      disabled: true,
    },
  ];

  //     useEffect(() => {
  //     const subscription = form.watch((data, { name }) => {
  //       if (name === "tailors") {
  //         setSelectedWorkerId(data.tailors || null);
  //         form.setValue("material", ""); // reset pilihan material saat ganti worker
  //       }

  //       const selectedId = Number(data.material);
  //       const selectedDetail = material.find((m: any) => m.id === selectedId);

  //       if (selectedDetail) {
  //         setMaxRolls(selectedDetail.rolls);
  //       } else {
  //         setMaxRolls(0);
  //       }

  //       if (name === "rolls") {
  //         const inputRolls = Number(data.rolls);
  //         if (inputRolls > maxRolls) {
  //           form.setValue("rolls", maxRolls.toString());
  //         }

  //         if (selectedDetail && inputRolls > 0) {
  //           const totalYards = Number(selectedDetail.yards) * inputRolls;
  //           form.setValue("yard", totalYards.toString());
  //         } else {
  //           form.setValue("yard", "");
  //         }
  //       }
  //     });

  //     return () => subscription.unsubscribe();
  //   }, [form.watch, material, setMaxRolls, maxRolls]);

  return { form, fields, editIndex, setEditIndex };
};
