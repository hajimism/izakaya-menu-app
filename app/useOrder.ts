import { useAtom } from "jotai";

import { orderCountsAtom } from "./atom";

const useOrder = () => {
  const [order, setOrderCounts] = useAtom(orderCountsAtom);

  const add = (item: string) => {
    setOrderCounts(
      (prevCounts) =>
        new Map(prevCounts.set(item, (prevCounts.get(item) || 0) + 1))
    );
  };

  const pop = (item: string) => {
    setOrderCounts((prevCounts) => {
      const currentCount = prevCounts.get(item) || 0;
      const nextCount = currentCount > 0 ? currentCount - 1 : 0;
      return nextCount > 0
        ? new Map(prevCounts.set(item, nextCount))
        : new Map([...prevCounts].filter(([key]) => key !== item));
    });
  };

  return {
    order,
    add,
    pop,
  };
};

export default useOrder;
