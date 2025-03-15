export function setupChart() {
  const ctx = document.getElementById("patternChart").getContext("2d");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            autoSkip: true, // Show all ticks
          },
          grid: {
            display: true,
          },
        },
        y: {
          beginAtZero: false,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "RSI Pattern Analysis",
        },
      },
    },
  });

  return chart;
}
