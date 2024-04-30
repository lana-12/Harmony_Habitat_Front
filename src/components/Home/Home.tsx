import Search from "./Search";
import Map from "./Map";
import Thematics from "./Thematics";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import CommuneService from "../../services/CommuneService";
import Result from "./Result";
import ICommuneAug from "../../interfaces/ICommuneAug";
import GeoApiService from "../../services/GeoApiService";
import MeteoCptApiService from "../../services/MeteoCptApiService";
import ICommune from "../../interfaces/ICommune";
import PositionService from "../../services/PositionService";
import EcoleService from "../../services/EcoleService";
import AddFavorite from "./AddFavorite";
import { LatLng } from "leaflet";
import { setAuthInfo, getAuthInfo } from '../../services/AuthService';
import SecurityObservable from '../../observables/securityObservable';
import { useNavigate } from "react-router-dom";
import SecurityService from "../../services/SecurityService";

function Home() {
  const [communes, setCommunes] = useState<any[]>([]);
  const [selectedCommune, setSelectedCommune] = useState<any>({});
  const [thematic, setThematic] = useState<string>("Aucune");
  //const searchValue = useRef("");
  const communeService = CommuneService.getInstance();
  //const positionService = PositionService.getInstance();
  const geoApiService = GeoApiService.getInstance();
  const meteoCptApiService = MeteoCptApiService.getInstance();
  const securityObservable = SecurityObservable.getInstance();
  const securityService = SecurityService.getInstance();
  //const navigate = useNavigate();

  // Code ecole start
  const [ecoles, setEcoles] = useState<any[]>([]);
  //const ecoleService = EcoleService.getInstance();
  //Code ecole end
  const [crimes, setCrimes] = useState<any[]>([]);
  const [immoPrices, setImmoPrices] = useState<any[]>([]);

  useEffect(() => {
    // Vérifiez si l'utilisateur est déjà connecté (par exemple, lorsqu'il recharge la page)
    const authInfo = getAuthInfo();
    if (authInfo && authInfo.isConnected) {
      securityObservable.isLogged = true;
      securityObservable.notifyListeners();
      // TODO récupérer le token et l'user pour la maj du SecurityService
      securityService.token = authInfo.token;
      securityService.isLogged = true;
    }
  }, []);

  useEffect(() => {
    const selectedCommuneId = selectedCommune.id;
    const fetch = async () => {
      //const idCommune = selectedCommune.id_commune;
      const commune = await communeService.searchCommuneById(selectedCommuneId);
      //console.log('commune : ', commune);
      const crimesArray = commune.crimes;
      const ecolesArray = commune.ecoles;
      const immoPricesArray = commune.immoPrixes;
      setCrimes(crimesArray);
      setImmoPrices(immoPricesArray)
      setEcoles(ecolesArray);

    };
    if(selectedCommuneId !== undefined) fetch();
  }, [selectedCommune]);

  const updateCommunes = (southWest: LatLng, northEast: LatLng) => {
    communeService
      .loadCommunesWithPosition(southWest, northEast)
      .then((datas) => {
        if (datas !== null) {
          if (datas.length !== 0) {
            setCommunes(datas);
            console.log("nb de communes :", datas.length);
          }
        }
      });
  };



  const getAndSetPopulation = async (c: ICommuneAug): Promise<ICommuneAug> => {
    if (c.code_commune !== undefined) {
      return geoApiService
        .getGeoDatas(c.code_commune)
        .then((data) => {
          const population = data.population;
          const copy: ICommuneAug = {
            id: c.id,
            code_commune: c.code_commune,
            code_postal: c.code_postal,
            nom_commune: c.nom_commune,
            nom_departement: c.nom_departement,
            nom_region: c.nom_region,
            latitude: c.latitude,
            longitude: c.longitude,
            population: population,
            altitude: 0,
          };
          setSelectedCommune(copy);
          return copy;
        })
        .catch((error) => {
          console.error("Erreur :", error);
          return c;
        });
    }
    return c;
  };

  // TODO traiter le cas ou l'api est ko : ne pas faire le 'setSelectedCommune' --> done
  const getAndSetAltitude = async (c: ICommuneAug) => {
    if (c.code_commune !== undefined) {
      const ephemeridData = await meteoCptApiService.loadEphemerid(
        c.code_commune
      );
      if (Object.keys(ephemeridData).length > 0) {
        const altitude = ephemeridData.city.altitude;
        //console.log('altitude :', altitude);
        const copy: ICommuneAug = {
          id: c.id,
          code_commune: c.code_commune,
          code_postal: c.code_postal,
          nom_commune: c.nom_commune,
          nom_departement: c.nom_departement,
          nom_region: c.nom_region,
          latitude: c.latitude,
          longitude: c.longitude,
          population: c.population,
          altitude: altitude,
        };
        setSelectedCommune(copy);
      }
    }
  };

  const setThematicFct = (thematic: string) => {
    setThematic(thematic);
  };

  const cbUpdateCommuneArray = (southWest: LatLng, northEast: LatLng) => {
    //console.log('southWest:', southWest);
    //console.log('northEast:', northEast);

    updateCommunes(southWest, northEast);
  };

  const setSelectedCommuneFromMap = async (c: ICommuneAug) => {
    const updatedCommune = await getAndSetPopulation(c);
    const fctAlt = await getAndSetAltitude(updatedCommune);
  };

  const setSelectedCommuneFromResult = async (commune: ICommune) => {
    
    //const data_pos = await positionService.getById(commune.id_position);
    //console.log('data_pos :', data_pos);
    const communeAug: ICommuneAug = {
      id: commune.id,
      code_commune: commune.code_commune,
      code_postal: commune.code_postal,
      nom_commune: commune.nom_commune,
      nom_departement: commune.nom_departement,
      nom_region: commune.nom_region,
      latitude: commune.latitude,
      longitude: commune.longitude,
      population: 0,
      altitude: 0,
    };
    const updatedCommune = await getAndSetPopulation(communeAug);
    const fctAlt = await getAndSetAltitude(updatedCommune);
  };

  const cbResetSelectedCommune = async () => {
    setSelectedCommune({});
  };

  return (
    <div className="d-flex flex-column align-items-center div-container-home">
      <Search setSelectComCB={setSelectedCommuneFromResult} />
      <Map
        communes={communes}
        cbHandleMarkerClick={setSelectedCommuneFromMap}
        selectedCommune={selectedCommune}
        cbUpdateCommuneArray={cbUpdateCommuneArray}
        cbResetSelectedCommune = {cbResetSelectedCommune}
      />
      <Thematics setThematicCB={setThematicFct} />
      <AddFavorite selectedCommune={selectedCommune} />
      <Result
        selectedCommune={selectedCommune}
        immoPrices = {immoPrices}
        crimes = {crimes}
        ecoles={ecoles}
        //crimes={crimes}
        thematic={thematic}
      />
      <Comments selectedCommune={selectedCommune} />
    </div>
  );
}
export default Home;
