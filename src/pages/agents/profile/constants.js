export const getYears = (countsList) => {
    const years = Object.keys(countsList).map(year => parseInt(year));
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const range = [];
    for (let i = minYear; i <= maxYear; i++) {
        range.push({ label: i.toString(), value: i });
    }
    return range;
}
