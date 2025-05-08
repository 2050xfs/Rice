// src/services/bookingService.ts
'use server'; // Mark this module for server-side execution

const webhookUrl = 'https://services.leadconnectorhq.com/hooks/iAR0shcsJ7fDRLUy9mAx/webhook-trigger/5b5b441d-3699-43a3-b039-117ec5c79911';
// Keep as internal constant, not exported
const redirectUrl = 'https://ricentertainmentlogin.com/request_information.asp?djidnumber=23220';

export interface BookingFormData {
  name: string;
  email: string;
  eventDate: string; // Expecting YYYY-MM-DD format
  eventType: string;
  message?: string;
}

/**
 * Submits the booking request data to the external webhook.
 * @param data - The booking form data.
 * @returns A promise that resolves if the submission is successful, otherwise rejects.
 * @throws Will throw an error if the fetch request fails or the response status is not ok.
 */
export async function submitBookingRequest(data: BookingFormData): Promise<void> {
  console.log('Submitting booking request with data:', data); // Log data being sent

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Webhook Response Status:', response.status); // Log response status

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Webhook Response Error Body:', errorBody); // Log error body
      throw new Error(`Webhook submission failed with status: ${response.status}`);
    }

    // Optional: Log success or response body if needed
    // const responseBody = await response.text();
    // console.log('Webhook Response Success Body:', responseBody);

    console.log('Booking request submitted successfully.');
    // The redirection will happen in the component using the constant defined above.

  } catch (error) {
    console.error('Error submitting booking request:', error);
    // Re-throw the error so it can be caught by the calling component
    if (error instanceof Error) {
      throw new Error(`Failed to submit booking request: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while submitting the booking request.');
    }
  }
}

// Function to get the redirect URL if needed elsewhere (though not strictly required by current BookingFormWidget implementation)
// Exporting this async function is allowed
export async function getRedirectUrl(): Promise<string> {
    return redirectUrl;
}
