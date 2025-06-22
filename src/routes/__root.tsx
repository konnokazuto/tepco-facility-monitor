// src/routes/__root.tsx
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import GlobalHeader from "../components/common/GlobalHeader";

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const isInstallationPage = location.pathname === "/installation";

    if (isInstallationPage) {
      // installationページは独自レイアウトを持つためヘッダーなし
      return (
        <div className="h-screen">
          <Outlet />
        </div>
      );
    }

    // 通常のページはstatic headerを表示
    return (
      <div className="h-screen flex flex-col">
        {/* 全ページ共通のヘッダー */}
        <header className="border-b bg-white flex-shrink-0">
          <GlobalHeader />
        </header>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    );
  }
});
