import HttpException from "./http.exception";

class InvalidTokenException extends HttpException {
  constructor() {
    super(403, "InvalidTokenException", `token invalid`);
  }
}

export default InvalidTokenException;
