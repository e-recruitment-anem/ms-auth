import HttpException from "./http.exception";

class BadRequestException extends HttpException {
  constructor(errors) {
    super(403, "BadRequestException", errors);
  }
}

export default BadRequestException;
