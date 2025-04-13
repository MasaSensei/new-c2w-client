import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import {
  useStagingCuttingInventoryForm,
  useStagingCuttingInventoryAction,
} from "~/hooks/useStagingCuttingInventory";
import formatDate from "~/utils/formatDate";

const StagingCuttingInventoryPage = () => {
  const { data, isLoading, setIsLoading, rawMaterials, fetchData } =
    useStagingCuttingInventoryAction();
  const { form, fields } = useStagingCuttingInventoryForm(
    fetchData,
    setIsLoading,
    rawMaterials
  );
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Staging Cutting Inventory" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          bodiesClassName="text-xs"
          headers={["Date", "Material", "Rolls", "Yards", "Status", "Remarks"]}
          bodies={data.map((item, idx) => [
            formatDate(item.input_date),
            item.PurchaseListDetail?.material,
            item.rolls,
            item.yards,
            item.status,
            item.remarks || "-",
          ])}
          isLoading={isLoading}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default StagingCuttingInventoryPage;
