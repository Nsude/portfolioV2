import { CustomEase } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(CustomEase);

const myEase1 = CustomEase.create("custom", "0.76, 0, 0.24, 1");
const myEase2 = CustomEase.create("custom", "0.40, 0, 0.24, 1")



export {myEase1, myEase2};