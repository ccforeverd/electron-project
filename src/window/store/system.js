import { version as ReactVersion } from 'react/package.json'
import { version as ProjectVersion } from '../../../package.json'

class StoreSystem {
  node = {
    version: process.versions.node
  }
  electron = {
    version: process.versions.electron
  }
  react = {
    version: ReactVersion
  }
  project = {
    version: ProjectVersion
  }
}

export default StoreSystem
