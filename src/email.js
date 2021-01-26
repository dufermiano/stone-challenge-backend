var axios = require('axios');

var config = {
  method: 'post',
  url: `https://api.elasticemail.com/v2/email/send?apikey=4B96FCE2EE9BE5A924027D397019B7B866AD1E95AB5A7178EDB0C1E9166DB429A0787A447A544EBE3AD2F20E5918D77F&subject=Recuperação de senha&from=dufermiano43@gmail.com&fromName=Marvel App&sender=Edu&to=dufermiano43@gmail.com&bodyText=Recupere sua senha`,
  headers: {},
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
