import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useSizeForm, useSizeAction } from "~/hooks/useSize";

const SizePage = () => {
  const { data, fetchData } = useSizeAction();
  const { form, fields, handleEdit, onSubmit, handleDelete } =
    useSizeForm(fetchData);
  const { control, handleSubmit } = form;
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Size"
        button={
          <Cores.Popup
            title="Add Size"
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
          headers={[
            "Size ID",
            "Kategori",
            "Nama Ukuran",
            "Ukuran (cm)",
            "Remarks",
          ]}
          bodies={data.map((size: any) => [
            size.id,
            size.category,
            size.name,
            size.size_cm,
            size.remarks || "-",
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

export default SizePage;
