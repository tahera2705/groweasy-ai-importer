interface UploadSummaryProps {
  fileName: string;
  rowCount: number;
  columnCount: number;
  fileSize: number;
}

export default function UploadSummary({
  fileName,
  rowCount,
  columnCount,
  fileSize,
}: UploadSummaryProps) {
  return (

<div className="bg-white rounded-2xl shadow-xl p-6"><h2 className="text-xl font-bold mb-4">
        Upload Summary
      </h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
          <p className="text-gray-500 text-sm">File Name</p>
          <p className="text-xl font-bold text-orange-600">{fileName}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Rows</p>
          <p className="text-xl font-bold text-orange-600">{rowCount}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Columns</p>
          <p className="text-xl font-bold text-orange-600">{columnCount}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">File Size</p>
          <p className="text-xl font-bold text-orange-600">
            {(fileSize / 1024).toFixed(1)} KB
          </p>
        </div>
      </div>
    </div>
  );
}