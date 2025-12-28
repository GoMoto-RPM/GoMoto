const map = L.map("map").setView([39.4699, -0.3763], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

fetch("routes.json")
  .then(response => response.json())
  .then(routes => {
    const routesDiv = document.getElementById("routes");

    routes.forEach(route => {
      L.marker(route.start).addTo(map)
        .bindPopup(route.name);

      const div = document.createElement("div");
      div.className = "route";
      div.innerHTML = `
        <h3>${route.name}</h3>
        <p>${route.km} km</p>
        <button onclick="navigate(${route.end[0]}, ${route.end[1]})">
          Navegar
        </button>
      `;
      routesDiv.appendChild(div);
    });
  });

function navigate(lat, lng) {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    "_blank"
  );
}
