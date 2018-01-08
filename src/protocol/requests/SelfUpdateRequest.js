export default function SelfUpdateRequest({
  handle,
  fullname,
  timezone,
  location,
  lang,
  avatarUrl,
  metadata = {},
} = {}) {
  function build_() {
    return {
      selfUpdate: {
        handle,
        fullname,
        timezone,
        location,
        lang,
        avatarUrl,
        metadata: JSON.stringify(metadata),
      },
    };
  }

  return {
    get handle() {
      return handle;
    },
    set handle(val) {
      handle = val;
    },

    get fullname() {
      return fullname;
    },
    set fullname(val) {
      fullname = val;
    },

    get timezone() {
      return timezone;
    },
    set timezone(val) {
      timezone = val;
    },

    get location() {
      return location;
    },
    set location(val) {
      location = val;
    },

    get lang() {
      return lang;
    },
    set lang(val) {
      lang = val;
    },

    get metadata() {
      return metadata;
    },
    set metadata(val) {
      metadata = val;
    },

    get avatarUrl() {
      return avatarUrl;
    },
    set avatarUrl(val) {
      avatarUrl = val;
    },

    build_,
  };
}
