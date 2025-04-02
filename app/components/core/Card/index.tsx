import type React from "react";
import {
  Card as ShadcnCard,
  CardContent,
  CardHeader,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface CardProps {
  className?: string;
  header: React.ReactNode;
  content: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <ShadcnCard className={cn("bg-white", className)}>
      <CardHeader>{props.header}</CardHeader>
      <CardContent>{props.content}</CardContent>
    </ShadcnCard>
  );
};

export default Card;
