import { useState, useContext} from "react";
import { SettingsCtx, TeamsCtx } from "../utility/Context";

import { useNavigate } from 'react-router-dom';

const NewDraft = () => {

  const navigate = useNavigate();

  const [settings, setSettings] = useContext(SettingsCtx);

  const [teams, setTeams] = useContext(TeamsCtx)

  const [formData, setFormData] = useState({
    mode: "classic",
    credits: 500,
    numTeams: 8,
    draftType: "chiamata",
    /* classic */
    p: 3,
    d: 8,
    c: 8,
    a: 6,
    /* mantra */
    por: 3,
    gm: 25,
  });

  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value }));
  }

  const submitForm = (e) => {
    e.preventDefault();
    const toDelete = formData.mode === "classic"? ['por', 'gm'] : ["p","d","c","a"];
    toDelete.forEach(e => delete formData[e]);

    /* setSettings((prev) => ({...prev, ["settings"]: formData})) */
    setSettings(formData);

    /* set Teams */
    let initTeams = [];
    const numPlayers = formData.mode === "classic" ? (formData.p + formData.d + formData.c + formData.a) : formData.por + formData.gm;
    for (let i=1; i < formData.numTeams + 1; i++) {
      initTeams.push({"id": i, "numPlayers" : numPlayers, "startingCredits": formData.credits, "name": "Team " + i, "players":[]})
    }
    setTeams(initTeams);

    localStorage.setItem('settings', JSON.stringify(formData));
    localStorage.setItem('players', null); /* reset players */
    localStorage.setItem('selPlayer', null); /* reset players */
    localStorage.setItem('teams', null); /* reset players */
    navigate("/draft", {replace: true})
  }

  return (
    <>
      <div className="form-cont">
        <form id="settingsForm" onSubmit={submitForm} className="form">
          <div className="form-inputs">
            {/* mode */}
            <div className="mode">
              <div>Modalità</div>
              <div>
                <input type="radio" name="mode" value="classic" id="classic" onChange={handleChange} checked={formData.mode === "classic"}/>
                <label htmlFor="classic">Classic</label>
                <input type="radio" name="mode" value="mantra" id="mantra" onChange={handleChange} checked={formData.mode === "mantra"}/>
                <label htmlFor="mantra">Mantra</label>
              </div>
            </div>
            {/* credits */}
            <div className="credits" >
              <label htmlFor="credits">Crediti per squadra</label>
              <input type="number" name="credits" id="credits" value={formData.credits} min={0} onChange={handleChange}/>
            </div>
            {/* players number */}
            <div className="players-num">
              <div>Numero di giocatori in rosa</div>
              {formData.mode === "classic" ? (
                /* classic */
                <div className="roles">
                  <div>P <input type="number" name="p" value={formData.p} onChange={handleChange} /></div>
                  <div>D <input type="number" name="d" value={formData.d} onChange={handleChange} /></div>
                  <div>C <input type="number" name="c" value={formData.c} onChange={handleChange} /></div>
                  <div>A <input type="number" name="a" value={formData.a} onChange={handleChange} /></div>
                </div>):
                /* mantra */
                (<div className="roles">
                  <div>Por <input type="number" name="por" value={formData.por} onChange={handleChange} /></div>
                  <div>GM <input type="number" name="gm" value={formData.gm} onChange={handleChange} /></div>
                </div>)
              }          
            </div>
            {/* num teams */}
            <div className="numTeams">
              <label htmlFor="numTeams">Numero squadre</label>
              <input type="number" name="numTeams" id="numTeams" value={formData.numTeams} min={6} max={12} onChange={handleChange}/>
            </div>
            {/* draft type */}
            <div className="draftType">
              <label htmlFor="draftType">Tipo asta</label>
              <select name="draftType" id="draftType" defaultValue={formData.draftType} onChange={handleChange}>
                <option value="chiamata" >A chiamata</option>
                <option value="random" >Random</option>
              </select>
            </div>
          </div>
          {/* submit button */}
          <div className="btn-cont">
            <button type="submit" className="submit-btn" >Crea asta</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDraft;
