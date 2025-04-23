document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.querySelectorAll('.zoomable').forEach(image => {
  image.addEventListener('click', () => {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modalImg.src = image.src;
    modal.style.display = 'flex';
  });
});

function closeImageModal() {
  document.getElementById('image-modal').style.display = 'none';
}

document.getElementById('image-modal').addEventListener('click', (e) => {
  if (e.target.id === 'image-modal') {
    closeImageModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModal();
  }
});

document.getElementById('modal-close').addEventListener('click', closeImageModal);

// Fungsi untuk mulai memainkan video
function playVideo(video, button) {
video.play();
button.classList.remove('play-btn');
button.classList.add('pause-btn');
button.innerHTML = '<i class="fas fa-pause"></i>'; // Ubah tombol ke pause
}

// Fungsi untuk menjeda video
function pauseVideo(video, button) {
video.pause();
button.classList.remove('pause-btn');
button.classList.add('play-btn');
button.innerHTML = '<i class="fas fa-play"></i>'; // Ubah tombol ke play
}

// Fungsi untuk toggle play/pause dan memperbarui ikon
function toggleVideoPlay(button) {
  const video = button.closest('.carousel-item').querySelector('video');
  const icon = button.querySelector('i'); // Ambil elemen ikon di tombol

  if (video.paused) {
    // Putar video dan ubah ikon ke 'pause'
    video.play();
    button.classList.remove('play-btn');
    button.classList.add('pause-btn');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  } else {
    // Jeda video dan ubah ikon ke 'play'
    video.pause();
    button.classList.remove('pause-btn');
    button.classList.add('play-btn');
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  }
}

// Fungsi untuk pause video aktif ketika slide berpindah
function pauseActiveVideo() {
const activeVideo = document.querySelector('.carousel-item.active video');
const activeButton = document.querySelector('.carousel-item.active .video-control');
if (activeVideo) {
  pauseVideo(activeVideo, activeButton);
}
}

// Menonaktifkan klik kanan pada elemen video
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Mencegah menu konteks muncul
  });
});

document.querySelectorAll('.carousel-item video').forEach(video => {
  video.addEventListener('play', function () {
    const button = this.closest('.carousel-item').querySelector('.video-control');
    const icon = button.querySelector('i');
    button.classList.remove('play-btn');
    button.classList.add('pause-btn');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  });

  video.addEventListener('pause', function () {
    const button = this.closest('.carousel-item').querySelector('.video-control');
    const icon = button.querySelector('i');
    button.classList.remove('pause-btn');
    button.classList.add('play-btn');
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  });
});

// Event listener untuk mendeteksi saat slide berubah
document.querySelector('#carouselExampleIndicators').addEventListener('slide.bs.carousel', function () {
pauseActiveVideo(); // Pause video saat slide berpindah
});

// Event listener untuk memulai video pertama saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
const firstVideo = document.querySelector('.carousel-item.active video');
const firstButton = document.querySelector('.carousel-item.active .video-control');
if (firstVideo) {
  pauseVideo(firstVideo, firstButton); // Pastikan video pertama dalam keadaan pause
}
}); 
