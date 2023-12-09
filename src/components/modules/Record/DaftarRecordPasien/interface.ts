export interface PasienEmailProps {
  email: string | null | undefined
}

export interface Record {
  id: number
  dokterEmail: string
  pasienId: number
  isVerified: boolean | null
  description: string | null
  penyakit: string | null
  createdAt: string
  resepObat: RecordObat[]
  currentEmail: string | null
}

export interface RecordObat {
  dosis: string
  obat: string
  kategoriObatName: string
}
