import { Layouts } from "~/components/layouts";
import TailoringProgressPage from "~/components/pages/(Tailors)/tailoring-progress/tailoringProgress";
export default function TailorProgress() {
  return (
    <Layouts.PrivateRoute>
      <TailoringProgressPage />
    </Layouts.PrivateRoute>
  );
}
