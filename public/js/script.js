(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  // From index.ejs — move to public/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  let taxSwitch = document.getElementById("switchCheckDefault");
  if (taxSwitch) {
    taxSwitch.addEventListener("click", () => {
      let taxInfo = document.getElementsByClassName("tax-info");
      for (let info of taxInfo) {
        info.style.display = info.style.display !== "inline" ? "inline" : "none";
      }
    });
  }
});
