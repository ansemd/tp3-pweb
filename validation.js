document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    const fields = [
        { 
            id: "nom", 
            errorId: "error-name", 
            validate: (value) => /^[a-zA-ZÀ-ÿ\s]+$/.test(value), 
            emptyMessage: "Champ obligatoire" , 
            invalidMessage: "Le nom ne doit contenir que des lettres et des espaces"
        },
        { 
            id: "email", 
            errorId: "error-email", 
            validate: (value) => value.includes("@") && value.includes("."), 
            emptyMessage: "Champ obligatoire", 
            invalidMessage: "L'email doit contenir '@' et un domaine valide (ex: exemple@gmail.com)" 
        },
        { 
            id: "age", 
            errorId: "error-age", 
            validate: (value) => value === "" || (!isNaN(value) && Number(value) > 0),
            invalidMessage: "L'âge doit être un nombre valide" 
        },
        { 
            id: "mdp", 
            errorId: "error-mdp", 
            validate: (value) => value.length >= 8, 
            emptyMessage: "Champ obligatoire", 
            invalidMessage: "Le mot de passe doit contenir au moins 8 caractères" 
        },
        { 
            id: "confirmmdp", 
            errorId: "error-confirmmdp", 
            validate: (value) => value === document.getElementById("mdp").value, 
            emptyMessage: "Champ obligatoire", 
            invalidMessage: "Les mots de passe ne correspondent pas" 
        }
    ];

    function validateField(field) {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);
        const value = input.value.trim();

        if (value === "" && field.id !== "age") {
            errorElement.textContent = field.emptyMessage;
            errorElement.style.color = "red";
            errorElement.style.fontSize = "12px";
            errorElement.style.width = "100px";
            return false;
        } else if (!field.validate(value)) {
            errorElement.textContent = field.invalidMessage;
            errorElement.style.color = "red";
            errorElement.style.fontSize = "10px";
            errorElement.style.width = "115px";
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    }

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.addEventListener("blur", () => validateField(field));
    });

    
    document.querySelectorAll("#mdp, #confirmmdp").forEach(input => {
        const icon = input.nextElementSibling; 
    
        icon.addEventListener("click", function () {
            if (input.type === "password") {
                input.type = "text";
                icon.textContent = "visibility";
            } else {
                input.type = "password";
                icon.textContent = "visibility_off";
            }
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;  
        fields.forEach(field => {  
            if (!validateField(field)) {
                isValid = false;  
            }
        });

        alert(isValid ? "Inscription réussie !" : "Inscription échouée !");
    });
});

