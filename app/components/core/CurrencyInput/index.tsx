import { useState } from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { formatCurrency } from "~/utils/currency";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  className,
  value,
  onChange,
  onBlur,
  disabled,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    onBlur?.(value);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return isEditing ? (
    <Input
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className={cn("w-full", className)}
      readOnly={disabled}
    />
  ) : (
    <Input
      value={formatCurrency(value)}
      onFocus={handleFocus}
      className={cn("w-full", className)}
      readOnly
    />
  );
};

export default CurrencyInput;
