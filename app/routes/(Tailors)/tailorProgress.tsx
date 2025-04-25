import { Layouts } from "~/components/layouts";
import TailorProgressPage from "~/components/pages/(Tailors)/tailor-progress/tailorProgress";

export default function TailorProgress() {
  return (
    <Layouts.PrivateRoute>
      <TailorProgressPage />
    </Layouts.PrivateRoute>
  );
}
