import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[40vh] flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-semibold text-blue-600 leading-8 text-lg">404</h1>
        <h2 className="mt-4 font-bold sm:text-5xl text-3xl text-gray-900 tracking-tight">This page does not exist</h2>
        <p className="text-gray-600 leading-7 mt-4 sm:leading-8 sm:mt-6 sm:text-lg text-base">Sorry, we couldn’t find the page you’re looking for.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1E40AF] text-white font-medium transition"
        >
          Go back to Home
        </button>
      </main>
    </div>
  );
};

export default NotFound;
