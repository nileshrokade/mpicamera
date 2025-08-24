export default function StreamPlayback() {
  return (
   <div className="flex justify-center items-center w-full h-full bg-black">
      <img
        src="http://localhost:8080/api/stream"
        alt="Camera Stream"
        className="rounded-2xl shadow-lg max-h-[90vh] max-w-full object-contain"
      />
    </div>
  );
}
