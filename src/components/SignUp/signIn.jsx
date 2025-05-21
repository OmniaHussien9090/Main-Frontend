import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "./assets/background.png";
import secondBackground from "./assets/firstBackground.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Login } from "../../servicesAuth/authService";
import { useAuth } from "../../contextAuth/AuthContext";
import { useTranslation } from "react-i18next";

function SignIn() {
  const { t } = useTranslation("signin");

  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
      password: Yup.string().required(t("passwordRequired")),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const result = await Login(values);
        if (result.token) {
          login(result);
          navigate("/");
        }
        setSuccessMessage(t("successLogin"));
        setErrorMessage(null);
        resetForm();
      } catch (error) {
        const msg =
          error?.response?.data?.message || error?.message || t("errorLogin");

        if (msg.toLowerCase().includes("confirm your email")) {
          setErrorMessage(t("pleaseVerifyEmail"));
        } else {
          setErrorMessage(msg);
        }
        setSuccessMessage(null);
      } finally {
        setSubmitting(false);
      }

      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="no-scrollbar overflow-hidden"
    >
      <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
        {/* Left side - Form + background on mobile */}
        <div className="relative w-full md:w-2/3 flex items-center justify-center min-h-screen md:h-screen overflow-hidden">
          {/* Background on small screens */}
          <div
            className="absolute inset-0 w-full h-full md:hidden"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Form */}
          <div className="relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-20 w-full max-w-full h-full overflow-y-auto">
            <h1 className="text-4xl font-bold mb-6 mt-10 md:mt-0">
              {t("welcomeBack")}
            </h1>
            <p className="mb-6">{t("enterCredentials")}</p>

            <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold">
                  {t("emailAddress")}
                </p>
                <input
                  type="text"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-2 rounded-[12px]"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Field with show/hide and forget password */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2 relative">
                  <p className="text-sm font-semibold">{t("password")}</p>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => navigate("/forgetpassword")}
                      className="text-sm font-semibold text-blue-600 cursor-pointer"
                    >
                      {t("forgetPassword")}
                    </button>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-sm font-semibold text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.961 9.961 0 011.65-5.625M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("passwordPlaceholder")}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full rounded-[12px]"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                  className="checkbox"
                />
                <label className="ml-2 text-sm">{t("rememberMe")}</label>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success mb-4 transition-opacity duration-500 ease-in-out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-error mb-4 transition-opacity duration-500 ease-in-out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12A9 9 0 1112 3a9 9 0 0112 9z"
                    />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn bg-[#3A5B22] text-white w-full max-w-md mb-4 rounded-[12px]"
              >
                {formik.isSubmitting ? t("signingIn") : t("signIn")}
              </button>

              <div className="divider">{t("or")}</div>

              <div className="flex w-full max-w-md gap-4 mb-4">
                <button className="flex-1 btn bg-white text-black border-[#e5e5e5] h-12">
                  {t("loginWithGoogle")}
                </button>
                <button className="flex-1 btn bg-black text-white border-black h-12">
                  {t("loginWithApple")}
                </button>
              </div>

              <div className="w-full flex justify-center mb-10 md:mb-0 mt-10">
                <p className="font-sans font-bold text-sm text-center px-10">
                  {t("dontHaveAccount")}{" "}
                  <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={handleSignUp}
                    type="button"
                  >
                    {t("signUp")}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - صورة تظهر فقط في الشاشات الكبيرة */}
        <div className="hidden md:block w-full md:w-2/2 h-full">
          <img
            src={secondBackground}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SignIn;
