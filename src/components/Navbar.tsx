import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/">My SOCIAL</Link>
        </div>
        <div className={styles.profile} onClick={toggleDropdown}>
          <img
            src="/profile.png"
            alt="Profile"
            className={styles.profileImage}
          />
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
