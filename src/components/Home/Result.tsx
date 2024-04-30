import { useEffect, useState } from "react";

import Employment from "./Employment";
import Ecoles from "./Ecoles";
import Crimes from "./Crimes";
import Immo from "./Immo";


function Result(props: any) {
  const [selectedCommune, setSelectedCommune] = useState<any>({});
  const [dataEcole, setDataEcole] = useState<any>({});
  //const [dataCrime, setDataCrime] = useState<any>({});

  useEffect(() => {
    setSelectedCommune(props.selectedCommune);
    // console.log('Result : commune choisie :', selectedCommune);

  }, [props.selectedCommune]);

  useEffect(() => {
    setDataEcole(props.ecoles)
    // console.log('Result', dataEcole);

  }, [props.ecoles]);

  /*
  useEffect(() => {
    setDataCrime(props.crimes)
          // console.log('Result', dataCrime);

  }, [props.crimes]);
*/


  // TODO passer les props crimes et immo_prix aux sous composant
  if (Object.keys(props.selectedCommune).length > 0) {

    if (props.thematic === "Aucune") {
      return (
        <div className="div-result">
          <p className="name-commune-result">{selectedCommune.nom_commune}<span className="cp-commune-result">{selectedCommune.code_postal}</span></p>
          <p className="commune-result">Département : {selectedCommune.nom_departement}</p>
          <p className="commune-result">Région : {selectedCommune.nom_region}</p>
          <p className="commune-result">Population : {selectedCommune.population} hab.</p>
          <p className="commune-result">Altitude : {selectedCommune.altitude} m.</p>
        </div>
      );

    } else if(props.thematic === "Emploi") {
      return (
        <>
        <h2 className="mt-5">{selectedCommune.nom_commune}</h2>
        <Employment selectedCommune={props.selectedCommune} />
        </>
      );
    }
    
    
    else if(props.thematic === "Enseignement"){

      return (
        <>
          <h2 className="mt-5">{selectedCommune.nom_commune}</h2>
          <Ecoles
            ecoles={props.ecoles}

          />
        </>
      );
    } 

    else if(props.thematic === "Sécurité"){
      return (
        <>
          <h2 className="mt-5">{selectedCommune.nom_commune}</h2>
          <Crimes
            selectedCommune={selectedCommune}
            crimes={props.crimes}
          />
        </>
      );
    } 
    //Immobilier
    else if(props.thematic === "Immobilier"){
      return (
        <>
          <h2 className="mt-5">{selectedCommune.nom_commune}</h2>
          <Immo
            selectedCommune={selectedCommune}
            prices={props.immoPrices}
          />
        </>
      );
    } 
    else {
      return (
      <div className="div-result">
      <p className="my-4">Pas implémenté : {props.thematic}</p>
      </div>);

    }
  } else {
    return (
      <div className="div-result">
    <p className="my-4 text-center">Choisir une commune</p>
    </div>
    );
  }
}
export default Result;
