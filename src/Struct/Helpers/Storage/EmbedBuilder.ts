import { EmbedBuilder, GuildMember, type EmbedData } from "discord.js";
import type Client from "../../Client";

export class Embeds {
    constructor(private client: Client) {
        this.client = client;
    }

    color() {
        return new EmbedBuilder().setColor("#2B2D31");
    }

    from(data: EmbedData) {
        return new EmbedBuilder(data);
    }

    default(
        member: GuildMember,
        title: string,
        description: string,
        author?: GuildMember,
    ) {
        return this.color()
            .setThumbnail(this.client.utils.getAvatar(author || member))
            .setTitle(author ? `${title} — ${author.user.tag}` : title)
            .setDescription(`${member.toString()}, ${description}`);
    }

    sets() {
        return this.color()
            .setThumbnail(
                "https://cdn.discordapp.com/attachments/1241745277887447040/1260201655064985681/advertising.png?ex=668e75bf&is=668d243f&hm=e6e885c3279bdb253a42522577ec85341145b07d32f6a6584991b7754572f16e&",
            )
            .setImage("https://i.imgur.com/nuq0aBu.png")
            .setDescription(
                `> We are currently looking for **valuable staff members**. To submit an **application** for a role that interests you, please use the **menu** below.`,
            )
            .setTitle("Recruitment for our server team!");
    }
}
