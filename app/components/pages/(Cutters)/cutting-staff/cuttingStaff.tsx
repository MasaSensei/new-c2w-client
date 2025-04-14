import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useWorkerForm, useWorkerAction } from "~/hooks/useWorker";
import { formatCurrency } from "~/utils/currency";

const CuttingStaffPage = () => {
  const { data, isLoading, setIsLoading, fetchData } = useWorkerAction({
    type: "cutters",
  });
  const { form, fields, onSubmit } = useWorkerForm(
    setIsLoading,
    fetchData,
    "cutters"
  );

  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Cutting Staff"
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
          seachable
          isLoading={isLoading}
          headers={["Name", "Minimum Cost", "Contact No", "Address"]}
          bodies={data.map((item) => [
            item.name,
            formatCurrency(item?.WorkerDetail?.[0]?.minimum_cost || 0),
            item.number,
            item.address,
          ])}
          action={() => null}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CuttingStaffPage;
