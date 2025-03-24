import React from "react";
import UsersTable from './pages/UserTable';
import PostAPI from  './pages/PostAPI'
import TodoList from "./pages/TodoList";

const App = () => {
  return (
    <div>
      <h1 className="text-center mt-4">User Data Display</h1>
      <UsersTable />
      <h1 className=" text-center mt-4">Todo List Display</h1>
       <TodoList />
       <h1 className=" text-center mt-4">Post API Display</h1>
       <PostAPI />
    </div>
    
    
  
  );
};

export default App;
