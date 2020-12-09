export interface Location {
    id: string;
    onsite: boolean;
    track: string;
    project: string;
    addressLine1: string;
    city: string;
    state: string;
    zipCode: number;
}
export interface MapInfo {
    lat: number;
    lng: number;
}

export interface MapInfoCurrent {
    lat: number;
    lng: number;
}

