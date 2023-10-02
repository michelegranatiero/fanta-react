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


  function validateForm(e) {
    e.preventDefault();
    
    if(formData.credits<1 || isNaN(formData.credits)){
      alert('il budget crediti non può essere inferiore a 1')
    }else if(formData.credits > 10000){
      alert('Il budget crediti non può essere superiore a 10000')
    }else if(formData.numTeams < 6 || formData.numTeams > 12  || isNaN(formData.numTeams)){
      alert('Il numero delle squadre deve essere compreso tra 6 e 12')
    }else if(formData.mode === "classic"){
      if(formData.p < 1 || formData.p > 10 || isNaN(formData.p)){
        alert("Il numero di portieri deve essere compreso tra 1 e 10")
      }else if(formData.d < 1 || formData.d > 20 || isNaN(formData.d)){
        alert("Il numero di difensori deve essere compreso tra 1 e 20")
      }else if(formData.c < 1 || formData.c > 20 || isNaN(formData.c)){
        alert("Il numero di centrocampisti deve essere compreso tra 1 e 20")
      }else if(formData.a < 1 || formData.a > 20 || isNaN(formData.a)){
        alert("Il numero di attaccanti deve essere compreso tra 1 e 20")
      }else{
          /* if all ok */
        submitForm(e)
      }
    } else {
      if(formData.por < 1 || formData.por > 10 || isNaN(formData.por)){
        alert("Il numero di portieri deve essere compreso tra 1 e 10")
      }else if(formData.gm < 1 || formData.gm > 60 || isNaN(formData.gm)){
        alert("Il numero di giocatori di movimento deve essere compreso tra 1 e 60")
      }else{
        /* if all ok */
        submitForm(e)
      }
    }
  }


  const submitForm = (e) => {
    /* e.preventDefault(); */
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
    <div className="form-wrapper">
      <div className="form-cont">
        <form id="settingsForm" onSubmit={validateForm} className="form">
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
                <input type="number" name="credits" id="credits" value={formData.credits} min={1} onChange={handleChange}/>
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
                  <div>P <input type="number" name="p" value={formData.p} min={1} onChange={handleChange} /></div>
                  <div>D <input type="number" name="d" value={formData.d} min={1} onChange={handleChange} /></div>
                  <div>C <input type="number" name="c" value={formData.c} min={1} onChange={handleChange} /></div>
                  <div>A <input type="number" name="a" value={formData.a} min={1} onChange={handleChange} /></div>
                </div>):
                /* mantra */
                (<div className="roles">
                  <div>Por <input type="number" name="por" value={formData.por} min={1} onChange={handleChange} /></div>
                  <div>GM <input type="number" name="gm" value={formData.gm} min={1} onChange={handleChange} /></div>
                </div>)
              }          
            </div>
            {/* num teams */}
            <div className="numTeams">
              <label htmlFor="numTeams">Numero squadre</label>
              <input type="number" name="numTeams" id="numTeams" value={formData.numTeams} min={1} onChange={handleChange}/>
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
    </div>
  );
};

export default NewDraft;
