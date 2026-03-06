import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'api-contact-handler',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/contact' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body);
                  const { identifier, email, message } = data;

                  if (!identifier || !email || !message) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ error: 'Missing required fields' }));
                  }

                  // Dynamically import resend to avoid Vite pre-bundling issues inside this middleware
                  const { Resend } = await import('resend');
                  const resend = new Resend(env.RESEND_API_KEY);

                  const result = await resend.emails.send({
                    from: 'Acme <onboarding@resend.dev>',
                    to: 'oscaralexander2626@gmail.com', // Must be verified email when using test mode
                    subject: `New Neural_Link from ${identifier}`,
                    text: `Identifier Name: ${identifier}\nComms Frequency Email: ${email}\n\nTransmission Content:\n${message}`,
                  });

                  if (result.error) {
                    console.error('Resend error:', result.error);
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ error: result.error }));
                  }

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: true, data: result.data }));
                } catch (e) {
                  console.error('API /api/contact error:', e);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
