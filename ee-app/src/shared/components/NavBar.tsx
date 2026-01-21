import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { animated, useSpring } from "@react-spring/web";
import eeLogo from "@shared/assets/EE_logo.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// =======================
// NAVBAR CHÍNH
// =======================
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Khóa scroll an toàn khi mở menu mobile
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = body.style.overflow;
    const originalScrollY = window.scrollY;

    if (isOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${originalScrollY}px`;
      body.style.width = "100%";
    } else {
      html.style.overflow = originalHtmlOverflow;
      body.style.overflow = originalBodyOverflow;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, originalScrollY);
    }

    return () => {
      html.style.overflow = originalHtmlOverflow;
      body.style.overflow = originalBodyOverflow;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
    };
  }, [isOpen]);

  // Animation panel trượt phải
  const slideIn = useSpring({
    transform: isOpen ? "translateX(0%)" : "translateX(100%)",
    opacity: isOpen ? 1 : 0,
    config: { tension: 210, friction: 25 },
  });

  // Animation overlay mờ nền
  const overlayFade = useSpring({
    opacity: isOpen ? 1 : 0,
  });

  return (
    <header className="w-full">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src={eeLogo}
            className="h-12 w-auto"
            alt="English Encyclopedia logo"
          />
          <div className="hidden flex-col md:flex">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              English
            </span>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Encyclopedia
            </span>
          </div>
        </div>

        {/* Nút hamburger (mobile) */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Icon icon="mdi:menu" className="h-6 w-6 text-gray-700" />
        </button>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-6 font-semibold text-gray-600 lg:flex">
          <NavLinks />
        </nav>
      </div>

      {/* Overlay mờ nền */}
      <animated.div
        style={overlayFade}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Offcanvas mobile */}
      <animated.div
        style={slideIn}
        className="fixed top-0 right-0 z-50 flex h-full w-3/4 max-w-sm flex-col bg-white shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <Icon icon="mdi:close" className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 overflow-y-auto p-6 font-medium text-gray-700">
          <NavLinks isMobile />
        </nav>
      </animated.div>
    </header>
  );
};

// =======================
// LINK TÁI SỬ DỤNG
// =======================
const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
  <>
    <Link to="/" className="transition-colors duration-150 hover:text-blue-500">
      Trang chủ
    </Link>

    <DropdownMenu
      title="Kỳ thi tiếng Anh"
      items={[
        { to: "/aptis-esol", label: "Aptis ESOL" },
        { to: "/ielts", label: "IELTS" },
        { to: "/toeic", label: "TOEIC" },
        { to: "/toefl", label: "TOEFL" },
      ]}
      isMobile={isMobile}
    />

    <DropdownMenu
      title="Kiến thức chung"
      items={[
        { to: "/pos", label: "Từ loại" },
        { to: "/grammar", label: "Ngữ pháp" },
        { to: "/phonetic", label: "Ngữ âm" },
      ]}
      isMobile={isMobile}
    />
  </>
);

// =======================
// DROPDOWN MENU
// =======================
const DropdownMenu = ({
  title,
  items,
  isMobile,
}: {
  title: string;
  items: { to: string; label: string }[];
  isMobile?: boolean;
}) => {
  // Animation dropdown
  const dropdownSpring = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(-10px)" },
    config: { tension: 250, friction: 20 },
  });

  // Mobile: hiển thị danh sách đơn giản
  if (isMobile) {
    return (
      <div className="flex flex-col">
        <span className="mb-1 font-semibold text-gray-800">{title}</span>
        <div className="ml-3 flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-2 py-1 text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Desktop dropdown
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1 text-gray-600 transition-colors duration-200 hover:text-blue-500">
        {title}
        <Icon icon="mingcute:down-fill" className="h-4 w-4" />
      </MenuButton>

      <animated.div style={dropdownSpring}>
        <MenuItems className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-xl focus:outline-none">
          <div className="flex flex-col gap-1 p-2">
            {items.map((item) => (
              <MenuItem key={item.to}>
                {({ focus }) => (
                  <Link
                    to={item.to}
                    className={`block rounded-md px-4 py-2 text-sm text-gray-600 ${
                      focus
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-blue-50 hover:text-blue-600"
                    } transition-all duration-150`}
                  >
                    {item.label}
                  </Link>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </animated.div>
    </Menu>
  );
};
