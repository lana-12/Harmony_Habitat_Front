import { Link } from "react-router-dom";
import Logo2 from "../../img/logo2.png";
import Logo1 from "../../img/logo1.png";
import Logo3 from "../../img/logo3.png";



function Footer() {
    return (

      <footer className="app-footer">
        {/* <h3>Footer Harmony Habitat</h3> */}

        {/* ContactFooter */}
          <div className="row">
            <div className="col">
              <div className="contactFooter">
                <h4 className="text-decoration-underline">Contact</h4>
                <address>
                  <a className="linkContactHeader" href="mailto:harmonyHabitat@gmail.com" title="Cliquer contacter HarmonyHabitat" ><i className=" iconEmail bi bi-envelope-at"></i>harmonyHabitat@gmail.com</a>
                </address>
                <address>
                  <a className="linkContactHeader" href="tel:0678952723" title="Cliquer contacter HarmonyHabitat" ><i className="iconTel bi bi-telephone-fill"></i>0678952723</a>
                </address>
              </div>
            </div>
          </div>

        {/* Mention + Copyright Footer */}
          <div className="row">
            <div className="col ">
              <div className="mentionCopyrightFooter">

              {/* Mention  */}
                <div className="mentionFooter text-center col-md-6 ">
                  <h4 className="text-decoration-underline">Mention Légal</h4>
                  <div className="mention ">
                    <p>
                      <Link className="linkMentionHeader me-5" to="/rgpd" title="Lien vers RGPD">RGPD</Link>
                    </p>
                    <p>
                      <Link className="linkMentionHeader" to="/cgu" title="Lien vers CGU">CGU</Link>
                    </p>
                  </div>
                </div>

              {/* Copyright Footer */}
                <div className="copyrightFooter ">
                  <img src={Logo3} alt="Logo HarmonyHabitat" className="logoHeader img-fluid"/>
                  <p className=" textCopyrightHeader" ><i className="bi bi-c-circle"></i> 2023 HarmonyHabitat
                  </p>         
                </div>
                
              </div>
            </div>
          </div>
        
      </footer>
    );

}
export default Footer;