import { Box, Container, Sheet, Typography, CircularProgress, IconButton } from '@mui/joy'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { styled } from '@mui/joy/styles'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { Suspense, useState } from 'react'

import RingViewer from './components/RingViewer'
import CustomizationPanel from './components/CustomizationPanel'
import { ErrorBoundary } from './components/ErrorBoundary'

const LoadingBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '32px',
  borderRadius: '8px',
})

const ViewerSheet = styled(Sheet)({
  flex: 1,
  borderRadius: 'var(--joy-radius-md)',
  overflow: 'hidden',
  position: 'relative',
})

const WrapperBox = styled(Box)({
  display: 'flex',
  gap: '16px',
  height: 'calc(100% - 80px)',
})

const CollapseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: -20,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  backgroundColor: theme.vars.palette.background.surface,
  boxShadow: theme.shadow.sm,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.vars.palette.background.level1,
  }
}))

const MobilePanel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed?: boolean }>(({ theme, isCollapsed }) => ({
  position: 'relative',
  backgroundColor: theme.vars.palette.background.surface,
  transition: 'width 0.3s ease-in-out',
  width: isCollapsed ? 0 : 320,
  [theme.breakpoints.down('sm')]: {
    position: 'fixed',
    right: isCollapsed ? 10 : 0,
    top: 0,
    bottom: 0,
    transition: 'right 0.3s ease-in-out',
    zIndex: 1000,
    height: '100%',
  },
}))

function LoadingFallback() {
  return (
    <LoadingBox>
      <CircularProgress size="lg" />
      <Typography level="body-sm">Loading 3D Viewer...</Typography>
    </LoadingBox>
  )
}

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const canvasProps: Partial<CanvasProps> = {
    camera: { position: [0, 0, 5], fov: 45 },
    style: { background: '#f9f9fa' }
  }

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', py: 2 }}>
      <Typography level="h1" sx={{ mb: 2, fontFamily: 'display' }}>
        Ringly
      </Typography>
      
      <WrapperBox>
        <ViewerSheet variant="outlined">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Canvas {...canvasProps}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <RingViewer />
                <OrbitControls 
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI * 3 / 4}
                  minDistance={3}
                  maxDistance={8}
                />
              </Canvas>
              <Loader />
            </Suspense>
          </ErrorBoundary>
        </ViewerSheet>

        <MobilePanel isCollapsed={isCollapsed}>
          <CollapseButton 
            variant="soft"
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              transform: isCollapsed ? 
                'translate(0, -50%) rotate(180deg)' : 
                'translate(0, -50%)',
            }}
          >
            <KeyboardArrowRightRoundedIcon />
          </CollapseButton>
          <CustomizationPanel />
        </MobilePanel>
      </WrapperBox>
    </Container>
  )
} 