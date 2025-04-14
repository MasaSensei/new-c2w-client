import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const TailorStaffPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Tailor Staff" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["Name", "Minimum Cost", "Contact No", "Address"]}
          bodies={[]}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default TailorStaffPage;
