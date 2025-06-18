import { readFile } from 'fs/promises';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const clothworth = [
  "Spiked Collar",
  "Elf Tail Armor",
  "Spiked Wrist",
  "Magenta",
  "Headdress",
  "Tiki",
  "Spiked Wristband",
  "Phantom Beanie"
];

async function askQuestion(prompt) {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(prompt);
  rl.close();
  return answer;
}

function CheckClothWorth(name) {
  if (typeof name !== 'string')  return false;
  
  for (const cloth of clothworth) {
    if (name.includes(cloth)) {
      return true;
    }
  }

  return false;
}

const loadJson = async (data) => {
  return JSON.parse(data);
};

const loadJsonFile = async (path) => {
  const data = await readFile(path, 'utf8');
  return JSON.parse(data);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    askQuestion,
    loadJson,
    loadJsonFile,
    CheckClothWorth,
    sleep,

}