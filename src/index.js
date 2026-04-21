
import './style.css'

const select = (name) => {
    return document.querySelector(name)
}

const el = (type, options = {}) => {
    const element = document.createElement(type)

    if(options.class) element.className = options.class
    if(options.src) element.src = options.src

    return element
}

const input = select('#locInput')
const searchBtn = select('.search-button')
const toggle = select('.temp-toggle > button')

const key = 'YAGVLE6WETGXYAW8PQMHBUJAM'
let isCelc = true 
let currentData = {}

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
    ? Math.round(((num - 32) * 5 / 9) * 10) / 10
    : Math.round(num * 10) / 10
}

const displayTemp = (data) => {
    const tempEl = select('.temp')
    const feelsEl = select('.feels-like')

    tempEl.textContent = `${interpretTemp(data.temp)}°`
    feelsEl.textContent = `Feels like ${interpretTemp(data.feelslike)}°`
}

const displayWeather = async(data) => {   
    console.log(data)

    const conditionEl = select('.condition')
    const locationEl = select('.location')
    const iconElement = select('.condition-icon')
    const icon = data.icon
    const iconSrc = await import(`./asset/icons/${icon}.svg`)

    locationEl.textContent = data.location
    conditionEl.textContent = data.condition
    displayTemp(data)
    
    iconElement.innerHTML = ''
    const img = el('img', {src: iconSrc.default})
    iconElement.appendChild(img) 
}

const search = async() => {
    if (input.value.length === 0) return

    const searchVal = input.value.replace(/ /g, "-")
    try {
        const rawData = await getWeather(searchVal)
        const data = interpretData(rawData)
        currentData = data
        displayWeather(data)
    } catch (err) {
        console.log(err)
    }
}

const toggleTempEl = () => {
    displayTemp(currentData)
    toggle.classList.toggle('celc', isCelc)
}

console.clear()

input.value = 'dublin'
search()
toggleTempEl()

searchBtn.addEventListener('click', search)

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') search()
})

toggle.addEventListener('click', () => {
    isCelc = !isCelc
    toggleTempEl()
})

window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault()
        input.focus()
    }

})