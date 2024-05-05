export function writeDOM (element, infoElement) {
  if (!element) {
    throw new Error('Element not found')
  }

  if (areStoresClosed(new Date())) {
    element.innerHTML = "Ne"
    element.style.color = "red"

    infoElement.innerHTML = "Obchody s rozlohou nad 200 m² jsou dnes zavřené 😏"
  } else {
    element.innerHTML = "Ano"
    element.style.color = "green"

    infoElement.innerHTML = "Dnes nejsou ovlivněny otevírací doby obchodů žádným státním svátkem."
  }
}


function areStoresClosed(currentDate) {
  if (!currentDate) {
    throw new Error("Current date is not defined")
  }

  return Object.values(getClosedStoresHolidays(currentDate.getFullYear())).some(holiday => {
    return holiday.getDate() === currentDate.getDate() && holiday.getMonth() === currentDate.getMonth()
  })
}

const getClosedStoresHolidays = (currentYear) => ({
  newYear: new Date(`${currentYear}-01-01`),
  easterMonday: getEasterMondayDate(currentYear),
  victoryDay: new Date(`${currentYear}-05-08`),
  stWenceslasDay: new Date(`${currentYear}-09-28`),
  independentCzechoslovakStateDay: new Date(`${currentYear}-10-28`),
  christmasEve: new Date(`${currentYear}-12-24`),
  christmasDay: new Date(`${currentYear}-12-25`),
  stStephensDay: new Date(`${currentYear}-12-26`),
})

function getEasterMondayDate(currentYear) {
  const getMConstant = (currYear) => {
    if (currYear >= 1900 && currYear <= 2199) {
      return 24
    }
    if (currYear >= 2200 && currYear <= 2299) {
      return 25
    }

    throw new Error('Year is not supported')
  };

  const getNConstant = (currYear) => {
    if (currYear >= 1900 && currYear <= 2099) {
      return 5
    }
    if (currYear >= 2100 && currYear <= 2199) {
      return 6
    }
    if (currYear >= 2200 && currYear <= 2299) {
      return 0
    }

    throw new Error('Year is not supported')
  }

  const a = currentYear % 19
  const b = currentYear % 4
  const c = currentYear % 7
  const m = getMConstant(currentYear)
  const d = (19 * a + m) % 30
  const n = getNConstant(currentYear)
  const e = (n + 2 * b + 4 * c + 6 * d) % 7

  // +1 because we need to get the date of Easter Monday not Sunday
  return new Date(currentYear, 2, 22 + d + e + 1)
}

