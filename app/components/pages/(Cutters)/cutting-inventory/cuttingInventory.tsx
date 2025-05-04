import formatDate from "~/utils/formatDate";
import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const CuttingInventoryPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Cutting Inventory" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["Date", "Invoice", "Cutters", "Total Items"]}
          bodies={[]}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CuttingInventoryPage;
