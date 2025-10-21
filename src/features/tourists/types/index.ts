interface ITouristsTable {
  key: string
  id: number
  status: boolean
  full_name: string
  birth_date: string
  passport_number: string
  gender: string
  address: string
  type_document: string
}

interface ITourists {
  id: number
  full_name: string
  birth_date: string
  gender: string
  docgiveplace: string
  document_type: string | null
  passport_sn: string | null
}

interface IRegions {
  key: string
  id: number
  code: string
  name: string
}
interface ITourist {
  key: string
  id: number
  first_name: string
  last_name: string
  middle_name: string
  passport_sn: string
  user_information: {
    birth_date: string
    birthcountry: string
    citizenship: string
    country: string
    day_of_tourist_arrival: string
    day_of_tourist_departure: string
    doc_given_date: string
    docgiveplace: string
    document_type: string
    gender: string
    guest_type: string
    nationality: string
    purpose_of_arrival: string
  }
  visa_information: {
    visa_expiry_date: string
    visa_issue_date: string
    visa_issued_by: string
    visa_number: string
    visa_type: string
  }
  child_information: {
    birth_date: string
    day_of_departure: string
    full_name: string
    gender: string
    passport_serial_number: string
  }
}

export type { IRegions, ITourist, ITouristsTable, ITourists }
