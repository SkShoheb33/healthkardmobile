export const formatData = (result, itemsKey) => {
    // Group by date
    const groupedByDate = result.reduce((acc, item) => {
        const date = formatDate(item['date']);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item[itemsKey]);
        return acc;
    }, {});
    // Convert to array format
    const formattedData = Object.entries(groupedByDate).map(([date, items]) => ({
        date,
        [itemsKey]: items
    }));
    // console.log('Formatted Data:');
    // console.log(JSON.stringify(formattedData, null, 2));
    return formattedData;
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
            userCountByYearAndMonth[year][month] += entry.amount.reduce((sum, amount) => sum + amount, 0);
        } else {

            userCountByYearAndMonth[year][month] += entry.hospitalId.length;
        }
    });
    return userCountByYearAndMonth;
};

export const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
};

export const calculateMonthlyStats = (data, isUsersPane) => {
    const monthlyStats = {};
    data?.forEach(entry => {
        const [day, month, year] = entry.date.split(' ');
        if (!monthlyStats[year]) {
            monthlyStats[year] = {};
        }
        if (!monthlyStats[year][month]) {
            monthlyStats[year][month] = { count: 0, totalAmount: 0 };
        }
        if (isUsersPane) {
            monthlyStats[year][month].count += entry.healthID.length;
            monthlyStats[year][month].totalAmount += entry.healthID.reduce((sum, userId) => {
                const user = data.find(item => item.healthID === userId);
                return sum + (user?.amount || 0);
            }, 0);
        } else {
            monthlyStats[year][month].count += entry.hospitalId.length;
            // Assuming hospitals also have an amount field. If not, remove this line.
            monthlyStats[year][month].totalAmount += entry.hospitalId.reduce((sum, hospitalId) => {
                const hospital = data.find(item => item.hospitalId === hospitalId);
                return sum + (hospital?.amount || 0);
            }, 0);
        }
    });
    return monthlyStats;
};

export const formateAddress = (address) => {
    if (!address) return '';

    const parts = [
        address.street,
        address.landmark,
        address.city,
        address.state,
        address.country,
        address.code
    ];

    // Filter out any undefined or empty parts
    const filteredParts = parts.filter(part => part && part.trim() !== '');

    // Join the parts with commas and spaces
    return filteredParts.join(', ');
}

export const formatCurrency = (amount, showSymbol = true) => {
    if (isNaN(amount)) {
        return 'Invalid Amount';
    }
    const [integerPart, decimalPart] = Math.abs(amount).toFixed(2).split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedAmount = `${formattedIntegerPart}${showSymbol ? '.' + decimalPart : ''}`;
    return `${showSymbol ? '₹ ' : ''}${formattedAmount}`;
};


export const getCurrentMonthAndYear = () => {
    const currentDate = formatDate(new Date());
    const [day, month, year] = currentDate.split(' ');
    return { month, year };
};
