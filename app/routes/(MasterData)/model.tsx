import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import ModelPage from "../../components/pages/(MasterData)/model/model";

export default function Model() {
  return (
    <Layouts.PrivateRoute>
      <ModelPage />
    </Layouts.PrivateRoute>
  );
}
