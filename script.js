const apiKey = '19588a43a473ec2b97e25d5758972d61';
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});
function fetchWeather(location){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Weather data not found');
              }
              return response.json();
          })
          .then(data => {
              locationElement.textContent = data.name;
              temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
              descriptionElement.textContent = data.weather[0].description;
              
          })
          .catch(error => {
              console.error('Error fetching weather data:', error);
              // Update UI to show error message
              locationElement.textContent = 'Error';
              temperatureElement.textContent = 'N/A';
              descriptionElement.textContent = 'Could not fetch weather data.';
        });
}