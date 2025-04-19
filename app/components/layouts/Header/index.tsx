import { SidebarTrigger } from "~/components/ui/sidebar";
import { Cores } from "~/components/core";
import { useNavigate } from "react-router";
import { AuthService } from "~/services/auth.service";

const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await AuthService.logout();
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="py-3 flex justify-between items-center text-black border-b bg-white shadow-sm">
      <SidebarTrigger />
      <div className="relative px-4">
        <Cores.DropDown
          trigger={
            <button className="flex cursor-pointer items-center space-x-2">
              <img
                src={"/images/Citlali.jpeg"}
                width={100}
                height={100}
                alt="profile"
                className="rounded-full w-8 h-8 opacity-80"
              />
              <span className="font-bold text-[15px] text-gray-700">Admin</span>
            </button>
          }
          content={
            <div className="p-2">
              <button
                onClick={logout}
                className="flex items-center w-full text-red-500 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          }
        />
      </div>
    </nav>
  );
};

export default Header;
