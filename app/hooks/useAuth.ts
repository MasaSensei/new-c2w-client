import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthService } from "~/services/auth.service";
import { useNavigate } from "react-router";

const formSchema = z.object({
  username: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const registerFormSchema = z
  .object({
    username: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirm_password: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const useAuthForm = () => {
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const navigate = useNavigate();

  const loginFields = [
    {
      name: "username",
      inputType: "text" as const,
      label: "Username",
      required: true,
    },
    {
      name: "password",
      inputType: "password" as const,
      label: "Password",
      required: true,
    },
  ];

  const registerFields = [
    {
      name: "username",
      inputType: "text" as const,
      label: "Username",
      required: true,
    },
    {
      name: "password",
      inputType: "password" as const,
      label: "Password",
      required: true,
    },
    {
      name: "confirm_password",
      inputType: "password" as const,
      label: "Confirm Password",
      required: true,
    },
  ];

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const onSubmitRegister = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      const { username, password } = data;

      const response = await AuthService.register({
        username,
        password,
        role: "admin",
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return {
    loginFields,
    loginForm,
    onSubmit,
    registerFields,
    registerForm,
    onSubmitRegister,
  };
};
