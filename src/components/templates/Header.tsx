import { useState, useEffect } from "react";
import { setAuthInfo, getAuthInfo } from '../../services/AuthService';
import { Link, useNavigate } from "react-router-dom";
import SecurityObservable from "../../observables/securityObservable";
import SecurityService from "../../services/SecurityService";
import { toast } from "react-toastify";

function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const securityObservable = SecurityObservable.getInstance();
  const securityService = SecurityService.getInstance();
  const navigate = useNavigate();
  const setIsConnectedCB = (value: boolean) => {
    setIsConnected(value);
  };


  useEffect(() => {
    // Vérifiez si l'utilisateur est déjà connecté (par exemple, lorsqu'il recharge la page)
    const authInfo = getAuthInfo();
    if (authInfo && authInfo.isConnected) {
      securityObservable.isLogged = true;
      securityObservable.notifyListeners();
      securityService.token = authInfo.token;
      securityService.isLogged = true;
      //console.log('token :', authInfo.token);
    }
  }, []);
  /**
   * Fonction qui appelle la déconnexion et envoie une callback
   * qui redirige sur la route '/connect'
   */
  const handleLogout = () => {
    securityService.disconnect(() => {
      securityObservable.isLogged =false;
      securityObservable.notifyListeners();
      toast.success("Déconnexion");
      setAuthInfo("");
      // TODO maj du SecurityService ?
      navigate("/Home");

    });
  };

  securityObservable.addListener(setIsConnectedCB);

  return (
    <header className="app-header">
      {/* Avec un lien de retour + alt="Retour accueil" + title="Retour accueil" */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h1>
            <Link className="navbar-brand mt-2 " to="/*" title="Accueil">
              HarmonyHabitat
            </Link>
          </h1>
          <h2 className="slogan">
            L'habitat de vos rêves, en quelques clics !
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse mt-2"
            id="navbarSupportedContent"
          >
            {isConnected ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center ">
                <li className="nav-item ">
                  <Link className="link-header " to="/*" title="Accueil">
                    <i className="iconHouse bi bi-house-door-fill "></i>
                    <p>Accueil</p>
                  </Link>
                  {/* <button className="btn"> */}
                  {/* </button> */}
                </li>
                <li className="nav-item">
                  <Link className="link-header" to="/User" title="Profil">
                    <i className="iconUser bi bi-person-fill"></i>
                    <p>Profil</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="link-header"
                    to="/Home"
                    onClick={handleLogout}
                    title="Déconnexion"
                  >
                    <i className="iconPower bi bi-power"></i>
                    <p>Déconnexion</p>
                  </Link>
                </li>
              </ul>
            ) : (
              // Contenu à afficher si user notConnected
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                <li className="nav-item">
                  <Link className="link-header" to="/*" title="Accueil">
                    <i className="iconHouse bi bi-house-door-fill"></i>
                    <p>Accueil</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="link-header"
                    to="/Login"
                    title="Se Connecter"
                  >
                    <i className="iconUser bi bi-person-fill"></i>
                    <p>Se Connecter</p>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
