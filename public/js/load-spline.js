// Load Spline viewer script
(function () {
  // Create and add the script element
  const script = document.createElement("script");
  script.type = "module";
  script.src =
    "https://unpkg.com/@splinetool/viewer@1.9.93/build/spline-viewer.js";
  document.head.appendChild(script);

  // Wait for script to load and add the spline-viewer
  script.onload = function () {
    // Find all containers that should contain a spline viewer
    const containers = document.querySelectorAll(".spline-container");

    containers.forEach((container) => {
      const url = container.getAttribute("data-url");
      if (url) {
        // Create the spline-viewer element
        const viewer = document.createElement("spline-viewer");
        viewer.setAttribute("url", url);

        // Clear the container and append the viewer
        container.innerHTML = "";
        container.appendChild(viewer);
      }
    });
  };
})();
