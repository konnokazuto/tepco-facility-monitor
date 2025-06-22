// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import GlobalHeader from "../components/common/GlobalHeader";

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="h-screen flex flex-col">
        <header className="border-b bg-white flex-shrink-0">
          <GlobalHeader />
        </header>
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    );
  }
});
