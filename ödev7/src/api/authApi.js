
export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const correctUsername = "210408019@st.biruni.edu.tr";
      const correctPassword = "demo123456";

      if (
        username === correctUsername &&
        password === correctPassword
      ) {
        resolve({ username });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}
