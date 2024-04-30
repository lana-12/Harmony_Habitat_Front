import Config from "../configs/Config";

export default class EmploymentApiService {
    private _url_api: string = Config.POLE_EMPLOI_URL + "/search";
    private static token: string = "";
    // TODO timestamp
    private static timestamp: number = 0;
    private static tokenDuration: number = 0;
    private static _instance: EmploymentApiService | null = null;

    private constructor() {}

    public static getInstance(): EmploymentApiService {
        if (this._instance === null) {
          this._instance = new EmploymentApiService();
        }
        return this._instance;
      }


      public async connectAndSetToken() {
        try {
            const data = {
                grant_type: Config.POLE_EMPLOI_CONNECT_GRANT_TYPE,
                client_id: Config.POLE_EMPLOI_CONNECT_ID,
                client_secret: Config.POLE_EMPLOI_CONNECT_SECRET,
                scope: Config.POLE_EMPLOI_CONNECT_SCOPE
            };
            const response = await fetch(Config.POLE_EMPLOI_CONNECT_URL, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data),
                method: "POST",
                mode: 'cors', // Ajout de l'option 'mode'
            }) 
            .then((res) => {
                if(res.status === 200) {
                    return res.json();
                }
            })
            .then(function (res) {
                    const token = res.access_token;
                    const duration = res.expires_in;
                    //console.log('token :', token);
                    EmploymentApiService.token = token;
                    EmploymentApiService.tokenDuration = duration;
                    EmploymentApiService.timestamp = Math.floor(Date.now() / 1000);
                    //console.log('token 2 :', EmploymentApiService.token);
                    return null;
            });
        }
        catch (e) {
            console.error(e);
            return null;
        }
      }

      public async getDatasByCodeCommune(codeCommune: string) {
        try {
            //console.log('token dans fct get :', EmploymentApiService.token);
            const response = await fetch(`${this._url_api}?commune=${codeCommune}&distance=0`, {
                headers: {"Authorization": `Bearer ${EmploymentApiService.token}`},
                //Authentication: `Bearer ${EmploymentService.token}`,
                mode: 'cors',
                method: 'GET'
              });
            const datas = await response.json();
            return datas;
        } catch (e) {
            //console.error(e);
            return [];
        }
      }

      public async getAndSetTokenIfNeedNew() {
        const old = EmploymentApiService.timestamp;
        const duration = EmploymentApiService.tokenDuration
        const now = Math.floor(Date.now() / 1000);
        if(old === 0 || (now - old) > (duration - 20) ) {
          console.log('nouvelle connexion à l\'api pole emploi');
          const connect = await this.connectAndSetToken();
        }
      }

      /*
      private set url_api(value : string) {
        this._url_api = value;
        console.log('value ok : ', value);
      }

      private get url_api() {
        return this._url_api;
      }*/
      
    
    }