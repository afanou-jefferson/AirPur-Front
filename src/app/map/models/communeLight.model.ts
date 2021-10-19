
export class CommuneLight {

    public nomCommune: string;
    public populationTotaleCommune: number;
    public codeInseeCommune: string;
    public idDepartementCommune: number;
    public codeDepartementCommune : string;
    public listeIdStationsCommune : number[];
    public listeIdMeteoIncateurCommune : number[];
    public listeIdFavorisCommune : number[];

    constructor(params: any) {
        Object.assign(this, params);
      }
}