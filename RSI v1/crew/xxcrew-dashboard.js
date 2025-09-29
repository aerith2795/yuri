document.addEventListener("DOMContentLoaded", function() {
  const welcomeEl = document.getElementById("welcome-text");
  const aboutEl = document.getElementById("about-vessel");
  const photosEl = document.getElementById("photos-container");

  // Insert Welcome + About
  welcomeEl.textContent = vesselConfig.welcomeMessage;
  aboutEl.textContent = vesselConfig.aboutVessel;

  // Insert Photos
  vesselConfig.photos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("vessel-photo");
    photosEl.appendChild(img);
  });
});
