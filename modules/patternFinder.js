export class PatternFinder {
  constructor(data) {
    this.data = data;
  }

  getRandomPattern(windowSize) {
    if (!this.data || this.data.length < windowSize) {
      return null;
    }

    // Generate random start index within valid range
    const maxStartIndex = this.data.length - windowSize;
    const startIndex = Math.floor(Math.random() * maxStartIndex);

    return this.getPatternFromIndex(startIndex, windowSize);
  }

  getPatternFromTimestamp(timestamp, windowSize) {
    // Find the index of the data point closest to the given timestamp
    const index = this.data.findIndex((point) => point.timestamp >= timestamp);
    if (index === -1) return null;

    return this.getPatternFromIndex(index, windowSize);
  }

  getPatternFromIndex(startIndex, windowSize) {
    return {
      timestamps: this.data
        .slice(startIndex, startIndex + windowSize)
        .map((d) => d.timestamp),
      values: this.data
        .slice(startIndex, startIndex + windowSize)
        .map((d) => d.rsi),
      startIndex: startIndex,
    };
  }

  findMatchingPatterns(selectedPattern, windowSize, stepSize, plotStop) {
    if (!selectedPattern || !this.data || this.data.length < windowSize) {
      return [];
    }

    const matches = [];

    // Iterate through the data with the given step size
    for (let i = 0; i <= this.data.length - windowSize; i += stepSize) {
      // Skip the exact same pattern
      if (i === selectedPattern.startIndex) continue;

      const pattern = this.getPatternFromIndex(i, windowSize);

      const selectedPatternEdges = [
        selectedPattern.timestamps[0],
        selectedPattern.timestamps[selectedPattern.timestamps.length - 1],
      ];
      const patternEdges = [
        pattern.timestamps[0],
        pattern.timestamps[pattern.timestamps.length - 1],
      ];
      const isOverlapping =
        (patternEdges[1] >= selectedPatternEdges[0] &&
          patternEdges[1] <= selectedPatternEdges[1]) ||
        (patternEdges[0] >= selectedPatternEdges[0] &&
          patternEdges[0] <= selectedPatternEdges[1]);

      // Calculate Euclidean distance
      const distance = isOverlapping
        ? Infinity
        : this.calculateEuclideanDistance(
            selectedPattern.values,
            pattern.values
          );

      matches.push({
        pattern,
        score: distance,
      });
    }

    // Sort by score (lower is better) and take top matches
    return matches
      .sort((a, b) => a.score - b.score)
      .slice(0, plotStop)
      .map((match) => ({
        timestamps: match.pattern.timestamps,
        values: match.pattern.values,
        label: `Score: ${match.score.toFixed(2)} (${new Date(
          match.pattern.timestamps[0]
        ).toLocaleDateString()})`,
      }));
  }

  calculateEuclideanDistance(pattern1, pattern2) {
    if (pattern1.length !== pattern2.length) return Infinity;

    // Calculate Euclidean distance directly on RSI values
    // since they're already normalized between 0 and 100
    const sumOfSquares = pattern1.reduce((sum, val, i) => {
      const diff = val - pattern2[i];
      return sum + diff * diff;
    }, 0);

    return Math.sqrt(sumOfSquares);
  }
}
