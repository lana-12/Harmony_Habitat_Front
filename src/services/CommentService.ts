import Config from "../configs/Config";
import IComment from "../interfaces/IComment";

export default class CommentService {
  private _urlComment: string = Config.SERVER_URL + "/commentaire";
  private _urlApi: String = "http://localhost:8000";

  private static _instance: CommentService | null = null;

  private constructor() {}

  public static getInstance(): CommentService {
    if (this._instance === null) {
      this._instance = new CommentService();
    }
    return this._instance;
  }

  public async loadComments(): Promise<IComment[]> {
    try {
      const response = await fetch(this._urlComment, {
        headers: {
          //'Cache-Control': 'no-cache',
        },
      });

      const comments = await response.json();
      //console.log('comments loadés :', comments);
      return comments;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async getById(id_comment: number): Promise<IComment[]> {
    try {
      const response = await fetch(
        `${this._urlComment}/?id_comment=${id_comment}`,
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

  public async getByCommuneId(id_commune: number): Promise<IComment[]> {
    try {
      const response = await fetch(
        `${this._urlApi}/comments/commune?commune=${id_commune}`,
        {
          headers: {
            //'Cache-Control': 'no-cache',
          },
        }
      );

      const comments = await response.json();
      console.log("comments loadé :", comments);
      return comments;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async getByCommuneAndUtilisateurId(
    id_commune: number,
    id_utilisateur: number
  ) {
    try {
      const response = await fetch(
        `${this._urlComment}/?id_commune=${id_commune}&id_utilisateur=${id_utilisateur}`,
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

  public async getUserInfos(id_user: number): Promise<any> {
    try {
      const response = await fetch(
        `${this._urlApi}/user/user?user=${id_user}`,
        {
          headers: {
            //'Cache-Control': 'no-cache',
          },
        }
      );

      const user = await response.json();
      console.log("user loadé :", user);
      return user;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  //  /manage/comment/create

  public async addComment(comment: any) {
    try {
      const response = await fetch(`${this._urlApi}/manage/comment/create`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: 'no-cors',
        credentials: 'include',
        body: JSON.stringify(comment),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log('Comment create ' + data);
        return data;
      } else {
        console.error(`Erreur : ${response.status}`);
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
