import React from 'react';
import { motion } from "framer-motion";
import background from "./assets/background.png";

function ForgetPass() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen overflow-hidden"
    >
        <div className="absolute inset-0 flex items-center justify-center">
  <img
    src={background}
    alt="Background"
    className="max-w-full max-h-full object-cover w-screen h-screen"
  />
</div>


      {/* ===== Form Content ===== */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Forget Password</h2>

          <form className="space-y-4">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text text-sm font-medium">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn bg-[#3A5B22] text-white w-full"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default ForgetPass;
