import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import CategoryPage from "~/components/pages/(MasterData)/category/category";

export default function Category() {
  return (
    <Layouts.PrivateRoute>
      <CategoryPage />
    </Layouts.PrivateRoute>
  );
}
