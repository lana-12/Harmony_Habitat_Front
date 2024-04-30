import { ActionFunctionArgs } from "react-router-dom";
import { format } from 'date-fns';
import IComment from "../interfaces/IComment";
import CommentService from "../services/CommentService";
import { toast } from "react-toastify";
import CommentObservable from "../observables/commentObservable";
import { setAuthInfo, getAuthInfo } from '../services/AuthService';


export const actionAddComment = async({request}: ActionFunctionArgs) => {

    const authInfo = getAuthInfo();
    const formData = await request.formData();
    const texte_commentaire = formData.get("texte_commentaire") as string;
    const note_commentaire = Number(formData.get("note_commentaire"));
    const id_commune = Number(formData.get("id_commune"));
    const id_utilisateur = authInfo.user.id;
    const date_commentaire = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const commentService = CommentService.getInstance();
    const commentObservable = CommentObservable.getInstance();

    const comments = await commentService.loadComments();
    const maxId = Math.max(...comments.map(f => f.id));


    const comment: any = {
        texte_commentaire: texte_commentaire,
        date_commentaire: date_commentaire,
        note_commentaire: note_commentaire,
        id_utilisateur: id_utilisateur,
        id_commune: id_commune
    }

    await commentService.addComment(comment).then((res) => {
        //console.log('response', res);
        if(res) {
            toast.success("Commentaire ajouté");
            commentObservable.reloadComment = true;
            commentObservable.notifyListeners();
        }
        else {
           toast.error("Erreur");
        }
    });
    return null;
}