// Import required modules
import { loadCSVData } from "./modules/dataLoader.js";
import { setupChart } from "./modules/chartSetup.js";
import { setupControls } from "./modules/controls.js";
import { PatternFinder } from "./modules/patternFinder.js";

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load CSV data
    // const data = await loadCSVData("BTCUSDT_1H_2024.csv");
    const data = await loadCSVData(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vToLEV_Xj5WpglutQbZmFIUeRqQQH81_91hcDV-xKBy5---7A4OTCAw1c9iS3USTpZDBVIO1TLZX8vQ/pub?output=csv"
    );

    // Initialize pattern finder
    const patternFinder = new PatternFinder(data);

    // Setup chart
    const chart = setupChart();

    // Setup controls and link them to pattern finder and chart
    setupControls(patternFinder, chart);
  } catch (error) {
    console.error("Error initializing application:", error);
    alert("Error loading application. Please check console for details.");
  }
});
