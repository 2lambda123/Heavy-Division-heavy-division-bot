// TODO: Implement Option between link redirect or DM'd list. Why does using the DM Feature crash the bot after reacting "next" on the last page? Starts at Line 24
// TEMP WORKAROUND
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const help: CommandDefinition = {
    name: ['help'],
    description: 'Explains the abscence of the 787 in hangar after downloading the mod.',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const helpEmbed = makeEmbed({
            title: 'Heavy Division | Bot Commands',
            description: 'Check out the [Heavy Bot Repository](https://github.com/Hypeism/HeavyBot/tree/typescript-refactor) for a list of availible commands. ', //TODO Replace hyperlink with Heavy Division Repo one
        });

        await msg.channel.send({ embeds: [helpEmbed] });

    },
};



// import { DMChannel, EmbedFieldData, User } from 'discord.js';
// import { CommandDefinition } from '../../lib/command';
// import { makeEmbed, makeLines } from '../../lib/embed';
// import commands from '../index';
// import { CommandCategory } from '../../constants';
// import Logger from '../../lib/logger';
//
// export const help: CommandDefinition = {
//     name: 'help',
//     description: 'Sends a list of available commands to the user',
//     category: CommandCategory.UTILS,
//     executor: async (msg) => {
//         const { author } = msg;
//
//         const embed = makeEmbed({
//             title: 'Heavy Division Simulations | Help',
//             description: makeLines([
//                 'Would you like to:',
//                 '1. Receive a list of the available commands as a DM',
//                 '2. Receive a link with a list of the available commands/changelog on our docs site ',
//             ]),
//         });
//
//         // Decide between DM or docs link
//         const selectorMsg = await msg.reply({ embeds: [embed] });
//
//         try {
//             await msg.delete();
//         } catch (e) {
//             Logger.debug('Message was already deleted');
//         }
//
//         const filter = (reaction, user) => ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === author.id;
//         selectorMsg.awaitReactions({ filter,
//             max: 1,
//             time: 60000,
//             errors: ['time'],
//         })
//             .then(async (collected) => {
//                 const reaction = collected.first();
//
//                 switch (reaction.emoji.name) {
//                     case '1️⃣':
//                         // Slide into the DMs
//                         author.createDM()
//                             .then(async (dmChannel) => {
//                                 const response = await selectorMsg.channel.send('<@' + msg.author.id + '>, I\'ve DM\'d you with the list of the commands you can use!');
//                                 await selectorMsg.delete();
//
//                                 setTimeout(() => {
//                                     response.delete();
//                                 }, 4_000);
//
//                                 // Catch all errors to prevent leaking DM activity to public error embeds
//                                 try {
//                                     await handleDmCommunication(dmChannel, author);
//                                 } catch (e) {
//                                     Logger.error(e);
//                                 }
//                             });
//
//                         break;
//                     case '2️⃣':
//                         const embed = makeEmbed({
//                             title: 'Heavy Division Simulations | Discord Bot Documentation',
//                             description: '',
//                         });
//
//                         await selectorMsg.reply({ embeds: [embed] });
//
//                         // Delete the selector
//                         await selectorMsg.delete();
//                         break;
//                     default:
//                         // Unknown reaction -> ignore
//                         break;
//                 }
//             })
//             .catch(async () => {
//                 await selectorMsg.delete();
//             });
//
//         // Send reactions after listener has been set up
//         await selectorMsg.react('1️⃣');
//         await selectorMsg.react('2️⃣');
//     },
// };
//
// async function handleDmCommunication(dmChannel: DMChannel, author: User, index: number = 0) {
//     const fieldsPerEmbed = 1;
//     const allFields = renderAllCategories();
//
//     const embedsToUse = allFields.slice(index, index + fieldsPerEmbed);
//     const dmEmbed = makeEmbed({
//         title: 'Heavy Division Simulations | Commands List',
//         fields: embedsToUse,
//     });
//
//     // Send reaction embeds for interaction
//     const sentEmbedMessage = await dmChannel.send({ embeds: [dmEmbed] });
//
//     // Only act on certain reactions. I am using`includes` here so new reactions can be easily added.
//     const filter = (reaction, user) => ['⏪', '⏩', '❌'].includes(reaction.emoji.name) && user.id === author.id;
//     sentEmbedMessage.awaitReactions({ filter,
//         max: 1,
//         time: 60000,
//         errors: ['time'],
//     })
//         .then(async (collected) => {
//             const reaction = collected.first();
//
//             switch (reaction.emoji.name) {
//                 case '⏩':
//                     // Send next embed and delete previous embed
//                     await sentEmbedMessage.delete();
//                     await handleDmCommunication(dmChannel, author, index + fieldsPerEmbed);
//                     break;
//                 case '⏪':
//                     // Send next embed and delete previous embed
//                     await sentEmbedMessage.delete();
//                     await handleDmCommunication(dmChannel, author, index - fieldsPerEmbed);
//                     break;
//                 case '❌':
//                     // Abort and delete message
//                     await sentEmbedMessage.delete();
//                     break;
//                 default:
//                     // Unknown reaction -> ignore
//                     break;
//             }
//         })
//         .catch(async () => {
//             await sentEmbedMessage.delete();
//         });
//
//     // Send reactions after listener has been set up
//     if (index !== 0) {
//         await sentEmbedMessage.react('⏪');
//     }
//     if (index + fieldsPerEmbed < allFields.length) {
//         await sentEmbedMessage.react('⏩');
//     }
//     await sentEmbedMessage.react('❌');
// }
//
// function renderAllCategories(): EmbedFieldData[] {
//     let commandArray = Object.values(commands);
//
//     // Remove duplicates by name
//     commandArray = commandArray.filter((v, i, a) => a.findIndex((t) => t.name === v.name) === i);
//
//     // Group all commands by their category
//     const groupedCommands = Object.values(CommandCategory)
//         .map((category) => {
//             const categoryCommands = commandArray.filter((command) => command.category === category);
//
//             return {
//                 name: category,
//                 commands: categoryCommands,
//             };
//         });
//
//     const fields: EmbedFieldData[] = [];
//
//     for (const category of groupedCommands) {
//         const fieldsValues = chunkStringArray(category.commands.map(renderCommand), 1024, '\n');
//
//         fieldsValues.forEach((value) => {
//             fields.push({
//                 name: category.name,
//                 value: value.join('\n'),
//             });
//         });
//     }
//
//     return fields;
// }
//
// function chunkStringArray(array: string[], maxJoinedLength: number, separator?: string): string[][] {
//     const result = [];
//
//     let currentChunk: string[] = [];
//     for (let index = 0; index < array.length; index++) {
//         if (currentChunk.join(separator).length + array[index].length >= maxJoinedLength) {
//             result.push(currentChunk);
//             currentChunk = [];
//         }
//
//         currentChunk.push(array[index]);
//     }
//
//     result.push(currentChunk);
//     return result;
// }
//
// function renderCommand({ name, description }: CommandDefinition): string {
//     const prefix = `**.${(Array.isArray(name) && name.length > 1) ? `${name[0]} (alias: ${name.slice(1).join(', ')})` : name}**`;
//
//     if (description) {
//         return `${prefix} - ${description}`;
//     }
//
//     return prefix;
// }
//
//
//
