function validate(type, input) {
  let response;

  switch (type) {
    case "name":
      if (/^[a-zA-Z0-9\s]{3,30}$/.test(input)) {
        response = true;
      } else {
        response = false;
      }
      break;
    case "tla":
      if (/^[A-Z]{3}$/.test(input)) {
        response = true;
      } else {
        response = false;
      }
      break;
    case "website":
      if (/^(http:\/\/|https:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2})?$/.test(input) || input === "") {
        response = true;
      } else {
        response = false;
      }
      break;
    case "phone":
      if (/^\+\d{1,3}\s?(\(\d{1,4}\))?\s?(\d+(-\d+)?)?$/.test(input) || input === "") {
        response = true;
      } else {
        response = false;
      }
      break;
    case "founded":
      const actualYear = new Date().getFullYear();

      if (input >= 1857 && input <= actualYear) {
        response = true;
      } else {
        response = false;
      }
      break;
    case "address":
      if (/^[a-zA-Z0-9\s\-.,'°]+$/.test(input)) {
        response = true;
      } else {
        response = false;
      }
      break;
    case "venue":
      if (/^[a-zA-Z0-9\s]{3,30}$/.test(input)) {
        response = true;
      } else {
        response = false;
      }
      break;
    case "email":
      if (/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(input) || input === "") {
        response = true;
      } else {
        response = false;
      }
      break;
    default:
      response = null;
      break;
  }

  return response;
}
function validateForm(formInput) {
  const response = {};

  Object.keys(formInput).forEach((key) => {
    response[key] = validate(key, formInput[key]);
  });

  return response;
}

module.exports = { validate, validateForm };
