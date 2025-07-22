import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

interface PopupProps {
  title: string;
  button: React.ReactNode;
  content: React.ReactNode;
  trigger?: (open: boolean) => void;
  height?: string;
  width?: string;
  description?: string;
}

const Popup: React.FC<PopupProps> = ({ title, ...props }) => {
  return (
    <Dialog onOpenChange={props.trigger}>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center justify-between gap-2 me-3">
          {props.button}
        </div>
      </DialogTrigger>
      <DialogContent
        className={cn("overflow-y-auto", props.height, props.width)}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.content}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
