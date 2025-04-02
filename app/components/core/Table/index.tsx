import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
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
  action?: (idx: number) => React.ReactNode;
  seachable?: boolean;
  footer?: React.ReactNode;
  details?: (idx: number) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({
  headers,
  bodies,
  action,
  details,
  ...props
}) => {
  const { search, handleSearchChange, filteredBodies } = useTableFilter(
    headers,
    bodies
  );
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (idx: number) => {
    setExpandedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <ShadcnTable className="w-full max-w-full table-fixed border overflow-x-auto">
      <TableHeader className="bg-[#F6F7F9] text-[#758090]">
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead
              className="pl-2 first:rounded-tl-lg last:rounded-tr-lg px-5 pt-2"
              key={idx}
            >
              {header}
              {props.seachable && (
                <div className="max-w-full w-96">
                  <Input
                    className="-ml-2 w-full my-2 bg-white"
                    value={search[idx]}
                    onChange={(e) => handleSearchChange(e.target.value, idx)}
                    placeholder={`Search ${header}`}
                  />
                </div>
              )}
            </TableHead>
          ))}
          {(action || details) && (
            <TableHead className="rounded-tr-lg"></TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {filteredBodies.length > 0 ? (
          filteredBodies.map((body, idx) => (
            <>
              <TableRow key={idx}>
                {body.map((item, cellIdx) => (
                  <TableCell className="px-5" key={cellIdx}>
                    {item}
                  </TableCell>
                ))}
                {(action || details) && (
                  <TableCell className="justify-center flex gap-2">
                    {details && (
                      <button
                        onClick={() => toggleRow(idx)}
                        className="p-1 cursor-pointer"
                      >
                        {expandedRows.includes(idx) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    {action && action(idx)}
                  </TableCell>
                )}
              </TableRow>
              {expandedRows.includes(idx) && details && (
                <TableRow>
                  <TableCell
                    colSpan={headers.length + 1}
                    className="bg-gray-100"
                  >
                    {details(idx)}
                  </TableCell>
                </TableRow>
              )}
            </>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length + 1} className="text-center">
              No data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {props.footer && (
        <TableFooter className="bg-[#F6F7F9]">
          <TableRow>
            <TableCell className="rounded-b-lg" colSpan={headers.length + 1}>
              {props.footer}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </ShadcnTable>
  );
};

export default Table;
