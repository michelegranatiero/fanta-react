import { useState } from "react";

function PlayersImport({updatePlayers, children}) {

  /* const [jsonData, setJsonData] = useState(null); */


  const custHeaders =
    "id,giocatore,nomecognome,ruoloClassic,ruoliMantra,quotClass,quotClass2,quotMan,quotMan2,squadra,fvmClass,fvmMan,piede,nazione,nascita,urlCampioncino,ceduto,mediavoto,fantamedia";

  const fieldsToDisplay =
    "id,giocatore,ruoloClassic,quotClass,squadra,urlCampioncino".split(",");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;
        parseCSV(csvText);
      };

      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    const headers = custHeaders.split(",");
    const parsedData = [];

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      if (currentLine.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(obj);
      }
    }
    /* setJsonData(parsedData); */
    /* localStorage.setItem('players', JSON.stringify(parsedData)); */
    updatePlayers(parsedData);
  };

  return (
    <div className="upload-file">
      <input
        type="file"
        id="file"
        name="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <label htmlFor="file" className="btn">{children}</label>
    </div>
    
  )
}

export default PlayersImport