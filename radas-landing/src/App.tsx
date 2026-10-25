import ProPage from './ProPage'
import VideoLanding from './VideoLanding'

export default function App() {
  if (window.location.pathname === '/pro' || window.location.pathname === '/pro/') {
    return <ProPage />
  }
  return <VideoLanding />
}
