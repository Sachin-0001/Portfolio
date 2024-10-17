
  document.addEventListener("DOMContentLoaded", function() {
    const secondsec = document.querySelector(".secondsec");

    setTimeout(function() {
        secondsec.classList.add("show");
    }, 2000);
  });



const hiddenELements = document.querySelectorAll('.secondsec');
hiddenELements.forEach((el) => observer.observe(el));