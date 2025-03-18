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
        <div className="w-full flex-grow flex flex-col px-8 h-full">
          <div className="w-full flex-grow flex flex-col items-center justify-center px-8 mt-7">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              OUR STORY
            </h2>

            {/* Subtitle */}
            <p className="text-center text-md md:text-lg lg:text-xl text-gray-700 mt-2 max-w-[600px]">
              Owned & Operated by True Dog Lovers! 🐾❤️
            </p>

            {/* Main Paragraph */}
            <p className="text-center text-sm md:text-md lg:text-lg text-gray-600 mt-4 max-w-[600px]">
              At <span className="font-bold">PetShop Inc.</span>, we’re on a
              mission to help every brave, goofy, and lovable pup find their
              forever home! 🐶✨ What started as a small neighborhood project
              has grown into a nationwide effort to connect dog lovers with
              their perfect furry friends. Whether you're looking for a playful
              companion or a loyal sidekick, we’ve got a pup just waiting to
              meet you!
            </p>

            {/* Call-to-Action Button */}
            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-lg text-md md:text-lg lg:text-xl font-semibold transition">
              Get Started!
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
