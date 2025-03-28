import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
});

export const useCodeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const fields = [
    {
      name: "code",
      label: "Code",
      inputType: "text" as const,
      placeholder: "ABC-123",
    },
  ];

  return { form, fields };
};
