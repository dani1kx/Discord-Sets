import { ButtonInteraction, MessageFlags } from "discord.js";
import { BaseComponent } from "../../Struct/Base/BaseComponent";
import type Client from "../../Struct/Client";

export default new BaseComponent(
    {
        name: "cancel.SetRecruitment",
    },
    async (client: Client, button: ButtonInteraction<"cached">) => {
        const targetId = button.customId.split(":")[1]!;
        const roleId = button.customId.split(":")[2]!;

        if (!client.utils.isAllowed(button.member)) {
            return button.reply({
                embeds: [
                    client.storage.embeds.default(
                        button.member,
                        "Application Approval",
                        `You **don't have** permissions`,
                    ),
                ],
                flags: MessageFlags.Ephemeral,
            });
        }

        const target = button.guild.members.cache.get(targetId);
        if (!target) {
            return button.reply({
                embeds: [
                    client.storage.embeds.default(
                        button.member,
                        "Application Rejection",
                        `User with ID **${targetId}** is not on the server\n> You can **reject** the application`,
                    ),
                ],
                flags: MessageFlags.Ephemeral,
            });
        }

        await button.message.edit({
            embeds: [
                client.storage.embeds
                    .from(button.message.embeds[0] as any)
                    .setFooter({
                        text: `Rejected by: ${button.user.username}`,
                        iconURL: client.utils.getAvatar(button.user),
                    })
                    .setTimestamp(),
            ],
            components: [],
        });

        client.storage.cache.recruitment.delete(`${targetId}.${roleId}`);

        return button.reply({
            embeds: [
                client.storage.embeds.default(
                    button.member,
                    "Application Rejection",
                    `You have **rejected** ${target ? target.toString() : `user with ID **${targetId}}`}'s application for the <@&${roleId}> role`,
                ),
            ],
            flags: MessageFlags.Ephemeral,
        });
    },
);
