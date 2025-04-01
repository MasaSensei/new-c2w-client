import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { usePurchaseAction, usePurchaseForm } from "~/hooks/usePurchase";
import { Form } from "~/components/ui/form";
import { Pen, Eye, Trash } from "lucide-react";

const PurchaseListPage = () => {
  const { fetchData, suppliers } = usePurchaseAction();
  const { form, fields, handleEdit, onSubmit } = usePurchaseForm(
    fetchData,
    suppliers
  );
  const { control, handleSubmit } = form;
  const typeCol = fields.map((field) => field.name);
  const remarks = typeCol.filter((col) => col === "remarks");
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Purchase List"
        button={
          <Cores.Popup
            title="Add Supplier"
            button={
              <Cores.Button className="bg-lime-500 hover:bg-lime-600">
                Add
              </Cores.Button>
            }
            content={
              <Form {...form}>
                <Fragments.Form
                  fields={fields}
                  control={control}
                  className="flex flex-col gap-5"
                  rowClassName="grid grid-cols-2 gap-8"
                  columnClassName={`last:col-span-2 ${remarks[0]}`}
                  onSubmit={() => {}}
                />
              </Form>
            }
          />
        }
      />
      <Layouts.SectionLayouts>
        <Cores.Table
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
          bodies={[
            [
              "18-12-2024",
              "Target",
              "00261",
              "1.000.000",
              "31-jan-2025",
              "Overdue",
              "1.000.000",
              "0",
              "Asahi Hitam",
            ],
          ]}
          action={(idx) => (
            <div className="flex flex-row flex-wrap justify-center">
              <Cores.Button className="bg-transparent shadow-none hover:bg-transparent">
                <Pen className="text-black" />
              </Cores.Button>
              <Cores.Button className="bg-transparent shadow-none hover:bg-transparent">
                <Eye className="text-black" />
              </Cores.Button>
              <Cores.Button className="bg-transparent shadow-none hover:bg-transparent">
                <Trash className="text-red-500" />
              </Cores.Button>
            </div>
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default PurchaseListPage;
