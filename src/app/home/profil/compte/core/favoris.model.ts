import { MeteoIndicateur } from "src/app/home/main/models/meteoindicateur.model";
import { RelevePolluant } from "src/app/home/main/models/relevePolluant.model";

export class FavorisAffichage {
    dtosMeteoIndicateurs: MeteoIndicateur;
    dtosRelevePolluants: RelevePolluant;

    constructor(params?: any) {
        Object.assign(this, params);
    }
}
