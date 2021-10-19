import { MeteoIndicateur } from "src/app/map/models/meteoindicateur.model";
import { RelevePolluant } from "src/app/map/models/relevePolluant.model";

export class FavorisAffichage {
    dtosMeteoIndicateurs: MeteoIndicateur;
    dtosRelevePolluants: RelevePolluant;

    constructor(params?: any) {
        Object.assign(this, params);
    }
}
