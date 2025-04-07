import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import {
  usePurchaseDetailForm,
  usePurchaseDetailAction,
} from "~/hooks/usePurchaseDetail";
import { useState } from "react";
import { Pen, Trash2, XIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { formatCurrency } from "~/utils/currency";
import formatDate from "~/utils/formatDate";

const PurchaseListDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReturn, setIsReturn] = useState(false);
  const {
    fetchData,
    router,
    isLoading,
    purchaseItems,
    rawMaterials,
    setIsLoading,
  } = usePurchaseDetailAction();
  const {
    form,
    fields,
    addToTabelReturn,
    returnFields,
    onSubmit,
    onSubmitReturn,
    purchaseItemsWithLabel,
    tempRoll,
    cancelForm,
    setTempRoll,
    addRoll,
    rollItems,
    removeRoll,
    addToTabel,
    handleDeleteRoll,
    handleEditRoll,
    purchaseItemsReturn,
  } = usePurchaseDetailForm(
    fetchData,
    setIsLoading,
    rawMaterials,
    purchaseItems,
    router
  );

  const { control, handleSubmit } = form;

  const closeModal = () => {
    setIsModalOpen(false);
    setIsReturn(false);
  };

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Purchase List Detail"
        button={
          <div className="flex items-center justify-between gap-2">
            <Cores.Button
              onClick={() => setIsModalOpen(true)}
              className="bg-lime-500 hover:bg-lime-600"
            >
              Add
            </Cores.Button>
            <Cores.Button
              onClick={() => {
                setIsReturn(true);
                setIsModalOpen(true);
              }}
              className="border border-2 border-slate-300 hover:bg-slate-100 bg-transparent text-slate-900"
            >
              Return
            </Cores.Button>
          </div>
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
                    onClick={closeModal}
                  >
                    <XIcon className="h-4 w-4 text-black" />
                  </Cores.Button>
                </div>
              }
              content={
                <div className="grid lg:grid-cols-12 gap-4">
                  <Form {...form}>
                    {isReturn ? (
                      <>
                        <div className="col-span-4 flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="jatuh_tempo">Jatuh Tempo</Label>
                            <Input
                              className="bg-white"
                              type="text"
                              {...form.register("jatuh_tempo")}
                              defaultValue={form.getValues("jatuh_tempo")}
                              placeholder="Jatuh Tempo"
                              onChange={(e) =>
                                form.setValue("jatuh_tempo", e.target.value)
                              }
                            />
                          </div>
                          <div className=" bg-slate-100 p-4 rounded-lg">
                            <Fragments.Form
                              fields={returnFields}
                              control={control}
                              rowClassName="grid grid-cols-3 gap-4"
                              className="flex gap-5"
                              columnClassName={`first:col-span-3 nth-3:col-span-2 last:col-span-3 ${
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
                                    onClick={() =>
                                      !isReturn
                                        ? addToTabel(form.getValues())
                                        : addToTabelReturn(form.getValues())
                                    }
                                    type="button"
                                  >
                                    Add Item
                                  </Button>
                                </>
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-8">
                          <h1 className="text-lg font-semibold -mt-10 mb-2.5">
                            Items:
                          </h1>
                          <Cores.Table
                            headersClassName="text-xs nth-2:text-start nth-3:text-end text-center"
                            headers={[
                              "Total Roll",
                              "Bahan",
                              "Total Yard",
                              "Sub Total",
                              "Remarks",
                            ]}
                            bodiesClassName="text-xs w-full nth-2:text-start nth-3:text-end text-center"
                            bodies={purchaseItemsReturn.map((item) => [
                              item.total_roll,
                              item.materialName,
                              item.length_in_yard,
                              formatCurrency(item.sub_total),
                              item.remarks,
                            ])}
                            action={(idx) => (
                              <div className="flex flex-row flex-wrap items-center gap-3 justify-center">
                                <Pen
                                  onClick={() => handleEditRoll(idx)}
                                  className="text-black w-2.5 h-2.5 cursor-pointer"
                                />
                                <Trash2
                                  onClick={() => handleDeleteRoll(idx)}
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
                              cancelForm();
                              closeModal();
                            }}
                            className="bg-transparent me-2 hover:bg-slate-900 border border-slate-700 transition duration-300 ease-in-out cursor-pointer mx-auto text-slate-700 hover:text-white text-sm"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            onClick={() => onSubmitReturn()}
                            className="bg-lime-700 ms-2 hover:bg-lime-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
                          >
                            Save
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-4 bg-slate-100 p-4 rounded-lg">
                          <Fragments.Form
                            fields={fields}
                            control={control}
                            rowClassName="grid grid-cols-3 gap-4"
                            className="flex gap-5"
                            columnClassName={`first:col-span-3  last:col-span-3 ${
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
                                  <div className="flex flex-col gap-2">
                                    <Label htmlFor="total_roll">
                                      Total Roll
                                    </Label>
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
                                  <Label className="text-sm mb-2">
                                    Roll Items
                                  </Label>
                                  {rollItems.length > 0 ? (
                                    <Cores.Table
                                      headers={[
                                        "Jumlah Roll",
                                        "Length in Yard",
                                      ]}
                                      bodies={rollItems.map((item) => [
                                        item.total_roll,
                                        item.length_in_yard,
                                      ])}
                                      action={(idx) => (
                                        <Cores.Button
                                          className="bg-transparent shadow-none hover:bg-transparent"
                                          onClick={() => {
                                            removeRoll(idx);
                                            setIsModalOpen(true);
                                          }}
                                          type="button"
                                        >
                                          <XIcon className="h-4 w-4 text-black" />
                                        </Cores.Button>
                                      )}
                                    />
                                  ) : (
                                    <span className="text-sm">
                                      No roll items
                                    </span>
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
                        </div>
                        <div className="col-span-8">
                          <h1 className="text-lg font-semibold -mt-10 mb-2.5">
                            Items:
                          </h1>
                          <Cores.Table
                            headersClassName="text-xs nth-2:text-start nth-3:text-end text-center"
                            headers={[
                              "Total Roll",
                              "Bahan",
                              "Yard per Roll",
                              "Sub Total",
                              "Remarks",
                            ]}
                            bodiesClassName="text-xs w-full nth-2:text-start nth-3:text-end text-center"
                            bodies={purchaseItemsWithLabel.map((item) => [
                              item?.rollItems
                                ?.map((i) => i.total_roll)
                                .reduce((a, b) => Number(a) + Number(b), 0),
                              item.materialName,
                              item.yard_per_roll + " yd",
                              formatCurrency(item.sub_total),
                              item.remarks,
                            ])}
                            details={(idx) => (
                              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                <h4 className="font-semibold mb-2.5">
                                  Roll Items:{" "}
                                  {formatCurrency(
                                    purchaseItemsWithLabel[idx]?.price_per_yard
                                  )}
                                  /yard
                                </h4>
                                <Cores.Table
                                  headers={["Jumlah Roll", "Length in Yard"]}
                                  className="w-96 overflow-x-auto"
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
                              <div className="flex flex-row flex-wrap items-center gap-3 justify-center">
                                <Pen
                                  onClick={() => handleEditRoll(idx)}
                                  className="text-black w-2.5 h-2.5 cursor-pointer"
                                />
                                <Trash2
                                  onClick={() => handleDeleteRoll(idx)}
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
                              cancelForm();
                              closeModal();
                            }}
                            className="bg-transparent me-2 hover:bg-slate-900 border border-slate-700 transition duration-300 ease-in-out cursor-pointer mx-auto text-slate-700 hover:text-white text-sm"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            className="bg-lime-700 ms-2 hover:bg-lime-900 transition duration-300 ease-in-out cursor-pointer mx-auto text-white text-sm"
                          >
                            Save
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>
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
              <span className="font-semibold">Tanggal: </span>
              {formatDate(purchaseItems?.tanggal)}
            </p>
            <p>
              <span className="font-semibold">Supplier: </span>
              {purchaseItems?.Supplier?.name}
            </p>
            <p>
              <span className="font-semibold">Invoice: </span>
              {purchaseItems?.invoice_number}
            </p>
            <p>
              <span className="font-semibold">Nominal: </span>
              {formatCurrency(Number(purchaseItems?.nominal))}
            </p>
            <p>
              <span className="font-semibold">Jatuh Tempo: </span>
              {formatDate(purchaseItems?.jatuh_tempo)}
            </p>
            <p>
              <span className="font-semibold">Status: </span>
              {purchaseItems?.status}
            </p>
            <p>
              <span className="font-semibold">Harga Dibayar: </span>
              {formatCurrency(Number(purchaseItems?.payment))}
            </p>
            <p>
              <span className="font-semibold">Penangguhan: </span>
              {formatCurrency(Number(purchaseItems?.outstanding))}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Item Purchased:</h3>
            <Cores.Table
              isLoading={isLoading}
              headers={[
                "Bahan",
                "Rolls",
                "Yards",
                "Price per Yard",
                "Sub Total",
                "Remarks",
              ]}
              headersClassName="first:text-start nth-2:text-end text-center"
              bodiesClassName="w-full first:text-start nth-2:text-end text-center"
              bodies={
                purchaseItems?.PurchaseListDetail?.map((item) => [
                  item.material,
                  item.rolls,
                  item.yards,
                  formatCurrency(item.price_per_yard),
                  formatCurrency(item.total),
                  item.remarks,
                ]) ?? []
              }
              action={(idx) => <></>}
            />
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Item Return:</h3>
          </div>
        </div>
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default PurchaseListDetailPage;
