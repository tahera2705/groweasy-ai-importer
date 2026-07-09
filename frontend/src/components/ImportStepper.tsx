import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface ImportStepperProps {
  step: "idle" | "preview" | "processing" | "completed";
}

const steps = [
  { key: "upload", label: "Upload CSV" },
  { key: "preview", label: "Preview Data" },
  { key: "processing", label: "Process Records" },
  { key: "completed", label: "Import Complete" },
];

export default function ImportStepper({
  step,
}: ImportStepperProps) {
  const state = {
    idle: 0,
    preview: 1,
    processing: 2,
    completed: 4,
  }[step];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 transition-colors">

      <div className="flex items-center">

        {steps.map((item, index) => {

          const completed = index < state;
          const active = index === state;

          return (
            <div
              key={item.key}
              className="flex items-center flex-1"
            >

              <div className="flex flex-col items-center">

                {completed ? (

                  <CheckCircle2
                    size={30}
                    className="text-green-600"
                  />

                ) : active ? (

                  <Loader2
                    size={30}
                    className="text-blue-600 animate-spin"
                  />

                ) : (

                  <Circle
                    size={30}
                    className="text-gray-400 dark:text-gray-600"
                  />

                )}

                <span
                  className={`mt-2 text-sm font-medium whitespace-nowrap transition-colors
                    ${
                      completed
                        ? "text-green-600"
                        : active
                        ? "text-blue-600"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                >
                  {item.label}
                </span>

              </div>

              {index !== steps.length - 1 && (

                <div className="flex-1 h-1 mx-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">

                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      completed
                        ? "bg-green-500 w-full"
                        : "bg-transparent w-0"
                    }`}
                  />

                </div>

              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}