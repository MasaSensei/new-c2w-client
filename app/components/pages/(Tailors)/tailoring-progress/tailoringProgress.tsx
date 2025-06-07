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
import { useTailoringProgressAction } from "~/hooks/useTailoringProgress";
import { useTailorsInventoryAction } from "~/hooks/useTailorsInventory";

const TailoringProgressPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const isModalOpen = selectedIndex !== null;
  const closeModal = () => setSelectedIndex(undefined);
  const { size } = useTailorsInventoryAction();
  const { data } = useTailoringProgressAction();

  const selectedData = data?.find((item) => item.id === selectedIndex);
  const {
    form,
    fields,
    addToTable,
    cancel,
    onSubmit,
    handleDelete,
    handleEdit,
    materialToTailorTable,
  } = useMaterialToTailorTableForm(
    selectedData?.TailoringProgressMaterial,
    size
  );
  console.log(data);
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Tailor Progress" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          headers={["Date", "Invoice", "Tailors", "Total Items"]}
          bodies={data?.map((item) => [
            formatDate(item.date),
            item.PurchaseListDetail?.PurchaseList?.invoice_number,
            item.Worker?.name,
            item.total_items,
          ])}
          action={(idx) => (
            <Cores.Button
              onClick={() => setSelectedIndex(data[idx]?.id)}
              className="bg-lime-500 hover:bg-lime-600"
            >
              Selesai
            </Cores.Button>
          )}
          details={(idx) => (
            <Cores.Table
              className="w-full bg-slate-100 overflow-x-auto"
              headers={["Material", "Rolls", "Yards", "Status"]}
              bodies={data[idx]?.TailoringProgressMaterial.map((item: any) => [
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
                                onClick={(e) => {
                                  e.preventDefault();
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
                          headersClassName="text-xs text-center"
                          headers={["Material", "Rolls", "Yards", "Size"]}
                          bodiesClassName="text-xs w-full text-center"
                          bodies={materialToTailorTable.map((item) => [
                            item.material,
                            item.pcs,
                            item.yards,
                            item.size,
                          ])}
                          className="w-full"
                          action={(idx) => (
                            <div className="flex flex-row flex-wrap items-center gap-3 justify-center">
                              <Pen
                                onClick={() => handleEdit(idx)}
                                className="text-black w-2.5 h-2.5 cursor-pointer"
                              />
                              <Trash2
                                onClick={() => handleDelete(idx)}
                                className="text-black w-2.5 h-2.5 cursor-pointer"
                              />
                            </div>
                          )}
                        />
                      </div>
                      <div className="col-span-12 text-center">
                        <Button
                          className="bg-lime-500 me-2 hover:bg-lime-600"
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          Close
                        </Button>
                        <Button
                          className="bg-lime-500 hover:bg-lime-600"
                          onClick={() => {
                            onSubmit();
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
