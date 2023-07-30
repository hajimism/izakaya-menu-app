"use client";

import { FunctionCallHandler } from "ai";
import { useChat } from "ai/react";
import { BsFillMicFill } from "react-icons/bs";
import { tv } from "tailwind-variants";

import useOrder from "../_hook/useOrder";
import { useSpeech } from "../_hook/useSpeech";

const button = tv({
  base: "flex h-16 w-16 items-center justify-center rounded-full text-2xl shadow",
  variants: {
    type: {
      on: "bg-red-700 text-white",
      off: "bg-slate-100 p-2 text-slate-800",
    },
  },
  defaultVariants: {
    type: "off",
  },
});

const Dictaphone = () => {
  const { transcript, isListening, startListening, stopListening } =
    useSpeech();
  const { add } = useOrder();

  const functionCallHandler: FunctionCallHandler = async (_, functionCall) => {
    if (functionCall.name === "order") {
      const ordersJson = functionCall.arguments?.replaceAll("\n", "");

      if (!ordersJson) return;

      const { orders } = JSON.parse(ordersJson) as {
        orders: {
          title: string;
          count: number;
        }[];
      };

      orders.forEach(({ title, count }) => add(title, count));
    }
  };

  const { append } = useChat({
    experimental_onFunctionCall: functionCallHandler,
  });

  const startOrderCall = () => startListening();

  const endOrderCall = () => {
    stopListening();

    append({
      content: transcript,
      role: "user",
      createdAt: new Date(),
    });
  };

  const handleListening = !isListening ? startOrderCall : endOrderCall;

  return (
    <>
      <div className="flex h-full w-full border-t-2 p-4 shadow">
        <p className="grow px-4 py-2">{transcript}</p>

        <button
          className={button({ type: isListening ? "on" : "off" })}
          onClick={handleListening}
        >
          <BsFillMicFill />
        </button>
      </div>
    </>
  );
};

export default Dictaphone;
