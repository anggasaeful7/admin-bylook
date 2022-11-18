var jwt = localStorage.getItem("admin");
if (jwt == null) {
  window.location.href = "/login-admin.html";
}
