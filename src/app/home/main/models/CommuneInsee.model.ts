import { CoordInsee } from "./coordInsee.model";

export class CommuneInsee {

    //https://geo.api.gouv.fr/communes/34172?fields=nom,code,codesPostaux,centre,codeDepartement,codeRegion,population&format=json&geometry=centre

    public code: string;
    public nom: string;
    public codesPostaux: string[];
    public centre : CoordInsee;
    public codeDepartement : string;
    public codeRegion: string;
    public population: number;

    constructor(params: any) {
        Object.assign(this, params);
      }

}