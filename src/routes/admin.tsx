import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminPage
});

function AdminPage() {
  return (
    <div className="p-8 h-full overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">管理者</h1>
      <p className="text-gray-600">管理者ページのコンテンツがここに表示されます。</p>
    </div>
  );
}
