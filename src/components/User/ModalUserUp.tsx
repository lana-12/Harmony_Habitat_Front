import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useFetcher } from "react-router-dom";
import IUtilisateur from "../../interfaces/IUtilisateur";

interface ModalUserUpProps {
  user: IUtilisateur | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (userData: {
    pseudo: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
  }) => void;
}

const ModalUserUp: React.FC<ModalUserUpProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUser,
}) => {
  const [userData, setUserData] = useState({
    pseudo: user?.pseudo || "",
    nom: user?.nom_utilisateur || "",
    prenom: user?.prenom_utilisateur || "",
    email: user?.email_utilisateur || "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        pseudo: user.pseudo || "",
        nom: user.nom_utilisateur || "",
        prenom: user.prenom_utilisateur || "",
        email: user.email_utilisateur || "",
        password: "",
      });
    } else {
      setUserData({
        pseudo: "",
        nom: "",
        prenom: "",
        email: "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetcher = useFetcher();
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mise à jour des informations"
      className="modal-dialog modal-dialog-user-up "
    >
      <div className="modal-content">
        <fetcher.Form
          className=""
          action="/updateUser"
          method="POST"
          onSubmit={(e) => {
            onClose();
            // e.preventDefault();
            onUpdateUser(userData);
          }}
        >
          <div className="modal-header modal-header-user-up">
            <h5 className="modal-title">Modifier vos informations</h5>
          </div>
          <div className="modal-body">
            <div className="form-group form-group-user-up">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                className="form-control"
                id="pseudo"
                name="pseudo"
                placeholder="Votre Pseudo"
                value={userData.pseudo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group form-group-user-up">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                placeholder="Votre Nom"
                value={userData.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-user-up">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                className="form-control"
                id="prenom"
                name="prenom"
                placeholder="Votre Prénom"
                value={userData.prenom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-user-up">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Votre Email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="modal-footer modal-footer-user-up">
            <button className="btn btn-success btn-sm" type="submit">
              Valider
            </button>
            <button className="btn btn-warning btn-sm" onClick={onClose}>
              Annuler
            </button>
          </div>
        </fetcher.Form>
      </div>
    </ReactModal>
  );
};

export default ModalUserUp;
