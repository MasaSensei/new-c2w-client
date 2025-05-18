import formatDate from "~/utils/formatDate";
import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useCuttersInventoryAction } from "~/hooks/useCuttersInventory";
import { useState } from "react";
import { Pen, Trash2, XIcon } from "lucide-react";
import { useCuttingInventoryForm } from "~/hooks/useCuttingInventory";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const CuttersInventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useCuttersInventoryAction();
  const {
    form,
    fields,
    addToTable,
    cuttingInventory,
    handleDelete,
    handleEdit,
    cancel,
    onSubmit,
  } = useCuttingInventoryForm(data);
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Cutters Inventory"
        button={
          <div className="flex gap-2 flex-nowrap items-center justify-center">
            <Cores.Button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-500 hover:bg-slate-600"
            >
              Send to Inventory
            </Cores.Button>
          </div>
        }
      />
      {isModalOpen && (
        <Layouts.ExtendedPopup>
          <Cores.Card
            className="w-[1300px] h-[590px] overflow-y-scroll"
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Send to Inventory</h3>
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
                    <div className="col-span-4 bg-slate-100 p-4 rounded-lg">
                      <Fragments.Form
                        fields={fields}
                        control={form.control}
                        rowClassName="grid grid-cols-2 gap-4"
                        className="flex gap-5"
                        columnClassName={`first:col-span-1 nth-3:col-span-2 ${
                          fields
                            .map((field) => field.name)
                            .filter((col) => col === "remarks")[0]
                        }`}
                        buttonType="submit"
                        buttonName="Add Item"
                        additional={
                          <>
                            <Separator className="my-2.5" />
                            <Button
                              className="w-1/4 flex items-center justify-center bg-slate-700 hover:bg-slate-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
                              onClick={() => addToTable(form.getValues())}
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
                        headersClassName="text-xs nth-1:text-start nth-2:text-end text-center"
                        headers={["Bahan", "Rolls", "Yards", "Supplier"]}
                        bodiesClassName="text-xs nth-1:text-start nth-2:text-end text-center w-full"
                        bodies={cuttingInventory?.map((item) => [
                          item.materialName,
                          item.rolls,
                          item.yard,
                          item.workerName,
                        ])}
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
                        type="button"
                        onClick={() => {
                          cancel();
                          setIsModalOpen(false);
                        }}
                        className="bg-transparent me-2 hover:bg-slate-900 border border-slate-700 transition duration-300 ease-in-out cursor-pointer mx-auto text-slate-700 hover:text-white text-sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => {
                          onSubmit();
                          setIsModalOpen(false);
                        }}
                        className="bg-lime-700 ms-2 hover:bg-lime-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
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
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          isLoading={isLoading}
          headers={["Input Date", "Material", "Cutters", "Yards", "status"]}
          bodies={data?.map((item) => [
            formatDate(item.date),
            item.CuttingProgressMaterial.material,
            item.CuttingProgressMaterial.CuttingProgress.Worker.name,
            item.yards,
            item.CuttingProgressMaterial.status,
          ])}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CuttersInventoryPage;
