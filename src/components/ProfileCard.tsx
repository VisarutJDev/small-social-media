import React from "react";
import styles from "../styles/ProfileCard.module.css";
import Link from "next/link";

type ProfileCardProps = {
  profileImage: string;
  name: string;
  title: string;
  viewers: number;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImage,
  name,
  title,
  viewers,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.title}>{title}</p>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Work experiences - </span>
            <span className={styles.infoValue}>{viewers}</span>
            <span className={styles.infoLabel}> years</span>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Proficient skills</span>
            {/* <span className={styles.infoValue}>{connections}</span> */}
            <Link href="#" className={styles.growLink}>
              Golang, JS, ReactJS, NextJS, NestJS
            </Link>
          </div>
        </div>
        <div className={styles.premium}>
          <p>Contact</p>
        </div>
        <div className={styles.premium}>
          <Link href="#" className={styles.premiumButton}>
            visarutjwork@gmail.com
          </Link>
        </div>
        <div className={styles.premium}>
          <Link
            href="https://www.linkedin.com/in/visarut-junsone-30702b182/"
            className={styles.premiumButton}
          >
            linkedin
          </Link>
        </div>
        <div className={styles.premium}>
          <p>Checkout my work</p>
        </div>
        <div className={styles.premium}>
          <Link
            href="https://portfolio-6b550.web.app/"
            className={styles.premiumButton}
          >
            portfolio
          </Link>
        </div>
        <div className={styles.premium}>
          <Link
            href="https://github.com/VisarutJDev"
            className={styles.premiumButton}
          >
            github
          </Link>
        </div>
        {/* <div className={styles.savedItems}>
          <Link href="#"><a className={styles.savedLink}>Saved items</a></Link>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
