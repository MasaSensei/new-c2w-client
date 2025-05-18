import formatDate from "~/utils/formatDate";
import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const OutgoingCuttingHistoryPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Outgoing Cutting History" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          // isLoading={isLoading}
          headers={[
            "Date",
            "Invoice Purchase",
            "Raw Material",
            "Status",
            "Recipient",
          ]}
          // bodies={data?.map((item) => [
          //   formatDate(item.date),
          //   item.PurchaseListDetail?.PurchaseList?.invoice_number,
          //   item.PurchaseListDetail?.material,
          //   item.status,
          //   item.Worker?.name == null ? item.Supplier?.name : item.Worker?.name,
          // ])}
          bodies={[]}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default OutgoingCuttingHistoryPage;
