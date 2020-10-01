const secondsToMinutes = tVal => parseInt(tVal / 60);
const secondsToHours = tVal => parseInt(tVal / 60 / 60);
const secondsToDays = tVal => parseInt(tVal / 60 / 60 / 24);
const minutesToSeconds = tVal => parseInt(tVal * 60);
const hoursToSeconds = tVal => parseInt(tVal * 60 * 60);
const daysToSeconds = tVal => parseInt(tVal * 60 * 60 * 24);

const describeDifferenceBetweenDates = function (startDate, endDate) {
    if (!startDate) {
        return '';
    }
    if (!endDate) {
        return '';
    }

    const deltaSeconds = parseInt(Math.abs(startDate.getTime() - endDate.getTime()) / 1000)

    switch (true) {
        case(deltaSeconds < 1):
            return 'now';

        case(deltaSeconds < 60):
            return deltaSeconds + 's';

        case(deltaSeconds < minutesToSeconds(60)):
            {
                const count = secondsToMinutes(deltaSeconds)
                return count + ' min' + (count > 1
                    ? 's'
                    : '');
            }

        case(deltaSeconds < hoursToSeconds(24)):
            {
                const count = secondsToHours(deltaSeconds)
                return count + ' hr' + (count > 1
                    ? 's'
                    : '');
            }

        default:
            {
                const count = secondsToDays(deltaSeconds)
                return count + ' day' + (count > 1
                    ? 's'
                    : '');
            }
    }
}

export default {
    describeDifferenceBetweenDates
};
