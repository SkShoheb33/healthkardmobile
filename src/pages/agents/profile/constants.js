export const usersAdded = [
    { date: '10 may 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '10 june 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '10 june 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '9 june 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '10 july 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '9 july 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '8 july 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '9 august 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '8 august 2024', users: ['HK243702333', 'HK243702333', 'HK243702333'] },
    { date: '15 july 2024', users: ['HK243702334', 'HK243702335'] },
    { date: '1 july 2024', users: ['HK243702336'] },
    { date: '5 june 2024', users: ['HK243702337', 'HK243702338', 'HK243702339'] },
    { date: '20 august 2024', users: ['HK243702340'] },
    { date: '18 august 2024', users: ['HK243702341', 'HK243702342'] },
    { date: '12 september 2024', users: ['HK243702343', 'HK243702344'] },
    { date: '25 september 2024', users: ['HK243702345'] },
    { date: '10 october 2024', users: ['HK243702346', 'HK243702347', 'HK243702348'] },
    { date: '1 november 2024', users: ['HK243702349'] },
    { date: '22 november 2024', users: ['HK243702350', 'HK243702351'] },
    { date: '15 december 2024', users: ['HK243702352'] },
    { date: '30 december 2023', users: ['HK243702353', 'HK243702354', 'HK243702355'] },
]

export const hospitalsAdded = [
    { date: '10 july 2024', hospitals: ['HH242242134', 'HH242242134', 'HH242242134'] },
    { date: '9 july 2024', hospitals: ['HH242242134', 'HH242242134', 'HH242242134'] },
    { date: '8 july 2024', hospitals: ['HH242242134', 'HH242242134', 'HH242242134'] },
    { date: '5 june 2024', hospitals: ['HH242242135', 'HH242242136'] },
    { date: '1 june 2024', hospitals: ['HH242242137'] },
    { date: '15 july 2024', hospitals: ['HH242242138', 'HH242242139'] },
    { date: '20 august 2024', hospitals: ['HH242242140'] },
    { date: '18 august 2024', hospitals: ['HH242242141', 'HH242242142'] },
    { date: '12 september 2024', hospitals: ['HH242242143', 'HH242242144'] },
    { date: '25 september 2024', hospitals: ['HH242242145'] },
    { date: '10 october 2024', hospitals: ['HH242242146', 'HH242242147', 'HH242242148'] },
    { date: '1 november 2024', hospitals: ['HH242242149'] },
    { date: '22 november 2022', hospitals: ['HH242242150', 'HH242242151'] },
    { date: '15 december 2024', hospitals: ['HH242242152'] },
    { date: '30 december 2023', hospitals: ['HH242242153', 'HH242242154', 'HH242242155'] },
]

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
