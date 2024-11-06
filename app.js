document.addEventListener("DOMContentLoaded", () => {
    // Firebase configuration and initialization
    const firebaseConfig = {
        apiKey: "AIzaSyDTlU1i1fT-sijiys15PCzvUWQtLUA2nkM",
        authDomain: "todolistweb-f2dbd.firebaseapp.com",
        projectId: "todolistweb-f2dbd",
        storageBucket: "todolistweb-f2dbd.appspot.com", // Corrected storageBucket URL
        messagingSenderId: "860090971599",
        appId: "1:860090971599:web:4888e12ef1deb65be28eba",
        measurementId: "G-4DM8W4X21J"
    };
    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    // Elements
    const loginSection = document.getElementById("login-section");
    const todoSection = document.getElementById("todo-section");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const addBtn = document.getElementById("add-btn");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    // Login with Google
    loginBtn.onclick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(error => {
            console.error("Login error:", error.message);
        });
    };
    // Logout
    logoutBtn.onclick = () => {
        auth.signOut().catch(error => {
            console.error("Logout error:", error.message);
        });
    };
    // Track authentication status
    auth.onAuthStateChanged(user => {
        if (user) {
            loginSection.style.display = "none";
            todoSection.style.display = "block";
        } else {
            loginSection.style.display = "block";
            todoSection.style.display = "none";
        }
    });
    // Add a new to-do item
    addBtn.onclick = () => {
        const taskText = todoInput.value;
        if (taskText.trim() !== "") {
            const taskDiv = document.createElement("div");
            const taskLabel = document.createElement("label");
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.onclick = () => {
                taskLabel.classList.toggle("completed", checkBox.checked);
            };
            taskLabel.textContent = taskText;
            taskDiv.appendChild(taskLabel);
            taskDiv.appendChild(checkBox);
            todoList.appendChild(taskDiv);
            todoInput.value = "";
        }
    };
 });