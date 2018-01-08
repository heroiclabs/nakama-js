import StorageDataResponse from './responses/StorageDataResponse';

export default function StorageFetchRequest({
  keys = [],
} = {}) {
  const self = {
    get keys() {
      return keys;
    },
    set keys(val) {
      keys = val;
    },

    fetch,
    build_,
    processResponse_: StorageDataResponse,
  };

  return self;

  function build_() {
    return {
      storageFetch: {
        keys,
      },
    };
  }

  function fetch(bucket, collection, record, userId) {
    keys.push({
      bucket,
      collection,
      record,
      userId,
    });

    return self;
  }
}
