interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'task1',
            status: 'pending',
            createdAt: 1701892330708 - 100,
        },
        {
            description: 'task2',
            status: 'in-progress',
            createdAt: 1701892331155,
        },
        {
            description: 'task3',
            status: 'finished',
            createdAt: 1701892330708,
        },
    ],
};
