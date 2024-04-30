import Config from "../configs/Config";
import IImmoPrix from "../interfaces/IImmoPrix";


/**
 * Service d'accès aux données de la table 'immo_prix'
 * En pattern singleton
 */

export default class ImmoPrixService {
    private _urlImmo: string = Config.SERVER_URL + "/immo_prix";

    private static _instance: ImmoPrixService | null = null;

    private constructor() {}

    public static getInstance(): ImmoPrixService {
        if (this._instance === null) {
            this._instance = new ImmoPrixService();
        }
        return this._instance;
    } 

    /**
     * Fonction qui récupère et renvoie la liste des immmo_prix
     * @returns 
     */
    public async loadImmoPrix(): Promise<IImmoPrix[]> {
        try {
            const response = await fetch(this._urlImmo, {
                headers: {
                  //'Cache-Control': 'no-cache',
                }
            })
            
            const prix_immo = await response.json();
            // console.log('prix_immo :', prix_immo);
            return prix_immo;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

public async getImmoPrixByCommuneId(id_commune: number): Promise<IImmoPrix[]> {
        try {
            const response = await fetch(`${this._urlImmo}/?id_commune=${id_commune}`, {
                headers: {
                    //'Cache-Control': 'no-cache',
                }
                })
                
            const prix_immo = await response.json();
            // console.log('prix_immo loadé :', prix_immo);
            return prix_immo;
        } catch (e) {
            console.error(e);
            return [];
        }

    }

}