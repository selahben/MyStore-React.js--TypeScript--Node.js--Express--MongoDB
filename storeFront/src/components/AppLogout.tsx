import { useEffect } from "react";
import { useStoreContext } from "../context/store.context";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

type AppLogoutProps = {
  children: JSX.Element;
};

const AppLogout = ({ children }: AppLogoutProps) => {
  const { signedIn, handleSignOut } = useStoreContext();

  let timer: ReturnType<typeof setTimeout>;

  // when component mounts, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
  // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
  useEffect(() => {
    if (signedIn?.email) {
      Object.values(events).forEach((item) => {
        window.addEventListener(item, () => {
          resetTimer();
          handleLogoutTimer();
        });
      });
    }
  }, [signedIn]);

  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      logoutAction();
    }, 4 * 60 * 60 * 1000); // 4 hours * 60 minutes * 60 seconds * 1000 ms = 4 hours.
  };

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  // logs out user
  const logoutAction = () => {
    handleSignOut(" due to inactivity");
  };

  return children;
};
export default AppLogout;
