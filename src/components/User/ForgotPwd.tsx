import React from 'react';
import { Container } from 'react-bootstrap';
import LogoSmallblack from '../../img/LogoSmallblack.png';


function ForgotPassword() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src={LogoSmallblack} alt="Logo" className="logoformforgotpwd" />
      <Container className="formforgotpwd">
        <h2>Rénitialisez votre mot de passe</h2>
        <p>Entrez votre email, vous recevrez un lien <br/> pour créer un nouveau mot de passe.</p>
        

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"></label>
            <input type="email" className="form-control" id="email" placeholder="Email" />
          </div>

          <div className="d-flex flex-column align-items-center">
            <button type="submit" className="btn btnResetPassword">Réinitialiser</button>
            <a href="LogIn" className='backToLogin'>Retour à la connexion</a>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ForgotPassword;

