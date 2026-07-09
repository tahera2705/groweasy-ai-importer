"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  Trash2,
} from "lucide-react";
import Papa from "papaparse";

interface UploadCardProps {
  setCsvData: React.Dispatch<
    React.SetStateAction<Record<string, string>[]>
  >;

  setFileInfo: React.Dispatch<
    React.SetStateAction<{
      fileName: string;
      rowCount: number;
      columnCount: number;
      fileSize: number;
    }>
  >;

  setSelectedFile: React.Dispatch<
    React.SetStateAction<File | null>
  >;
}

export default function UploadCard({
  setCsvData,
  setFileInfo,
  setSelectedFile,
}: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    setPreviewFile(file);
    setSelectedFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data as Record<string, string>[]);

        setFileInfo({
          fileName: file.name,
          rowCount: results.data.length,
          columnCount: Object.keys(results.data[0] || {}).length,
          fileSize: file.size,
        });
      },
    });
  };

  const removeFile = () => {
    setPreviewFile(null);
    setSelectedFile(null);

    setCsvData([]);

    setFileInfo({
      fileName: "",
      rowCount: 0,
      columnCount: 0,
      fileSize: 0,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-8 transition-all duration-300">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Import Leads via CSV
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Upload a CSV file to import CRM leads into GrowEasy CRM.
        </p>

      </div>

      {/* Upload Area */}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);

          const file = e.dataTransfer.files[0];

          if (file) processFile(file);
        }}
        className={`rounded-xl border-2 border-dashed py-10 px-8 text-center transition-all duration-300 cursor-pointer
          ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.01]"
              : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400"
          }`}
      >

        <div className="flex justify-center mb-6">

          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center">

            <UploadCloud
              size={30}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>

        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Drag & Drop CSV File
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mt-3">
          or browse from your computer
        </p>

        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Supported format: CSV • Maximum size: 10 MB
        </p>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition"
        >
          Browse File
        </button>

        <input
          hidden
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) processFile(file);
          }}
        />

      </div>

      {/* Selected File */}

      {previewFile && (

        <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between transition">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">

              <FileSpreadsheet
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />

            </div>

            <div>

              <p className="font-semibold text-gray-900 dark:text-white">
                {previewFile.name}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(previewFile.size / 1024).toFixed(1)} KB
              </p>

            </div>

          </div>

          <button
            onClick={removeFile}
            className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
          >
            <Trash2 size={16} />
            <span>Remove</span>
          </button>

        </div>

      )}

    </div>
  );
}