import { Draggable } from "@hello-pangea/dnd";

interface IProps {
  todo: string;
  index: number;
}

export default function Card({ todo, index }: IProps) {
  console.log(todo);
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
