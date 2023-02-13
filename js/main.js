const ipInput = document.getElementById('ipInput');
const searchArrow = document.querySelector('.search-arrow');
const infoItems = document.querySelectorAll('.info-item h4');

let map = L.map('map');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// fetching ip information 
let ipData = {};
async function getIpData(ipAddress) {
    let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_EQ0gk0klJA6fSmNVYAL5LczbXb3gU&ipAddress=${ipAddress}`);
    let result = await response.json();
    // console.log(result)
    ipData = result;
    displayIp();
}


// display ipData 
let displayIp = () => {
    let { ip, location, isp } = ipData;
    infoItems[0].innerHTML = ip;
    infoItems[1].innerHTML = location.city;
    infoItems[2].innerHTML = location.timezone;
    infoItems[3].innerHTML = isp;

    map.setView([location.lat, location.lng], 13);
    let marker = L.marker([location.lat, location.lng]).addTo(map);
    marker.bindPopup(`<b>${location.city}</b>`).openPopup();
}


getIpData('8.8.8.8') // initial value for ip to display when the website start.
searchArrow.addEventListener('click', () => {
    getIpData(ipInput.value)
    // console.log(ipInput.value)
})



