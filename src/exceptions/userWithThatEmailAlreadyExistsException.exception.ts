import HttpException from "./http.exception";

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(
      403,
      "UserWithThatEmailAlreadyExistsException",
      `there is already an existing account with this email (${email}) , also an email should be unique value.`
    );
  }
}

export default UserWithThatEmailAlreadyExistsException;
