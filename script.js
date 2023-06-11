// Replace 'YOUR_API_KEY' with your YouTube Data API key
const apiKey = 'AIzaSyCv2forG6vOu-ByG4o8Dwgo7kuc8hLsFLA';




function searchVideos() {
    const query = document.getElementById('searchInput').value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => processVideos(data.items))
        .catch(error => console.error('Error:', error));
}

function processVideos(videos) {
    // Sort videos based on views and comments
    const sortedVideos = videos.sort((a, b) => {
        const viewsA = a.statistics && a.statistics.viewCount ? parseInt(a.statistics.viewCount) : 0;
        const viewsB = b.statistics && b.statistics.viewCount ? parseInt(b.statistics.viewCount) : 0;
        const commentsA = a.statistics && a.statistics.commentCount ? parseInt(a.statistics.commentCount) : 0;
        const commentsB = b.statistics && b.statistics.commentCount ? parseInt(b.statistics.commentCount) : 0;

        if (viewsA !== viewsB) {
            return viewsB - viewsA;
        } else {
            return commentsB - commentsA;
        }
    });

    displayResults(sortedVideos);
}

function displayResults(videos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    videos.slice(0, 3).forEach(video => {
        const title = video.snippet.title;
        const description = video.snippet.description;
        const videoId = video.id.videoId;

        // Check if the video is available
        if (videoId) {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video');

            videoElement.innerHTML = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <div class="video-details">
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
            `;

            resultsDiv.appendChild(videoElement);
        }
    });
}
