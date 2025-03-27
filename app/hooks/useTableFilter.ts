import { useState } from "react";

export const useTableFilter = (
  headers: string[],
  bodies: (string | number | React.ReactNode)[][]
) => {
  const [search, setSearch] = useState<string[]>(
    new Array(headers.length).fill("")
  );

  const handleSearchChange = (value: string, idx: number) => {
    setSearch((prev) => {
      const updatedSearch = [...prev];
      updatedSearch[idx] = value.toLowerCase();
      return updatedSearch;
    });
  };

  const filteredBodies = bodies.filter((row) =>
    row.every((cell, idx) => {
      if (!search[idx]) return true;
      const cellValue =
        typeof cell === "string" || typeof cell === "number"
          ? cell.toString().toLowerCase()
          : "";
      return cellValue.includes(search[idx]);
    })
  );

  return { search, handleSearchChange, filteredBodies };
};
