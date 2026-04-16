
const locInput = 'kaypian'
const key = 'YAGVLE6WETGXYAW8PQMHBUJAM'
const req = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locInput}?key=${key}`
let isCelc = true 
// let temp = '0°' // degree in celcius
const getWeather = async () => {
    try {

        const response = await fetch(req)
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

const interpretData = async() => {
    const data = await getWeather()
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

const displayWeather = async () => {
    const data = await interpretData()

    console.log(data.location)
    console.log(`${interpretTemp(data.temp)}°`)
    console.log(`Feels like ${interpretTemp(data.feelslike)}°`)
    console.log(data.condition)
}

// interpretData()
// console.log(await interpretData())
displayWeather()

// farenheight: Math.round(curr.temp * 10) / 10,
// celcius: Math.round((curr.temp - 32) * 5 / 9 * 10) / 10,