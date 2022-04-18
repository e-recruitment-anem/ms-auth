import HttpException from "./http.exception";

class NotAuthenticatedException extends HttpException {
  constructor() {
    super(403, "NotAuthenticatedException", "You are not authenticated.");
  }
}

export default NotAuthenticatedException;
