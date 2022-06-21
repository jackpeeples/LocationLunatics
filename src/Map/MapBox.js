import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DEFAULT_ZOOM, TOKEN, URL } from './tools/constants';
import PinControl from './PinControl';
import geoJson from './tools/geoJson.json'; //TEMP need to get data from API
import _ from 'lodash';


const MapBox = () => {
    const [data, setData] = useState({
        'type': 'FeatureCollection',
        'locations': [],
    });
    const [popupInfo, setPopupInfo] = useState(null);
    
    const pins = useMemo(
        () => {
            return data?.locations?.map((area, index) => {
                return (
                    <Marker
                        key={`marker-${index}`}
                        longitude={area.geometry.coordinates[0]}
                        latitude={area.geometry.coordinates[1]}
                        anchor="bottom"
                        onClick={e => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(area);
                            onPinClickSorting(area);
                        }}
                    >
                        <PinControl area={area}/>
                    </Marker>);
            });
        }, [data]
    );
    
    const onPinClickSorting = (area) => {
        let filtered = _.filter(data.locations, (item) => {
            return item.properties['zone_group_id'] === area.properties['zone_group_id'];
        });
        setData({
            'type': 'FeatureCollection',
            'locations': [
                ...filtered
            ],
        });
    };
    
    const fetchData = () => {
        fetch(URL)
        .then(response => {
            console.log("RESPONSE", response)
            return response;
        })
        .then(response => response.json())
        .then(data => setData(data))
    }
    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <Fragment>
            <Map
                style={{
                    width: '100%',
                    height: '100vh'
                }}
                initialViewState={{
                    latitude: 33.753746,
                    longitude: -84.386330,
                    zoom: DEFAULT_ZOOM,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={TOKEN}
            >
                <GeolocateControl position="top-left"/>
                <FullscreenControl position="top-left"/>
                <NavigationControl position="top-left"/>
                <ScaleControl/>
                
                {pins}
                
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.geometry.coordinates[0])}
                        latitude={Number(popupInfo.geometry.coordinates[1])}
                        onClose={() => {
                            setPopupInfo(null);
                            fetchData();
                        }}
                    >
                        <div>
                        <div>
              <b style={{ fontWeight: 900 }}>Main Street:</b>{" "}
              {popupInfo.properties["main_street"]},{" "}
            </div>
            <div>
              <b style={{ fontWeight: 900 }}>Cross Street:</b>{" "}
              {popupInfo.properties["cross_street"]}
            </div>
            <div>
              <b style={{ fontWeight: 900 }}>Lattitude:</b>{" "}
              {popupInfo.properties["lat"]},{" "}
              <div>
                <b style={{ fontWeight: 900 }}>Longitude:</b>{" "}
                {popupInfo.properties["lon"]}
              </div>
              <div>
                <b style={{ fontWeight: 900 }}>Space Count:</b>{" "}
                {popupInfo.properties["space_count"]},{" "}
              </div>
              <div>
                <b style={{ fontWeight: 900 }}>Meter Type:</b>{" "}
                {popupInfo.properties["meter_type"]},{" "}
              </div>
              <div>
                <b style={{ fontWeight: 900 }}>Enforment Type:</b>{" "}
                {popupInfo.properties["enforcement_type"]} |{" "}
              </div>
            </div>
            <a href="http://localhost:3000/manage/policies/rates/1552">
              <button>Edit Rate</button>
            </a>
                        </div>
                    </Popup>
                )}
            </Map>
        </Fragment>
    );
};

export default MapBox;
