interface PreviewTableProps {
  data: Record<string, string>[];
}

export default function PreviewTable({
  data,
}: PreviewTableProps) {
  if (data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors">

      {/* Header */}

      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Preview Uploaded Data
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review the uploaded records before importing.
          </p>

        </div>

        <div className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800">

          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {data.length} Records
          </p>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto max-h-[420px]">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
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
                className={`transition ${
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
          Showing all uploaded records
        </p>

        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Total: {data.length}
        </p>

      </div>

    </div>
  );
}