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
  commissionType: string
  commissionRate: number
}

export interface ITaxRates {
  id: number
}

export interface ITouristTaxes {
  id: number
}

export interface ISubscriberServices {
  id: number
}

export interface IPaymentsTypes {
  id: number
}
