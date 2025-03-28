import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useCodeForm } from "~/hooks/useCodeForm";

const CodePage = () => {
  const { form, fields } = useCodeForm();
  const { control } = form;

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Code" />
      <Layouts.SectionLayouts>
        <Cores.Table
          headers={["Code", "Description"]}
          bodies={[
            ["1", "ABC-123"],
            ["2", "XYZ-789"],
            ["3", "DEF-456"],
          ]}
          action={
            <div className="flex gap-2">
              <Cores.Popup
                title="Edit Code"
                button={
                  <Cores.Button className="bg-lime-500 hover:bg-lime-600">
                    Edit
                  </Cores.Button>
                }
                content={
                  <Form {...form}>
                    <Fragments.Form
                      fields={fields}
                      control={control}
                      onSubmit={() => {}}
                    />
                  </Form>
                }
              />
              <Cores.Button className="bg-red-500 hover:bg-red-600">
                Delete
              </Cores.Button>
            </div>
          }
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CodePage;
