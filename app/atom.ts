import { atom } from "jotai";

export const orderCountsAtom = atom(new Map<string, number>());
