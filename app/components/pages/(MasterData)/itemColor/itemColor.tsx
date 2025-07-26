import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const ItemColorPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Item Color" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["ID", "Item ID", "Color ID"]}
          bodies={[]}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default ItemColorPage;
