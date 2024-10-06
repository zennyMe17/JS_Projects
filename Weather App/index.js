//{// console.log("Weather App");

// const API_KEY = "168771779c71f3d64106d8a88376808a";

// function renderWeatherInfo(data){
//     let meraPara = document.createElement('p');
//     meraPara.textContent = `${data?.main?.temp.toFixed(2)} C`
//     document.body.appendChild(meraPara);
// }

// async function  fetchWeatherDetail(){
//     try{
//         let city = "goa";


//     const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );

//     const data = await response.json();
//     console.log("Weather data:-> ",data);

//     renderWeatherInfo(data);


//     }
//     catch(e){
//         console.log("API request failed",e);
//     }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("No geoLocation supported");
//     }
// }

// function showPosition(position) {
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;

//     console.log(latitude);
//     console.log(longitude);
//   }
//}
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");

const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-loctaion-container")
const searchForm = document.querySelector(".form-container");

const loadingScreen = document.querySelector(".loading-container");

const userInfoContainer = document.querySelector(".user-info-container");

let currentTab = userTab;

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");

getFromSessionStorage();


function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        //search tab
        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }

        //your tab
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}

function getFromSessionStorage(){
    const localCordinates = sessionStorage.getItem("user-coordinates");
    if(!localCordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(cordinates){
    const {lat, lon} = cordinates;
    // make grant-container invisble
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        loadingScreen.classList.remove("active");

        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);

    }
    catch(e){
        loadingScreen.classList.remove("active");

    }
}


function renderWeatherInfo(weatherInfo){

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;




}

userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})

const grantAccessButton = document.querySelector("[data-grantAccess]");

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);//call back function
    }
    else{

    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

grantAccessButton.addEventListener("click",getLocation());

const searchInput = document.querySelector("[data-serachinput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let city = searchInput.value;

    if (city === "")
        return;
    else
        fetchSearchWeatheerInfo(city);
})


async function fetchSearchWeatheerInfo(city){

    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(e){}
    
}