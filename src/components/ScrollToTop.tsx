import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;



<<<<<<< HEAD


=======
<<<<<<< HEAD


=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
=======


>>>>>>> Stashed changes
>>>>>>> c1c7b426fa5f1b6bc0373568799fca8f601230b8
>>>>>>> 6b5f517737979c4deba00e954a47bc3096946bb3
