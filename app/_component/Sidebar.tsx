import Link from "next/link";

import menuData from "@/menu.json";

function Sidebar() {
  return (
    <div className="h-screen overflow-auto border-r p-4">
      <h2 className="mb-6 text-lg font-semibold">ジャンル一覧</h2>

      <ul className="flex flex-col gap-4">
        {Object.keys(menuData.menu).map((genre, index) => (
          <li key={index}>
            <Link
              href={`#${genre}`}
              className="text-gray-500 transition-colors hover:text-gray-700"
            >
              {genre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
