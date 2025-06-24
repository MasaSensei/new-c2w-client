import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useSupplierAction, useSupplierForm } from "~/hooks/useSupplier";

const SupplierPage = () => {
  const { data, fetchData } = useSupplierAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } =
    useSupplierForm(fetchData);
  const { control, handleSubmit } = form;
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
                  rowClassName="flex flex-col gap-5"
                  className="flex flex-col gap-5"
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
          headers={["No", "Name", "Phone", "Address", "Remarks"]}
          bodies={data.map((supplier: any) => [
            supplier.id,
            supplier.supplier_name,
            supplier.supplier_contact,
            supplier.supplier_address,
            supplier.remarks,
          ])}
          action={(idx) => {
            const currentData = data[idx];
            return (
              <div className="flex gap-2">
                <Cores.Popup
                  title="Edit Model"
                  button={
                    <Cores.Button
                      className="bg-lime-500 hover:bg-lime-600"
                      onClick={() => handleEdit(currentData)}
                    >
                      Edit
                    </Cores.Button>
                  }
                  content={
                    <Form {...form}>
                      <Fragments.Form
                        fields={fields}
                        control={control}
                        rowClassName="flex flex-col gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                      />
                    </Form>
                  }
                />
                <Cores.Button
                  onClick={() => handleDelete(currentData)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Cores.Button>
              </div>
            );
          }}
          footer
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default SupplierPage;
