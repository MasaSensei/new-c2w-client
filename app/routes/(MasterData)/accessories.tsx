import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import AccessoriesPage from "~/components/pages/(MasterData)/accessories/accessories";

export default function ItemColor() {
  return (
    <Layouts.PrivateRoute>
      <AccessoriesPage />
    </Layouts.PrivateRoute>
  );
}
