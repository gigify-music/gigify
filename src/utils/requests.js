import axios from 'axios';

let requests = {
  sendAuthRequest() {
    axios(`auth/signin/`)
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

export default requests;
