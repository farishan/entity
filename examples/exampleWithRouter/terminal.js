const terminal = {
  node: {
    root: document.createElement('form'),
    input: document.createElement('input'),
  },

  onchange: null,

  init: function(){
    // Setup node attributes
    this.node.input.name = 'input'

    terminal.node.root.onsubmit = (e) => {
      e.preventDefault();

      const { value } = this.node.input;

      this.handleInput(value.toLowerCase(), () => {
        this.node.input.value = "";
      });
    };

    // Assemblages
    this.node.root.appendChild(this.node.input);
  },

  // Method to execute after terminal appended to document.body
  finalize: function(){
    if (this.node.input.isConnected) {
      this.node.input.focus();
    }
  },

  emit: function(payload){
    if(this.onchange !== null && typeof this.onchange === 'function'){
      this.onchange(payload)
    }
  },

  handleInput: function(value, callback){
    const word1 = value.split(" ")[0];
    const word2 = value.split(" ")[1];
    const word3 = value.split(" ")[2];

    // Side-effects
    this.emit([word1, word2, word3])

    callback()
  }
}

terminal.init()