import { useParams } from "react-router";
import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { usePurchaseDetailForm } from "~/hooks/usePurchaseDetail";
import { useState, useEffect } from "react";
import { Cross, Pen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const PurchaseListDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, fields } = usePurchaseDetailForm();
  const { purchaseListId } = useParams();

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
              className="w-[1200px] h-[520px] overflow-y-scroll"
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Add Item</h3>
                  <Cores.Button
                    className="bg-transparent shadow-none hover:bg-transparent"
                    onClick={toggleModal}
                  >
                    <Cross className="h-4 w-4 text-black" />
                  </Cores.Button>
                </div>
              }
              content={
                <div className="grid lg:grid-cols-12 gap-4">
                  <div className="col-span-5 bg-slate-100 p-4 rounded-lg">
                    <Form {...form}>
                      <Fragments.Form
                        fields={fields}
                        control={form.control}
                        rowClassName="grid grid-cols-3 gap-4"
                        className="flex gap-5"
                        columnClassName={`last:col-span-3 ${
                          fields
                            .map((field) => field.name)
                            .filter((col) => col === "remarks")[0]
                        }`}
                        onSubmit={() => {}}
                        additional={
                          <>
                            <Separator className="my-2.5" />
                            <div className="gap-2 flex items-end justify-center">
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="total_roll">Total Roll</Label>
                                <Input
                                  className="bg-white"
                                  type="text"
                                  placeholder="Total Roll"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="total_roll">Total Roll</Label>
                                <Input
                                  className="bg-white"
                                  type="text"
                                  placeholder="Total Roll"
                                />
                              </div>
                              <div className="flex items-center">
                                <Button className="bg-lime-500 hover:bg-lime-600 cursor-pointer mx-auto text-white text-sm w-50">
                                  Add
                                </Button>
                              </div>
                            </div>
                            <div className="mt-1.5 bg-white p-4">
                              <Label className="text-sm mb-2">Roll Items</Label>
                              <Cores.Table
                                headers={["Tanggal", "Supplier"]}
                                bodies={[["18-12-2024", "Target"]]}
                                action={(idx) => (
                                  <Cores.Button
                                    className="bg-transparent shadow-none hover:bg-transparent"
                                    onClick={() => {}}
                                  >
                                    <Cross className="h-4 w-4 text-black" />
                                  </Cores.Button>
                                )}
                              />
                            </div>
                          </>
                        }
                      />
                    </Form>
                  </div>
                  <div className="col-span-7">
                    <h1 className="text-lg font-semibold -mt-10 mb-2.5">
                      Items:
                    </h1>
                    <Cores.Table
                      headers={[
                        "Tanggal",
                        "Supplier",
                        "Invoice",
                        "Nominal",
                        "Status",
                        "Remarks",
                      ]}
                      details={(idx) => (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold">
                            Detail for row {idx + 1}
                          </h4>
                          <p>Supplier: Target</p>
                          <p>Tanggal: 18-12-2024</p>
                          <p>Invoice: 00261</p>
                          <p>Nominal: 1.000.000</p>
                          <p>Status: Overdue</p>
                        </div>
                      )}
                      bodies={[
                        [
                          "18-12-2024",
                          "Target",
                          "00261",
                          "1.000.000",
                          "Overdue",
                          "Asahi Hitam",
                        ],
                      ]}
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
