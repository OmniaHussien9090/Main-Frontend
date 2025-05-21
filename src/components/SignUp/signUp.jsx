import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "./assets/background.png";
import secondBackground from "./assets/firstBackground.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./assets/auth.css";
import { Registration } from "../../servicesAuth/authService";
import { useTranslation } from "react-i18next";

function SignUp() {
  const { t } = useTranslation("signup");

  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: { en: "", ar: "" },
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.object().shape({
        en: Yup.string().required(t("validation.name_required")),
        ar: Yup.string().required(t("validation.name_ar_required")),
      }),
      email: Yup.string()
        .email(t("validation.email_invalid"))
        .required(t("validation.email_required")),
      password: Yup.string()
        .min(8, t("validation.password_min"))
        .matches(/[A-Z]/, t("validation.password_upper"))
        .matches(/[a-z]/, t("validation.password_lower"))
        .matches(/[0-9]/, t("validation.password_number"))
        .matches(/[@$!%*?&]/, t("validation.password_special"))
        .required(t("validation.password_required")),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await Registration(values);
        setSuccessMessage(t("success_registration"));
        setErrorMessage(null);
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        const message = error?.response?.data?.message;
        setErrorMessage(
          typeof message === "string"
            ? message
            : typeof message === "object"
            ? JSON.stringify(message)
            : t("error_registration")
        );
        setSuccessMessage(null);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="no-scrollbar overflow-hidden"
    >
      <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
        {/* Background for mobile */}
        <div className="relative w-full md:w-2/3 flex items-center justify-center min-h-screen md:h-screen overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full md:hidden"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Form Area */}
          <div className="relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-10 md:px-20 w-full max-w-full h-full overflow-y-auto">
            <h1 className="text-4xl font-bold mb-6 mt-10 md:mt-0">
              {t("title")}
            </h1>

            <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold">{t("name_en")}</p>
                <input
                  type="text"
                  name="userName.en"
                  placeholder={t("name_en")}
                  value={formik.values.userName.en}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-4 rounded-[12px]"
                />
                {formik.touched.userName?.en && formik.errors.userName?.en && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.userName.en}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold">{t("name_ar")}</p>
                <input
                  type="text"
                  name="userName.ar"
                  placeholder={t("name_ar")}
                  value={formik.values.userName.ar}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-4 rounded-[12px]"
                />
                {formik.touched.userName?.ar && formik.errors.userName?.ar && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.userName.ar}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold">{t("email")}</p>
                <input
                  type="text"
                  name="email"
                  placeholder={t("email")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-4 rounded-[12px]"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{t("password")}</p>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-sm font-semibold text-gray-600"
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
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t("password")}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-6 rounded-[12px]"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Success and Error Messages */}
              {successMessage && (
                <div
                  className="alert alert-success mb-4 transition-opacity duration-500 ease-in-out"
                  role="alert"
                  aria-live="polite"
                >
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

              {errorMessage && (
                <div
                  className="alert alert-error mb-4 transition-opacity duration-500 ease-in-out"
                  role="alert"
                  aria-live="assertive"
                >
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`btn bg-[#3A5B22] text-white w-full max-w-md mb-4 rounded-[12px] ${
                  formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {formik.isSubmitting ? t("signing_up") : t("signup_button")}
              </button>

              <div className="divider">{t("or")}</div>

              {/* Social Media Login Buttons */}
              <div className="flex w-full max-w-md gap-4 mb-4">
                <button className="flex-1 btn bg-white text-black border-[#e5e5e5] h-12">
                  {t("login_google")}
                </button>
                <button className="flex-1 btn bg-black text-white border-black h-12">
                  {t("login_apple")}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="w-full flex justify-center mb-10 md:mb-0 mt-10">
                <p className="font-sans font-bold text-sm text-center px-10">
                  {t("already_account")}{" "}
                  <button
                    onClick={handleSignIn}
                    className="text-blue-600 underline hover:text-blue-800"
                    type="button"
                  >
                    {t("sign_in")}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Background for larger screens */}
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

export default SignUp;
