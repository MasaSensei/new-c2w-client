import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const TailoringProgressPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Tailor Progress" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["Date", "Invoice", "Tailors", "Total Items"]}
          bodies={[]}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default TailoringProgressPage;
