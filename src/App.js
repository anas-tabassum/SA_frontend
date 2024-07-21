import { AuthProvider } from "./store/AuthContext";
import MyRoutes from "./routes/MyRoutes";

const App = () => {
  return (
    <AuthProvider>
      <MyRoutes />
    </AuthProvider>
  );
};

export default App;
