import Config from "../configs/Config";
import IUtilisateur from "../interfaces/IUtilisateur";

export default class UtilisateurService {
  private _urlUtilisateur: string = Config.SERVER_URL + "/utilisateur";
  private _urlUserApi: string = "http://localhost:8000/api/users";
  private _urlUser: string = "https://127.0.0.1:8000/access/user";

  private static _instance: UtilisateurService | null = null;

  private constructor() {}

  public static getInstance(): UtilisateurService {
    if (this._instance === null) {
      this._instance = new UtilisateurService();
    }
    return this._instance;
  }

  public getUrlUserApi(): string {
      return this._urlUserApi;
    }

  public getUrlUser(): string {
      return this._urlUser;
    }

  public async loadUtilisateurs(): Promise<IUtilisateur[]> {
    try {
      const response = await fetch(this._urlUtilisateur, {
        headers: {
          //'Cache-Control': 'no-cache',
        },
      });

      const users = await response.json();
      //console.log('users loadés :', users);
      return users;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async getById(id_utilisateur: number): Promise<IUtilisateur[]> {
    try {
      const response = await fetch(
        `${this._urlUtilisateur}/?id_utilisateur=${id_utilisateur}`,
        {
          headers: {
            //'Cache-Control': 'no-cache',
          },
        }
      );

      const comment = await response.json();
      //console.log('comment loadé :', comment);
      return comment;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

public async createdUtilisateur(utilisateur: any) {
    try {
      const headers = {
      
        "Content-type": "application/json"
      };
  
      const response = await fetch(this._urlUserApi, {
        method: "POST",
        mode: 'no-cors',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(utilisateur)
      });
  
      console.log('userCreated loadé :', utilisateur);
  
      if (response.ok) {
        const data = await response.json();
        console.log("User Created :", data);
        return data;
      } else {
        console.error(`Error : ${response.status}`);
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }




  public async update(
    id_utilisateur: number,
    utilisateurData: Partial<IUtilisateur>
  ): Promise<IUtilisateur | null> {
    try {
      const response = await fetch(
        `${this._urlUtilisateur}/${id_utilisateur}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // 'Cache-Control': 'no-cache',
          },
          body: JSON.stringify(utilisateurData),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP, status = ${response.status}`);
      }

      const updatedUser = await response.json();
      // console.log('Utilisateur mis à jour :', updatedUser);
      return updatedUser;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
