import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { X, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { InstallationTypeFilter } from "@/features/installation/InstallationTypeFilter";

export function GlobalSideBar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedInstallationTypes, setSelectedInstallationTypes] = useState<string[]>([]);
  const [previousTypes, setPreviousTypes] = useState<string[]>([]);

  const handleInstallationTypeChange = (newTypes: string[]) => {
    setPreviousTypes(selectedInstallationTypes);
    setSelectedInstallationTypes(newTypes);
  };

  // 新しく追加されたタグを判定する関数
  const isNewTag = (type: string) => {
    return !previousTypes.includes(type);
  };

  return (
    <Sidebar>
      <SidebarContent className="h-full">
        <div className="w-96 h-full p-5 bg-zinc-100 flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-end items-center gap-2.5">
            <SidebarTrigger />
          </div>
          <div className="self-stretch py-2 flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <div className="justify-start text-black text-xl font-normal font-['Inter']">エリア</div>
              <div className="flex-1 flex justify-end items-start gap-2.5">
                <div className="w-20 flex justify-between items-center">
                  <div className="justify-start text-black text-2xl font-normal font-['Inter']">x:</div>
                  <Input
                    type="number"
                    placeholder="0"
                    className="w-12 h-auto p-2.5 bg-white border border-zinc-400 rounded-lg text-right text-base font-normal leading-none"
                  />
                </div>
                <div className="w-20 flex justify-between items-center">
                  <div className="justify-start text-black text-2xl font-normal font-['Inter']">y:</div>
                  <Input
                    type="number"
                    placeholder="0"
                    className="w-12 h-auto p-2.5 bg-white border border-zinc-400 rounded-lg text-right text-base font-normal leading-none"
                  />
                </div>
              </div>
            </div>
            <div className="self-stretch h-96 relative">
              <img
                className="w-96 h-96 left-0 top-0 absolute shadow-[0px_2px_6px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)]"
                src="https://placehold.co/360x438"
              />
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-black text-xl font-normal font-['Inter']">日付</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-auto px-4 py-2 bg-white border border-neutral-200 rounded gap-2 justify-start text-left font-normal",
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
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5 flex-1">
            <div className="w-86 inline-flex justify-between items-center">
              <div className="justify-start text-black text-xl font-normal font-['Inter']">条件設定</div>
              <InstallationTypeFilter
                selectedTypes={selectedInstallationTypes}
                onSelectionChange={handleInstallationTypeChange}
              >
                <Button
                  variant="outline"
                  className="w-20 h-9 px-4 py-3 bg-white border border-zinc-400 rounded-lg text-black text-base font-normal"
                >
                  設定
                </Button>
              </InstallationTypeFilter>
            </div>
            <div className="self-stretch pl-4 py-2 flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-center items-start gap-2.5">
                <div className="justify-start text-black text-base font-normal font-['Inter']">設置物種類</div>
                <div className="self-stretch pl-4 inline-flex justify-start items-start gap-2.5 flex-wrap content-start">
                  {selectedInstallationTypes.map((type) => (
                    <div
                      key={type}
                      className={cn(
                        "pl-3.5 pr-2 py-1.5 bg-neutral-200 rounded-2xl flex justify-start items-center gap-1.5",
                        isNewTag(type) && "animate-in fade-in slide-in-from-left-2 duration-300"
                      )}
                    >
                      <div className="flex justify-start items-center gap-1.5">
                        <div className="text-center justify-start text-gray-700 text-base font-normal font-['Noto_Sans_JP'] leading-snug">
                          {type}
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedInstallationTypes((prev) => prev.filter((t) => t !== type))}
                          className="hover:opacity-70 transition-opacity duration-200"
                        >
                          <X className="w-4 h-4 text-black" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
