import { useCallback } from "react";

// info about the host, appId and apiKey saved
const host = "https://parseapi.back4app.com/classes/Products";
const appId = "ikVJ0DLmb8VVMOnvZrHbsebmkAtEvwycFYGOP9xW";
const apiKey = "mAYfKajFKfw8u3q6KycuD0sIgJ3rPRc3zlsLDB68";

function useHTTP() {
  const request = useCallback(async (method, url, data) => {
    const options = {
      method: method,
      headers: {
        "X-Parse-Application-Id": appId,
        "X-Parse-REST-API-Key": apiKey,
      },
    };

    if (data) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    const response = await fetch(host + url, options);

    let result;

    if (response.status != 204) {
      result = await response.json();
    }

    if (response.ok === false) {
      const error = result;
      throw error;
    }

    return result;
  }, []);

  return {
    request,
  };
}

export default useHTTP;
