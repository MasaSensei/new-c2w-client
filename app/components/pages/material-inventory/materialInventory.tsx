import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Trash, PenIcon } from "lucide-react";

const MaterialInventoryPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Inventory Bahan Baku"
        button={
          <Cores.Popup
            title="Add Bahan Baku"
            button={
              <Cores.Button className="bg-lime-500 hover:bg-lime-600">
                Add
              </Cores.Button>
            }
            content={
              <div>
                <h1>Ini adalah popup</h1>
              </div>
            }
          />
        }
      />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["No", "Color", "Stok", "Satuan"]}
          bodies={[
            ["1", "Kertas", "10", "Pcs"],
            ["2", "Kertas", "10", "Pcs"],
          ]}
          action={(idx) => (
            <div className="flex gap-4 items-center justify-start">
              <PenIcon className="cursor-pointer h-4 w-4" />
              <Trash className="cursor-pointer h-4 w-4 text-red-500" />
            </div>
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default MaterialInventoryPage;
