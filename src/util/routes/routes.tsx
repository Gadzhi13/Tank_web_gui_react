import Welcome from '../../components/Welcome/Welcome'
import Tank from '../../components/Tank/Tank'
import Settings from '../../components/Settings/Settings'
import Multimedia from '../../components/Multimedia/Multimedia'
import Iroutes from '../../types/Iroutes'

const routes: Iroutes = [
    { id: 1, path: '/welcome', component: Welcome },
    { id: 2, path: '/tank', component: Tank },
    { id: 3, path: '/multimedia', component: Multimedia },
    { id: 4, path: '/settings', component: Settings }
]

export default routes