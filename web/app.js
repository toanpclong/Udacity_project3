// Personal API Key for OpenWeatherMap API
const apiKey = "4901d644e51bc39c77a5704969a6ea87&units=imperial";
//baseURL
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", doClick);
/* Function called by event listener */
async function doClick(e) {
  e.preventDefault();
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  getWebAPI(baseURL + zipCode + "&appid=" + apiKey)
    .then((result) => {
      if (result.cod === "400" || result.cod === "404") {
        return postData("/add", {
          temp: "0",
          date: new Date().getTime() / 1000,
          feeling: "Wrong Zip code",
        });
      }
      return postData("/add", {
        temp: result.main.temp,
        date: result.dt,
        feeling,
      });
    })
    .then(() => {
      retrieveData();
    });
}
/* Function to GET Web API Data*/
async function getWebAPI(url) {
  const dataAPI = await fetch(url);
  try {
    dataAPIConvert = dataAPI.json();
    return dataAPIConvert;
  } catch (error) {
    console.log("error get web API", error);
  }
}
/* Function to POST data */
const postData = async (url = "", data = {}) => {
  try {
    await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  } catch (error) {
    console.log("error post", error);
  }
};
/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feel;
    // Convert date
    let d = new Date(Number(allData.date) * 1000);
    let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
    document.getElementById("date").innerHTML = newDate;
  } catch (error) {
    console.log("error get", error);
  }
};
