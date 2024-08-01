import React, { useState } from "react";
import styles from "../styles/Post.module.css";
import { useDialog } from "./DialogHelpers";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { parseJwt } from "@/utils/parse-jwt";

type PostProps = {
  id: string;
  author: string;
  content: string;
  refetch(): Promise<void>;
};

const Post: React.FC<PostProps> = ({ id, author, content, refetch }) => {
  const router = useRouter();
  const { showDialog, DialogComponent, hideDialog } = useDialog();
  const [edit, setEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);

  async function handleEdit(event: any) {
    event.preventDefault();

    const title = newContent
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content: newContent, author }),
      credentials: "same-origin",
    });

    if (response.ok) {
        showDialog('Edit Post Success', 'You have successfully edit your content.', () => {
           hideDialog();
           refetch();
           setEdit(false)
        });
      } else {
        // Handle errors
        showDialog('Edit Post Failed', 'Please try again.', () => {
           hideDialog();
        });
      }
  }

  async function handleDelete(event: any) {
    event.preventDefault();

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });

    if (response.ok) {
      showDialog(
        "Delete Post Success",
        "You have successfully delete your content.",
        () => {
          hideDialog();
          refetch();
        }
      );
    } else {
      // Handle errors
      showDialog("Delete Post Failed", "Please try again.", () => {
        hideDialog();
      });
    }
  }

  return (
    <div className={styles.container}>
      {edit ? (
        <form onSubmit={handleEdit}>
          <div className={styles.header}>
            <img
              src="/profile.png"
              alt="Profile"
              className={styles.profileImage}
            />
            <div className={styles.userInfo}>
              <div className={styles.name}>{author}</div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="newContent"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
              placeholder="Start a post, try writing with AI"
              className={styles.inputField}
            />
          </div>
          <div className={styles.actions}>
            <div className={styles.actionItem}>
              <button className={styles.cancelButton} onClick={() => setEdit(false)}>
                Cancel
              </button>
              <button className={styles.confirmButton} type="submit">
                Confirm
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.header}>
            <img
              src="/profile.png"
              alt="Profile"
              className={styles.profileImage}
            />
            <div className={styles.userInfo}>
              <div className={styles.name}>{author}</div>
            </div>
          </div>
          <div className={styles.content}>
            <p>{content}</p>
          </div>
          <div className={styles.actions}>
            <div className={styles.actionItem}>
              <button
                className={styles.editButton}
                onClick={() => setEdit(true)}
                type="button"
              >
                Edit
              </button>
            </div>
            <div className={styles.actionItem}>
              <button
                className={styles.deleteButton}
                onClick={(e) => handleDelete(e)}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      <DialogComponent />
    </div>
  );
};

export default Post;
