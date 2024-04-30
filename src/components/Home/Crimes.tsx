import { useEffect, useState } from "react";
import CrimeService from './../../services/CrimeService';
import CategorieCrimeService from "../../services/CrimeCategorieService";

// TODO utiliser la props.crimes
function Crimes(props: any) {
    const [crimes, setCrimes] = useState<any>([]);
    //const [categoriesNames, setCategoriesNames] = useState<any>({});

    //const crimeService = CrimeService.getInstance();
    //const catCrimesService = CategorieCrimeService.getInstance();
    /*
    useEffect(() => {
        const selectedIdCommune = props.selectedCommune.id_commune;

        const fetchCategoriesNames = async () => {
            // TODO utiliser la props.crimes
            const crimesByCommune = await crimeService.getCrimesByCommuneId(selectedIdCommune);
            crimesByCommune.sort((a, b) => b.nb_crime - a.nb_crime);
            setCrimes(crimesByCommune);

            const names: { [key: number]: string } = {};

            const fetchCategoryName = async (crime: any) => {
                const category = await catCrimesService.getCategorieById(crime.id_categorie);
                //si nameCat existe
                const categoryName = category[0]?.categorie;
                if (categoryName) {
                    names[crime.id_categorie] = categoryName;
                }
            };

            const promises = crimesByCommune.map(fetchCategoryName);
            await Promise.all(promises);

            setCategoriesNames(names);
        };

        fetchCategoriesNames();
    }, [props.selectedCommune]);
    */
    useEffect(() => {
        setCrimes(props.crimes);
    }, [props.crimes, props.selectedCommune]);

    // TODO ajouter un useEffect sur la props.crimes qui set crimes
    // TODO en ajoutant si besoin en text les catégories aux objet crime

    // Regrouper les crimes par année
    const crimesByYear: { [key: string]: any[] } = {};
    crimes.forEach((crime: any) => {
        if (!crimesByYear[crime.annee_crime]) {
            crimesByYear[crime.annee_crime] = [];
        }
        crimesByYear[crime.annee_crime].push(crime);
    });

    // trier par nb_crime
    for (let year in crimesByYear) {
        crimesByYear[year].sort((a: any, b: any) => a.nb_crime - b.nb_crime);
    }

    // Trier les années Desc
    const sortedYears = Object.keys(crimesByYear).sort((a, b) => parseInt(b) - parseInt(a));

    
    
    
    if (crimes.length > 0) {
        return (
            <div className="div-result">
                <div className="pop-commune-result">
                <h4 className="text-center mt-3">Sécurité</h4>
                    {sortedYears.map((year: string) => (
                        <div key={year}>
                        <h5 className="text-center">Année {year}</h5>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Catégorie</th>
                                    <th>Total</th>
                                    <th>Taux pour 1000</th>
                                </tr>
                            </thead>
                            <tbody>
                                {crimesByYear[year].map((crime: any) => (
                                    <tr key={crime['@id']}>
                                        <td>{crime.categorie.categorie}</td>
                                        <td>{crime.nb_crime}</td>
                                        <td>{crime.taux_pour_mille}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    ))}
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

export default Crimes;
