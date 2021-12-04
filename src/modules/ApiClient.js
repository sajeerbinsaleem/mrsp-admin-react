import env from "react-dotenv";
import axios from "axios";

var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
const api_url =env.API_URL?env.API_URL: default_url;
// env.API_URL? env.API_URL : 'http://localhost:8000/api/v1/'
// const app_url = env.APP_URL ? env.APP_URL : "http://localhost:8000/api/v1/";
// const login_url = env.LOGIN_URL
//   ? env.LOGIN_URL
//   : "http://localhost:8000/api/v1/";

var apiRes = {
  status: false,
  data: {},
};
export function login(obj, type) {
  var endpoint = "franchise";
  if (type == "admin") {
    endpoint = "admin";
  }

  return axios
    .post(api_url + "api/v1/" + endpoint + "/login", obj, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      console.log("from api client", result.data);
      return result.data;

      // localStorage.setItem("pm_auth_token", result.accessToken);
      // this.props.history.push("/home")
    })
    .catch((e) => {
      console.log(e);
      apiRes.data = Error(
        "Login API for " + api_url + "api/v1/" + endpoint + "/login"
      );
      apiRes.status = false;
      return apiRes;
    });
}
