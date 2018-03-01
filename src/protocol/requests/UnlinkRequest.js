export default function UnlinkRequest({
  custom,
  device,
  facebook,
  google,
  email,
} = {}) {
  function build_() {
    if (custom) return {unlink: {custom}};
    if (device) return {unlink: {device}};
    if (facebook) return {unlink: {facebook}};
    if (google) return {unlink: {google}};
    if (email) return {unlink: {email}};
  }

  return {
    get custom() {
      return custom;
    },
    set custom(val) {
      custom = val;
    },

    get device() {
      return device;
    },
    set device(val) {
      device = val;
    },

    get facebook() {
      return facebook;
    },
    set facebook(val) {
      facebook = val;
    },

    get google() {
      return google;
    },
    set google(val) {
      google = val;
    },

    get email() {
      return email;
    },
    set email(val) {
      email = val;
    },

    build_,
  };
}
