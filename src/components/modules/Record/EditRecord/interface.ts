export interface EditRecordProps {
  id: number | undefined
}

export interface Penyakit {
  id: number | undefined
  name: string | undefined
  category: string | undefined
}

export interface Obat {
  id: number | undefined
  name: string | undefined
  kategoriObatId: number | undefined
}

export interface ObatPair {
  obatId: number | undefined
  dosis: string | undefined
}

export interface SelectInterface {
  value: string
  label: string
}
