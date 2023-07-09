import { useAtom } from "jotai";

import { orderCountsAtom } from "./atom";

const useOrder = () => {
  const [order, setOrderCounts] = useAtom(orderCountsAtom);

  const add = (item: string) => {
    setOrderCounts(
      (prevOrder) =>
        new Map(prevOrder.set(item, (prevOrder.get(item) || 0) + 1))
    );
  };

  const pop = (item: string) => {
    setOrderCounts((prevOrder) => {
      const currentCount = prevOrder.get(item) || 0;
      const nextCount = currentCount > 0 ? currentCount - 1 : 0;
      return nextCount > 0
        ? new Map(prevOrder.set(item, nextCount))
        : new Map([...prevOrder].filter(([key]) => key !== item));
    });
  };

  return {
    order,
    add,
    pop,
  };
};

export default useOrder;
