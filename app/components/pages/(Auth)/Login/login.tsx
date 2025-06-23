import { Loader } from "lucide-react";
import { Link } from "react-router";
import { Fragments } from "~/components/fragments";
import { Form } from "~/components/ui/form";
import { useAuthForm } from "~/hooks/useAuth";

const LoginPage = () => {
  const { loginFields, loginForm, onSubmit, loading } = useAuthForm();

  return (
    <div className="max-w-md w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold">
          C <span className="text-[20px]">2</span>W Portal
        </h2>
        <h4 className="text-lime-500 text-[17px]">
          Welcome to the Cloth to Wear platform.
        </h4>
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <Form {...loginForm}>
          <Fragments.Form
            fields={loginFields}
            control={loginForm.control}
            columnClassName="mb-5"
            className="flex flex-col gap-5"
            onSubmit={loginForm.handleSubmit(onSubmit)}
          />
        </Form>
      )}
    </div>
  );
};

export default LoginPage;
