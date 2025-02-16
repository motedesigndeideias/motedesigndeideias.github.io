// widget.js
(function() {
    // Configuration
    const widgetConfig = {
        apiUrl: 'https://your-bubble-app.com/version-test/api/1.1/wd/website-data',
        widgetPosition: 'bottom-left', // Default position
        widgetStyles: {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: '14px',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }
    };

    // Fetch data from Bubble API
    async function fetchData(url) {
        try {
            const response = await fetch(`${widgetConfig.apiUrl}?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    // Render the widget
    function renderWidget(data) {
        const widget = document.createElement('div');
        widget.id = 'ai-widget';
        Object.assign(widget.style, widgetConfig.widgetStyles);

        // Add content to the widget
        widget.innerHTML = `
            <h3>Website Insights</h3>
            <p><strong>Pricing:</strong> ${data.pricing || 'Not available'}</p>
            <p><strong>Services:</strong> ${data.services || 'Not available'}</p>
            <p><strong>FAQs:</strong> ${data.faqs || 'Not available'}</p>
        `;

        // Position the widget
        const position = widgetConfig.widgetPosition.split('-');
        widget.style.position = 'fixed';
        widget.style[position[0]] = '20px';
        widget.style[position[1]] = '20px';
        widget.style.zIndex = '1000';

        // Append the widget to the body
        document.body.appendChild(widget);
    }

    // Initialize the widget
    async function init() {
        const currentUrl = window.location.href;
        const data = await fetchData(currentUrl);
        if (data) {
            renderWidget(data);
        }
    }

    // Start the widget
    init();
})();