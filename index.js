window.addEventListener('load', function(){
    const CORS_PROXY = `https://corsproxy.io/?`;
    const BASE_API_URL = `${CORS_PROXY}https://api.open-meteo.com/v1`;
    const GEOCODING_API_URL = `${CORS_PROXY}https://geocoding-api.open-meteo.com/v1`;
    let forecastData = [];

    function fetchWeatherData() {
        const locationInput = document.getElementById('location-value').value.trim();
        const weatherLocation = document.getElementById('location');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const forecastList = document.getElementById('forecasts-list');

        if (locationInput === '') {
            alert('Please enter location');
            return;
        }

        fetch(`${GEOCODING_API_URL}/search?name=${encodeURIComponent(locationInput)}&count=1&language=en&format=json`)
        .then(response => response.json())
        .then(location => {

            // get longitude and latitude
            const longitude = location.results[0].longitude;
            const latitude = location.results[0].latitude;
            const timezone = location.results[0].timezone;

            // update location in HTML
            document.querySelector("#location").innerHTML = location.results[0].name + ", " + location.results[0].country;
            
            
            // fetch weather data using geocoded location
            fetch(`${BASE_API_URL}/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&hourly=temperature_2m`)
            .then(response => response.json())
            .then(data => {
                forecastList.innerHTML = ``;
                
                // clear forecasts array
                forecastData = [];

                let html = ``;

                // save data to forecast array
                for(let i = 0; i < data.hourly.time.length; i++){
                    forecastData.push({
                        time: new Date(data.hourly.time[i]),
                        temp: data.hourly.temperature_2m[i]
                    });
                }

                // map the data to html
                forecastData.map(data => {
                    html += `
                        <div>
                            <span>${formatDate(data.time)}</span>
                            <span><strong>${data.temp}&deg;C</strong></span>
                        </div>
                    `;
                });

            forecastList.innerHTML = html;



            })
            .catch(error =>  console.log(error))

        })
        .catch(error =>  console.log(error))
    }

  
    // Event listener for button click
    document.getElementById('btn').addEventListener('click', fetchWeatherData);

    

});
