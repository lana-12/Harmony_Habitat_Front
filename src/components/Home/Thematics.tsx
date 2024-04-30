import { useRef } from "react";

function Thematics(props : any) {
    const thematics = ["Enseignement", "Sécurité", "Immobilier", "Emploi"];
    const theme = useRef("Aucune");
    return (
        
        <div className="d-flex w-75 gap-2 flex-wrap justify-content-center mt-5 mb-3">
          {
            thematics.map((t: string, index: number) => {
              return (
                <button
                onClick={(e) => {
                  theme.current = t;
                  props.setThematicCB(t);
                }}
                key={index}
                className={
                  "btn-theme " +
                  (t === theme.current ? "theme-selected" : "")
                  
                }
              >
                {t}
              </button>
              );
            })
          }
          <button
                onClick={(e) => {
                  theme.current = "Aucune";
                  props.setThematicCB("Aucune");
                }}
                className={
                  "btn-theme " +
                  (theme.current === "Aucune" ? "theme-selected" : "")
                }
              >
                Aucune
              </button>
        </div>
     
    );
}
export default Thematics;