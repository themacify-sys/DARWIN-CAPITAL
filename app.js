document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Initial Calculation Triggers
  if (document.getElementById('emi-form')) {
    calculateEMI();
  }
  if (document.getElementById('overdraft-form')) {
    calculateOverdraft();
  }
});

// EMI Calculator Calculation Logic
function calculateEMI() {
  const principal = parseFloat(document.getElementById('loanAmount').value);
  const annualRate = parseFloat(document.getElementById('interestRate').value);
  const years = parseFloat(document.getElementById('loanTenure').value);

  if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0) return;

  const monthlyRate = (annualRate / 12) / 100;
  const totalMonths = years * 12;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  document.getElementById('resEMI').innerText = '₹' + Math.round(emi).toLocaleString('en-IN');
  document.getElementById('resPrincipal').innerText = '₹' + Math.round(principal).toLocaleString('en-IN');
  document.getElementById('resInterest').innerText = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
  document.getElementById('resTotal').innerText = '₹' + Math.round(totalPayment).toLocaleString('en-IN');
  document.getElementById('resMonths').innerText = totalMonths + ' Months';
}

// Overdraft Calculator Calculation Logic
function calculateOverdraft() {
  const limit = parseFloat(document.getElementById('sanctionedLimit').value);
  const utilized = parseFloat(document.getElementById('amountUtilised').value);
  const annualRate = parseFloat(document.getElementById('odRate').value);
  const days = parseFloat(document.getElementById('odDays').value);

  if (isNaN(limit) || isNaN(utilized) || isNaN(annualRate) || isNaN(days)) return;

  const unused = limit - utilized;
  const estimatedInterest = (utilized * annualRate * days) / (365 * 100);

  document.getElementById('resUtilized').innerText = '₹' + Math.round(utilized).toLocaleString('en-IN');
  document.getElementById('resUnused').innerText = '₹' + Math.round(unused >= 0 ? unused : 0).toLocaleString('en-IN');
  document.getElementById('resRate').innerText = annualRate + '%';
  document.getElementById('resDays').innerText = days + ' Days';
  document.getElementById('resEstInterest').innerText = '₹' + Math.round(estimatedInterest).toLocaleString('en-IN');
}

// Contact Form Handler (Static Ready for Integration)
function handleContactSubmit(event) {
  event.preventDefault();
  
  /* ===================================================================
     INTEGRATION POINT FOR REAL BACKEND SUBMISSION
     Replace this code block with integrations like Formspree, EmailJS, 
     Web3Forms, Firebase, or an HTTP POST endpoint to custom API.
     Example (Formspree):
     fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: new FormData(event.target),
        headers: { 'Accept': 'application/json' }
     });
     ===================================================================
  */

  const successMessage = document.getElementById('formSuccessMessage');
  if (successMessage) {
    successMessage.style.display = 'block';
    event.target.reset();
  }
  return false;
}
