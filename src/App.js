import './App.css';
import { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";


function App() {
  let [text, setText] = useState(null);
  let [t, setT] = useState(null);
  let [icon, setIcon] = useState("RAIN");
  let [week , setWeek] = useState(null);
  let [lat , setLat] = useState(null);
  let [lon , setLon] = useState(null);
  function showT(response) {
    setT(response.data);
    setIcon(response.data.weather[0].main);
    console.log(response.data,lat,lon);
    console.log("----------------------------")
    console.log( capitalizeAllLetters(icon))
  }
  function capitalizeAllLetters(string) {
    return string.toUpperCase();
  }
  const icons = ["CLEAR_DAY","CLEAR_NIGHT","PARTLY_CLOUDY_DAY","PARTLY_CLOUDY_NIGHT","CLOUDY","RAIN","SLEET","SNOW","WIND","FOG"]
  if (icons.includes(icon)) {
    setIcon(icon);
  }
  const defaults = {
    icon: capitalizeAllLetters(icon),
    color: "black",
    size: 100,
    animate: true,
  };
  function handle(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=281450ec88936f4fa8ee9864682b49a0&units=metric`;
    axios.get(url).then(showT);
  }
  function updateT(event) {
    setText(event.target.value);
  } 
  return (
    <div className="App">
      <div className="whole">
        <div className="header">
            <img src="https://www.weather.shecodes.io/images/logo.png" width="150px"/><br/><br/>
            <form onSubmit={handle} className="form">
                <div className="input">
                    <input type="text" name="city" id="city" placeholder="Enter a city.." onChange={updateT}/>
                    <input type="submit" value="Search" className="button"/>
                </div>
            </form>
        </div>
        <div className="middel">
            <div className="left">
                <h1>{text}</h1>
                <p className="dis">Friday 13:05, scattered clouds<br/>
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
            <p className="footer">This project was coded by <a href="#">SheCodes</a> and is <a href="#">open-sourced on GitHub</a> and <a href="#">hosted on Netlify</a></p>
        </div>
    </div>
    </div>
  );
}

export default App;
