import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { usePurchaseAction, usePurchaseForm } from "~/hooks/usePurchase";
import { Form } from "~/components/ui/form";
import { Pen, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import type { PurchaseList } from "~/types/purchaseList";
import formatDate from "~/utils/formatDate";
import { formatCurrency } from "~/utils/currency";

const PurchaseListPage = () => {
  const navigate = useNavigate();
  const { setIsLoading, isLoading, fetchData, suppliers, data } =
    usePurchaseAction();
  const { form, fields, handleEdit, onSubmit, handleTest } = usePurchaseForm(
    setIsLoading,
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
            title="Add Purchase List"
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
                  columnClassName={`last:col-span-2 nth-3:col-span-2 ${remarks[0]}`}
                  onSubmit={handleSubmit(onSubmit)}
                />
              </Form>
            }
          />
        }
      />
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
                  item.Supplier?.name,
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
