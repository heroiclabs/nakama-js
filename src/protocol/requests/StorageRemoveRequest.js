export default function StorageRemoveRequest({
  keys = [],
} = {}) {
  const self = {
    get keys() {
      return keys;
    },
    set keys(val) {
      keys = val;
    },

    remove,
    build_,
  };

  return self;

  function build_() {
    return {
      storageRemove: {
        keys,
      },
    };
  }

  function remove(bucket, collection, record, userId) {
    keys.push({
      bucket,
      collection,
      record,
      userId,
    });

    return self;
  }
}
