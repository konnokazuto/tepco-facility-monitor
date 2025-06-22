import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardPage
});

function DashboardPage() {
  return (
    <div className="p-8 h-full overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">ダッシュボード</h1>
      <p className="text-gray-600">ダッシュボードページのコンテンツがここに表示されます。</p>
    </div>
  );
}
