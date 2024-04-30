import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IUtilisateur from "../interfaces/IUtilisateur";
import UtilisateurService from "./UtilisateurService";
import SecurityObservable from "../observables/securityObservable";
import { setAuthInfo, getAuthInfo } from './AuthService';

export default class SecurityService {
  private _isLogged: boolean = false;
  private _utilisateurLogged: IUtilisateur | null = null;
  private _token: string = "";
  private static _instance: SecurityService | null = null;
  private _utilisateurService = UtilisateurService.getInstance();
  private securityObservable = SecurityObservable.getInstance();
  private navigate = useNavigate();


  private constructor() {}

  public static getInstance(): SecurityService {
    if (this._instance === null) {
      this._instance = new SecurityService();
    }
    return this._instance;
  }

  /**
   * Fonction qui renvoie vrai si username/pwd sont reconnus dans la bd
   * @param username
   * @param pwd
   * @returns
   */
  public async connect(email: string, password: string): Promise<boolean> {
    const credentials = {
      email: email,
      password: password,
    };
    
    try {
      const response = await fetch('https://127.0.0.1:8000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Correction du Content-Type
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Convertir la réponse JSON en objet JavaScript
        console.log('connexion ' + response);
        const responseData = await response.json();



        const token = responseData.token;
        this._token = token;
        this._isLogged = true;
        this.securityObservable.isLogged = this._isLogged;
        this.securityObservable.notifyListeners();
      
        //Start getUser
        const user = await fetch('https://127.0.0.1:8000/access/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Correction du Content-Type
                // authen = bearer
              },
              body: JSON.stringify(credentials), // passer que id + token
          });
          if (user.ok) {
          // Convertir la réponse JSON en objet JavaScript
              const userData = await user.json();   
              
              
              setAuthInfo({
                isConnected: this._isLogged,
                token: this._token,
                user: userData,
              });
              console.log('localstorage ' + getAuthInfo())
              return true;
              
          } else {
            return false;
          }
        
        // End GetUser

        


      } else {
          this._isLogged = false;
          this.securityObservable.isLogged = this._isLogged;
          this.securityObservable.notifyListeners();
          return false;
        }
    } catch (error) {
      // Gérer les erreurs réseau, par exemple, si le serveur n'est pas accessible
      console.error('Erreur inattendue:', error);
      this.securityObservable.isLogged = this._isLogged;
      this.securityObservable.notifyListeners();
      return false;
    }
  }



  /**
   * Fonction fait la déconnexion et appelle une callback
   * @param callback
   */
  public async disconnect(callback: () => void) {
    this._isLogged = false;
    this._utilisateurLogged = null;

    // appel set valeur observable avec this._isLogged en param
    this.securityObservable.isLogged = this._isLogged;
    // appel notify observable
    this.securityObservable.notifyListeners();
    callback();
  }

  public get isLogged(): boolean {
    return this._isLogged;
  }

  public set isLogged(value: boolean) {
    this._isLogged = value;
  }

  public get utilisateurLogged(): IUtilisateur | null {
    return this._utilisateurLogged;
  }

  public set utilisateurLogged(value: IUtilisateur | null) {
    this._utilisateurLogged = value;
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }
}
