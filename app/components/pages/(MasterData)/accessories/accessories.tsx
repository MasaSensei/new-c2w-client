import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const AccessoriesPage = () => {
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Accessories" />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          isTableAuto
          headers={[
            "Accessories ID",
            "Nama Aksesoris",
            "Kode Aksesoris",
            "Tipe",
            "Satuan",
            "Vendor",
            "Deskripsi",
          ]}
          bodies={[]}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default AccessoriesPage;
