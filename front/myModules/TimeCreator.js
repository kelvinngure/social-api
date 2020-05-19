const getCurrentExactTime = () => {
        const timeStamp = Date.now()
        const fullDate = new Date(timeStamp)

        const date = fullDate.getDate()
        const month = fullDate.getMonth() + 1
        const year = fullDate.getFullYear()

        const hour = fullDate.getHours()
        const minute = fullDate.getMinutes()
        const second = fullDate.getSeconds()
        const millisecond = fullDate.getMilliseconds()

        const returnDate = `${year}-${month}-${date} ${hour}:${minute}:${second}`
        return returnDate
}

export default getCurrentExactTime