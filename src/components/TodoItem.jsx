import React from "react";
import { FaRegWindowClose } from "react-icons/fa";

const TodoItem = ({ text,isComplete,id,toggleTask,deleteTodo }) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <label className = {`hover:bg-slate-200 flex-1 p-2 rounded-md cursor-pointer select-none ${isComplete?"line-through":""}`}onClick={()=>toggleTask(id )}>
        {text}
      </label>
      <div>
        <FaRegWindowClose className="text-red-500 size-26px ml-2 cursor-pointer hover:bg-red-300" onClick={()=>deleteTodo(id)} />
      </div>
    </div>
  );
};

export default TodoItem;
