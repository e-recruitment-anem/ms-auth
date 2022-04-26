import HttpException from "./http.exception";

class ItemNotFoundException extends HttpException {
  constructor() {
    super(403, "ItemNotFoundException", "no item found.");
  }
}

export default ItemNotFoundException;
