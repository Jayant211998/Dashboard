const traceAndThrow = (err: any) => {
  if (err.message === "Network Error") {
    return "Network Error";
  }
  console.log("error.message", err && err.message);
  console.log("error", err);
  const error = err.response.data;
  if (error && error.errors && error.errors.length) {
    const { label, body } = error && error.errors[0];
    console.log(label);
    if (label === "Account") {
      if (body && body.Details) {
        if (body.Details.includes("Invalid API")) {
          return "Something went wrong in Otp Submission";
        }
        return body && body.Details;
      }
      return body && body.message;
    }

    if (label === "Authentication") {
      return "Not Authenticated";
    }

    if (label === "Internal") {
      return "Something Went Wrong";
    }

    if (label === "Upload Image") {
      return "upload an image";
    }

    if (label === "joi validation") {
      return body.message;
    }
  }
  return "Unknown Error!";
};

export default traceAndThrow;
