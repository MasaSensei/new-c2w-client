import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
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
import ClipLoader from "react-spinners/ClipLoader";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

interface TableProps extends React.ComponentProps<typeof ShadcnTable> {
  headers: string[];
  className?: string;
  headersClassName?: string;
  bodies: (string | number | React.ReactNode)[][];
  bodiesClassName?: string;
  action?: (idx: number) => React.ReactNode;
  seachable?: boolean;
  footer?: React.ReactNode;
  details?: (idx: number) => React.ReactNode;
  isLoading?: boolean;
  isTableAuto?: boolean;
  columnWidths?: string[];
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

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredBodies.length / 10)); // assuming 10 rows per page

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  // Paginate filteredBodies
  const paginatedBodies = filteredBodies.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <ShadcnTable
      className={cn(
        props.className,
        `max-w-full ${
          props.isTableAuto ? "table-auto" : "table-fixed"
        } border overflow-x-auto`
      )}
    >
      <TableHeader
        className={`bg-[#F6F7F9] text-[#758090] ${
          props.isTableAuto ? "table-auto" : "table-fixed"
        }`}
      >
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead
              className={cn(
                props.headersClassName,
                "pl-2 first:rounded-tl-lg last:rounded-tr-lg px-5 pt-2"
              )}
              key={idx}
            >
              {header}
              {props.seachable && (
                <div className="max-w-full w-96">
                  <Input
                    className="-mx-2 w-full my-2 bg-white"
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
        {props.isLoading ? (
          <TableRow>
            <TableCell
              colSpan={action ? headers.length + 1 : headers.length}
              className="text-center"
            >
              <ClipLoader
                color="#000000"
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </TableCell>
          </TableRow>
        ) : filteredBodies.length > 0 ? (
          filteredBodies.map((body, idx) => (
            <>
              <TableRow key={idx}>
                {body.map((item, cellIdx) => (
                  <TableCell
                    className={cn(
                      props.bodiesClassName,
                      props.columnWidths?.[cellIdx] ?? "w-40",
                      "px-5 whitespace-nowrap"
                    )}
                    key={cellIdx}
                  >
                    {item}
                  </TableCell>
                ))}
                {(action || details) && (
                  <TableCell className="justify-center flex gap-4 w-max">
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
            <TableCell
              colSpan={action ? headers.length + 1 : headers.length}
              className="text-center"
            >
              No data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {props.footer && (
        <TableFooter className="bg-[#F6F7F9]">
          <TableRow>
            <TableCell
              className="rounded-b-lg"
              colSpan={action ? headers.length + 1 : headers.length}
            >
              <div className="flex items-center justify-start gap-8 px-2 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </Button>

                <span className="text-sm">
                  Page <strong>{currentPage}</strong> of{" "}
                  <strong>{totalPages}</strong>
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </ShadcnTable>
  );
};

export default Table;
