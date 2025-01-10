

class VisitorTracker {
    constructor() {
        this.formUrl = 'https://docs.google.com/forms/d/1S_smXqUvIzOCqVpxC2OWSaRzw5KRUKwzISCmtQzwAJw/formResponse';
        this.collectInfo();
    }

    async collectInfo() {
        // Get browser info
        const browserInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenRes: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || 'direct',
            path: window.location.pathname
        };

        // Get IP and location
        try {
            const response = await fetch('https://ipapi.co/json/');
            const ipData = await response.json();

            console.log('IP data:', ipData);
            
            // Create form data with correct entry IDs
            const formData = new FormData();
            // IP address
            formData.append('entry.1806502355', ipData.ip);
            // Location
            formData.append('entry.165474891', `${ipData.city}, ${ipData.country_name}`);
            // Browser info
            formData.append('entry.1282557930', JSON.stringify(browserInfo));

            formData.append('entry.385779474', window.location.href);
            
            // Time (hour and minute are separate fields)
            const now = new Date();
            formData.append('entry.1205645852_hour', now.getHours().toString());
            formData.append('entry.1205645852_minute', now.getMinutes().toString());

            // Submit to form
            this.submitForm(formData);
            
        } catch (error) {
            console.error('Error collecting visitor info:', error);
        }
    }

    submitForm(formData) {
        fetch(this.formUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).catch(error => console.error('Error submitting form:', error));
    }
}

// Initialize when page loads
// window.addEventListener('load', () => {
    new VisitorTracker();
// });
