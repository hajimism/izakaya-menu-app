"use client";

import { AddButton, PopButton } from "./Button";
import useOrder from "../_hook/useOrder";

function Cart() {
  const { order } = useOrder();

  return (
    <div className="h-screen overflow-auto border-l p-4">
      <h2 className="mb-6 text-lg font-semibold">ご注文一覧</h2>
      <ul>
        {[...order.entries()].map(([item, count], i) => (
          <li key={i} className="my-2 flex justify-between">
            <p>{item}</p>
            <div className="flex gap-4">
              <PopButton item={item} />
              <p className="w-6 text-center">{count}</p>
              <AddButton item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
