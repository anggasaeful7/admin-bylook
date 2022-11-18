function loadStatusPesanan() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://6376413881a568fc25fa08a8.mockapi.io/api/transaks");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      const objects = JSON.parse(this.responseText);

      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["nama"] + "</td>";
        trHTML += "<td>" + object["email"] + "</td>";
        trHTML += "<td>" + object["pesanan"] + "</td>";
        trHTML += "<td>" + object["detail"] + "</td>";
        trHTML += "<td>" + object["progress"] + "</td>";
        trHTML += "<td>" + object["tanggal"] + "</td>";
        trHTML +=
          '<td><button type="button" style="margin-right: 10px; color:black;" onclick="showUserEditBoxPesanan(' +
          object["id"] +
          ')">Edit</button>';
        trHTML +=
          '<button type="button" style="margin-right: 10px; color:black;" onclick="pesananDelete(' +
          object["id"] +
          ')">Del</button></td>';
        trHTML += "</tr>";
      }

      document.getElementById("table-status").innerHTML = trHTML;
    }
  };
}

loadStatusPesanan();

function showUserCreateBoxPesanan() {
  Swal.fire({
    title: "Tambah Pesanan",
    html:
      '<input id="nama" class="swal2-input" placeholder="nama" type="text">' +
      '<input id="email" class="swal2-input" placeholder="email" type="text">' +
      '<input id="pesanan" class="swal2-input" placeholder="pesanan" type="text">' +
      '<input id="tanggal" class="swal2-input" placeholder="tanggal" type="date">' +
      '<textarea id="detail" class="swal2-textarea" placeholder="detail" type="text"></textarea>' +
      '<select id="status" class="swal2-input" placeholder="status">' +
      '<option value="Draf Perancangan">Draf Perancangan</option>' +
      '<option value="Testing">Testing</option>' +
      '<option value="Desain(20%)">Desain(20%)</option>' +
      '<option value="Desain(50%)">Desain(50%)</option>' +
      '<option value="Desain(100%)">Desain(100%)</option>' +
      '<option value="Project Manufaktur">Project Manufaktur</option>' +
      '<option value="Project Done">Project Done</option>' +
      "</select>",
    focusConfirm: false,
    preConfirm: () => {
      pesananCreate();
    },
  });
}

function pesananCreate() {
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const pesanan = document.getElementById("pesanan").value;
  const detail = document.getElementById("detail").value;
  const progress = document.getElementById("status").value;
  const tanggals = document.getElementById("tanggal").value;

  const tanggal = tanggals.toString();

  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "POST",
    "https://6376413881a568fc25fa08a8.mockapi.io/api/transaks"
  );
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      nama: nama,
      email: email,
      pesanan: pesanan,
      detail: detail,
      progress: progress,
      tanggal: tanggal,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      Swal.fire("Tambah Pesanan Berhasil");
      loadStatusPesanan();
    }
  };
}

function showUserEditBoxPesanan(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "https://6376413881a568fc25fa08a8.mockapi.io/api/transaks/" + id
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      let ids = data["id"];
      let nama = data["nama"];
      let email = data["email"];
      let pesanan = data["pesanan"];
      let detail = data["detail"];
      let progress = data["progress"];

      Swal.fire({
        title: "Edit Pesanan",
        html:
          '<input id="id" class="swal2-input" value="' +
          ids +
          '"type="hidden">' +
          '<input id="nama" class="swal2-input" value="' +
          nama +
          '"type="text">' +
          '<input id="email" class="swal2-input" value="' +
          email +
          '"type="text">' +
          '<input id="pesanan" class="swal2-input" value="' +
          pesanan +
          '"type="text">' +
          '<textarea id="detail" class="swal2-textarea" value="' +
          'type="text">' +
          detail +
          "</textarea>" +
          '<select id="status" class="swal2-input" value="' +
          progress +
          ">" +
          '<option value="Draf Perancangan">Draf Perancangan</option>' +
          '<option value="Testing">Testing</option>' +
          '<option value="Desain(20%)">Desain(20%)</option>' +
          '<option value="Desain(50%)">Desain(50%)</option>' +
          '<option value="Desain(100%)">Desain(100%)</option>' +
          '<option value="Project Manufaktur">Project Manufaktur</option>' +
          '<option value="Project Done">Project Done</option>' +
          "</select>",
        focusConfirm: false,
        preConfirm: () => {
          pesananUpdate();
        },
      });
    }
  };
}

function pesananUpdate(params) {
  const id = document.getElementById("id").value;
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const pesanan = document.getElementById("pesanan").value;
  const detail = document.getElementById("detail").value;
  const progress = document.getElementById("status").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "PUT",
    "https://6376413881a568fc25fa08a8.mockapi.io/api/transaks/" + id
  );
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      nama: nama,
      email: email,
      pesanan: pesanan,
      detail: detail,
      progress: progress,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire("Edit Pesanan Berhasil");
      loadStatusPesanan();
    }
  };
}

function pesananDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "DELETE",
    "https://6376413881a568fc25fa08a8.mockapi.io/api/transaks/" + id
  );
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire("Hapus Pesanan Berhasil");
      loadStatusPesanan();
    }
  };
}

function logout() {
  localStorage.removeItem("admin");
  window.location.href = "/login-admin.html";
}
