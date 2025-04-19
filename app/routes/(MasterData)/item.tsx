import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import ItemPage from "~/components/pages/(MasterData)/item/item";

export default function Item() {
  return (
    <Layouts.PrivateRoute>
      <ItemPage />
    </Layouts.PrivateRoute>
  );
}
