const ADJ = [
  "Cash",
  "Hood",
  "Silent",
  "Greedy",
  "Lucky",
  "Broken",
  "Atomic",
  "Paper",
  "Rusty",
  "Night",
  "Feral",
  "Soft",
  "Prime",
  "Hollow",
  "Rapid",
  "Quiet",
  "Bold",
  "Tiny",
  "Grand",
  "Sour",
];

const NOUN = [
  "Cat",
  "Frog",
  "Hawk",
  "Crab",
  "Wolf",
  "Bean",
  "Hook",
  "Moth",
  "Pike",
  "Crow",
  "Toad",
  "Lynx",
  "Gull",
  "Mole",
  "Wasp",
  "Colt",
  "Hare",
  "Bass",
  "Kite",
  "Dusk",
];

export function makeTokenIdentity(seed: number) {
  const a = ADJ[seed % ADJ.length];
  const n = NOUN[Math.floor(seed / ADJ.length) % NOUN.length];
  const name = `${a} ${n}`;
  const symbol = `${a.slice(0, 3)}${n.slice(0, 3)}`.toUpperCase();
  const address = toAddr(seed * 7919 + 17);
  const chip = (seed % 6) + 1;
  return { name, symbol, address, chip };
}

export function toAddr(n: number) {
  const hex = Math.abs(Math.floor(n * 1_000_003 + 0xabc123))
    .toString(16)
    .padStart(40, "0")
    .slice(0, 40);
  return `0x${hex}`;
}

export const HOOK_ADDRESS = "0xE5e702641Ea86F4ae6cC3cDaeD2B886f976Be044";
export const FACTORY_ADDRESS = "0x7eD598BcEf8bd9Edd8C97A195C6d13f40801EC7e";
export const ESCROW_ADDRESS = "0xd3AFEB2a57f70eF218Aa82451c51B2fb0416Ac9e";
export const ROUTER_ADDRESS = "0xe33E9E479dF8802cb0866d5d05258bEc4cF62948";
export const LOCKER_ADDRESS = "0x267444D099b10fB5Ed7c3Cc7B7c767AdcA574952";
