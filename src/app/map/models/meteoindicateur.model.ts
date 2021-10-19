export class MeteoIndicateur {
    public date : Date;
	public vitesseMoyVent: number;
	public cumulPluie : number;
	public tempatureSol : number;

	constructor(params: any) {
		Object.assign(this, params);
	}
}