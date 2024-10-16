export interface Columns {
  header: string
  accessor: string
  className?: string
}

export interface Orders {
  name: string
  company: string
  email?: string
  phone?: string
  product: string
  status: string
  date: string
  amount: number
}

export interface Users {
  name: string
  email: string
  phone: string
  role: string
  position: string
  userId: number
  image: string
}

export interface SingleOrder {
  name: string
  company: string
  email: string
  phone: string
  product: string
  status: string
  date: string
  description: string
  amount: number
  paymentVerified?: string
  deliveryVerified?: string
}
