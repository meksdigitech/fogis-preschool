(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);



const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");
const responseDiv = document.getElementById("formResponse");

function showAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  responseDiv.innerHTML = "";
  responseDiv.appendChild(alert);

  // Fade in
  setTimeout(() => alert.classList.add("show"), 50);

  // Fade out after 4 seconds
  setTimeout(() => {
    alert.classList.remove("show");
    setTimeout(() => alert.remove(), 500);
  }, 4000);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  // Show loading state
  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  spinner.style.display = "inline-block";
  responseDiv.innerHTML = "";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }, // important for Formspree
    });

    if (response.ok) {
      showAlert("Your message has been sent successfully!", "success");
      form.reset();
    } else {
      showAlert("Something went wrong. Please try again.", "danger");
    }
  } catch (error) {
    showAlert("Network error. Please try again.", "danger");
  } finally {
    // Reset button
    submitBtn.disabled = false;
    btnText.textContent = "Send Message";
    spinner.style.display = "none";
  }
});





      
       