export class NotificationCreation {
    message: string;
    dateCreation: Date;
    departementId: number;
    utilisateurId: number;

    constructor(params?: any) {
        Object.assign(this, params);
    }
}