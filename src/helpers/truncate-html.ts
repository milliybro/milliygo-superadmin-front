function truncateHtml(html: string, maxLength = 150): string {
  console.log('truncate is called')
  const div = document.createElement('div')
  div.innerHTML = html
  const text = div.textContent || div.innerText || ''

  const truncated = text.slice(0, maxLength).trim()
  return truncated + (text.length > maxLength ? '...' : '')
}

export default truncateHtml
