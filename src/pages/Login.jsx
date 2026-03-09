import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EyeIcon, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../features/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading, error }= useSelector((state)=>state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const usernameRef = useRef(null);

  const togglePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username:username.trim(), 
      password:password.trim()
    }

    if (!username || !password){
      toast.error("Please enter credentials");
      return;
    }

    try {
      const user = await dispatch(loginThunk(credentials)).unwrap()
      console.log(user)
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
        toast.success("Welcome back!");
      } else {
        navigate("/products", { replace: true });
        toast.success("Welcome back!");
      }
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      console.log("Login flow executed");
    }
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // if (isLoading==="loading") return <Loader />;
  // if (error) return <Error message={error.message} />;

  return (
    <div className="min-h-screen grid grid-cols-1 bg-custom-white md:grid-cols-2">
      {/* Left */}
      <div className="relative flex items-center justify-center md:mt-12 px-10">
        <div className="absolute items-center text-center top-15 md:top-15">
          <div className="flex items-center text-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10" />

            <h1 className="text-4xl text-primary font-bold tracking-wide">
              FAKE STORE
            </h1>
          </div>

          <p className="mt-2 tracking-wide text-custom-wine text-center font-medium">
            India's biggest and trusted clothing store
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl p-8 bg-custom-bg shadow-lg">
          <h1 className="text-primary font-bold tracking-wide text-center text-xl mb-6">
            LOGIN
          </h1>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="text-gray-600 font-medium text-sm"
            >
              Username:
            </label>

            <input
              ref={usernameRef}
              value={username}
              type="text"
              className="w-full p-2 mt-1 mb-4 rounded-md placeholder:text-custom-gray font-medium text-sm  bg-white"
              placeholder="Enter username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label
              htmlFor="password"
              className="text-gray-600 font-medium text-sm"
            >
              Password:
            </label>

            <div className="relative items-center text-center">
              <input
                value={password}
                type={isVisible ? "text" : "password"}
                className="w-full p-2 pr-10 mt-1 mb-4 rounded-md placeholder:text-custom-gray font-medium text-sm bg-white"
                placeholder="Enter password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={togglePassword}
                className="absolute right-3 mt-5.5 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {isVisible ? <EyeOff size={16} /> : <EyeIcon size={16} />}
              </span>
            </div>

            <button
              disabled={isLoading === "loading"}
              type="submit"
              className="w-full bg-primary hover:bg-custom-wine text-custom-bg font-medium rounded-2xl text-sm p-3 mt-1 mb-4 "
            >
              Login
            </button>

            <div>
              <p>
                johnd - m38rmF$ <br />
                mor_2314 - 83r5^_{" "}
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right */}
      <div className="hidden md:flex items-center justify-center">
        <img src="/login.svg" alt="login" className="max-w-2xl" />
      </div>
    </div>
  );
};

export default Login;
