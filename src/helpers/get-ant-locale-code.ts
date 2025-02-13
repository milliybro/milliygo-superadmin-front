type LocaleMap = {
    [key in
      | 'uz'
      | 'ru'
      | 'oz']: string
  }
  
  export function getAntdLocaleCode(lang: string): string {
    const antdLocaleMap: LocaleMap = {
      uz: 'uz_UZ',
      ru: 'ru_RU',
      oz: 'uz_UZ',
    }
  
    return antdLocaleMap?.[lang as keyof LocaleMap] || 'ru_RU'
  }
  