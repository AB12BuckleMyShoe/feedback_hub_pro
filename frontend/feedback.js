document.addEventListener("DOMContentLoaded", () => {
    const tablebody = document.querySelector("#mytable tbody");
    const emptyMessage = document.getElementById("empty-message");
    loadUsers();

    function formatTimestamp(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"

        })
    }

    function showToast(message, type = "success") {
        const container = document.getElementById('toast-container');
        const toast = document.createElement("div");
        toast.classList.add("toast", type);
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-10px)";
            setTimeout(() => 
                toast.remove(), 300); 
            }, 3000)
    }
    


    function loadUsers() {

        tablebody.innerHTML = "";
        fetch("http://localhost:4000/api/users") 

        .then(response => response.json())

        .then(function(data) {
            if(data.length === 0) {
                emptyMessage.style.display = "block";
            } else {
                emptyMessage.style.display = "none";
            }
        data.forEach(function(item) {
            const tr = document.createElement("tr");
            const nametd = document.createElement("td");
            const feedbacktd = document.createElement("td");
            const timetd = document.createElement("td");
            const deletetd = document.createElement("td");
            const delbutton = document.createElement("button");
            nametd.textContent = `${item.name}`;
            feedbacktd.textContent = `${item.feedback}`;
            timetd.textContent = formatTimestamp(item.created_at);
            delbutton.innerHTML = `<i class="delbtn fa-solid fa-trash"></i>`;
            delbutton.dataset.id = item.id;
            
            delbutton.addEventListener("click", () => {
                fetch(`http://localhost:4000/api/users/${delbutton.dataset.id}`, {
                method: 'DELETE'
            })

            .then(() => { showToast("Feedback deleted", "success"); loadUsers();})

            .catch(() => showToast("Something went wrong", "error"))

            
        })
        delbutton.classList.add("del-btn");
            tablebody.appendChild(tr);
            tr.appendChild(nametd);
            tr.appendChild(feedbacktd);
            tr.appendChild(timetd)
            tr.appendChild(deletetd);
            deletetd.appendChild(delbutton);
        })})
       
        .catch(() => showToast("Something went wrong", "error"))
    
    }
})