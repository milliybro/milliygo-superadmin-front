const settings = {
    // baseURL: import.meta.env.VITE_BASE_URL,
    baseURL: 'https://api.emehmon.xdevs.uz/api/v1',
    staleTime: 120000, // 2 mins,
    requestTimeout: 180000, // 3 mins
    idleTimeout: 3000, // 3 sec
    rowsPerPage: 10,
    messageDuration: 3,
    defaultLanguage: 'ru',
    project: {},
  } as const
  
  export default settings
  