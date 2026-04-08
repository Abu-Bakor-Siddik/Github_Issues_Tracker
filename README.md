1. What is the difference between var, let, and const?
=> var, let, and const are ways to declare variables in JavaScript. var is the older way and is function-scoped, which can sometimes lead to unexpected behavior. let is block-scoped and can be updated, so it’s safer to use in most cases. const is also block-scoped but cannot be reassigned, making it ideal for values that shouldn’t change.

2. What is the spread operator (...)?
=> The spread operator ... lets you expand arrays or objects easily. For example, you can combine arrays or copy objects without modifying the original. It’s a quick and clean way to work with multiple items in one line of code.

3. What is the difference between map(), filter(), and forEach()?
=> map(), filter(), and forEach() are array methods for working with lists. map() transforms each item and returns a new array. filter() keeps only the items that pass a certain condition and also returns a new array. forEach() loops over items but doesn’t return anything—it’s used for side effects like logging or updating the DOM.

4. What is an arrow function?
=> Arrow functions are a shorter, cleaner way to write functions in JavaScript. They also automatically inherit the this value from their parent scope, which avoids some common mistakes with regular functions.

5. What are template literals?
=> Template literals use backticks ` instead of quotes and let you include variables directly inside strings using ${}. They also allow multi-line strings without extra concatenation, making string formatting much easier and readable.