/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React, { useState } from "react";

// Mock TanStack Router
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => ({
    component: () => null
  }),
  useLocation: () => ({ pathname: "/installation" })
}));

// Import components after mocking
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, X, PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InstallationTypeFilter } from "@/features/installation/InstallationTypeFilter";

// Extract components for testing
function StaticSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedInstallationTypes, setSelectedInstallationTypes] = useState<string[]>([]);
  const [previousTypes, setPreviousTypes] = useState<string[]>([]);

  const handleInstallationTypeChange = (newTypes: string[]) => {
    setPreviousTypes(selectedInstallationTypes);
    setSelectedInstallationTypes(newTypes);
  };

  const isNewTag = (type: string) => {
    return !previousTypes.includes(type);
  };

  return (
    <div
      className={`
        bg-zinc-100 transition-all duration-300 ease-out overflow-hidden
        ${isOpen ? "w-96" : "w-0"}
      `}
      data-testid="sidebar"
    >
      <div className="h-full p-5 flex flex-col justify-start items-start gap-4 w-96 flex-shrink-0">
        <div className="self-stretch inline-flex justify-end items-center gap-2.5">
          <button
            onClick={onToggle}
            className="size-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
            data-testid="sidebar-toggle"
          >
            <PanelLeftIcon className="size-6" />
          </button>
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
                  data-testid="sidebar-x-input"
                />
              </div>
              <div className="w-20 flex justify-between items-center">
                <div className="justify-start text-black text-2xl font-normal font-['Inter']">y:</div>
                <Input
                  type="number"
                  placeholder="0"
                  className="w-12 h-auto p-2.5 bg-white border border-zinc-400 rounded-lg text-right text-base font-normal leading-none"
                  data-testid="sidebar-y-input"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch h-96 relative">
            <img
              className="w-96 h-96 left-0 top-0 absolute shadow-[0px_2px_6px_0px_rgba(0,0,0,0.10)] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.08)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)]"
              src="https://placehold.co/360x438"
              alt="Map placeholder"
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
    </div>
  );
}

function InstallationContent({ sidebarOpen, onSidebarToggle }: { sidebarOpen: boolean; onSidebarToggle: () => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex-1 flex flex-col">
      <header
        className={`
          flex pt-2 h-16 shrink-0 items-center gap-2.5 border-b px-4 bg-gray-100
          transition-opacity duration-500 ease-out
          ${!sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        data-testid="content-header"
      >
        <button
          onClick={onSidebarToggle}
          className="size-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
          data-testid="header-toggle"
        >
          <PanelLeftIcon className="size-6" />
        </button>

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

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 min-w-[90px]">
            <span className="text-2xl font-normal text-black">x:</span>
            <Input
              type="number"
              placeholder="0"
              className="w-[50px] h-10 bg-white border border-gray-400 rounded-lg text-right text-base"
              data-testid="header-x-input"
            />
          </div>

          <div className="flex items-center gap-2 min-w-[90px]">
            <span className="text-2xl font-normal text-black">y:</span>
            <Input
              type="number"
              placeholder="0"
              className="w-[50px] h-10 px-3 py-2  bg-white border border-gray-400 rounded-lg text-right text-base"
              data-testid="header-y-input"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">設置物</h1>
        <p className="text-gray-600">設置物ページのコンテンツがここに表示されます。</p>
      </main>
    </div>
  );
}

function TestInstallationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <StaticSidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
        <InstallationContent sidebarOpen={sidebarOpen} onSidebarToggle={handleSidebarToggle} />
      </div>
    </div>
  );
}

const renderInstallationPage = () => {
  return render(<TestInstallationPage />);
};

describe("Installation Page", () => {
  beforeEach(() => {
    // Reset any DOM state before each test
    document.body.innerHTML = "";
  });

  describe("Sidebar functionality", () => {
    it("should render with sidebar open by default", async () => {
      renderInstallationPage();

      // Check sidebar is present and open
      const sidebar = screen.getByTestId("sidebar");
      expect(sidebar).toHaveClass("w-96");

      // Check sidebar content is visible
      expect(screen.getByText("エリア")).toBeInTheDocument();
    });

    it("should toggle sidebar when clicking the trigger button", async () => {
      renderInstallationPage();

      const sidebar = screen.getByTestId("sidebar");
      const toggleButton = screen.getByTestId("sidebar-toggle");

      // Initially open
      expect(sidebar).toHaveClass("w-96");

      // Click to close
      fireEvent.click(toggleButton);
      expect(sidebar).toHaveClass("w-0");

      // Click to open again
      fireEvent.click(toggleButton);
      expect(sidebar).toHaveClass("w-96");
    });

    it("should show/hide header based on sidebar state", async () => {
      renderInstallationPage();

      const header = screen.getByTestId("content-header");
      const toggleButton = screen.getByTestId("sidebar-toggle");

      // Initially sidebar is open, so header should be hidden
      expect(header).toHaveClass("opacity-0");

      // Close sidebar - header should become visible
      fireEvent.click(toggleButton);
      expect(header).toHaveClass("opacity-100");

      // Open sidebar - header should be hidden again
      fireEvent.click(toggleButton);
      expect(header).toHaveClass("opacity-0");
    });
  });

  describe("Header content", () => {
    it("should render coordinate inputs in header", async () => {
      renderInstallationPage();

      // Header inputs should exist
      expect(screen.getByTestId("header-x-input")).toBeInTheDocument();
      expect(screen.getByTestId("header-y-input")).toBeInTheDocument();
    });
  });

  describe("Sidebar content", () => {
    it("should render installation type filter in sidebar", async () => {
      renderInstallationPage();

      expect(screen.getByText("条件設定")).toBeInTheDocument();
      expect(screen.getByText("設定")).toBeInTheDocument();
      expect(screen.getByText("設置物種類")).toBeInTheDocument();
    });

    it("should render map placeholder in sidebar", async () => {
      renderInstallationPage();

      const mapImage = screen.getByAltText("Map placeholder");
      expect(mapImage).toHaveAttribute("src", "https://placehold.co/360x438");
    });

    it("should render coordinate inputs in sidebar", async () => {
      renderInstallationPage();

      expect(screen.getByTestId("sidebar-x-input")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-y-input")).toBeInTheDocument();
    });
  });

  describe("Main content", () => {
    it("should render main content area", async () => {
      renderInstallationPage();

      expect(screen.getByText("設置物")).toBeInTheDocument();
      expect(screen.getByText("設置物ページのコンテンツがここに表示されます。")).toBeInTheDocument();
    });
  });

  describe("State management", () => {
    it("should maintain sidebar state across multiple toggles", async () => {
      renderInstallationPage();

      const sidebar = screen.getByTestId("sidebar");
      const toggleButton = screen.getByTestId("sidebar-toggle");

      // Initial state: open
      expect(sidebar).toHaveClass("w-96");

      // First toggle: close
      fireEvent.click(toggleButton);
      expect(sidebar).toHaveClass("w-0");

      // Second toggle: open
      fireEvent.click(toggleButton);
      expect(sidebar).toHaveClass("w-96");

      // Third toggle: close
      fireEvent.click(toggleButton);
      expect(sidebar).toHaveClass("w-0");
    });
  });

  describe("CSS transitions", () => {
    it("should have proper transition classes applied", async () => {
      renderInstallationPage();

      const sidebar = screen.getByTestId("sidebar");
      const header = screen.getByTestId("content-header");

      // Check sidebar transition classes
      expect(sidebar).toHaveClass("transition-all");
      expect(sidebar).toHaveClass("duration-300");
      expect(sidebar).toHaveClass("ease-out");

      // Check header transition classes
      expect(header).toHaveClass("transition-opacity");
      expect(header).toHaveClass("duration-500");
    });
  });

  describe("Toggle button synchronization", () => {
    it("should synchronize both toggle buttons", async () => {
      renderInstallationPage();

      const sidebar = screen.getByTestId("sidebar");
      const header = screen.getByTestId("content-header");
      const sidebarToggle = screen.getByTestId("sidebar-toggle");

      // Close sidebar using sidebar button
      fireEvent.click(sidebarToggle);
      expect(sidebar).toHaveClass("w-0");
      expect(header).toHaveClass("opacity-100");

      // Open sidebar using header button
      const headerToggle = screen.getByTestId("header-toggle");
      fireEvent.click(headerToggle);
      expect(sidebar).toHaveClass("w-96");
      expect(header).toHaveClass("opacity-0");
    });
  });
});
