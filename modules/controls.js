export function setupControls(patternFinder, chart) {
  // Setup slider controls
  const controls = {
    windowSize: document.getElementById("windowSize"),
    stepSize: document.getElementById("stepSize"),
    plotStop: document.getElementById("plotStop"),
    startDateTime: document.getElementById("startDateTime"),
    randomPattern: document.getElementById("randomPattern"),
  };

  // Set datetime input min/max from data range
  if (patternFinder.data.length > 0) {
    const firstDate = patternFinder.data[0].timestamp;
    const lastDate =
      patternFinder.data[patternFinder.data.length - 1].timestamp;

    controls.startDateTime.min = formatLocalDateTime(firstDate);
    controls.startDateTime.max = formatLocalDateTime(lastDate);
    controls.startDateTime.value = formatLocalDateTime(firstDate);
  }

  // Update value displays
  controls.windowSize.addEventListener("input", () => {
    document.getElementById("windowSizeValue").textContent =
      controls.windowSize.value;
  });

  controls.stepSize.addEventListener("input", () => {
    document.getElementById("stepSizeValue").textContent =
      controls.stepSize.value;
  });

  controls.plotStop.addEventListener("input", () => {
    document.getElementById("plotStopValue").textContent =
      controls.plotStop.value;
  });

  function updateChartWithMatches(pattern) {
    if (!pattern) return;

    const matchingPatterns = patternFinder.findMatchingPatterns(
      pattern,
      parseInt(controls.windowSize.value),
      parseInt(controls.stepSize.value),
      parseInt(controls.plotStop.value)
    );

    updateChart(chart, pattern, matchingPatterns);
  }

  // Handle random pattern selection
  controls.randomPattern.addEventListener("click", () => {
    const pattern = patternFinder.getRandomPattern(
      parseInt(controls.windowSize.value)
    );
    updateChartWithMatches(pattern);
  });

  // Handle datetime input
  controls.startDateTime.addEventListener("change", () => {
    // Convert local datetime input to milliseconds timestamp
    const localDate = new Date(controls.startDateTime.value);
    const timestamp = localDate.getTime();

    const pattern = patternFinder.getPatternFromTimestamp(
      timestamp,
      parseInt(controls.windowSize.value)
    );
    updateChartWithMatches(pattern);
  });
}

// Format milliseconds timestamp to local datetime string for input
function formatLocalDateTime(timestamp) {
  const localDate = new Date(timestamp);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function updateChart(chart, pattern, matchingPatterns = []) {
  if (!pattern) return;

  // Clear existing datasets
  chart.data.datasets = [];

  // Add the selected pattern
  chart.data.labels = pattern.timestamps.map((t) => {
    const localDate = new Date(t);
    return localDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  });

  // Add selected pattern dataset
  chart.data.datasets.push({
    label: "Selected Pattern",
    data: pattern.values,
    borderColor: "rgb(75, 192, 192)",
    tension: 0.1,
    pointRadius: 2, // Show points for main pattern
  });

  // Add matching patterns
  matchingPatterns.forEach((match, index) => {
    chart.data.datasets.push({
      label: match.label,
      data: match.values,
      borderColor: "rgba(128, 128, 128, 0.3)", // transparent grey
      borderWidth: 1, // thinner line
      tension: 0.1,
      pointRadius: 0, // Hide points for matching patterns
      hitRadius: 0, // Disable hover interaction
      hoverRadius: 0, // Disable hover effect
    });
  });

  // Find min and max across all patterns
  const allValues = [
    ...pattern.values,
    ...matchingPatterns.flatMap((m) => m.values),
  ];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Add padding (5% of range)
  const padding = (maxValue - minValue) * 0.05;
  chart.options.scales.y.min = Math.floor(minValue - padding);
  chart.options.scales.y.max = Math.ceil(maxValue + padding);

  chart.update();
}
