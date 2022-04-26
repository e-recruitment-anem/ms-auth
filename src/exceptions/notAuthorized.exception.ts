import HttpException from "./http.exception";

class NotAuthorizedException extends HttpException {
  constructor() {
    super(
      403,
      "NotAuthorizedException",
      "You are not authorized to use this route"
    );
  }
}

export default NotAuthorizedException;
