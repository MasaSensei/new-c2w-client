import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useWorkerForm, useWorkerAction } from "~/hooks/useWorker";
import { formatCurrency } from "~/utils/currency";
import { Form } from "~/components/ui/form";

const TailoringStaffPage = () => {
  const { data, isLoading, setIsLoading, fetchData, materialData } =
    useWorkerAction({
      type: "tailors",
    });
  const { form, fields, onSubmit } = useWorkerForm(
    setIsLoading,
    fetchData,
    "tailors",
    data,
    materialData
  );

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Tailor Staff"
        button={
          <Cores.Popup
            title="Add Cutters"
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
          isLoading={isLoading}
          seachable
          headers={["Name", "Minimum Cost", "Contact No", "Address"]}
          bodies={data.map((item) => [
            item.name,
            formatCurrency(item?.WorkerDetail?.[0]?.minimum_cost || 0),
            item.number,
            item.address,
          ])}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default TailoringStaffPage;
