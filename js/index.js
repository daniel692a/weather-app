const apiKey = `f834c1eefc42b638fc39a60f43413a96`;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
const urlEnd = `&units=metric&lang=es&appid=${apiKey}`;

const mountNode = document.querySelector('#mount');
const buttonFetch = document.querySelector('#search');
const fetchWeather = async() => {
    try {
        mountNode.innerHTML="";
        const city = document.querySelector('#cityname').value;
        //Consume API
        const response = await fetch(`${baseUrl}${city}${urlEnd}`);
        const data = await response.json();

        //Nodes
        const container = document.createElement('div');
        const name = document.createElement('h2');
        const weather = document.createElement('p');
        const temperature = document.createElement('p');
        const iconContainer = document.createElement('figure');
        const icon = document.createElement('img');

        //Nodes values and attributes
        container.className = 'city';
        iconContainer.appendChild(icon);
        iconContainer.className = 'figure-img';
        temperature.textContent = `${data.main.temp} °C`;
        weather.textContent = `${data.weather[0].description}`;
        const forecast = data.weather[0].description;
        icon.alt = forecast;
        if(forecast === 'cielo claro'){
            icon.src = './js/assets/soleado.svg';
        } else if (forecast === 'muy nuboso'){
            icon.src = './js/assets/dia-nublado.svg';
        } else if (forecast === 'lluvia ligera'){
            icon.src = './js/assets/lluvioso.svg';
        } else {
            icon.src = './js/assets/ventoso.svg';
        }
        name.textContent = `${data.name} - ${data.sys.country}`;
        container.append(iconContainer, name, temperature, weather);
        mountNode.appendChild(container);
    } catch (error) {
        const notFound = document.createElement('h3');
        notFound.textContent = 'Not Found';
        notFound.className = 'error';
        mountNode.appendChild(notFound);
    }
}

buttonFetch.addEventListener('click', fetchWeather);