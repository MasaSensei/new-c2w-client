import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import SizePage from "~/components/pages/(MasterData)/size/size";

export default function Size() {
  return (
    <Layouts.PrivateRoute>
      <SizePage />
    </Layouts.PrivateRoute>
  );
}
