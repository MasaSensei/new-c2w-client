import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Trash, PenIcon } from "lucide-react";
import {
  useMaterialInventoryAction,
  useMaterialInventoryForm,
} from "~/hooks/useMaterialInventory";
import { Form } from "~/components/ui/form";
import { useState } from "react";
import { Pen, Trash2, XIcon } from "lucide-react";
import {
  useStagingCuttingInventoryForm,
  useStagingCuttingInventoryAction,
} from "~/hooks/useStagingCuttingInventory";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "~/components/ui/button";

const MaterialInventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, fetchData, isLoading, setIsLoading, codes, colors, items } =
    useMaterialInventoryAction();
  const {
    rawMaterials,
    isLoading: isLoadingStaging,
    setIsLoading: setIsLoadingStaging,
  } = useStagingCuttingInventoryAction();
  const {
    form: formStaging,
    fields: fieldsStaging,
    onSubmit: onSubmitStaging,
    addToTabel,
    stagingCuttingInventory,
    handleDelete: handleDeleteStaging,
    handleEdit: handleEditStaging,
  } = useStagingCuttingInventoryForm(
    fetchData,
    setIsLoadingStaging,
    rawMaterials
  );
  const { form, fields, handleEdit, onSubmit, handleDelete } =
    useMaterialInventoryForm(fetchData, setIsLoading, items, colors, codes);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Inventory Bahan Baku"
        button={
          <div className="flex gap-2 flex-nowrap items-center justify-center">
            <Cores.Button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-500 hover:bg-slate-600"
            >
              Send to Cutting
            </Cores.Button>
            <Cores.Popup
              title="Add Bahan Baku"
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
                    columnClassName="mb-5  last:col-span-2"
                    rowClassName="grid grid-cols-2 gap-5"
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
                <Form {...formStaging}>
                  <>
                    <div className="col-span-4 bg-slate-100 p-4 rounded-lg">
                      <Fragments.Form
                        fields={fieldsStaging}
                        control={formStaging.control}
                        rowClassName="grid grid-cols-3 gap-4"
                        className="flex gap-5"
                        columnClassName={`first:col-span-3 nth-2:col-span-3 last:col-span-3 ${
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
                                addToTabel(formStaging.getValues())
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
                        bodies={stagingCuttingInventory.map((item) => [
                          item.rolls,
                          item.materialName,
                          item.yards,
                          item.status,
                          item.remarks || "-",
                        ])}
                        action={(idx) => (
                          <div className="flex flex-row flex-wrap items-center gap-3 justify-center">
                            <Pen
                              onClick={() => handleEditStaging(idx)}
                              className="text-black w-2.5 h-2.5 cursor-pointer"
                            />
                            <Trash2
                              onClick={() => handleDeleteStaging(idx)}
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
                          onSubmitStaging();
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
          headers={[
            "Item",
            "Warna",
            "Kode",
            "Warna 2",
            "Total Roll",
            "Total Yard",
            "Remarks",
          ]}
          bodies={data?.map((item) => [
            item?.Item?.item,
            item?.Color1?.color,
            item?.Code?.code,
            item?.Color2?.color,
            item.rolls || 0,
            item.yards || 0,
            item.remarks || "-",
          ])}
          details={(idx) => (
            <Cores.Table
              isLoading={isLoading}
              headers={["Supplier", "Roll", "Yard", "Keterangan"]}
              bodies={
                data[idx]?.PurchaseListDetail?.map((item) => [
                  item?.PurchaseList?.Supplier?.name,
                  item?.rolls || 0,
                  item?.yards || 0,
                  item?.remarks || "-",
                ]) || []
              }
            />
          )}
          action={(idx) => (
            <div className="flex gap-4 items-center justify-start">
              <Cores.Popup
                title="Edit Bahan Baku"
                button={
                  <PenIcon
                    onClick={() => handleEdit(data[idx])}
                    className="cursor-pointer h-4 w-4"
                  />
                }
                content={
                  <Form {...form}>
                    <Fragments.Form
                      fields={fields}
                      control={form.control}
                      columnClassName="mb-5  last:col-span-2"
                      rowClassName="grid grid-cols-2 gap-5"
                      className="flex flex-col gap-5"
                      onSubmit={form.handleSubmit(onSubmit)}
                    />
                  </Form>
                }
              />
              <Trash
                onClick={() => handleDelete(data[idx])}
                className="cursor-pointer h-4 w-4 text-red-500"
              />
            </div>
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default MaterialInventoryPage;
