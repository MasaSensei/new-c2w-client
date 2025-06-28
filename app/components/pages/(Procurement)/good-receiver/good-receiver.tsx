import { Pen, Trash2, XIcon } from "lucide-react";
import { useState } from "react";
import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import {
  useGoodReceiverAction,
  useGoodReceiverForm,
} from "~/hooks/useGoodReceiver";
import formatDate from "~/utils/formatDate";

const GoodReceiverPage = () => {
  const { data } = useGoodReceiverAction();
  const { form, fields, notZustandFields, notZustandForm } =
    useGoodReceiverForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Good Receiver"
        button={
          <Cores.Button
            onClick={() => setIsModalOpen(true)}
            className="bg-lime-500 hover:bg-lime-600"
          >
            Add Good Receiver
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
                  <h3 className="font-semibold">Add Item PO</h3>
                  <Cores.Button
                    className="bg-transparent shadow-none hover:bg-transparent"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <XIcon className="h-4 w-4 text-black" />
                  </Cores.Button>
                </div>
              }
              content={
                <div className="border-t-2 border-slate-200 grid lg:grid-cols-12 gap-4">
                  <Form {...form}>
                    <>
                      <div className="col-span-4 p-4 rounded-lg">
                        <div className="flex flex-col gap-4">
                          <Fragments.Form
                            fields={fields}
                            control={form.control}
                            rowClassName="grid grid-cols-2 gap-4"
                            className="flex gap-5"
                            columnClassName={`first:col-span-2 nth-2:col-span-2 nth-3:col-span-2 nth-4:col-span-1`}
                            additional={
                              <Button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-center"
                              >
                                Add Item
                              </Button>
                            }
                          />
                          <Fragments.Form
                            fields={notZustandFields}
                            control={notZustandForm.control}
                            rowClassName="grid grid-cols-2 gap-4"
                            className="flex gap-5 mt-5"
                            columnClassName={`nth-3:col-span-2 nth-4:col-span-2`}
                          />
                        </div>
                      </div>
                      <div className="col-span-8">
                        <h1 className="text-lg font-semibold mt-5">Items:</h1>
                        <Cores.Table
                          isTableAuto
                          headersClassName="text-xs nth-3:text-end text-center"
                          headers={[
                            "Po Item",
                            "Name",
                            "Total Yard",
                            "Total Rolls",
                            "Price",
                          ]}
                          bodiesClassName="text-xs w-full  nth-3:text-end text-center"
                          bodies={[]}
                          action={(idx) => (
                            <div className="flex flex-row flex-wrap items-center gap-3 justify-center">
                              <Pen
                                // onClick={() => handleEditRoll(idx)}
                                className="text-black w-2.5 h-2.5 cursor-pointer"
                              />
                              <Trash2
                                // onClick={() => handleDeleteRoll(idx)}
                                className="text-black w-2.5 h-2.5 cursor-pointer"
                              />
                            </div>
                          )}
                        />
                        <div className="mt-5 flex justify-center">
                          <Button
                            type="submit"
                            onClick={() => setIsModalOpen(false)}
                            className="w-3/4 bg-slate-700 hover:bg-slate-900 transition duration-300 ease-in-out cursor-pointer text-white text-sm"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                      {/* <div className="col-span-12 text-center">
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
                      </div> */}
                    </>
                  </Form>
                </div>
              }
            />
          </div>
        </div>
      )}
      <Layouts.SectionLayouts>
        <Cores.Tabs
          defaultValue="all"
          triggers={[
            { label: "All", value: "all" },
            { label: "Paid", value: "paid" },
            { label: "Unpaid", value: "unpaid" },
            { label: "Halfpaid", value: "halfpaid" },
            { label: "Overdue", value: "overdue" },
          ]}
          content={[
            {
              value: "all",
              content: (
                <Cores.Table
                  isTableAuto
                  headers={[
                    "Purchase ID",
                    "Supplier Name",
                    "Tanggal Tanggal Terima",
                    "No Invoice",
                    "Status Penerimaan",
                    "Total Rolls",
                    "Total Yards",
                    "Penerima",
                  ]}
                  bodies={data.map((data: any) => [
                    data.po_id,
                    data.supplier_name,
                    formatDate(data.tanggal_penerimaan),
                    data.no_invoice,
                    data.status_penerimaan,
                    data.total_rolls,
                    data.total_yards,
                    data.diterima_oleh,
                  ])}
                  //   action={(idx) => {
                  //     const currentData = data[idx];
                  //     return (
                  //       <div className="flex gap-2">
                  //         <Cores.Popup
                  //           title="Edit Model"
                  //           button={
                  //             <Cores.Button
                  //               className="bg-lime-500 hover:bg-lime-600"
                  //               onClick={() => handleEdit(currentData)}
                  //             >
                  //               Edit
                  //             </Cores.Button>
                  //           }
                  //           content={
                  //             <Form {...form}>
                  //               <Fragments.Form
                  //                 fields={fields}
                  //                 control={control}
                  //                 rowClassName="flex flex-col gap-5"
                  //                 onSubmit={handleSubmit(onSubmit)}
                  //               />
                  //             </Form>
                  //           }
                  //         />
                  //         <Cores.Button
                  //           onClick={() => handleDelete(currentData)}
                  //           className="bg-red-500 hover:bg-red-600"
                  //         >
                  //           Delete
                  //         </Cores.Button>
                  //       </div>
                  //     );
                  //   }}
                  footer
                />
              ),
            },
          ]}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default GoodReceiverPage;
