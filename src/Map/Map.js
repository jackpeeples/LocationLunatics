import React, { Fragment, useEffect, useRef, useState } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapboxgl from 'mapbox-gl';
import { updateToolTip } from './tools/helper';
import { DEFAULT_ZOOM, MAP_OFFSET } from './tools/constants';

const Map = () => {
    const setMapStyle = isSatelliteView => `mapbox://styles/mapbox/${isSatelliteView ? 'satellite-v9' : 'streets-v10'}`;
    
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const map = mapRef.current;
    const draw = useRef(null);
    const tooltipRef = useRef(null);
    const tooltip = tooltipRef.current;
    const [mode, setMode] = useState('simple_select');
    
    const [mapParams, setMapParams] = useState({
        height: window.innerHeight - MAP_OFFSET,
        latitude: 0,
        longitude: 0,
        centered: false,
        satelliteView: false,
        satelliteViewEditMap: false,
        mapBounds: [
                [-84.55106806, 33.64780797],
                [-84.28956005, 33.88682297],
        ],
        mapCenter: [0, 0],
        mapZooom: 0,
        search: {
            latitude: 0,
            longitude: 0,
            zoom: DEFAULT_ZOOM,
        },
    });
    
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxla3NlaW9kZWdvdiIsImEiOiJjbDRtb2MwbDIwMDZ5M2ltem4xamNza21tIn0.VqukT-wh3cLv73P9ymnQSg';
        
        const map = (mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: setMapStyle(mapParams.satelliteView),
            center: mapParams.mapCenter,
            zoom: mapParams.mapZooom,
            bounds: mapParams.mapBounds,
        }));
        
        map.on('load', () => {
            map.addSource('polygon', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
        });
        
        const mapDraw = (draw.current = new MapboxDraw({
            // styles: drawStyle,
            boxSelect: false,
            touchEnabled: false,
            controls: {
                point: false,
                line_string: false,
                polygon: false,
                trash: false,
                combine_features: false,
                uncombine_features: false,
            },
            modes: MapboxDraw.modes,
        }));
        map.addControl(mapDraw);
        map.on('draw.update', e => {});
        map.on('draw.selectionchange', e => {});
        map.on('draw.create', e => {});
        map.on('draw.modechange', e => setMode(draw.current.getMode()));
        
    }, []);
    
    return (
        <Fragment>
            <div
                id="map"
                onMouseEnter={() => {
                    if (tooltip) tooltip.style.visibility = 'visible';
                }}
                onMouseOut={() => {
                    if (tooltip) tooltip.style.visibility = 'hidden';
                }}
                onMouseMove={e =>
                    updateToolTip(tooltipRef, e.clientX, e.clientY - 53, true)
                }
                ref={mapContainer}
            />
        </Fragment>
    );
};

export default Map;
