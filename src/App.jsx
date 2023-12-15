import Nav from "./component/Nav";
import UserCreate from "./component/UserCreate";
import UserUpdate from "./component/UserUpdate";
import Users from "./component/Users";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/update/:id" element={<UserUpdate />} />
      </Routes>
    </>
  );
}

export default App;
