export function getYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1976; year--) {
        years.push(year);
    }
    return years;
}