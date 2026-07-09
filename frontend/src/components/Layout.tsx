import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <><div
  className="
    min-h-screen
    bg-gray-100 dark:bg-gray-950
    transition-colors duration-300
    flex
  "
>

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main
  className="
    p-8
    text-gray-900 dark:text-gray-100
    transition-colors duration-300
  "
>
          {children}
        </main>

      </div>

    </div><Toaster
        position="top-right"
        richColors
        closeButton /></>
  );
}