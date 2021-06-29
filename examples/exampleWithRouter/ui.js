const $root = document.body;

const terminalRouterConnector = {
  terminal: null,
  router: null,

  tags: ["chip", "core"],

  commandMap: {
    "to": function(newRoute){
      const self = terminalRouterConnector
      self.router.push(newRoute)
      self.terminal.node.input.dataset.scope = self.router.currentPath
    },
    "create": function(tag){
      const self = terminalRouterConnector
      console.log("create something...", tag);

      if (tag.length > 0) {
        if (self.tags.includes(tag)) {
          console.log({ tag });
          const element = document.createElement("div");

          if (window[tag]) {
            // Create item object
            const item = new window[tag]();

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
    },
    "join": function(arg1, arg2){
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
    }
  },

  commandMapByRoute: {
    "/": ["to"],
    "/garage": ["to", "create", "join"],
  },

  init: function(terminal, router){
    this.terminal = terminal
    this.router = router

    this.terminal.node.input.dataset.scope = this.router.currentPath
    this.terminal.onchange = (payload) => this.handleTerminal(payload)

    // this.router.onchange = (payload) => this.handleRouter(payload)
  },
  handleTerminal: function(payload) {
    console.log(payload, this)
    let commandMapByRouteKey = this.router.currentPath
    const word1 = payload[0];
    const word2 = payload[1];
    const word3 = payload[2];

    if(word1.charAt(0) === '/'){
      this.router.push(word1)
      commandMapByRouteKey = this.router.currentPath
    }

    if (word1 && word1.length > 0) {
      const command = word1;

      this.handleCommand(this.commandMapByRoute[commandMapByRouteKey], command, word2, word3);
    }
  },
  handleCommand: function(commandsByRoute, command, arg1, arg2){
    if (commandsByRoute.includes(command)) {
      if(this.commandMap[command]){
        this.commandMap[command](arg1, arg2)
      } else {
        console.log(`"${command}" is not valid.`);
      }
    } else {
      console.log(`"${command}" is not valid for current route. Valid commands: ${JSON.stringify(commandsByRoute)}.`)
    }
  }
}

terminalRouterConnector.init(terminal, router)

$root.appendChild(terminal.node.root);
terminal.finalize()
