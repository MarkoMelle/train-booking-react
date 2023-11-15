export const apiClient = {
  baseUrl: "https://students.netoservices.ru/fe-diplom/routes",
  searchCities: function (cityName) {
    return fetch(`${this.baseUrl}/cities?name=${encodeURIComponent(cityName)}`)
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
        query.append(key, params[key]);
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
        console.log("routes", data);
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
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        query.append(key, filters[key]);
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
        console.log("Seats Info:", data);
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
