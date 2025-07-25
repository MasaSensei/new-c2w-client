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
              <Cores.Button className="bg-[#0A54F8] hover:bg-[#0A54F8]">
                Add
              </Cores.Button>
            }
            content={
              <Form {...form}>
                <Fragments.Form
                  fields={fields}
                  control={control}
                  columnClassName="mb-2"
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
          seachable
          isTableAuto
          headers={["Model ID", "Nama Model", "Kode Model", "Remarks"]}
          bodies={data.map((model: any) => [
            model.id,
            model.model,
            model.code,
            model.remarks,
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
                        columnClassName="mb-5"
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
          footer={<h1>Test</h1>}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default ModelPage;
