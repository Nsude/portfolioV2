import React from "react";
import { useNavbarContext } from "../contexts/NavbarContext";
import useDevice from "../hooks/useDevice";
import ScrollOpacity from "../global/ScrollOpacity";
import SplitLineText from "../global/SplitLineText";

const aboutStory = [
  {
    index: "01",
    story:
      "Being exceptional at my skills is a responsibility, I work at it every singly day, combining my passion for design, code, and web interaction to create amazing digital experiences.",
  },
  {
    index: "02",
    story:
      "Every line of code, every layout, and every decision I make reflects my commitment to growth and excellence.",
  },
];

const About = () => {
  const { navlinksLeft } = useNavbarContext();
  const { width: deviceWidth } = useDevice();

  return (
    <section className="w-full h-screen flex justify-center relative ">
      <div
        className="flex flex-col justify-center w-[85%] md:w-[75%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] absolute top-[50%] translate-y-[-50%]"
        style={{ left: deviceWidth > 1023 ? navlinksLeft : 20 }}
      >
        <ScrollOpacity>
          <h3 className="text-16-body mb-[40px]">About Me</h3>
        </ScrollOpacity>

        <div>
          {aboutStory.map(({ index, story }, i) => (
            <ScrollOpacity key={i}>
              <div
                key={i}
                className="flex flex-col gap-y-[25px] lg:gap-y-0 lg:flex-row lg:items-baseline first:md:mb-[40px] first:mb-[50px] relative"
              >
                <span className="text-14-body lg:absolute lg:bottom-[8px] lg:left-[-50px]">
                  {index}
                </span>
                <SplitLineText>
                  <p className="text-25-body md:text-32-body">{story}</p>
                </SplitLineText>
              </div>
            </ScrollOpacity>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
