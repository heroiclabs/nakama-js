import StorageDataResponse from './responses/StorageDataResponse';

export default function StorageListRequest({
  userId,
  bucket,
  collection,
  limit,
  cursor,
} = {}) {
  function build_() {
    return {
      storageList: {
        userId,
        bucket,
        collection,
        limit,
        cursor,
      },
    };
  }

  return {
    get userId() {
      return userId;
    },
    set userId(val) {
      userId = val;
    },

    get bucket() {
      return bucket;
    },
    set bucket(val) {
      bucket = val;
    },

    get collection() {
      return collection;
    },
    set collection(val) {
      collection = val;
    },

    get limit() {
      return limit;
    },
    set limit(val) {
      limit = val;
    },

    get cursor() {
      return cursor;
    },
    set cursor(val) {
      limit = val;
    },

    build_,
    processResponse_: StorageDataResponse,
  };
}
