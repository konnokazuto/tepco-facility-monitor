import { Link } from "@tanstack/react-router";

const GlobalHeader = () => {
  const tabs = [
    { path: "/", label: "ダッシュボード" },
    { path: "/installation", label: "設置物" },
    { path: "/application", label: "申請書" },
    { path: "/admin", label: "管理者" }
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm pr-8">
      <div className="flex h-16 justify-between items-center">
        <nav className="flex items-center h-full">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className="px-6 h-full text-sm !font-bold transition-colors duration-200 relative flex items-center"
              activeProps={{
                className: "text-gray-900 border-b-2 border-red-500"
              }}
              inactiveProps={{
                className: "text-gray-500 hover:text-gray-700"
              }}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <span className="text-sm font-bold text-gray-700">ユーザー名</span>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
