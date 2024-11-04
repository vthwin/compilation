const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21,
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4,
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment:
            "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152,
    },
];

const mainEl = document.getElementsByTagName("main")[0];
let generatedPost = "";

for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    generatedPost += `
        <div class="container post-item" data-index="${i}">
            <div class="post-header">
                <img class="avatar-pic" src=${post.avatar} />
                <div class="post-user-info">
                    <p>${post.name}</p>
                    <p>${post.location}</p>
                </div>
            </div>
            <img class="post-img" src=${post.post} />
            <div class="post-interactive">
                <div class="post-icons">
                    <img class="like-btn" src="images/icon-heart.png" />
                    <img src="images/icon-comment.png" />
                    <img src="images/icon-dm.png" />
                </div>
                <div class="post-text">
                    <p>${post.likes} likes</p>
                    <p>${post.username} <span class="comment">${post.comment}</span></p>
                </div>
            </div>
        </div>
    `;
}

mainEl.innerHTML = generatedPost;

const likeEl = document.querySelectorAll(".like-btn");
likeEl.forEach((likeBtn, index) => {
    likeBtn.addEventListener("dblclick", () => {
        posts[index].likes++;
        const likeCount = document.querySelector(
            `.post-item[data-index='${index}'] .post-text p:first-child`
        );
        likeCount.textContent = `${posts[index].likes} likes`;
    });
});
