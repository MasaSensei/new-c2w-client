import { Link } from "react-router";
import { Fragments } from "~/components/fragments";
import { Form } from "~/components/ui/form";
import { useAuthForm } from "~/hooks/useAuth";

const LoginPage = () => {
  const { loginFields, loginForm, onSubmit } = useAuthForm();
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
      <Form {...loginForm}>
        <Fragments.Form
          fields={loginFields}
          control={loginForm.control}
          columnClassName="mb-5"
          className="flex flex-col gap-5"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        />
      </Form>
      <div className="flex mt-2 justify-end">
        <Link
          to="/register"
          className="text-sm text-lime-500 hover:text-lime-600"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
