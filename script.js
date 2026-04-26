// ELEMENTS
const hero = document.getElementById("hero");
const projectDetail = document.getElementById("project-detail");

const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");

const video = document.getElementById("project-video");
const videoSource = document.getElementById("project-video-source");

const iframe = document.getElementById("project-iframe");
const image = document.getElementById("project-image");

const projectLink = document.getElementById("project-link");
const backBtn = document.getElementById("back-btn");
const mediaContainer = document.getElementById("media-container");

const viewButtons = document.querySelectorAll(".view-btn");

// PROJECT CLICK
viewButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();

        window.scrollTo({ top: 0, behavior: "smooth" });

        const title = this.dataset.title;
        const description = this.dataset.description;
        const link = this.dataset.link;

        // NEW: Multi-video support (any number of videos)
        const videosData = this.dataset.videos;

        projectTitle.textContent = title;
        projectDescription.textContent = description;
        projectLink.href = link;

        // RESET ALL MEDIA
        video.classList.add("hidden");
        iframe.classList.add("hidden");
        image.classList.add("hidden");
        video.pause();
        video.currentTime = 0;
        videoSource.src = "";
        iframe.src = "";
        image.src = "";
        mediaContainer.innerHTML = "";
        mediaContainer.style.display = "none";

        // === MULTI-VIDEO SYSTEM (works on ANY project card) ===
        if (videosData) {
            const items = videosData.split(',').map(item => {
                const [file, displayTitle] = item.trim().split('|');
                return { file: file.trim(), title: (displayTitle || file.replace('.mp4', '')).trim() };
            });

            let html = '';
            items.forEach(item => {
                html += `
                    <div class="media-item">
                        <h4>${item.title}</h4>
                        <video controls>
                            <source src="${item.file}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
            });

            mediaContainer.innerHTML = html;
            mediaContainer.style.display = "flex";
        }
        // === ORIGINAL SINGLE MEDIA LOGIC (YouTube / single video / image) ===
        else {
            const videoSrc = this.dataset.video;
            const imageSrc = this.dataset.image;

            if (videoSrc && videoSrc.includes("youtube.com")) {
                iframe.src = videoSrc;
                iframe.classList.remove("hidden");
            }
            else if (videoSrc) {
                videoSource.src = videoSrc;
                video.load();
                video.classList.remove("hidden");
            }
            else if (imageSrc) {
                image.src = imageSrc;
                image.classList.remove("hidden");
            }
        }

        hero.classList.add("hidden");
        projectDetail.classList.remove("hidden");
    });
});

// BACK BUTTON
backBtn.addEventListener("click", () => {
    projectDetail.classList.add("hidden");
    hero.classList.remove("hidden");

    // clean up
    video.pause();
    video.currentTime = 0;
    videoSource.src = "";
    iframe.src = "";
    image.src = "";
    mediaContainer.innerHTML = "";
    mediaContainer.style.display = "none";
});