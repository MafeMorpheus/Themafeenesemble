exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
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
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Log the submission (for debugging)
    console.log('Form submission received:', {
      name,
      email,
      subject: subject || 'General Inquiry',
      message: message.substring(0, 100) + '...'
    });

    // For now, redirect to success page
    // To enable email notifications, you need to either:
    // 1. Configure email notifications in Netlify dashboard (Site settings > Forms > Notifications)
    // 2. Or use a third-party email service like SendGrid, Mailgun, etc.
    
    return {
      statusCode: 302,
      headers: {
        'Location': '/success',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      },
      body: ''
    };

  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
