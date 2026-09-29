document.addEventListener('DOMContentLoaded', function () {

    var searchInput = document.getElementById('job-search');
    var jobsTableBody = document.querySelector('#job-table tbody');

    if (searchInput && jobsTableBody) {
        var jobRows = jobsTableBody.querySelectorAll('tr');

        searchInput.addEventListener('input', function () {
            var filterText = searchInput.value.toLowerCase().trim();

            jobRows.forEach(function (row) {
                var rowText = row.textContent.toLowerCase();


                if (rowText.indexOf(filterText) !== -1) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    var regForm = document.getElementById('reg-form');
    var formMessage = document.getElementById('form-message');

    if (regForm && formMessage) {
        regForm.addEventListener('submit', function (event) {

            event.preventDefault();

            var fullName = document.getElementById('fullname').value.trim();
            var email = document.getElementById('email').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var qualification = document.getElementById('qualification').value;
            var jobRole = document.getElementById('jobrole').value.trim();
            var resumeInput = document.getElementById('resume');
            var resumeFile = resumeInput ? resumeInput.files[0] : null;

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var phonePattern = /^[0-9]{10}$/;

            if (fullName === '') {
                showError('Please enter your Full Name.');
                document.getElementById('fullname').focus();
                return;
            }

            if (email === '' || !emailPattern.test(email)) {
                showError('Please enter a valid Email address.');
                document.getElementById('email').focus();
                return;
            }

            if (phone === '' || !phonePattern.test(phone)) {
                showError('Please enter a valid 10-digit Phone number.');
                document.getElementById('phone').focus();
                return;
            }

            if (qualification === '') {
                showError('Please select your Qualification.');
                document.getElementById('qualification').focus();
                return;
            }

            if (jobRole === '') {
                showError('Please enter your Preferred Job Role.');
                document.getElementById('jobrole').focus();
                return;
            }

            if (!resumeFile) {
                showError('Please upload your Resume (PDF/DOC).');
                document.getElementById('resume').focus();
                return;
            }

            window.location.href = 'submitted.html';
        });

        var btnReset = document.getElementById('btn-reset');
        if (btnReset) {
            btnReset.addEventListener('click', function () {
                formMessage.style.display = 'none';
                formMessage.textContent = '';
            });
        }
    }

    function showError(message) {
        formMessage.textContent = message;
        formMessage.className = 'alert alert-danger';
        formMessage.style.display = 'block';
    }

});
