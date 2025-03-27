import { cn } from "~/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { type Control, type FieldValues, type Path } from "react-hook-form";

interface Fields {
  name: string;
  label: string;
}

interface FormProps {
  className?: string;
}

const Form: React.FC<FormProps> = ({ className }) => {
  return (
    <form className={cn("w-full mx-auto", className)}>
      <h1>Test</h1>
    </form>
  );
};

export default Form;
