class DescriptiveStatistics {
    constructor(data) {
        this.data = data;
    }

    // Measures of Central Tendency

    mean() {
        const sum = this.data.reduce((acc, value) => acc + value, 0);
        return sum / this.data.length;
    }

    median() {
        const sortedData = this.data.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);

        if (sortedData.length % 2 === 0) {
            return (sortedData[mid - 1] + sortedData[mid]) / 2;
        } else {
            return sortedData[mid];
        }
    }

    mode() {
        const frequencyMap = new Map();
        this.data.forEach((value) => {
            frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
        });

        let maxFrequency = 0;
        let modes = [];
        frequencyMap.forEach((frequency, value) => {
            if (frequency > maxFrequency) {
                maxFrequency = frequency;
                modes = [value];
            } else if (frequency === maxFrequency) {
                modes.push(value);
            }
        });

        return modes;
    }

    // Measures of Dispersion

    range() {
        const sortedData = this.data.slice().sort((a, b) => a - b);
        return sortedData[sortedData.length - 1] - sortedData[0];
    }

    variance() {
        const meanValue = this.mean();
        const squaredDifferences = this.data.map(value => Math.pow(value - meanValue, 2));
        const sumSquaredDifferences = squaredDifferences.reduce((acc, value) => acc + value, 0);
        return sumSquaredDifferences / this.data.length;
    }

    standardDeviation() {
        return Math.sqrt(this.variance());
    }

    // Additional Measure of Dispersion

    interquartileRange() {
        const sortedData = this.data.slice().sort((a, b) => a - b);
        const lowerQ = this.median(sortedData.slice(0, Math.floor(sortedData.length / 2)));
        const upperQ = this.median(sortedData.slice(Math.ceil(sortedData.length / 2)));
        return upperQ - lowerQ;
    }
}

// Example usage:
const data = [2, 4, 4, 4, 5, 5, 7, 9];
const stats = new DescriptiveStatistics(data);

console.log("Measures of Central Tendency:");
console.log("Mean:", stats.mean());
console.log("Median:", stats.median());
console.log("Mode:", stats.mode());

console.log("\nMeasures of Dispersion:");
console.log("Range:", stats.range());
console.log("Variance:", stats.variance());
console.log("Standard Deviation:", stats.standardDeviation());
console.log("Interquartile Range:", stats.interquartileRange());
