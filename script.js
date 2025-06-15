// Count up animation
const scoreElement = document.getElementById("risk-score");
let riskTarget = 78; // Example
let current = 0;
let interval = setInterval(() => {
  let step = Math.ceil((riskTarget - current) / 10);
  current += step;
  if (current >= riskTarget) {
    current = riskTarget;
    clearInterval(interval);
  }
  scoreElement.textContent = `${current}%`;
}, 50);

// Risk type selection
const buttons = document.querySelectorAll(".risk-btn");
const breakdown = document.getElementById("risk-breakdown");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    updateRiskInfo(type);
  });
});

function updateRiskInfo(type) {
  breakdown.innerHTML = `<h2>Loading ${type} data...</h2>`;

  switch (type) {
    case "climate":
      fetch("https://climate-api.open-meteo.com/v1/climate?latitude=50&longitude=10&start=1991&end=2020&temperature_unit=celsius")
        .then(res => res.json())
        .then(data => {
          breakdown.innerHTML = `<h2>Climate</h2><p>Sample Temp Anomaly: ${data.temperature_2m_mean_anomaly?.[0]?.value ?? "N/A"} °C</p>`;
        });
      break;
    case "natural":
      fetch("https://eonet.gsfc.nasa.gov/api/v3/events")
        .then(res => res.json())
        .then(data => {
          breakdown.innerHTML = `<h2>Natural Disasters</h2><p>Active Events: ${data.events.length}</p>`;
        });
      break;
    case "pandemic":
      fetch("https://ghoapi.azureedge.net/api/Indicator")
        .then(res => res.json())
        .then(data => {
          breakdown.innerHTML = `<h2>Pandemics</h2><p>Total Indicators: ${data.value.length}</p>`;
        });
      break;
    case "nuclear":
    case "cyber":
    case "ai":
    case "governance":
    default:
      breakdown.innerHTML = `<h2>${type}</h2><p>Live data not yet connected.</p>`;
  }
}
