import { Cores } from "~/components/core";
import { Fragments } from "~/components/fragments";
import { Layouts } from "~/components/layouts";
import { useGoodReceiverAction } from "~/hooks/useGoodReceiver";
import formatDate from "~/utils/formatDate";

const GoodReceiverPage = () => {
  const { data } = useGoodReceiverAction();
  return (
    <Layouts.MainLayouts>
      <Fragments.HeaderWithAction
        title="Good Receiver"
        button={
          <Cores.Popup
            title="Add Good Receiver"
            button={
              <Cores.Button className="bg-lime-500 hover:bg-lime-600">
                Add
              </Cores.Button>
            }
            content={
              <></>
              //   <Form {...form}>
              //     <Fragments.Form
              //       fields={fields}
              //       control={control}
              //       rowClassName="flex flex-col gap-5"
              //       className="flex flex-col gap-5"
              //       onSubmit={handleSubmit(onSubmit)}
              //     />
              //   </Form>
            }
          />
        }
      />
      <Layouts.SectionLayouts>
        <Cores.Table
          seachable
          isTableAuto
          headers={[
            "Tanggal Penerimaan",
            "No Invoice",
            "Id Po",
            "Nama Supplier",
            "Status Penerimaan",
            "Total Rolls",
            "Total Yards",
            "Penerima",
          ]}
          bodies={data.map((data: any) => [
            formatDate(data.tanggal_penerimaan),
            data.no_invoice,
            data.po_id,
            data.supplier_name,
            data.status_penerimaan,
            data.total_rolls,
            data.total_yards,
            data.diterima_oleh,
          ])}
          //   action={(idx) => {
          //     const currentData = data[idx];
          //     return (
          //       <div className="flex gap-2">
          //         <Cores.Popup
          //           title="Edit Model"
          //           button={
          //             <Cores.Button
          //               className="bg-lime-500 hover:bg-lime-600"
          //               onClick={() => handleEdit(currentData)}
          //             >
          //               Edit
          //             </Cores.Button>
          //           }
          //           content={
          //             <Form {...form}>
          //               <Fragments.Form
          //                 fields={fields}
          //                 control={control}
          //                 rowClassName="flex flex-col gap-5"
          //                 onSubmit={handleSubmit(onSubmit)}
          //               />
          //             </Form>
          //           }
          //         />
          //         <Cores.Button
          //           onClick={() => handleDelete(currentData)}
          //           className="bg-red-500 hover:bg-red-600"
          //         >
          //           Delete
          //         </Cores.Button>
          //       </div>
          //     );
          //   }}
          footer
        />
      </Layouts.SectionLayouts>
    </Layouts.MainLayouts>
  );
};

export default GoodReceiverPage;
