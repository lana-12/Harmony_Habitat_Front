export default class Config {
    public static SERVER_URL: string = "http://localhost:3001";
    public static GEO_API_URL: string = "https://geo.api.gouv.fr";
    public static METEO_CPT_URL: string = "https://api.meteo-concept.com";
    public static METEO_CPT_TOKEN: string = "06a3e3f2f54d0caa80e3915bca02c559b6d425804cd52155164e57c6d48bd43e";
    public static POLE_EMPLOI_URL: string = "https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres";

    public static POLE_EMPLOI_CONNECT_URL: string = "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire";

    public static POLE_EMPLOI_CONNECT_ID: string = "PAR_harmonyhabitat_10bef9e41cb7a780b798a5ba63554cb489e48c799efc992181d643d22284a27d";

    public static POLE_EMPLOI_CONNECT_SECRET: string = "1a1bf868f8d42a4fbf4ac414251665aba64bfc22f9828c294cc4305aeda3ecbf";

    public static POLE_EMPLOI_CONNECT_SCOPE: string = "api_offresdemploiv2 o2dsoffre";

    public static POLE_EMPLOI_CONNECT_GRANT_TYPE: string = "client_credentials";
}