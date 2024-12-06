const formatPhoneNumber = (phone?: string): string => {
  if (phone) {
    return phone
      .replace(/\D/g, '')
      .replace(
        /^(\d{0,3})(\d{2})?(\d{0,3})(\d{0,2})(\d{0,2}).*/,
        (
          _: string,
          p1: string,
          p2: string,
          p3: string,
          p4: string,
          p5: string,
        ) => {
          return (
            (_.length > 0 ? '+' : '') +
            [p1, p2 ? (_.length < 6 ? p2 : `${p2}`) : p2, p3, p4, p5]
              .filter(Boolean)
              .join(' ')
          )
        },
      )
  } else {
    return '-'
  }
}

export default formatPhoneNumber
