import { useEffect, useState } from "react";
import EcoleService from "../../services/EcoleService";

function Ecoles(props: any) {
  const [ecoles, setEcoles] = useState<any>([]);
  const ecoleService = EcoleService.getInstance();

  useEffect(() => {
    //Mettre à jour le composant
    setEcoles(props.ecoles);
    // console.log('Ecoles :', ecoles);
  }, [props.ecoles]);
  //console.log('ecoles :', ecoles);
  ecoles.sort((a: any, b: any) => a.categorie.categorie.localeCompare(b.categorie.categorie));

  if (ecoles.length > 0) {
    return (
      <div className="div-result ">
        <div className="pop-commune-result">
        <h4 className="text-center mt-3">Enseignement</h4>
        <h5 className="text-center">Ecoles</h5>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>N° UAI</th>
              </tr>
            </thead>
            <tbody>
              {ecoles.map((ecole: any) => (
                <tr key={ecole["@id"]}>
                  <td>{ecole.nom_ecole}</td>
                  <td>{ecole.categorie.categorie}</td>
                  <td>{ecole.numero_uai_ecole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="div-result">
          <h5 className="text-center">Pas de données enregistrées pour cette commune.</h5>
      </div>
    );
  }
}
export default Ecoles;
