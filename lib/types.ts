export interface Columns {
  header: string
  accessor: string
  className?: string
}

export interface Orders {
  id: string
  name: string
  company: string
  email?: string
  phone?: string
  address?: string
  product: string
  status: string
  date: string
  amount: number
  description?: string
  creatorId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Users {
  name: string
  email: string
  phone: string
  role: 'ADMIN' | 'SUPERVISOR' | 'USER'
  position: string
  userId?: string
  address?: string
  image?: File
  notes?: string
  password?: string
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

export enum FormFieldType {
  INPUT = 'input',
  NUMBER_INPUT = 'priceInput',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'password',
}
