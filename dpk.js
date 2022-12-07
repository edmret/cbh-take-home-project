const {getPartitionKey, ensurePartitionKeyIsString, getCorrectSizedPartitionKey} = require("./utils");

exports.deterministicPartitionKey = (event) => {
  const partitionKey = getPartitionKey(event);
  const partitionKeyAsString = ensurePartitionKeyIsString(partitionKey);
  return getCorrectSizedPartitionKey(partitionKeyAsString);
};