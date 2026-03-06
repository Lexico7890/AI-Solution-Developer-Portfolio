import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { identifier, email, message } = req.body;

        if (!identifier || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'oscaralexander2626@gmail.com', // Must be verified in Resend when on a free tier
            subject: `New Neural_Link from ${identifier}`,
            text: `Identifier Name: ${identifier}\nComms Frequency Email: ${email}\n\nTransmission Content:\n${message}`,
        });

        if (data.error) {
            console.error('Resend error:', data.error);
            return res.status(400).json({ error: data.error });
        }

        return res.status(200).json({ success: true, data: data.data });
    } catch (error) {
        console.error('API /api/contact error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
