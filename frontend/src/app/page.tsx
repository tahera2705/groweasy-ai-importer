"use client";

import { useState } from "react";
import Layout from "../components/Layout";
import UploadCard from "../components/UploadCard";
import PreviewTable from "../components/PreviewTable";
import AIResultTable from "../components/AIResultTable";
import DownloadButton from "../components/DownloadButton";
import ImportSummary from "../components/ImportSummary";
import SearchBar from "../components/SearchBar";
import { toast } from "sonner";
import ImportStepper from "../components/ImportStepper";
import DashboardHero from "../components/DashboardHero";

export default function Home() {


  const [loadingStage, setLoadingStage] = useState("Uploading CSV...");
  const [csvData, setCsvData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiResult, setAiResult] = useState<Record<string, string>[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [importedCount, setImportedCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [processingTime, setProcessingTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fileInfo, setFileInfo] = useState({
    fileName: "",
    rowCount: 0,
    columnCount: 0,
    fileSize: 0,
  });

  const currentStep =
  aiResult.length > 0
    ? "completed"
    : loading
    ? "processing"
    : fileInfo.fileName
    ? "preview"
    : "idle";
  const handleImport = async () => {
    if (!selectedFile) {
      toast.warning("Please upload a CSV first.");
      return;
    }

    try {
      setLoading(true);
      setLoadingStage("Uploading CSV");
      

      const formData = new FormData();
      formData.append("file", selectedFile);
      setLoadingStage("Analyzing CSV Structure");


      if (!(await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      })).ok) {
  throw new Error("Import failed");
}

      const result = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      })).json();
      setLoadingStage("Mapping CRM fields");
      const records = Array.isArray(result.crmRecords) ? result.crmRecords : [];

      setLoadingStage("Preparing CRM records");
      setAiResult(records);
      setLoadingStage("Import complete.");
      

setImportedCount(result.imported || records.length);
setSkippedCount(result.skipped || 0);
setTotalRows(result.totalRows || records.length);
setProcessingTime(result.processingTime || "");

setSuccessMessage(
  `Successfully imported ${result.imported || records.length} CRM records.`
);
toast.success("CRM records imported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to import CSV.");
    } finally {
      setLoading(false);
    }
  };
  const filteredCsvData = csvData.filter((row) =>
  Object.values(row).some((value) =>
    String(value).toLowerCase().includes(searchTerm.toLowerCase())
  )
);

const filteredAiResult = aiResult.filter((row) =>
  Object.values(row).some((value) =>
    String(value).toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10">
        <DashboardHero />
        <ImportStepper step={currentStep} />
        <UploadCard
          setCsvData={setCsvData}
          setFileInfo={setFileInfo}
          setSelectedFile={setSelectedFile}
        />

        {fileInfo.fileName && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex justify-between items-center transition-colors">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Selected File</p>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{fileInfo.fileName}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {fileInfo.rowCount} records • {fileInfo.columnCount} columns
              </p>
            </div>
            <div className="text-right">
              <p className="text-green-600 dark:text-green-400 font-medium">Ready to Import</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {(fileInfo.fileSize / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-5 transition-colors">
            <h3 className="font-semibold text-green-800 dark:text-green-300">Import Completed</h3>
            <p className="text-green-700 dark:text-green-400 mt-1">{successMessage}</p>
          </div>
        )}
        {aiResult.length > 0 && (
  <ImportSummary
    totalRows={totalRows}
    imported={importedCount}
    skipped={skippedCount}
    processingTime={processingTime}
  />
)}

        {csvData.length > 0 && (
          <>
          <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preview Uploaded Data</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Review your CSV before importing.
              </p>
            </div>
            <PreviewTable data={filteredCsvData} />

            {loading ? (
             <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 transition-colors">

  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
    Import in Progress
  </h2>

  <p className="text-gray-500 dark:text-gray-400 mt-2">
    Please wait while we prepare your CRM records.
  </p>

  <div className="mt-8 space-y-4">

    <div className="flex items-center gap-3">
      <span>✅</span>
      <span className="text-gray-700 dark:text-gray-300">
  CSV Uploaded
</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="animate-spin">⏳</span>
      <span className="text-gray-700 dark:text-gray-300">
  {loadingStage}
</span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
      <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
    </div>

  </div>

</div>
            ) : (
              <div className="flex justify-end">
                <button
  onClick={handleImport}
  disabled={!selectedFile || loading}
  className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 transition-colors"
>
  {loading ? "Importing..." : "Import Records"}
</button>
              </div>
            )}
          </>
        )}

        {aiResult.length > 0 && (
          <>
            <AIResultTable data={filteredAiResult} />

            <div className="flex justify-end mt-4">
            <DownloadButton data={aiResult} />
            </div>

        
          </>
        )}
      </div>
    </Layout>
  );
}
