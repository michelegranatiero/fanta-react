import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import NewDraft from "./pages/NewDraft";
import Draft from "./pages/Draft";

import { Navigate } from "react-router-dom";
import Authorize from "./utility/Authorize";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new-draft" element={<NewDraft />}></Route>
          <Route
            path="/draft"
            element={
              <Authorize>
                <Draft />
              </Authorize>
            }
          ></Route>
          <Route path="*" element={<div>{<Navigate to="/" />}</div>}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
