const API_KEY = '90a8c52ec80ddc1515b605a63fc70a79';
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.querySelector('.weather-card');
const errorMsg = document.getElementById('error-msg');

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`);
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Chave API inválida ou não ativada');
            } else if (response.status === 404) {
                throw new Error('Cidade não encontrada!');
            } else {
                throw new Error(`Erro: ${response.status}`);
            }
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Erro na requisição:', error);
        errorMsg.textContent = error.message;
        errorMsg.classList.remove('hidden');
        weatherCard.classList.add('hidden');
    }
}

function updateWeatherUI(data) {
    const temperature = document.querySelector('.temperature');
    const weatherDesc = document.querySelector('.description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherIcon = document.getElementById('weather-icon');

    temperature.textContent = `${Math.round(data.main.temp)}°C ${data.name}`;
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].main;

    weatherCard.classList.remove('hidden');
    errorMsg.classList.add('hidden');
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    console.log('Search button clicked');
    const city = cityInput.value.trim();
    if (city) {
        console.log('Fetching weather for:', city);
        getWeatherData(city);
    } else {
        console.log('No city entered');
    }
});

// Event listener for Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});
    
