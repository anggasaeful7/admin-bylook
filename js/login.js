var jwt = localStorage.getItem("admin");
if (jwt != null) {
  window.location.href = "/index.html";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://6376413881a568fc25fa08a8.mockapi.io/api/admin?username=" + username
  );
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      var usernamed = data[0].username;
      var passwordd = data[0].password;
      var nama = data[0].nama;

      if (username == usernamed && password == passwordd) {
        localStorage.setItem("admin", nama);
        Swal.fire({
          text: "Berhasil login",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/index.html";
          }
        });
      } else {
        Swal.fire({
          text: "gagal login",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  return false;
}
