import { Link, Outlet } from "react-router";
import eeLogo from "@shared/assets/EE_logo.svg";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
export default function MainLayout() {
  return (
    <div>
      <section className="padding-default bg-[#68BBE3] shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4 sm:gap-0">
          {/* Logo + tiêu đề */}
          <div className="flex items-center gap-4">
            <img src={eeLogo} className="h-[50px]" alt="EE logo" />
            <div>
              <p className="font-bold text-2xl leading-tight drop-shadow-sm">
                English
              </p>
              <p className="font-bold text-2xl leading-tight drop-shadow-sm">
                Encyclopedia
              </p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex gap-6 text-lg font-medium tracking-wide">
            <Link
              to="/"
              className="hover:text-white transition-colors duration-200"
            >
              Trang chủ
            </Link>
            <Link
              to="/pos"
              className="hover:text-white transition-colors duration-200"
            >
              Từ loại
            </Link>
            <Link
              to="/grammar"
              className="hover:text-white transition-colors duration-200"
            >
              Ngữ Pháp
            </Link>
          </nav>
        </div>
      </section>
      <div>
        <Outlet />
      </div>
      <footer className="padding-default bg-gray-200 flex flex-col sm:flex-row justify-between items-between h-auto sm:h-100 mt-8">
        {/* Bên trái */}
        <div className="flex flex-col justify-between py-4">
          <div className="mt-8">
            <img src={eeLogo} className="h-[80px]" alt="EE logo" />
          </div>
          <div>
            <p className="text-gray-800 text-4xl font-semibold mb-1">
              English Encyclopedia
            </p>
            <p className="text-gray-700 text-2xl mb-1">
              Bách khoa toàn thư tiếng Anh
            </p>
            <p className="text-gray-600">
              Kiến thức Sẵn Sàng - Học Tập Hiên Ngang
            </p>
            <div className="h-0.5 w-[20vw] bg-gray-800 mt-4"></div>
            <p className="mt-2">Từ góc Điện Biên nhỏ, lan tỏa kiến thức lớn.</p>
          </div>
          <p className="text-gray-600 text-sm pt-4">
            2025 English Encyclopedia.
          </p>
        </div>

        {/* Bên phải - Disclosure Section */}
        <div className="w-1/2 mt-8 sm:mt-0 self-center mb-8">
          <p className="text-lg font-semibold py-4">Câu Hỏi Thường Gặp</p>
          <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton className="w-full px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 flex items-center justify-between">
                  <span>Trang web có phiên bản trả phí không?</span>
                  <Icon
                    icon="mdi:chevron-down"
                    className={`transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="px-4 py-2 text-gray-600">
                  Không, trang web hoàn toàn miễn phí với đầy đủ nội dung và
                  tính năng.
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>

          <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton className="w-full mt-2 px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 flex items-center justify-between">
                  <span>Nội dung được lấy từ đâu?</span>
                  <Icon
                    icon="mdi:chevron-down"
                    className={`transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="px-4 py-2 text-gray-600">
                  Nội dung tổng hợp được tham khảo nhiều nguồn khác nhau, bao
                  gồm sách giáo khoa, tài liệu học thuật và các trang web giáo
                  dục khác.
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>

          <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton className="w-full mt-2 px-4 py-2 text-left text-lg font-medium text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 flex items-center justify-between">
                  <span>Mục đích sử dụng?</span>
                  <Icon
                    icon="mdi:chevron-down"
                    className={`transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="px-4 py-2 text-gray-600">
                  Để mọi người có thể tra cứu và học tập về ngữ pháp tiếng Anh
                  một cách dễ dàng và hiệu quả. Giúp học sinh và thầy cô có tài
                  liệu học tập phong phú và đa dạng.
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        </div>
      </footer>
    </div>
  );
}
