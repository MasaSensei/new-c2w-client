import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useStagingCuttingInventoryAction } from "~/hooks/useStagingCuttingInventory";
import formatDate from "~/utils/formatDate";
import { useState } from "react";
import { XIcon } from "lucide-react";
import {
  useCuttingProgressAction,
  useCuttingProgressForm,
} from "~/hooks/useCuttingProgress";
import { Form } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";

const StagingCuttingInventoryPage = () => {
  const { data, isLoading, setIsLoading, rawMaterials, fetchData } =
    useStagingCuttingInventoryAction();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    workers,
    materials,
    fetchData: fetchDataWorkers,
    isLoading: isLoadingWorkers,
    setIsLoading: setIsLoadingWorkers,
  } = useCuttingProgressAction();
  const { form, fields, addToTable } = useCuttingProgressForm(
    fetchDataWorkers,
    setIsLoadingWorkers,
    workers,
    materials
  );
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Staging Cutting Inventory"
        button={
          <Cores.Button
            onClick={() => setIsModalOpen(true)}
            className="bg-lime-500 hover:bg-lime-600"
          >
            Send to Cutters
          </Cores.Button>
        }
      />
      {isModalOpen && (
        <Layouts.ExtendedPopup>
          <Cores.Card
            className="w-[1300px] h-[590px] overflow-y-scroll"
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Send to Cutting</h3>
                <Cores.Button
                  className="bg-transparent shadow-none hover:bg-transparent"
                  onClick={() => setIsModalOpen(false)}
                >
                  <XIcon className="h-4 w-4 text-black" />
                </Cores.Button>
              </div>
            }
            content={
              <div className="grid lg:grid-cols-12 gap-4">
                <Form {...form}>
                  <>
                    <div className="col-span-4 bg-slate-200 p-4 rounded-lg">
                      <Fragments.Form
                        fields={fields}
                        control={form.control}
                        rowClassName="grid grid-cols-2 gap-4"
                        columnClassName="last:col-span-2 nth-3:col-span-2 nth-4:col-span-2"
                        className="flex gap-5"
                        additional={
                          <>
                            <Separator />
                            <Button
                              className="w-1/4 flex items-center justify-center bg-slate-700 hover:bg-slate-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
                              onClick={() => {
                                addToTable(form.getValues());
                              }}
                              type="button"
                            >
                              Add Item
                            </Button>
                          </>
                        }
                      />
                    </div>
                    <div className="col-span-8">
                      <h1 className="text-lg font-semibold -mt-10 mb-2.5">
                        Items:
                      </h1>
                    </div>
                  </>
                </Form>
              </div>
            }
          />
        </Layouts.ExtendedPopup>
      )}
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
