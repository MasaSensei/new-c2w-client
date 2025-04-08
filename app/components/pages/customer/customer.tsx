import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useCustomerAction, useCustomerForm } from "~/hooks/useCustomer";

const CustomerPage = () => {
  const { data, fetchData, isLoading, setIsLoading } = useCustomerAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } = useCustomerForm(
    fetchData,
    setIsLoading
  );
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Customer"
        button={
          <Cores.Popup
            title="Add Customer"
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
                  rowClassName="flex flex-col gap-5"
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
          seachable
          isLoading={isLoading}
          headers={["Name", "Email", "Phone", "Address"]}
          bodies={data.map((item) => [
            item.name,
            item.number,
            item.address,
            item.remarks,
          ])}
          action={(idx) => {
            const item = data[idx];
            return (
              <>
                <Cores.Popup
                  title="Edit Code"
                  button={
                    <Cores.Button
                      className="bg-lime-500 hover:bg-lime-600"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Cores.Button>
                  }
                  content={
                    <Form {...form}>
                      <Fragments.Form
                        fields={fields}
                        control={form.control}
                        columnClassName="mb-5"
                        className="flex flex-col gap-5"
                        onSubmit={form.handleSubmit(onSubmit)}
                      />
                    </Form>
                  }
                />
                <Cores.Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Cores.Button>
              </>
            );
          }}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CustomerPage;
