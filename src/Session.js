import base64 from 'base-64';

class Session {
  constructor(createdAt, expiresAt, handle, id, token) {
    this.token_ = token;

    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.handle = handle;
    this.id = id;
  }

  /**
   * @param {number} currentime The current system time in milliseconds.
   * @returns {bool} True if the session has expired.
   */
  isexpired(currenttime) {
    return (this.expiresAt - currenttime) < 0;
  }

  static restore(jwt) {
    const parts = jwt.split('.');
    if (parts.length != 3) {
      throw 'jwt is not valid.';
    }
    const decoded = JSON.parse(base64.decode(parts[1]));
    const expiresAt = Math.floor(parseInt(decoded['exp']) * 1000);

    return new Session(Date.now(), expiresAt, decoded['han'], decoded['uid'], jwt);
  }
}

export default Session;
