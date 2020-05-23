import Welcome from '../../components/Welcome/Welcome'
import Tank from '../../components/Tank/Tank'
import Settings from '../../components/Settings/Settings'
import Camera from '../../components/Camera/Camera'

const routes = [
    { id: 1, path: '/welcome', Component: Welcome },
    { id: 2, path: '/tank', Component: Tank },
    { id: 3, path: '/camera', Component: Camera },
    { id: 4, path: '/settings', Component: Settings }
]

export default routes