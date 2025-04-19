import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import CodePage from "../../components/pages/(MasterData)/code/code";

export default function Code() {
  return (
    <Layouts.PrivateRoute>
      <CodePage />
    </Layouts.PrivateRoute>
  );
}
