export type Coordinates = [number, number];

export default class Toilets {
    publicAccess: boolean;
    free: boolean;
    metroLine: string;
    metroStation: string;
    coordinates: Coordinates;
    constructor(metroLine: string, metroStation: string, free: boolean, publicAccess: boolean, coordinates: Coordinates) {
        this.coordinates = coordinates;
        this.metroLine = metroLine;
        this.metroStation = metroStation;
        this.free = free;
        this.publicAccess = publicAccess;
    }
}