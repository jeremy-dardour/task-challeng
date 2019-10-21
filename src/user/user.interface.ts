interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  tokens: string[];
  generateAuthToken: () => Promise<string>;
}

export default User;
