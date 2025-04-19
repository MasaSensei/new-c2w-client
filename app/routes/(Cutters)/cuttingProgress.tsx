import { Layouts } from "~/components/layouts";
import type { Route } from "../+types/home";
import CuttingProgressPage from "~/components/pages/(Cutters)/cutting-progress/cuttingProgress";

export default function CuttingProgress() {
  return (
    <Layouts.PrivateRoute>
      <CuttingProgressPage />
    </Layouts.PrivateRoute>
  );
}
