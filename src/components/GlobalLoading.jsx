const GlobalLoading = () => {
  return (
    <div className="hv-100 w-full flex justify-center items-center absolute left-0 top-0 z-10 bg-gray-500 opacity-80 h-svh">
      <span className="loading loading-infinity text-primary loading-lg"></span>
      <span className="loading loading-infinity loading-lg text-secondary"></span>
      <span className="loading loading-infinity loading-lg text-primary"></span>
      <span className="loading loading-infinity loading-lg text-secondary"></span>
    </div>
  );
};
export default GlobalLoading