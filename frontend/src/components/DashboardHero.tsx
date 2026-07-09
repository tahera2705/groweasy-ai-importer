import { Database, Sparkles, FileSpreadsheet } from "lucide-react";

export default function DashboardHero() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
            <Sparkles size={16} />
            AI Powered CRM Import
          </div>

          <h1 className="mt-4 text-4xl font-bold">
            GrowEasy CRM Import Center
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Upload, validate, transform and import CRM records using AI-powered
            field mapping with a clean review workflow.
          </p>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 text-center">
            <Database
              size={28}
              className="mx-auto mb-2"
            />
            <p className="text-sm text-blue-100">
              CRM
            </p>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 text-center">
            <Sparkles
              size={28}
              className="mx-auto mb-2"
            />
            <p className="text-sm text-blue-100">
              Gemini AI
            </p>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 text-center">
            <FileSpreadsheet
              size={28}
              className="mx-auto mb-2"
            />
            <p className="text-sm text-blue-100">
              CSV Import
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}