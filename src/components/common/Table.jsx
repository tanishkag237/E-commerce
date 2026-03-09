import { SortAsc } from "lucide-react";
import React from "react";

// action, onSort
const Table = ({ data = [], columns = [], action }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-custom-bg bg-white shadow-sm">
      <table className=" w-full min-w-175 text-xs sm:text-sm text-left">
        <thead className="bg-black sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
               className="px-2 sm:px-6 py-3 font-semibold uppercase text-slate-200">
                <div className="flex items-center gap-2">
                  {col.header}

                  {/* {(col.accessor === "firstName" ||
                    col.accessor === "title") && (
                      <button
                        onClick={onSort}
                        className="hover:text-white transition">
                        <SortAsc size={15} />
                      </button>
                    )} */}
                </div>
              </th>
            ))}

            {action && (
              <th className="px-3 sm:px-6 uppercase py-3 text-slate-200">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className=" transition-all duration-300 ease-in-out hover:bg-custom-bg/30 hover:shadow-sm md:hover:scale-[1.01] active:scale-[0.995]">
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-slate-900 tracking-wide whitespace-nowrap">
                  {col.cell ? col.cell(row) : row[col.accessor]}
                </td>
              ))}

              {action && <td className="px-3 sm:px-6 py-3">{action(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
