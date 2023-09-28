import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../utility/useLocalStorage';

import { GiTwoCoins } from "react-icons/gi";

const NewDraft = () => {

  const navigate = useNavigate();

  const [settings, setSettings] = useLocalStorage("settings", null);

  const [teams, setTeams] = useLocalStorage("teams", null);

  const [players, setPlayers] = useLocalStorage("players", null);

  const [selPlayer, setSelPlayer] = useLocalStorage("selPlayer", null);



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
    const name = e.target.name;
    const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    setFormData((prevFormData) => ({...prevFormData, [name]: value }));
  }

  const submitForm = (e) => {
    e.preventDefault();
    const toDelete = formData.mode === "classic"? ['por', 'gm'] : ["p","d","c","a"];
    toDelete.forEach(e => delete formData[e]);

    setSettings(formData);/* ------------------------ */

    /* set Teams */
    let initTeams = [];
    const numPlayers = formData.mode === "classic" ? (formData.p + formData.d + formData.c + formData.a) : formData.por + formData.gm;
    for (let i=1; i < formData.numTeams + 1; i++) {
      initTeams.push({
        "id": i,
        "numPlayers" : numPlayers,
        "startingCredits": formData.credits,
        "name": "Team " + i,
        "players":[],
        "spentCredits": 0,
        "resCredits": formData.credits, 
        "maxOffer": (formData.credits - numPlayers + 1),
      })
    }



    setTeams(initTeams);/* ----------------------- */
    setSelPlayer(null);
    setPlayers(null); /* -----------------VALUTA SE LASCIARE LA POSSIBILITA DI USARE QUELLO GIA MEMORIZZATO ---------*/


    navigate("/draft", {replace: true})
  }

  return (
    <>
      <div className="form-cont">
        <form id="settingsForm" onSubmit={submitForm} className="form">
          <div className="form-inputs">
            {/* mode */}
            <div className="mode-new-draft">
              <div>Modalità</div>
              <div className="radio-cont">
                <input type="radio" name="mode" value="classic" id="classic" onChange={handleChange} checked={formData.mode === "classic"}/>
                <label htmlFor="classic">Classic</label>
                <input type="radio" name="mode" value="mantra" id="mantra" onChange={handleChange} checked={formData.mode === "mantra"}/>
                <label htmlFor="mantra">Mantra</label>
              </div>
            </div>
            {/* credits */}
            <div className="credits-new-draft" >
              <label htmlFor="credits">Crediti per squadra</label>
              <div className="input-div">   
                <input type="number" name="credits" id="credits" value={formData.credits} min={0} onChange={handleChange}/>
                <div className="credits-icon-div">
                  <GiTwoCoins className="credits-icon" size={19}/>
                </div>
              </div>
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
          <div className="btn-cont-draft">
            <button type="submit" className="btn btn-new-draft" >Crea asta</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDraft;
