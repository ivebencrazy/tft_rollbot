const resp = await fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json');
const data = await resp.json();
const setNames = Object.keys(data.sets);
const setName = Number(Deno.args[0]);
console.log(setNames);
