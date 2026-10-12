import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                icon: "success",
                title: "Account created!",
                text: "Your account has been created successfully.",
                confirmButtonColor: "#f97316",
              });
              navigate(-1);
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5e4da] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-orange-600 tracking-wide">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Sign up to get started with{" "}
          <span className="font-semibold">JARVIS</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              placeholder="Your full name"
            />
            {errors.name && (
              <span className="text-red-600 text-sm">Name is required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              placeholder="example@email.com"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">Email is required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              className="w-full p-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              placeholder="••••••••"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600 text-sm">
                Password is required.
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-600 text-sm">
                Must be at least 6 characters.
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-600 text-sm">
                Must be less than 20 characters.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <SocialLogin />

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
