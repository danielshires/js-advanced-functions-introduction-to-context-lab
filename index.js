// Your code here

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
    // Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
    // Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {

    const newMap = arrays.map(data => {
        return {
            firstName: data[0],
            familyName: data[1],
            title: data[2],
            payPerHour: data[3],
            timeInEvents: [],
            timeOutEvents: []
        }
    })
    return newMap
}

const nameExtractor = function(record) {
    return record.firstName
}

function createTimeInEvent(employeeRecord, dateTimeIn) {

    const timeInObj = {
        type: "TimeIn",
        date: dateTimeIn.split(" ")[0],
        hour: parseInt(dateTimeIn.split(" ")[1])
    }

    employeeRecord.timeInEvents.push(timeInObj)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeOut) {

    const timeOutObj = {
        type: "TimeOut",
        date: dateTimeOut.split(" ")[0],
        hour: parseInt(dateTimeOut.split(" ")[1])
    }

    employeeRecord.timeOutEvents.push(timeOutObj)

    return employeeRecord
}

function hoursWorkedOnDate(cRecord, dateCheck) {

    const newRecord = []

    for (const date in cRecord.timeInEvents) {
        if (dateCheck === cRecord.timeInEvents[date].date) {
            newRecord.push(cRecord.timeInEvents[date])
        }
    }

    for (const date in cRecord.timeOutEvents) {
        if (dateCheck === cRecord.timeOutEvents[date].date) {
            newRecord.push(cRecord.timeOutEvents[date])
        }
    }

    const result = newRecord[1].hour.toString().slice(0, -2) - newRecord[0].hour.toString().slice(0, -2)

    return result


}

function wagesEarnedOnDate(cRecord, dateCheck) {

    const hoursWorked = hoursWorkedOnDate(cRecord, dateCheck)

    return hoursWorked * cRecord.payPerHour

}

function allWagesFor(cRecord) {

    const totalWages = []

    const datesWorked = []

    let i = 0

    while (i < cRecord.timeInEvents.length) {
        if (cRecord.timeInEvents[i].date === cRecord.timeOutEvents[i].date) {
            datesWorked.push(cRecord.timeInEvents[i].date)
        }
        i++
    }

    for (const dates in datesWorked) {
        totalWages.push(wagesEarnedOnDate(cRecord, datesWorked[dates]))
    }

    return totalWages.reduce((sum, a) => sum + a, 0)

}

function calculatePayroll(cRecord) {

    let grandTotalOwed = cRecord.reduce((m, e) => m + allWagesFor(e), 0)

    return grandTotalOwed
}

function findEmployeeByFirstName(cRecord, employeeName) {

    let searchResult = cRecord.find(record => {
        return record.firstName === employeeName
    })

    return searchResult
}