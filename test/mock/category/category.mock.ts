export const FakeCategory = [
    { id: 1, createdAt: '2024-05-15T23:48:40.017Z', updatedAt: '2024-05-18T13:44:35.644Z', type: 'MEAL' },
    { id: 2, createdAt: '2024-05-15T23:48:40.025Z', updatedAt: '2024-05-18T13:44:35.669Z', type: 'DRINK' },
    { id: 3, createdAt: '2024-05-15T23:48:40.038Z', updatedAt: '2024-05-18T13:44:35.671Z', type: 'SIDE' },
    { id: 4, createdAt: '2024-05-15T23:48:40.041Z', updatedAt: '2024-05-18T13:44:35.674Z', type: 'DESSERT' }
  ]

export const MockPrismaService = {
    category: {
      findMany: jest.fn().mockResolvedValue(FakeCategory)
    }
  };

