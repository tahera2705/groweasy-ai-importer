export default function Sidebar() {
  return (
    <aside
      className="
        w-64
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
        transition-colors duration-300
      "
    >
      <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-800">

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          GrowEasy CRM
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Lead Management
        </p>

      </div>

      <nav className="p-4">

        <div
          className="
            bg-blue-50 dark:bg-blue-950/40
            border border-blue-200 dark:border-blue-800
            rounded-lg
            px-4
            py-3
            transition-colors duration-300
          "
        >

          <p className="font-medium text-blue-700 dark:text-blue-300">
            CSV Import
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Import leads into CRM
          </p>

        </div>

      </nav>
    </aside>
  );
}