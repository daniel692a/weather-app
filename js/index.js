const apiKey = `f834c1eefc42b638fc39a60f43413a96`;
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=`;
const urlEnd = `&units=metric&lang=es&appid=${apiKey}`;

const mountNode = document.querySelector('#mount');
const buttonFetch = document.querySelector('#search');
const fetchWeather = async() => {
    try {
        const city = document.querySelector('#cityname').value;
        const response = await fetch(`${baseUrl}${city}${urlEnd}`);
        const data = await response.json();
        console.log(data);
        const container = document.createElement('div');
        const name = document.createElement('h2');
        const weather = document.createElement('p');
        const temperature = document.createElement('p');
        container.className = 'city';
        temperature.textContent = `${data.main.temp} °C`;
        weather.textContent = `${data.weather[0].description}`;
        name.textContent = `${data.name} - ${data.sys.country}`;
        container.append(name, temperature, weather);
        mountNode.appendChild(container);
    } catch (error) {
        const notFound = document.createElement('h3');
        notFound.textContent = 'Not Found';
        notFound.className = 'error';
        mountNode.appendChild(notFound);
    }
}

buttonFetch.addEventListener('click', fetchWeather);