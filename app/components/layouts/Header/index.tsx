import { SidebarTrigger } from "~/components/ui/sidebar";

const Header = () => {
  return (
    <nav className="py-3 flex justify-between items-center text-black border-b bg-white shadow-sm">
      <SidebarTrigger />
      <div className="relative px-4">
        <button className="flex items-center space-x-2">
          <img
            src={"/images/Citlali.jpeg"}
            width={100}
            height={100}
            alt="profile"
            className="rounded-full w-8 h-8 opacity-80"
          />
          <span className="font-bold text-[15px] text-gray-700">Admin</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
