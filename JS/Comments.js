const textarea = document.querySelector("textarea");
        textarea.addEventListner("keyup" ,e=>{
            textarea.style.height = auto;
            let scHeight = e.target.scrollHeight;
            console.log(scHeight)
        }
    
        );
        function showMessage() {
            alert("Thank you for your feedback!");
        }
        function showResetMessage() {
            alert("Form has been reset!");
        }