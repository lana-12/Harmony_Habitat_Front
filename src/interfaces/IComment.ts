export default interface IComment {
    id: number;
    texte_commentaire: string;
    date_commentaire: string; // Date ?
    note_commentaire: number;
    id_utilisateur: number;
    id_commune: number;
}