import { useEffect, useState } from "react";
import SecurityObservable from "../../observables/securityObservable";
import { toast } from "react-toastify";
import SecurityService from "../../services/SecurityService";
import FavoriService from "../../services/FavoriService";
import IFavori from "../../interfaces/IFavori";
import { format } from "date-fns";

function AddFavorite(props: any) {
  const [isConnected, setIsConnected] = useState(false);
  const [idUtil, setIdUtil] = useState(0);
  const securityObservable = SecurityObservable.getInstance();
  const securityService = SecurityService.getInstance();
  const favoriService = FavoriService.getInstance();

  const setIsConnectedCB = (value: boolean) => {
    setIsConnected(value);
    //console.log("call back : ", value);
  };

  useEffect(() => {
    setIsConnected(securityService.isLogged);
    if (securityService.utilisateurLogged !== null) {
      setIdUtil(securityService.utilisateurLogged.id);
    }
  }, [securityService.isLogged, securityService.utilisateurLogged]);

  securityObservable.addListener(setIsConnectedCB);

  const addToFavorite = async () => {
    // tester si l'user a pas deja ajouté le favori
    //console.log("clic");
    //console.log('id util : ', idUtil);
    //console.log ('id commune : ', props.selectedCommune.id_commune);
    if (Object.keys(props.selectedCommune).length > 0) {
      const oldFav = await favoriService.getByUtilisateurId(
        props.selectedCommune.id_commune,
        idUtil
      );

      if (oldFav.length === 0) {
        // ajouter favori
        //const date = "date a définir";
        const currentDate = new Date();
        const date = format(currentDate, "yyyy-MM-dd HH:mm:ss");
        //"2023-06-15 09:00:03"
        // faire appel fonction du service des favoris avec id_utilisateur et id_commune
        const favoris = await favoriService.loadFavoris();
        const maxId = Math.max(...favoris.map((f) => f.id));
        const favori: IFavori = {
          id: Number(maxId + 1),
          date_favori: date,
          id_utilisateur: Number(idUtil),
          id_commune: Number(props.selectedCommune.id_commune),
        };

        await favoriService.addFavori(favori).then((res) => {
          console.log("response", res);
          if (res) {
            toast.success("Favori ajouté");
          } else {
            toast.error("Erreur");
          }
        });
      } else {
        toast.warning("Favori déjà ajouté");
      }
    } else {
      toast.warning("Choisir une commune");
    }
  };

  //console.log("isConnected : ", isConnected);

  return (
    <>
      {isConnected && Object.keys(props.selectedCommune).length > 0 ? (
        <div className="mb-3 mt-0 d-flex justify-content-center">
          <button
            onClick={(e) => {
              addToFavorite();
            }}
            className="btn btn-add mt-5"
          >
            Ajouter aux Favoris
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default AddFavorite;
