import axios from 'axios';

const requests = {
  sendAuthRequest() {
    axios('auth/signin/')
    .then(() => {
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

export default requests;
