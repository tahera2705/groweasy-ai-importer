export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            GrowEasy CRM Importer
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Import and process CRM leads from CSV files
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            T
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Tahera Singaporewala
            </p>

            <p className="text-sm text-gray-500">
              Software Developer Intern
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}