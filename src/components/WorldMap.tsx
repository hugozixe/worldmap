'use client'

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJsonObject } from "geojson";

interface FeatureProperties {
  ADMIN: string;
  alertLevel?: number;
}

interface Feature {
  properties: FeatureProperties;
}

const WorldMap: React.FC = () => {
  const [countries, setCountries] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    // GeoJSON 데이터를 불러옵니다.
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    )
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);



  // 여행 경보 레벨에 따른 색상을 정의합니다.
  const getColor = (alertLevel?: number): string => {
    switch (alertLevel) {
      case 1:
        return "#00FF00"; // 녹색 (안전)
      case 2:
        return "#FFFF00"; // 노란색 (주의)
      case 3:
        return "#FFA500"; // 주황색 (경계)
      case 4:
        return "#FF0000"; // 빨간색 (위험)
      default:
        return "#CCCCCC"; // 회색 (정보 없음)
    }
  };

  // GeoJSON 스타일을 정의합니다.
  const style = (feature: any) => {
    return {
      fillColor: getColor(feature.properties.alertLevel),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries && (
        <GeoJSON
          data={countries}
          style={style}
          onEachFeature={(feature: any, layer: any) => {
            layer.bindPopup(
              `${feature.properties.ADMIN}: Alert Level ${
                feature.properties.alertLevel || "N/A"
              }`
            );
          }}
        />
      )}
    </MapContainer>
  );
};

export default WorldMap;
