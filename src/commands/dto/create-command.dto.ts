import { Track } from "../data/track.enum";

export class CreateCommandDto {
    teamName: string;
    track: Track;
    commandToken: string;
}