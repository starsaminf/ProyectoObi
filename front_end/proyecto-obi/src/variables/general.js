


var Url_Admin=process.env.REACT_APP_URL_BACK_END+'proyectoOBI/back_end/Admin/';
var Url_Tutor=process.env.REACT_APP_URL_BACK_END+'proyectoOBI/back_end/Tutor/';
var Url_Public=process.env.REACT_APP_URL_BACK_END+'proyectoOBI/back_end/Public/';
module.exports = {
  Url_Admin,
  Url_Tutor,
  Url_Public,
  header,
  headerPublic
};
function header($token){
	return {
	  headers: {
		"Accept": "application/json, text/plain, */*",
		"Content-Type": "application/json;charset=utf-8",
		"Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDc0MDM2NjksImF1ZCI6IjIwNGY0NzhhYWFkN2YzZjcwMjQzNjdmMzk2MWRlZTBlOGY5NGIxYjkiLCJkYXRhIjp7ImlkQWRtaW4iOjEsInB1ZXN0byI6IkFETUlOIiwiVCI6IjEyMzQ1NjcifX0.KjqPH0AkvtOXN5GOOl7cxq4qP1VAvMWIqwF708aJGBA"
	  }
	}
};
function headerPublic(){
	return {
	  headers: {
		"Accept": "application/json, text/plain, */*",
		"Content-Type": "application/json;charset=utf-8"
	  }
	}
};