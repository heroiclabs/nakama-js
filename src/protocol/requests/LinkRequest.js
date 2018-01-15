export default function LinkRequest({
  // only set one of these fields
  custom,
  device,
  facebook,
  google,
  email = {
    email: '',
    password: '',
  },
} = {}) {
  function build_() {
    if (custom) return {link: {custom}};
    if (device) return {link: {device}};
    if (facebook) return {link: {facebook}};
    if (google) return {link: {google}};
    if (email.email != '') return {link: {email}};
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
