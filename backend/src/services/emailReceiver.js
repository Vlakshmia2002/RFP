// // Poll IMAP for new messages and pass to a handler that will parse and store proposals
// const imaps = require('imap-simple');
// const { parseRawEmail } = require('../utils/emailParser');

// let running = false;

// async function pollAndProcess(handleMessage) {
//   if (running) return;
//   running = true;
//   const config = {
//     imap: {
//       user: process.env.IMAP_USER,
//       password: process.env.IMAP_PASS,
//       host: process.env.IMAP_HOST,
//       port: parseInt(process.env.IMAP_PORT || '993'),
//       tls: true,
//       tlsOptions: { rejectUnauthorized: false },  // 
//       authTimeout: 30000
//     }
//   };

//   try {
//     const connection = await imaps.connect(config);
//     await connection.openBox('INBOX');

//     const searchCriteria = ['UNSEEN'];
//     const fetchOptions = { bodies: [''], markSeen: true };

//     const messages = await connection.search(searchCriteria, fetchOptions);
//     for (const item of messages) {
//       const all = item.parts.find(p => p.which === '');
//       const raw = all.body;
//       const parsed = await parseRawEmail(raw);
//       await handleMessage(parsed);
//     }

//     await connection.end();
//   } catch (e) {
//     console.error('IMAP poll error', e.message);
//   } finally {
//     running = false;
//   }
// }

// module.exports = { pollAndProcess };



const imaps = require('imap-simple');
const config = {
  imap: {
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: 993,
    tls: true,
    authTimeout: 30000
  }
};

async function startEmailReceiver(handleMessage) {
  const connection = await imaps.connect(config);

  await connection.openBox('INBOX');

  connection.on('mail', async () => {
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = { bodies: ['RFC822'], markSeen: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    for (const msg of messages) {
      const raw = msg.parts[0].body;
      const parsed = await parseRawEmail(raw);
      await handleMessage(parsed);
    }
  });
}

module.exports = { startEmailReceiver };
