import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  Sidebar as SidebarShadcn,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../../../components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

const items = [
  {
    title: "Master Data",
    menus: [
      {
        title: "Code",
        link: "/code",
      },
      {
        title: "Model",
        link: "/model",
      },
      {
        title: "Size",
        link: "/size",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <SidebarShadcn className="mt-8 mx-auto bg-white">
      <SidebarContent className="bg-white">
        <div className="flex items-center px-5">
          <span className="text-2xl">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
            </svg>
          </span>
          <h1 className="text-xl font-bold ml-2 whitespace-nowrap overflow-hidden transition-all duration-300">
            C<span className="text-[12px] font-extrabold">2</span>W Dashboard
          </h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, idx) => (
                <Collapsible
                  key={idx}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.title}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.menus.map((menu, idx) => (
                        <SidebarMenuSub
                          className="hover:bg-gray-100 rounded"
                          key={idx}
                        >
                          <Link className="w-full my-2" to={menu.link}>
                            <SidebarMenuSubItem>
                              {menu.title}
                            </SidebarMenuSubItem>
                          </Link>
                        </SidebarMenuSub>
                      ))}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarShadcn>
  );
};

export default Sidebar;
