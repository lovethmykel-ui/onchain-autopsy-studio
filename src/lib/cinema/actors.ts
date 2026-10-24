import { ActorProfile } from '@/types/database'

export const DEFAULT_ACTOR_PROFILES: ActorProfile[] = [
  {
    id: 'suspect_do_kwon',
    name: 'Do Kwon (Terraform Labs)',
    role: 'Suspect / Founder',
    seedId: 88294104,
    faceEmbeddingPrompt: 'East Asian male in his early 30s, short modern cropped black hair, youthful tech founder visage, sharp jawline, intense defensive gaze',
    wardrobe: 'Black Patagonia fleece vest over gray tech tee, minimalist titanium wire glasses, stainless steel watch',
    keyVisualFeatures: 'Defiant demeanor, slight smirk turning to panic, sweat sheen in fluorescent lighting',
    lightingProfile: 'Chiaroscuro side-lighting, cool blue fluorescent office spill, 5600K key light'
  },
  {
    id: 'suspect_sbf',
    name: 'Sam Bankman-Fried (FTX / Alameda)',
    role: 'Suspect / Founder',
    seedId: 44109275,
    faceEmbeddingPrompt: 'Caucasian male in late 20s, unruly bushy dark brown curly hair, tired sunken eyes, disheveled posture',
    wardrobe: 'Oversized rumpled gray cotton t-shirt, baggy cargo shorts, unlaced athletic sneakers',
    keyVisualFeatures: 'Fidgeting hands, nervous glance toward multiple trading monitors, rapid eye movements',
    lightingProfile: 'Backlit multi-monitor glow (#3B82F6 and #10B981 screen reflections), dim penthouse ambient'
  },
  {
    id: 'suspect_alex_mashinsky',
    name: 'Alex Mashinsky (Celsius)',
    role: 'Suspect / Founder',
    seedId: 77194021,
    faceEmbeddingPrompt: 'Middle-aged male in late 50s, receding silver-gray hair, confident charismatic sales demeanor, commanding eye contact',
    wardrobe: 'Signature black t-shirt printed with bold white text "BANKS ARE NOT YOUR FRIENDS", dark denim jacket',
    keyVisualFeatures: 'Polished public speaking gestures, sudden tension when asked about yield mechanics',
    lightingProfile: 'Stage keylight, warm conference spotlights, bokeh crowd silhouettes'
  },
  {
    id: 'hacker_phantom_zero',
    name: 'Phantom Exploit Architect (Lazarus)',
    role: 'Exploit Hacker',
    seedId: 10485760,
    faceEmbeddingPrompt: 'Silhouetted shadowy figure, obscure facial profile partially veiled by deep hood, reflective metallic mask fragment',
    wardrobe: 'Dark techwear modular hoodie, fingerless tactical keyboard gloves, audio monitoring headset',
    keyVisualFeatures: 'Fast mechanical keyboard typing cadence, rapid terminal command line scrolling',
    lightingProfile: 'High contrast green phosphor CRT glow, purple ultraviolet ambient rim, deep void shadow'
  },
  {
    id: 'agent_sarah_miller',
    name: 'Special Agent Sarah Miller (IRS CI / FBI)',
    role: 'Forensic Agent',
    seedId: 92837411,
    faceEmbeddingPrompt: 'Caucasian female in late 30s, sharp focused gray eyes, neatly tied auburn hair, clinical calm authoritative presence',
    wardrobe: 'Tailored dark navy FBI tactical windbreaker with gold IRS-CI badge on chest, crisp white oxford collar',
    keyVisualFeatures: 'Laser-pointer precision, analytical scrutiny of transaction trees on interactive glass display',
    lightingProfile: 'Neutral clean white 4000K investigation briefing room light, glass-reflection highlights'
  },
  {
    id: 'victim_retail_trader',
    name: 'Marcus Vance (Retail Victim)',
    role: 'Victim Investor',
    seedId: 33910284,
    faceEmbeddingPrompt: 'African-American male in mid 30s, exhausted expression, red-rimmed eyes staring at liquidations',
    wardrobe: 'Worn gray collegiate sweatshirt, unbuttoned flannel shirt',
    keyVisualFeatures: 'Head in hands, illuminated by smartphone screen reading 0.00 balance',
    lightingProfile: 'Single harsh mobile screen blue light illuminating dark bedroom at 3:00 AM'
  }
]

export function buildActorPrompt(actor: ActorProfile): string {
  return `[CHARACTER CONSISTENCY SEED: ${actor.seedId}] Subject: ${actor.faceEmbeddingPrompt}. Wearing ${actor.wardrobe}. Visual characteristics: ${actor.keyVisualFeatures}. Subject Lighting: ${actor.lightingProfile}.`
}
