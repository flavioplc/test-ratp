import axios from "axios";
import Toilets from "../models/toilets";

type ServiceFields = {
    accessible_au_public: string;
    tarif_gratuit_payant:string;
    ligne:string;
    station:string;
    coord_geo: [number, number];
};

type ServiceRecord = {
    fields: ServiceFields;
}

class RATPSaniraireService {
    private ratpSanitaireURL = "https://data.ratp.fr/api/records/1.0/search?dataset=sanitaires-reseau-ratp&facet=ligne&facet=station&facet=tarif_gratuit_payant&facet=accessible_au_public";
    async getToiletsByMetroLines (metroLine: string):Promise<Toilets[] | undefined> {
        try {
            const response = await axios.get(`${this.ratpSanitaireURL}&q=ligne=${metroLine}`);
            
            const toilets = response.data.records.map((record: ServiceRecord) => {
                const coordinates = record.fields.coord_geo;
                const metroLine =  record.fields.ligne;
                const metroStation = record.fields.station;
                const free = record.fields.tarif_gratuit_payant === "gratuit";
                const publicAccess = record.fields.accessible_au_public === "oui";
                return new Toilets(metroLine, metroStation, free, publicAccess, coordinates);
            });

            return toilets;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new RATPSaniraireService();

