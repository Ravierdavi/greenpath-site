document.addEventListener("DOMContentLoaded", function () {
  // Rolagem suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });

        // Fecha o menu hamburguer se estiver aberto
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      }
    });
  });

  // Ativa os tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Efeito de fade-in nas seções
  const sections = document.querySelectorAll("section");
  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach((section) => {
    section.classList.add("fade-out");
    observer.observe(section);
  });

  // Controle do carrossel de características
  const featuresCarousel = document.getElementById("featuresCarousel");
  if (featuresCarousel) {
    const carousel = new bootstrap.Carousel(featuresCarousel, {
      interval: 5000,
      wrap: true,
    });
  }
});

// Função para calcular a emissão de CO₂
function calcularCO2() {
  const km = parseFloat(document.getElementById("km").value);
  const fatorCO2 = parseFloat(document.getElementById("veiculo").value);

  if (isNaN(km)) {
    alert("Digite um valor válido para quilômetros!");
    return;
  }

  const co2 = km * fatorCO2;
  const economia = fatorCO2 === 0.05 ? 0 : co2 - km * 0.05;

  const resultado = document.getElementById("resultado");
  resultado.classList.remove("d-none");

  if (fatorCO2 === 0.05) {
    resultado.innerHTML = `
            <h5 class="mb-2">Sua emissão com GreenPath:</h5>
            <p class="mb-0">${co2.toFixed(2)}kg de CO₂/mês</p>
        `;
  } else {
    resultado.innerHTML = `
            <h5 class="mb-2">Você economizaria:</h5>
            <p class="mb-0">${economia.toFixed(
              2
            )}kg de CO₂/mês usando o GreenPath!</p>
            <p class="small mt-2">(Emissão atual: ${co2.toFixed(
              2
            )}kg vs GreenPath: ${(km * 0.05).toFixed(2)}kg)</p>
        `;
  }
}

// Gerar QR Code com cor personalizada
document.addEventListener("DOMContentLoaded", function () {
  atualizarQRCode();
});
// Função para atualizar o QR Code com a URL atual e cor personalizada
function atualizarQRCode() {
  const qrCodeImg = document.getElementById("qrCode");
  const corVerde = "28a745"; // Cor do tema (#28a745 em HEX)
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}&color=${corVerde}`;

  // Efeito visual de recarregamento
  qrCodeImg.style.opacity = "0.5";
  setTimeout(() => {
    qrCodeImg.style.opacity = "1";
  }, 300);
}
