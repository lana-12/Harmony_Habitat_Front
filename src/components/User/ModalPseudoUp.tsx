import { useState } from "react";
import ReactModal from "react-modal";

interface ModalPseudoUpProps {
  isOpen: boolean;
  currentPseudo: string;
  onUpdatePseudo: (newPseudo: string) => void;
  onClose: () => void;
}

const ModalPseudoUp = (props: ModalPseudoUpProps) => {
  const [pseudo, setPseudo] = useState("");

  const handlePseudoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onUpdatePseudo(pseudo);
    props.onClose();
  };

  return (
    <>
      <ReactModal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        contentLabel="Modifier le pseudo"
        className="modal-dialog modal-dialog-pseudo-up"
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div className="modal-header modal-header-pseudo-up">
              <h5 className="text-center">Nouveau Pseudo</h5>
            </div>
            <div className="modal-body">
              <div className="form-group form-group-pseudo-up">
                <input
                  className="form-control"
                  type="text"
                  name="pseudo"
                  id="pseudoInput"
                  placeholder="Entrez le Pseudo"
                  value={pseudo}
                  onChange={handlePseudoChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer modal-footer-pseudo-up">
              <button className="btn btn-success btn-sm" type="submit">
                Valider
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {
                  props.onClose();
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default ModalPseudoUp;
