"use client";

const WaitlistForm: React.FC = () => {
  const handleLogin = async () => {
    window.location.href = `/api/auth`;
  };

  return (
    <section
      id="waitlist"
      className="bg-white py-20">
      <div className="container mx-auto text-center">
        <button
          type="submit"
          className="w-1/2 bg-blue-600 text-white p-3 rounded-full font-semibold transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            handleLogin();
          }}>
          Login with Google
        </button>
      </div>
    </section>
  );
};

export default WaitlistForm;
