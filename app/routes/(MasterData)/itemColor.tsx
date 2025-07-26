import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import ItemColorPage from "~/components/pages/(MasterData)/itemColor/itemColor";

export default function ItemColor() {
  return (
    <Layouts.PrivateRoute>
      <ItemColorPage />
    </Layouts.PrivateRoute>
  );
}
