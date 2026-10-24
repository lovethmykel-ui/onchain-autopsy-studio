import { CameraTrajectory } from '@/types/database'

export const CAMERA_TRAJECTORIES: CameraTrajectory[] = [
  // ── 1. Cinematic Orbit ──
  {
    id: 'orbit_matrix_360',
    name: '360° Matrix Orbit',
    category: 'Cinematic Orbit',
    description: 'Smooth, unbroken 360-degree circular orbit maintaining focal lock on the suspect center.',
    vector: { x: 0, y: 0, z: 0, pitch: -5, yaw: 360, roll: 0 },
    speedMultiplier: 1.0
  },
  {
    id: 'orbit_low_180',
    name: '180° Low-Angle Crescent',
    category: 'Cinematic Orbit',
    description: 'Heroic upward arc rotating halfway around the subject, revealing monumental background scale.',
    vector: { x: -2, y: -1, z: 3, pitch: 15, yaw: 180, roll: 2 },
    speedMultiplier: 0.8
  },
  {
    id: 'orbit_spiral_ascent',
    name: 'Helical Spiral Ascent',
    category: 'Cinematic Orbit',
    description: 'Rising corkscrew camera move spiraling upward from ground level to high eagle eye view.',
    vector: { x: 0, y: 5, z: 0, pitch: -30, yaw: 540, roll: 0 },
    speedMultiplier: 1.2
  },
  {
    id: 'orbit_bullet_freeze',
    name: 'Bullet-Time Arc Glitch',
    category: 'Cinematic Orbit',
    description: 'Ultra-fast lateral circular sweep with time-dilation slowdown at the peak moment of tension.',
    vector: { x: 0, y: 0, z: 0, pitch: 0, yaw: 120, roll: -4 },
    speedMultiplier: 2.0
  },

  // ── 2. Dolly & Push ──
  {
    id: 'dolly_vertigo_hitchcock',
    name: 'Hitchcock Vertigo Dolly-Zoom',
    category: 'Dolly & Push',
    description: 'Simultaneous optical zoom in while physically dollying out, distorting background perspective.',
    vector: { x: 0, y: 0, z: -4, pitch: 0, yaw: 0, roll: 0 },
    speedMultiplier: 1.0
  },
  {
    id: 'dolly_slow_push_in',
    name: 'Steadicam Forensic Push-In',
    category: 'Dolly & Push',
    description: 'Subtle, creeping push into the subject\'s eyes as crucial incriminating evidence is revealed.',
    vector: { x: 0, y: 0, z: 2.5, pitch: 0, yaw: 0, roll: 0 },
    speedMultiplier: 0.5
  },
  {
    id: 'dolly_reverse_reveal',
    name: 'Reverse Dolly Distance Reveal',
    category: 'Dolly & Push',
    description: 'Pulling back through a doorway, server rack, or police barricade to contextualize isolation.',
    vector: { x: 0, y: 0, z: -5, pitch: 2, yaw: 0, roll: 0 },
    speedMultiplier: 0.7
  },
  {
    id: 'dolly_lateral_truck',
    name: 'Lateral Tracking Truck',
    category: 'Dolly & Push',
    description: 'Tracking smoothly alongside the subject moving past bank teller windows or server alleys.',
    vector: { x: 4, y: 0, z: 0, pitch: 0, yaw: 0, roll: 0 },
    speedMultiplier: 1.1
  },

  // ── 3. FPV & Drone ──
  {
    id: 'fpv_dive_bomb',
    name: 'FPV Skyscraper Dive',
    category: 'FPV & Drone',
    description: 'Aggressive vertical dive down glass office facades into street-level trading floors.',
    vector: { x: 0, y: -8, z: 3, pitch: -60, yaw: 0, roll: 10 },
    speedMultiplier: 2.4
  },
  {
    id: 'fpv_trench_chase',
    name: 'High-Speed Server Trench Run',
    category: 'FPV & Drone',
    description: 'Ultra-low banking flight weaving through datacenter aisles with fiber optic motion blur.',
    vector: { x: 1, y: 0, z: 8, pitch: -5, yaw: 15, roll: 25 },
    speedMultiplier: 2.2
  },
  {
    id: 'fpv_canopy_sweep',
    name: 'Overhead Cyber Canopy Sweep',
    category: 'FPV & Drone',
    description: 'Gliding drone shot soaring above city skylines illuminated by neon transaction beams.',
    vector: { x: 2, y: 2, z: 6, pitch: -20, yaw: -10, roll: 5 },
    speedMultiplier: 1.3
  },

  // ── 4. Handheld & Staccato ──
  {
    id: 'handheld_interrogation_tremor',
    name: 'Documentary Interrogation Tremor',
    category: 'Handheld & Staccato',
    description: 'Organic human shoulder-rig micro-tremors evoking authentic undercover cinema verité.',
    vector: { x: 0.2, y: 0.1, z: 0.3, pitch: 2, yaw: -3, roll: 1 },
    speedMultiplier: 0.9
  },
  {
    id: 'handheld_whip_pan',
    name: 'Whip-Pan Kinetic Transition',
    category: 'Handheld & Staccato',
    description: 'Rapid 90-degree violent horizontal pan with heavy motion blur to slice between timeline events.',
    vector: { x: 0, y: 0, z: 0, pitch: 0, yaw: 90, roll: 8 },
    speedMultiplier: 3.0
  },
  {
    id: 'handheld_panic_chase',
    name: 'Undercover Raid Foot-Chase',
    category: 'Handheld & Staccato',
    description: 'Aggressive staccato footsteps, heavy breathing cadence, erratic framing during arrests.',
    vector: { x: 0.6, y: -0.4, z: 3, pitch: -10, yaw: 12, roll: -6 },
    speedMultiplier: 1.8
  },
  {
    id: 'handheld_dutch_tension',
    name: 'Dutch Angle Tension Cant',
    category: 'Handheld & Staccato',
    description: 'Off-axis tilted 18-degree horizon line expressing systemic corruption and psychological collapse.',
    vector: { x: 0, y: 0, z: 1, pitch: -5, yaw: 0, roll: 18 },
    speedMultiplier: 0.6
  },

  // ── 5. Forensic Crane ──
  {
    id: 'crane_god_view_90',
    name: 'Nadir 90° God View Descent',
    category: 'Forensic Crane',
    description: 'Top-down orthogonal crane dropping directly toward a desk covered in financial documents.',
    vector: { x: 0, y: -6, z: 0, pitch: -90, yaw: 0, roll: 0 },
    speedMultiplier: 0.8
  },
  {
    id: 'crane_jib_arc',
    name: 'Technocrane Arc Rise',
    category: 'Forensic Crane',
    description: 'Rising sweeping crane arm swinging over a packed courtroom or press conference crowd.',
    vector: { x: -3, y: 4, z: 2, pitch: -25, yaw: 45, roll: 0 },
    speedMultiplier: 1.0
  },
  {
    id: 'crane_crime_scene_creep',
    name: 'Forensic Crime Scene Low Creep',
    category: 'Forensic Crane',
    description: 'Extremely slow motorized slider inches above server floors tracing discarded hardware wallets.',
    vector: { x: 0, y: -1.8, z: 3, pitch: 10, yaw: 0, roll: 0 },
    speedMultiplier: 0.4
  }
]
