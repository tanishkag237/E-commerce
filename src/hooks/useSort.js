import { useMemo, useState } from "react";

export const useSort = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let itemsSorted = [...items];

    if (sortConfig !== null) {
      itemsSorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      });
    }

    return itemsSorted;
  }, [sortConfig, items]);
};
