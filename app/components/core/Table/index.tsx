import { Input } from "~/components/ui/input";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useTableFilter } from "~/hooks/useTableFilter";

interface TableProps extends React.ComponentProps<typeof ShadcnTable> {
  headers: string[];
  bodies: (string | number | React.ReactNode)[][];
  action?: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, bodies, action, ...props }) => {
  const { search, handleSearchChange, filteredBodies } = useTableFilter(
    headers,
    bodies
  );

  return (
    <ShadcnTable className="w-full overflow-auto">
      <TableHeader className="bg-[#F6F7F9] text-[#758090]">
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead
              className="pl-2 first:rounded-tl-lg last:rounded-tr-lg px-5 pt-2"
              key={idx}
            >
              {header}
              <div className="max-w-full w-96">
                <Input
                  className="-ml-2 w-full my-2 bg-white"
                  value={search[idx]}
                  onChange={(e) => handleSearchChange(e.target.value, idx)}
                  placeholder={`Search ${header}`}
                />
              </div>
            </TableHead>
          ))}
          {action && <TableHead className="rounded-tr-lg" />}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {filteredBodies.length > 0 ? (
          filteredBodies.map((body, idx) => (
            <TableRow key={idx}>
              {body.map((item, cellIdx) => (
                <TableCell className="px-5" key={cellIdx}>
                  {item}
                </TableCell>
              ))}
              {action && <TableCell>{action}</TableCell>}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length + 1} className="text-center">
              No data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="bg-[#F6F7F9]">
        <TableRow>
          <TableCell className="rounded-b-lg" colSpan={headers.length + 1}>
            Test
          </TableCell>
        </TableRow>
      </TableFooter>
    </ShadcnTable>
  );
};

export default Table;
