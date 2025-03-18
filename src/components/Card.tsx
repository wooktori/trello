import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { todoListAtom } from "../atom";
import { useSetRecoilState } from "recoil";

interface IProps {
  todo: string;
  index: number;
  boardId: string;
}

function Card({ todo, index, boardId }: IProps) {
  const setTodoList = useSetRecoilState(todoListAtom);
  const handleDelete = (target: string, boardId: string) => {
    setTodoList((prev) => ({
      ...prev,
      [boardId]: prev[boardId].filter((todo) => todo.text !== target),
    }));
  };
  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="bg-white mb-2 rounded-lg w-full flex items-center justify-center"
          ref={provided.innerRef}
        >
          <span className="flex-grow text-center">{todo}</span>
          <button
            className="ml-2 hover:cursor-pointer hover:fill-red-600"
            onClick={() => handleDelete(todo, boardId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
