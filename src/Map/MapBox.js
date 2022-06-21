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
                        <PinControl/>
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
    useEffect(() => {
        setData(geoJson);
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
                            setData(geoJson);
                        }}
                    >
                        <div>
                            {popupInfo.properties.place}, {popupInfo.properties.login} |{' '}
                            <a href='http://localhost:3000/manage/policies/rates/1552'><button>EDIT</button></a>
                        </div>
                        {/*<img width="100%" src={popupInfo?.image} alt={''}/>*/}
                    </Popup>
                )}
            </Map>
        </Fragment>
    );
};

export default MapBox;
