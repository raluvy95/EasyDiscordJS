import { 
    Client, 
    Message, 
    GuildMember, 
    Role, 
    TextChannel, 
    Collection, 
    Snowflake,
    User
} from 'discord.js';

interface EasyDiscordOptions {
    prefix?: string;
}

interface KickOptions {
    reason?: string;
    bypassAdmin?: boolean;
}

interface PurgeOptions {
    channel?: TextChannel;
    filterOld?: boolean;
}

interface BanOptions extends KickOptions {
    banUser?: boolean;
}

interface MuteOptions {
    reason?: string;
    timeout?: string | number;
    role: Role;
}

interface ModeratorActions {
    kick(message: Message, args: string[], options?: KickOptions): Promise<GuildMember>;
    ban(message: Message, args: string[], options?: BanOptions): Promise<GuildMember>;
    mute(message: Message, args: string[], options?: MuteOptions): Promise<GuildMember>;
    purge(message: Message, number?: number, options?: PurgeOptions): Promise<Collection<Snowflake, Message>>;
    unban(message: Message, args: string[]): Promise<User>;
}

interface CoreActions {
    getMember(message: Message, args: string[]): GuildMember | null;
    getRole(message: Message, args: string[]): Role | null;
}

interface StatusOptions {
    type?: string;
    timeout?: number;
}

export default class EasyDiscordJS {
    public mod: ModeratorActions;
    public util: CoreActions;

    // note that these values may not be as typed
    // because the module will take on existing 
    // `client.{commands,cooldown}` values without
    // validating their types
    public commands: Map<string, Record<string, unknown>>; 
    public cooldown: unknown;

    public constructor(public client: Client, public options?: EasyDiscordOptions);

    public loadCommand(path: string, ignore?: string[]): void;
    public loadCommands(path: string, module?: boolean, ignore?: string): void;
    public getArgs(message: Message, prefix?: string): string[];
    public loadBasicCommands(ignore?: string[]): void;
    public setPlaying(playing: string | string[], options?: StatusOptions): void;

    get allCommands(): Map<string, Record<string, unknown>>;
}