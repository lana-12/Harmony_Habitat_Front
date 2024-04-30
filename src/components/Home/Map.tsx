import { useEffect, useRef, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import ICommuneAug from "../../interfaces/ICommuneAug";
import { LatLngBounds } from "leaflet";

function Map(props: any) {
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);
  const zoom = useRef<number>(13);
  const ZOOM_LIMIT = 11;
  // centrage sur montpellier au lancement de la carte, en prod, centrer sur ? paris ?
  let latitude = 43.6134409138;
  let longitude = 3.868516579;
  const [centerPosition, setCenterPosition] = useState<any>({
    latitude: latitude,
    longitude: longitude,
  });
  
  const handleMarkerClick = (c: ICommuneAug) => {
    // Gérer le clic sur le marqueur ici
    //console.log('Marqueur cliqué:', c);
    props.cbHandleMarkerClick(c);
  };

  useEffect(() => {
    //console.log("composant map : communes :", props.communes);
    if (Object.keys(props.selectedCommune).length > 0) {
      const position = {
        latitude: props.selectedCommune.latitude,
        longitude: props.selectedCommune.longitude,
      };
      setCenterPosition(position);
    }
  }, [props.selectedCommune]);

  function UpdateBounds() {
    const map = useMap();
    //setZoom(map.getZoom());
    zoom.current = map.getZoom();
    //console.log('zoom : ', zoom.current);
    useEffect(() => {
      const bounds = map.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      //console.log('SW : ', mapBounds?.getSouthWest());
      const oldSouthWest = mapBounds?.getSouthWest();
      const oldNorthEast = mapBounds?.getNorthEast();
      // appeler que si les bounds ont varié de plus de delta
      const delta = 0.001;
      if (
        mapBounds === null ||
        (mapBounds !== null &&
          oldSouthWest?.lat !== undefined &&
          oldSouthWest?.lng !== undefined &&
          oldNorthEast?.lat !== undefined &&
          oldNorthEast?.lng !== undefined &&
          Math.abs(oldSouthWest?.lat - southWest.lat) > delta &&
          Math.abs(oldSouthWest?.lng - southWest.lng) > delta &&
          Math.abs(oldNorthEast?.lat - northEast.lat) > delta &&
          Math.abs(oldNorthEast?.lng - northEast.lng) > delta &&
          zoom.current >= ZOOM_LIMIT)
      ) {
        props.cbUpdateCommuneArray(southWest, northEast);
        setMapBounds(bounds);
      }
    }, []);

    return null;
  }

  async function askGeoLocationAndSetMapPosition() {
    function success(position: any) {
      //doSomething(position.coords.latitude, position.coords.longitude);
      let newLatitude = position.coords.latitude;
      let newLongitude = position.coords.longitude;
      //console.log('pos : lat :', newLatitude, ' long :', newLongitude)
      setCenterPosition({
        latitude: newLatitude,
        longitude: newLongitude,
      });
      props.cbResetSelectedCommune();
    }

    function error() {
      alert("Pas de position accessible !");
    }
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };

    const watchID = navigator.geolocation.getCurrentPosition(
      success,
      error,
      options
    );
  }

  /**
   * centre la carte sur center
   * @param param0
   * @returns
   */
  function ChangeView({ center }: any) {
    const map = useMap();
    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
  }

  /**
   * met à jour centerPosition quand la carte est modifiée
   * @returns
   */
  function UpdateMap() {
    const map = useMap();
    useMapEvents({
      moveend: () => {
        const newCenter = map.getCenter();
        const delta = 0.001;
        if (
          Math.abs(newCenter.lat - centerPosition.latitude) > delta ||
          Math.abs(newCenter.lng - centerPosition.longitude) > delta
        ) {
          setCenterPosition({
            latitude: newCenter.lat,
            longitude: newCenter.lng,
          });
        }
      },
    });
    return null;
  }

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <MapContainer
        id="map"
        center={[centerPosition.latitude, centerPosition.longitude]}
        zoom={zoom.current}
        minZoom={ZOOM_LIMIT-3}
        scrollWheelZoom={true}
      >
        <UpdateBounds />
        <UpdateMap />
        <ChangeView
          center={[centerPosition.latitude, centerPosition.longitude]}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {props.selectedCommune &&
          props.selectedCommune.latitude !== undefined &&
          props.selectedCommune.longitude !== undefined && (
            <>
              <CircleMarker
                center={[
                  props.selectedCommune.latitude,
                  props.selectedCommune.longitude,
                ]}
                radius={10}
                color="red"
              ></CircleMarker>
            </>
          )}

        {zoom.current >= ZOOM_LIMIT && props.communes.map((c: ICommuneAug) => {
          return (
            <Marker
              key={c.id}
              position={[c.latitude, c.longitude]}
              eventHandlers={{ click: () => handleMarkerClick(c) }}
            ></Marker>
          );
        })}
      </MapContainer>
      <button
        type="button"
        className="btn-map mt-3"
        onClick={askGeoLocationAndSetMapPosition}
      >
        Centrer sur votre position
      </button>
    </div>
  );
}
export default Map;

/**
              <Popup
                position={[
                  props.selectedCommune.latitude,
                  props.selectedCommune.longitude,
                ]}
              >
                <span>{props.selectedCommune.nom_commune}</span>
                <br />
                <span>{props.selectedCommune.code_postal}</span>
              </Popup>
 */
