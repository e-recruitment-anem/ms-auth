import HttpException from "./http.exception";

class WrongCredentialsException extends HttpException {
  constructor() {
    super(403, "WrongCredentialsException", "wrong credentials.");
  }
}

export default WrongCredentialsException;
