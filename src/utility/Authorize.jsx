import { Navigate } from "react-router-dom";

function Authorize({children}) {

  if (localStorage.getItem("fanta-draft")){
    return children;
  }

  return <Navigate to="/" />

  
}

export default Authorize