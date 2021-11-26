let API_URL = process.env.API_URL || 'https://api-dev.topdoc.ir';
let SITE_URL = process.env.SITE_URL || 'https://topdoc.ir/';
let SSR_SECRET_TOKEN = process.env.SSR_SECRET_TOKEN || 'i_am_a_token';
const RC_ENV = process.env.NEXT_PUBLIC_IS_STAGE === 'true';
const DEV_ENV = process.env.NODE_ENV === 'development';

API_URL = 'https://api.doctop.com';
SITE_URL = 'https://doctop.com/';

module.exports = {
  API_URL,
  SITE_URL,
  RC_ENV,
  DEV_ENV,
  SSR_SECRET_TOKEN,
};
