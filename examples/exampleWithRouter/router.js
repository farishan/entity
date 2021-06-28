const router = {
  $root: document.body,
  createElement: () => document.createElement("div"),

  node: {},
  currentPath: "/",

  init: function () {
    this.node.root = this.createElement();
    this.node.root.id = "router_root";
    this.node.meta = this.createElement();
    this.node.meta.id = "router_meta";
    this.node.content = this.createElement();
    this.node.content.id = "router_content";

    this.node.root.appendChild(this.node.meta);
    this.node.root.appendChild(this.node.content);

    this.$root.appendChild(this.node.root);

    this.renderMeta();
  },

  push: function (path) {
    this.currentPath = path;
    this.renderMeta();
  },

  renderMeta: function () {
    this.node.meta.innerHTML = `Current path: ${this.currentPath}`;
  },

  render: function (content) {
    this.clear();
    this.node.content.appendChild(content);
  },

  clear: function () {
    this.node.content.innerHTML = "";
  },
};

router.init();
