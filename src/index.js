
const locInput = 'dublin'
const key = 'YAGVLE6WETGXYAW8PQMHBUJAM'
const req = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locInput}?key=${key}`

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
        temp: curr.temp,    // in farenheight
        icon: curr.icon,
        condition: curr,
        feelslike: curr.feelslike
    }
}

// interpretData()
console.log(await interpretData())


// farenheight: Math.round(curr.temp * 10) / 10,
// celcius: Math.round((curr.temp - 32) * 5 / 9 * 10) / 10,