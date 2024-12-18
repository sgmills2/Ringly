import {
  Sheet,
  Typography,
  Select,
  Option,
  Slider,
  FormControl,
  FormLabel,
  Stack,
  Tooltip,
} from '@mui/joy'
import { useRingStore, type BandShape, type MetalFinish, type EnvironmentPreset, type SettingType } from '@/stores/ringStore'
import ChatBot from './ChatBot'

const metals = [
  { label: 'Yellow Gold', value: '#FFD700' },
  { label: 'White Gold', value: '#F5F5F5' },
  { label: 'Rose Gold', value: '#B76E79' },
  { label: 'Platinum', value: '#E5E4E2' },
]

const stones = [
  { label: 'Diamond', value: '#B9F2FF' },
  { label: 'Ruby', value: '#E0115F' },
  { label: 'Sapphire', value: '#0F52BA' },
  { label: 'Emerald', value: '#50C878' },
]

const bandShapes = [
  { label: 'Round', value: 'round', description: 'Traditional rounded band profile' },
  { label: 'Flat', value: 'flat', description: 'Modern flat surface profile' },
  { label: 'Knife Edge', value: 'knife-edge', description: 'Sharp, angular profile meeting at a point' },
  { label: 'Comfort Fit', value: 'comfort-fit', description: 'Rounded interior for comfortable wear' },
]

const metalFinishes = [
  { label: 'Polished', value: 'polished', description: 'High-shine mirror finish' },
  { label: 'Brushed', value: 'brushed', description: 'Subtle linear texture' },
  { label: 'Hammered', value: 'hammered', description: 'Textured surface with small indentations' },
  { label: 'Matte', value: 'matte', description: 'Soft, non-reflective finish' },
]

const environments = [
  { label: 'Studio', value: 'studio', description: 'Clean, professional lighting' },
  { label: 'Sunset', value: 'sunset', description: 'Warm, golden hour lighting' },
  { label: 'Dawn', value: 'dawn', description: 'Cool, morning lighting' },
  { label: 'Warehouse', value: 'warehouse', description: 'Industrial, dramatic lighting' },
]

const settingTypes = [
  { label: '4-Prong', value: 'prong-4', description: 'Classic four-prong setting' },
  { label: '6-Prong', value: 'prong-6', description: 'Secure six-prong setting' },
  { label: 'Bezel', value: 'bezel', description: 'Modern full metal surround' },
  { label: 'Cathedral', value: 'cathedral', description: 'Elegant arched supports' },
  { label: 'Trellis', value: 'trellis', description: 'Interweaving prong design' },
]

export default function CustomizationPanel() {
  const {
    metalColor,
    stoneColor,
    ringSize,
    bandWidth,
    bandShape,
    metalFinish,
    environment,
    settingType,
    setMetalColor,
    setStoneColor,
    setRingSize,
    setBandWidth,
    setBandShape,
    setMetalFinish,
    setEnvironment,
    setSettingType,
  } = useRingStore()

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: 320,
        p: 2,
        borderRadius: 'md',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxHeight: '100%',
        overflow: 'auto',
      }}
    >
      <ChatBot />
      
      <Typography level="h3" sx={{ fontFamily: 'display' }}>
        Customize Your Ring
      </Typography>

      <FormControl>
        <FormLabel>Metal Type</FormLabel>
        <Select
          value={metalColor}
          onChange={(_, value) => value && setMetalColor(value)}
        >
          {metals.map((metal) => (
            <Option key={metal.value} value={metal.value}>
              {metal.label}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Metal Finish</FormLabel>
        <Select
          value={metalFinish}
          onChange={(_, value) => value && setMetalFinish(value as MetalFinish)}
        >
          {metalFinishes.map((finish) => (
            <Tooltip title={finish.description} variant="soft" placement="right">
              <Option key={finish.value} value={finish.value}>
                {finish.label}
              </Option>
            </Tooltip>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Stone Type</FormLabel>
        <Select
          value={stoneColor}
          onChange={(_, value) => value && setStoneColor(value)}
        >
          {stones.map((stone) => (
            <Option key={stone.value} value={stone.value}>
              {stone.label}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Setting Style</FormLabel>
        <Select
          value={settingType}
          onChange={(_, value) => value && setSettingType(value as SettingType)}
        >
          {settingTypes.map((setting) => (
            <Tooltip title={setting.description} variant="soft" placement="right">
              <Option key={setting.value} value={setting.value}>
                {setting.label}
              </Option>
            </Tooltip>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Ring Size (US)</FormLabel>
        <Stack spacing={2} direction="row" alignItems="center">
          <Slider
            value={ringSize}
            onChange={(_, value) => setRingSize(value as number)}
            min={3}
            max={13}
            step={0.5}
            valueLabelDisplay="auto"
          />
          <Typography level="body-sm">{ringSize}</Typography>
        </Stack>
      </FormControl>

      <FormControl>
        <FormLabel>Band Width (mm)</FormLabel>
        <Stack spacing={2} direction="row" alignItems="center">
          <Slider
            value={bandWidth * 10}
            onChange={(_, value) => setBandWidth((value as number) / 10)}
            min={1}
            max={6}
            step={0.5}
            valueLabelDisplay="auto"
          />
          <Typography level="body-sm">{(bandWidth * 10).toFixed(1)}</Typography>
        </Stack>
      </FormControl>

      <FormControl>
        <FormLabel>Band Shape</FormLabel>
        <Select
          value={bandShape}
          onChange={(_, value) => value && setBandShape(value as BandShape)}
        >
          {bandShapes.map((shape) => (
            <Tooltip title={shape.description} variant="soft" placement="right">
              <Option key={shape.value} value={shape.value}>
                {shape.label}
              </Option>
            </Tooltip>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Lighting</FormLabel>
        <Select
          value={environment}
          onChange={(_, value) => value && setEnvironment(value as EnvironmentPreset)}
        >
          {environments.map((env) => (
            <Tooltip title={env.description} variant="soft" placement="right">
              <Option key={env.value} value={env.value}>
                {env.label}
              </Option>
            </Tooltip>
          ))}
        </Select>
      </FormControl>
    </Sheet>
  )
} 