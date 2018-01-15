import StorageKeysResponse from './responses/StorageKeysResponse';

export default function StorageWriteRequest({
  data = [],
} = {}) {
  const self = {
    get data() {
      return data;
    },
    set data(val) {
      data = val;
    },

    write,
    build_,
    processResponse_: StorageKeysResponse,
  };

  return self;

  function write(
    bucket,
    collection,
    record,
    value,
    permissionRead = 1,
    permissionWrite = 1,
    version,
  ) {
    data.push({
      bucket,
      collection,
      record,
      value: (value ? JSON.stringify(value) : '{}'),
      version,
      permissionRead,
      permissionWrite,
    });

    return self;
  }

  function build_() {
    return {
      storageWrite: {
        data,
      },
    };
  }
}
