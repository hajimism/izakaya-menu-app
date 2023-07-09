import menuData from "@/menu.json";

function Menu() {
  return (
    <div className="flex h-screen flex-col gap-4 overflow-auto p-4">
      <h1 className="mb-6 mt-2 text-2xl font-bold">メニュー一覧</h1>
      {Object.keys(menuData.menu).map((genre, index) => (
        <div key={index} className="rounded bg-white p-4 shadow">
          <h2 id={genre} className="mb-2 text-lg font-semibold">
            {genre}
          </h2>
          <ul className="grid grid-cols-2 gap-4">
            {(menuData.menu as any)[genre].map((item: string) => (
              <li key={item} className="my-2 rounded bg-white p-4 shadow">
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Menu;
