import { useEffect, useState } from "react";
import ImmoPrixService from "../../services/ImmoPrixService";
import ImmoCategorieService from "../../services/ImmoCategorieService";

// TODO utiliser la props.immo_prix
function Immo(props: any) {
  const [prices, setPrices] = useState<any>([]);
  const [categoriesNames, setCategoriesNames] = useState<any>({});

  const priceService = ImmoPrixService.getInstance();
  const categoryService = ImmoCategorieService.getInstance();

  // TODO ajouter useEffect sur props.immo_prix qui set prices
  // TODO qui construit un tableau d'objets avec les categories en text

  // TODO puis supprimer ce useEffect
  useEffect(() => {
    /*
        const selectedIdCommune = props.selectedCommune.id_commune;

        // TODO utiliser la props.
        const fetchPricesAndCategories = async () => {
            const pricesByCommune = await priceService.getImmoPrixByCommuneId(selectedIdCommune);
            //setPrices(pricesByCommune);

            const categories = await categoryService.loadImmoCategory();


            const pricesByCommuneAug = pricesByCommune.map((p) => {
                const category = categories.find(c => c.id === p.id_categorie);
                return {
                    id: p.id,
                    prix_m2: p.prix_m2,
                    cat_name: category?.categorie
                }
            });
            setPrices(pricesByCommuneAug);
        }

        fetchPricesAndCategories();
        */
  }, [props.selectedCommune]);

  useEffect(() => {
    setPrices(props.prices);
  }, [props.prices, props.selectedCommune]);

  //console.log('prices :', prices);
  if (prices.length > 0) {
    return (
      <div className="div-result">
        <div className="pop-commune-result">
        <h4 className="text-center mt-3">Immobilier</h4>
        <h5 className="text-center">Prix pour la location</h5>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p: any) => (
              <tr key={p["@id"]}>
                <td>
                  <strong>{p.categorie.categorie}</strong>
                </td>
                <td>
                  {p.prix_m2} €/m<sup>2</sup>
                </td>
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

export default Immo;
