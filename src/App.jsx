import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import NewDraft from "./pages/NewDraft";
import Draft from "./pages/Draft";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/new-draft" element={<NewDraft />}></Route>
          <Route path="/draft" element={<Draft />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
