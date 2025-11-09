// rsi-config.js
function loadVesselConfig(callback) {
  fetch("../data/vessel-config.json")
    .then(res => res.json())
    .then(config => {
      if (callback) callback(config);
    })
    .catch(err => console.error("Error loading vessel config:", err));
}

function renderVesselInfo(config) {
  // Welcome Message
  const welcomeEl = document.getElementById("welcomeMessage");
  if (welcomeEl) welcomeEl.textContent = config.welcomeMessage;

  // About Vessel
  const aboutEl = document.getElementById("aboutVessel");
  if (aboutEl) aboutEl.textContent = config.aboutVessel;

  // Photos Carousel
  const indicators = document.querySelector("#vesselCarousel .carousel-indicators");
  const inner = document.querySelector("#vesselPhotos");
  if (indicators && inner) {
    indicators.innerHTML = "";
    inner.innerHTML = "";

    config.photos.forEach((src, idx) => {
      indicators.innerHTML += `
        <li data-target="#vesselCarousel" data-slide-to="${idx}" ${idx === 0 ? 'class="active"' : ''}></li>`;
      inner.innerHTML += `
        <div class="item ${idx === 0 ? 'active' : ''}">
          <img src="${src}" alt="Vessel photo ${idx + 1}" class="img-responsive"/>
        </div>`;
    });
  }
}

function renderOnboarding(config) {
  // Example: dynamically build alerts based on modules
  const remindersEl = document.getElementById("reminders");
  if (remindersEl) {
    remindersEl.innerHTML = ""; // clear first
    config.modules.forEach(m => {
      let alertHTML = "";
      if (m === "Embarkation") {
        alertHTML = `<div class="alert alert-info">
            <i class="fa fa-info-circle"></i> Please fill out your embarkation details.
            <button class="btn btn-xs btn-primary pull-right">Go to Form</button>
          </div>`;
      } else if (m === "Certificates") {
        alertHTML = `<div class="alert alert-warning">
            <i class="fa fa-upload"></i> Please upload your certificates.
            <button class="btn btn-xs btn-primary pull-right">Upload Now</button>
          </div>`;
      } else if (m === "GDPR") {
        alertHTML = `<div class="alert alert-info">
            <i class="fa fa-shield"></i> Review GDPR to continue.
            <button class="btn btn-xs btn-primary pull-right">Review</button>
          </div>`;
      } else if (m === "Video") {
        alertHTML = `<div class="alert alert-success">
            <i class="fa fa-video-camera"></i> Watch the familiarization video.
            <button class="btn btn-xs btn-primary pull-right">Watch</button>
          </div>`;
      }
      remindersEl.innerHTML += alertHTML;
    });
  }
}
