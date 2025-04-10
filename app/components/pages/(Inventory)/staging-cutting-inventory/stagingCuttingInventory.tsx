import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const StagingCuttingInventoryPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Staging Cutting Inventory" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["No", "Code", "Name", "Action"]}
          bodies={[]}
          isLoading={false}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default StagingCuttingInventoryPage;
