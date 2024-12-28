export const reactQuestions = [
  {
    id: "q1",
    text: "Which of the following definitions best describes React.js?",
    answers: [
      "A library to build user interfaces with help of declarative code.",
      "A library for managing state in web applications.",
      "A framework to build user interfaces with help of imperative code.",
      "A library used for building mobile applications only.",
    ],
  },
  {
    id: "q2",
    text: "What purpose do React hooks serve?",
    answers: [
      "Enabling the use of state and other React features in functional components.",
      "Creating responsive layouts in React applications.",
      "Handling errors within the application.",
      "Part of the Redux library for managing global state.",
    ],
  },
  {
    id: "q3",
    text: "Can you identify what JSX is?",
    answers: [
      "A JavaScript extension that adds HTML-like syntax to JavaScript.",
      "A JavaScript library for building dynamic user interfaces.",
      "A specific HTML version that was explicitly created for React.",
      "A tool for making HTTP requests in a React application.",
    ],
  },
  {
    id: "q4",
    text: "What is the most common way to create a component in React?",
    answers: [
      "By defining a JavaScript function that returns a renderable value.",
      "By defining a custom HTML tag in JavaScript.",
      "By creating a file with a .jsx extension.",
      'By using the "new" keyword followed by the component name.',
    ],
  },
  {
    id: "q5",
    text: 'What does the term "React state" imply?',
    answers: [
      "An object in a component that holds values and may cause the component to render on change.",
      "The lifecycle phase a React component is in.",
      "The overall status of a React application, including all props and components.",
      "A library for managing global state in React applications.",
    ],
  },
  {
    id: "q6",
    text: "How do you typically render list content in React apps?",
    answers: [
      "By using the map() method to iterate over an array of data and returning JSX.",
      "By using the for() loop to iterate over an array of data and returning JSX.",
      "By using the forEach() method to iterate over an array of data and returning JSX.",
      "By using the loop() method to iterate over an array of data and returning JSX.",
    ],
  },
  {
    id: "q7",
    text: "Which approach can NOT be used to render content conditionally?",
    answers: [
      "Using a the #if template syntax.",
      "Using a ternary operator.",
      "Using the && operator.",
      "Using an if-else statement.",
    ],
  },
  {
    id: "q8",
    text: "What is the primary purpose of the React Virtual DOM?",
    answers: [
      "Improving performance by minimizing direct manipulation of the real DOM.",
      "Providing direct access to the real DOM for faster rendering.",
      "Allowing React to manage application state more efficiently.",
      "Creating a lightweight version of the real DOM for debugging purposes.",
    ],
  },
  {
    id: "q9",
    text: "How do you pass data from a parent component to a child component in React?",
    answers: [
      "By using props to pass values.",
      "By using state to share values.",
      "By using the useContext hook.",
      "By defining the child component as a callback function.",
    ],
  },
  {
    id: "q10",
    text: "What is the role of the `key` prop in a list of React elements?",
    answers: [
      "It helps React identify which items have changed, are added, or are removed.",
      "It allows React to style the list elements dynamically.",
      "It defines the order in which list elements should appear.",
      "It is used to specify the type of data being rendered in the list.",
    ],
  },
  {
    id: "q11",
    text: "What does the `useEffect` hook primarily allow you to do?",
    answers: [
      "Perform side effects in function components.",
      "Create and manage stateful logic in a component.",
      "Trigger re-renders based on changes in the state.",
      "Handle error boundaries in React applications.",
    ],
  },
  {
    id: "q12",
    text: "What is the default behavior of React when a state is updated?",
    answers: [
      "It triggers a re-render of the component to reflect the updated state.",
      "It directly updates the DOM without re-rendering the component.",
      "It prevents re-renders and updates the state asynchronously.",
      "It only updates child components, leaving the parent untouched.",
    ],
  },
  {
    id: "q13",
    text: "Which method is used to update state in a class-based React component?",
    answers: ["setState()", "updateState()", "changeState()", "modifyState()"],
  },
  {
    id: "q14",
    text: "What is a React Fragment used for?",
    answers: [
      "Grouping multiple elements without adding an extra DOM node.",
      "Replacing a parent element with a single child.",
      "Rendering components conditionally in a single block.",
      "Managing the state of grouped components.",
    ],
  },
  {
    id: "q15",
    text: "How do you define default values for props in a React component?",
    answers: [
      "Using the defaultProps property of the component.",
      "Defining them inside the component's constructor.",
      "Passing them as arguments to the render function.",
      "Assigning values directly in the component's state.",
    ],
  },
  {
    id: "q16",
    text: "What is the purpose of React's Context API?",
    answers: [
      "To manage and share global state across components without passing props manually.",
      "To replace Redux as a global state management library.",
      "To optimize the rendering performance of React components.",
      "To provide a method for handling lifecycle events in functional components.",
    ],
  },
  {
    id: "q17",
    text: "What does the `useState` hook in React allow you to do?",
    answers: [
      "Add state management to functional components.",
      "Add lifecycle methods to functional components.",
      "Access the props of a component dynamically.",
      "Modify the DOM directly from a functional component.",
    ],
  },
];

export const javascriptQuestions = [
  {
    id: "js1",
    text: 'What is the output of "typeof NaN"?',
    answers: ["Number", "Undefined", "Object", "String"],
  },
  {
    id: "js2",
    text: "Which of the following is NOT a valid JavaScript data type?",
    answers: ["Boolean", "String", "Integer", "Symbol"],
  },
  {
    id: "js3",
    text: "What will the following code output? `console.log(0.1 + 0.2 === 0.3);`",
    answers: ["false", "true", "undefined", "TypeError"],
  },
  {
    id: "js4",
    text: "Which of the following methods can be used to combine two arrays?",
    answers: ["concat()", "push()", "slice()", "splice()"],
  },
  {
    id: "js5",
    text: "What is the purpose of the `Array.prototype.map` method in JavaScript?",
    answers: [
      "To create a new array with the results of calling a provided function on every element in the array.",
      "To filter elements of an array based on a condition.",
      "To find the first element in an array that satisfies a condition.",
      "To mutate the original array by applying a function to its elements.",
    ],
  },
  {
    id: "js6",
    text: "What is the result of `typeof null` in JavaScript?",
    answers: ["Object", "Null", "Undefined", "Error"],
  },
  {
    id: "js7",
    text: "What does the `===` operator do in JavaScript?",
    answers: [
      "Compares both value and type for equality.",
      "Compares only the value, ignoring the type.",
      "Checks if two variables reference the same object.",
      "Converts both values to strings and compares them.",
    ],
  },
  {
    id: "js8",
    text: "What will `console.log([] + {})` output in JavaScript?",
    answers: ["[object Object]", "{}", "[]{}", "undefined"],
  },
  {
    id: "js9",
    text: "Which method is used to remove the last element from an array?",
    answers: ["pop()", "shift()", "splice()", "slice()"],
  },
  {
    id: "js10",
    text: "What does the `let` keyword do in JavaScript?",
    answers: [
      "Declares a block-scoped variable.",
      "Declares a globally scoped variable.",
      "Declares a constant variable.",
      "Declares a variable that cannot be reassigned.",
    ],
  },
  {
    id: "js11",
    text: "Which of the following is a feature of JavaScript's `const` keyword?",
    answers: [
      "It declares a variable that cannot be reassigned.",
      "It creates a variable that is globally scoped.",
      "It creates a variable that can be hoisted but not initialized.",
      "It declares a variable that can change its type.",
    ],
  },
  {
    id: "js12",
    text: "What does `JSON.stringify` do in JavaScript?",
    answers: [
      "Converts a JavaScript object to a JSON string.",
      "Parses a JSON string into a JavaScript object.",
      "Formats a string for JSON encoding.",
      "Saves a JavaScript object to localStorage.",
    ],
  },
  {
    id: "js13",
    text: "Which of the following is true about JavaScript promises?",
    answers: [
      "They represent the eventual completion (or failure) of an asynchronous operation.",
      "They are used only for synchronous operations.",
      "They must always resolve successfully.",
      "They block the execution of other code until resolved.",
    ],
  },
  {
    id: "js14",
    text: "What will `console.log(1 + '2' + 3)` output?",
    answers: ["123", "6", "NaN", "15"],
  },
  {
    id: "js15",
    text: "What does the `bind` method of a function do?",
    answers: [
      "Creates a new function with a specific `this` context.",
      "Immediately invokes a function with a specific `this` context.",
      "Creates an event listener for a function.",
      "Modifies the original function's `this` context.",
    ],
  },
  {
    id: "js16",
    text: "What will `console.log(typeof undefined === typeof null)` output?",
    answers: ["false", "true", "undefined", "TypeError"],
  },
  {
    id: "js17",
    text: "What is the purpose of `Object.freeze` in JavaScript?",
    answers: [
      "To prevent modifications to an object.",
      "To prevent modifications to an object's methods only.",
      "To lock an object for garbage collection.",
      "To deep freeze all nested objects within an object.",
    ],
  },
  {
    id: "js18",
    text: "How do you check if a variable is an array in JavaScript?",
    answers: [
      "Using `Array.isArray(variable)`.",
      "Using `typeof variable === 'array'`.",
      "Using `variable instanceof Array`.",
      "Using `variable.constructor === 'Array'`.",
    ],
  },
  {
    id: "js19",
    text: "What will `console.log(!![])` output in JavaScript?",
    answers: ["true", "false", "undefined", "TypeError"],
  },
  {
    id: "js20",
    text: "Which of these is a valid way to declare a JavaScript function?",
    answers: [
      "function myFunction() {}",
      "func myFunction() {}",
      "def myFunction() {}",
      "method myFunction() {}",
    ],
  },
];

export const htmlCssQuestions = [
  {
    id: "html1",
    text: "What does HTML stand for?",
    answers: [
      "HyperText Markup Language",
      "Hyperlink Text Markup Language",
      "Home Tool Markup Language",
      "None of the above",
    ],
  },
  {
    id: "css1",
    text: "Which property is used to change the background color in CSS?",
    answers: ["background-color", "color", "background", "bgcolor"],
  },
  {
    id: "css2",
    text: "What does the z-index property in CSS control?",
    answers: [
      "The stack order of elements",
      "The zoom level of an element",
      "The size of an element",
      "The position of an element in the DOM",
    ],
  },
  {
    id: "css3",
    text: "How do you make text bold in CSS?",
    answers: [
      "font-weight: bold;",
      "text-style: bold;",
      "font-style: bold;",
      "text-weight: bold;",
    ],
  },
  [
    {
      id: "html2",
      text: "Which HTML element is used to define the largest heading?",
      answers: ["<h1>", "<heading>", "<h6>", "<head>"],
    },
    {
      id: "html3",
      text: "What is the purpose of the <alt> attribute in the <img> tag?",
      answers: [
        "To provide alternative text for an image if it cannot be displayed.",
        "To link the image to another webpage.",
        "To style the image with CSS.",
        "To set the resolution of the image.",
      ],
    },
    {
      id: "html4",
      text: "Which HTML tag is used to create an unordered list?",
      answers: ["<ul>", "<ol>", "<li>", "<list>"],
    },
    {
      id: "html5",
      text: "What does the <meta> tag in HTML provide?",
      answers: [
        "Metadata about the HTML document.",
        "A way to create links to other pages.",
        "A way to embed multimedia content.",
        "A structure for adding headers.",
      ],
    },
    {
      id: "html6",
      text: "Which attribute specifies a unique identifier for an HTML element?",
      answers: ["id", "class", "name", "tag"],
    },
    {
      id: "css4",
      text: "How do you add a comment in CSS?",
      answers: [
        "/* This is a comment */",
        "// This is a comment",
        "# This is a comment",
        "<!-- This is a comment -->",
      ],
    },
    {
      id: "css5",
      text: "Which property is used to change the text color of an element in CSS?",
      answers: ["color", "text-color", "font-color", "background-color"],
    },
    {
      id: "css6",
      text: "What is the default position value of an HTML element in CSS?",
      answers: ["static", "relative", "absolute", "fixed"],
    },
    {
      id: "css7",
      text: "Which CSS property is used to control the space between lines of text?",
      answers: ["line-height", "spacing", "text-spacing", "letter-spacing"],
    },
    {
      id: "css8",
      text: "What is the correct syntax to apply a class selector in CSS?",
      answers: [".classname", "#classname", "classname", "<classname>"],
    },
    {
      id: "css9",
      text: "How do you make an element take up the entire width of its parent container in CSS?",
      answers: [
        "width: 100%;",
        "width: auto;",
        "max-width: 100%;",
        "min-width: 100%;",
      ],
    },
    {
      id: "css10",
      text: "Which of the following pseudo-classes is used to style an element when it is hovered over?",
      answers: [":hover", ":focus", ":active", ":visited"],
    },
  ],
];
