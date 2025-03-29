import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useSupplierForm } from "~/hooks/useSupplier";

const SupplierPage = () => {
  const { form, fields } = useSupplierForm();
  const { control } = form;
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Supplier"
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
                  onSubmit={() => {}}
                />
              </Form>
            }
          />
        }
      />
      <Layouts.SectionLayouts>
        <Cores.Table
          headers={["id", "name", "phone", "address", "remarks"]}
          bodies={[[1, "name", 0, "address", "remarks"]]}
          action={() => null}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default SupplierPage;
