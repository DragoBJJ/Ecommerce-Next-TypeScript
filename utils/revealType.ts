import { RevealProps } from "react-awesome-reveal";
declare type FadeDirection =
  | "bottom-left"
  | "bottom-right"
  | "down"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "up";
export interface FadeProps extends Omit<RevealProps, "keyframes" | "css"> {
  /**
   * Causes the animation to start farther. Only works with "down", "left", "right" and "up" directions.
   * @default false
   */
  big?: boolean;
  /**
   * Origin of the animation.
   * @default undefined
   */
  direction?: FadeDirection;
  /**
   * Specifies if the animation should make element(s) disappear.
   * @default false
   */
  reverse?: boolean;
  children?: any;
}
declare const Fade: React.FC<FadeProps>;
export default Fade;
