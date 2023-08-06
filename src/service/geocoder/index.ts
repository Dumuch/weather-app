import type { GeolocationPosition } from '@/service/geocoder/types.ts';

export class Geocoder {
    async getCurrentPosition() {
        return new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } )
    }
}
