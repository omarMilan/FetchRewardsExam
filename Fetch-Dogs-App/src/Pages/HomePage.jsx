import pic1 from "../assets/HomePic1.jpg";
import pic2 from "../assets/HomePic2.png";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-[440px] max-md:h-[320px] max-lg:h-[340px] max-xl:h-[440px]">
        <img
          src={pic1}
          className="h-full w-full object-cover object-top"
          alt="Dog Image"
        />

        {/* Text Overlay Inside Image */}
        <div className="absolute top-[100px] right-6 transform -translate-y-1/2 text-white text-right bg-opacity-50 px-4 py-2 rounded">
          <h2 className="text-[36px] max-md:text-[30px] max-lg:text-[36px] max-xl:text-[36px] font-semibold">
            A Loyal Companion
          </h2>
          <h2 className="text-[36px] max-md:text-[30px] max-lg:text-[36px] max-xl:text-[36px] font-semibold">
            Awaits You!
          </h2>
          <div className="text-[14px] max-md:text-[16px] max-lg:text-[18px] max-xl:text-[20px] text-primary bg-white px-2 py-2 w-fit align-super ml-auto font-semibold mt-5 rounded-[6px]">
            Get Started!
          </div>
        </div>
      </div>

      {/* Colored Sections Filling the Remaining Screen Height */}
      <div className="flex flex-row flex-grow">
        <div className="w-full flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 lg:px-20 xl:px-32 py-8 bg-gray-100">
          <div className="w-full h-full max-w-screen-md sm:max-w-screen-lg md:max-w-screen-xl text-center">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Our Story
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-4">
              Owned & Operated by True Dog Lovers
            </p>

            {/* Main Paragraph */}
            <p className="text-md sm:text-xs md:text-md min-lg:text-lg text-gray-600 mt-6 leading-relaxed max-w-3xl mx-auto">
              At{" "}
              <span className="font-semibold text-gray-900">PetShop Inc.</span>,
              we are dedicated to helping every brave, goofy, and lovable dog
              find their forever home. What began as a small neighborhood
              initiative has evolved into a nationwide effort to connect dog
              lovers with their perfect companions. Whether you're searching for
              a playful friend or a loyal partner, we are here to help you find
              the right match!
            </p>

            {/* Call-to-Action Button */}
            <button className="mt-8 sm:mt-2 lg:mt-2 cursor-pointer bg-gray-900 text-white px-6 py-3 rounded-lg text-md sm:text-xs font-medium transition-transform transform hover:scale-105 hover:bg-gray-800">
              Get Started
            </button>
          </div>
        </div>

        <img
          src={pic2}
          className="w-[50%] object-cover flex-grow bg-green-400"
        />
      </div>
    </div>
  );
}
