import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { usePurchaseAction, usePurchaseForm } from "~/hooks/usePurchase";
import { Form } from "~/components/ui/form";
import { useNavigate } from "react-router";
import type { PurchaseList } from "~/types/purchaseList";
import formatDate from "~/utils/formatDate";
import { formatCurrency } from "~/utils/currency";
import { useState } from "react";
import {
  usePurchaseDetailForm,
  usePurchaseDetailAction,
} from "~/hooks/usePurchaseDetail";
import { Pen, Trash2, XIcon, Eye } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const PurchaseListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsLoading, isLoading, fetchData, suppliers, data } =
    usePurchaseAction();
  const { router, purchaseItems, rawMaterials } = usePurchaseDetailAction();
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
    handleDeleteReturn,
    editItemReturn,
  } = usePurchaseDetailForm(
    fetchData,
    setIsLoading,
    rawMaterials,
    purchaseItems,
    router
  );
  const typeCol = fields.map((field) => field.name);
  const remarks = typeCol.filter((col) => col === "remarks");

  const { control, handleSubmit } = form;

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Purchase List"
        button={
          <Cores.Button
            onClick={() => setIsModalOpen(true)}
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
                    onClick={closeModal}
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
                          control={control}
                          rowClassName="grid grid-cols-3 gap-4"
                          className="flex gap-5"
                          columnClassName={`first:col-span-2 nth-3:col-span-3 last:col-span-3 ${
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
                                  <Label htmlFor="length_in_yard">Yard</Label>
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
                                    Yard Per Roll
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
                                    placeholder="Yard Per Roll"
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
                                      "Length in Yard",
                                      "Yard Per Roll",
                                    ]}
                                    bodies={rollItems.map((item) => [
                                      item.length_in_yard,
                                      item.total_roll,
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
                      </div>
                      <div className="col-span-8">
                        <h1 className="text-lg font-semibold -mt-10 mb-2.5">
                          Items:
                        </h1>
                        <Cores.Table
                          isTableAuto
                          headersClassName="text-xs  nth-3:text-end text-center"
                          headers={[
                            "Bahan",
                            "Total Item",
                            "Sub Total",
                            "Remarks",
                          ]}
                          bodiesClassName="text-xs w-full  nth-3:text-end text-center"
                          bodies={purchaseItemsWithLabel.map((item) => [
                            `${item.item} (${item.color})`,
                            item?.rollItems?.length,
                            // item?.rollItems
                            //   ?.map((i) => i.total_roll)
                            //   .reduce((a, b) => Number(a) + Number(b), 0),
                            // item.yard_per_roll + " yd",
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
                                headers={["Yard", "Roll"]}
                                className="w-96 overflow-x-auto"
                                bodies={(
                                  purchaseItemsWithLabel[idx]?.rollItems ?? []
                                ).map((item) => [
                                  item.length_in_yard,
                                  item.total_roll,
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
                  </Form>
                </div>
              }
            />
          </div>
        </div>
      )}
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          isTableAuto
          headers={[
            "Tanggal",
            "Supplier",
            "Invoice",
            "Nominal",
            "Jatuh Tempo",
            "Status",
            "Harga Dibayar",
            "Penangguhan",
            "Remarks",
          ]}
          isLoading={isLoading}
          headersClassName="text-sm"
          bodiesClassName="text-sm"
          bodies={
            data.length > 0
              ? data.map((item: PurchaseList) => [
                  formatDate(item.tanggal),
                  item.Supplier?.supplier_name,
                  item.invoice_number,
                  formatCurrency(item.nominal),
                  formatDate(item.jatuh_tempo),
                  item.status,
                  formatCurrency(item.payment),
                  formatCurrency(item.outstanding),
                  item.remarks,
                ])
              : []
          }
          action={(idx) => (
            <div className="flex flex-row gap-2 flex-wrap justify-center">
              <Pen className="text-black w-4 h-4" />
              <Eye
                onClick={() =>
                  navigate(`/purchase-list-detail/${data[idx].id}`)
                }
                className="text-black cursor-pointer w-4 h-4"
              />
            </div>
          )}
          footer={<h1>Test</h1>}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default PurchaseListPage;
