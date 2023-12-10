export interface Obat {
  id: number
  name: string
  kategori: KategoriObat
}

export interface KategoriObat {
  id: number
  name: string
}

export interface GetKategoriObat {
  listKategoriObat: KategoriObat[]
}
