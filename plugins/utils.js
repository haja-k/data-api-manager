// var statusCode = null;
// var type = null;
// var data = null;
// var message = null;

module.exports = {
  setSuccess: (data, statusCode = 200, message = "") => {
    this.statusCode = statusCode;
    this.message = message;
    this.error_code = error_code;
    this.description = description;
    this.data = data;
    this.type = "success";
  },
  setError: (statusCode, message, error_code, description) => {
    this.statusCode = statusCode;
    this.message = message;
    this.error_code = error_code;
    this.description = description;
    this.type = "error";
  },
  send: (res, extras, success = true) => {
    var result = {
      success: extras?.type ?? success ? "true" : "false",
      message: extras?.message ?? "",
      error_code: extras?.error_code ?? null,
    };

    if (success) {
      data = Object.assign({ data: res.data }, { ...extras });
      result = Object.assign(result, data);
    }

    return res.status(extras?.status_code ?? 200).json(result);
  },
  parseBool(str) {
    if (str.length == null) {
      return str == 1 ? true : false;
    } else {
      return str == "true" ? true : false;
    }
  },
};
