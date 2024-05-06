export function writeDOM (element, infoElement, holidaysDateEl, holidaysLabelEl) {
  if (!element) {
    throw new Error('Element not found')
  }

  const currentDate = new Date()

  if (areStoresClosed(currentDate)) {
    element.innerHTML = "Ne"
    element.style.color = "#A96569"

    infoElement.innerHTML = `Dne <span class="date">${currentDate.toLocaleDateString("cs")}</span> jsou obchody s rozlohou nad 200 m² zavřené 😏`
  } else {
    element.innerHTML = "Ano"
    element.style.color = "#007E75"

    infoElement.innerHTML = `Dne <span class="date">${currentDate.toLocaleDateString("cs")}</span> nejsou ovlivněny otevírací doby obchodů žádným státním svátkem.`
  }

  const nextHolidays = getNextHolidays(currentDate)

  if (nextHolidays) {
    holidaysDateEl.innerHTML = nextHolidays.date.toLocaleDateString("cs")
    holidaysLabelEl.innerHTML = nextHolidays.label
  }
}


function areStoresClosed(currentDate) {
  if (!currentDate) {
    throw new Error("Current date is not defined")
  }

  return Object.values(getClosedStoresHolidays(currentDate.getFullYear()))
    .some(({ date: holiday }) => holiday.getDate() === currentDate.getDate() && holiday.getMonth() === currentDate.getMonth())
}

const getClosedStoresHolidays = (currentYear) => ({
  newYear: {
    date: new Date(`${currentYear}-01-01`),
    label: "Nový rok"
  },
  easterMonday: {
    date: getEasterMondayDate(currentYear),
    label: "Velikonoční pondělí"
  },
  victoryDay: {
    date: new Date(`${currentYear}-05-08`),
    label: "Den vítězství"
  },
  stWenceslasDay: {
    date: new Date(`${currentYear}-09-28`),
    label: "Den české státnosti"
  },
  independentCzechoslovakStateDay: {
    date: new Date(`${currentYear}-10-28`),
    label: "Den vzniku samostatného československého státu"
  },
  christmasEve: {
    date: new Date(`${currentYear}-12-24`),
    label: "Štědrý den"
  },
  christmasDay: {
    date: new Date(`${currentYear}-12-25`),
    label: "1. svátek vánoční"
  },
  stStephensDay: {
    date: new Date(`${currentYear}-12-26`),
    label: "2. svátek vánoční"
  }
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

function getNextHolidays (currentDate) {
  const currentYear = currentDate.getFullYear()
  const holidays = getClosedStoresHolidays(currentYear)

  // Get holidays after the current date and sort them by date
  return Object.values(holidays)
    .filter(({ date: holiday }) => holiday > currentDate)
    .sort((a, b) => a - b)[0]
}

