const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const locale = localStorage.getItem('i18nextLng') || 'ru'

  const monthsUzLat = [
    'yanvar',
    'fevral',
    'mart',
    'aprel',
    'may',
    'iyun',
    'iyul',
    'avgust',
    'sentabr',
    'oktabr',
    'noyabr',
    'dekabr',
  ]

  const monthsUzCyr = [
    'январ',
    'феврал',
    'март',
    'апрел',
    'май',
    'июн',
    'июл',
    'август',
    'сентябр',
    'октябр',
    'ноябр',
    'декабр',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  let formattedDate = ''

  if (locale === 'uz') {
    formattedDate = `${day} ${monthsUzCyr[monthIndex]}, ${year}`
  } else if (locale === 'oz') {
    formattedDate = `${day} ${monthsUzLat[monthIndex]}, ${year}`
  } else {
    formattedDate = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  return formattedDate
}

export default formatDate
