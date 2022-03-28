import { CommandDefinition } from '../lib/command';
import Logger from '../lib/logger';
import { when } from './general/when';
import { dlc } from './support/dlc';
import { boing } from './memes/boing';
import { msfs } from './support/msfs';
import { comi } from './memes/comi';
import { premium } from './memes/premium';
import { controls } from './support/controls';
import { deadzones } from './support/deadzones';
import { ctd } from './support/ctd';
import { simbriefimport } from './B78XH/simbriefimport';
import { membercount } from './utils/membercount';
import { airframe } from './B78XH/airframe';
import { versions } from './B78XH/version';

const commands: CommandDefinition[] = [
    when,
    dlc,
    boing,
    msfs,
    comi,
    premium,
    controls,
    deadzones,
    ctd,
    simbriefimport,
    membercount,
    airframe,
    versions

];

const commandsObject: { [k: string]: CommandDefinition } = {};

for (const def of commands) {
    for (const name of (typeof def.name === 'string' ? [def.name] : def.name)) {
        if (commandsObject[name]) {
            Logger.warn(`Duplicate command/alias inserted: ${name}`);
        }
        commandsObject[name] = def;
    }
}

export default commandsObject;