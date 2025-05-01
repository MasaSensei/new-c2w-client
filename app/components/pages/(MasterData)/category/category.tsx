import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { Form } from "~/components/ui/form";
import { useCategoryAction, useCategoryForm } from "~/hooks/useCategory";

const CategoryPage = () => {
  const { data, fetchData, isLoading, setIsLoading } = useCategoryAction();
  const { form, fields, onSubmit } = useCategoryForm(fetchData, setIsLoading);

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
          headers={["Code", "Remarks"]}
          bodies={
            data ? data?.map((code) => [code.category, code.remarks]) : []
          }
          isLoading={isLoading}
          action={(idx) => {
            return (
              <div className="flex w-full gap-2 justify-center">
                <Cores.Popup
                  title="Edit Code"
                  button={
                    <Cores.Button
                      className="bg-lime-500 hover:bg-lime-600"
                      onClick={() => {}}
                    >
                      Edit
                    </Cores.Button>
                  }
                  content={
                    <></>
                    //   <Form {...form}>
                    //     <Fragments.Form
                    //       fields={fields}
                    //       control={control}
                    //       columnClassName="mb-5"
                    //       className="flex flex-col gap-5"
                    //       onSubmit={handleSubmit(onSubmit)}
                    //     />
                    //   </Form>
                  }
                />
                {/* <Cores.Button
                  onClick={() => handleDelete(currentCode)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Cores.Button> */}
              </div>
            );
          }}
          footer={<h1>Test</h1>}
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default CategoryPage;
