import Config from "../configs/Config";
import ICategorieCrime from "../interfaces/ICategorieCrime";

/**
 * Service d'accès aux données de la table 'CategorieCrime'
 * En pattern singleton
 */

export default class CategorieCrimeService {
    private _urlCategorieCrime: string = Config.SERVER_URL + "/crime_categorie";

    private static _instance: CategorieCrimeService | null = null;

    private constructor() {}

    public static getInstance(): CategorieCrimeService {
        if (this._instance === null) {
            this._instance = new CategorieCrimeService();
        }
        return this._instance;
    }


        /**
     * Fonction qui récupère et renvoie la liste des CategorieCrime
     * @returns 
     */
    public async loadCategorieCrime(): Promise<ICategorieCrime[]> {
        try {
            const response = await fetch(this._urlCategorieCrime, {
            })
            
            const categorieCrime = await response.json();
            console.log('cats loadé :', categorieCrime);
            return categorieCrime;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async getCategorieById(id_categorie: number): Promise<ICategorieCrime[]> {
        try {
            const response = await fetch(`${this._urlCategorieCrime}/?id_categorie=${id_categorie}`, {
            })
            const categorie = await response.json();
            // console.log('Cat ds loadé ds getService ', categorie);
            return categorie;
        } catch (e) {
            console.error(e);
            return [];
        }
    }
    
}