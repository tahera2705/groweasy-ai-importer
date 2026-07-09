interface AIResultTableProps {
  data: Record<string, string>[];
}

export default function AIResultTable({
  data,
}: AIResultTableProps) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden transition-all duration-300">

      {/* Header */}

      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Imported CRM Records
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Successfully processed records ready for your CRM.
          </p>

        </div>

        <div className="px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">

          <p className="text-sm font-semibold text-green-700 dark:text-green-300">
            ✓ {data.length} Imported
          </p>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-auto max-h-[500px]">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-20">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap"
                >
                  {header.replaceAll("_", " ")}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {data.map((row, index) => (

              <tr
                key={index}
                className={`transition-colors duration-200 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-blue-50 dark:hover:bg-blue-950/30`}
              >

                {headers.map((header) => (

                  <td
                    key={header}
                    className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap"
                  >
                    {String(row[header] ?? "-")}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">

        <p className="text-sm text-gray-500 dark:text-gray-400">
          CRM import completed successfully
        </p>

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Total Records: {data.length}
        </p>

      </div>

    </div>
  );
}