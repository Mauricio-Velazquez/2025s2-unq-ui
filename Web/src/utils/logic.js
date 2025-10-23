const transforDate = date => {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  const hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${year} - ${hours}:${minutes}`
}

export { transforDate }

export function parseFormData (formData) {
  const data = Object.fromEntries(formData.entries())

  for (const camp in data) {
    data[camp] = data[camp].trim()
  }

  return data
}
