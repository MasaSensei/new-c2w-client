import { Form } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import formatDate from "~/utils/formatDate";
import { useState } from "react";
import { Pen, Trash2, XIcon } from "lucide-react";
import { useStaggingTailorsInventoryAction } from "~/hooks/useStagingTailorsInventory";

const StagingTailorInventoryPage = () => {
  const { data, isLoading, setIsLoading } = useStaggingTailorsInventoryAction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Staging Tailors Inventory"
        button={
          <Cores.Button
            onClick={() => setIsModalOpen(true)}
            className="bg-lime-500 hover:bg-lime-600"
          >
            Send to Tailors
          </Cores.Button>
        }
      />
      {isModalOpen && (
        <Layouts.ExtendedPopup>
          <Cores.Card
            className="w-[1300px] h-[590px] overflow-y-scroll"
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Send to Tailors</h3>
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
                {/* <Form {...form}>
                  <>
                    <div className="col-span-4 bg-slate-200 p-4 rounded-lg">
                      <Fragments.Form
                        fields={fields}
                        control={form.control}
                        rowClassName="grid grid-cols-2 gap-4"
                        columnClassName="last:col-span-2  nth-5:col-span-2"
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
                      <Cores.Table
                        headersClassName="text-xs nth-2:text-start nth-3:text-end text-center"
                        headers={["Total Roll", "Bahan", "Yards"]}
                        bodiesClassName="text-xs w-full nth-2:text-start nth-3:text-end text-center"
                        bodies={cuttingProgress.map((item) => [
                          item.rolls,
                          item.material,
                          item.yards,
                        ])}
                        action={(idx) => (
                          <div className="flex flex-row flex-wrap items-center gap-3 justify-center">
                            <Pen
                              onClick={() => handleEdit(idx)}
                              className="text-black w-2.5 h-2.5 cursor-pointer"
                            />
                            <Trash2
                              onClick={() => handleDeleteItem(idx)}
                              className="text-black w-2.5 h-2.5 cursor-pointer"
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="col-span-12 text-center">
                      <Button
                        type="button"
                        onClick={() => {
                          cancel();
                          closeModal();
                        }}
                        className="bg-transparent me-2 hover:bg-slate-900 border border-slate-700 transition duration-300 ease-in-out cursor-pointer mx-auto text-slate-700 hover:text-white text-sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => {
                          closeModal();
                          onSubmit();
                        }}
                        className="bg-lime-700 ms-2 hover:bg-lime-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
                      >
                        Save
                      </Button>
                    </div>
                  </>
                </Form> */}
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
            item.CuttingInventoryDetail?.CuttingInventory?.item,
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

export default StagingTailorInventoryPage;
