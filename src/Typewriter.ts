type QueueItem = () => Promise<void>;

export default class Typewriter {
  #queue: QueueItem[] = [];
  #element: HTMLElement;
  #loop: any;
  #typingSpeed: any;
  #deletingSpeed: any;
  constructor(
    parent: HTMLElement,
    { loop = false, typingSpeed = 100, deletingSpeed = 100 } = {}
  ) {
    this.#element = document.createElement("div");
    this.#element.classList.add("whitespace");
    parent.append(this.#element);
    this.#loop = loop;
    this.#typingSpeed = typingSpeed;
    this.#deletingSpeed = deletingSpeed;
  }

  typeString(string: string) {
    this.#addToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        console.log(string[i]);
        this.#element.append(string[i]);
        i++;
        if (i >= string.length) {
          resolve();
          clearInterval(interval);
        }
      }, this.#typingSpeed);
    });
    return this;
  }

  deleteChars(number: number) {
    this.#addToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText?.substring(
          0,
          this.#element.innerText.length - 1
        );
        i++;
        if (i > number) {
          resolve();
          clearInterval(interval);
        }
      }, this.#deletingSpeed);
    });
    return this;
  }

  deleteAll(deleteSpeed = this.#deletingSpeed) {
    this.#addToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText?.substring(
          0,
          this.#element.innerText.length - 1
        );
        i++;
        if (this.#element.innerText.length == 0) {
          resolve();
          clearInterval(interval);
        }
      }, deleteSpeed);
    });
    return this;
  }
  pauseFor(duration: number) {
    this.#addToQueue((resolve) => {
      const timeout = setTimeout(() => {
        resolve();
        clearTimeout(timeout);
      }, duration);
    });
    return this;
  }

  async start() {
    let cb = this.#queue.shift();
    while (cb != null) {
      await cb();
      if (this.#loop) {
        this.#queue.push(cb);
      }
      cb = this.#queue.shift();
    }
    return this;
  }

  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => {
      return new Promise(cb);
    });
  }
}
