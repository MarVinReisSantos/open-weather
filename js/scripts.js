//Variáveis e seleção de elementos
const apiKey = "3d5b7ab9ddad437f4e3c16d0a3485067";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const mensagemErroElement = document.querySelector("#error");
const loadingElement = document.querySelector("#loading");

// Funções
const mostrarMensagemErro = () =>{
  weatherContainer.classList.add("hide");
  mensagemErroElement.classList.remove("hide");
}

const getWeatherData = async(city) =>{
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;
  const res = await fetch(apiWeatherURL);

  if(!res.ok){
    mostrarMensagemErro();
    return -1;
  }else{
    mensagemErroElement.classList.add("hide");
  }

  const data = await res.json();

  return data;
}

const loading = async (boleano) =>{

  if(boleano){
    mensagemErroElement.classList.add("hide");
  }
  weatherContainer.classList.add("hide");
  loadingElement.classList.toggle('hide');
}

const showWeatherData = async (city) => {

  loading(true);
  const data = await getWeatherData(city);
  loading(false);

  if(data == -1){
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  humidityElement.innerText = `${data.main.humidity}%`

  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
}

//Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  
  showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) =>{

  if(e.code === "Enter"){
    const city = e.target.value;

    showWeatherData(city);
  }
})