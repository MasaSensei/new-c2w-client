import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useCodeForm, useCodeAction } from "~/hooks/useCode";

const CodePage = () => {
  const { data, fetchData, isLoading, setIsLoading } = useCodeAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } = useCodeForm(
    fetchData,
    setIsLoading
  );
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
                  columnClassName="mb-5"
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
          headers={["Code", "Remarks"]}
          bodies={data?.map((code) => [code.code, code.remarks])}
          isLoading={isLoading}
          action={(idx) => {
            const currentCode = data[idx];
            return (
              <div className="flex w-full gap-2 justify-center">
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
                        columnClassName="mb-5"
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
          footer={<h1>Test</h1>}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CodePage;
