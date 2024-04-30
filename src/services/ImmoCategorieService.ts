import Config from "../configs/Config";
import IImmoCategorie from "../interfaces/IImmoCategorie";


/**
 * Service d'accès aux données de la table 'immo_categorie'
 * En pattern singleton
 */

export default class ImmoCategorieService {
    private _urlImmoCat: string = Config.SERVER_URL + "/immo_categorie";

    private static _instance: ImmoCategorieService | null = null;

    private constructor() {}

    public static getInstance(): ImmoCategorieService {
        if (this._instance === null) {
            this._instance = new ImmoCategorieService();
        }
        return this._instance;
    } 

    /**
     * Fonction qui récupère et renvoie la liste des categories immo
     * @returns 
     */
    public async loadImmoCategory(): Promise<IImmoCategorie[]> {
        try {
            const response = await fetch(this._urlImmoCat, {
                headers: {
                  //'Cache-Control': 'no-cache',
                }
            })
            
            const cat_immo = await response.json();
            // console.log('cat_immo :', cat_immo);
            return cat_immo;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

public async getImmoCategoryByCommuneId(id_commune: number): Promise<IImmoCategorie[]> {
        try {
            const response = await fetch(`${this._urlImmoCat}/?id_commune=${id_commune}`, {
                headers: {
                    //'Cache-Control': 'no-cache',
                }
                })
                
            const cat_immo = await response.json();
            // console.log('cat_immo loadé :', cat_immo);
            return cat_immo;
        } catch (e) {
            console.error(e);
            return [];
        }

    }

}