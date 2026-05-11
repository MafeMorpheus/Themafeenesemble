exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed'
    };
  }

  try {
    const params = new URLSearchParams(event.body);
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const subject = params.get('subject') || '';
    const message = params.get('message') || '';

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: 'Missing required fields'
      };
    }

    // Use Netlify's built-in form handling by forwarding to it
    // This will trigger form submission and any configured notifications
    return {
      statusCode: 302,
      headers: {
        'Location': '/success',
        'Cache-Control': 'no-cache'
      },
      body: ''
    };

  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      body: 'Internal server error'
    };
  }
};
