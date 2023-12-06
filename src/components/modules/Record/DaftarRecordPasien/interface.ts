export interface PasienEmailProps {
  email: string | null | undefined
}

export interface Record {
  id: number
  dokterId: number
  pasienId: number
  isVerified: boolean | null
  description: string | null
  penyakitId: number | null
  createdAt: string
  recordObat: RecordObat[]
}

export interface RecordObat {
  dosis: string
  obatId: number
  recordId: number
}
