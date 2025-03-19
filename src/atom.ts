import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoList {
  [key: string]: ITodo[];
}

const storedData = localStorage.getItem("todos");

export const todoListAtom = atom<ITodoList>({
  key: "todoList",
  default: storedData
    ? JSON.parse(storedData)
    : {
        Todo: [],
        Doing: [],
        Done: [],
      },
});
