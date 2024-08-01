import React from "react";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDialog } from "@/components/DialogHelpers";
import { unixToDateTime } from "@/utils/unixToDateTime";
import { parseJwt } from "@/utils/parse-jwt";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const router = useRouter();
  const { showDialog, DialogComponent, hideDialog } = useDialog();

  async function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    if (response.ok) {
      const token = (await response.json()).token
      const json = parseJwt(token)
      Cookies.set('token', token, {expires: unixToDateTime(json.exp).date})

      showDialog('Login Success', 'You have successfully logged in.', () => {
         hideDialog();
         router.push("/");
      });
    } else {
      // Handle errors
      showDialog('Login Failed', 'Invalid email or password. Please try again.', () => {
         hideDialog();
      });
    }
  }
  return (
    <>
      <DialogComponent />
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>ลงชื่อเข้าใช้</h2>
          <p className={styles.subtitle}>
            เพื่อทดสอบระบบกรุณาลงชื่อเข้าใช้งานหรือลงทะเบียน
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="อีเมลหรือโทรศัพท์"
              className={styles.input}
              required
            />
            <div className={styles.passwordWrapper}>
              <input
                type="password"
                name="password"
                placeholder="รหัสผ่าน"
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              ลงชื่อเข้าใช้
            </button>
          </form>
          <div className={styles.or}>หรือ</div>
          <Link href={`/signup`}>
            <button className={`${styles.socialButton} ${styles.googleButton}`}>
              ลงทะเบียนเพื่อใช้งาน
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
