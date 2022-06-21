import * as React from 'react';
import { Fragment } from 'react';

const PinControl = ({ area }) => {
    return (
        
        <Fragment>
            <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom">
                <div className="mapboxgl-popup-tip"
                    style={{
                        borderTopColor: 'black'
                    }}
                ></div>
                <div className="mapboxgl-popup-content" style={{
                    backgroundColor: 'black'
                }}>
                    <div><span style={{
                        color: 'white'
                    }}>{area.properties['pm_zone_code']}</span></div>
                </div>
            </div>
        </Fragment>
    );
    
};

export default React.memo(PinControl);
