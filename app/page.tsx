import Cart from "./Cart";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <main className="grid grid-cols-12 gap-4">
      <div className="col-span-2">
        <Sidebar />
      </div>

      <div className="col-span-7">
        <Menu />
      </div>

      <div className="col-span-3">
        <Cart />
      </div>
    </main>
  );
}
