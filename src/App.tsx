import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRecoilState } from "recoil";
import { todoListAtom } from "./atom";
import Board from "./components/Board";
import { useEffect } from "react";
import AddBoard from "./components/AddBoard";

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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-blue-400 flex flex-col items-center h-screen">
      <AddBoard />
      <div className="flex flex-wrap items-center justify-center space-x-4 p-4 w-full h-full overflow-x-auto ">
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.keys(todoList).map((title) => (
            <Board key={title} boardTodo={todoList[title]} boardId={title} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
