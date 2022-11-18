import "./style.css";
import Typewriter from "./Typewriter";

const typewriter = new Typewriter(
  document.querySelector<HTMLDivElement>("#app")!,
  { loop: true, typingSpeed: 100, deletingSpeed:100 }
);

typewriter
  .typeString("Where do I start?")
  .pauseFor(1000)
  .typeString("\n\n This will probably be a new line")
  .pauseFor(3000)
  .typeString("\n\n This waited for 3 seconds and then started")
  .typeString("\n\n After this lets wait for 2 seconds and then start deleting everything")
  .pauseFor(2000)
  .deleteChars(100)
  .deleteAll(50)
  .start();


