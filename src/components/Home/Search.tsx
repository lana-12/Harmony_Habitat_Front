import { useRef, useState } from "react";
import CommuneService from '../../services/CommuneService';
import ICommune from "../../interfaces/ICommune";

function Search(props: any) {
  const [isResultsExists, setIsResultsExists] = useState<boolean>(false);
  const [results, setResults] = useState<ICommune[]>([]);

  const searchInput = useRef<HTMLInputElement>(null);
  const communeService = CommuneService.getInstance();

  const doSearch = async () => {
    let inputValue = searchInput.current?.value;
    //console.log(inputValue);
    if(inputValue !== "" && inputValue !== undefined) {  
      inputValue = inputValue.trim();
      const results = await communeService.searchByName(inputValue);
      if(results.length > 0) {
        setResults(results);
        setIsResultsExists(true);
      }
    }
    
  }

  // TODO modifier : récupérerer la commune et la passer en parametre de la callback
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value !== "nothing") {
      const selectedCommuneId = Number(event.target.value);
    const selectedCommune = results.find(c => c.id === selectedCommuneId);
    //console.log(selectedCommune);
    //props.setSelectComCB(commune);
    props.setSelectComCB(selectedCommune);
    }
    
  }


  results.sort((a: any, b: any) => a.nom_commune.localeCompare(b.nom_commune));
  return (
    <div className="mt-5 div-search">
      <h2 className="h2-search mb-3">Recherche</h2>
      <div className="d-flex gap-3 flex-wrap">
        <div className="form-group">
          <input
            type="text"
            id="search"
            name="search"
            className="form-control input-search"
            placeholder="Saisir le nom d'une commune"
            ref={searchInput}
          />
        </div>
        <div className="d-flex flex-column justify-content-end">
          <button type="button" 
          className="btn-search"
          onClick={doSearch}>
            Rechercher
          </button>
        </div>
      </div>
      {(isResultsExists ? 
      <select className="form-select mt-3" onChange={handleSelectChange}>
        <option value="nothing">Choisir une commune</option>
        {results && results.map((c) => 
        <option key={c.id} value={c.id}>{c.nom_commune} / {c.code_postal} / {c.nom_departement} / {c.nom_region}</option>
        )}
      </select> 
      : '')}
    </div>
  );
}
export default Search;
