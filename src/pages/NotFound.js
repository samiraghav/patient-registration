const NotFound = () => {
  return (
    <div className="min-h-[40vh] flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-semibold text-blue-600 leading-8 text-lg">404</h1>
        <h2 className="mt-4 font-bold sm:text-5xl text-3xl text-gray-900 tracking-tight">This page does not exist</h2>
        <p className="text-gray-600 leading-7 mt-4 sm:leading-8 sm:mt-6 sm:text-lg text-base">Sorry, we couldn’t find the page you’re looking for.</p>
      </main>
    </div>
  );
};

export default NotFound;
