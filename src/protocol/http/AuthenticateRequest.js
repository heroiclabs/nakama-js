export default function AuthenticateRequest(message) {
  return {
    message_: message,
  };
}

Object.assign(AuthenticateRequest, {
  custom,
  device,
  email,
  facebook,
  google,
});

function custom(id) {
  return new AuthenticateRequest({
    custom: id,
  });
}

function device(id) {
  return new AuthenticateRequest({
    device: id,
  });
}

function email(email, password) {
  return new AuthenticateRequest({
    email: {
      email,
      password,
    },
  });
}

function facebook(oauthToken) {
  return new AuthenticateRequest({
    facebook: oauthToken,
  });
}

function google(oauthToken) {
  return new AuthenticateRequest({
    google: oauthToken,
  });
}
