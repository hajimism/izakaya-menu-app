import Cart from "./_component/Cart";
import Dictaphone from "./_component/Dictaphone";
import Menu from "./_component/Menu";
import Sidebar from "./_component/Sidebar";

export default function Home() {
  return (
    <main className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>

      <div className="col-span-7 flex h-screen flex-col">
        <div className="h-[calc(100%-100px)] overflow-y-auto">
          <Menu />
        </div>
        <div className="h-[100px]">
          <Dictaphone />
        </div>
      </div>

      <div className="col-span-3">
        <Cart />
      </div>
    </main>
  );
}
