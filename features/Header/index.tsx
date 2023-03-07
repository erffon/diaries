import Image from "next/image";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.container}>
      <Image
        alt="logo"
        width={80}
        height={80}
        src="/assets/logo.jpg"
        className="mr-10 rounded-full"
      />
      <h1 className={style.title}>دفترچه خاطرات من</h1>
      <ul className={style.uls}>
        <li className={style.lis}>خانه</li>
        <li className={style.lis}>دسته‌بندی</li>
      </ul>
    </header>
  );
};

export default Header;
