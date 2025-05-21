import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bagLight from "../../assets/icons/bag.png";
import bagDark from "../../assets/icons/bag-black.png";
import { FaRegUser, FaHeart, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { SearchContext } from "../../searchContext/SearchContext.jsx";
import { Link } from "react-router-dom";

function Navbar() {
  const { t, i18n } = useTranslation("navbar");
  const cartItemsCount = useSelector((state) => state.cart.items.length);
  const wishlistCount = useSelector(
    (state) => state.wishlist?.items?.length || 0
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [userName, setUserName] = useState(null);
  const searchRef = useRef(null);
  const langRef = useRef(null);

  const isHome = pathname === "/";
  const currentLang = i18n.language;

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/shop", label: t("shop") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contactus", label: t("contact") },
  ];

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const hideSearchOn = ["/shop", "/contactus", "/blog"];
  const shouldHideSearchIcon = hideSearchOn.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef, langRef]);

  useEffect(
    () => {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsed = JSON.parse(user);
          setUserName(parsed.name || null);
        } catch {
          setUserName(null);
        }
      } else {
        setUserName(null);
      }
    },
    [
      /* يمكنك إضافة متغيرات تعتمد عليها حالة تسجيل الدخول */
    ]
  );

  const navbarEffect = scrolled
    ? "backdrop-blur-md bg-white/70 shadow-md text-black"
    : isHome
    ? "text-white"
    : "text-black";

  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleUserIconClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${searchQuery}`);
      setShowSearchInput(false);
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const iconColor = scrolled || !isHome ? "text-gray-700" : "text-white";

  // تعديل دالة تغيير اللغة لتعمل كتوجل مباشر
  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarEffect}`}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="navbar justify-between px-6 py-3">
          {/* Logo */}
          <div className="navbar-start">
            <button
              className="text-2xl font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            >
              FurniITI
            </button>
          </div>

          {/* Navigation Links */}
          <div className="navbar-center">
            <ul className="menu menu-horizontal font-medium text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => navigate(link.href)}
                    className={`${
                      pathname === link.href ? "font-bold underline" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Icons */}
          <div className="navbar-end flex items-center gap-5">
            {/* Search */}
            {!shouldHideSearchIcon && (
              <div className="relative flex items-center" ref={searchRef}>
                <div
                  className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
                    showSearchInput
                      ? "w-[220px] border rounded-full bg-white/90"
                      : "w-5"
                  }`}
                >
                  {showSearchInput && (
                    <input
                      type="search"
                      className="no-scrollbar border-none px-3 py-1 text-sm w-full focus:outline-none bg-transparent text-gray-800"
                      placeholder={t("search") || "Search"}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      autoFocus
                    />
                  )}
                  <div
                    className={`${
                      showSearchInput ? "px-2" : ""
                    } min-w-[20px] flex items-center justify-center`}
                  >
                    <FaSearch
                      className={`w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer ${
                        showSearchInput ? "text-gray-700" : iconColor
                      } hover:opacity-80 transition-opacity`}
                      onClick={
                        showSearchInput ? handleSearch : toggleSearchInput
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Favorites */}
            <div className="relative flex items-center justify-center min-w-[20px] min-h-[20px]">
              <Link to="/wishlist" className="relative">
                <FaHeart
                  className={`w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer ${iconColor} hover:opacity-80 transition-opacity`}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart */}
            <div className="relative flex items-center justify-center min-w-[20px] min-h-[20px]">
              <img
                src={scrolled || !isHome ? bagDark : bagLight}
                alt="Bag"
                className="w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer"
                onClick={() => navigate("/cart")}
              />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </div>

            {/* Language */}
            <div className="relative flex items-center justify-center">
              <button
                className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs cursor-pointer border ${iconColor} hover:opacity-80 transition-opacity`}
                onClick={toggleLanguage}
                aria-label={`Switch to ${
                  currentLang === "ar" ? "English" : "Arabic"
                }`}
              >
                {currentLang === "ar" ? "EN" : "AR"}
              </button>
            </div>

            {/* User */}
            <div className="relative flex items-center justify-center min-w-[20px] min-h-[20px]">
              {userName ? (
                <span
                  className={`flex items-center gap-1 font-medium text-xs ${iconColor} cursor-pointer`}
                  onClick={handleUserIconClick}
                >
                  <FaRegUser
                    className={`w-5 h-5 min-w-[20px] min-h-[20px] ${iconColor}`}
                  />
                  {userName}
                </span>
              ) : (
                <FaRegUser
                  className={`w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer ${iconColor} hover:opacity-80 transition-opacity`}
                  onClick={handleUserIconClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Two-Row Header */}
      <div className="lg:hidden">
        {/* Top Row - Logo, Menu, and Search */}
        <div
          className={`flex items-center justify-between px-4 py-2 ${
            scrolled
              ? "bg-white/90 shadow-sm"
              : isHome
              ? "bg-transparent"
              : "bg-white/90"
          }`}
        >
          <div className="flex items-center">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${iconColor}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow rounded-box w-52 ${
                  scrolled || !isHome
                    ? "bg-white/95 text-black"
                    : "bg-black/95 text-white"
                }`}
              >
                {navLinks.map((link) => (
                  <li key={link.href} className="mb-2">
                    <button
                      onClick={() => navigate(link.href)}
                      className={`py-2 ${
                        pathname === link.href ? "font-bold" : ""
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="text-xl font-semibold cursor-pointer ml-1"
              onClick={() => navigate("/")}
            >
              FurniITI
            </button>
          </div>

          {/* Search in Top Row */}
          {!shouldHideSearchIcon && (
            <div className="relative flex items-center" ref={searchRef}>
              <div
                className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
                  showSearchInput
                    ? "w-[150px] border rounded-full bg-white/90"
                    : "w-5"
                }`}
              >
                {showSearchInput && (
                  <input
                    type="search"
                    className="no-scrollbar border-none px-3 py-1 text-sm w-full focus:outline-none bg-transparent text-gray-800"
                    placeholder={t("search") || "Search"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    autoFocus
                  />
                )}
                <div
                  className={`${
                    showSearchInput ? "px-2" : ""
                  } min-w-[20px] flex items-center justify-center`}
                >
                  <FaSearch
                    className={`w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer ${
                      showSearchInput ? "text-gray-700" : iconColor
                    } hover:opacity-80 transition-opacity`}
                    onClick={showSearchInput ? handleSearch : toggleSearchInput}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Row - Icons */}
        <div
          className={`flex items-center justify-evenly px-4 py-2 ${
            scrolled
              ? "bg-white/80 shadow-md"
              : isHome
              ? "bg-black/20"
              : "bg-white/80"
          }`}
        >
          {/* Language */}
          <div className="relative flex items-center justify-center min-w-[20px] min-h-[20px]">
            <button
              className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs cursor-pointer border ${iconColor} hover:opacity-80 transition-opacity`}
              onClick={toggleLanguage}
              aria-label={`Switch to ${
                currentLang === "ar" ? "English" : "Arabic"
              }`}
            >
              {currentLang === "ar" ? "EN" : "AR"}
            </button>
          </div>

          {/* Favorites */}
          <div className="relative flex items-center justify-center min-w-[20px] min-h-[20px]">
            <Link to="/wishlist" className="relative">
              <FaHeart
                className={`w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer ${iconColor} hover:opacity-80 transition-opacity`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* Cart */}
          <div className="relative flex items-center justify-center min-w-[20px] min-h-[20px]">
            <img
              src={scrolled || !isHome ? bagDark : bagLight}
              alt="Bag"
              className="w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </div>

          {/* User */}
          <div className="relative flex items-center justify-center min-w-[20px] min-h-[20px]">
            {userName ? (
              <span
                className={`flex items-center gap-1 font-medium text-xs ${iconColor} cursor-pointer`}
                onClick={handleUserIconClick}
              >
                <FaRegUser
                  className={`w-5 h-5 min-w-[20px] min-h-[20px] ${iconColor}`}
                />
                {userName}
              </span>
            ) : (
              <FaRegUser
                className={`w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer ${iconColor} hover:opacity-80 transition-opacity`}
                onClick={handleUserIconClick}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
