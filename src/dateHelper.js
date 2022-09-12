const {format, differenceInCalendarDays, isSameYear, parseISO, isToday, isFuture, isPast} = require('date-fns');

let today = new Date();

function oneDayDifference(date) {        
    if (differenceInCalendarDays(date, today) === -1) {
        return 'Yesterday';        
    } else if (differenceInCalendarDays(date, today) === 1) {
        return 'Tomorrow';        
    } else if (differenceInCalendarDays(date, today) === 0) {
        return 'Today';
    } else {
        return false;
    }
}

function displayDateFormat(date){
    
    if (typeof(date) == 'string'){
        date = parseISO(date);  
    } 
    
    if(oneDayDifference(date)) {
        return oneDayDifference(date);
    } else if (isSameYear(today, date)) {
        return format(date,'MMM-do');
    } else {
        return format(date,'MMM-do-y');
    }
}

function dateIsToday(date){
    date = parseISO(date);    
    if (isToday(date)) {
        return true
    }
    return false;
}

function isInFuture(date){
    date = parseISO(date)
    if (isFuture(date)) {
        return true
    } 
    return false
}

function isInPast(date){
    date = parseISO(date)
    
    return isPast(date)
}



export { oneDayDifference, displayDateFormat, dateIsToday, isInFuture, isInPast}