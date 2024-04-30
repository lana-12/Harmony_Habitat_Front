import Config from "../configs/Config";
import ICrime from "../interfaces/ICrime";


/**
 * Service d'accès aux données de la table 'crime'
 * En pattern singleton
 */

export default class CrimeService {
    private _urlCrime: string = Config.SERVER_URL + "/crime";

    private static _instance: CrimeService | null = null;

    private constructor() {}

    public static getInstance(): CrimeService {
        if (this._instance === null) {
            this._instance = new CrimeService();
        }
        return this._instance;
    } 

    /**
     * Fonction qui récupère et renvoie la liste des Crimes
     * @returns 
     */
    public async loadCrimes(): Promise<ICrime[]> {
        try {
            const response = await fetch(this._urlCrime, {
                headers: {
                  //'Cache-Control': 'no-cache',
                }
            })
            
            const crimes = await response.json();
            // console.log('crimes dans Crimeservice :', crimes);
            return crimes;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

public async getCrimesByCommuneId(id_commune: number): Promise<ICrime[]> {
        try {
            const response = await fetch(`${this._urlCrime}/?id_commune=${id_commune}`, {
                headers: {
                    //'Cache-Control': 'no-cache',
                }
                })
                
            const crime = await response.json();
            // console.log('crime loadé :', crime);
            return crime;
        } catch (e) {
            console.error(e);
            return [];
        }

    }

}