const COMMAND_TO = "to";
const COMMAND_CREATE = "create";
const COMMAND_JOIN = "join";

const ROUTE_COMMAND_SCOPE = {
  "/": [COMMAND_TO],
  "/garage": [COMMAND_TO, COMMAND_CREATE, COMMAND_JOIN],
};

const $root = document.body;
const VALID_TAGS = ["chip", "core"];

const form = document.createElement("form");
const input = document.createElement("input");
input.name = "input";
input.dataset.scope = "/";
form.appendChild(input);
form.onsubmit = function (e) {
  e.preventDefault();
  const { value } = input;
  handleInput(value.toLowerCase(), function () {
    input.value = "";
  });
};
$root.appendChild(form);
if (input.isConnected) {
  input.focus();
}

function handleInput(value, callback) {
  const scope = input.dataset.scope;
  const word1 = value.split(" ")[0];
  const word2 = value.split(" ")[1];
  const word3 = value.split(" ")[2];

  if(word1.charAt(0) === '/'){
    router.push(word1)
    input.dataset.scope = router.currentPath
  }

  console.log(router.currentPath, scope, value)

  if (word1 && word1.length > 0) {
    const command = word1;

    handleCommand(ROUTE_COMMAND_SCOPE[scope], command, word2, word3);
  }

  callback();
}

function handleCommand(availableCommands, command, arg1, arg2) {
  if (availableCommands.includes(command)) {
    switch (command) {
      case COMMAND_CREATE:
        console.log("create something...");
        const tag = arg1;

        if (tag.length > 0) {
          if (VALID_TAGS.includes(tag)) {
            console.log({ tag });
            const element = document.createElement("div");

            if (this[tag]) {
              // Create item object
              const item = new this[tag]();

              if (item.speak) {
                item.speak();
              }

              element.id = item.id;
              element.dataset.props = JSON.stringify(item);
              element.setAttribute(
                "style",
                `
                border: 1px solid;
                display: inline-block;
                padding: 5px;
              `
              );
              element.style.border = "1px solid";
              element.style.display = "inline-block";
              const text = document.createElement("div");
              text.innerHTML = `${element.id} | ${tag}`;
              element.appendChild(text);
              $root.appendChild(element);
            }
          }
        }

        break;
      case COMMAND_JOIN:
        console.log(arg1, arg2);

        let item1, item2;

        if (arg1 && el(arg1)) {
          item1 = el(arg1);
        }

        if (arg2 && el(arg2)) {
          item2 = el(arg2);
        }

        if (item1 && item2) {
          item1.appendChild(item2.cloneNode(true));
          item2.remove();
        }
        break;
      case COMMAND_TO:
        router.push(arg1)
        input.dataset.scope = router.currentPath
      default:
        console.log("not valid");
    }
  }
}
