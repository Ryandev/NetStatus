
const secondsToMinutes = (tVal: number) => (tVal / 60);
const secondsToHours = (tVal: number) => (tVal / 60 / 60);
const secondsToDays = (tVal: number) => (tVal / 60 / 60 / 24);
const minutesToSeconds = (tVal: number) => (tVal * 60);
const hoursToSeconds = (tVal: number) => (tVal * 60 * 60);
const daysToSeconds = (tVal: number) => (tVal * 60 * 60 * 24);

const describeDifferenceBetweenDates = function (startDate: Date, endDate: Date): string {
    if (!startDate) {
        return '';
    }
    if (!endDate) {
        return '';
    }

    const deltaSeconds = Math.round(Math.abs(startDate.getTime() - endDate.getTime()) / 1000)

    switch (true) {
        case(deltaSeconds < 1):
            return 'now';

        case(deltaSeconds < 60):
            return deltaSeconds + 's';

        case(deltaSeconds < minutesToSeconds(60)):
            {
                const count = Math.round(secondsToMinutes(deltaSeconds))
                return count + ' min' + (count > 1
                    ? 's'
                    : '');
            }

        case(deltaSeconds < hoursToSeconds(24)):
            {
                const count = Math.round(secondsToHours(deltaSeconds))
                return count + ' hr' + (count > 1
                    ? 's'
                    : '');
            }

        default:
            {
                const count = Math.round(secondsToDays(deltaSeconds))
                return count + ' day' + (count > 1
                    ? 's'
                    : '');
            }
    }
}

const exports = {
    secondsToMinutes,
    secondsToHours,
    secondsToDays,
    minutesToSeconds,
    hoursToSeconds,
    daysToSeconds,
    describeDifferenceBetweenDates,
}

export default exports;
