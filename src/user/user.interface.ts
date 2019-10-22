interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  tokens: string[];
  generateAuthTokenAndSave: () => Promise<string>;
}

export default User;
