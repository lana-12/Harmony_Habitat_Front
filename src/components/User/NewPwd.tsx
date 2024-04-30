import React from 'react';
import { Container } from 'react-bootstrap';
import LogoSmallblack from '../../img/LogoSmallblack.png';


function NewPwd() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src={LogoSmallblack} alt="Logo" className="logoformforgotpwd" />
      <Container className="formforgotpwd">
        <h2>Créer un nouveau mot de passe</h2>
        <form>
        <label htmlFor="password1" className="form-label">Nouveau mot de passe</label>
        <input type="password" className="form-control" id="password1" placeholder="Mot de passe" />
        
          <div className="mb-3">
            <label htmlFor="password2" className="form-label">Confirmez le mot de passe</label>
            <input type="password" className="form-control" id="password2" placeholder="Confirmez le mot de passe" />

          </div>

          <div className="d-flex flex-column align-items-center">

          <button type="submit" className="btn btn-primary">Confirmer</button>


              <div>

            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default NewPwd;


