const { deterministicPartitionKey } = require("./dpk");
const { hashBiggerThan256Chars, hashBiggerThan256CharsConverted } = require("./__mocks__/bigHash.mock");
const { eventWithCorrectHash } = require("./__mocks__/eventWithCorrectHash.mock");
const { eventWithoutHash, eventWithoutHashHashed } = require("./__mocks__/eventWithoutHash.mock");
const { eventWithHashObject, eventWithHashObjectHashed } = require("./__mocks__/eventWithHashObject.mock");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("event with partitionKey less or equal than 256 Chars should return the passed key", () => {
    const trivialKey = deterministicPartitionKey(eventWithCorrectHash);
    expect(trivialKey).toBe(eventWithCorrectHash.partitionKey);
  });

  it("event without partitionKey should return sha3-512 based on the event object", () => {
    const trivialKey = deterministicPartitionKey(eventWithoutHash);
    expect(trivialKey).toBe(eventWithoutHashHashed);
  });

  it("event with partitionKey bigger than 256 Chars should return sha3-512 based on the key", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: hashBiggerThan256Chars});
    expect(trivialKey).toBe(hashBiggerThan256CharsConverted);
  });

  it("Event with partition key that is not string should return sha3-512 based on the serialized key Object", () => {
    const trivialKey = deterministicPartitionKey(eventWithHashObject);
    expect(trivialKey).toBe(eventWithHashObjectHashed);
  })
});
