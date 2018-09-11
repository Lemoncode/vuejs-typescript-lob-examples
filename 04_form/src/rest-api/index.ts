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

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const createDefaultUser = (): User => ({
  id : 0,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  phone:  '',
  website:  '',
  company: {
    name:  '',
    catchPhrase:  '',
    bs:  '',
  },
});

export const fetchUser = (id: number): Promise<User> => {
  const promise = new Promise<User>((resolve, reject) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      // JSON responses are automatically parsed.
      resolve(response.data);
    });
  });

  return promise;
};

