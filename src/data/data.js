const TABLE_DETAILS = [
    {
        id: "age",
        title: "Age",
        sort: {
            sortable: true,
            sorted: false,
            asc: true
        },
    },
    {
        id: "gender",
        title: "Gender",
        sort: {
            sortable: true,
            sorted: false,
            asc: true,
        },
    },
    {
        id: "name",
        title: "Name",
        sort: {
            sortable: false,
        },
    },
    {
        id: "car_make",
        title: "Car make",
        sort: {
            sortable: true,
            sorted: false,
            asc: true,
        },
    },
];

const AGE_OPTIONS = [
    'No age filter',
    '< 18',
    '18-25',
    '26-40',
    '41-60',
    '61-80',
    '> 80'
]

export default {
    TABLE_DETAILS,
    AGE_OPTIONS
}