# Getting Started with Aurelia

  Aurelia is an amazing framework that embraces simple clean code without sacrificing power.
  In this tutorial we'll introduce you to the simplicity of Aurelia through construction of a
  "Todo" application. You'll see just how clean and simple your application code can be and
  you will learn the many of the basic concepts and capabilities of Aurelia.
  
  Before we start writing code. you will need to get setup with the tools we will be using
  to create the application. We will be using the aurelia comand line tool to create the project
  structure. The Aurelia CLI will allow to choose between to popular programming language options: ESNext and typescript. In this tutorial we will be using ESnext as our programming language.  
  
## Prerequisites

The first thing that you will need to have installed is node.js it can be downloaded 
from here https://nodejs.org/. Which can be downloaded from the provided link. After following the installation instructions for node. 

The next tool that will need to be installed is yarn, which can
be downloaded and installed from here https://yarnpkg.com/lang/en/docs/install/

And finally we need to install the Aurelia CLI tool, which can be installed using the 
yarn tool we installed in the previous step.

## What We Will Be Building

Our todo application contains a list of ```Todo``` instances. It can add and remove todos. The todos are added by allowing a user to provide a todo description. Once they type a description and add the todo, the description is cleared so they can create another todo. 

## Creating the Todo Project

To create the project run the following command ```au new todos``` accepting all of the default options.

## The App Component

In Aurelia a component is made up of two files an Html file containing the view and a js file
containing the view model. 

The view model

```javascript
export class App {
  heading = 'Todos';
}
```
and the view 

```html
<template>
  <h1>${heading}</h1>
</template>
```
## Adding a Todo

One of the amazing things you can do with Aurelia, that you can't with any other framework or library, is model your entire application using plain ESNext, We think you will understand it when
you see it.

We are going to begin by creating a ```Todo``` class. Since we are making a Todo App, we will need a class to model out an individual Todo item. In the ```src``` folder of your project, create the following file: 

```javascript 
export class Todo {
  done = false;
  description = "";
  
  constructor(description){
    this.description = description;
  }
}
```

Update the App component view model.

```javascript
import { Todo } from "./todo";

export class App {
  heading = 'Todos';
  todos = [];
  todoDescription = "";

  addTodo() {
    if(this.todoDescription){
      this.todos.push(new Todo(this.todoDescription));
      this.todoDescription = "";
    }
  }
}
```
Update the App component view.

```html
<template>
  <h1>${heading}</h1>

  <form submit.trigger="addTodo()">
    <input type="text" value.bind="todoDescription">
    <button type="submit">add Todo</button>
  </form>
</template>
```

## Displaying the List of Todos

```html
<template>
  <h1>${heading}</h1>

  <form submit.trigger="addTodo()">
    <input type="text" value.bind="todoDescription">
    <button type="submit">add Todo</button>
  </form>
  
  <ul>
    <li repeat.for="todo of todos">
      <input type="checkbox" checked.bind="todo.done">
      <span>${todo.description}</span>
    </li>
  </ul>
</template>
```

## Removing a Todo

Update the  app view model.

```javascript
import { Todo } from "./todo";

export class App {
  heading = 'Todos';
  todos = [];
  todoDescription = "";

  addTodo() {
    if(this.todoDescription){
      this.todos.push(new Todo(this.todoDescription));
      this.todoDescription = "";
    }
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
```

Update the app view.

```html
<template>
  <h1>${heading}</h1>

  <form submit.trigger="addTodo()">
    <input type="text" value.bind="todoDescription">
    <button type="submit">add Todo</button>
  </form>
  
  <ul>
    <li repeat.for="todo of todos">
      <input type="checkbox" checked.bind="todo.done">
      <span>${todo.description}</span>
      <button click.trigger="removeTodo(todo)">Remove</button>
    </li>
  </ul>
</template>
```

### Marking a Todo Complete

update the app view.

```html
<template>
  <h1>${heading}</h1>

  <form submit.trigger="addTodo()">
    <input type="text" value.bind="todoDescription">
    <button type="submit">add Todo</button>
  </form>
  
  <ul>
    <li repeat.for="todo of todos">
      <input type="checkbox" checked.bind="todo.done">
      <span css="text-decoration: ${todo.done ? 'line-through' : 'none'}">${todo.description}</span>
      <button click.trigger="removeTodo(todo)">Remove</button>
    </li>
  </ul>
</template>
```
