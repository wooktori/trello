import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSetRecoilState } from "recoil";
import { todoListAtom } from "./atom";
import Board from "./components/Board";

function App() {
  const setTodoList = useSetRecoilState(todoListAtom);
  const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination) return;
    setTodoList((prev) => {
      const newTodo = [...prev];
      newTodo.splice(source.index, 1);
      newTodo.splice(destination?.index, 0, draggableId);
      return newTodo;
    });
  };
  return (
    <div className="grid grid-cols-3 place-items-center items-center w-full h-screen bg-blue-400">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Board />
        <Board />
        <Board />
      </DragDropContext>
    </div>
  );
}

export default App;
