import VerifyEmail from "./VerifyEmail.jsx";

export default VerifyEmail;

export const checkEmailVerification = async (
  token,
  setLoading,
  setError,
  setVerificationStatus
) => {
  if (!token) {
    setVerificationStatus({
      message: "Email has been unsuccessfully verified.",
    });
    setLoading(false);
    return;
  }
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/verify-email`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setVerificationStatus({
        message: "Email has been successfully verified.",
      });
    } else {
      setError("Email verificiation was unsuccessful.");
      setVerificationStatus({
        message: "Email has been unsuccessfully verified.",
      });
    }
  } catch (error) {
    console.error("Error during grab data:", error);
  } finally {
    setLoading(false);
  }
};
