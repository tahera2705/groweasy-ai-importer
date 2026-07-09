import Papa from "papaparse";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  data: any[];
}

export default function DownloadButton({
  data,
}: DownloadButtonProps) {
  if (data.length === 0) return null;

  const downloadCSV = () => {
    const csv = Papa.unparse(data);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "crm_records.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition"
    >
     <div className="flex items-center gap-2">

<Download size={18}/>

<span>Export CSV</span>

</div>
    </button>
  );
}