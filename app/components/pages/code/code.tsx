import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";

const CodePage = () => {
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
                title="Edit Color"
                button={
                  <Cores.Button className="bg-lime-500 hover:bg-lime-600">
                    Edit
                  </Cores.Button>
                }
                content={<Fragments.Form />}
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
