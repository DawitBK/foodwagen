export type Restaurant = {
  name: string
  logo: string
  status: 'Open Now' | 'Closed'
}

export type Food = {
  id: string
  name: string
  price?: string | number
  rating?: number
  image?: string
  restaurant?: Restaurant | null
}
