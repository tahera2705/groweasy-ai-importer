import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Timer,
} from "lucide-react";

interface ImportSummaryProps {
  totalRows: number;
  imported: number;
  skipped: number;
  processingTime: string;
}

export default function ImportSummary({
  totalRows,
  imported,
  skipped,
  processingTime,
}: ImportSummaryProps) {
  const cards = [
    {
      title: "Total Records",
      value: totalRows,
      icon: Database,
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Imported",
      value: imported,
      icon: CheckCircle2,
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Skipped",
      value: skipped,
      icon: AlertTriangle,
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      border: "border-yellow-200 dark:border-yellow-800",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Processing Time",
      value: processingTime
        ? `${processingTime}s`
        : "--",
      icon: Timer,
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`rounded-xl border ${card.border} ${card.bg} p-5 shadow-sm hover:shadow-md transition-all duration-300`}
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">
                  {card.value}
                </h2>

              </div>

              <div
                className={`w-12 h-12 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm`}
              >
                <Icon
                  size={24}
                  className={card.iconColor}
                />
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}