import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useModelForm, useModelAction } from "~/hooks/useModel";

const ModelPage = () => {
  const { data, fetchData } = useModelAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } =
    useModelForm(fetchData);
  const { control, handleSubmit } = form;
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Model"
        button={
          <Cores.Popup
            title="Add Model"
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
                  onSubmit={handleSubmit(onSubmit)}
                />
              </Form>
            }
          />
        }
      />
      <Layouts.SectionLayouts>
        <Cores.Table
          headers={["Model", "Remarks"]}
          bodies={data.map((model) => [model.model, model.remarks])}
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
                        className="flex flex-col gap-5"
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
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default ModelPage;
