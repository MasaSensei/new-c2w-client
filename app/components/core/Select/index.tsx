import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

interface SelectProps {
  options: { value: string; label: string }[] | undefined;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = props.options?.filter((option) => {
    return option.label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Popover
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) setSearch("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", props.className)}
        >
          {props.value
            ? props?.options?.find(
                (framework) => framework.value === props.value
              )?.label
            : props.placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={setSearch}
            value={search}
            placeholder={`Search ${props.placeholder}...`}
            className="h-9"
          />
          <CommandList>
            {filteredOptions?.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      props.onChange(
                        currentValue === props.value ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        props.value === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Select;
