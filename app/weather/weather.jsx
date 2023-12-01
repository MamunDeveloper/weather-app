"use client";
import React, { useState } from "react";
import axios from "axios";

import styles from "./weather.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleDroplet,
  faDroplet,
  faDropletSlash,
  faHandHoldingDroplet,
  faSearch,
  faSmog,
  faTruckDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

function Weather() {
  const [gotData, setGotData] = useState(false);
  const [location, setlocation] = useState("");
  const [Location, setLocation] = useState("Location");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState("0");
  const [temp, setTemp] = useState("0");
  const [wind, setWind] = useState("0");

  const getData = async (location) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: location },
      headers: {
        "X-RapidAPI-Key": "a69321680emshfca3f78cbd26bd7p13f192jsn6df444e61f86",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const data = response.data;

      setGotData(true);
      setIcon(data.current.condition.icon);
      console.log(icon);
      setLocation(location);
      setlocation("");
      setHumidity(data.current.humidity);
      setTemp(data.current.temp_c);
      setWind(data.current.wind_kph);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_box}>
        <input
          type="text"
          name=""
          id={styles.search_inp}
          placeholder="Enter location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.search_Icon}
          onClick={() => getData(location)}
        ></FontAwesomeIcon>
      </div>

      <div className={styles.main_detail_box}>
        {gotData ? (
          <img
            className={styles.image}
            src={`https:${icon}`}
            alt={"Weather app"}
          />
        ) : (
          <FontAwesomeIcon
            className={styles.temp_image}
            icon={faSmog}
          ></FontAwesomeIcon>
        )}
        <h1>{temp} °c</h1>
        <h2>{Location}</h2>
      </div>

      <div className={styles.sub_detail_box}>
        <div className={styles.humidity_box}>
          <FontAwesomeIcon
            icon={faHandHoldingDroplet}
            className={styles.small_icons}
          ></FontAwesomeIcon>

          <p>
            {humidity}% <br /> Humidity
          </p>
        </div>

        <div className={styles.wind_box}>
          <FontAwesomeIcon
            icon={faWind}
            className={styles.small_icons}
          ></FontAwesomeIcon>

          <p>
            {wind} km/h <br /> wind speed
          </p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
