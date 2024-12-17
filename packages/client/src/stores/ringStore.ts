import { create } from 'zustand'

export type BandShape = 'round' | 'flat' | 'knife-edge' | 'comfort-fit'
export type MetalFinish = 'polished' | 'brushed' | 'hammered' | 'matte'
export type EnvironmentPreset = 'studio' | 'sunset' | 'dawn' | 'warehouse'
export type SettingType = 'prong-4' | 'prong-6' | 'bezel' | 'cathedral' | 'trellis'

interface RingState {
  metalColor: string
  stoneColor: string
  ringSize: number
  bandWidth: number
  bandShape: BandShape
  metalFinish: MetalFinish
  environment: EnvironmentPreset
  settingType: SettingType
  setMetalColor: (color: string) => void
  setStoneColor: (color: string) => void
  setRingSize: (size: number) => void
  setBandWidth: (width: number) => void
  setBandShape: (shape: BandShape) => void
  setMetalFinish: (finish: MetalFinish) => void
  setEnvironment: (preset: EnvironmentPreset) => void
  setSettingType: (type: SettingType) => void
}

export const useRingStore = create<RingState>((set) => ({
  metalColor: '#FFD700', // Default: Yellow Gold
  stoneColor: '#B9F2FF', // Default: Diamond
  ringSize: 7, // Default size
  bandWidth: 0.2, // Default width in relative units
  bandShape: 'round', // Default shape
  metalFinish: 'polished', // Default finish
  environment: 'studio', // Default environment
  settingType: 'prong-4', // Default setting
  setMetalColor: (color) => set({ metalColor: color }),
  setStoneColor: (color) => set({ stoneColor: color }),
  setRingSize: (size) => set({ ringSize: size }),
  setBandWidth: (width) => set({ bandWidth: width }),
  setBandShape: (shape) => set({ bandShape: shape }),
  setMetalFinish: (finish) => set({ metalFinish: finish }),
  setEnvironment: (preset) => set({ environment: preset }),
  setSettingType: (type) => set({ settingType: type }),
})) 