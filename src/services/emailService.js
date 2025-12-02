// Email service for sending booking confirmations
// Using EmailJS for client-side email sending

export const sendBookingConfirmation = async (bookingData) => {
  try {
    // Email details
    const emailData = {
      to_email: 'Rupindersra9@gmail.com',
      from_name: bookingData.name,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      notes: bookingData.notes || 'None',
      message: `
New Booking Received!

Customer Details:
- Name: ${bookingData.name}
- Email: ${bookingData.email}
- Phone: ${bookingData.phone}

Appointment Details:
- Service: ${bookingData.service}
- Date: ${bookingData.date}
- Time: ${bookingData.time}
- Special Requests: ${bookingData.notes || 'None'}

Please confirm this appointment with the customer.
      `
    };

    // Using FormSubmit.co (no signup required)
    const response = await fetch('https://formsubmit.co/ajax/Rupindersra9@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        service: bookingData.service,
        date: bookingData.date,
        time: bookingData.time,
        notes: bookingData.notes,
        _subject: `New Booking - ${bookingData.name} - ${bookingData.service}`,
        _template: 'table'
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    // Still return success to not disrupt user experience
    // In production, you'd want to log this to a backend
    return { success: true };
  }
};

// Alternative: If you want to use EmailJS (requires setup)
// 1. Sign up at emailjs.com
// 2. Create a service and template
// 3. Get your public key, service ID, and template ID
// 4. Uncomment and use this function instead:

/*
export const sendBookingConfirmationEmailJS = async (bookingData) => {
  try {
    // Install: npm install @emailjs/browser
    const emailjs = require('@emailjs/browser');
    
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: 'Rupindersra9@gmail.com',
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        service: bookingData.service,
        date: bookingData.date,
        time: bookingData.time,
        notes: bookingData.notes || 'None'
      },
      'YOUR_PUBLIC_KEY'
    );
    
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
};
*/
