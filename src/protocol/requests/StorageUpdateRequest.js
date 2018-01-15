import StorageKeysResponse from './responses/StorageKeysResponse';

export default function StorageUpdateRequest({
  updates = [],
} = {}) {
  const self = {
    get updates() {
      return updates;
    },
    set updates(val) {
      updates = val;
    },

    update,
    build_,
    processResponse_: StorageKeysResponse,
  };

  return self;

  function build_() {
    return {
      storageUpdate: {
        updates,
      },
    };
  }

  //  storageOps variable must be an array
  function update(
    bucket,
    collection,
    record,
    storageOps = [],
    permissionRead = 1,
    permissionWrite = 1,
    version,
  ) {
    updates.push({
      key: {
        bucket,
        collection,
        record,
        version,
      },
      permissionRead,
      permissionWrite,
      ops: storageOps,
    });
  }
}

Object.assign(StorageUpdateRequest, {
  add,
  append,
  copy,
  incr,
  init,
  merge,
  move,
  remove,
  replace,
  test,
  compare,
});

function add(path, value) {
  return {
    op: 0,
    path,
    value: JSON.stringify(value),
  };
}

function append(path, value) {
  return {
    op: 1,
    path,
    value: JSON.stringify(value),
  };
}

function copy(path, from) {
  return {
    op: 2,
    path,
    from,
  };
}

function incr(path, value) {
  return {
    op: 3,
    path,
    value: JSON.stringify(value),
  };
}

function init(path, value) {
  return {
    op: 4,
    path,
    value: JSON.stringify(value),
  };
}

function merge(path, from) {
  return {
    op: 5,
    path,
    from,
  };
}

function move(path, from) {
  return {
    op: 6,
    path,
    from,
  };
}

function remove(path) {
  return {
    op: 8,
    path,
  };
}

function replace(path, value) {
  return {
    op: 9,
    path,
    value: JSON.string(value),
  };
}

function test(path, value) {
  return {
    op: 10,
    path,
    value: JSON.stringify(value),
  };
}

function compare(path, value, assertValue) {
  return {
    op: 11,
    path,
    value,
    assert,
  };
}
