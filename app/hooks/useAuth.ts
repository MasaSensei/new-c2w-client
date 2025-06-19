import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthService } from "~/services/auth.service";
import { useNavigate } from "react-router";

// ----- Schema -----
const loginSchema = z.object({
  username: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const baseRegisterSchema = loginSchema.extend({
  confirm_password: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
});

const registerSchema = baseRegisterSchema.refine(
  (data) => data.password === data.confirm_password,
  {
    message: "Passwords do not match",
    path: ["confirm_password"],
  }
);

// ----- Fields -----
const createFields = (schema: z.ZodObject<any>) =>
  Object.keys(schema.shape).map((key) => ({
    name: key,
    inputType: key.includes("password")
      ? ("password" as const)
      : ("text" as const),
    label: key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    required: true,
  }));

// ----- Hook -----
export const useAuthForm = () => {
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const loginFields = createFields(loginSchema);
  const registerFields = createFields(baseRegisterSchema);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await AuthService.login(data);
      if (response.status === 200) {
        navigate("/material-inventory");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onSubmitRegister = async (data: z.infer<typeof registerSchema>) => {
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
      console.error("Register error:", error);
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
