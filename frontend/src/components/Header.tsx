import ThemeToggle from "./ThemeToggle";
export default function Header() {
  return (
    <header
  className="
    bg-white dark:bg-gray-900
    border-b border-gray-200 dark:border-gray-800
    px-8 py-5
    flex justify-between items-center
    transition-colors duration-300
  "
>

      <div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Import Leads via CSV
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Upload, preview and import CRM records.
        </p>

      </div>

      <div className="flex items-center gap-4">

  <ThemeToggle />

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          T
        </div>

        <div>

          <p className="font-medium text-gray-900 dark:text-white">
            Tahera Singaporewala
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Software Developer Intern
          </p>

        </div>

      </div>

    </header>
  );
}