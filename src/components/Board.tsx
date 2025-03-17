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
          className="flex flex-col items-center justify-center h-72 w-[300px] min-w-[30px] bg-gray-300"
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
