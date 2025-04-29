import { createContext, useContext, useState } from "react";

const navbarContext = createContext();

export const useNavbarContext = () => {
  const context = useContext(navbarContext);
  if (!context) throw new Error("Navbar context is undefined");

  return context;
};

const navLinks = ["About", "Projects", "Contacts"];
const socials = [
  { title: "LinkedIn", link: "https://www.linkedin.com/in/nsude-meshach/" },
  { title: "Instagram", link: "https://www.instagram.com/meshach_nsude/" },
  { title: "Twitter(X)", link: "https://www.x.com/meshach-nsude/" },
  {
    title: "Youtube",
    link: "https://youtube.com/@meshach_nsude?si=6pC4a1DrfUgE6HHG",
  },
];

const NavbarContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionRefs, setSectionRefs] = useState({});
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    const email = "meshachnsd@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <navbarContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        navLinks,
        socials,
        sectionRefs,
        setSectionRefs,
        navbarHidden, 
        setNavbarHidden,
        copyEmail,
        emailCopied
      }}
    >
      {children}
    </navbarContext.Provider>
  );
};

export default NavbarContextProvider;
