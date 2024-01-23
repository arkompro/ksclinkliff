import liff from "@line/liff";
import { ref } from "vue";

const useLiff = (liffId = "2001224965-MWO8elkk") => {
  const error = ref();
  const liffInstance = ref();
  liff
    .init({ liffId: liffId })
    .then(() => {
      liffInstance.value = liff;
      error.value = null;
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
      }
    })
    .catch((err) => (error.value = err));

  return { liff: liffInstance, error };
};

export default useLiff;