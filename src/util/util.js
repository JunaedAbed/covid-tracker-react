import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrint = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

const casesTypeColors = {
  cases: {
    hex: "#0E8BE2",
    multiplier: 400,
  },
  recovered: {
    hex: "#12DA46",
    multiplier: 500,
  },
  deaths: {
    hex: "#D50000",
    multiplier: 2000,
  },
};

//draw circles
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">
            <strong>{country.country}</strong>
          </div>
          <div className="info-cases">
            <strong>Cases: </strong>
            {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            <strong>Recovered: </strong>
            {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            <strong>Deaths: </strong>
            {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
