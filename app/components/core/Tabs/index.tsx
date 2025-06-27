import { SearchIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";

interface TabsProps {
  defaultValue: string;
  triggers: {
    label: string;
    value: string;
  }[];
  content: {
    value: string;
    content: React.ReactNode;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, triggers, content }) => {
  return (
    <ShadcnTabs className="w-full" defaultValue={defaultValue}>
      <TabsList className="bg-slate-300 w-fit ms-5 mt-6 flex justify-start gap-1 p-1 rounded-md">
        {triggers.map((trigger) => (
          <TabsTrigger
            className="cursor-pointer"
            key={trigger.value}
            value={trigger.value}
          >
            {trigger.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex justify-start items-center">
        <Input
          type="search"
          placeholder="Search..."
          className="w-fit ms-5 mt-6 rounded-r-none rounded-l-md"
        />
        <Button className="w-fit cursor-pointer bg-slate-500 mt-6 rounded-l-none">
          <SearchIcon />
        </Button>
      </div>

      {content.map((content) => (
        <TabsContent
          key={content.value}
          value={content.value}
          className="bg-white p-6 rounded mt-4"
          style={{ textAlign: "left" }}
        >
          {content.content}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
};

export default Tabs;
