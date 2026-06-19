const profile = document.getElementById("profile");

const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme")==="light"){
    document.body.classList.add("light");
    themeBtn.textContent="☀️";
}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        localStorage.setItem("theme","light");
        themeBtn.textContent="☀️";
    }
    else{
        localStorage.setItem("theme","dark");
        themeBtn.textContent="🌙";
    }

});

document
.getElementById("username")
.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){
        searchUser();
    }

});

function clearData(){

    document.getElementById("username").value="";
    profile.innerHTML="";

}

async function searchUser(){

    const username =
    document.getElementById("username")
    .value
    .trim();

    if(!username){
        alert("Enter Username");
        return;
    }

    profile.innerHTML =
    "<h3>Loading...</h3>";

    try{

        const userResponse =
        await fetch(
        `https://api.github.com/users/${username}`
        );

        if(!userResponse.ok){
            throw new Error();
        }

        const user =
        await userResponse.json();

        const repoResponse =
        await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
        );

        const repos =
        await repoResponse.json();

        profile.innerHTML=`

        <div class="profile-card">

            <img src="${user.avatar_url}">

            <h2>${user.name || user.login}</h2>

            <p>@${user.login}</p>

            <p>${user.bio || "No Bio Available"}</p>

            <p>📍 ${user.location || "Unknown"}</p>

            <p>🏢 ${user.company || "Not Available"}</p>

            <p>🌐 ${user.blog || "No Website"}</p>

            <p>📅 Joined:
            ${new Date(user.created_at)
            .toLocaleDateString()}
            </p>

            <div class="stats">

                <div>
                    <h3>${user.followers}</h3>
                    <small>Followers</small>
                </div>

                <div>
                    <h3>${user.following}</h3>
                    <small>Following</small>
                </div>

                <div>
                    <h3>${user.public_repos}</h3>
                    <small>Repos</small>
                </div>

            </div>

            <a
            class="profile-link"
            href="${user.html_url}"
            target="_blank">
            View Profile
            </a>

            <div class="repo-list">

                <h3>
                Latest Repositories
                </h3>

                ${repos.map(repo => `
                    <div class="repo-item">

                        <a
                        href="${repo.html_url}"
                        target="_blank">

                        ${repo.name}

                        </a>

                    </div>
                `).join("")}

            </div>

        </div>

        `;

    }
    catch{

        profile.innerHTML=
        `
        <p class="error">
        User Not Found ❌
        </p>
        `;
    }

}
