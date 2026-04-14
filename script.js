/* =========================================================================
   SCRIPT.JS - Interaktivitas untuk Portfolio Modern
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------
     1. Mobile Navbar Toggle
  ----------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Tutup menu saat link diklik (di mobile)
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* -----------------------------------------------------------
     2. Scroll active link status
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').includes(current)) {
        a.classList.add('active');
      }
    });
  });

  /* -----------------------------------------------------------
     3. Scroll Reveal Animation (Intersection Observer)
  ----------------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-in, .fade-up');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // hanya animasi sekali jalannya
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    observer.observe(el);
  });

  /* -----------------------------------------------------------
     4. Dummy CV Download Handler
  ----------------------------------------------------------- */
  const downloadBtn = document.getElementById('download-cv');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const textBtn = downloadBtn.textContent;
      downloadBtn.textContent = "Mengunduh...";

      // Simulasi delay download file
      setTimeout(() => {
        downloadBtn.textContent = "Berhasil Diunduh";

        // Buat file teks dummy sebagai gantinya
        const cvData = `CURRICULUM VITAE - JOHN DOE\n\nFrontend Developer & Web Designer\nTelepon: +62 812 3456 7890\nEmail: hello@johndoe.com\n\nKeahlian: React, Node.js, UI/UX, CSS, HTML5.`;
        const blob = new Blob([cvData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_John_Doe.txt';
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setTimeout(() => {
          downloadBtn.textContent = textBtn;
        }, 3000);
      }, 1000);
    });
  }
});
