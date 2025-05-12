import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useCuttingInventoryAction } from "~/hooks/useCuttingInventory";
import formatDate from "~/utils/formatDate";

const CuttingInventoryPage = () => {
  const { data, isLoading } = useCuttingInventoryAction();
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Cutting Inventory"
        button={
          <div className="flex gap-2 flex-nowrap items-center justify-center">
            <Cores.Button
              // onClick={() => setIsModalOpen(true)}
              className="bg-slate-500 hover:bg-slate-600"
            >
              Send to Tailor
            </Cores.Button>
          </div>
        }
      />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          isLoading={isLoading}
          headers={["Material", "Total Rolls", "Total Yards"]}
          bodies={data?.map((item) => [item.item, item.rolls, item.yards])}
          details={(idx) => (
            <Cores.Table
              headers={["Date", "Worker", "Rolls", "Yards"]}
              bodies={data[idx].CuttingInventoryDetail.map((item: any) => [
                formatDate(item.CuttersInventory.date),
                item.CuttersInventory.CuttingProgressMaterial.CuttingProgress
                  .Worker.name,
                item.rolls,
                item.yards,
              ])}
            />
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CuttingInventoryPage;
