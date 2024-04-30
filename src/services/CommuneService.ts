import { Bounds, LatLng, LatLngBounds } from "leaflet";
import Config from "../configs/Config";
import ICommune from "../interfaces/ICommune";
import ICommuneAug from "../interfaces/ICommuneAug";
import PositionService from "./PositionService";

/**
 * Service d'accès aux données de la table 'commune'
 * En pattern singleton
 */
export default class CommuneService {
  private _urlCommune: string = Config.SERVER_URL + "/commune";
  private _urlApi: string = "http://localhost:8000/api";
  private static _instance: CommuneService | null = null;

  private constructor() {}

  public static getInstance(): CommuneService {
    if (this._instance === null) {
      this._instance = new CommuneService();
    }
    return this._instance;
  }

  public async searchCommuneById(id: number): Promise<any> {
    try {
      const response = await fetch(this._urlApi + "/communes/" + id, {
        headers: {
          //'Cache-Control': 'no-cache',
        },
      });

      const commune = await response.json();
      //console.log('communes loadées :', communes);
      return commune;
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  // TODO remplacer par une requete quand le back sera ok
  public async searchByName(searchValue: string) {
    /*
    // recuperer les communes
    const communes = await this.loadCommunes();
    // filter sur contient en sous chaine
    searchValue = searchValue.toLowerCase().normalize("NFD");
    const filtered = communes.filter(
      (c) =>
        c.nom_commune.toLowerCase().normalize("NFD").indexOf(searchValue) !== -1
    );
    //console.log('filtered :', filtered);
    return filtered;
    // retourner resultat ou []
    */
    try {
      const url = `http://localhost:8000/communes/search?search=${searchValue}`;
      const response = await fetch(url, {
        headers: {
          //'Cache-Control': 'no-cache',
        },
      });

      const communes = await response.json();
      //console.log('communes loadées :', communes);
      return communes;
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  /**
   * Faire requete qui récupère les communes avec leur position_gps
   */
  public async loadCommunesWithPosition(
    southWest: LatLng,
    northEast: LatLng
  ): Promise<ICommuneAug[] | null> {
    try {
      const swLat = southWest.lat;
      const swLng = southWest.lng;
      const neLat = northEast.lat;
      const neLng = northEast.lng;
      // améliorer, utiliser la config pour 'http://localhost:8000/communes/map'
      const url = `http://localhost:8000/communes/map?sw=${swLat},${swLng}&ne=${neLat},${neLng}`;
      const response = await fetch(url, {
        headers: {
        },
      });

      const communes = await response.json();
      //console.log('communes loadées :', communes);
      return communes;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  /**
   * Fonction qui récupère et renvoie la liste des communes
   * @returns
   */
  /*
  public async loadCommunes(): Promise<ICommune[]> {
    try {
      const response = await fetch(this._urlCommune, {
        headers: {
          //'Cache-Control': 'no-cache',
        },
      });

      const communes = await response.json();
      //console.log('communes loadées :', communes);
      return communes;
    } catch (e) {
      console.error(e);
      return [];
    }
  }*/
}
