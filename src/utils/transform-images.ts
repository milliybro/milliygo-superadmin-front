export const transformImages = (html: string) => {
  return html.replace(/src=/g, 'url=')
}
