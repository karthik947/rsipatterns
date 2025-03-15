# Cryptocurrency Pattern Analysis Tool

A specialized technical analysis tool focused on identifying similar patterns in Relative Strength Index (RSI) data for cryptocurrencies. The application uses Euclidean distance algorithm to detect patterns similar to a reference pattern, providing an interactive interface for pattern exploration and analysis.

## 🚀 Features

- Interactive RSI pattern visualization and comparison
- Pattern detection using Euclidean distance algorithm
- CSV data import functionality
- Support for historical RSI data analysis
- Pattern similarity scoring and ranking
- User-friendly controls for pattern exploration
- Responsive chart interface

## 📊 Pattern Analysis Interface

### Chart Components

- **Main Chart**: Displays RSI values over time
  - Blue Line: Reference pattern (the pattern you want to find matches for)
  - Grey Lines: Similar patterns found in the historical data
  - X-axis: Time
  - Y-axis: RSI values (0-100)

### Control Parameters

1. **Window Size**

   - Defines the length of the pattern to analyze (in candles)
   - Larger windows capture longer-term patterns
   - Smaller windows focus on short-term movements

2. **Step Size**

   - Controls how many candles to skip between each pattern check
   - Smaller step size = more thorough search but slower performance
   - Larger step size = faster search but might miss some patterns

3. **Show Top**

   - Number of similar patterns to display
   - Ranks patterns by similarity score (based on Euclidean distance)
   - Lower distance = higher similarity

4. **Date Picker**
   - Select the reference pattern's start date
   - The system will analyze the pattern starting from this date
   - Pattern length is determined by the window size

### Pattern Matching Process

1. Select a start date for your reference pattern
2. Adjust window size to capture the desired pattern length
3. Set step size for search granularity
4. Choose how many similar patterns to display
5. The system calculates Euclidean distances and displays matching patterns

## 🛠️ Technology Stack

- **Frontend Framework**:

  - Vanilla JavaScript (ES6+)
  - HTML5/CSS3
  - Modular code architecture

- **Core Components**:

  - RSI Pattern Finding Algorithm using Euclidean Distance
  - Data Loading System
  - Interactive Chart Controls
  - Custom Chart Setup

- **Data Handling**:
  - CSV data processing
  - Google Sheets integration for data source
  - Historical RSI data analysis

## 📁 Project Structure

## 🔔 Stay Updated!

If you enjoyed this project and want to see more or similar projects, follow me for updates! 🚀  
You can also follow me on **YouTube** for more awesome content:  
👉 [YouTube Channel](https://www.youtube.com/@karthik947/videos)
