import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import ColorPage from "~/components/pages/(MasterData)/color/color";

export default function Color() {
  return (
    <Layouts.PrivateRoute>
      <ColorPage />
    </Layouts.PrivateRoute>
  );
}
