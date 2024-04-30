import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Estelle from "../../images/Estelle.jpg";
import ModalUserUp from "./ModalUserUp";
import SecurityService from "../../services/SecurityService";
import IUtilisateur from "../../interfaces/IUtilisateur";

const User = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [user, setUser] = useState<IUtilisateur | null>(null);

  const securityService = SecurityService.getInstance();

  useEffect(() => {
    if (securityService.utilisateurLogged) {
      setUser(securityService.utilisateurLogged);
    }
  }, [securityService.utilisateurLogged]);

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = async () => {
    setIsUserModalOpen(false);
    if (securityService.utilisateurLogged) {
      console.log("closeUserModal");
      await setUser(securityService.utilisateurLogged);
    }
  };

  const handleUpdateUser = (userData: {
    pseudo: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
  }) => {
    const updatedUser = securityService.utilisateurLogged;
    if (updatedUser) {
      setUser(updatedUser);
    }
    closeUserModal();
  };

  return (
    <>
      <main className="d-flex flex-column align-items-center ">
        <div className="d-flex justify-content-start w-75">
          <button className="btn btn-sm btn-outline-dark button-back-home">
            <Link to="/*" title="Accueil">
              <i className="bi bi-arrow-left-circle "></i>
            </Link>
          </button>
        </div>

        <section className="mb-3 d-flex flex-column align-items-center portrait-section">
          <div className="mb-3 photo-container">
            <img
              src={Estelle}
              alt="portrait d'Estelle"
              className="img-fluid photo-estelle"
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-dark button-update-photo"
            >
              <i className="bi bi-camera icon-photo"></i>
            </button>
          </div>

          <div className="input-group update-pseudo">
            <input
              type="text"
              value={user?.pseudo}
              className="form-control input-pseudo "
              placeholder="Votre Pseudo"
              disabled
            />
          </div>
        </section>

        <section className="mb-3 d-flex align-items-start section-form-user ">
          <form className="flex-grow-1">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Nom</label>
              <input
                type="text"
                value={user?.nom_utilisateur}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Votre Nom"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Prénom</label>
              <input
                type="text"
                value={user?.prenom_utilisateur}
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Votre Prénom"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Email</label>
              <input
                type="text"
                value={user?.email_utilisateur}
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Votre Email"
                disabled
              />
            </div>
          </form>
          <button
            type="button"
            className="btn btn-sm btn-outline-dark button-form-user"
            onClick={openUserModal}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
        </section>

        <h4>Favoris</h4>
        <section className="d-flex align-items-center favorites-section">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Nom de la commune"
              disabled
            />
          </div>

          <button className="btn btn-sm btn-outline-dark button-visit">
            Consulter
          </button>
          <button className="delete-favorites">
            <i className="bi bi-x-circle-fill "></i>
          </button>
        </section>
      </main>

      {isUserModalOpen && (
        <ModalUserUp
          user={user}
          isOpen={isUserModalOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeUserModal}
        />
      )}
    </>
  );
};

export default User;
