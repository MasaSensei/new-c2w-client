import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useItemForm, useItemAction } from "~/hooks/useItem";

const ItemPage = () => {
  const { data, fetchData, isLoading, setIsLoading } = useItemAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } = useItemForm(
    fetchData,
    setIsLoading
  );
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Item"
        button={
          <Cores.Popup
            title="Add Code"
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
                  columnClassName="mb-5"
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
          headers={["Item", "Remarks"]}
          isLoading={isLoading}
          bodies={data.map((item) => [item.item, item.remarks || "-"])}
          action={(idx) => (
            <div className="flex gap-2">
              <Cores.Button
                onClick={() => handleEdit(data[idx])}
                className="bg-lime-500 hover:bg-lime-600"
              >
                Edit
              </Cores.Button>
              <Cores.Button
                onClick={() => handleDelete(data[idx])}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Cores.Button>
            </div>
          )}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default ItemPage;
