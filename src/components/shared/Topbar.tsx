import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useTheme } from "../theme-provider";
import { ModeToggle } from "../mode-toggle";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  // Function to determine time-based theme
  const getTimeBasedTheme = () => {
    const hours = new Date().getHours();
    return hours >= 6 && hours < 18 ? "light" : "dark"; // 6AM - 6PM: Light | 6PM - 6AM: Dark
  };

  useEffect(() => {
    if (theme === "system") {
      setCurrentTheme(getTimeBasedTheme()); // Update the theme based on time
    } else {
      setCurrentTheme(theme);
    }
  }, [theme]);

 // Dynamically set logo based on theme
 const logoSrc =
 currentTheme === "dark"
   ? "/assets/images/logo.svg"
   : "/assets/images/blacklogo.svg";

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={logoSrc}
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
};

export default Topbar;
