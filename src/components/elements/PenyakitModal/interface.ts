import { SetStateAction } from 'react'

export interface PenyakitModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}
