import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useWorkerForm, useWorkerAction } from "~/hooks/useWorker";
import { formatCurrency } from "~/utils/currency";
import { Form } from "~/components/ui/form";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Pen, Trash2, XIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator";

const TailoringStaffPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, setIsLoading, fetchData, materialData } =
    useWorkerAction({
      type: "tailors",
    });
  const {
    form,
    fields,
    onSubmit,
    workerMaterialPricesFields,
    workerMaterialPricesForm,
    addToTable,
    handleDeleteItem,
    handleEdit,
    workerPricesOnSubmit,
    workers,
  } = useWorkerForm(setIsLoading, fetchData, "tailors", data, materialData);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Tailor Staff"
        button={
          <div className="flex gap-2 flex-nowrap items-center justify-center">
            <Cores.Button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-500 hover:bg-slate-600"
            >
              Add Material Prices
            </Cores.Button>
            <Cores.Popup
              title="Add Cutters"
              button={
                <Cores.Button className="bg-lime-500 hover:bg-lime-600">
                  Add
                </Cores.Button>
              }
              content={
                <Form {...form}>
                  <Fragments.Form
                    fields={fields}
                    control={form.control}
                    columnClassName="mb-5"
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                  />
                </Form>
              }
            />
          </div>
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
                  onClick={closeModal}
                >
                  <XIcon className="h-4 w-4 text-black" />
                </Cores.Button>
              </div>
            }
            content={
              <div className="grid lg:grid-cols-12 gap-4">
                <Form {...workerMaterialPricesForm}>
                  <>
                    <div className="col-span-4 bg-slate-100 p-4 rounded-lg">
                      <Fragments.Form
                        fields={workerMaterialPricesFields}
                        control={workerMaterialPricesForm.control}
                        rowClassName="grid grid-cols-2 gap-4"
                        className="flex gap-5"
                        columnClassName={`nth-3:col-span-2 last:col-span-2 ${
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
                                addToTable(workerMaterialPricesForm.getValues())
                              }
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
                          "Yards",
                          "Status",
                          "Remarks",
                        ]}
                        bodiesClassName="text-xs w-full nth-2:text-start nth-3:text-end text-center"
                        bodies={workers.map((item) => [
                          item.material,
                          item.worker,
                          item.price,
                          item.remarks || "-",
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
                          // cancelForm();
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
                          workerPricesOnSubmit();
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
          isLoading={isLoading}
          seachable
          headers={["Name", "Minimum Cost", "Contact No", "Address"]}
          bodies={data.map((item) => [
            item.name,
            formatCurrency(item?.WorkerDetail?.[0]?.minimum_cost || 0),
            item.number,
            item.address,
          ])}
          details={(idx) => (
            <Cores.Table
              className="w-full bg-slate-100 overflow-x-auto"
              headers={["Category", "Price"]}
              bodies={
                data[idx]?.WorkerDetail?.flatMap(
                  (item) =>
                    item?.WorkerPrice?.map((item) => [
                      item.Category?.category,
                      formatCurrency(item.price) || 0,
                    ]) ?? []
                ) || []
              }
            />
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default TailoringStaffPage;
