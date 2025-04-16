import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useCuttingProgressAction } from "~/hooks/useCuttingProgress";
import formatDate from "~/utils/formatDate";

const CuttingProgressPage = () => {
  const { data, isLoading, setIsLoading, fetchData } =
    useCuttingProgressAction();
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Cutting Progress" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          isLoading={isLoading}
          headers={["Date", "Invoice", "Cutters", "Total Items"]}
          bodies={data?.map((item) => [
            formatDate(item.date),
            item.invoice,
            item.Worker.name,
            (item.CuttingProgressMaterial || []).length,
          ])}
          details={(idx) => (
            <Cores.Table
              className="w-full bg-slate-100 overflow-x-auto"
              headers={["Material", "Rolls", "Yards", "Status"]}
              bodies={data[idx]?.CuttingProgressMaterial.map((item) => [
                item.material,
                item.rolls,
                item.yards,
                item.status,
              ])}
            />
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CuttingProgressPage;
