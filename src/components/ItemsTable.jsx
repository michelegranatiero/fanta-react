import { useState,  } from "react";

import classes from "./ItemsTable.module.css";

function ItemsTable({ data, fields }) {
  const noCampUrl =
    "https://content.fantacalcio.it/web/campioncini/card2021/NO-CAMPIONCINO.png?v=35";

  const src = data.urlCampioncino;

  const [errorMap, setErrorMap] = useState(false);

  
  const handleImageError = (item) => {
    setErrorMap((prevErrorMap) => ({
      ...prevErrorMap,
      [item.id]: true,
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {fields.map((field) => (
              <td key={field}>
                {field === "urlCampioncino" ? (
                  <img
                    src={errorMap[item.id] ? noCampUrl : item.urlCampioncino}
                    alt="Campioncino"
                    onError={() => handleImageError(item)}
                    className={classes.campioncino}
                  />
                ) : (
                  item[field]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemsTable;
