export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (vite assets)
     */
    "/((?!api|assets|_next|favicon.ico).*)",
  ],
};

export default function middleware(request: Request) {
  const userAgent = request.headers.get("user-agent") || "";
  const bots = [
    "bot",
    "facebookexternalhit",
    "twitterbot",
    "linkedinbot",
    "whatsapp",
    "slackbot",
    "discordbot",
  ];

  const isBot = bots.some((bot) => userAgent.toLowerCase().includes(bot));

  if (isBot) {
    const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta property="og:url" content="https://padeyecalculatortest.vercel.app/" />
    <meta property="og:title" content="Padeye Calculator" />
    <meta property="og:description" content="Calculate and verify padeye designs seamlessly." />
    <meta property="og:image" content="https://padeyecalculatortest.vercel.app/api/og" />
    <meta property="og:type" content="website" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Padeye Calculator" />
    <meta name="twitter:description" content="Calculate and verify padeye designs seamlessly." />
    <meta name="twitter:image" content="https://padeyecalculatortest.vercel.app/api/og" />
    <title>Padeye Calculator</title>
  </head>
  <body>
    <h1>Padeye Calculator</h1>
    <p>Calculate and verify padeye designs seamlessly.</p>
  </body>
</html>
    `;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
