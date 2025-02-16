(function() {
    // Create the widget container
    var widget = document.createElement('div');
    widget.style.position = 'fixed';
    widget.style.bottom = '20px';
    widget.style.right = '20px';
    widget.style.width = '300px';
    widget.style.height = '200px';
    widget.style.backgroundColor = 'white';
    widget.style.border = '1px solid #ccc';
    widget.style.borderRadius = '8px';
    widget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    widget.style.zIndex = '1000';
    widget.style.overflow = 'hidden';

    // Add some content to the widget (optional)
    widget.innerHTML = '<div style="padding: 20px; font-family: Arial, sans-serif;">' +
                       '<h3 style="margin: 0;">Widget Title</h3>' +
                       '<p>This is a simple floating widget.</p>' +
                       '</div>';

    // Append the widget to the body
    document.body.appendChild(widget);
})();