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
      <Fragments.HeaderWithAction button={null} title="Cutting Progress" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          isLoading={isLoading}
          headers={["Date", "End Date", "Invoice", "Cutters", "Total Items"]}
          bodies={data?.map((item) => [
            formatDate(item.date),
            formatDate(item.end_date),
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
                <div className="flex flex-col justify-start items-start gap-2">
                  <h1 className="text-sm">
                    Left: <span className="font-bold">{item.rolls}</span>
                  </h1>
                  <h1 className="text-sm text-red-500">
                    Used: <span className="font-bold">{item.rolls_used}</span>
                  </h1>
                </div>,
                <div className="flex flex-col justify-start items-start gap-2">
                  <h1 className="text-sm">
                    Left: <span className="font-bold">{item.yards}</span>
                  </h1>
                  <h1 className="text-sm text-red-500">
                    Used: <span className="font-bold">{item.yards_used}</span>
                  </h1>
                </div>,
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
