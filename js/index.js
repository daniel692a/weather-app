const apiKey = `f834c1eefc42b638fc39a60f43413a96`;
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=`;
const urlEnd = `&units=metric&lang=es&appid=${apiKey}`;
//Nodes
const mountNode = document.querySelector('#mount');
const buttonFetch = document.querySelector('#search');

const container = document.createElement('section');
const name = document.createElement('h2');
const weather = document.createElement('p');
const temperature = document.createElement('p');
const iconContainer = document.createElement('figure');
const icon = document.createElement('img');

const fetchWeather = async() => {
    try {
        mountNode.innerHTML="";
        const city = document.querySelector('#cityname').value;
        //Consume API
        const response = await fetch(`${baseUrl}${city}${urlEnd}`);
        const data = await response.json();
        //Nodes values and attributes
        container.className = 'city';
        iconContainer.appendChild(icon);
        iconContainer.className = 'figure-img';
        temperature.textContent = `${data.main.temp} °C`;
        weather.textContent = `${data.weather[0].description}`;
        const forecast = data.weather[0].description;
        icon.alt = forecast;
        if(forecast === 'cielo claro'){
            icon.src = './assets/soleado.svg';
        } else if (forecast === 'muy nuboso'){
            icon.src = './assets/dia-nublado.svg';
        } else if (forecast === 'lluvia ligera'){
            icon.src = './assets/lluvioso.svg';
        } else {
            icon.src = './assets/ventoso.svg';
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