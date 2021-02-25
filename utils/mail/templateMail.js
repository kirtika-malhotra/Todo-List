const config = require('config');
const clientOrigin = config.get('clientOrigin');

const confirm = (id) => ({
  subject: 'Confirmation Link',
  html: `
      <a href='${clientOrigin}/confirm/${id}'>
        Click here to verify your Email!
      </a>
    `,
  text: `Copy and paste this link: ${clientOrigin}/confirm/${id}`,
});

const forgot = (id) => ({
  subject: 'Forgot Password?',
  html: `
    <a href='${clientOrigin}/confirm/${id}'>
      Click here to verify your Email!
    </a>
  `,
  text: `Copy and paste this link: ${clientOrigin}/confirm/${id}`,
});

export { confirm, forgot };
