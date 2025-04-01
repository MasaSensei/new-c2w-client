import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useNavigate } from "react-router";

const PurchaseListPage = () => {
  const navigate = useNavigate();
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Purchase List"
        button={
          <Cores.Button
            onClick={() => navigate("/purchase-list/add")}
            className="bg-lime-500 hover:bg-lime-600"
          >
            Add
          </Cores.Button>
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
            <Cores.Button className="bg-lime-500 hover:bg-lime-600">
              Edit
            </Cores.Button>
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default PurchaseListPage;
