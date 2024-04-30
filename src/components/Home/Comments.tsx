import { useEffect, useState } from "react";
import CommentService from "../../services/CommentService";
import IComment from "../../interfaces/IComment";
import Comment from "./Comment";
import { useFetcher } from "react-router-dom";
import ReactModal from "react-modal";
import SecurityObservable from "../../observables/securityObservable";
import { toast } from "react-toastify";
import SecurityService from "../../services/SecurityService";
import CommentObservable from "../../observables/commentObservable";


function Comments(props: any) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState("");
  const [note, setNote] = useState("");

  const commentService = CommentService.getInstance();
  const fetcher = useFetcher();
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [idUtil, setIdUtil] = useState(0);
  const securityObservable = SecurityObservable.getInstance();
  const securityService = SecurityService.getInstance();
  const commentObservable = CommentObservable.getInstance();

  const reloadCommentsCB = (value: boolean) => {
    if (value) {
      if (Object.keys(props.selectedCommune).length > 0) {
        const fetchComments = async () => {
          const comments = await commentService.getByCommuneId(
            props.selectedCommune.id
          );
          //console.log("comments :", comments);
          setComments(comments);
        };
        fetchComments();
      }
    }
  };

  commentObservable.addListener(reloadCommentsCB);
  //useEffect(() => {}, []);

  useEffect(() => {
    if (Object.keys(props.selectedCommune).length > 0) {
      const fetchComments = async () => {
        const comments = await commentService.getByCommuneId(
          props.selectedCommune.id
        );
        //console.log("comments :", comments);
        setComments(comments);
      };
      fetchComments();
    }
  }, [props.selectedCommune]);

  const setIsConnectedCB = (value: boolean) => {
    setIsConnected(value);
  };

  useEffect(() => {
    setIsConnected(securityService.isLogged);
    if (securityService.utilisateurLogged !== null) {
      setIdUtil(securityService.utilisateurLogged.id);
    }
  }, [securityService.isLogged, securityService.utilisateurLogged]);

  securityObservable.addListener(setIsConnectedCB);

  /**
   * Fonction qui ouvre la modale de création d'un commentaire
   */
  async function openModalComment() {
    setIsModalCardOpen(true);
    // TODO tester si pas deja un commentaire

    if (securityService.utilisateurLogged) {
      const commentsOld = await commentService.getByCommuneAndUtilisateurId(
        props.selectedCommune.id,
        securityService.utilisateurLogged?.id
      );
      //console.log('comment old :', commentsOld);
      if (commentsOld.length === 0) {
        setIsModalCardOpen(true);
      } else {
        toast.warning("Commentaire déjà ajouté");
      }
    }
  }

  /**
   * Fonction qui ferme la modale de création d'un commentaire
   */
  function closeModalComment() {
    setIsModalCardOpen(false);
  }

  return (
    <>
      <div className="mb-3 d-flex flex-column align-items-center">
        {isConnected && Object.keys(props.selectedCommune).length > 0 ? (
          <button
            onClick={(e) => {
              openModalComment();
            }}
            className="btn btn-add my-0"
          >
            Ajouter un commentaire
          </button>
        ) : (
          <></>
        )}
        {comments.length > 0 ? (
          <h2 className="test text-center mt-5 mb-3 titre-comment">
            Commentaires
          </h2>
        ) : (
          ""
        )}
        {comments.length > 0 &&
          comments.map((c) => {
            return <Comment key={c.id} commentaire={c} />;
          })}
      </div>
      <ReactModal
        isOpen={isModalCardOpen}
        onRequestClose={closeModalComment}
        contentLabel="Créer un nouveau commentaire"
        className="modal-comment"
        appElement={document.getElementById("root") || undefined}
        style={{
          overlay: {
            zIndex: 1000,
          },
        }}
      >
        <fetcher.Form
          className="form-comment"
          action="/addComment"
          method="POST"
          onSubmit={(e) => {
            closeModalComment();
          }}
        >
          <h3 className="mt-2">Ajouter un commentaire</h3>
          <div className="form-group ">
            <label className="" htmlFor="texte_commentaire">
              Commentaire :
            </label>
            <textarea
              className="form-control "
              name="texte_commentaire"
              id="texte_commentaire"
              placeholder="saisir un commentaire"
              rows={6}
              cols={50}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="form-group ">
            <label className="" htmlFor="note_commentaire">
              Note :
            </label>
            <input
              className="form-control "
              type="number"
              name="note_commentaire"
              id="note_commentaire"
              placeholder="saisir une note"
              min={0}
              max={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <input
            type="hidden"
            name="id_commune"
            id="id_commune"
            value={props.selectedCommune.id}
          />

          <input
            type="hidden"
            name="id_utilisateur"
            id="id_utilisateur"
            value={securityService.utilisateurLogged?.id}
          />

          <div className="d-flex justify-content-center gap-3 mt-3 mb-1">
            <button className="btn btn-success btn-modal" type="submit">
              valider
            </button>

            <button
              className="btn btn-warning btn-modal"
              onClick={closeModalComment}
            >
              Annuler
            </button>
          </div>
        </fetcher.Form>
      </ReactModal>
    </>
  );
}
export default Comments;

/*
disabled={!question || !answer}

    id_commentaire: number;
    texte_commentaire: string;
    date_commentaire: string; // Date ?
    note_commentaire: number;
    id_utilisateur: number;
    id_commune: number;

    <div key={c.id_commentaire}>
        <p>id : {c.id_commentaire}</p>
        <p>texte : {c.texte_commentaire}</p>
        <p>date : {c.date_commentaire}</p>
        <p>note : {c.note_commentaire}</p>
        <p>id_utilisateur : {c.id_utilisateur}</p>
        <p>id_commune : {c.id_commune}</p>
        </div>
*/
