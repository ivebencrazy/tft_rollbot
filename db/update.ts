/**
 *  There is no auto-generated static content for TFT currently...
 *  Latest update is from set 5....
 *  https://developer.riotgames.com/docs/tft#static-data
 *
 *  Therefore, use community-driven site cdragon:
 *    - https://cdn.communitydragon.org
 *    - https://raw.communitydragon.org/latest/cdragon/tft/en_us.json
 *
 *  We may need to add some set-specific filters if the set has
 *  unobtainable champions
 */
interface Data {
  items: any[];
  setData: SetData[];
  sets: any;
}

interface SetData {
  champions: Champion[];
  mutator: string;
  name: string;
  number: number;
  traits: Trait[];
}

interface Champion {
  apiName: string;
  cost: number;
  icon: string;
  name: string;
  traits: string[];
  ability: any;
  stats: any;
}

interface Trait {
  apiName: string;
  desc: string;
  effects: any[];
  icon: string;
  name: string;
}

const resp = await fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json');
const data = await resp.json();

const setNames = Object.keys(data.sets);
const setName = Number(Deno.args[0]);

if (!data.sets[setName]) throw new Error('Invalid Set Name');

const { champions, traits } = data.sets[setName];

const traitsSet: Set<string> = new Set();
traits.forEach(({ name }) => traitsSet.add(name));

const results: { [name: string]: string[] } = {};
traitsSet.forEach((trait: string) => {
  results[trait] = [];
});

champions.forEach((champion: Champion) => {
  champion.traits.forEach((trait: string) => {
    results[trait].push(champion.name);
  });
});

Deno.writeTextFileSync(`./db/data.json`, JSON.stringify(results, null, 2));
