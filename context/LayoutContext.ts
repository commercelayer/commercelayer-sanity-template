import { createContext } from 'react'

type LayoutContextProps = {
  handleAnimation?: (e: any) => void
}

const LayoutContext = createContext<LayoutContextProps>({})

export default LayoutContext
