import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/Context";

const Login = () => {
  const { signIn, forgetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Login function
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signIn(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back ${userCredential.user.email}`,
      });

      reset();
      navigate("/"); 
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Forget password function
  const handleForgetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Enter your email",
      input: "email",
      inputLabel: "Email address",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
    });

    if (email) {
      try {
        await forgetPassword(email);
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Password reset email sent successfully!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    }
  };

  return (
    <div className="min-h-screen mt-5 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md border">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-[#c09342] mb-2">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          If you have shopped with us before, please enter your details in the boxes below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 text-[#000] border rounded-md bg-gray-100 focus:outline-none"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full px-4 py-2 text-[#000] border rounded-md bg-gray-100 focus:outline-none"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-gray-700">Remember Me</span>
            </label>
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-blue-600 hover:underline"
            >
              Forgot Password
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c09342] text-white py-2 rounded-md hover:bg-[#a57c34] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* OR */}
          <div className="text-center text-gray-600">OR</div>

          {/* Facebook Login */}
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Facebook Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-700 mt-6">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-600 hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
