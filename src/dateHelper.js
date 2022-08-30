const {addDays,format, differenceInCalendarDays, isSameYear, parseISO, parseJSON} = require('date-fns');

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
    
    date = parseJSON(date);
      
    if(oneDayDifference(date)) {
        return oneDayDifference(date);
    } else if (isSameYear(today, date)) {
        return format(date,'MMM-do');
    } else {
        return format(date,'MMM-do-y');
    }
}



export { oneDayDifference, displayDateFormat}