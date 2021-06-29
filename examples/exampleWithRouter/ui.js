const $root = document.body;

const itemManager = {
  itemMap: {
    chip: window.chip,
    core: window.core
  },

  create: function(item){
    if (this.itemMap[item]) {
      // Create item object
      const itemObject = new this.itemMap[item]();

      // Test object
      if (itemObject.speak) {
        itemObject.speak();
      }

      // Create item node
      const itemNode = document.createElement("div");

      // Merge object with node
      itemNode.id = itemObject.id;
      itemNode.dataset.props = JSON.stringify(itemObject);

      // Node styling
      itemNode.setAttribute(
        "style",
        `
        border: 1px solid;
        display: inline-block;
        padding: 5px;
      `
      );
      itemNode.style.border = "1px solid";
      itemNode.style.display = "inline-block";
      const text = document.createElement("div");
      text.innerHTML = `${itemNode.id} | ${item}`;
      itemNode.appendChild(text);

      return {
        itemObject,
        itemNode
      }

      // $root.appendChild(itemNode);
    }
  },

  join: function(arg1, arg2){
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
}

const terminalItemManagerConnector = {
  scopes: ['/garage'],
  terminal: null,
  terminalListener: document.createElement('div'),
  itemManager: null,

  commandMap: {
    "create": function(item){
      const {itemObject, itemNode} = itemManager.create(item)

      console.log(itemObject)

      if (itemNode) $root.appendChild(itemNode);
    },
    "join": function(arg1, arg2){
      itemManager.join(arg1, arg2)
    }
  },

  init: function(terminal, itemManager){
    this.terminal = terminal
    this.itemManager = itemManager

    this.terminalListener.addEventListener(this.terminal.emitEvent, (payload) => this.handleTerminal(payload))
    this.terminal.addEmitEventTarget(this.terminalListener)
  },
  handleTerminal: function(event){
    if(this.scopes.includes(this.terminal.node.input.dataset.scope)){
      const payload = event.detail

      const word1 = payload[0];
      const word2 = payload[1];
      const word3 = payload[2];

      if (word1 && word1.length > 0) {
        this.handleCommand(word1, word2, word3);
      }
    }
  },
  handleCommand: function(command, arg1, arg2){
    if(this.commandMap[command]){
      this.commandMap[command](arg1, arg2)
    } else {
      console.log(`"${command}" is not a item manager command.`);
    }
  }
}

const terminalRouterConnector = {
  terminal: null,
  terminalListener: document.createElement('div'),
  router: null,

  commandMap: {
    "to": function(newRoute){
      const self = terminalRouterConnector
      self.router.push(newRoute)
      self.terminal.node.input.dataset.scope = self.router.currentPath
    },
  },

  commandMapByRoute: {
    "/": ["to"],
    "/garage": ["to", "create", "join"],
  },

  init: function(terminal, router){
    this.terminal = terminal
    this.router = router

    this.terminal.node.input.dataset.scope = this.router.currentPath

    this.terminalListener.addEventListener(this.terminal.emitEvent, (payload) => this.handleTerminal(payload))
    this.terminal.addEmitEventTarget(this.terminalListener)

    // this.router.onchange = (payload) => this.handleRouter(payload)
  },
  handleTerminal: function(event) {
    const payload = event.detail

    let commandMapByRouteKey = this.router.currentPath
    const word1 = payload[0];
    const word2 = payload[1];
    const word3 = payload[2];

    if(word1.charAt(0) === '/'){
      this.commandMap["to"](word1)
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
        console.log(`"${command}" is not a router command.`);
      }
    } else {
      console.log(`"${command}" is not valid for current route. Valid commands: ${JSON.stringify(commandsByRoute)}.`)
    }
  }
}

terminalRouterConnector.init(terminal, router)
terminalItemManagerConnector.init(terminal, itemManager)
