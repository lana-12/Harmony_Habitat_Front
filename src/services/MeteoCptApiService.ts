import Config from "../configs/Config";
/** *
 * Altitude
 */

export default class MeteoCptApiService {
  private static _instance: MeteoCptApiService | null = null;

  private constructor() {}

  public static getInstance(): MeteoCptApiService {
    if (this._instance === null) {
      this._instance = new MeteoCptApiService();
    }
    return this._instance;
  }

  public async loadEphemerid(code_commune: string) {
    const url = `${Config.METEO_CPT_URL}/api/ephemeride/1?token=${Config.METEO_CPT_TOKEN}&insee=${code_commune}`;

    return fetch(url, {
      //headers: headers,
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('data :', data);
        return data;
      })
      .catch((error) => {
        console.error("error :", error);
        return {};
      });
  }
}
