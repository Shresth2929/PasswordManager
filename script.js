// Utility to mask passwords
function maskPassword(pass) {
    return "*".repeat(pass.length);
}

// Copy text to clipboard and show feedback
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        const alert = document.getElementById("alert");
        alert.style.display = "inline";
        setTimeout(() => {
            alert.style.display = "none";
        }, 2000);
    }).catch(() => {
        alert("Clipboard copied");
    });
}

// Delete a password entry
const deletePassword = (website) => {
    const data = JSON.parse(localStorage.getItem("passwords") || "[]");
    const updatedData = data.filter(entry => entry.website !== website);
    localStorage.setItem("passwords", JSON.stringify(updatedData));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
};

// Render passwords table
const showPasswords = () => {
    const table = document.querySelector("table");
    const data = JSON.parse(localStorage.getItem("passwords") || "[]");

    if (data.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
        return;
    }

    table.innerHTML = `
        <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>
    `;

    data.forEach(entry => {
        const row = `
            <tr>
                <td>${entry.website} <img onclick="copyText('${entry.website}')" src="./copy.svg" alt="Copy" width="10"></td>
                <td>${entry.username} <img onclick="copyText('${entry.username}')" src="./copy.svg" alt="Copy" width="10"></td>
                <td>${maskPassword(entry.password)} <img onclick="copyText('${entry.password}')" src="./copy.svg" alt="Copy" width="10"></td>
                <td><button class="btnsm" onclick="deletePassword('${entry.website}')">Delete</button></td>
            </tr>
        `;
        table.innerHTML += row;
    });
};

// Save a new password entry
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();

    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!website || !username || !password) {
        alert("All fields are required!");
        return;
    }

    const data = JSON.parse(localStorage.getItem("passwords") || "[]");
    data.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(data));

    alert("Password Saved!");
    document.querySelector("form").reset();
    showPasswords();
});

// Initial rendering
showPasswords();
