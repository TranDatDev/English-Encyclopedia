import { Outlet } from "react-router";
import eeLogo from "@shared/assets/EE_logo.svg";
export default function MainLayout() {
  return (
    <div>
      <section className="padding-default bg-[#68BBE3] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={eeLogo} className="h-[50px] my-4" alt="EE logo" />
          <div>
            <p className="font-bold text-2xl">English</p>
            <p className="font-bold text-2xl">Encyclopedia</p>
          </div>
        </div>
        <div>
          <nav className="flex gap-4 text-xl font-medium">
            <li>
              <a href="">IELTS</a>
            </li>
            <li>
              <a href="">TOEIC</a>
            </li>
            <li>
              <a href="">THPTQG</a>
            </li>
            <li>
              <a href="">Từ Vựng</a>
            </li>
            <li>
              <a href="">Từ Loại</a>
            </li>
            <li>
              <a href="">Ngữ Pháp</a>
            </li>
          </nav>
        </div>
      </section>
      <main>
        <Outlet />
      </main>
      <footer>…footer chung…</footer>
    </div>
  );
}
