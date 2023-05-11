class TodoList extends HTMLElement {
    constructor() {
      super();
  
      // Initialize the component's internal state
      this.todos = [];
      this.count = 0;
  
      // Create a shadow DOM for the component
      const shadow = this.attachShadow({ mode: "open" });
  
      // Create a <style> element for the component's CSS
      const style = document.createElement("style");
      style.textContent = `
        .todo-list {
          list-style: none;
          padding-left: 0;
        }
        .todo-item {
          margin-bottom: 8px;
        }
        .todo-item input {
          margin-right: 8px;
        }
      `;
  
      // Create an <input> element for the user to add new todos
      const input = document.createElement("input");
      input.setAttribute("type", "text");
  
      // Create a <button> element to add new todos
      const addButton = document.createElement("button");
      addButton.textContent = "Add Todo";
      addButton.addEventListener("click", () => this.addTodoItem());
  
      // Create a <div> element to display the number of tasks
      const countDisplay = document.createElement("div");
      countDisplay.textContent = `Number of tasks: ${this.count}`;
  
      // Create a <ul> element to display the list of todos
      const todoList = document.createElement("ul");
      todoList.classList.add("todo-list");
  
      // Append the elements to the shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(input);
      shadow.appendChild(addButton);
      shadow.appendChild(countDisplay);
      shadow.appendChild(todoList);
    }
  
    connectedCallback() {
      this.render();
    }
  
    addTodoItem() {
      const input = this.shadowRoot.querySelector("input");
      if (input.value) {
        this.todos.push(input.value);
        this.count++;
        this.render();
        input.value = "";
      }
    }
  
    removeTodoItem(index) {
      this.todos.splice(index, 1);
      this.count--;
      this.render();
    }
  
    render() {
      const todoList = this.shadowRoot.querySelector(".todo-list");
      const countDisplay = this.shadowRoot.querySelector("div");
  
      todoList.innerHTML = "";
      countDisplay.textContent = `Number of tasks: ${this.count}`;
  
      this.todos.forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
  
        const todoText = document.createTextNode(todo);
        todoItem.appendChild(todoText);
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => this.removeTodoItem(index));
        todoItem.appendChild(removeButton);
  
        todoList.appendChild(todoItem);
      });
    }
  }
  
  customElements.define("todo-component", TodoList);
