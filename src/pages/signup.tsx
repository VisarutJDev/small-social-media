import React from "react";
import Head from "next/head";
import styles from "../styles/Signup.module.css";
import Link from "next/link";
import { useDialog } from "@/components/DialogHelpers";

const Signup: React.FC = () => {
  const { showDialog, DialogComponent, hideDialog } = useDialog();

  async function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      //   router.push("/profile");
      showDialog(
        "Registration Success",
        "Your account has been successfully created.",
        () => {
          hideDialog();
        }
      );
    } else {
      // Handle errors
      showDialog(
        "Registration Failed",
        "There was an error creating your account. Please try again.",
        () => {
          hideDialog();
        }
      );
    }
  }
  return (
    <>
      <DialogComponent />
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.signupBox}>
          <h2 className={styles.title}>ลงทะเบียนเพื่อใช้งาน</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="username"
              placeholder="อีเมลหรือโทรศัพท์"
              className={styles.input}
            />
            <div className={styles.passwordWrapper}>
              <input
                type="password"
                name="password"
                placeholder="รหัสผ่าน"
                className={styles.input}
              />
            </div>
            <p className={styles.terms}>
              การคลิกดำเนินการต่อ จะถือว่าคุณยอมรับ ที่จะทดสอบระบบ และ
              <a href="#"> นโยบายคุกกี้ของ small social media</a>
            </p>
            <button className={styles.signupButton}>
              ยอมรับและเข้าร่วมทดสอบ
            </button>
          </form>
          <div className={styles.or}>หรือ</div>
          <Link href={`/login`}>
            <button className={`${styles.socialButton} ${styles.googleButton}`}>
              มีบัญชีอยู่แล้ว
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
