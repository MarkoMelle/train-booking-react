const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const apiClient = {
  baseUrl: "https://students.netoservices.ru/fe-diplom",

  searchCities: function (cityName) {
    return fetch(
      `${this.baseUrl}/routes/cities?name=${encodeURIComponent(cityName)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },

  getLastRoutes: function () {
    return fetch(`${this.baseUrl}/routes/last`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },

  orderSeats: function (userInfo, departureInfo, arrivalInfo = null) {
    const orderDetails = {
      user: userInfo,
      departure: departureInfo,
    };

    if (arrivalInfo) {
      orderDetails.arrival = arrivalInfo;
    }

    return fetch(`${this.baseUrl}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },

  searchRoutes: function (params) {
    let query = new URLSearchParams();

    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if (typeof value === "object" && value !== null && value.id) {
          query.append(camelToSnakeCase(key) + "_id", value.id);
        } else if (
          (typeof value === "string" && value.trim() !== "") ||
          (typeof value === "boolean" && value) ||
          typeof value === "number"
        ) {
          query.append(camelToSnakeCase(key), value);
        }
      }
    }

    return fetch(`${this.baseUrl}/routes?${query.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },

  getSeatsInfo: function (routeId, filters) {
    let query = new URLSearchParams();

    for (let key in filters) {
      if (
        Object.prototype.hasOwnProperty.call(filters, key) &&
        filters[key] != null
      ) {
        const value = filters[key];
        if (typeof value === "boolean" && value === false) {
          continue;
        }
        query.append(camelToSnakeCase(key), value);
      }
    }

    return fetch(`${this.baseUrl}/routes/${routeId}/seats?${query.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },

  subscribe: function (email) {
    return fetch(`${this.baseUrl}/subscribe?email=${encodeURIComponent(email)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Subscribe response:", data);
        return data;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },
};

window.apiClient = apiClient;
