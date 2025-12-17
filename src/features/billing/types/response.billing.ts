export interface ListResponseBilling<T> {
  content: T[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  numberOfElements: number
  size: number
  number: number
  sort: any[]
  first: boolean
  empty: boolean
}


 interface Pageable {
  pageNumber: number
  pageSize: number
  sort: any[]
  offset: number
  paged: boolean
  unpaged: boolean
}
