
const input = document.querySelector('input')
const searchBtn = document.querySelector('.search-button')

const key = 'YAGVLE6WETGXYAW8PQMHBUJAM'
let isCelc = true 
const getWeather = async (location) => {
    const req = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
    try {
        const response = await fetch(req)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

const interpretData = (data) => {
    const curr = data.currentConditions
    return {
        location: data.resolvedAddress,
        temp: curr.temp,            // in farenheight
        feelslike: curr.feelslike,  // in farenheight
        icon: curr.icon,
        condition: curr.conditions,
    }
}

const interpretTemp = (num) => { 
    return isCelc 
    ? Math.round((num - 32) * 5 / 9 * 10) / 10
    : Math.round(num * 10) / 10
}

const displayWeather = (data) => {    
    console.log(data.location)
    console.log(`${interpretTemp(data.temp)}°`)
    console.log(`Feels like ${interpretTemp(data.feelslike)}°`)
    console.log(data.condition)
}

const search = async() => {
    if (input.value.length === 0) return

    try {
        const rawData = await getWeather(input.value)
        const data = interpretData(rawData)
        displayWeather(data)
    } catch (err) {
        console.log(err)
    }
}

searchBtn.addEventListener('click', search)

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') search()
})