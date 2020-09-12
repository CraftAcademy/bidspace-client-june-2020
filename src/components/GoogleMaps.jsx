import React, { useState } from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";

const GoogleMaps = ({ listings, ...props }) => {
  const [listing, setListing] = useState([]);
  const [activeMarker, setActiveMarker] = useState({});
  const [infoWindow, setInfoWindow] = useState(false);

  const handleMarkerClick = (e, marker) => {
    setActiveMarker(marker);
    setInfoWindow(true);
  };
  return (
    <div id="google-maps">
      <Map
        initialCenter={{
          lat: 59.26752,
          lng: 18.05388,
        }}
        zoom={8}
        onReady={() => setListing(listing)}
        google={props.google}
      >
        {listings.map((listing) => (
          <Marker
            onClick={handleMarkerClick}
            title={listing.lead}
            image={listing.image}
            position={{ lat: listing.latitude, lng: listing.longitude }}
          />
        ))}
        <InfoWindow
          onClose={() => setInfoWindow(false)}
          marker={activeMarker}
          visible={infoWindow}
        >
          <div>
            <h3>{activeMarker.title}</h3>
            <Image centered size="small" src={activeMarker.image} />
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(GoogleMaps);
