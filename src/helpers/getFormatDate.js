module.exports = () => {
  const date = new Date().toLocaleString('en-GB', { timeZone: 'America/Argentina/Buenos_Aires' })
  const [full, time] = date.split(', ')
  return { full, time }
}