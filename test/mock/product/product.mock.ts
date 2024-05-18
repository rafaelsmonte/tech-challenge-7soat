export const FakeProducts = [
    {
      "id": 1,
      "createdAt": "2024-05-18T20:01:38.731Z",
      "updatedAt": "2024-05-18T20:01:38.731Z",
      "name": "Mc lanche feliz",
      "price": 10,
      "description": "string",
      "pictures": [
        "123"
      ],
      "category": {
        "id": 1,
        "createdAt": "2024-05-18T20:01:38.731Z",
        "updatedAt": "2024-05-18T20:01:38.731Z",
        "type": "MEAL"
      }
    }
  ]

  export const MockPrismaService = {
    product: {
      findMany: jest.fn().mockResolvedValue(FakeProducts),
      delete: jest.fn().mockResolvedValue({}),
      findUnique: jest.fn().mockResolvedValue(FakeProducts[0]),
      create: jest.fn().mockResolvedValue(FakeProducts[0]),
      update: jest.fn().mockResolvedValue(FakeProducts[0])
    }
  };