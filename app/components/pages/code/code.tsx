import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useCodeForm, useCodeAction } from "~/hooks/useCode";

const CodePage = () => {
  const { data, fetchData } = useCodeAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } =
    useCodeForm(fetchData);
  const { control, handleSubmit } = form;

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Code"
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
                  control={control}
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
          headers={["Code", "Remarks"]}
          bodies={data.map((code) => [code.code, code.remarks])}
          action={(idx) => {
            const currentCode = data[idx];
            return (
              <div className="flex gap-2">
                <Cores.Popup
                  title="Edit Code"
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
                        control={control}
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit(onSubmit)}
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

export default CodePage;
