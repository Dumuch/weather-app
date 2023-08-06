export function convertTempKelvinToCelsius(tempKelvin: number): number {
    return Math.round(tempKelvin - 273.15);
}

export function capitalized(str: string): string {
    const capitalizedFirst = str[0].toUpperCase();
    const rest = str.slice(1);

    return capitalizedFirst + rest;
}

export function metersToKm(meters: number): string {
    return (meters / 1000).toFixed(1)
}
