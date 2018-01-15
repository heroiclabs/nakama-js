/**
 * Build a string which looks like a UUIDv4 type.
 */
const uuidv4 = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
    const randomNumber = Math.random() * 16 | 0,
          result =
            character === 'x' ?
              randomNumber :
              randomNumber & 0x3 | 0x8;
    return result.toString(16);
  });
};

export default uuidv4;
