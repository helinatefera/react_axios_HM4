import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function App() {
  let [text, setText] = useState("");
  let [t, setT] = useState(null);
  let [icon, setIcon] = useState("CLEAR_DAY");

  const weatherIconMapping = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Snow: "SNOW",
    Thunderstorm: "WIND",
    Drizzle: "SLEET",
    Mist: "FOG",
  };

  function showT(response) {
    setT(response.data);
    const weatherMain = response.data.weather[0].main;
    setIcon(weatherIconMapping[weatherMain] || "CLEAR_DAY");
  }

  function capitalizeAllLetters(string) {
    return string.toUpperCase();
  }

  useEffect(() => {
    const icons = ["CLEAR_DAY", "CLEAR_NIGHT", "PARTLY_CLOUDY_DAY", "PARTLY_CLOUDY_NIGHT", "CLOUDY", "RAIN", "SLEET", "SNOW", "WIND", "FOG"];
    if (icons.includes(icon)) {
      setIcon(icon);
    }
  }, [icon]);

  const defaults = {
    icon: capitalizeAllLetters(icon),
    color: "black",
    size: 100,
    animate: true,
  };

  function handle(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=281450ec88936f4fa8ee9864682b49a0&units=metric`;
    axios.get(url).then(showT).catch(error => {
      console.error("There was an error fetching the weather data:", error);
      alert("City not found or API error occurred.");
    });
  }

  function updateT(event) {
    setText(event.target.value);
  }

  return (
    <div className="App">
      <div className="whole">
        <div className="header">
          <img src="https://www.weather.shecodes.io/images/logo.png" width="150px" alt='' /><br /><br />
          <form onSubmit={handle} className="form">
            <div className="input">
              <input type="text" name="city" id="city" placeholder="Enter a city.." onChange={updateT} />
              <input type="submit" value="Search" className="button" />
            </div>
          </form>
        </div>
        <div className="middel">
          <div className="left">
            <h1>{text}</h1>
            <p className="dis">Friday 13:05, scattered clouds<br />
              Humidity: <span>{t && t.main.humidity}%</span>, Wind: <span>{t && t.wind.speed}km/h</span></p>
          </div>
          <div className="right">
            <h1>
              <ReactAnimatedWeather
                icon={defaults.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              {t && t.main.temp}°C
            </h1>
          </div>
        </div>

        <div className="lists">
            <div className="list">
                <p className="day">Sat</p>
                <h1>🌤️</h1>
                <p className="p">12°<span>7°</span></p>
            </div>
            <div className="list">
                <p className="day">Sun</p>
                <h1>🌥️</h1>
                <p className="p">12°<span>7°</span></p>
            </div>
            <div className="list">
                <p className="day">Mon</p>
                <h1>☀️</h1>
                <p className="p">12°<span>7°</span></p>
            </div>
            <div className="list">
                <p className="day">Tue</p>
                <h1>🌥️</h1>
                <p className="p">12°<span>7°</span></p>
            </div>
            <div className="list">
                <p className="day">Wen</p>
                <h1>☀️</h1>
                <p className="p">12°<span>7°</span></p>
            </div>
        </div>
        <div>
          <p className="footer">This project was coded by <a href="https://github.com/helinatefera/react_axios_HM4">Helina Tefera</a> and is <a href="https://main--gleeful-wisp-7bad2f.netlify.app/">hosted on Netlify</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
