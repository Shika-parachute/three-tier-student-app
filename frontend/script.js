const API_URL = "http://localhost:3000";

async function loadStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();

        const studentList = document.getElementById("studentList");

        studentList.innerHTML = "";

        if (students.length === 0) {
            studentList.innerHTML = "<p>No students found.</p>";
            return;
        }

        students.forEach((student) => {
            const div = document.createElement("div");

            div.className = "student";

            div.innerHTML = `
                <strong>${student.name}</strong><br>
                Email: ${student.email}<br>
                Course: ${student.course}
            `;

            studentList.appendChild(div);
        });

    } catch (error) {
        console.error("Error loading students:", error);
    }
}


async function addStudent() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    if (name === "" || email === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/students`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                course: course
            })
        });

        const data = await response.json();

        alert(data.message);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("course").value = "";

        loadStudents();

    } catch (error) {

        console.error("Error adding student:", error);

        alert("Could not connect to backend");

    }
}


loadStudents();