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
  id: number,
  name: string,
  code: string
  numericCode: string
  isActive: boolean | number,
  symbol: string,
  minorUnits: number,
  translates: {
    lang: string
    name: string
  }[]
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
  calculationType: string
  amount: number
  status: string
  checkoutFrom: number
  checkoutsTo: number
  activeFrom: string | any
  activeTo: string | any
  translates: {
    lang: string
    name: string
  }[]
}

export interface IPaymentsTypes {
  id: number
}

export interface IOperatorCommissions {
  id: number
  serviceType: string
  calculationType: string
  amount: number
  translates: {
    lang: string
    name: string
    description: string
  }[]
  name: string
  description: string
}


export interface IProviderContracts {
  id: number
  paymentProviderId: number
  organisationId: number
  placementId: string
  apartmentId: number
  gitId: string
  organizationType: string
  validFrom: string
  validTo: string
  params: {
    parameterName: string
    parameter: string
  }[]
}
