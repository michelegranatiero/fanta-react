import { useState } from "react";

import ItemsTable from "./ItemsTable";


const DraftsList = (props) => {
  /* const [drafts, setDrafts] = useState([]); */

  const [jsonData, setJsonData] = useState(null);

  const custHeaders =
    "id,giocatore,nomecognome,ruoloClassic,ruoliMantra,quotClass,quotClass2,quotMan,quotMan2,squadra,fvmClass,fvmMan,piede,nazione,nascita,urlCampioncino,boh,mediavoto,fantamedia";

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
    setJsonData(parsedData);
  };

  return (
    <>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={handleFileChange}
        className="upload-file"
      />

      <div className="draftslist-cont">
        {jsonData ? (
          /* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */
          <ItemsTable data={jsonData} fields={fieldsToDisplay}></ItemsTable>
        ) : (
          <p>Please select a CSV file.</p>
        )}
      </div>
    </>
  );
};

export default DraftsList;
