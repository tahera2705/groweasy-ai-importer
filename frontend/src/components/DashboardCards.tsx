interface DashboardCardsProps {
  rows: number;
  imported: number;
  skipped: number;
}

export default function DashboardCards({
  rows,
  imported,
  skipped,
}: DashboardCardsProps) {
  const status =
    rows === 0
      ? "Waiting"
      : imported === rows
      ? "Completed"
      : "Processing";

  const cards = [
    {
      title: "Rows",
      value: rows,
    },
    {
      title: "Imported",
      value: imported,
    },
    {
      title: "Skipped",
      value: skipped,
    },
    {
      title: "Status",
      value: status,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}