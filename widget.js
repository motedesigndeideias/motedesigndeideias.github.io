// widget.js
(function() {
    // Default configuration
    const defaultConfig = {
        apiUrl: 'http://localhost:3001/mock-data', // Use mock API for local testing
        position: 'bottom-left', // Default position
        styles: {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: '14px',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }
    };

    // Merge default config with custom config (if provided)
    const widgetConfig = { ...defaultConfig, ...window.aiWidgetConfig };

    // Fetch data from the API
    async function fetchData() {
        try {
            const response = await fetch(widgetConfig.apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    // Render the widget
    function renderWidget(data) {
        // Create the widget container
        const widget = document.createElement('div');
        widget.id = 'ai-widget';
        Object.assign(widget.style, widgetConfig.styles);

        // Add content to the widget
        widget.innerHTML = `
            <h3>Website Insights</h3>
            <p><strong>Pricing:</strong> ${data.pricing || 'Not available'}</p>
            <p><strong>Services:</strong> ${data.services || 'Not available'}</p>
            <p><strong>FAQs:</strong> ${data.faqs || 'Not available'}</p>
        `;

        // Position the widget
        const position = widgetConfig.position.split('-');
        widget.style.position = 'fixed';
        widget.style[position[0]] = '20px';
        widget.style[position[1]] = '20px';
        widget.style.zIndex = '1000';

        // Make the widget responsive
        if (window.innerWidth < 768) {
            widget.style.fontSize = '12px';
            widget.style.padding = '8px';
        }

        // Append the widget to the body
        document.body.appendChild(widget);
    }

    // Track widget events (optional)
    function trackEvent(eventName) {
        fetch('https://your-bubble-app.com/version-test/api/1.1/wd/track-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ event: eventName, url: window.location.href })
        }).catch(error => console.error('Error tracking event:', error));
    }

    // Initialize the widget
    async function init() {
        const data = await fetchData();
        if (data) {
            renderWidget(data);
            trackEvent('widget-loaded'); // Track widget load event
        }
    }

    // Start the widget
    init();
})();