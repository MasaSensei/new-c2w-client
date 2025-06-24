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
import { Eye, EyeOff } from "lucide-react";
import { useState, type ReactNode } from "react";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  inputType?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "select"
    | "date"
    | "textarea"
    | "currency";
  placeholder?: string;
  options?: FieldOption[];
  disabled?: boolean;
  max?: number;
}

export interface FormProps<T extends FieldValues> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: FieldConfig[];
  control: Control<T>;
  className?: string;
  rowClassName?: string;
  columnClassName?: string;
  additional?: ReactNode;
  buttonName?: string;
  buttonClassName?: string;
  buttonType?: "submit" | "reset" | "button";
  renderButton?: () => ReactNode;
}

function renderInput<T extends FieldValues>(
  field: FieldConfig,
  formField: any,
  visiblePasswords: Record<string, boolean>,
  setVisiblePasswords: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >,
  columnClassName?: string
) {
  switch (field.inputType) {
    case "select":
      return (
        <Cores.Select
          options={field.options}
          placeholder={field.placeholder}
          value={formField.value}
          onChange={formField.onChange}
        />
      );
    case "textarea":
      return (
        <Textarea
          {...formField}
          placeholder={field.placeholder}
          rows={4}
          className={cn(columnClassName, "w-full bg-white")}
        />
      );
    case "currency":
      return (
        <Cores.CurrencyInput
          value={formField.value}
          onChange={(val: string) =>
            formField.onChange({ target: { value: val } })
          }
          disabled={field.disabled}
          className={
            field.disabled
              ? "shadow cursor-not-allowed bg-slate-100 border-slate-300 text-slate-900"
              : "bg-white "
          }
        />
      );
    case "date":
      return (
        <Cores.DatePicker
          value={formField.value}
          onChange={formField.onChange}
        />
      );
    case "password":
      return (
        <div className="relative">
          <Input
            {...formField}
            type={visiblePasswords[field.name] ? "text" : "password"}
            placeholder={field.placeholder}
            className={`pr-10 ${
              field.disabled
                ? "shadow cursor-not-allowed bg-slate-100 border-slate-300 text-slate-900"
                : "bg-white "
            }`}
            readOnly={field.disabled}
          />
          <Button
            type="button"
            onClick={() =>
              setVisiblePasswords((prev) => ({
                ...prev,
                [field.name]: !prev[field.name],
              }))
            }
            className="bg-transparent cursor-pointer hover:bg-transparent absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            tabIndex={-1}
          >
            {visiblePasswords[field.name] ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </Button>
        </div>
      );
    default:
      return (
        <Input
          {...formField}
          type={field.inputType}
          placeholder={field.placeholder}
          className={
            field.disabled
              ? "shadow cursor-not-allowed bg-slate-100 border-slate-300 text-slate-900"
              : "bg-white "
          }
          max={field.max}
          readOnly={field.disabled}
        />
      );
  }
}

const Form = <T extends FieldValues>({
  className,
  fields,
  control,
  rowClassName,
  columnClassName,
  additional,
  onSubmit,
  buttonName,
  buttonClassName,
  buttonType,
  renderButton,
}: FormProps<T>) => {
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full mx-auto flex flex-col gap-4", className)}
    >
      <div className={cn(rowClassName)}>
        {fields.map((field, i) => (
          <FormField
            key={i}
            control={control}
            name={field.name as Path<T>}
            render={({ field: formField }) => (
              <FormItem className={cn(columnClassName, "w-full")}>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {renderInput(
                    field,
                    formField,
                    visiblePasswords,
                    setVisiblePasswords,
                    columnClassName
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      {additional}
      {renderButton
        ? renderButton()
        : onSubmit && (
            <Button
              className={cn(buttonClassName, "cursor-pointer")}
              type={buttonType ? buttonType : "submit"}
            >
              {buttonName ? buttonName : "Submit"}
            </Button>
          )}
    </form>
  );
};

export default Form;
