import { RecordObat } from '../modules/Record/DaftarRecordPasien/interface'
import { Penyakit } from '../modules/Record/EditRecord/interface'
export interface MedicalRecord {
  id: number
  dokterId: number
  pasienId: number
  isVerified: boolean
  description: string
  penyakitId: number
  dokter: {
    name: string
  }
  penyakit: string
  createdAt: string
  recordObat: RecordObat[]
  
}
export interface Obat {
  name: string
  kategori: {name:string}
}

export interface ObatRecord {
  dosis: string
  obat: Obat
}
