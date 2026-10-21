
const jadwal = {
  senin: [
    {
      waktu: "12.30–14.10",
      nama: "Pengantar Akuntansi dan Keuangan",
      dosen: "Novilia",
      ruang: "G.107A"
    },
    {
      waktu: "14.10–15.50",
      nama: "Sistem Informasi Pariwisata",
      dosen: "Moh. Edi Saputro",
      ruang: "LPC"
    }
  ],

  selasa: [
    {
      waktu: "09.10–11.00",
      nama: "Manajemen Sumber Daya Manusia",
      dosen: "Dani Agung",
      ruang: "G.208"
    },
    {
      waktu: "11.00–12.30",
      nama: "Bahasa Inggris dan Praktikum Bahasa Inggris",
      dosen: "Eka",
      ruang: "G.107"
    }
  ],

  rabu: [
    {
      waktu: "10.00–11.40",
      nama: "Agama",
      dosen: "Imam Wahyono",
      ruang: "G.201"
    },
    {
      waktu: "12.30–14.10",
      nama: "Bahasa Indonesia",
      dosen: "Beby",
      ruang: "G.206"
    }
  ],

  kamis: [
    {
      waktu: "07.30–09.10",
      nama: "Pancasila",
      dosen: "Ninik",
      ruang: "G.201"
    },
    {
      waktu: "12.30–14.10",
      nama: "Kewarganegaraan",
      dosen: "Widhi Harsono",
      ruang: "G.601"
    },
    {
      waktu: "14.10–15.50",
      nama: "Pemahaman Lintas Budaya",
      dosen: "Wira",
      ruang: "G.601"
    }
  ]
};

const namaHari = {
  senin: "Senin",
  selasa: "Selasa",
  rabu: "Rabu",
  kamis: "Kamis"
};

const tombolHari = document.querySelectorAll(".day-btn");
const daftarPelajaran = document.getElementById("lesson-list");
const judulHari = document.getElementById("selected-day");
const jumlahPelajaran = document.getElementById("lesson-count");

const detailJudul = document.getElementById("detail-title");
const detailDeskripsi = document.getElementById("detail-description");
const detailWaktu = document.getElementById("detail-time");
const detailDosen = document.getElementById("detail-lecturer");
const detailRuang = document.getElementById("detail-room");

function tampilkanDetail(pelajaran, tombol) {
  document.querySelectorAll(".lesson-card").forEach((kartu) => {
    kartu.classList.remove("active");
    kartu.setAttribute("aria-pressed", "false");
  });

  tombol.classList.add("active");
  tombol.setAttribute("aria-pressed", "true");

  detailJudul.textContent = pelajaran.nama;
  detailDeskripsi.textContent =
    "Informasi perkuliahan " + pelajaran.nama + ".";
  detailWaktu.textContent = pelajaran.waktu;
  detailDosen.textContent = pelajaran.dosen;
  detailRuang.textContent = pelajaran.ruang;
}

function pilihHari(hari) {
  tombolHari.forEach((tombol) => {
    const aktif = tombol.dataset.day === hari;

    tombol.classList.toggle("active", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });

  judulHari.textContent = namaHari[hari];

  const pelajaranHariIni = jadwal[hari];
  jumlahPelajaran.textContent =
    pelajaranHariIni.length + " mata kuliah";

  daftarPelajaran.replaceChildren();

  pelajaranHariIni.forEach((pelajaran) => {
    const kartu = document.createElement("button");

    kartu.type = "button";
    kartu.className = "lesson-card";
    kartu.setAttribute("aria-pressed", "false");

    const waktu = document.createElement("span");
    waktu.className = "lesson-time";
    waktu.textContent = pelajaran.waktu;

    const info = document.createElement("span");
    info.className = "lesson-info";

    const nama = document.createElement("strong");
    nama.textContent = pelajaran.nama;

    const ruang = document.createElement("small");
    ruang.textContent = "Ruangan " + pelajaran.ruang;

    info.append(nama, ruang);

    const panah = document.createElement("span");
    panah.className = "lesson-arrow";
    panah.textContent = "›";
    panah.setAttribute("aria-hidden", "true");

    kartu.append(waktu, info, panah);

    kartu.addEventListener("click", () => {
      tampilkanDetail(pelajaran, kartu);
    });

    daftarPelajaran.appendChild(kartu);
  });

  // Reset detail ketika hari diganti.
  detailJudul.textContent = "Pilih mata kuliah";
  detailDeskripsi.textContent =
    "Tekan salah satu mata kuliah untuk melihat detailnya.";
  detailWaktu.textContent = "Belum dipilih";
  detailDosen.textContent = "Belum dipilih";
  detailRuang.textContent = "Belum dipilih";

  // Otomatis pilih mata kuliah pertama pada hari tersebut.
  const kartuPertama = daftarPelajaran.querySelector(".lesson-card");

  if (kartuPertama) {
    kartuPertama.click();
  }
}

tombolHari.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    pilihHari(tombol.dataset.day);
  });
});

// Tampilkan jadwal Senin saat website dibuka.
pilihHari("senin");
