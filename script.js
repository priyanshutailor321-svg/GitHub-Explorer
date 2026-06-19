const profile = document.getElementById("profile");

async function searchUser() {

    const username =
        document.getElementById("username").value.trim();

    if(!username) return;

    profile.innerHTML = "<p>Loading...</p>";

    try {

        const res = await fetch(
            `https://api.github.com/users/${username}`
        );

        if(!res.ok) throw new Error();

        const user = await res.json();

        profile.innerHTML = `
        <div class="profile-card">

            <img src="${user.avatar_url}">

            <h2>${user.name || user.login}</h2>

            <p>${user.bio || "No Bio Available"}</p>

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

            <a href="${user.html_url}" target="_blank">
                Visit Profile
            </a>

        </div>
        `;

    }
    catch {

        profile.innerHTML =
        `<p class="error">User Not Found ❌</p>`;
    }
}