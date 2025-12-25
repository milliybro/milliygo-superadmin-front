export interface ICurrencies {
  id: number
  currencyTypeId: number
  currencyTypeCode: string
  currencyTypeSymbol: any
  currencyTypeTranslateName: string
  rate: number
  rateDate: any
  source: string
  date: string
}

export interface ICurrencyTypes {
  id: number
  code: string
  numericCode: string
  name: string
  isActive: boolean
}

export interface IPaymentProviders {
  id: number
  name: string
  type: string
  supportedCurrencies: string[]
  code: string
  status: string
  minAmount: number
  maxAmount: number
  calculationType: string
  commissionRate: number
}

export interface ITaxRates {
  id: number
}

export interface ITouristTaxes {
  id: number
  name: string
  placeType: string
  citizenship: string
  roomsFrom: number
  roomsTo: number
  rate: number
  status: string
  actualFrom: any
  actualTo: any
  rateType: string
  description: string
}

export interface ISubscriberServices {
  id: number
}

export interface IPaymentsTypes {
  id: number
}
