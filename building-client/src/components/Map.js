import React, { Component } from "react";
import L from "leaflet";
import "leaflet-draw";

class Map extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // create map

    this.createMap();
  }
  createMap() {
    // center of the map
    let center = [60, 10];

    // Create the map
    let map = L.map("leafletmap").setView(center, 6);

    // Set up the OSM layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    // Initialise the FeatureGroup to store editable layers
    let editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    let drawPluginOptions = {
      position: "topright",
      draw: {
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: "#e1e100", // Color the shape will turn when intersects
            message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
          },
          shapeOptions: {
            color: "#97009c"
          }
        },
        // disable toolbar item by setting it to false
        polyline: false,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        circlemarker: false
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: true
      }
    };

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    let drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, e => {
      let type = e.layerType,
        layer = e.layer;

      if (type === "polygon") {
        let wkt_poly = this.leafletLayerToWkt(layer);
        console.log(wkt_poly);
      }
      editableLayers.addLayer(layer);
    });
    map.on(L.Draw.Event.DELETESTART, e => {
      console.log("delete");
    });
  }

  leafletLayerToWkt(layer) {
    let lng,lat,coords = [];
    if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
      let latlngs = layer.getLatLngs();
      for (let i = 0; i < latlngs.length; i++) {
        let latlngs1 = latlngs[i];
        if (latlngs1.length) {
          for (let j = 0; j < latlngs1.length; j++) {
            coords.push(latlngs1[j].lng + " " + latlngs1[j].lat);
            if (j === 0) {
              lng = latlngs1[j].lng;
              lat = latlngs1[j].lat;
            }
          }
        } else {
          coords.push(latlngs[i].lng + " " + latlngs[i].lat);
          if (i === 0) {
            lng = latlngs[i].lng;
            lat = latlngs[i].lat;
          }
        }
      }
      if (layer instanceof L.Polygon) {
        return "POLYGON((" + coords.join(",") + "," + lng + " " + lat + "))";
      } else if (layer instanceof L.Polyline) {
        return "LINESTRING(" + coords.join(",") + ")";
      }
    } else if (layer instanceof L.Marker) {
      return (
        "POINT(" + layer.getLatLng().lng + " " + layer.getLatLng().lat + ")"
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="leafletmap" style={{ width: "80%", height: "500px" }} />
      </React.Fragment>
    );
  }
}
export default Map;
