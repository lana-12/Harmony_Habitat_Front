import Config from "../configs/Config";
import IFavori from "../interfaces/IFavori";


export default class FavoriService {
    private _urlFavori: string = Config.SERVER_URL + "/favori";

    private static _instance: FavoriService | null = null;

    private constructor() {}

    public static getInstance(): FavoriService {
        if (this._instance === null) {
          this._instance = new FavoriService();
        }
        return this._instance;
      }

      public async loadFavoris(): Promise<IFavori[]> {
        try {
            const response = await fetch(this._urlFavori, {
                headers: {
                  //'Cache-Control': 'no-cache',
                }
              })
              
            const comments = await response.json();
            //console.log('comments loadés :', comments);
            return comments;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

public async getByUtilisateurId(id_commune: number, id_utilisateur: number): Promise<IFavori[]> {
        try {
          const response = await fetch(`${this._urlFavori}/?id_commune=${id_commune}&id_utilisateur=${id_utilisateur}`, {
              headers: {
                //'Cache-Control': 'no-cache',
              }
            })
            
          const favoris = await response.json();
          //console.log('comment loadé :', comment);
          return favoris;
      } catch (e) {
          console.error(e);
          return [];
      }

    }
/*
    public async addFavori(favori: IFavori) {
        try {
          await fetch(this._urlFavori, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(favori),
            method: "POST"
          }).then(function (res) {
              console.log(res);
              const data = res.json();
              return data;
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      }*/

      public async addFavori(favori: IFavori) {
        try {
          const response = await fetch(this._urlFavori, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(favori),
            method: "POST"
          });
      
          if (response.status === 201) {
            // La requête a réussi, vous pouvez maintenant traiter la réponse
            const data = await response.json();
            console.log(data);
            return data;
          } else {
            // Quelque chose s'est mal passé, vous pouvez gérer les autres statuts ici
            console.error(`Erreur : ${response.status}`);
            return null;
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      }
}

/*
.then(function (res) {
              return res.json();
          })
          */