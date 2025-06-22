import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/application")({
  component: ApplicationPage
});

function ApplicationPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">申請書</h1>
      <p className="text-gray-600">申請書ページのコンテンツがここに表示されます。</p>
    </div>
  );
}
