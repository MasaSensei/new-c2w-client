import { Button as ShadcnButton } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ButtonProps extends React.ComponentProps<typeof ShadcnButton> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  to?: string;
  childrenSubmenu?: React.ReactNode;
  isCollapsed?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <>
      <ShadcnButton
        onClick={props.onClick}
        className={cn(className, "cursor-pointer")}
      >
        {props.icon && <span className="mr-2">{props.icon}</span>}
        <span className="text-sm mt-[0.5px] text-justify flex-1">
          {props.children}
        </span>
      </ShadcnButton>
    </>
  );
};

export default Button;
