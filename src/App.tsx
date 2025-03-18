import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import { todoListAtom } from "./atom";
import Board from "./components/Board";

function App() {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodoList((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      setTodoList((prev) => {
        const sourceBoard = [...prev[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...prev[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <div className="grid grid-cols-3 place-items-center items-center w-full h-screen bg-blue-400">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.keys(todoList).map((title) => (
          <Board key={title} todoList={todoList[title]} boardId={title} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
