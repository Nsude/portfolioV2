import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { myEase1, myEase2 } from "../utility/contansts";

const TestimonialImageReveal = ({
  testimonials,
  activeIndex,
  allowNavigation,
}) => {
  const total = testimonials.length;
  const containerRef = useRef();
  const prevIndex = useRef(activeIndex);
  const layers = useRef([...Array(total).keys()].reverse());

  useGSAP(
    () => {
      const images = document.querySelectorAll(".testimonial-image");
      const prev = prevIndex.current;
      const prevImage = images[prev];

      if (!(images || allowNavigation)) return null;
      const tl = gsap.timeline();

      const reorderImages = () => {
        // the previous index is set to 0, and the rest are stacked on top of it in order
        layers.current = layers.current.map((zIndex, i) =>
          i === prev ? 0 : zIndex + 1
        );

        // cap the zIndex so it doesn't exceed the array length
        layers.current = layers.current.map((zIndex) => zIndex % total);

        images.forEach((img, i) => {
          if (i === prev) return;
          gsap.set(img, { zIndex: layers.current[i], opacity: 1 });
        });
      };

      if (
        activeIndex > prevIndex.current ||
        (prevIndex.current === total - 1 && activeIndex === 0)
      ) {
        let prevReset = false;
        images.forEach((img) => {
          let currentRotate = parseInt(gsap.getProperty(img, "rotate"));
          tl.to(
            img,
            {
              rotate: `${currentRotate - 5}deg`,
              duration: 0.6,
              ease: myEase1,
            },
            "<"
          );
        });

        const prevAnimation = tl.to(
          prevImage,
          {
            opacity: 0,
            duration: 0.4,
            delay: .2,
            onUpdate: () => {
              const currentOpacity = gsap.getProperty(prevImage, "opacity");
              if (currentOpacity < 0.2 && !prevReset) {
                prevReset = true;
                prevAnimation.kill();

                gsap.set(prevImage, { zIndex: 0, rotate: `${5 * total}deg` });
                
                gsap.fromTo(
                  prevImage,
                  { rotate: `${5 * (total + 1)}deg`, opacity: 0 },
                  {
                    rotate: `${5 * total}deg`,
                    opacity: 1,
                    ease: "power3.out",
                    duration: 0.6,
                  }
                );
                reorderImages();
              }
            },
          },
          "<"
        );
      }

      // reset prevIndex
      prevIndex.current = activeIndex;
    },
    { scope: containerRef, dependencies: [activeIndex] }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-[450px] aspect-[3/3.6]"
      style={{ rotate: "-4deg" }}
    >
      {testimonials.map(({ image }, i) => (
        <div
          key={"client-image" + i}
          className={`absolute h-full w-full rounded-[15px] overflow-hidden shadow-testimonials testimonial-image border-2 border-myGray/30`}
          style={{
            rotate: `${5 * (i + 1)}deg`,
            zIndex: layers.current[i],
            opacity: 1,
          }}
        >
          <img
            className="object-cover grayscale h-full w-full"
            src={image}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default TestimonialImageReveal;
