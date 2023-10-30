/**
 * Iterates over a nested object and serializes all functions found.
 * @param {Object} obj - The object to serialize.
 * @returns {Object} - The serialized object.
 */
export function serializeFunctions(obj, seen = new WeakSet()) {
    const serialized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'function') {
            serialized[key] = value.toString();
        } else if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                // Skip circular references
                continue;
            }
            seen.add(value);
            serialized[key] = serializeFunctions(value, seen);
        } else {
            serialized[key] = value;
        }
    }
    return serialized;
}

/**
 * Reverts the serialization process by parsing all serialized functions found in a nested object.
 * @param {Object} obj - The serialized object to deserialize.
 * @returns {Object} - The deserialized object.
 */
export function deserializeFunctions(obj) {
    const deserialized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' && value.startsWith('function')) {
            deserialized[key] = new Function(`return ${value}`)();
        } else if (typeof value === 'object' && value !== null) {
            deserialized[key] = deserializeFunctions(value);
        } else {
            deserialized[key] = value;
        }
    }
    return deserialized;
}

export default { serializeFunctions, deserializeFunctions } ;