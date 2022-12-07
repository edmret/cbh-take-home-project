const crypto = require("crypto");
const {TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH} = require("./constants");

/**
 * Extract thje partition key from the event object.
 * @param {*} event 
 * @returns {string | Object} the partition key of the event Object
 */
function getPartitionKey(event) {
  if(!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    return event.partitionKey;
  }
  
  const data = JSON.stringify(event);
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

/**
 * Get partition key as string
 * @param {string | object} partitionKey 
 * @returns 
 */
function ensurePartitionKeyIsString(partitionKey) {
  if (typeof partitionKey !== "string") {
    return JSON.stringify(partitionKey);
  }
  return partitionKey;
}

/**
 * ensure that the key is no more than 256 chars long
 * @param {string} partitionKey the partition key
 * @returns {string} the partition key sized at 256 chars
 */
function getCorrectSizedPartitionKey(partitionKey) {
  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(partitionKey).digest("hex");
  }
  return partitionKey;
}

exports.deterministicPartitionKey = (event) => {
  const partitionKey = getPartitionKey(event);
  const partitionKeyAsString = ensurePartitionKeyIsString(partitionKey);
  return getCorrectSizedPartitionKey(partitionKeyAsString);
};