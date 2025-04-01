import { Form } from "~/components/ui/form";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { usePurchaseAction, usePurchaseForm } from "~/hooks/usePurchase";

const AddNewPurchaseListPage = () => {
  const { fetchData, suppliers } = usePurchaseAction();
  const { form, fields, handleEdit, onSubmit } = usePurchaseForm(
    fetchData,
    suppliers
  );
  const { control, handleSubmit } = form;
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction title="Add New Purchase List" />
      <Layouts.SectionLayouts widthFull>
        <div className="m-5 w-full">
          <Form {...form}>
            <Fragments.Form
              fields={fields}
              control={control}
              rowClassName="grid grid-cols-2 gap-8"
              onSubmit={() => {}}
            />
          </Form>
        </div>
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default AddNewPurchaseListPage;
