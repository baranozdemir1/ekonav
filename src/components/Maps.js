import React from "react";
import { YMaps, Map } from "react-yandex-maps";

const mapState = { center: [55.76, 37.64], zoom: 9, controls: [] };

class Maps extends React.Component {
  map = null;
  ymaps = null;
  route = null;

  handleApiAvaliable = ymaps => {
    this.ymaps = ymaps;
    const balloonContentBodyLayout = ymaps.templateLayoutFactory.createClass(
      "<div>Test</div>"
    );
    ymaps
      .route(
        [
          "Королев",
          { type: "viaPoint", point: "Мытищи" },
          "Химки",
          { type: "wayPoint", point: [55.811511, 37.312518] }
        ],
        { balloonContentBodyLayout }
      )
      .then(route => {
        route.getPaths().options.set({
          // в балуне выводим только информацию о времени движения с учетом пробок
          // можно выставить настройки графики маршруту
          strokeColor: "0000ffff",
          opacity: 0.9
        });

        // добавляем маршрут на карту
        this.map.geoObjects.add(route);
      });
  };

  addRoute = () => {
    if (this.ymaps && this.map) {
      this.ymaps
        .route(["Южное Бутово", "Москва, метро Парк Культуры"], {
          multiRoute: true
        })
        .then(route => {
          this.route = route;
          this.map.geoObjects.add(route);
        });
    }
  };

  removeRoute = () => {
    if (this.map && this.route) {
      this.map.geoObjects.remove(this.route);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="layer">
          <YMaps onApiAvaliable={ymaps => this.handleApiAvaliable(ymaps)}>
            <Map
              state={mapState}
              instanceRef={ref => (this.map = ref)}
              height="100%"
              width="100%"
            />
          </YMaps>
          <button onClick={this.addRoute}>Add route</button>
          <button onClick={this.removeRoute}>Delete route</button>
        </div>
      </div>
    );
  }
}

export default Maps;