import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import LogoSmallblack from '../../img/LogoSmallblack.png';
import { useFetcher, redirect, useNavigate  } from 'react-router-dom';
import { toast } from "react-toastify";
import UtilisateurService from '../../services/UtilisateurService';
import SecurityService from "../../services/SecurityService";
import { SHA256 } from 'crypto-js';
import { setAuthInfo, getAuthInfo } from '../../services/AuthService';
import SecurityObservable from '../../observables/securityObservable';




function Login() {
  const fetcher = useFetcher();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userService = UtilisateurService.getInstance();
  const security = SecurityService.getInstance();
  const observable = SecurityObservable.getInstance();
  const navigate = useNavigate();
  // const hash = SHA256('authenticate').toString();
  // console.log(hash);

  

  const handleEmail = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };
  // console.log(email);
  
  const handlePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setPassword(event.target.value);
  };
  // console.log(password);

/*
const handleLoginClick = async (e: any) => {
  e.preventDefault();

  const utilisateur = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch('https://127.0.0.1:8000/access/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Correction du Content-Type
      },
      body: JSON.stringify(utilisateur),
    });

    // Vérifier si la requête a réussi (status 200 OK)
    if (response.ok) {
      // Convertir la réponse JSON en objet JavaScript
      const responseData = await response.json();
      
      // Traiter les données renvoyées
      if (responseData.isConnected) {
        observable.isLogged = true;
        observable.notifyListeners();
        
        console.log('Utilisateur connecté avec succès:', responseData.email);
        console.log('Utilisateur connecté avec succès:', responseData.isConnected);
        setAuthInfo({
            isConnected: true,
            email: responseData.email,
          });
        const isConnected = true;
        //const isConnected = await security.connect();

        if (isConnected) {
        console.log('connecté');

        //const users = await JsonUserService.getInstance().loadByUsername(username) as IUser[];
        
        //toast.success('Connexion réussie');
        toast.success('Connexion acceptée');
        return navigate("/Home");
        } 
        // else {
        //     toast.error('Connexion refusée');
        //     console.log('non connecté');
        //     return navigate("/LogIn");
        // }
        
      } else {
        console.log('Identifiants invalides:', responseData);
        toast.error('Connexion refusée');
        console.log('non connecté');
        return navigate("/LogIn");
      }
    } else {
      // Gérer les erreurs HTTP (par exemple, mauvaise requête, utilisateur non trouvé, etc.)
      console.error(`Erreur HTTP: ${response.status}`, response.statusText);
    }
  } catch (error) {
    // Gérer les erreurs réseau, par exemple, si le serveur n'est pas accessible
    console.error('Erreur inattendue:', error);
  }
};*/

 // onSubmit={handleLoginClick}
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src={LogoSmallblack} alt="Logo" className="logoformlogin" />
      <Container className="formLogIn">
        <h2>Connexion</h2>
        <fetcher.Form className="" action="/connect" method="POST" >
          <div className="mb-3 form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" value={email} className="form-control" id="email" name="email" placeholder="Email" onChange={handleEmail} required/>
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" value={password} className="form-control" id="password" name="password" placeholder="Mot de passe" onChange={handlePassword} required/>
            <a href="/ForgotPwd">Mot de passe oublié</a>
          </div>

          <div className="btnLog d-flex flex-column align-items-center">

            <button type="submit" className="btn btnLoginform">Connexion</button>


            <a href="SignIn" className='goToSignIn'>Créer un compte</a>
              <div>

            </div>
          </div>
        </fetcher.Form>
      </Container> 
    </div>
  );
}

export default Login;
