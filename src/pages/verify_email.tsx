import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../services/createaccount_service";

export default function VerifyEmailScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state or localStorage
  const email = location.state?.email || 
    (() => {
      try {
        const stored = localStorage.getItem("userRegister");
        return stored ? JSON.parse(stored).user?.email || JSON.parse(stored).email : "";
      } catch {
        return "";
      }
    })();
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Start resend timer on mount
  useEffect(() => {
    setResendTimer(60);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (error) setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value && newOtp.every(digit => digit !== "")) {
      setTimeout(() => handleVerify(newOtp.join("")), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
    // Handle arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    
    setOtp(newOtp);
    
    // Focus last filled input or submit if complete
    const lastFilledIndex = pastedData.length - 1;
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else if (pastedData.length === 6) {
      setTimeout(() => handleVerify(pastedData), 100);
    }
  };

  const handleVerify = async (otpCode: string | null = null) => {
    const otpString = otpCode || otp.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await userService.verifyEmail(email, otpString);
      console.log("Verification successful:", response);

      setSuccess(true);

      await Swal.fire({
        title: "Verified!",
        text: "Your email has been successfully verified!",
        icon: "success",
        confirmButtonColor: "#dc2626",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      // Navigate to home page
      navigate("/home");

    } catch (error: any) {
      console.error("Verification failed:", error);
      setIsLoading(false);

      let errorMessage = "Verification failed. Please try again.";
      if (error.response?.status === 400) {
        errorMessage = "Invalid OTP code. Please check and try again.";
      } else if (error.response?.status === 401) {
        errorMessage = "OTP expired. Please request a new code.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      
      // Shake animation on error
      inputRefs.current.forEach(ref => {
        if (ref) {
          ref.classList.add("shake");
          setTimeout(() => ref.classList.remove("shake"), 500);
        }
      });

      await Swal.fire({
        title: "Verification Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setIsResending(true);
    setError("");

    try {
      // Note: You'll need to implement a resend OTP endpoint in your backend
      // This is a placeholder implementation
      console.log("Resending OTP to:", email);
      
      // If you have a resend endpoint, call it here:
      // await userService.resendOTP(email);
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await Swal.fire({
        title: "Code Sent!",
        text: "A new verification code has been sent to your email.",
        icon: "success",
        confirmButtonColor: "#dc2626",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      
    } catch (error: any) {
      console.error("Resend failed:", error);
      
      const errorMessage = error.response?.data?.message || "Failed to resend OTP. Please try again.";
      setError(errorMessage);
      
      await Swal.fire({
        title: "Resend Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes success-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .success-pulse {
          animation: success-pulse 0.5s ease-in-out;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-in {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>

      <div className="w-full max-w-2xl slide-in">
        <div
          className="rounded-t-3xl p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
          }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              {success ? (
                <svg className="w-12 h-12 text-green-500 success-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">
            {success ? "Verified!" : "Verify Email"}
          </h1>
          <p className="text-red-100 text-lg">
            {success 
              ? "Your email has been successfully verified"
              : "We've sent a 6-digit code to"
            }
          </p>
          {!success && email && (
            <p className="text-white font-semibold text-lg mt-2 break-all px-4">{email}</p>
          )}
        </div>

        <div className="bg-white shadow-2xl rounded-b-3xl p-12 border-x border-b border-red-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg slide-in">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-center">{error}</p>
              </div>
            </div>
          )}

          {success ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <svg className="w-24 h-24 text-green-500 mx-auto success-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h2>
              <p className="text-gray-600">Redirecting you to home...</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-4 text-center">
                  Enter Verification Code
                </label>
                <div className="flex justify-center gap-3 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isLoading || success}
                      className="w-14 h-16 text-center text-2xl font-bold border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500 transition-all bg-gray-50 disabled:opacity-50"
                      style={{
                        boxShadow: digit ? "0 0 0 2px rgba(220, 38, 38, 0.2)" : "none"
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleVerify()}
                disabled={isLoading || otp.some(digit => !digit)}
                className="w-full text-white font-semibold py-4 text-lg rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  "Verify Email"
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-600 text-base mb-3">
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || isResending}
                  className="text-red-600 hover:text-red-700 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center"
                >
                  {isResending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : resendTimer > 0 ? (
                    `Resend Code (${resendTimer}s)`
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Resend Code
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-base">
                  Wrong email?{" "}
                  <button
                    onClick={() => navigate(-1)}
                    className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                  >
                    Go back
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}