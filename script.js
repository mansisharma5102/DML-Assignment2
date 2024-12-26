document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 0;

    const showStep = (step) => {
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index === step);
            steps[index].classList.toggle('active', index === step);
        });
    };

    document.querySelectorAll('.btn-next').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll('.btn-prev').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    document.getElementById('multiStepForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.skills = formData.getAll('skills'); 
        localStorage.setItem('formData', JSON.stringify(data));
        alert('Form Submitted Successfully!');
        console.log(data);
    });

    const validateStep = (step) => {
        const inputs = formSteps[step].querySelectorAll('input, select');
        let isValid = true;

        inputs.forEach((input) => {
            const error = input.nextElementSibling;
            if (!input.checkValidity()) {
                error.textContent = input.validationMessage;
                isValid = false;
            } else {
                error.textContent = '';
            }
        });

        return isValid;
    };

    showStep(currentStep);
});