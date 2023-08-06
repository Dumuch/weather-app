export function convertTempKelvinToCelsius(tempKelvin: number): number {
    return Number((tempKelvin -  273.15).toFixed(1));
}
