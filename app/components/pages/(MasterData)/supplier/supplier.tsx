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
              <Cores.Button className="bg-[#0A54F8] hover:bg-[#0A54F8]">
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
          headers={["Supplier ID", "Name", "Phone", "Address", "Remarks"]}
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
                      className="bg-[#0A54F8] hover:bg-[#0A54F8]"
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
                <Cores.Popup
                  title="Delete Supplier"
                  button={
                    <Cores.Button className="bg-red-500 hover:bg-red-600">
                      Delete
                    </Cores.Button>
                  }
                  content={
                    <div className="flex flex-col justify-center items-center gap-5">
                      <div className="text-center text-[#818283]">
                        <p>Are you sure want to delete</p>
                        <p className="font-semibold text-[#818283]">
                          {currentData.supplier_name}?
                        </p>
                      </div>
                      <hr className="w-full text-[#818283]" />
                      <div className="flex flex-row gap-5 w-full justify-center items-center">
                        <Cores.Button
                          // onClick={() => handleDelete(currentData)}
                          className="bg-transparent border border-[#818283] text-[#818283] hover:bg-white"
                        >
                          Cancel
                        </Cores.Button>
                        <Cores.Button
                          // onClick={() => handleDelete(currentData)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Confirm
                        </Cores.Button>
                      </div>
                    </div>
                  }
                />
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
