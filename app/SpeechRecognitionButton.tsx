"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { BiStopCircle } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { tv } from "tailwind-variants";

import { useSpeech } from "./useSpeech";

const button = tv({
  base: "fixed bottom-10 right-10 z-30 flex h-16 w-16 items-center justify-center rounded-full text-2xl shadow",
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

const dialog = tv({
  slots: {
    content:
      "fixed left-2 top-[10%] z-50 flex h-4/5 w-[240px] flex-col gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg",
    title: "text-lg font-semibold leading-none tracking-tight",
    description: "grow text-sm text-slate-700",
    footer: "flex sm:justify-end",
  },
});

const { content, title, description, footer } = dialog();

const Dictaphone = () => {
  const { transcript, isListening, startListening, stopListening, reset } =
    useSpeech();

  const handleListening = !isListening ? startListening : stopListening;

  const onStop = () => {
    stopListening();
    reset();
  };

  return (
    <Dialog.Root open={isListening} modal={false}>
      <Dialog.Trigger asChild>
        <button
          className={button({ type: isListening ? "on" : "off" })}
          onClick={handleListening}
        >
          <BsFillMicFill />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal className="z-20">
        <Dialog.Content className={content()}>
          <Dialog.Title className={title()}>ご注文内容</Dialog.Title>

          <Dialog.Description className={description()}>
            {transcript}
          </Dialog.Description>
          <div className={footer()}>
            <Dialog.Close asChild>
              <button
                onClick={onStop}
                className="text-2xl text-red-700"
                aria-label="Close"
              >
                <BiStopCircle />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Dictaphone;
