import { ActionFunctionArgs } from "react-router-dom";
import SecurityService from "../services/SecurityService";
import UtilisateurService from "../services/UtilisateurService";

export const actionUpdateUser = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const pseudo = formData.get("pseudo") as string;
  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const email = formData.get("email") as string;

  const securityService = SecurityService.getInstance();

  const utilisateurService = UtilisateurService.getInstance();

  const userData = {
    pseudo: pseudo,
    email_utilisateur: email,
    nom_utilisateur: nom,
    prenom_utilisateur: prenom,
  };

  const userId = securityService.utilisateurLogged?.id;
  const numberId = Number(userId);
  const updatedUser = await utilisateurService.update(numberId, userData);
  securityService.utilisateurLogged = updatedUser;
  console.log("UpdateUser", updatedUser);
  console.log(
    "securityService.utilisateurLogged",
    securityService.utilisateurLogged
  );
};
