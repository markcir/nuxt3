// server/api/login.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  
  const { login, password } = query; 
  
  const validLogin = "admin";
  const validPassword = "password";

  if (login === validLogin && password === validPassword) {
    const token = btoa(`${login}_${password}`);
    return {
      token,
    };
  } else {
    return { token: null };
  }
});
