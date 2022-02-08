import React, { Component, createRef } from "react";
import { YMaps, Map, ZoomControl, GeolocationControl, Button, Placemark } from "react-yandex-maps";
import { useLocation } from 'react-router-dom'

class Details extends Component {
    constructor(props) {
        super(props);
        console.dir(props);
        this.map = createRef(null);
    }

    render(){

        const map = this.map;
        const mapState = {
            center: [this.props.coordinates.latitude, this.props.coordinates.longitude], // Current location
            zoom: 15
        };


        const addRoute = (ymaps) => {
            const startLocation = mapState.center; // Starter location
            const targetLocation = [38.388172, 27.043853]; // Target location
        
            const multiRoute = new ymaps.multiRouter.MultiRoute(
              {
                referencePoints: [startLocation, targetLocation],
                params: {
                  routingMode: "pedestrian",
                  /*
                    "auto" - Driving route.
                    "masstransit" - Routing using public transport.
                    "pedestrian" - Walking route.
                    "bicycle" - Bicycle route.
                  */
                  avoidTrafficJams: true,
                  boundedBy: '14',
                  results: 2
                }
              },
              {
                editorDrawOver: true,
                wayPointDraggable: true,
                viaPointDraggable: true,
                // Setting a custom design for multi-route lines.
                routeStrokeColor: "5A36FF",
                routeActiveStrokeColor: "5A36FF",
                pinIconFillColor: "5A36FF",
                boundsAutoApply: true,
                zoomMargin: 100
              }
            );
        
            map.current.geoObjects.add(multiRoute);
        
            // Once multi-route is loaded.
            multiRoute.events.once('update', function () {
              // Set first non-blocked route as active and open it's balloon.
              var routes = multiRoute.getRoutes();
              for (var i = 0, l = routes.getLength(); i < l; i++) {
                  var route = routes.get(i);
                  if (!route.properties.get('blocked')) {
                      multiRoute.setActiveRoute(route);
                      route.balloon.open();
                      break;
                  }
              }
            });
        };

        return (
            <>
                {console.log(this.props)}
                <div className="w-screen h-screen relative calculated">
                    <div className="absolute hidden">
                        <h1>M Blok</h1>
                    </div>
                    <div className="map">
                        <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS_API, lang: process.env.REACT_APP_YANDEX_MAPS_LANG }}>
                        {/* <Panorama className="h-screen w-screen" defaultPoint={[38.388292, 27.045488]} /> */}
                            <Map
                                className="h-screen w-screen calculated"
                                modules={["multiRouter.MultiRoute"]}
                                state={mapState}
                                instanceRef={map}
                                onLoad={addRoute}
                            >
                                <ZoomControl options={{ float: 'right' }} />
                                <GeolocationControl options={{ float: 'left' }} />
                                <Button
                                    options={{ maxWidth: 128 }}
                                    data={{ content: 'Demo Button' }}
                                    defaultState={{ selected: false }}
                                />
                                {/* <Placemark geometry={mapState.center} /> */}
                            </Map>
                        </YMaps>
                    </div>
                </div>
            </>
        );
    }
}

export default Details
