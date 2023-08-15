import { Box, styled, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LeftBar from "./component/LeftBar";
import NavBar from "./component/NavBar";
import { AuthContext } from "./context/AuthContext";
import { DarkThemeContext } from "./context/DarkThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { DarkTheme, LightTheme } from "./theme/theme";
import Search from "./pages/Search";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkThemeContext);

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Root>
          <NavBar />
          <Box sx={{ display: "flex", height: "92.5vh" }}>
            <LeftBar />
            <Box sx={{ flex: "6" }}>
              <Outlet />
            </Box>
            {/* <RightBar /> */}
          </Box>
        </Root>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };
  return (
    <>
      <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/search/:username" element={<Search />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
const Root = styled(Box)(({ theme }) => ({
  height: "100vh",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
}));
