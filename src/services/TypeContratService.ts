import Config from "../configs/Config";

export default class TypeContratService {
    private _urlTypeContrat: string = Config.SERVER_URL + "/type_contrat";

    private static _instance: TypeContratService | null = null;

    private constructor() {}

    public static getInstance(): TypeContratService {
        if (this._instance === null) {
          this._instance = new TypeContratService();
        }
        return this._instance;
      }


      public async getByCode(code: string) {
        try {
            const response = await fetch(`${this._urlTypeContrat}/?code=${code}`, {
                headers: {
                  //'Cache-Control': 'no-cache',
                }
              })
              
            const typeContrat = await response.json();
            //console.log('position loadée :', position);
            return typeContrat;
        } catch (e) {
            console.error(e);
            return [];
        }
      }

    }