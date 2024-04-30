import Config from "../configs/Config";
import IPositionGps from "../interfaces/IPositionGps";

/**
 * Service d'accès aux données de la table 'commune'
 * En pattern singleton
 */
export default class PositionService {
    private _urlPosition: string = Config.SERVER_URL + "/position_gps";

    private static _instance: PositionService | null = null;

    private constructor() {}

    public static getInstance(): PositionService {
        if (this._instance === null) {
          this._instance = new PositionService();
        }
        return this._instance;
      } 

      /**
     * Fonction qui récupère et renvoie la liste des positions
     * @returns 
     */
    public async loadPositions(): Promise<IPositionGps[] | null> {
        try {
            const response = await fetch(this._urlPosition, {
                headers: {
                  //'Cache-Control': 'no-cache',
                }
              })
              
            const positions = await response.json();
            //console.log('positions loadées :', positions);
            return positions;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getById(id_position: number): Promise<IPositionGps[]> {
      try {
        const response = await fetch(`${this._urlPosition}/?id_position=${id_position}`, {
            headers: {
              //'Cache-Control': 'no-cache',
            }
          })
          
        const position = await response.json();
        //console.log('position loadée :', position);
        return position;
    } catch (e) {
        console.error(e);
        return [];
    }
    }
}