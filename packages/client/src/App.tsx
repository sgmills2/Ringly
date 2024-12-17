import { Box, Container, Sheet, Typography, CircularProgress } from '@mui/joy'
import { styled } from '@mui/joy/styles'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { Suspense } from 'react'

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

function LoadingFallback() {
  return (
    <LoadingBox>
      <CircularProgress size="lg" />
      <Typography level="body-sm">Loading 3D Viewer...</Typography>
    </LoadingBox>
  )
}

export default function App() {
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

        <CustomizationPanel />
      </WrapperBox>
    </Container>
  )
} 