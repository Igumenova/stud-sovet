
/**
 * TODO: дописать нормальный API для класса и использовать его в программе
 */
export class Command {
    _id: string;
    date: Date;
    teamName: string;
    track: string;
    maxMembers: number = 5;
    members: number = 1;
    token: string = '';
}