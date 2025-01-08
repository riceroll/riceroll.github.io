
document.addEventListener('DOMContentLoaded', function() {
    let targetUrl = '';
    const modal = document.getElementById('passwordModal');
    const modalBootstrap = new bootstrap.Modal(modal);
    
    // Find all password-protected links and add click handlers
    document.querySelectorAll('a[data-protected="true"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        targetUrl = this.getAttribute('href');
        modalBootstrap.show();
      });
    });
  
    // Handle password submission
    document.getElementById('submitPassword').addEventListener('click', function() {
      const password = document.getElementById('projectPassword').value;
      if(password) {
        window.location.href = targetUrl + password;
      }
      modalBootstrap.hide();
      document.getElementById('projectPassword').value = '';
    });
  
    // Handle close button
    document.getElementById('closeModal').addEventListener('click', function() {
      modalBootstrap.hide();
    });
  
    // Handle enter key in password field
    document.getElementById('projectPassword').addEventListener('keypress', function(e) {
      if(e.key === 'Enter') {
        document.getElementById('submitPassword').click();
      }
    });
  
    // Handle clicking the modal close button
    document.querySelector('[data-dismiss="modal"]').addEventListener('click', function() {
      modalBootstrap.hide();
    });
  });