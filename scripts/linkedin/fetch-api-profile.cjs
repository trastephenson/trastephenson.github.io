async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body = {};

  if (text) {
    try {
      body = JSON.parse(text);
    } catch (error) {
      body = { raw: text };
    }
  }

  if (!response.ok) {
    const detail = body.error_description || body.message || body.raw || response.statusText;
    throw new Error(`LinkedIn API request failed (${response.status}): ${detail}`);
  }

  return body;
}

async function getAccessToken(env = process.env) {
  if (env.LINKEDIN_ACCESS_TOKEN) {
    return env.LINKEDIN_ACCESS_TOKEN;
  }

  const required = ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET', 'LINKEDIN_REFRESH_TOKEN'];
  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing LinkedIn API credentials: ${missing.join(', ')}`);
  }

  const form = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: env.LINKEDIN_REFRESH_TOKEN,
    client_id: env.LINKEDIN_CLIENT_ID,
    client_secret: env.LINKEDIN_CLIENT_SECRET,
  });

  const tokenResponse = await fetchJson('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });

  if (!tokenResponse.access_token) {
    throw new Error('LinkedIn token refresh did not return an access token.');
  }

  return tokenResponse.access_token;
}

async function fetchLinkedInApiProfile(env = process.env) {
  const accessToken = await getAccessToken(env);
  const projection = '(id,localizedFirstName,localizedLastName,localizedHeadline,vanityName)';

  return fetchJson(`https://api.linkedin.com/v2/me?projection=${encodeURIComponent(projection)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
    },
  });
}

if (require.main === module) {
  fetchLinkedInApiProfile()
    .then((profile) => {
      process.stdout.write(`${JSON.stringify(profile, null, 2)}\n`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = {
  fetchLinkedInApiProfile,
  getAccessToken,
};
