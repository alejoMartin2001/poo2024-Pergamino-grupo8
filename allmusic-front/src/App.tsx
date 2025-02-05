import { Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Preview } from "./pages/Preview";
import { Header } from "./shared/components/header/Header";

interface Props {
}

export const App = ({ }: Props) => {

  return (


    <>
      <Routes>
        <Route path="/" element={<Preview />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/nav" element={<Header/>}/>
      </Routes>
    </>
  );
};