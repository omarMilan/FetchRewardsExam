import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "../assets/Logo.jpg";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [transitioning, setTransitioning] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);

  const pageTitles = {
    "/": "Home 🐶",
    "/match-me": "Match Me 🐶",
    "/favorites": "Favorites 🐶",
    "/login": "Login 🐶",
  };

  // ✅ Check if user is logged in by attempting to fetch protected data
  const checkAuth = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]);

  const handleNavigationWithAnimation = (route) => {
    if (!isLoggedIn && (route === "/match-me" || route === "/favorites")) {
      route = "/login";
    }

    setNextRoute(route);
    setTransitioning(true);

    setTimeout(() => {
      navigate(route);
      setTransitioning(false);
    }, 1300);
  };

  // ✅ Handle logout properly
  const handleLogout = async () => {
    try {
      await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {transitioning && (
          <>
            <motion.div
              className="fixed inset-0 flex justify-center items-center z-[1000] text-white text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
            >
              {pageTitles[nextRoute] || "Loading..."}
            </motion.div>

            <motion.div
              className="fixed bottom-[-50vh] left-1/2 bg-gray-900 rounded-full z-[999]"
              initial={{ width: 0, height: 0, translateX: "-50%", opacity: 1 }}
              animate={{ width: "400vh", height: "400vh", translateY: "50vh" }}
              exit={{ width: 0, height: 0, translateY: "100vh", opacity: 0 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="w-screen h-[93px] flex items-center justify-between px-6">
        <motion.img
          src={Logo}
          className="h-full w-auto select-none cursor-pointer"
          onClick={() => handleNavigationWithAnimation("/")}
          initial={{ rotate: "0deg", scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ rotate: "180deg" }}
          exit={{ rotate: "0deg", scale: 0 }}
          transition={{ duration: 1, type: "spring", ease: "backInOut" }}
        />
        <div className="mr-auto z-10 text-gray-900 font-semibold">
          PetShop Inc.{" "}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-lg font-regular text-[16px] font-medium text-primary">
          {Object.keys(pageTitles).map((route) => (
            <div
              key={route}
              className={`cursor-pointer relative transition-opacity duration-300 
                ${
                  location.pathname === route
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-100"
                }
                after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] 
                after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 
                hover:after:scale-x-100`}
              onClick={() => handleNavigationWithAnimation(route)}
            >
              {pageTitles[route].replace(" 🐶", "")}
            </div>
          ))}
        </div>

        {isLoggedIn ? (
          <button
            className="text-[16px] bg-red-500 text-white px-6 py-2 rounded-[3px] cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-[16px] bg-primary text-white px-6 py-2 rounded-[3px] cursor-pointer"
            onClick={() => handleNavigationWithAnimation("/login")}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
}
