import { TextInputStyle } from "discord.js";

export const system = {
    token: "",
    guildId: "",
};

export const roles = {
    allowed: [""],
    staff: "",
};

export const channels = {
    sets: "",
};

export const set = {
    defaultAuditLogId: "",
    questions: [
        {
            custom_id: "name&&age",
            embed: "Name and Age",
            label: "Your name and age",
            placeholder: "Example: Vladimir, 24 years old",
            style: TextInputStyle.Short,
            max_length: 64,
            require: true,
        },
        {
            custom_id: "time",
            embed: "Time Zone",
            label: "Your time zone and prime time",
            placeholder: "Example: GMT+3, 18:00 - 22:00",
            style: TextInputStyle.Short,
            max_length: 64,
            require: true,
        },
        {
            custom_id: "bio",
            embed: "About Yourself",
            label: "Tell us about yourself and why you?",
            placeholder: "Tell us about yourself here",
            style: TextInputStyle.Paragraph,
            max_length: 512,
            require: true,
        },
        {
            custom_id: "experience",
            embed: "Experience in this field",
            label: "Have you worked in this field?",
            placeholder: "Do you have experience in this field",
            style: TextInputStyle.Paragraph,
            max_length: 512,
            require: true,
        },
    ],
    roles: [
        {
            role: "",
            log: "",
            label: "Moderator",
            modalLabel: "Application for Moderator Position",
            description: "Maintains order on the server",
            question: ["name&&age", "time", "bio", "experience"],
        },
    ],
};
