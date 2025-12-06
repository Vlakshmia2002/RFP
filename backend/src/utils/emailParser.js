const { simpleParser } = require('mailparser');

async function parseRawEmail(raw) {
  // raw is Buffer or string
  const parsed = await simpleParser(raw);
  return {
    subject: parsed.subject,
    from: parsed.from?.text,
    to: parsed.to?.text,
    date: parsed.date,
    text: parsed.text,
    html: parsed.html
  };
}

module.exports = { parseRawEmail };
