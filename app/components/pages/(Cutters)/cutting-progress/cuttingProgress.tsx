import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const CuttingProgressPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Cutting Progress" />
      <Layouts.SectionLayouts>
        <Cores.Table seachable headers={[]} bodies={[]} />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CuttingProgressPage;
