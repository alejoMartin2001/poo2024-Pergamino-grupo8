import { Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Preview } from "./pages/Preview";

interface Props {
}

export const App = ({ }: Props) => {

  return (


    <>
      <Routes>

        <Route path="/" element={<Preview />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

      </Routes>
    </>
  );
};