import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function App() {
  const handleDragEnd = () => {};
  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-blue-400 min-h-[50vh]"
            >
              <Draggable draggableId="2" index={0}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    드래그해봐
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
