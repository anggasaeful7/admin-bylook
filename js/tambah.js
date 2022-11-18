function tambahPesanan() {
  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const pesanan = document.getElementById("pesanan").value;
  const detail = document.getElementById("detail").value;
  const progress = document.getElementById("status").value;
  const tanggals = document.getElementById("tanggal").value;

  const tanggal = tanggals.toString();

  console.log(tanggal);
  console.log(nama);

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
      const objects = JSON.parse(this.responseText);
      Swal.fire("Tambah Pesanan Berhasil");
      loadStatusPesanan();
    }
  };
}
