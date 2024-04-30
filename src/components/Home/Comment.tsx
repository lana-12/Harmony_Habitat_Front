import { useEffect, useState } from "react";
import CommentService from "../../services/CommentService";

function Comment(props: any) {
    const [commentaire, setCommentaire] = useState<any>();
    const commentService = CommentService.getInstance();

    useEffect(() => {
        const fct = async () => {
            const user = await commentService.getUserInfos(props.commentaire.user.id);
            const comment = {
                'id': props.commentaire.id,
                'content': props.commentaire.content,
                'created_at': props.commentaire.created_at,
                'score': props.commentaire.score,
                'user_pseudo': user.pseudo,
            };
            setCommentaire(comment);
        };
        fct();
    }, [props.commentaire]);

    if(commentaire !== undefined) {
        return(
        <div className="div-comment">
        <p className="text-comment">{commentaire.content}</p>
        <p className="util-name-comment">{commentaire.user_pseudo}
            <span className="date-comment"> / {commentaire.created_at}</span>
        </p>
        <p className="note_comment">{commentaire.score}/5</p>
        </div>
    );
    }
    else {
        return (<></>);
    }
}
export default Comment;