import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate('/');
      });
    });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2"></div>

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full mt-2 flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg shadow-sm bg-white hover:bg-orange-50 hover:border-orange-400 transition duration-200"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google Logo"
          className="h-5 w-5"
        />
        <span className="text-sm font-medium text-gray-700">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
