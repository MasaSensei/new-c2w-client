import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Trash, PenIcon } from "lucide-react";
import {
  useMaterialInventoryAction,
  useMaterialInventoryForm,
} from "~/hooks/useMaterialInventory";
import { Form } from "~/components/ui/form";

const MaterialInventoryPage = () => {
  const { data, fetchData, isLoading, setIsLoading, codes, colors, items } =
    useMaterialInventoryAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } =
    useMaterialInventoryForm(fetchData, setIsLoading, items, colors, codes);
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Inventory Bahan Baku"
        button={
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
        }
      />
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
