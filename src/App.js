import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import NewsDetail from "./Components/NewsDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="details/:id" element={<NewsDetail />}></Route>
    </Routes>
  );
}
