import React, { Fragment, useEffect, useRef, useState } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapboxgl from 'mapbox-gl';
// import { updateToolTip } from './tools/helper';
import { DEFAULT_ZOOM, MAP_OFFSET, TOKEN } from './tools/constants';

const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-84.55106806, 33.64780797]
            },
            properties: {
                'description': 'PLACE 1',
                'title': 'title 1',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-84.56, 33.7]
            },
            properties: {
                'description': 'PLACE 3',
                'title': 'title 3',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-84.56, 33.756]
            },
            properties: {
                'description': 'PLACE 3',
                'title': 'title 3',
            },
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-84.9, 33.0]
            },
            properties: {
                'description': 'PALCE2',
                'title': 'title 2',
            },
        }
    ]
};

const Map = () => {
    const setMapStyle = isSatelliteView => `mapbox://styles/mapbox/${isSatelliteView ? 'satellite-v9' : 'streets-v10'}`;
    
    const [mapIsLoaded, setMapIsLoaded] = useState(false);
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const map = mapRef.current;
    const draw = useRef(null);
    const tooltipRef = useRef(null);
    const tooltip = tooltipRef.current;
    const [mode, setMode] = useState('simple_select');
    
    const [mapParams, setMapParams] = useState({
        height: window.innerHeight - MAP_OFFSET,
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
        mapboxgl.accessToken = TOKEN;
        
        const map = (mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: setMapStyle(mapParams.satelliteView),
            center: mapParams.mapCenter,
            zoom: mapParams.mapZooom,
            bounds: mapParams.mapBounds,
        }));
        
        map.on('load', () => {
            setMapIsLoaded(true);
            map.addSource('pin', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.addLayer({
                id: 'pins',
                source: 'pin',
                type: 'symbol',
            });
            map.setLayoutProperty('pins', 'icon-allow-overlap', false);
        });
        
        const mapDraw = (draw.current = new MapboxDraw({
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
        return () => {
            setMapIsLoaded(false);
        };
    }, []);
    
    useEffect(() => {
        if (mapIsLoaded) {
            
            map.getSource('pin') &&
            map.getSource('pin').setData(geojson);
            
            for (const feature of geojson.features) {
                const el = document.createElement('div');
                el.className = 'marker';
                new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                    )
                )
                .addTo(map);
            }
        }
        
    }, [geojson && geojson.features.length && mapIsLoaded]);
    
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
                // onMouseMove={e =>
                //     // updateToolTip(tooltipRef, e.clientX, e.clientY - 53, true)
                // }
                ref={mapContainer}
            />
        </Fragment>
    );
};

export default Map;
