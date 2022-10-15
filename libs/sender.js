const httpSender = require('superagent');

async function doSendEmailRequest(reqMessage) { 
    const url = process.env.EMAIL_SENDER_URL || 'https://email-service.digitalenvision.com.au/send-email';
    
    const modulResp = await httpSender.post(url)
        .timeout({
          response: 20000, // Wait 25s seconds for the server to start sending,
          deadline: 15000, // 15s for the file to finish loading.
        })
        .set('Content-Type', 'application/json')
        .accept('application/json')
        .redirects(2)
        .send(reqMessage)
        .catch((err) => {
          console.error(err);
        });
  
    let response ;
    if (modulResp && modulResp.text) {
      response = modulResp.text
    } else {
        response = false;
    }
    return response;
  }

  module.exports = {
    doSendEmailRequest,
  };