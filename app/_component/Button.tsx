"use client";

import useOrder from "../_hook/useOrder";

export function AddButton({ item }: { item: string }) {
  const { add } = useOrder();

  return (
    <button
      className="h-4 w-5 rounded bg-gray-800 pb-6 text-center text-white shadow"
      onClick={() => add(item)}
    >
      +
    </button>
  );
}

export function PopButton({ item }: { item: string }) {
  const { pop } = useOrder();

  return (
    <button
      className="h-4 w-5 rounded bg-gray-300 pb-6 text-center text-gray-700 shadow"
      onClick={() => pop(item)}
    >
      -
    </button>
  );
}
