export async function loadCSVData(filename) {
  try {
    const response = await fetch(filename);
    const csvText = await response.text();

    // Parse CSV data
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",");

    return lines
      .slice(1)
      .map((line) => {
        // Handle CSV parsing with quoted fields containing commas
        const values = [];
        let currentValue = "";
        let insideQuotes = false;

        for (let char of line) {
          if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === "," && !insideQuotes) {
            values.push(currentValue.trim());
            currentValue = "";
          } else if (char !== "\r") {
            // Skip carriage return
            currentValue += char;
          }
        }
        // Push the last value
        values.push(currentValue.trim());

        // Remove quotes from timestamp string
        const timestampStr = values[2].replace(/"/g, "");

        return {
          timestamp: new Date(timestampStr).getTime(),
          rsi: parseFloat(values[8]) || null,
        };
      })
      .filter((row) => row.rsi !== null);
  } catch (error) {
    console.error("Error loading CSV:", error);
    throw error;
  }
}
