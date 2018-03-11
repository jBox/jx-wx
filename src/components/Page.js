import React from "react";
import classNames from "classnames";
import styles from "./Page.css";

export default ({ children, className, title }) => (
    <div className={classNames(styles.page, className)}>
        {title && (<div className={styles.title}><span>{title}</span></div>)}
        {children}
    </div>
);