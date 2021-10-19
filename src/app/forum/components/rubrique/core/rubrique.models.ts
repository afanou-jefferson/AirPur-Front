import { Message } from "../../message/core/message.models"
export interface Rubrique {
    id: number;
    content: string;
    postedOn: Date;
    title: string;
    description: string;
    utilisateurId: number;
    messages: Message[];

}
