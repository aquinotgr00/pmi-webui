export default function ucwords (str) {
  return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase()
  })
}

export function genderTranslate(gender) {
  return gender==='male'?'Laki-Laki':'Perempuan'
}