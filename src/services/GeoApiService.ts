import Config from "../configs/Config";

/**
 * Service d'accès aux données de la table 'commune'
 * En pattern singleton
 * Récupère la démographie
 */
export default class GeoApiService {
  private static _instance: GeoApiService | null = null;

  private constructor() {}

  public static getInstance(): GeoApiService {
    if (this._instance === null) {
      this._instance = new GeoApiService();
    }
    return this._instance;
  }

  public async getGeoDatas(code_commune: string): Promise<any> {
    const datas = await fetch(
      `${Config.GEO_API_URL}/communes/${code_commune}`,
      {
        method: "GET",
      }
    );
    //console.log('datas : ', datas);
    return datas.json();
  }
}
