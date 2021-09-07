import React from 'react';
import styles from '../../styles/components/Header.module.scss';
import cn from "classnames";
import logo from "../../assets/images/logo.svg";

const Header = () => {
    return (
        <div className={cn(styles.headerWrapper)}>
            <header className={cn(styles.header)}>
             <div className={cn(styles.header__logo)}>
                 <img src={logo} alt="logo" />
             </div>
            </header>
        </div>
    )
}

export default Header;
