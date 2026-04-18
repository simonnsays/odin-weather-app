
import './style.css'
const input = document.querySelector('input')
const searchBtn = document.querySelector('.search-button')

const key = 'YAGVLE6WETGXYAW8PQMHBUJAM'
let isCelc = true 

const select = (name) => {
    return document.querySelector(name)
}

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
    const tempEl = select('.temp')
    const conditionEl = select('.condition')
    const locationEl = select('.location')
    const feelsEl = select('.feels-like')
    console.log(tempEl.textContent)

    locationEl.textContent = data.location
    tempEl.textContent = `${interpretTemp(data.temp)}°`
    conditionEl.textContent = data.condition
    feelsEl.textContent = `Feels like ${interpretTemp(data.feelslike)}°`
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

console.clear()

searchBtn.addEventListener('click', search)

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') search()
})