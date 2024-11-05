let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let api_key = '3a2db0c6f26b5d5b0a28ac3bfdad2e24';
let menosKelvin = 273.15;

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value;
    if (ciudad) {
        fetchDatosClima(ciudad);
    }
});

function fetchDatosClima(ciudad) {
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima');
            }
            return response.json();
        })
        .then(data => {
            mostrarDatosClima(data);  // Llamada para mostrar los datos en la interfaz
        })
        .catch(error => {
            console.error('Error en la petición:', error);
            // Puedes agregar aquí un mensaje de error en el DOM si lo deseas
        });
};

function mostrarDatosClima(data) {
  
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = '';  // Limpiar el contenido anterior

    const ciudadNombre = data.name;
    const pais = data.sys.country;
    const temperatura = data.main.temp;
    const description = data.weather[0].description;
    const humedad = data.main.humidity;
    const icono = data.weather[0].icon;

    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${ciudadNombre}, ${(pais)}`;

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - menosKelvin)}°C`;

    const iconoInfo = document.createElement('img');
    iconoInfo.src = ` https://openweathermap.org/img/wn/${icono}.png`


    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `La humedad es : ${humedad}%`;

    const descriptionInfo = document.createElement('p');  
    descriptionInfo.textContent = `La descripción meteorológica es: ${description}`;

    divDatosClima.appendChild(ciudadTitulo);
    divDatosClima.appendChild(temperaturaInfo);
    divDatosClima.appendChild(humedadInfo);
    divDatosClima.appendChild(descriptionInfo);
    divDatosClima.appendChild(iconoInfo);
    
};

