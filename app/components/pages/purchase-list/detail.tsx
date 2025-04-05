import { useParams } from "react-router";
import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import {
  usePurchaseDetailForm,
  usePurchaseDetailAction,
} from "~/hooks/usePurchaseDetail";
import { useState, useEffect } from "react";
import { Pen, XIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { formatCurrency } from "~/utils/currency";

const PurchaseListDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, fetchData, rawMaterials, setIsLoading } =
    usePurchaseDetailAction();
  const {
    form,
    fields,
    onSubmit,
    purchaseItemsWithLabel,
    tempRoll,
    setTempRoll,
    addRoll,
    rollItems,
    removeRoll,
    addToTabel,
    handleTest,
  } = usePurchaseDetailForm(fetchData, setIsLoading, rawMaterials);
  const { purchaseListId } = useParams();
  const { control, handleSubmit } = form;

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Purchase List Detail"
        button={
          <Cores.Button
            onClick={toggleModal}
            className="bg-lime-500 hover:bg-lime-600"
          >
            Add
          </Cores.Button>
        }
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <div className="relative z-10">
            <Cores.Card
              className="w-[1300px] h-[590px] overflow-y-scroll"
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Add Item</h3>
                  <Cores.Button
                    className="bg-transparent shadow-none hover:bg-transparent"
                    onClick={toggleModal}
                  >
                    <XIcon className="h-4 w-4 text-black" />
                  </Cores.Button>
                </div>
              }
              content={
                <div className="grid lg:grid-cols-12 gap-4">
                  <div className="col-span-4 bg-slate-100 p-4 rounded-lg">
                    <Form {...form}>
                      <Fragments.Form
                        fields={fields}
                        control={control}
                        rowClassName="grid grid-cols-3 gap-4"
                        className="flex gap-5"
                        columnClassName={`nth-2:col-span-2 last:col-span-3 ${
                          fields
                            .map((field) => field.name)
                            .filter((col) => col === "remarks")[0]
                        }`}
                        buttonType="submit"
                        buttonName="Add Item"
                        additional={
                          <>
                            <Separator className="my-2.5" />
                            <div className="gap-2 flex items-end justify-center">
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="total_roll">Total Roll</Label>
                                <Input
                                  className="bg-white"
                                  type="text"
                                  name="total_roll"
                                  value={tempRoll.total_roll}
                                  onChange={(e) =>
                                    setTempRoll({
                                      ...tempRoll,
                                      total_roll: e.target.value,
                                    })
                                  }
                                  placeholder="Total Roll"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="length_in_yard">
                                  Length in Yard
                                </Label>
                                <Input
                                  className="bg-white"
                                  type="text"
                                  name="length_in_yard"
                                  value={tempRoll.length_in_yard}
                                  onChange={(e) =>
                                    setTempRoll({
                                      ...tempRoll,
                                      length_in_yard: e.target.value,
                                    })
                                  }
                                  placeholder="Length in Yard"
                                />
                              </div>
                              <div className="flex items-center">
                                <Button
                                  onClick={() => addRoll()}
                                  type="button"
                                  className="bg-lime-500 hover:bg-lime-600 cursor-pointer mx-auto text-white text-sm w-20"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                            <div className="mt-1.5 bg-white p-4">
                              <Label className="text-sm mb-2">Roll Items</Label>
                              {rollItems.length > 0 ? (
                                <Cores.Table
                                  headers={["Jumlah Roll", "Length in Yard"]}
                                  bodies={rollItems.map((item) => [
                                    item.total_roll,
                                    item.length_in_yard,
                                  ])}
                                  action={(idx) => (
                                    <Cores.Button
                                      className="bg-transparent shadow-none hover:bg-transparent"
                                      onClick={() => removeRoll(idx)}
                                      type="button"
                                    >
                                      <XIcon className="h-4 w-4 text-black" />
                                    </Cores.Button>
                                  )}
                                />
                              ) : (
                                <span className="text-sm">No roll items</span>
                              )}
                            </div>
                            <Button
                              className="w-1/4 flex items-center justify-center bg-slate-700 hover:bg-slate-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
                              onClick={() => addToTabel(form.getValues())}
                              type="button"
                            >
                              Add Item
                            </Button>
                          </>
                        }
                      />
                    </Form>
                  </div>
                  <div className="col-span-8">
                    <h1 className="text-lg font-semibold -mt-10 mb-2.5">
                      Items:
                    </h1>
                    <Cores.Table
                      headersClassName="text-xs nth-2:text-start text-center"
                      headers={[
                        "Total Roll",
                        "Bahan",
                        "Total Yard",
                        "Sub Total",
                        "Remarks",
                      ]}
                      bodiesClassName="text-xs w-full nth-2:text-start text-center"
                      bodies={purchaseItemsWithLabel.map((item) => [
                        item.total_roll,
                        item.materialName,
                        item.total_yard,
                        formatCurrency(item.sub_total),
                        item.remarks,
                      ])}
                      details={(idx) => (
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                          <h4 className="font-semibold mb-2.5">Roll Items</h4>
                          <Cores.Table
                            headers={["Jumlah Roll", "Length in Yard"]}
                            bodies={(
                              purchaseItemsWithLabel[idx]?.rollItems ?? []
                            ).map((item) => [
                              item.total_roll,
                              item.length_in_yard,
                            ])}
                          />
                        </div>
                      )}
                      action={(idx) => (
                        <div className="flex flex-row flex-wrap items-center justify-center">
                          <Pen className="text-black w-2.5 h-2.5 " />
                        </div>
                      )}
                    />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}

      <Layouts.SectionLayouts>
        <div className="m-5">
          <div className="text-sm flex items-start gap-8 rounded-t-lg mb-4">
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>09876543
            </p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Item Purchased:</h3>
          </div>
        </div>
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default PurchaseListDetailPage;
