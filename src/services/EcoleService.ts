import Config from "../configs/Config";
import IEcole from "../interfaces/IEcole";
// import PositionService from "./PositionService";

/**
 * Service d'accès aux données de la table 'ecole'
 * En pattern singleton
 */
export default class EcoleService {
    private _urlEcole: string = Config.SERVER_URL + "/ecole";

    private static _instance: EcoleService | null = null;

    private constructor() {}

    public static getInstance(): EcoleService {
        if (this._instance === null) {
            this._instance = new EcoleService();
        }
        return this._instance;
    } 

    /**
     * Fonction qui récupère et renvoie la liste des ecoles
     * @returns 
     */
    public async loadEcoles(): Promise<IEcole[]> {
        try {
            const response = await fetch(this._urlEcole, {
                headers: {
                  //'Cache-Control': 'no-cache',
                }
            })
            
            const ecoles = await response.json();
            // console.log('ecoles dansEcoleService :', ecoles);
            return ecoles;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async getEcoleByCommuneId(id_commune: number): Promise<IEcole[]> {
        try {
            const response = await fetch(`${this._urlEcole}/?id_commune=${id_commune}`, {
                headers: {
                    //'Cache-Control': 'no-cache',
                }
                })
                
            const ecole = await response.json();
            //console.log('ecole loadé :', ecole);
            return ecole;
        } catch (e) {
            console.error(e);
            return [];
        }

    }

}