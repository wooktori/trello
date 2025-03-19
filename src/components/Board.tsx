import { Droppable } from "@hello-pangea/dnd";
import { ITodo, todoListAtom } from "../atom";
import Card from "./Card";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

interface IProps {
  todoList: ITodo[];
  boardId: string;
}

interface IForm {
  todo: string;
}

export default function Board({ todoList, boardId }: IProps) {
  const setTodoList = useSetRecoilState(todoListAtom);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    const newTodo = { id: Date.now(), text: todo };
    setTodoList((prev) => {
      return { ...prev, [boardId]: [newTodo, ...prev[boardId]] };
    });
    setValue("todo", "");
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-extrabold text-2xl">{boardId}</div>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col items-center justify-center h-[400px] w-[250px] min-w-[30px] bg-gray-300 p-3 rounded-2xl"
          >
            <div className="flex flex-col flex-grow w-full items-center">
              {todoList.map((todo, index) => (
                <Card
                  todo={todo.text}
                  index={index}
                  key={todo.text}
                  boardId={boardId}
                />
              ))}
              {provided.placeholder}
            </div>
            <form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("todo", { required: true })}
                placeholder={`Add task on ${boardId}`}
                type="text"
                className="bg-white rounded-2xl p-1 pl-2 placeholder:text-sm text-gray-500"
              />
            </form>
          </div>
        )}
      </Droppable>
    </div>
  );
}
