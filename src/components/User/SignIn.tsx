import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import LogoSmallblack from '../../img/LogoSmallblack.png';
import UtilisateurService from '../../services/UtilisateurService';

function SignIn() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userService = UtilisateurService.getInstance();


    const handleFirstName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setFirstName(event.target.value);
    };
    const handleLastName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLastName(event.target.value);
    };
    const handleEmail = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

const handleCreateClick = async (e: any) => {
  e.preventDefault();

  const utilisateur = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    pseudo: firstname,
  };

  console.log(utilisateur);

  try {
    const response = await fetch('https://127.0.0.1:8000/manageUser', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/ld+json; application/json', // Spécifiez le type de contenu JSON
      },
      body: JSON.stringify(utilisateur),
    });
console.log('Response created' + response.headers);
console.log(response.headers.get('Content-Type'));


    // if (response.ok) {
    //   const data = await response.json();
    //   console.log("Utilisateur créé :", data.user);
    // } else {
    //   console.error("Erreur lors de la création de l'utilisateur :", response.status);
    // }
  } catch (error) {
    console.error("Erreur inattendue :", error);
  }
};
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src={LogoSmallblack} alt="Logo" className="logoformsignin" />
      <Container className="formSignIn">
        <h2>Créer un compte</h2>
        <form action={userService.getUrlUserApi()} method="POST" onSubmit={handleCreateClick}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Prénom</label>
            <input type="text" className="form-control" id="firstName" name= "firstname" placeholder="Prénom" value={firstname} onChange={handleFirstName}/>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Nom</label>
            <input type="text" className="form-control" id="lastName" name= "lastname" placeholder="Nom" value={lastname} onChange={handleLastName} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email" name= "email" value={email} onChange={handleEmail}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input type="password" className="form-control" id="password" placeholder="Mot de passe" name= "password" value={password} onChange={handlePassword}/>
          </div>

          <div className="d-flex flex-column align-items-center">
            <button type="submit" className="btn btnRegister" >S'enregistrer</button>
          </div>

        </form>
      </Container>
    </div>
  );
}

export default SignIn;
