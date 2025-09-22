import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/Context";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const imgbbAPI = import.meta.env.VITE_IMGBB_KEY;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.picture[0]);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        formData
      );
      const imgURL = imgRes.data.data.url;
      const userCredential = await createUser(data.email, data.password);
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        picture: imgURL,
        role: "user",
      };

      await axios.post("https://bhojon-server.vercel.app/api/register", userData);
      Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        text: "You can now login to your account!",
      });

      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl border">
        <h2 className="text-3xl font-semibold text-center text-[#c09342] mb-2">
          Register
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your details below to create an account.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 text-[#000] rounded-md bg-gray-100 focus:outline-none"
            />
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 text-[#000] rounded-md bg-gray-100 focus:outline-none"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              placeholder="Phone"
              {...register("phone")}
              className="w-full px-4 py-2 text-[#000] rounded-md bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full px-4 py-2 text-[#000] rounded-md bg-gray-100 focus:outline-none"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Password must be at least 6 characters</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Picture</label>
            <input
              type="file"
              {...register("picture", { required: true })}
              className="w-full px-4 py-[6px] text-[#000] rounded-md bg-gray-100 focus:outline-none"
            />
            {errors.picture && <span className="text-red-500 text-sm">Picture is required</span>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <textarea
              placeholder="Address"
              rows="1"
              {...register("address")}
              className="w-full px-4 py-2 rounded-md text-[#000] bg-gray-100 focus:outline-none"
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-4 flex items-center justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#c09342] text-white px-20 py-2 rounded-md hover:bg-[#a57c34] transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <span className="text-gray-600">OR</span>
            <NavLink to='/login'>
              <button className="bg-blue-600 text-white px-20 py-2 rounded-md hover:bg-blue-700 transition">
                Login
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
