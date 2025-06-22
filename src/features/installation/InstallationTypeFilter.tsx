import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const installationTypes = ["カラーコーン", "工具箱・工具全般", "H鋼などの資材", "U字溝", "スロープ", "土のう"];

interface InstallationTypeFilterProps {
  selectedTypes: string[];
  onSelectionChange: (selectedTypes: string[]) => void;
  children: React.ReactNode;
}

export function InstallationTypeFilter({ selectedTypes, onSelectionChange, children }: InstallationTypeFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localSelection, setLocalSelection] = React.useState(selectedTypes);

  React.useEffect(() => {
    setLocalSelection(selectedTypes);
  }, [selectedTypes]);

  const handleSelectAll = () => {
    const allSelected = installationTypes.every((type) => localSelection.includes(type));
    if (allSelected) {
      setLocalSelection([]);
    } else {
      setLocalSelection([...installationTypes]);
    }
  };

  const handleTypeToggle = (type: string) => {
    setLocalSelection((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const handleDecision = () => {
    onSelectionChange(localSelection);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalSelection(selectedTypes);
    setIsOpen(false);
  };

  const isAllSelected = installationTypes.every((type) => localSelection.includes(type));

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[771px] p-8 bg-white" align="center" side="bottom" sideOffset={8}>
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h2 className="text-2xl font-bold text-black font-['Noto_Sans_JP']">条件設定</h2>

          {/* Checkbox List */}
          <div className="flex flex-col gap-2.5 px-6 py-3 border-b border-[#BBBBBB]">
            <h3 className="text-xl font-bold text-black font-['Noto_Sans_JP']">設置物種類</h3>

            <div className="flex flex-col gap-1.5 py-1.5">
              {/* Select All */}
              <div className="flex items-center gap-2 px-3">
                <Checkbox
                  id="select-all"
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  className="size-6"
                />
                <label
                  htmlFor="select-all"
                  className="text-base font-normal text-black font-['Noto_Sans_JP'] cursor-pointer"
                >
                  全て選択
                </label>
              </div>

              {/* Individual Types */}
              <div className="flex flex-row flex-wrap gap-y-1.5 py-1.5">
                {installationTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2 px-3 w-1/2">
                    <Checkbox
                      id={type}
                      checked={localSelection.includes(type)}
                      onCheckedChange={() => handleTypeToggle(type)}
                      className="size-6"
                    />
                    <label
                      htmlFor={type}
                      className="text-base font-normal text-black font-['Noto_Sans_JP'] cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2.5">
            <Button
              onClick={handleDecision}
              className={cn(
                "w-30 h-auto px-4 py-3 bg-black text-white border border-[#B3B3B3] rounded-lg",
                "text-base font-normal font-['Noto_Sans_JP'] hover:bg-black/90"
              )}
            >
              決定
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className={cn(
                "w-30 h-auto px-4 py-3 bg-white text-black border border-[#B3B3B3] rounded-lg",
                "text-base font-normal font-['Noto_Sans_JP']"
              )}
            >
              キャンセル
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
