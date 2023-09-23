import Home from "./pages/Home";
import Header from "./components/Header";
import NewDraft from "./pages/NewDraft";
import Draft from "./pages/Draft";

import {
  SettingsCtx,
  PlayersCtx,
  SelPlayerCtx,
  TeamsCtx,
} from "./utility/Context";

import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

/* const settings = JSON.parse(localStorage.getItem("settings"))
const players = JSON.parse(localStorage.getItem("players"))
const selplayer = JSON.parse(localStorage.getItem("selPlayer"))
const teams = JSON.parse(localStorage.getItem("players")) */
const settings = null;
const players = null;
const selplayer = null;
const teams = null;

function App() {
  return (
    <>
      <SettingsCtx.Provider value={useState(settings)}>
        <PlayersCtx.Provider value={useState(players)}>
          <SelPlayerCtx.Provider value={useState(selplayer)}>
            <TeamsCtx.Provider value={useState(teams)}>
              <Header />
              <main>
                <Routes>
                  <Route path="/new-draft" element={<NewDraft />}></Route>
                  <Route path="/draft" element={<Draft />}></Route>
                  <Route path="/*" element={<Home />}></Route>
                </Routes>
              </main>
            </TeamsCtx.Provider>
          </SelPlayerCtx.Provider>
        </PlayersCtx.Provider>
      </SettingsCtx.Provider>
    </>
  );
}

export default App;
