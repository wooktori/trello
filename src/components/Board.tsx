import { Droppable } from "@hello-pangea/dnd";
import { todoListAtom } from "../atom";
import { useRecoilValue } from "recoil";
import Card from "./Card";

export default function Board() {
  const todoList = useRecoilValue(todoListAtom);
  return (
    <Droppable droppableId="1">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col items-center justify-center h-96 w-96 bg-slate-500"
        >
          {todoList.map((todo, index) => (
            <Card todo={todo} index={index} key={todo} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
