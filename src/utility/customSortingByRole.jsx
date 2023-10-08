const customSortingByRole = (a, b, mode) => {
  let role = mode === "classic" ? "ruoloClassic" : "ruoliMantra";

  if(mode === "mantra"){

    const rolesOrder = ["Por", "Dc", "Ds", "Dd", "E", "M", "C", "W", "T", "A", "Pc"];

    function mantraRoleOrderRecursive(rolesA, rolesB, roleRank = 1) {

      let roleA = rolesOrder.indexOf(rolesA[rolesA.length - roleRank]) /* a most higher role */
      let roleB = rolesOrder.indexOf(rolesB[rolesB.length - roleRank]) /* b most higher role */
    
      if (roleB > roleA) {
        return false
      }else if (roleB === roleA) {
        if (rolesA.length > roleRank){
          if (rolesB.length === roleRank){
            return false
          }else{ /* bRoles.length > roleRank */
            mantraRoleOrderRecursive(rolesA, rolesB, roleRank+=1)
          }
        }
      }
      return true
    }

    const aRoles = a[role].split(";");
    const bRoles = b[role].split(";");    

    return mantraRoleOrderRecursive(aRoles, bRoles, 1) ? 1 : -1; 

  }else{
    const rolesOrder = ["P", "D", "C", "A"];
    return rolesOrder.indexOf(a[role]) - rolesOrder.indexOf(b[role])
  }
}

export default customSortingByRole;
