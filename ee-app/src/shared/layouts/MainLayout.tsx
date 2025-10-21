import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { animated, useSpring } from "@react-spring/web";
import eeLogo from "@shared/assets/EE_logo.svg";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";

export default function MainLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navbarSpring = useSpring({
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const dropdownSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-10px) scale(0.95)" },
    to: { opacity: 1, transform: "translateY(0) scale(1)" },
    config: { mass: 1, tension: 200, friction: 20 },
  });

  return (
    <div>
      <animated.section
        style={navbarSpring}
        className={`sticky top-0 z-20 border-0 bg-inherit py-2 transition-all duration-500 print:hidden ${
          scrolled
            ? "border border-white/30 bg-gradient-to-r from-white/100 to-white/100 shadow-xl backdrop-blur-lg"
            : "py-4"
        }`}
      >
        <div className="flex flex-col items-center justify-between gap-4 px-20 sm:flex-row">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img
              src={eeLogo}
              className="h-12 w-auto"
              alt="English Encyclopedia logo"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                English
              </span>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Encyclopedia
              </span>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex items-center gap-6 font-semibold text-gray-600">
            <Link
              to="/"
              className="transition-colors duration-200 hover:text-blue-500"
            >
              Trang chủ
            </Link>
            {/* Dropdown for Exams */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-1 font-semibold text-gray-600 transition-colors duration-200 hover:text-blue-500">
                Kỳ thi tiếng Anh
                <Icon icon="mingcute:down-fill" className="h-4 w-4" />
              </MenuButton>
              <MenuItems
                as={animated.div}
                style={dropdownSpring}
                className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-xl focus:outline-none"
              >
                <div className="flex flex-col gap-1 p-2">
                  <MenuItem>
                    {({ focus }) => (
                      <animated.div
                        style={useSpring({
                          transform: focus ? "scale(1.02)" : "scale(1)",
                          opacity: focus ? 1 : 0.9,
                          config: { tension: 300, friction: 20 },
                        })}
                      >
                        <Link
                          to="/aptis-esol"
                          className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                            focus
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          } transition-all duration-150`}
                        >
                          Aptis ESOL
                        </Link>
                      </animated.div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <animated.div
                        style={useSpring({
                          transform: focus ? "scale(1.02)" : "scale(1)",
                          opacity: focus ? 1 : 0.9,
                          config: { tension: 300, friction: 20 },
                        })}
                      >
                        <Link
                          to="/ielts"
                          className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                            focus
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          } transition-all duration-150`}
                        >
                          IELTS
                        </Link>
                      </animated.div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <animated.div
                        style={useSpring({
                          transform: focus ? "scale(1.02)" : "scale(1)",
                          opacity: focus ? 1 : 0.9,
                          config: { tension: 300, friction: 20 },
                        })}
                      >
                        <Link
                          to="/toeic"
                          className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                            focus
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          } transition-all duration-150`}
                        >
                          TOEIC
                        </Link>
                      </animated.div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <animated.div
                        style={useSpring({
                          transform: focus ? "scale(1.02)" : "scale(1)",
                          opacity: focus ? 1 : 0.9,
                          config: { tension: 300, friction: 20 },
                        })}
                      >
                        <Link
                          to="/toefl"
                          className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                            focus
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          } transition-all duration-150`}
                        >
                          TOEFL
                        </Link>
                      </animated.div>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            {/* Dropdown for THPT */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-1 text-gray-600 transition-colors duration-200 hover:text-blue-500">
                Kiến Thức Chung
                <Icon icon="mingcute:down-fill" className="h-4 w-4" />
              </MenuButton>
              <MenuItems
                as={animated.div}
                style={dropdownSpring}
                className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-xl focus:outline-none"
              >
                <div className="flex flex-col gap-1 p-2">
                  <MenuItem>
                    {({ focus }) => (
                      <animated.div
                        style={useSpring({
                          transform: focus ? "scale(1.02)" : "scale(1)",
                          opacity: focus ? 1 : 0.9,
                          config: { tension: 300, friction: 20 },
                        })}
                      >
                        <Link
                          to="/pos"
                          className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                            focus
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          } transition-all duration-150`}
                        >
                          Từ loại
                        </Link>
                      </animated.div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <animated.div
                        style={useSpring({
                          transform: focus ? "scale(1.02)" : "scale(1)",
                          opacity: focus ? 1 : 0.9,
                          config: { tension: 300, friction: 20 },
                        })}
                      >
                        <Link
                          to="/grammar"
                          className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                            focus
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          } transition-all duration-150`}
                        >
                          Ngữ pháp
                        </Link>
                      </animated.div>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <animated.div
                        style={useSpring({
                          transform: focus ? "scale(1.02)" : "scale(1)",
                          opacity: focus ? 1 : 0.9,
                          config: { tension: 300, friction: 20 },
                        })}
                      >
                        <Link
                          to="/phonetic"
                          className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                            focus
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          } transition-all duration-150`}
                        >
                          Ngữ âm
                        </Link>
                      </animated.div>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </nav>
        </div>
      </animated.section>

      <div className="">
        <Outlet />
      </div>
      <footer className="items-between mt-8 flex h-auto flex-col justify-between bg-gray-200 px-20 sm:h-100 sm:flex-row">
        {/* Bên trái */}
        <div className="flex flex-col justify-between py-4">
          <div className="mt-8">
            <img src={eeLogo} className="h-[80px]" alt="EE logo" />
          </div>
          <div>
            <p className="mb-1 text-4xl font-semibold text-gray-800">
              English Encyclopedia
            </p>
            <p className="mb-1 text-2xl text-gray-700">
              Bách khoa toàn thư tiếng Anh
            </p>
            <p className="text-gray-600">
              Kiến thức Sẵn Sàng - Học Tập Hiên Ngang
            </p>
            <div className="mt-4 h-0.5 w-[20vw] bg-gray-800"></div>
            <p className="mt-2">Từ góc Điện Biên nhỏ, lan tỏa kiến thức lớn.</p>
          </div>
          <p className="pt-4 text-sm text-gray-600">
            2025 English Encyclopedia.
          </p>
        </div>

        {/* Bên phải - Disclosure Section */}
        <div className="mt-8 mb-8 w-1/2 self-center sm:mt-0">
          <p className="py-4 text-lg font-semibold">Câu Hỏi Thường Gặp</p>
          <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-lg font-medium text-gray-800 hover:bg-gray-300">
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
                <DisclosureButton className="mt-2 flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-lg font-medium text-gray-800 hover:bg-gray-300">
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
                <DisclosureButton className="mt-2 flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-lg font-medium text-gray-800 hover:bg-gray-300">
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
