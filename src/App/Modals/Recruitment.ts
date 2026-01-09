import { MessageFlags, ModalSubmitInteraction, TextChannel } from "discord.js";
import { BaseComponent } from "../../Struct/Base/BaseComponent";
import type Client from "../../Struct/Client";

export default new BaseComponent(
    {
        name: "recruitment",
    },
    async (client: Client, modal: ModalSubmitInteraction<"cached">) => {
        const roleId = modal.customId.split(":")[1]!;

        const data = client.config.set.roles.find((r) => r.role === roleId);
        if (!data) {
            return modal.reply({
                content: "Unknown recruitment set",
                flags: MessageFlags.Ephemeral,
            });
        }

        const role = modal.guild.roles.cache.get(data.role);
        if (!role) {
            return modal.reply({
                content: "Unknown role",
                flags: MessageFlags.Ephemeral,
            });
        }

        if (modal.member.roles.cache.has(roleId)) {
            return modal.reply({
                embeds: [
                    client.storage.embeds.default(
                        modal.member,
                        "Recruitment",
                        `You **already** have the <@&${roleId}> role`,
                    ),
                ],
                flags: MessageFlags.Ephemeral,
            });
        }

        const log = modal.guild.channels.cache.get(
            data?.log || client.config.set.defaultAuditLogId,
        ) as TextChannel;
        if (!log) {
            return modal.reply({
                content: "No log channel found",
                flags: MessageFlags.Ephemeral,
            });
        }

        const dateJoined = Math.trunc(
            (modal.member.joinedTimestamp ?? Date.now()) / 1000,
        );

        await log.send({
            embeds: [
                client.storage.embeds
                    .color()
                    .setAuthor({
                        name: `${modal.user.username}`,
                        iconURL: client.utils.getAvatar(modal.user),
                    })
                    .setTitle(
                        data?.modalLabel || `Application for ${role.name} position`,
                    )
                    .setDescription(
                        `User: ${modal.member.toString()}` +
                            "\n" +
                            `ID: **${modal.user.id}**` +
                            "\n" +
                            `Joined: <t:${dateJoined}:f> (<t:${dateJoined}:R>)`,
                    )
                    .addFields(
                        data.question.map((id) => {
                            const question = client.config.set.questions.find(
                                (f) => f.custom_id === id,
                            )!;
                            return {
                                name: `> ${question.embed}:`,
                                value: client.utils.toCode(
                                    modal.fields.getTextInputValue(id),
                                ),
                            };
                        }),
                    ),
            ],
            components: client.storage.rows.choose(
                `SetRecruitment:${modal.user.id}:${roleId}`,
            ),
        });

        client.storage.cache.recruitment.set(`${modal.user.id}.${roleId}`, Date.now().toString());

        return modal.reply({
            embeds: [
                client.storage.embeds.default(
                    modal.member,
                    "Recruitment",
                    `You have **successfully** submitted an **application** for the <@&${roleId}> position`,
                ),
            ],
            flags: MessageFlags.Ephemeral,
        });
    },
);
