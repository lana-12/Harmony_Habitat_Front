import { useEffect, useState } from "react";
import EmploymentService from "../../services/EmploymentApiService";
import TypeContratService from "../../services/TypeContratService";

function Employment(props: any) {
  const employmentService = EmploymentService.getInstance();
  const typeContratService = TypeContratService.getInstance();
  const [selectedCommune, setSelectedCommune] = useState<any>({});

  const [typesDatas, setTypesDatas] = useState<any>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    setSelectedCommune(props.selectedCommune);
    const fct = async () => {
      const fct2 = await employmentService.getAndSetTokenIfNeedNew();
      const data = await employmentService.getDatasByCodeCommune(
        props.selectedCommune.code_commune
      );
      if (data && typeof data === 'object' && data.hasOwnProperty('filtresPossibles')) {
        const statsArray = data.filtresPossibles;

        if (statsArray !== undefined && statsArray.length > 0) {
          const typesArray = statsArray[0];
          const copyTypeArray = await Promise.all(
            typesArray.agregation.map(async (t: any) => {
              const libelleObj = await getTypeLibelle(t.valeurPossible);
              const copy = {
                valeurPossible: t.valeurPossible,
                nbResultats: t.nbResultats,
                libelle: libelleObj[0].libelle,
              };
              return copy;
            })
          );
          copyTypeArray.sort((a, b) => b.nbResultats - a.nbResultats);
          setTypesDatas(copyTypeArray);
        } else {
          setTypesDatas([]);
        }
      }
      else {
        setTypesDatas([]);
      }
    };
    fct();
  }, [props.selectedCommune]);

  const getTypeLibelle = async (code: string): Promise<any> => {
    return await typeContratService.getByCode(code);
  };

  if (typesDatas.length > 0) {
    return (
      <div className="div-result">
        <div className="pop-commune-result">
          <h4 className="text-center mt-3">Emplois</h4>
          <h5 className="text-center">Par types de contrats</h5>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Type de contrat</th>
                <th>Nombre de résultats</th>
              </tr>
            </thead>
            <tbody>
              {typesDatas.map((t: any) => (
                <tr key={t.valeurPossible}>
                  <td>{t.libelle}</td>
                  <td>{t.nbResultats}</td>
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
        <h5 className="text-center">Pas de données pour cette commune.</h5>
      </div>
    );
  }
}

export default Employment;
