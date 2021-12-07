const citySearch = document.querySelector('form'); 
const weatherdata = document.querySelector('.weather-details');
const timeImage = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) =>{
   const city = data.cityName;
   const weather =  data.weatherDa;

    const html = `
        <h4 class="my-4">${city.EnglishName}</h4>
        <h4 class="my-4">${weather.WeatherText}</h4> 
        <div class="display-3 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>    
    `
    weatherdata.innerHTML = html;

    
    if(weather.IsDayTime){
        timeImage.setAttribute('src', "day.svg")
    }else{
        timeImage.setAttribute('src', "night.svg")
    }

    const weatherIcon = `./img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", weatherIcon);
    console.log('adsadadas  ',weatherIcon);
}

const getData = async (city) =>{
    console.log(city);
     const cityName = await  searchCity(city);
     const weatherDa = await getWeather(cityName.Key)
   
     return{
         cityName,
         weatherDa,
     }
    
}

citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = citySearch.city.value.trim();
    citySearch.reset();
    
    getData(city)
        .then((data) =>{
            updateUI(data);
            console.log(data);
        })
        .catch((err)=>{console.log(err);})
        
})