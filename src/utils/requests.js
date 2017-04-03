import axios from 'axios';

let requests = {
  sendAuthRequest() {
    axios(`auth/signin/`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

export default requests;
