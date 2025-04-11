import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useColorForm, useColorAction } from "~/hooks/useColor";

const ColorPage = () => {
  const { data, fetchData, isLoading, setIsLoading } = useColorAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } = useColorForm(
    fetchData,
    setIsLoading
  );
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Color"
        button={
          <Cores.Popup
            title="Add Color"
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
          headers={["Color", "Remarks"]}
          bodies={data.map((item) => [item.color, item.remarks || "-"])}
          isLoading={isLoading}
          seachable
          action={(idx) => {
            const currentCode = data[idx];
            return (
              <div className="flex w-full gap-2 justify-center">
                <Cores.Popup
                  title="Edit Color"
                  button={
                    <Cores.Button
                      className="bg-lime-500 hover:bg-lime-600"
                      onClick={() => handleEdit(currentCode)}
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
                  onClick={() => handleDelete(currentCode)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Cores.Button>
              </div>
            );
          }}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default ColorPage;
