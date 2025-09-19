const repos = [
  "https://beltedblinds.github.io/idols-media-01/manifest.json"
  // Add more repos here later
];

let allImages = [];

async function loadAllManifests() {
  for (const url of repos) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      allImages = allImages.concat(data);
    } catch (err) {
      console.error("Failed to load manifest:", url, err);
    }
  }
}

function displayImages(images) {
  const container = document.getElementById("imageContainer");
  container.innerHTML = "";
  images.forEach(img => {
    const imageEl = document.createElement("img");
    imageEl.src = img.path;
    imageEl.alt = img.path;
    imageEl.width = 200; // adjust as needed
    container.appendChild(imageEl);
  });
}

// Shuffle button
document.getElementById("shuffleBtn").addEventListener("click", () => {
  if (allImages.length === 0) return;
  const randomImg = allImages[Math.floor(Math.random() * allImages.length)];
  displayImages([randomImg]);
});

// Search bar
document.getElementById("searchBar").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allImages.filter(img => img.path.toLowerCase().includes(query));
  displayImages(filtered);
});

// Load manifests on page load
loadAllManifests();
