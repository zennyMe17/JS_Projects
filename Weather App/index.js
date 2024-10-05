// console.log("Weather App");

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

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geoLocation supported");
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    console.log(latitude);
    console.log(longitude);
  }
    
