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
import { Textarea } from "~/components/ui/textarea";

interface Fields {
  name: string;
  label: string;
  inputType?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "select"
    | "date"
    | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormProps<T extends FieldValues> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: Fields[];
  control: Control<T>;
  className?: string;
  rowClassName?: string;
  columnClassName?: string;
  additional?: React.ReactNode;
}

const Form = <T extends FieldValues>({ className, ...props }: FormProps<T>) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn("w-full mx-auto flex flex-col gap-4", className)}
    >
      <div className={cn(props.rowClassName)}>
        {props.fields.map((field, i) => (
          <FormField
            key={i}
            control={props.control}
            name={field.name as Path<T>}
            render={({ field: formField }) => (
              <FormItem className={cn(props.columnClassName, "w-full")}>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.inputType === "select" ? (
                    <Cores.Select
                      options={field.options}
                      placeholder={field.placeholder}
                      value={formField.value}
                      onChange={formField.onChange}
                    />
                  ) : field.inputType === "textarea" ? (
                    <Textarea
                      {...formField}
                      placeholder={field.placeholder}
                      rows={4}
                      className={cn(props.columnClassName, "w-full bg-white")}
                    />
                  ) : (
                    <Input
                      {...formField}
                      type={field.inputType}
                      placeholder={field.placeholder}
                      className="bg-white"
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      {props.additional}
      <Button className="w-full cursor-pointer" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
