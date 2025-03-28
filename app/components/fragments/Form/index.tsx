import { cn } from "~/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { type Control, type FieldValues, type Path } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Cores } from "~/components/core";
import { Button } from "~/components/ui/button";

interface Fields {
  name: string;
  label: string;
  inputType?: "text" | "password" | "email" | "number" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormProps<T extends FieldValues> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: Fields[];
  control: Control<T>;
  className?: string;
}

const Form = <T extends FieldValues>({ className, ...props }: FormProps<T>) => {
  return (
    <form onSubmit={props.onSubmit} className={cn("w-full mx-auto", className)}>
      {props.fields.map((field, i) => (
        <FormField
          key={i}
          control={props.control}
          name={field.name as Path<T>}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                {field.inputType === "select" ? (
                  <Cores.Select
                    options={field.options}
                    value={formField.value}
                    onChange={formField.onChange}
                  />
                ) : (
                  <Input
                    {...formField}
                    type={field.inputType}
                    placeholder={field.placeholder}
                    className="w-full"
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button className="w-full cursor-pointer" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
