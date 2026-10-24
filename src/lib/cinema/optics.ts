import { CameraBody, LensOptic, CameraBodyId, LensOpticId, AspectRatioId, ColorLutId, StoryboardScene } from '@/types/database'

export const CAMERA_BODIES: CameraBody[] = [
  {
    id: 'arri_alexa_35',
    name: 'ARRI Alexa 35',
    sensor: 'Super 35 4.6K ALEV 4',
    dynamicRange: '17 stops',
    nativeIso: 800,
    description: 'Gold standard in cinema texture, smooth skin roll-off, and subtle highlight compression.'
  },
  {
    id: 'red_vraptor_8k',
    name: 'RED V-Raptor XL 8K',
    sensor: 'Full Frame 35.4MP Multi-Format',
    dynamicRange: '16.5 stops',
    nativeIso: 800,
    description: 'Micro-detail precision for forensic screen captures, code overlays, and sharp blockchain evidence.'
  },
  {
    id: 'imax_70mm',
    name: 'IMAX 70mm MKIV 15-Perf',
    sensor: '65mm Film (18K Equivalent)',
    dynamicRange: '18 stops',
    nativeIso: 250,
    description: 'Towering monumental scale, razor-sharp resolving power, and immersive sensory depth.'
  },
  {
    id: 'sony_venice_2',
    name: 'Sony Venice 2 8K',
    sensor: 'Full-Frame 36x24mm Dual Base ISO',
    dynamicRange: '16 stops',
    nativeIso: 3200,
    description: 'Ultra low-light performance for dark server rooms, midnight FBI raids, and neon interrogations.'
  },
  {
    id: 'panavision_dxl2',
    name: 'Panavision Millennium DXL2',
    sensor: 'Large Format 8K RED Monstro',
    dynamicRange: '16 stops',
    nativeIso: 1600,
    description: 'Classic Hollywood anamorphic cinematic look with organic warmth and rich shadow tones.'
  },
  {
    id: 'bolex_16mm',
    name: 'Bolex H16 16mm Vintage',
    sensor: '16mm Grain Emulsion Film',
    dynamicRange: '12 stops',
    nativeIso: 500,
    description: 'Authentic 1990s cypherpunk archival texture with heavy organic grain and gate weave.'
  }
]

export const LENS_OPTICS: LensOptic[] = [
  {
    id: 'cooke_s4',
    name: 'Cooke S4/i Prime Cine',
    type: 'Prime Cine',
    squeezeFactor: 1.0,
    bokehCharacter: 'Famous "Cooke Look": smooth, rounded creamy bokeh with gentle micro-contrast.'
  },
  {
    id: 'panavision_anamorphic',
    name: 'Panavision C-Series 2.0x Anamorphic',
    type: 'Anamorphic',
    squeezeFactor: 2.0,
    bokehCharacter: 'Horizontal blue streak flares, oval out-of-focus speculars, and distinctive barrel distortion.'
  },
  {
    id: 'zeiss_master',
    name: 'Zeiss Master Anamorphic',
    type: 'Anamorphic',
    squeezeFactor: 2.0,
    bokehCharacter: 'Zero chromatic aberration with clinical modern sharpness and controlled geometric depth.'
  },
  {
    id: 'master_macro_100',
    name: 'ARRI Master Macro 100mm f/2.0',
    type: 'Macro',
    squeezeFactor: 1.0,
    bokehCharacter: 'Extreme 1:1 magnification for hardware cold wallets, seed phrase engravings, and silicon chips.'
  },
  {
    id: 'angenieux_optimo',
    name: 'Angenieux Optimo Ultra 12x Zoom',
    type: 'Cine Zoom',
    squeezeFactor: 1.0,
    bokehCharacter: 'Versatile crash zoom and vertigo push capabilities with uniform illumination.'
  }
]

export const FOCAL_LENGTHS = [
  { mm: 18, label: '18mm Ultra-Wide', use: 'Expansive architecture, chaotic trading floors, panoramic drone shots' },
  { mm: 24, label: '24mm Wide Establishing', use: 'Investigative context, wide office spaces, server bank setups' },
  { mm: 35, label: '35mm Narrative Standard', use: 'Environmental portraits, suspect walking shots, documentary conversations' },
  { mm: 50, label: '50mm Human Eye Natural', use: 'Honest neutral perspective, eyewitness interviews, courtroom scenes' },
  { mm: 85, label: '85mm Portrait Telephoto', use: 'Isolated suspect close-ups, intense emotional interrogations' },
  { mm: 135, label: '135mm Shallow Isolation', use: 'Dramatic compression, surveillance telephoto, covert stakeout shots' },
  { mm: 200, label: '200mm Heavy Compression', use: 'Forensic long-distance tracking, compressed city skylines' }
]

export const APERTURES = [
  { value: 'f/1.2', label: 'f/1.2 Extreme Shallow', dof: 'Razor-thin plane, dreamlike background dissolution' },
  { value: 'f/1.4', label: 'f/1.4 Cinematic Bokeh', dof: 'Cinematic portrait focus with intense separation' },
  { value: 'f/2.0', label: 'f/2.0 Narrative Focus', dof: 'Gentle falloff with clear subject isolation' },
  { value: 'f/2.8', label: 'f/2.8 Documentarian', dof: 'Crisp subject with perceptible environment' },
  { value: 'f/4.0', label: 'f/4.0 Tactical Sharpness', dof: 'Deep forensic depth, readable multiple planes' },
  { value: 'f/8.0', label: 'f/8.0 Architectural Depth', dof: 'Edge-to-edge sharpness across wide rooms' },
  { value: 'f/16', label: 'f/16 Maximum Detail', dof: 'Hyper-deep depth-of-field, everything in focus' }
]

export const SHUTTER_ANGLES = [
  { angle: 180, label: '180° Standard Cinema', feel: 'Natural 1/48s cinematic motion blur' },
  { angle: 90, label: '90° Action Snap', feel: 'Crisp, punchy staccato motion for market crashes' },
  { angle: 45, label: '45° Combat Staccato', feel: 'High-frequency shutter for rapid money transfer chaos' },
  { angle: 360, label: '360° Dream Smear', feel: 'Disorienting light trail smear for hacks and confusion' }
]

export const COLOR_LUTS: { id: ColorLutId; name: string; style: string; tone: string }[] = [
  { id: 'arri_logc4', name: 'ARRI LogC4 Neutral', style: 'Neutral dynamic range film print', tone: 'Accurate, balanced, broadcast grade' },
  { id: 'kodak_vision3', name: 'Kodak Vision3 250D', style: 'Warm golden highlights with cyan shadows', tone: 'Rich prestige cinema Hollywood look' },
  { id: 'bleach_bypass', name: 'Bleach Bypass Silver', style: 'High silver halide retention, desaturated colors', tone: 'Gritty, clinical, dark investigative crime' },
  { id: 'fincher_green', name: 'Fincher Monochromatic', style: 'Cool olive greens, deep inky obsidian blacks', tone: 'Mindhunter-style forensic psychological thriller' },
  { id: 'forensic_uv', name: 'Cyber UV Ultraviolet', style: 'Neon cyan, violet edge light, darkroom amber', tone: 'Modern Mr. Robot & Vox on-chain cyber aesthetics' }
]

export const ASPECT_RATIOS: { id: AspectRatioId; label: string; ratio: string; icon: string }[] = [
  { id: '2.39:1', label: 'Cinemascope', ratio: '2.39:1', icon: 'wide' },
  { id: '16:9', label: 'UHD Standard', ratio: '16:9', icon: 'tv' },
  { id: '9:16', label: 'Vertical Reels', ratio: '9:16', icon: 'mobile' },
  { id: '4:3', label: 'Archive 4:3', ratio: '4:3', icon: 'box' },
  { id: '1.43:1', label: 'IMAX Full 70mm', ratio: '1.43:1', icon: 'imax' }
]

export function buildHiggsfieldPrompt(
  scene: StoryboardScene,
  customNotes?: string
): string {
  const camera = CAMERA_BODIES.find(c => c.id === scene.camera_body) || CAMERA_BODIES[0]
  const lens = LENS_OPTICS.find(l => l.id === scene.lens) || LENS_OPTICS[0]
  const focalLength = scene.focal_length || 35
  const aperture = scene.aperture || 'f/2.0'
  const shutterAngle = scene.shutter_angle || 180
  const colorLut = COLOR_LUTS.find(c => c.id === scene.color_lut) || COLOR_LUTS[0]

  const opticsBlock = `[OPTICAL RIG: Shot on ${camera.name}, ${lens.name} at ${focalLength}mm, ${aperture}, ${shutterAngle}° shutter angle, ${colorLut.name} color grade]`
  const movementBlock = `[CAMERA MOTION: ${scene.camera_movement || 'Cinematic slow push-in'}, ${scene.trajectory_preset || 'Linear Tracking'}]`
  const lightingBlock = `[LIGHTING: ${scene.lighting || 'Cinematic chiaroscuro, volumetric haze, rim highlights'}]`
  const hudBlock = scene.hud_overlay ? `[HUD TELEMETRY: ${scene.hud_overlay}]` : ''

  return `${opticsBlock} ${movementBlock} ${lightingBlock} ${hudBlock} Cinematic scene: ${scene.visual_description}. Ultra-photorealistic documentary footage, masterwork 8k resolution, volumetric atmosphere, fine film grain, natural optical aberrations, no artificial 3D cartoon style.${customNotes ? ' ' + customNotes : ''}`
}
