export const formatData = (result, itemsKey) => {
    // Group by date
    const groupedByDate = result.reduce((acc, item) => {
        const dateObj = new Date(item['date']);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const year = dateObj.getFullYear();
        const date = `${day} ${month} ${year}`;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item[itemsKey]);
        return acc;
    }, {});
    // Convert to array format
    return Object.entries(groupedByDate).map(([date, items]) => ({
        date,
        [itemsKey]: items
    }));
};

export const countByYearAndMonth = (data, isUsersPane) => {
    const userCountByYearAndMonth = {};
    data?.forEach(entry => {
        const [day, month, year] = entry.date.split(' ');
        if (!userCountByYearAndMonth[year]) {
            userCountByYearAndMonth[year] = {};
        }
        if (!userCountByYearAndMonth[year][month]) {
            userCountByYearAndMonth[year][month] = 0;
        }
        if (isUsersPane) {
            userCountByYearAndMonth[year][month] += entry.healthID.length;
        } else {

            userCountByYearAndMonth[year][month] += entry.hospitalId.length;
        }
    });
    return userCountByYearAndMonth;
};
