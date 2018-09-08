import axios from 'axios';

export const fetchUsers = (): Promise<[]> => {
  const promise = new Promise<[]>((resolve, reject) => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
      // JSON responses are automatically parsed.
      resolve(response.data);
    });
  });

  return promise;
};
