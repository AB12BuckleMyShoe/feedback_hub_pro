document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedbackform");
    const input = document.getElementById("nameInput");
    const feedback = document.getElementById("feedback");
    const submitBtn = document.getElementById("submitBtn");
    checkValidation();

    function checkValidation() {
        if(!input.value.trim() || !feedback.value.trim())
            submitBtn.disabled = true;

        else {
            submitBtn.disabled = false;
        }
            
    }

    input.addEventListener("input", checkValidation, {

    })

    feedback.addEventListener("input", checkValidation, {

    })

    
    form.addEventListener("submit", (event) => {
        console.log("SUBMIT HANDLER FIRED");
        event.preventDefault();

        if(!input.value.trim() || !feedback.value.trim()) {
            submitBtn.disabled = true;
            return;
 }
            

        else {
            submitBtn.disabled = false;
        }
            
    

        
        const data = {
            name: input.value,
            feedback: feedback.value

        }

        input.value = "";
        feedback.value = "";

        fetch("http://localhost:4000/api/users", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)

        })

        .then(res => { if(!res.ok) throw new Error("Failed to submit feedback"); return res.json(); })

        .then(() => {window.location.href = "feedback.html"; })

        .catch(err => console.error(err))

                
})
        
})

    



