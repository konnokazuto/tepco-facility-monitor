import { createFileRoute } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { GlobalSideBar } from "@/components/common/GlobalSideBar";
import { Input } from "@/components/ui/input";
import GlobalHeader from "@/components/common/GlobalHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/installation")({
  component: InstallationPage
});

function InstallationContent() {
  const { open } = useSidebar();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <SidebarInset>
      <header
        className={`
          flex pt-2 h-16 shrink-0 items-center gap-2.5 border-b px-4 bg-gray-100
          transition-opacity duration-500 ease-out
          ${open ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        {/* アイコン（SidebarTrigger） */}
        <SidebarTrigger className="size-6" />

        {/* 日付セクション */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-normal text-black">日付</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-auto min-w-[160px] h-10 px-4 py-2 bg-white border border-gray-300 rounded justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "yyyy/MM/dd(E)", { locale: ja }) : <span>日付を選択</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={ja} />
            </PopoverContent>
          </Popover>
        </div>

        {/* 座標セクション */}
        <div className="flex items-center gap-2.5">
          {/* X座標 */}
          <div className="flex items-center gap-2 min-w-[90px]">
            <span className="text-2xl font-normal text-black">x:</span>
            <Input
              type="number"
              placeholder="0"
              className="w-[50px] h-10 bg-white border border-gray-400 rounded-lg text-right text-base"
            />
          </div>

          {/* Y座標 */}
          <div className="flex items-center gap-2 min-w-[90px]">
            <span className="text-2xl font-normal text-black">y:</span>
            <Input
              type="number"
              placeholder="0"
              className="w-[50px] h-10 px-3 py-2  bg-white border border-gray-400 rounded-lg text-right text-base"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">設置物</h1>
        <p className="text-gray-600">設置物ページのコンテンツがここに表示されます。</p>
      </main>
    </SidebarInset>
  );
}

function InstallationPage() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <GlobalHeader />
        <SidebarProvider className="absolute top-16 h-[calc(100vh-4rem)]">
          <GlobalSideBar />
          <InstallationContent />
        </SidebarProvider>
      </div>
    </>
  );
}
