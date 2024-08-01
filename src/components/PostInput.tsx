import React, { useState } from "react";
import styles from "../styles/PostInput.module.css";
import Cookies from "js-cookie";
import { parseJwt } from "@/utils/parse-jwt";
import { useRouter } from "next/router";
import { useDialog } from "./DialogHelpers";

type PostInputProps = {
    refetch(): Promise<void>
  };
  

const PostInput: React.FC<PostInputProps> = ({refetch}) => {
  const router = useRouter();
  const { showDialog, DialogComponent, hideDialog } = useDialog();
  const [content, setContent] = useState("");
  
  async function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) {
    event.preventDefault();

    // const formData = new FormData(event.currentTarget);
    const title = content
    // const content = formData.get("content");
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const json = parseJwt(token || "");
    const author = json.username;

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author }),
      credentials: "same-origin",
    });

    if (response.ok) {
        showDialog('Post Success', 'You have successfully post your content.', () => {
           hideDialog();
           setContent("")
           refetch();
        });
      } else {
        // Handle errors
        showDialog('Post Failed', 'Please try again.', () => {
           hideDialog();
        });
      }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <img
            src="/profile.png"
            alt="Profile"
            className={styles.profileImage}
          />
          <input
            type="text"
            name="content"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            required
            placeholder="Start a post, try writing with AI"
            className={styles.inputField}
          />
        </div>
        <div className={styles.actions}>
          <div className={styles.actionItem}>
            <button className={styles.postButton} type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
      <DialogComponent />
    </div>
  );
};

export default PostInput;
