import Welcome from '../../components/Welcome/Welcome'
import Tank from '../../components/Tank/Tank'
import Settings from '../../components/Settings/Settings'
import Multimedia from '../../components/Multimedia/Multimedia'
import route from '../../types/route'

const routes: route[] = [
    { id: 1, path: '/welcome', Component: Welcome },
    { id: 2, path: '/tank', Component: Tank },
    { id: 3, path: '/multimedia', Component: Multimedia },
    { id: 4, path: '/settings', Component: Settings }
]

export default routes