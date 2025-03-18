import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoList {
  [key: string]: ITodo[];
}

export const todoListAtom = atom<ITodoList>({
  key: "todoList",
  default: {
    Todo: [
      { id: 1, text: "hi" },
      { id: 2, text: "haa" },
    ],
    Doing: [
      { id: 3, text: "hdf" },
      { id: 4, text: "hsdf" },
    ],
    Done: [
      { id: 5, text: "sdfi" },
      { id: 6, text: "gsdi" },
    ],
  },
});
