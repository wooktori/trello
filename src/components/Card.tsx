import { Draggable } from "@hello-pangea/dnd";
import React from "react";

interface IProps {
  todo: string;
  index: number;
}

function Card({ todo, index }: IProps) {
  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="w-1/2 bg-orange-300 mb-2 rounded-lg text-center"
          ref={provided.innerRef}
        >
          {todo}
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
