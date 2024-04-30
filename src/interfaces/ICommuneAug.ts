
/*export default interface ICommuneAug {
    id_commune: number;
    code_commune: string;
    code_postal: string;
    nom_commune: string;
    id_position: number;
    id_departement: number;
    id_region: number;
    latitude: number;
    longitude: number;
    population: number;
    altitude: number;
}*/


export default interface ICommuneAug {
    id: number;
    code_commune: string;
    code_postal: string;
    nom_commune: string;
    nom_departement: string;
    nom_region: string;
    latitude: number;
    longitude: number;
    population: number;
    altitude: number;
}
