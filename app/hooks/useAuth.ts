import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthService } from "~/services/auth.service";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "~/stores/useAuth";

// ----- Schema -----
const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
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
      : ("email" as const),
    label: key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    required: true,
  }));

// ----- Hook -----
export const useAuthForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const loginFields = createFields(loginSchema);
  const registerFields = createFields(baseRegisterSchema);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const response = await AuthService.login(data);
      if (response.status === 200) {
        const { token } = response.data.result.authorisation;
        const user = response.data.result.user;
        setAuth(token, user);
        navigate("/material-inventory");
      }
      setLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitRegister = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      const { email: username, password } = data;
      const response = await AuthService.register({
        email: username,
        password,
        role: "admin",
      });

      if (response.status === 201) {
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      console.error("Register error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginFields,
    loginForm,
    onSubmit,
    loading,
    registerFields,
    registerForm,
    onSubmitRegister,
  };
};
