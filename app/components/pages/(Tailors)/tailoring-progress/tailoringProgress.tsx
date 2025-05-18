import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useState } from "react";
import { Pen, Trash2, XIcon } from "lucide-react";
import formatDate from "~/utils/formatDate";
import { useMaterialToTailorTableForm } from "~/hooks/useTailorsInventory";

const TailoringProgressPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const isModalOpen = selectedIndex !== null;
  const closeModal = () => setSelectedIndex(undefined);
  const { form, fields } = useMaterialToTailorTableForm([]);
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Tailor Progress" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["Date", "Invoice", "Tailors", "Total Items"]}
          bodies={[
            ["2023-01-01", "INV-001", "John Doe", "100"],
            ["2023-01-02", "INV-002", "Jane Doe", "200"],
            ["2023-01-03", "INV-003", "Bob Smith", "300"],
          ]}
          action={(idx) => (
            <Cores.Button
              onClick={() => setSelectedIndex(1)}
              className="bg-lime-500 hover:bg-lime-600"
            >
              Selesai
            </Cores.Button>
          )}
          details={(idx) => (
            <Cores.Table
              className="w-full bg-slate-100 overflow-x-auto"
              headers={["Material", "Rolls", "Yards", "Status"]}
              // bodies={data[idx]?.CuttingProgressMaterial.map((item) => [
              //   item.material,
              //   <div className="flex flex-col justify-start items-start gap-2">
              //     <h1 className="text-sm">
              //       Left: <span className="font-bold">{item.rolls}</span>
              //     </h1>
              //     <h1 className="text-sm text-red-500">
              //       Used: <span className="font-bold">{item.rolls_used}</span>
              //     </h1>
              //   </div>,
              //   <div className="flex flex-col justify-start items-start gap-2">
              //     <h1 className="text-sm">
              //       Left: <span className="font-bold">{item.yards}</span>
              //     </h1>
              //     <h1 className="text-sm text-red-500">
              //       Used: <span className="font-bold">{item.yards_used}</span>
              //     </h1>
              //   </div>,
              //   item.status,
              // ])}
              bodies={[
                [
                  "Material 1",
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h1 className="text-sm">
                      Left: <span className="font-bold">1</span>
                    </h1>
                    <h1 className="text-sm text-red-500">
                      Used: <span className="font-bold">1</span>
                    </h1>
                  </div>,
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h1 className="text-sm">
                      Left: <span className="font-bold">1</span>
                    </h1>
                    <h1 className="text-sm text-red-500">
                      Used: <span className="font-bold">1</span>
                    </h1>
                  </div>,
                  "Status 1",
                ],
                [
                  "Material 2",
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h1 className="text-sm">
                      Left: <span className="font-bold">1</span>
                    </h1>
                    <h1 className="text-sm text-red-500">
                      Used: <span className="font-bold">1</span>
                    </h1>
                  </div>,
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h1 className="text-sm">
                      Left: <span className="font-bold">1</span>
                    </h1>
                    <h1 className="text-sm text-red-500">
                      Used: <span className="font-bold">1</span>
                    </h1>
                  </div>,
                  ,
                  "Status 2",
                ],
                [
                  "Material 3",
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h1 className="text-sm">
                      Left: <span className="font-bold">1</span>
                    </h1>
                    <h1 className="text-sm text-red-500">
                      Used: <span className="font-bold">1</span>
                    </h1>
                  </div>,
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h1 className="text-sm">
                      Left: <span className="font-bold">1</span>
                    </h1>
                    <h1 className="text-sm text-red-500">
                      Used: <span className="font-bold">1</span>
                    </h1>
                  </div>,
                  "Status 3",
                ],
              ]}
            />
          )}
        />

        {isModalOpen && selectedIndex && (
          <Layouts.ExtendedPopup>
            <Cores.Card
              className="w-[1300px] h-[590px] overflow-y-scroll"
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Send Inventory Tailors</h3>
                  <Cores.Button
                    className="bg-transparent shadow-none hover:bg-transparent"
                    onClick={() => closeModal()}
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
                          columnClassName="nth-3:col-span-2"
                          className="flex gap-5"
                          additional={
                            <>
                              <Separator />
                              <Button
                                className="w-1/4 flex items-center justify-center bg-slate-700 hover:bg-slate-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
                                // onClick={(e) => {
                                //   e.preventDefault();
                                //   addToTabel(form.getValues());
                                // }}
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
                          headersClassName="text-xs text-center"
                          headers={["Material", "Rolls", "Yards"]}
                          bodiesClassName="text-xs w-full text-center"
                          // bodies={materialToCuttingTable.map((item) => [
                          //   item.material,
                          //   item.rolls,
                          //   item.yard,
                          // ])}
                          bodies={[]}
                          className="w-full"
                        />
                      </div>
                      <div className="col-span-12 text-center">
                        <Button
                          className="bg-lime-500 hover:bg-lime-600"
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          Close
                        </Button>
                        <Button
                          className="bg-lime-500 hover:bg-lime-600"
                          onClick={() => {
                            // onSubmit();
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </>
                  </Form>
                </div>
              }
            />
          </Layouts.ExtendedPopup>
        )}
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default TailoringProgressPage;
