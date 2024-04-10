function fetchWeatherData() {
    const locationInput = document.getElementById('location-value').value.trim();
    const weatherLocation = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const API_URL = "https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0";

    if (locationInput === '') {
        alert('Please enter location');
        return;
    }

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const weatherData = data.dataseries[1];
            console.log(weatherData);
            console.log(weatherData.seeing);
            weatherLocation.textContent = "Location: " + locationInput;
            temperature.textContent = `${"Temperature: " + weatherData.temp2m}°C`;
            description.textContent = "Description: " + weatherData.prec_type;
        })
        .catch(error => console.log(error));
}

// Event listener for button click
document.getElementById('btn').addEventListener('click', fetchWeatherData);

