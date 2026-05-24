/* =============================================
   30 DAYS OF PYTHON — CURRICULUM DATA (Days 1–11)
   Source: Asabeneh Yetayeh's 30-Days-Of-Python
   ============================================= */

const DAYS = [
  // ═══════════════════════════════════════════════
  // DAY 1 — INTRODUCTION
  // ═══════════════════════════════════════════════
  {
    day: 1,
    emoji: "🐍",
    title: "Introduction",
    subtitle:
      "Set up Python on your machine, write your very first program, and understand the building blocks of the language.",
    topics: [
      "Installation",
      "Python Shell",
      "Data Types",
      "Comments",
      "print()",
    ],

    lesson: `
    <div class="lesson-section">
      <h2>What is Python?</h2>
      <p>Python is a <strong>high-level, interpreted programming language</strong> designed for general-purpose programming. It was created by <strong>Guido van Rossum</strong> and first released in 1991. Python reads almost like plain English, which makes it one of the most beginner-friendly languages in the world.</p>
      <p>Python is used for web development, data science, machine learning, scripting, automation, APIs, and much more. Companies like Google, Instagram, Spotify, Netflix, and NASA use Python.</p>
      <div class="info-box success">
        <strong>Why Python?</strong>
        It is easy to learn, has a huge library ecosystem, works on every OS, and the job market demand is enormous.
      </div>

      <div class="section-divider"></div>
      <h2>Installing Python</h2>
      <p>Download Python from <strong>python.org</strong>. During installation on Windows, check <em>"Add Python to PATH"</em>. After installing, verify in your terminal:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">python3 --version</pre>
      <p>You should see something like <code>Python 3.11.0</code>. If you see a version number, Python is installed successfully.</p>
      <div class="info-box warning">
        <strong>Windows users:</strong> Use <code>python</code> instead of <code>python3</code> in the terminal.
      </div>

      <div class="section-divider"></div>
      <h2>The Python Shell</h2>
      <p>Python is an interpreted language — it executes code <strong>line by line</strong>. You can use the interactive shell to run code instantly. Open your terminal and type <code>python3</code> to start the shell:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#86efac;overflow-x:auto">&gt;&gt;&gt; print("Hello, World!")
Hello, World!
&gt;&gt;&gt; 2 + 3
5
&gt;&gt;&gt; type(10)
&lt;class 'int'&gt;</pre>
      <p>The <code>&gt;&gt;&gt;</code> prompt means Python is waiting for your input. Type a command, press Enter, and Python immediately shows the result.</p>

      <div class="section-divider"></div>
      <h2>Comments</h2>
      <p>Comments are notes in your code that Python ignores when running. They help explain what your code does. In Python, use the <code>#</code> symbol to write a comment:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto"># This is a single-line comment
print("Hello")   # This comment is at the end of a line

# You can also use triple quotes for multi-line comments:
'''
This is a
multi-line comment
'''</pre>

      <div class="section-divider"></div>
      <h2>Python Data Types</h2>
      <p>Every value in Python has a <strong>data type</strong>. Here are the core types you will use every day:</p>
      <table>
        <thead><tr><th>Type</th><th>Keyword</th><th>Example</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Integer</td><td><code>int</code></td><td><code>10, -3, 0</code></td><td>Whole numbers, no decimal</td></tr>
          <tr><td>Float</td><td><code>float</code></td><td><code>3.14, -9.81</code></td><td>Numbers with a decimal point</td></tr>
          <tr><td>String</td><td><code>str</code></td><td><code>"Hello"</code></td><td>Text in quotes</td></tr>
          <tr><td>Boolean</td><td><code>bool</code></td><td><code>True, False</code></td><td>True or False only</td></tr>
          <tr><td>List</td><td><code>list</code></td><td><code>[1, 2, 3]</code></td><td>Ordered, changeable collection</td></tr>
          <tr><td>Dictionary</td><td><code>dict</code></td><td><code>{"name": "Ali"}</code></td><td>Key-value pairs</td></tr>
          <tr><td>Tuple</td><td><code>tuple</code></td><td><code>(1, 2, 3)</code></td><td>Ordered, unchangeable collection</td></tr>
          <tr><td>Set</td><td><code>set</code></td><td><code>{1, 2, 3}</code></td><td>Unordered, unique items</td></tr>
        </tbody>
      </table>
      <p>Use <code>type(value)</code> to check what type a value is:</p>
      <div class="info-box">
        <strong>Try it:</strong> In the Python shell, type <code>type(3.14)</code> and press Enter. Python will tell you it's a <code>float</code>.
      </div>

    </div>
  `,

    examples: [
      {
        title: "Hello, World!",
        desc: "The very first Python program every developer writes.",
        code: `# Your first Python program
print("Hello, World!")
print("Welcome to 30 Days of Python!")`,
      },
      {
        title: "Python as a Calculator",
        desc: "Python can do math directly — integers, floats, and complex numbers.",
        code: `# Arithmetic in Python
print(2 + 3)      # 5
print(10 - 4)     # 6
print(3 * 7)      # 21
print(10 / 3)     # 3.3333...  (always gives a float)
print(10 // 3)    # 3          (floor division — drops the decimal)
print(10 % 3)     # 1          (modulus — the remainder)
print(2 ** 8)     # 256        (exponentiation: 2 to the power of 8)

# Floats
print(3.14)
print(9.81)

`,
      },
      {
        title: "Checking Data Types",
        desc: "Use type() to see what kind of data you are working with.",
        code: `# type() tells you the data type of any value
print(type(10))           # <class 'int'>
print(type(3.14))         # <class 'float'>
print(type("Hello"))      # <class 'str'>
print(type(True))         # <class 'bool'>
print(type([1, 2, 3]))    # <class 'list'>
print(type({"key": "v"})) # <class 'dict'>
print(type((1, 2)))       # <class 'tuple'>
print(type({1, 2, 3}))   # <class 'set'>`,
      },

      {
        title: "Your First .py File",
        desc: "Real Python programs are saved in .py files. This is what helloworld.py looks like.",
        code: `# helloworld.py
# Author: Your Name
# Date: Today

print(2 + 3)             # addition
print(3 - 1)             # subtraction
print(2 * 3)             # multiplication
print(3 / 2)             # division
print(3 ** 2)            # power
print(3 % 2)             # modulus (remainder)
print(3 // 2)            # floor division

print(type(10))
print(type(3.14))
print(type("Hello"))
print(type(True))`,
      },
    ],

    exercises: {
      level1: [
        "Check your Python version in the terminal using <code>python3 --version</code>.",
        "Open the Python interactive shell by typing <code>python3</code> in your terminal.",
        "Use the Python shell to calculate: <code>3 + 4</code>, <code>10 - 5</code>, <code>2 * 6</code>.",
        "Use <code>print()</code> to display your name on screen.",
        'Write a comment that says "My first Python comment" and then print "I am learning Python!".',
        'Use <code>print(type(10))</code>, <code>print(type(3.14))</code>, and <code>print(type("hello"))</code> to check data types.',

      ],
      level2: [
        "Create a file called <code>helloworld.py</code>. Print the result of every arithmetic operator: +, -, *, /, //, %, **.",
        "Print your full name, city, and country each on a separate line.",
        "Check the data types of: an integer, a float, a string, a boolean, a list, a tuple, a set, and a dictionary.",
        "Calculate and print: the area of a circle with radius 10 (use pi = 3.14). Formula: area = pi × r².",

      ],
      level3: [
        "Find the Euclidean distance between points (2, 2) and (6, 10). Formula: √((x2−x1)² + (y2−y1)²). Use Python math.",
        "Calculate how many seconds are in a year. Print the result with a label.",
        "Calculate and print the square and cube of the numbers 1, 2, 3, 4, and 5 using separate <code>print()</code> statements. Format each line as: <code>1  1  1</code>, <code>2  4  8</code>, etc.",

      ],
    },

    quiz: [
      {
        q: "What command do you run in the terminal to check your Python version?",
        opts: [
          "python3 --version",
          "python --check",
          "version python3",
          "py --info",
        ],
        answer: 0,
        explain:
          "python3 --version prints the installed Python version to the terminal.",
      },
      {
        q: "What symbol is used to write a comment in Python?",
        opts: [
          "// (double slash)",
          "# (hash)",
          "/* ... */ (block)",
          "-- (double dash)",
        ],
        answer: 1,
        explain:
          "In Python, anything after # on a line is treated as a comment and ignored when running the code.",
      },
      {
        q: "What does 10 // 3 evaluate to in Python?",
        opts: ["3.333", "3", "1", "0.333"],
        answer: 1,
        explain:
          "// is floor division — it divides and drops the decimal, giving you the whole number result: 3.",
      },
      {
        q: "Which function do you use to find the data type of a value?",
        opts: ["datatype()", "typeof()", "type()", "check()"],
        answer: 2,
        explain:
          'type(value) returns the class/type of any Python value, e.g. type(10) gives <class "int">.',
      },
      {
        q: "What is the result of 2 ** 8 in Python?",
        opts: ["16", "64", "256", "512"],
        answer: 2,
        explain:
          "** is the exponentiation operator. 2 ** 8 means 2 to the power of 8, which is 256.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 2 — VARIABLES & BUILT-IN FUNCTIONS
  // ═══════════════════════════════════════════════
  {
    day: 2,
    emoji: "📦",
    title: "Variables & Built-in Functions",
    subtitle:
      "Store data in variables, learn Python's naming rules, explore built-in functions, and work with data types and casting.",
    topics: [
      "Variables",
      "Data Types",
      "Built-in Functions",
      "Type Casting",
      "input()",
    ],

    lesson: `
    <div class="lesson-section">
      <h2>Built-in Functions</h2>
      <p>Python comes with many <strong>built-in functions</strong> that are always available — no import needed. These are tools Python gives you for free.</p>
      <table>
        <thead><tr><th>Function</th><th>What it does</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>print()</code></td><td>Display output to the screen</td><td><code>print("Hello")</code></td></tr>
          <tr><td><code>len()</code></td><td>Return the length of a string, list, etc.</td><td><code>len("Hello")</code> → 5</td></tr>
          <tr><td><code>type()</code></td><td>Return the data type</td><td><code>type(3.14)</code> → float</td></tr>
          <tr><td><code>int()</code></td><td>Convert to integer</td><td><code>int("10")</code> → 10</td></tr>
          <tr><td><code>float()</code></td><td>Convert to float</td><td><code>float(10)</code> → 10.0</td></tr>
          <tr><td><code>str()</code></td><td>Convert to string</td><td><code>str(99)</code> → "99"</td></tr>
          <tr><td><code>input()</code></td><td>Get text from the user</td><td><code>input("Name: ")</code></td></tr>
          <tr><td><code>min()</code></td><td>Smallest value in a sequence</td><td><code>min(3, 1, 5)</code> → 1</td></tr>
          <tr><td><code>max()</code></td><td>Largest value in a sequence</td><td><code>max(3, 1, 5)</code> → 5</td></tr>
          <tr><td><code>sum()</code></td><td>Sum of a list of numbers</td><td><code>sum([1,2,3])</code> → 6</td></tr>
          <tr><td><code>abs()</code></td><td>Absolute value (removes negative sign)</td><td><code>abs(-7)</code> → 7</td></tr>
          <tr><td><code>sorted()</code></td><td>Return a sorted copy of a list</td><td><code>sorted([3,1,2])</code></td></tr>
          <tr><td><code>help()</code></td><td>Show documentation for anything</td><td><code>help(str)</code></td></tr>
          <tr><td><code>dir()</code></td><td>List all attributes and methods of an object</td><td><code>dir(str)</code></td></tr>
          <tr><td><code>isinstance()</code></td><td>Check if a value is an instance of a given type</td><td><code>isinstance(x, int)</code></td></tr>
          <tr><td><code>round()</code></td><td>Round a number to N decimal places</td><td><code>round(3.7)</code> → 4</td></tr>
          <tr><td><code>pow()</code></td><td>Raise a number to a power</td><td><code>pow(2, 8)</code> → 256</td></tr>
        </tbody>
      </table>
      <div class="info-box">
        <strong>Tip:</strong> Run <code>help('keywords')</code> in the Python shell to see all reserved words you cannot use as variable names.
      </div>

      <div class="section-divider"></div>
      <h2>Variables</h2>
      <p>A <strong>variable</strong> is a named container that stores a value in memory. You create a variable by giving it a name and assigning it a value with <code>=</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">name = "Asabeneh"    # stores a string
age  = 250           # stores an integer
height = 1.80        # stores a float
is_married = True    # stores a boolean</pre>

      <h3>Variable Naming Rules</h3>
      <ul>
        <li>Must start with a <strong>letter</strong> or <strong>underscore</strong> — not a number</li>
        <li>Can only contain letters, numbers, and underscores</li>
        <li>Case-sensitive — <code>Name</code> and <code>name</code> are different variables</li>
        <li>Cannot be a Python reserved word like <code>if</code>, <code>for</code>, <code>True</code></li>
      </ul>
      <table>
        <thead><tr><th>✅ Valid</th><th>❌ Invalid</th></tr></thead>
        <tbody>
          <tr><td><code>first_name</code></td><td><code>first-name</code> (hyphen)</td></tr>
          <tr><td><code>_age</code></td><td><code>1age</code> (starts with number)</td></tr>
          <tr><td><code>year2024</code></td><td><code>first@name</code> (@ symbol)</td></tr>
          <tr><td><code>myVar</code></td><td><code>class</code> (reserved word)</td></tr>
        </tbody>
      </table>
      <div class="info-box success">
        <strong>Convention:</strong> Python developers use <code>snake_case</code> — all lowercase with underscores between words: <code>first_name</code>, <code>user_age</code>, <code>is_active</code>.
      </div>

      <div class="section-divider"></div>
      <h2>Declaring Multiple Variables</h2>
      <p>You can assign multiple variables on one line — very handy for related data:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#86efac;overflow-x:auto">first_name, last_name, country, age = 'Asabeneh', 'Yetayeh', 'Finland', 250
print(first_name, last_name, country, age)</pre>

      <div class="section-divider"></div>
      <h2>Data Types &amp; Type Casting</h2>
      <p><strong>Type casting</strong> means converting a value from one type to another. Python gives you conversion functions:</p>
      <ul>
        <li><code>int(x)</code> — converts x to an integer (cuts off the decimal)</li>
        <li><code>float(x)</code> — converts x to a float (adds .0)</li>
        <li><code>str(x)</code> — converts x to a string (wraps in quotes)</li>
        <li><code>list(x)</code> — converts x to a list (e.g. a string becomes a list of characters)</li>
        <li><code>bool(x)</code> — converts x to True or False</li>
      </ul>
      <div class="info-box warning">
        <strong>Watch out:</strong> <code>int("9.8")</code> raises an error! You must convert to float first: <code>int(float("9.8"))</code> gives 9.
      </div>

      <div class="section-divider"></div>
      <h2>Checking Types with isinstance()</h2>
      <p><code>isinstance(value, type)</code> returns <code>True</code> if <code>value</code> is of that type, <code>False</code> if not:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">x = 10
print(isinstance(x, int))    # True
print(isinstance(x, float))  # False
print(isinstance(x, str))    # False

name = "Alice"
print(isinstance(name, str)) # True</pre>
      <div class="info-box success">
        <strong>isinstance() vs type():</strong> Use <code>isinstance(x, int)</code> when you want to check "is this an int?" in real code. Use <code>type(x)</code> when you just want to <em>display</em> the type for debugging.
      </div>

      <div class="section-divider"></div>
      <h2>Getting User Input</h2>
      <p>The <code>input()</code> function pauses your program and waits for the user to type something. It <strong>always returns a string</strong> — even if the user types a number. You must cast it if you need arithmetic:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">name = input("What is your name? ")
age  = int(input("How old are you? "))   # cast string → int
print(f"Hello {name}, you are {age} years old.")

# Common pattern: get a number, do math
radius = float(input("Enter circle radius: "))
area = 3.14159 * radius ** 2
print(f"Area = {area:.2f}")</pre>
      <div class="info-box warning">
        <strong>Always cast input() when you need a number.</strong> If a user types "25" it is the <em>string</em> "25", not the integer 25. Trying <code>"25" + 5</code> will raise a <code>TypeError</code>.
      </div>
    </div>
  `,

    examples: [
      {
        title: "Declaring Variables",
        desc: "Store different types of data in named variables.",
        code: `first_name = 'Asabeneh'
last_name = 'Yetayeh'
country = 'Finland'
city = 'Helsinki'
age = 250
is_married = True
skills = ['HTML', 'CSS', 'JS', 'React', 'Python']
person_info = {
   'firstname': 'Asabeneh',
   'lastname': 'Yetayeh',
   'country': 'Finland',
   'city': 'Helsinki'
}

print('First name:', first_name)
print('Last name:', last_name)
print('Country:', country)
print('Age:', age)
print('Married:', is_married)
print('Skills:', skills)
print('Person info:', person_info)`,
      },
      {
        title: "Built-in Functions in Action",
        desc: "Practice the most common built-in functions.",
        code: `name = "Python Challenge"

print(len(name))           # 16 — length of the string
print(type(name))          # <class 'str'>
print(name.upper())        # PYTHON CHALLENGE
print(name.lower())        # python challenge

numbers = [10, 25, 3, 87, 42]
print(min(numbers))        # 3
print(max(numbers))        # 87
print(sum(numbers))        # 167
print(sorted(numbers))     # [3, 10, 25, 42, 87]
print(abs(-15))            # 15`,
      },
      {
        title: "Type Casting",
        desc: "Convert data from one type to another.",
        code: `# int to float
x = 10
print(float(x))         # 10.0

# float to int (decimal is cut off, NOT rounded)
gravity = 9.81
print(int(gravity))     # 9

# int to string
num = 42
num_as_str = str(num)
print(num_as_str)       # '42'
print(type(num_as_str)) # <class 'str'>

# string to list (splits into individual characters)
name = 'Asabeneh'
print(list(name))       # ['A', 's', 'a', 'b', 'e', 'n', 'e', 'h']

# Be careful with string to int
# int("9.8") would raise an ERROR — go through float first:
print(int(float("9.8"))) # 9`,
      },
      {
        title: "Multiple Variables & Input",
        desc: "Declare multiple variables at once and get user input.",
        code: `# Declare multiple variables on one line
first_name, last_name, country, age = 'Asabeneh', 'Yetayeh', 'Helsinki', 250
print(first_name, last_name, country, age)

# Getting user input
# (This will pause and wait for you to type in the terminal)
name = input('What is your name: ')
age  = int(input('How old are you? '))

radius = float(input('Enter circle radius: '))
pi = 3.14159
area = pi * radius ** 2
print(f'Hello {name}! Circle area: {area:.2f}')`,
      },
      {
        title: "isinstance() — check a value's type",
        desc: "Use isinstance() to check whether a value is of a given type.",
        code: `x = 42
print(isinstance(x, int))    # True
print(isinstance(x, float))  # False
print(isinstance(x, str))    # False

name = "Alice"
print(isinstance(name, str)) # True
print(isinstance(name, int)) # False`,
      },
    ],

    exercises: {
      level1: [
        'Create a <code>variables.py</code> file. Add the comment: <em>"Day 2: 30 Days of Python programming"</em>.',
        "Declare variables: <code>first_name</code>, <code>last_name</code>, <code>country</code>, <code>city</code>, <code>age</code>. Print each one.",
        "Declare: <code>is_married = True</code>, <code>is_true = True</code>, <code>is_light_on = False</code>. Print each.",
        "Declare all 10 variables from exercises 2 and 3 in a <strong>single line</strong> using multiple assignment.",
        "Print the length of your first name using <code>len()</code>.",
        "Compare: does your first name have more characters than your last name? Print the result.",
        "Use <code>isinstance()</code> to check if <code>age</code> is an <code>int</code>, and if <code>first_name</code> is a <code>str</code>. Print the results.",

      ],
      level2: [
        "Use <code>type()</code> on every variable you declared (first_name, age, is_married, etc.). Print each type.",
        "Declare <code>num_one = 5</code> and <code>num_two = 4</code>. Perform all 7 arithmetic operations and store results in variables. Print each with a label.",
        "Calculate the <strong>area</strong> and <strong>circumference</strong> of a circle with radius 30 meters. (Area = π×r², Circumference = 2×π×r, use pi = 3.14). Print both results.",
        "Ask the user for their first name, last name, country, and age using <code>input()</code>. Print a formatted sentence with all 4 values.",


        "Ask the user to type a number with <code>input()</code>. Print the type before casting (should be <code>str</code>). Cast it to <code>int</code> and print the type again.",
      ],
      level3: [
        "Write a program that asks for a radius and prints both the area and circumference of the circle, formatted to 2 decimal places.",
        "Write a program that takes two numbers from the user and prints: their sum, difference, product, division, floor division, modulus, and power.",
        "Write a program that takes any value from the user, tries to cast it to <code>int</code>, and prints the result. Try entering a word — what happens?",
      ],
    },

    quiz: [
      {
        q: "Which of these is a valid Python variable name?",
        opts: ["1st_name", "first-name", "first_name", "first name"],
        answer: 2,
        explain:
          "Variable names cannot start with a number, contain hyphens, or have spaces. first_name (snake_case) is valid.",
      },
      {
        q: "What does input() always return?",
        opts: [
          "An integer",
          "A float",
          "A string",
          "Whatever type the user enters",
        ],
        answer: 2,
        explain:
          "input() always returns a string, even if the user types a number. You must convert with int() or float() if needed.",
      },
      {
        q: 'What is the result of int(float("9.8"))?',
        opts: ["Error", "10", "9", "9.8"],
        answer: 2,
        explain:
          'First float("9.8") converts to 9.8, then int(9.8) drops the decimal giving 9. int() truncates, it does NOT round.',
      },
      {
        q: "Which built-in function returns the number of characters in a string?",
        opts: ["size()", "count()", "length()", "len()"],
        answer: 3,
        explain:
          'len("Hello") returns 5. len() works on strings, lists, tuples, dicts, and other sequences.',
      },
      {
        q: 'What does list("abc") return?',
        opts: ['"abc"', "['abc']", "['a', 'b', 'c']", "abc"],
        answer: 2,
        explain:
          'list() converts a string into a list of individual characters: list("abc") = ["a", "b", "c"].',
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 3 — OPERATORS
  // ═══════════════════════════════════════════════
  {
    day: 3,
    emoji: "➕",
    title: "Operators",
    subtitle:
      "Master arithmetic, comparison, logical, and assignment operators — the tools Python uses to do calculations and make decisions.",
    topics: [
      "Arithmetic",
      "Comparison",
      "Logical",
      "Assignment",
      "Membership",
    ],

    lesson: `
    <div class="lesson-section">
      <h2>Arithmetic Operators</h2>
      <p>Arithmetic operators perform mathematical calculations on numbers.</p>
      <table>
        <thead><tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td><code>+</code></td><td>Addition</td><td><code>5 + 3</code></td><td>8</td></tr>
          <tr><td><code>-</code></td><td>Subtraction</td><td><code>5 - 3</code></td><td>2</td></tr>
          <tr><td><code>*</code></td><td>Multiplication</td><td><code>5 * 3</code></td><td>15</td></tr>
          <tr><td><code>/</code></td><td>Division</td><td><code>7 / 2</code></td><td>3.5 (always float)</td></tr>
          <tr><td><code>//</code></td><td>Floor Division</td><td><code>7 // 2</code></td><td>3 (drops decimal)</td></tr>
          <tr><td><code>%</code></td><td>Modulus (remainder)</td><td><code>7 % 2</code></td><td>1</td></tr>
          <tr><td><code>**</code></td><td>Exponentiation</td><td><code>2 ** 8</code></td><td>256</td></tr>
        </tbody>
      </table>
      <div class="info-box">
        <strong>Modulus trick:</strong> <code>n % 2 == 0</code> tells you if a number is even. If the remainder of dividing by 2 is 0, it's even.
      </div>

      <div class="section-divider"></div>
      <h2>Comparison Operators</h2>
      <p>Comparison operators <strong>compare two values</strong> and always return <code>True</code> or <code>False</code>.</p>
      <table>
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td><code>==</code></td><td>Equal to</td><td><code>3 == 3</code></td><td>True</td></tr>
          <tr><td><code>!=</code></td><td>Not equal to</td><td><code>3 != 4</code></td><td>True</td></tr>
          <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>5 &gt; 3</code></td><td>True</td></tr>
          <tr><td><code>&lt;</code></td><td>Less than</td><td><code>3 &lt; 5</code></td><td>True</td></tr>
          <tr><td><code>&gt;=</code></td><td>Greater than or equal</td><td><code>5 &gt;= 5</code></td><td>True</td></tr>
          <tr><td><code>&lt;=</code></td><td>Less than or equal</td><td><code>4 &lt;= 5</code></td><td>True</td></tr>
        </tbody>
      </table>
      <div class="info-box warning">
        <strong>Common mistake:</strong> Don't confuse <code>=</code> (assignment — stores a value) with <code>==</code> (comparison — checks equality).
      </div>

      <div class="section-divider"></div>
      <h2>Logical Operators</h2>
      <p>Logical operators combine multiple comparisons into one condition.</p>
      <table>
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td><code>and</code></td><td>True only if BOTH sides are true</td><td><code>3 &gt; 2 and 4 &gt; 3</code></td><td>True</td></tr>
          <tr><td><code>or</code></td><td>True if AT LEAST ONE side is true</td><td><code>3 &gt; 2 or 4 &lt; 3</code></td><td>True</td></tr>
          <tr><td><code>not</code></td><td>Flips True to False and vice versa</td><td><code>not True</code></td><td>False</td></tr>
        </tbody>
      </table>

      <div class="section-divider"></div>
      <h2>Membership Operators</h2>
      <table>
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>in</code></td><td>Value exists in sequence</td><td><code>'a' in 'cat'</code> → True</td></tr>
          <tr><td><code>not in</code></td><td>Value does NOT exist in sequence</td><td><code>'z' not in 'cat'</code> → True</td></tr>
        </tbody>
      </table>

      <div class="section-divider"></div>
      <h2>Assignment Operators</h2>
      <p>Assignment operators are shortcuts for updating a variable's value:</p>
      <table>
        <thead><tr><th>Operator</th><th>Same as</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>x = 5</code></td><td>—</td><td>Assign 5 to x</td></tr>
          <tr><td><code>x += 3</code></td><td><code>x = x + 3</code></td><td>Add 3 to x</td></tr>
          <tr><td><code>x -= 2</code></td><td><code>x = x - 2</code></td><td>Subtract 2 from x</td></tr>
          <tr><td><code>x *= 4</code></td><td><code>x = x * 4</code></td><td>Multiply x by 4</td></tr>
          <tr><td><code>x /= 2</code></td><td><code>x = x / 2</code></td><td>Divide x by 2</td></tr>
          <tr><td><code>x **= 2</code></td><td><code>x = x ** 2</code></td><td>Square x</td></tr>
          <tr><td><code>x //= 3</code></td><td><code>x = x // 3</code></td><td>Floor-divide x by 3</td></tr>
        </tbody>
      </table>

    </div>
  `,

    examples: [
      {
        title: "Arithmetic Operators",
        desc: "All seven arithmetic operators with real-world calculations.",
        code: `# All arithmetic operators
print('Addition: ', 1 + 2)        # 3
print('Subtraction: ', 2 - 1)     # 1
print('Multiplication: ', 2 * 3)  # 6
print('Division: ', 4 / 2)        # 2.0  (always float)
print('Floor division: ', 7 // 2) # 3
print('Modulus: ', 3 % 2)         # 1
print('Exponent: ', 2 ** 3)       # 8

# Real-world example: geometry
radius = 10
pi = 3.14
area_of_circle = pi * radius ** 2
print('Circle area:', area_of_circle)  # 314.0

length, width = 10, 20
area_of_rectangle = length * width
print('Rectangle area:', area_of_rectangle)  # 200

# Physics
mass = 75
gravity = 9.81
weight = mass * gravity
print(f'Weight: {weight} N')  # 735.75 N`,
      },
      {
        title: "Comparison Operators",
        desc: "Comparing values — these always return True or False.",
        code: `print(3 > 2)     # True
print(3 >= 2)    # True
print(3 < 2)     # False
print(2 < 3)     # True
print(3 == 2)    # False
print(3 != 2)    # True

# Comparing string lengths
print(len('mango') == len('avocado'))  # False (5 vs 7)
print(len('milk') == len('meat'))      # True  (4 vs 4)
print(len('python') > len('dragon'))   # False (6 == 6)

# Comparing booleans
print(True == True)    # True
print(True == False)   # False
print(False == False)  # True`,
      },
      {
        title: "Logical Operators",
        desc: "Combine conditions with and, or, not.",
        code: `print(3 > 2 and 4 > 3)  # True  — both true
print(3 > 2 and 4 < 3)  # False — second is false
print(3 < 2 and 4 < 3)  # False — both false

print(3 > 2 or 4 > 3)   # True  — both true
print(3 > 2 or 4 < 3)   # True  — first is true
print(3 < 2 or 4 < 3)   # False — both false

print(not 3 > 2)   # False — 3>2 is True, not True = False
print(not True)    # False
print(not False)   # True

# Membership
print('A' in 'Asabeneh')         # True
print('coding' in 'coding for all')  # True
print('z' not in 'python')       # True`,
      },

      {
        title: "Real-World Operator Practice",
        desc: "Practical calculations using operators together.",
        code: `# Slope between two points
x1, y1 = 2, 2
x2, y2 = 6, 10
slope = (y2 - y1) / (x2 - x1)
print(f'Slope: {slope}')  # 2.0

# Euclidean distance
distance = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
print(f'Distance: {distance}')  # 8.944...

# Weekly pay calculator
hours_per_day = 8
days_per_week = 5
rate_per_hour = 25
weekly_pay = hours_per_day * days_per_week * rate_per_hour
print('Weekly pay: $' + str(weekly_pay))  # $1000

# Check if number is even
n = 42
print(f'{n} is even: {n % 2 == 0}')  # True`,
      },
    ],

    exercises: {
      level1: [
        "Declare <code>age</code> as an integer and <code>height</code> as a float. Print both.",
        "Write a script that asks for a triangle's base and height, then prints the area. (area = 0.5 × b × h)",
        "Write a script that asks for 3 sides of a triangle and prints its perimeter. (perimeter = a + b + c)",
        "Get a circle radius from the user and print both the area and circumference. (area = π×r², circumference = 2×π×r, use pi = 3.14)",
        'Find the length of strings "python" and "dragon". Make a comparison statement that returns False.',
      ],
      level2: [
        "Calculate the slope of the line y = 2x − 2. Find x-intercept (set y=0) and y-intercept (set x=0).",
        "Find the slope and Euclidean distance between points (2, 2) and (6, 10).",
        "Compare the slopes from the previous two exercises using <code>==</code> and print the result.",
        "Write a script that asks for hours worked and rate per hour, then prints weekly pay.",
        "Write a script that asks for years lived, then prints the total number of seconds in that person's life (assume 365 days/year, 24 hours/day, 3600 seconds/hour).",
      ],
      level3: [
        "Use modulus to calculate <code>7 % 2</code> and <code>8 % 2</code>. Print the results. What does a remainder of 0 tell you about whether a number is even?",
        "Verify: does <code>7 // 3</code> give the same result as <code>int(2.7)</code>? Print the comparison.",
        'Check: does <code>type("10")</code> equal <code>type(10)</code>? What does this tell you?',
        "Find when y = x² + 6x + 9 equals zero. Test x = -3. What do you notice?",
      ],
    },

    quiz: [
      {
        q: "What does 10 % 3 return?",
        opts: ["3", "0", "1", "3.33"],
        answer: 2,
        explain:
          "% is the modulus operator — it returns the remainder of division. 10 ÷ 3 = 3 remainder 1.",
      },
      {
        q: "Which operator checks if two values are EQUAL?",
        opts: ["=", "===", "==", "equals"],
        answer: 2,
        explain:
          "== compares two values. = is assignment (stores a value). Never confuse these two!",
      },
      {
        q: 'What does "3 > 2 and 4 < 3" evaluate to?',
        opts: ["True", "False", "Error", "None"],
        answer: 1,
        explain:
          "and requires BOTH sides to be True. 3 > 2 is True, but 4 < 3 is False. True and False = False.",
      },
      {
        q: 'What does "not True" evaluate to?',
        opts: ["True", "False", "0", "None"],
        answer: 1,
        explain:
          "The not operator flips a boolean. not True gives False. not False gives True.",
      },
      {
        q: "x = 10; x += 5. What is x now?",
        opts: ["5", "10", "15", "50"],
        answer: 2,
        explain: "x += 5 is shorthand for x = x + 5. So 10 + 5 = 15.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 4 — STRINGS
  // ═══════════════════════════════════════════════
  {
    day: 4,
    emoji: "📝",
    title: "Strings",
    subtitle:
      "Strings are the most common data type. Learn to create, format, slice, index, and use 30+ built-in string methods.",
    topics: [
      "String Creation",
      "Indexing",
      "Slicing",
      "Formatting",
      "String Methods",
      "f-strings",
    ],

    lesson: `
    <div class="lesson-section">
      <h2>Creating Strings</h2>
      <p>A string is any text wrapped in quotes. Python accepts single quotes, double quotes, or triple quotes:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">letter = 'P'                    # single character
word   = "Hello"                 # double quotes — same result
sentence = 'I love Python!'      # single quotes

# Triple quotes: great for multi-line strings
poem = """Roses are red,
Violets are blue,
Python is awesome,
And so are you."""</pre>

      <h3>String Concatenation</h3>
      <p>Join strings with the <code>+</code> operator:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#86efac;overflow-x:auto">first = 'Asabeneh'
last  = 'Yetayeh'
full  = first + ' ' + last
print(full)    # Asabeneh Yetayeh</pre>

      <div class="section-divider"></div>
      <h2>Escape Sequences</h2>
      <table>
        <thead><tr><th>Sequence</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code>\\n</code></td><td>New line — moves to the next line</td></tr>
          <tr><td><code>\\t</code></td><td>Tab — inserts a horizontal tab</td></tr>
          <tr><td><code>\\\\</code></td><td>Backslash — prints a literal \</td></tr>
          <tr><td><code>\\'</code></td><td>Single quote inside single-quoted string</td></tr>
          <tr><td><code>\\"</code></td><td>Double quote inside double-quoted string</td></tr>
        </tbody>
      </table>

      <div class="section-divider"></div>
      <h2>String Formatting</h2>
      <p>There are 3 ways to format strings in Python. The modern recommended way is <strong>f-strings</strong> (Python 3.6+):</p>
      <table>
        <thead><tr><th>Method</th><th>Example</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Old % style</td><td><code>'Hello %s' % name</code></td><td>Legacy, avoid in new code</td></tr>
          <tr><td>.format()</td><td><code>'Hello {}'.format(name)</code></td><td>Works in Python 2 &amp; 3</td></tr>
          <tr><td>f-string</td><td><code>f'Hello {name}'</code></td><td>✅ Recommended — fastest &amp; clearest</td></tr>
        </tbody>
      </table>
      <div class="info-box success">
        <strong>Use f-strings:</strong> Write <code>f'...'</code> before the opening quote, then put any variable or expression inside <code>{curly braces}</code>.
      </div>

      <div class="section-divider"></div>
      <h2>String Indexing &amp; Slicing</h2>
      <p>Strings are sequences of characters. Every character has an index (position number) starting from 0.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">  P  y  t  h  o  n
  0  1  2  3  4  5   ← positive index
 -6 -5 -4 -3 -2 -1   ← negative index</pre>
      <ul>
        <li><code>word[0]</code> → first character ('P')</li>
        <li><code>word[-1]</code> → last character ('n')</li>
        <li><code>word[0:3]</code> → characters from index 0 up to (not including) 3 → 'Pyt'</li>
        <li><code>word[::2]</code> → every other character → 'Pto'</li>
        <li><code>word[::-1]</code> → the string reversed → 'nohtyP'</li>
      </ul>

      <div class="section-divider"></div>
      <h2>Key String Methods</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">upper()</div><div class="cheatsheet-desc">Convert to UPPERCASE</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">lower()</div><div class="cheatsheet-desc">Convert to lowercase</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">capitalize()</div><div class="cheatsheet-desc">First letter uppercase</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">title()</div><div class="cheatsheet-desc">Title Case Each Word</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">strip()</div><div class="cheatsheet-desc">Remove leading/trailing spaces</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">split()</div><div class="cheatsheet-desc">Split string into a list</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">join()</div><div class="cheatsheet-desc">Join list into a string</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">replace()</div><div class="cheatsheet-desc">Replace part of string</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">find()</div><div class="cheatsheet-desc">Find first occurrence (returns index, -1 if not found)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">count()</div><div class="cheatsheet-desc">Count occurrences of substring</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">startswith()</div><div class="cheatsheet-desc">Check if starts with text</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">endswith()</div><div class="cheatsheet-desc">Check if ends with text</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">isalpha()</div><div class="cheatsheet-desc">All letters? True/False</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">isdigit()</div><div class="cheatsheet-desc">All digits (0-9 only)? True/False</div></div>
      </div>

    </div>
  `,

    examples: [
      {
        title: "String Indexing & Slicing",
        desc: "Access individual characters and extract substrings.",
        code: `language = 'Python'
print(language[0])     # P  — first character
print(language[-1])    # n  — last character
print(language[-2])    # o  — second to last

# Slicing: [start:stop:step]
print(language[0:3])   # Pyt — index 0,1,2 (not 3)
print(language[3:])    # hon — from index 3 to end
print(language[:3])    # Pyt — from start up to (not including) 3
print(language[::2])   # Pto — every other character

# Reverse a string using step -1
print(language[::-1])  # nohtyP

greeting = 'Hello, World!'
print(greeting[::-1])  # !dlroW ,olleH`,
      },
      {
        title: "F-Strings & String Formatting",
        desc: "The 3 ways to format strings — f-strings are the best.",
        code: `first_name = 'Asabeneh'
last_name = 'Yetayeh'
language = 'Python'

# Old % style (legacy)
old = 'I am %s %s. I teach %s' % (first_name, last_name, language)
print(old)

# .format() method
fmt = 'I am {} {}. I teach {}'.format(first_name, last_name, language)
print(fmt)

# f-string (recommended)
fstr = f'I am {first_name} {last_name}. I teach {language}.'
print(fstr)

# f-strings can do math inside {}
a, b = 4, 3
print(f'{a} + {b} = {a + b}')     # 4 + 3 = 7
print(f'{a} / {b} = {a / b:.2f}') # 4 / 3 = 1.33

# Circle with 2 decimal places
radius = 10
pi = 3.14159
print(f'Circle area = {pi * radius**2:.2f}')  # 314.16`,
      },
      {
        title: "Essential String Methods",
        desc: "The most commonly used string methods with examples.",
        code: `challenge = 'thirty days of python'

# Case methods
print(challenge.upper())         # THIRTY DAYS OF PYTHON
print(challenge.lower())         # thirty days of python
print(challenge.capitalize())    # Thirty days of python
print(challenge.title())         # Thirty Days Of Python

# Search methods
print(challenge.find('y'))       # 5  (first occurrence)
print(challenge.count('y'))      # 3
print(challenge.startswith('thirty'))  # True
print(challenge.endswith('on'))        # True

# Modification
print(challenge.replace('python', 'coding'))  # thirty days of coding

# Split & Join
words = challenge.split()
print(words)        # ['thirty', 'days', 'of', 'python']
print(' '.join(words))             # thirty days of python
print('# '.join(words))           # thirty# days# of# python

# Validation
print('ThirtyDays'.isalpha())     # True
print('123'.isdigit())            # True`,
      },
      {
        title: "Escape Sequences & Multiline Strings",
        desc: "Control how text is displayed using escape characters.",
        code: `# Newline: \n moves to next line
print('I am enjoying Python.\nAre you?')

# Tab: \t adds horizontal spacing
print('Days\tTopics\tExercises')
print('Day 1\t5\t5')
print('Day 2\t6\t20')
print('Day 3\t5\t23')

# Backslash: \\\ prints a literal backslash
print('This is a backslash: \\\\')

# Quotes inside strings
print('She said \\"Hello!\\"')
print("It's a beautiful day")

# Triple-quoted multiline string
bio = """Name: Asabeneh Yetayeh
Country: Finland
City: Helsinki
Skills: Python, JavaScript, React"""
print(bio)`,
      },
    ],

    exercises: {
      level1: [
        "Concatenate 'Thirty', 'Days', 'Of', 'Python' into one string: \"Thirty Days Of Python\".",
        'Declare <code>company = "Coding For All"</code>. Print it, then print its length.',
        'Change "Coding For All" to all <strong>uppercase</strong>, then all <strong>lowercase</strong>.',
        'Apply <code>capitalize()</code> and <code>title()</code> to "Coding For All". Print both results.',
        'Slice out the first word ("Coding") from "Coding For All".',
        'Check if "Coding For All" contains the word "Coding" using <code>find()</code> or <code>in</code>.',
        'Replace "Coding" with "Python" in "Coding For All". Print the result.',
        'Split "Facebook, Google, Microsoft, Apple, IBM" at commas into a list.',
      ],
      level2: [
        'Find the position of "because" in: "You cannot end a sentence with because because because is a conjunction". Use <code>find()</code>.',
        'Slice the phrase "because because because" out of that sentence.',
        "Join the list <code>['Django', 'Flask', 'Bottle', 'Pyramid', 'Falcon']</code> with '# ' separator.",
        "Use newline escape to print two sentences on separate lines.",
        "Use a tab escape to format a Name / Age / Country table for a person.",
        'Format: "The area of a circle with radius 10 is 314 meters square." Use an f-string, calculate the real result.',
      ],
      level3: [
        'Write a program that takes any sentence from the user and creates an acronym from the first letter of each word (e.g. "Python For Everyone" → "PFE").',
        "Print the arithmetic table using f-strings: for a=8, b=6, print +, -, *, /, //, %, ** with formatted output.",
      ],
    },

    quiz: [
      {
        q: 'What does language[-1] return if language = "Python"?',
        opts: ['"P"', '"y"', '"n"', "Error"],
        answer: 2,
        explain:
          'Negative indexing counts from the end. -1 is the last character, which is "n" in "Python".',
      },
      {
        q: 'What does "hello world".split() return?',
        opts: [
          '"hello", "world"',
          '["hello", "world"]',
          '["h","e","l","l","o"," ","w","o","r","l","d"]',
          "Error",
        ],
        answer: 1,
        explain:
          'split() with no argument splits on whitespace and returns a list of words: ["hello", "world"].',
      },
      {
        q: "Which string formatting method is recommended in modern Python?",
        opts: ["% operator", ".format()", "f-strings", "str.concat()"],
        answer: 2,
        explain:
          'f-strings (f"Hello {name}") are the fastest, most readable, and recommended since Python 3.6.',
      },
      {
        q: 'What does "Python"[::-1] return?',
        opts: ["Python", "nohtyP", "Pto", "Error"],
        answer: 1,
        explain:
          '[::-1] slices the entire string with a step of -1, which reverses it: "nohtyP".',
      },
      {
        q: 'What does "thirty days".count("y") return?',
        opts: ["1", "2", "3", "0"],
        answer: 1,
        explain:
          'count() counts occurrences. "y" appears in "thirt**y**" and "da**y**s" — 2 times.',
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 5 — LISTS
  // ═══════════════════════════════════════════════
  {
    day: 5,
    emoji: "📋",
    title: "Lists",
    subtitle:
      "Lists are ordered, mutable collections that can hold any data type. Learn to create, access, modify, and use all list methods.",
    topics: [
      "Creating Lists",
      "Indexing",
      "Slicing",
      "List Methods",
      "Sorting",
      "Membership",
    ],

    lesson: `
    <div class="lesson-section">
      <h2>What is a List?</h2>
      <p>A <strong>list</strong> is an ordered, <strong>mutable</strong> (changeable) collection of items. Lists can hold any data type — even other lists. They use square brackets <code>[]</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">empty_list = []
fruits = ['banana', 'orange', 'mango', 'lemon']
numbers = [1, 2, 3, 4, 5]
mixed = [1, 'hello', True, 3.14, [1, 2]]  # any mix of types
</pre>
      <div class="info-box">
        <strong>Key properties:</strong> Lists are <strong>ordered</strong> (items keep their position), <strong>mutable</strong> (you can add/remove/change items), and <strong>allow duplicates</strong>.
      </div>

      <div class="section-divider"></div>
      <h2>Accessing Items</h2>
      <p>Just like strings, lists use <strong>zero-based indexing</strong>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#86efac;overflow-x:auto">fruits = ['banana', 'orange', 'mango', 'lemon']
#            0          1        2        3      ← positive index
#           -4         -3       -2       -1      ← negative index

print(fruits[0])    # banana  — first item
print(fruits[-1])   # lemon   — last item
print(fruits[1:3])  # ['orange', 'mango']  — slicing</pre>

      <div class="section-divider"></div>
      <h2>Modifying Lists</h2>
      <p>Lists are mutable — you can change any item by index:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">fruits[0] = 'avocado'   # Replace first item
print(fruits)  # ['avocado', 'orange', 'mango', 'lemon']</pre>

      <div class="section-divider"></div>
      <h2>List Methods</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">append(item)</div><div class="cheatsheet-desc">Add item to the END</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">insert(i, item)</div><div class="cheatsheet-desc">Insert at specific index i</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">remove(item)</div><div class="cheatsheet-desc">Remove first occurrence of item</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">pop()</div><div class="cheatsheet-desc">Remove & return last item (or by index)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">del list[i]</div><div class="cheatsheet-desc">Delete item at index i</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">clear()</div><div class="cheatsheet-desc">Remove ALL items, keep the list</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">copy()</div><div class="cheatsheet-desc">Create an independent copy</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">extend(list2)</div><div class="cheatsheet-desc">Add all items from another list</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">sort()</div><div class="cheatsheet-desc">Sort the list IN PLACE (ascending)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">sorted(list)</div><div class="cheatsheet-desc">Return a new sorted copy</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">reverse()</div><div class="cheatsheet-desc">Reverse the list IN PLACE</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">index(item)</div><div class="cheatsheet-desc">Find position of first occurrence</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">count(item)</div><div class="cheatsheet-desc">Count occurrences of item</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">len(list)</div><div class="cheatsheet-desc">Number of items in list</div></div>
      </div>
      <div class="info-box warning">
        <strong>sort() vs sorted():</strong> <code>list.sort()</code> modifies the original list and returns None. <code>sorted(list)</code> returns a new sorted list and leaves the original unchanged.
      </div>

      <div class="section-divider"></div>
      <h2>Checking Membership</h2>
      <p>Use <code>in</code> and <code>not in</code> to check if an item exists in a list:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#86efac;overflow-x:auto">fruits = ['banana', 'orange', 'mango']
print('mango' in fruits)     # True
print('apple' in fruits)     # False
print('apple' not in fruits) # True</pre>
    </div>
  `,

    examples: [
      {
        title: "Creating & Accessing Lists",
        desc: "Different ways to create lists and access their items.",
        code: `# Empty lists
empty = list()
also_empty = []

# Lists of different types
fruits = ['banana', 'orange', 'mango', 'lemon']
numbers = [1, 2, 3, 4, 5]
mixed = ['Asabeneh', 250, True, {'country': 'Finland'}]

# Accessing items
print(fruits[0])       # banana (first)
print(fruits[-1])      # lemon  (last)
print(fruits[1:3])     # ['orange', 'mango']
print(fruits[::-1])    # ['lemon', 'mango', 'orange', 'banana'] (reversed)

# Length
print(len(fruits))     # 4

# Checking membership
print('mango' in fruits)       # True
print('apple' not in fruits)   # True`,
      },
      {
        title: "Modifying Lists",
        desc: "Add, insert, remove, and change items in a list.",
        code: `fruits = ['banana', 'orange', 'mango', 'lemon']

# Change an item by index
fruits[0] = 'avocado'
print(fruits)  # ['avocado', 'orange', 'mango', 'lemon']

# append — adds to the END
fruits.append('apple')
print(fruits)  # ['avocado', 'orange', 'mango', 'lemon', 'apple']

# insert — adds at a specific position
fruits.insert(2, 'grape')
print(fruits)  # ['avocado', 'orange', 'grape', 'mango', 'lemon', 'apple']

# remove — removes first occurrence of value
fruits.remove('avocado')
print(fruits)  # ['orange', 'grape', 'mango', 'lemon', 'apple']

# pop — removes by index (default: last item) and RETURNS it
last = fruits.pop()
print(last)    # apple
first = fruits.pop(0)
print(first)   # orange
print(fruits)  # ['grape', 'mango', 'lemon']

# del — deletes without returning
del fruits[0]
print(fruits)  # ['mango', 'lemon']`,
      },
      {
        title: "Sorting, Reversing & Copying",
        desc: "Sort, reverse, and safely copy lists.",
        code: `fruits = ['banana', 'orange', 'mango', 'lemon', 'apple']
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# sort() — modifies original, returns None
fruits.sort()
print(fruits)         # ['apple', 'banana', 'lemon', 'mango', 'orange']

fruits.sort(reverse=True)
print(fruits)         # ['orange', 'mango', 'lemon', 'banana', 'apple']

# sorted() — returns NEW sorted list, original unchanged
nums_sorted = sorted(numbers)
print(nums_sorted)    # [1, 1, 2, 3, 4, 5, 6, 9]
print(numbers)        # [3, 1, 4, 1, 5, 9, 2, 6]  unchanged!

# reverse() — reverses in place
fruits.reverse()
print(fruits)         # ['apple', 'banana', 'lemon', 'mango', 'orange']

# copy — creates INDEPENDENT copy (not just a reference)
fruits_copy = fruits.copy()
fruits_copy.append('kiwi')
print(fruits)         # original unchanged
print(fruits_copy)    # has kiwi`,
      },
      {
        title: "Joining Lists & Unpacking",
        desc: "Combine lists and unpack their values into variables.",
        code: `front_end = ['HTML', 'CSS', 'JS', 'React', 'Redux']
back_end = ['Node', 'Express', 'MongoDB']

# Joining with +
full_stack = front_end + back_end
print(full_stack)

# Joining with extend (modifies in place)
combined = front_end.copy()
combined.extend(back_end)

# Count and index
ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]
print(ages.count(24))   # 3
print(ages.index(24))   # 3 (first occurrence)
print(min(ages))        # 19
print(max(ages))        # 26
print(sum(ages) / len(ages))  # average`,
      },
    ],

    exercises: {
      level1: [
        "Create an empty list called <code>empty_list</code>.",
        "Declare a list called <code>it_companies</code> with: Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon. Print it.",
        "Print the first company, the middle company, and the last company.",
        "Modify one company name and print the updated list.",
        "Add a new IT company to the end of the list using <code>append()</code>.",
        "Insert a company in the middle of the list using <code>insert()</code>.",
        "Change one company name (not IBM) to uppercase.",
        'Join the companies with the string <code>"# "</code> separator using <code>join()</code>.',
        'Check if "Google" is in the list using <code>in</code>.',
        "Sort the list alphabetically using <code>sort()</code>, then reverse it.",
        "Slice the first 3 companies. Slice the last 3 companies.",
        "Remove the first, middle, and last company one by one.",
      ],
      level2: [
        "Join these two lists: <code>front_end = ['HTML', 'CSS', 'JS', 'React', 'Redux']</code> and <code>back_end = ['Node', 'Express', 'MongoDB']</code>.",
        'Copy the joined list into <code>full_stack</code>. Insert "Python" and "SQL" after "Redux".',
        "Given <code>ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]</code>: sort it, find min/max, calculate average, and find the range (max - min).",
        "From <code>['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']</code>, store the first item in <code>first</code>, the second in <code>second</code>, and print both.",
      ],
      level3: [
        "From the ages list, calculate: the median (middle value after sorting), the mean (average), and compare how far the min and max are from the mean using <code>abs()</code>.",
        "Given a list of 10 countries, find the middle country. If the list has odd length use the middle index; if even, use both middle items.",
      ],
    },

    quiz: [
      {
        q: "What is the index of the LAST item in a list using negative indexing?",
        opts: ["0", "-0", "-1", "len(list)"],
        answer: 2,
        explain:
          "Negative indexing counts from the end. -1 is always the last item, -2 is second to last, etc.",
      },
      {
        q: "What is the difference between sort() and sorted()?",
        opts: [
          "No difference — they do the same thing",
          "sort() returns a new list; sorted() modifies original",
          "sort() modifies original and returns None; sorted() returns a new sorted list",
          "sorted() only works on numbers",
        ],
        answer: 2,
        explain:
          "list.sort() modifies the list in place and returns None. sorted(list) leaves the original unchanged and returns a new sorted list.",
      },
      {
        q: "What does fruits.pop() do?",
        opts: [
          "Removes the first item only",
          "Removes and returns the last item (or item at given index)",
          "Returns the last item without removing it",
          "Crashes if the list is empty",
        ],
        answer: 1,
        explain:
          "pop() with no argument removes and returns the LAST item. pop(0) removes and returns the FIRST item.",
      },
      {
        q: "How do you add an item to the END of a list?",
        opts: [
          "list.add(item)",
          "list.push(item)",
          "list.insert(item)",
          "list.append(item)",
        ],
        answer: 3,
        explain:
          "append() always adds to the end. insert(i, item) adds at a specific index. Python has no push() or add() for lists.",
      },
      {
        q: "What does fruits.index('mango') return for ['banana', 'orange', 'mango', 'lemon']?",
        opts: ["1", "2", "3", "'mango'"],
        answer: 1,
        explain:
          "index() returns the position (0-based) of the first match. 'mango' is at index 2.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 6 — TUPLES
  // ═══════════════════════════════════════════════
  {
    day: 6,
    emoji: "📦",
    title: "Tuples",
    subtitle: "Learn about tuples — ordered, unchangeable collections — and how to create, access, slice, and use them.",
    topics: ["Creating Tuples", "Indexing", "Slicing", "Tuple Methods", "Unpacking", "Immutability"],

    lesson: `
    <div class="lesson-section">
      <h2>What is a Tuple?</h2>
      <p>A <strong>tuple</strong> is an ordered collection of items, just like a list — but with one key difference: <strong>tuples cannot be changed after creation</strong>. This is called being <strong>immutable</strong>.</p>
      <p>Tuples are written with <strong>round brackets <code>()</code></strong>, and items are separated by commas.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ('banana', 'orange', 'mango', 'lemon')
numbers = (1, 2, 3, 4, 5)
mixed  = ('Alice', 25, True, 3.14)</pre>
      <div class="info-box success">
        <strong>When to use a tuple vs a list?</strong> Use a tuple when your data should not change — like days of the week, GPS coordinates, or RGB color values. Use a list when your data will be modified.
      </div>

      <div class="section-divider"></div>
      <h2>Creating Tuples</h2>
      <p>You can create an empty tuple or a tuple with items:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Empty tuple
empty = ()
empty = tuple()

# Tuple with items
fruits = ('banana', 'orange', 'mango', 'lemon')
print(len(fruits))   # 4 — len() works on tuples just like lists</pre>

      <div class="section-divider"></div>
      <h2>Accessing Items — Indexing</h2>
      <p>Tuples use <strong>zero-based indexing</strong>, exactly like lists. The first item is at index <code>0</code>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ('banana', 'orange', 'mango', 'lemon')
print(fruits[0])   # banana
print(fruits[1])   # orange
print(fruits[-1])  # lemon  ← negative index counts from the end
print(fruits[-2])  # mango</pre>

      <div class="section-divider"></div>
      <h2>Slicing Tuples</h2>
      <p>You can grab a <strong>sub-section</strong> of a tuple using slice notation <code>[start:end]</code>. The end index is <em>not</em> included.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ('banana', 'orange', 'mango', 'lemon')
print(fruits[1:3])   # ('orange', 'mango')
print(fruits[0:])    # all items
print(fruits[-3:-1]) # ('orange', 'mango')</pre>

      <div class="section-divider"></div>
      <h2>Tuple Immutability</h2>
      <p>Tuples <strong>cannot be changed</strong>. If you try to assign a new value to an index, Python raises a <code>TypeError</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#f87171;overflow-x:auto">fruits = ('banana', 'orange', 'mango', 'lemon')
fruits[0] = 'apple'  # ❌ TypeError: 'tuple' object does not support item assignment</pre>
      <p>If you <em>need</em> to change a tuple, convert it to a list first, make your change, then convert back:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#86efac;overflow-x:auto">fruits = ('banana', 'orange', 'mango', 'lemon')
fruits_list = list(fruits)      # convert to list
fruits_list[0] = 'apple'        # change it
fruits = tuple(fruits_list)     # convert back
print(fruits)  # ('apple', 'orange', 'mango', 'lemon')</pre>

      <div class="section-divider"></div>
      <h2>Tuple Methods</h2>
      <p>Because tuples can't be changed, they have only <strong>two methods</strong>:</p>
      <table>
        <thead><tr><th>Method</th><th>What it does</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>count(x)</code></td><td>Count how many times <code>x</code> appears</td><td><code>t.count('a')</code></td></tr>
          <tr><td><code>index(x)</code></td><td>Find the index of the first <code>x</code></td><td><code>t.index('a')</code></td></tr>
        </tbody>
      </table>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ('banana', 'orange', 'mango', 'lemon', 'orange')
print(fruits.count('orange'))  # 2
print(fruits.index('mango'))   # 2</pre>

      <div class="section-divider"></div>
      <h2>Joining Tuples</h2>
      <p>You can combine two tuples using the <code>+</code> operator. This creates a brand new tuple:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ('banana', 'orange', 'mango')
veggies = ('tomato', 'potato', 'carrot')
combined = fruits + veggies
print(combined)
# ('banana', 'orange', 'mango', 'tomato', 'potato', 'carrot')</pre>

      <div class="section-divider"></div>
      <h2>Checking Membership</h2>
      <p>Use <code>in</code> to check if an item exists in a tuple:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ('banana', 'orange', 'mango', 'lemon')
print('orange' in fruits)   # True
print('apple' in fruits)    # False</pre>

      <div class="section-divider"></div>
      <h2>Tuple Packing &amp; Unpacking</h2>
      <p><strong>Packing</strong> means grouping multiple values into a tuple. <strong>Unpacking</strong> means assigning each tuple item to its own variable:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Packing — create a tuple without parentheses
coordinates = 10, 20, 30   # same as (10, 20, 30)

# Unpacking — assign each value to a variable
x, y, z = coordinates
print(x, y, z)   # 10 20 30

# Swap two variables in ONE line (no temp variable needed!)
a, b = 5, 10
a, b = b, a
print(a, b)   # 10 5</pre>
      <div class="info-box success">
        <strong>The swap trick:</strong> <code>a, b = b, a</code> is one of Python's most elegant features. It works because the right side is packed into a tuple first, then unpacked to the left.
      </div>

      <div class="section-divider"></div>
      <h2>Deleting a Tuple</h2>
      <p>You can't remove items from a tuple, but you can delete the entire tuple variable with <code>del</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ('banana', 'orange', 'mango')
del fruits
# fruits no longer exists</pre>

    </div>
    `,

    examples: [
      {
        title: "Creating and Accessing Tuples",
        desc: "Create tuples and access items by positive and negative index.",
        code: `fruits = ('banana', 'orange', 'mango', 'lemon')

print(len(fruits))    # 4

# Positive indexing
print(fruits[0])      # banana
print(fruits[1])      # orange
print(fruits[-1])     # lemon (last item)
print(fruits[-2])     # mango`,
      },
      {
        title: "Slicing a Tuple",
        desc: "Extract a portion of a tuple using start:end slice notation.",
        code: `fruits = ('banana', 'orange', 'mango', 'lemon')

print(fruits[1:3])    # ('orange', 'mango')
print(fruits[0:])     # all items
print(fruits[:2])     # ('banana', 'orange')
print(fruits[-3:-1])  # ('orange', 'mango')`,
      },
      {
        title: "Modifying via List Conversion",
        desc: "Tuples are immutable — to change one, convert to list, modify, convert back.",
        code: `fruits = ('banana', 'orange', 'mango', 'lemon')
print("Original:", fruits)

# Convert → change → convert back
fruits_list = list(fruits)
fruits_list[0] = 'apple'
fruits = tuple(fruits_list)

print("Modified:", fruits)
# ('apple', 'orange', 'mango', 'lemon')`,
      },
      {
        title: "Tuple Methods: count() and index()",
        desc: "The two methods available on tuples.",
        code: `fruits = ('banana', 'orange', 'mango', 'lemon', 'orange')

# count() — how many times does 'orange' appear?
print(fruits.count('orange'))  # 2

# index() — at what position is 'mango'?
print(fruits.index('mango'))   # 2

# Joining tuples with +
veggies = ('tomato', 'potato', 'carrot')
food = fruits + veggies
print(food)`,
      },
      {
        title: "Membership Test and Unpacking",
        desc: "Check if an item is in a tuple, and unpack tuple values into variables.",
        code: `fruits = ('banana', 'orange', 'mango', 'lemon')

# Membership check
print('orange' in fruits)   # True
print('apple' in fruits)    # False

# Unpacking — assign each item to a variable
first, second, third, fourth = fruits
print(first)   # banana
print(fourth)  # lemon`,
      },
      {
        title: "Swapping Variables with Tuples",
        desc: "Swap two values without a temp variable using tuple unpacking.",
        code: `a = 'hello'
b = 'world'
print(f"Before: a={a}, b={b}")

# Swap in one line using tuple unpacking
a, b = b, a
print(f"After:  a={a}, b={b}")
# Before: a=hello, b=world
# After:  a=world, b=hello

# Works with numbers too
x, y = 100, 200
x, y = y, x
print(x, y)  # 200 100`,
      },

    ],

    exercises: {
      level1: [
        "Create an empty tuple two different ways (using <code>()</code> and using <code>tuple()</code>).",
        "Create a tuple called <code>siblings</code> with the names of 3 people (real or made up).",
        "Print the first and last item of your <code>siblings</code> tuple using indexing.",
        "Find the length of your <code>siblings</code> tuple using <code>len()</code>.",
        "Check if a name is <code>in</code> your <code>siblings</code> tuple and print <code>True</code> or <code>False</code>.",
        "Create a <code>parents</code> tuple with 2 names, then join <code>siblings</code> and <code>parents</code> into a <code>family</code> tuple using <code>+</code>.",
      ],
      level2: [
        "Create three tuples: <code>fruits</code>, <code>vegetables</code>, and <code>animal_products</code>. Join them into one tuple called <code>food</code>.",
        "Convert your <code>food</code> tuple into a list, then slice out just the middle items.",
        "Use <code>count()</code> to check how many times a specific item appears in a tuple.",
        "Convert a tuple to a list, change the first item, then convert it back to a tuple and print the result.",
        "Unpack a 4-item tuple into 4 separate variables, then print each one.",
        "Check if <code>'Iceland'</code> and <code>'Estonia'</code> are in the tuple <code>('Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden')</code>.",
      ],
      level3: [
        "Create a tuple of 10 numbers. Slice it into three parts: first third, middle third, last third. Print each.",
        "Write a program that takes a list with duplicate items, converts it to a tuple, and prints both the list and tuple lengths to show duplicates are preserved.",
        "Create a nested tuple like <code>((1,2),(3,4),(5,6))</code> and access the value <code>4</code> using double indexing.",

      ],
    },

    quiz: [
      {
        q: "Which bracket type is used to create a tuple in Python?",
        opts: ["Square brackets []", "Curly brackets {}", "Round brackets ()", "Angle brackets <>"],
        answer: 2,
        explain: "Tuples are created with round brackets (). For example: fruits = ('apple', 'mango').",
      },
      {
        q: "What happens if you try to change an item in a tuple?",
        opts: ["The item is changed silently", "Python raises a TypeError", "Python raises a ValueError", "The tuple becomes a list"],
        answer: 1,
        explain: "Tuples are immutable. Trying to assign fruits[0] = 'apple' raises a TypeError.",
      },
      {
        q: "How many built-in methods do tuples have?",
        opts: ["0", "1", "2", "Many, same as lists"],
        answer: 2,
        explain: "Tuples have exactly two methods: count() and index(). They have no add, remove, or sort methods.",
      },
      {
        q: "What does fruits.index('mango') return for ('banana', 'orange', 'mango', 'lemon')?",
        opts: ["1", "2", "3", "'mango'"],
        answer: 1,
        explain: "index() returns the position (0-based) of the first match. 'mango' is at index 2.",
      },
      {
        q: "What is the correct way to join two tuples t1 and t2?",
        opts: ["t1.append(t2)", "t1 + t2", "t1.extend(t2)", "join(t1, t2)"],
        answer: 1,
        explain: "Use the + operator to join tuples: t1 + t2 creates a new tuple containing all items from both.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 7 — SETS
  // ═══════════════════════════════════════════════
  {
    day: 7,
    emoji: "🔵",
    title: "Sets",
    subtitle: "Discover sets — unordered collections of unique items — and master set operations like union, intersection, and difference.",
    topics: ["Creating Sets", "Adding & Removing", "Set Operations", "Union", "Intersection", "Difference"],

    lesson: `
    <div class="lesson-section">
      <h2>What is a Set?</h2>
      <p>A <strong>set</strong> is a collection of <strong>unordered, unique items</strong>. This means:</p>
      <ul>
        <li><strong>No duplicates</strong> — adding the same item twice has no effect.</li>
        <li><strong>No guaranteed order</strong> — you can't access items by index.</li>
        <li><strong>Very fast membership checks</strong> — checking <code>x in my_set</code> is extremely quick.</li>
      </ul>
      <p>Sets are written with <strong>curly brackets <code>{}</code></strong>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = {'banana', 'orange', 'mango', 'lemon'}
numbers = {1, 2, 3, 4, 5}</pre>
      <div class="info-box warning">
        <strong>Careful:</strong> <code>{}</code> by itself creates an empty <em>dictionary</em>, not an empty set! To create an empty set, use <code>set()</code>.
      </div>

      <div class="section-divider"></div>
      <h2>Creating Sets</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Empty set — must use set(), not {}
empty = set()

# Set with items
fruits = {'banana', 'orange', 'mango', 'lemon'}
print(len(fruits))   # 4

# Convert a list to a set (removes duplicates!)
names = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob']
unique_names = set(names)
print(unique_names)  # {'Alice', 'Bob', 'Charlie'}</pre>

      <div class="section-divider"></div>
      <h2>Adding Items</h2>
      <p>Use <code>add()</code> for one item, or <code>update()</code> for multiple items:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = {'banana', 'orange', 'mango'}
fruits.add('lemon')              # add one item
fruits.update(['grape', 'kiwi']) # add multiple items
print(fruits)</pre>

      <div class="section-divider"></div>
      <h2>Removing Items</h2>
      <table>
        <thead><tr><th>Method</th><th>Behaviour</th></tr></thead>
        <tbody>
          <tr><td><code>remove(x)</code></td><td>Removes <code>x</code>. Raises <code>KeyError</code> if not found.</td></tr>
          <tr><td><code>discard(x)</code></td><td>Removes <code>x</code>. Does <em>nothing</em> if not found (safe).</td></tr>
          <tr><td><code>pop()</code></td><td>Removes and returns a <em>random</em> item.</td></tr>
          <tr><td><code>clear()</code></td><td>Empties the entire set.</td></tr>
        </tbody>
      </table>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = {'banana', 'orange', 'mango', 'lemon'}
fruits.remove('orange')   # removes 'orange'
fruits.discard('grape')   # no error even though 'grape' isn't there
print(fruits)</pre>

      <div class="section-divider"></div>
      <h2>Set Operations</h2>
      <p>Sets support <strong>mathematical operations</strong> you may remember from school:</p>

      <h3>Union — combine all items from both sets</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A.union(B))   # {1, 2, 3, 4, 5, 6}
print(A | B)        # same thing with | operator</pre>

      <h3>Intersection — only items in BOTH sets</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A.intersection(B))  # {3, 4}
print(A & B)               # same thing</pre>

      <h3>Difference — items in A but NOT in B</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A.difference(B))  # {1, 2}  ← in A but not B
print(B.difference(A))  # {5, 6}  ← in B but not A</pre>

      <h3>Symmetric Difference — items in either set, but NOT both</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A.symmetric_difference(B))  # {1, 2, 5, 6}</pre>

      <div class="section-divider"></div>
      <h2>Subset, Superset & Disjoint</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">evens = {0, 2, 4, 6, 8, 10}
whole = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

print(evens.issubset(whole))    # True  — all evens are in whole
print(whole.issuperset(evens))  # True  — whole contains all of evens

odds = {1, 3, 5, 7, 9}
print(evens.isdisjoint(odds))   # True  — no items in common</pre>

      <div class="section-divider"></div>
      <h2>Understanding Union, Intersection, Difference — Visually</h2>
      <p>Think of two overlapping circles (a Venn diagram). Each operation picks a different part:</p>
      <div class="cheatsheet-grid">
        <div>
          <strong>Union (A | B)</strong><br>
          Everything in either circle — all items from both sets combined, duplicates removed.
          <pre style="background:var(--bg-code);padding:12px 16px;border-radius:8px;margin:8px 0;font-family:'Fira Code',monospace;font-size:13px;color:#a5b4fc;overflow-x:auto">{1,2,3} | {3,4,5}
# {1, 2, 3, 4, 5}</pre>
        </div>
        <div>
          <strong>Intersection (A &amp; B)</strong><br>
          Only the overlapping middle — items that appear in BOTH sets.
          <pre style="background:var(--bg-code);padding:12px 16px;border-radius:8px;margin:8px 0;font-family:'Fira Code',monospace;font-size:13px;color:#a5b4fc;overflow-x:auto">{1,2,3} &amp; {3,4,5}
# {3}</pre>
        </div>
        <div>
          <strong>Difference (A - B)</strong><br>
          Only the left circle — items in A that are NOT in B.
          <pre style="background:var(--bg-code);padding:12px 16px;border-radius:8px;margin:8px 0;font-family:'Fira Code',monospace;font-size:13px;color:#a5b4fc;overflow-x:auto">{1,2,3} - {3,4,5}
# {1, 2}</pre>
        </div>
        <div>
          <strong>Symmetric Difference (A ^ B)</strong><br>
          Both circles but NOT the overlap — items in either set but not shared.
          <pre style="background:var(--bg-code);padding:12px 16px;border-radius:8px;margin:8px 0;font-family:'Fira Code',monospace;font-size:13px;color:#a5b4fc;overflow-x:auto">{1,2,3} ^ {3,4,5}
# {1, 2, 4, 5}</pre>
        </div>
      </div>

      <div class="section-divider"></div>
      <h2>Complete Set Methods Reference</h2>
      <table>
        <thead><tr><th>Method</th><th>What it does</th><th>Raises error?</th></tr></thead>
        <tbody>
          <tr><td><code>.add(x)</code></td><td>Add item <code>x</code> to the set</td><td>No</td></tr>
          <tr><td><code>.remove(x)</code></td><td>Remove <code>x</code> — errors if missing</td><td>Yes (KeyError)</td></tr>
          <tr><td><code>.discard(x)</code></td><td>Remove <code>x</code> — silent if missing</td><td>No</td></tr>
          <tr><td><code>.pop()</code></td><td>Remove and return a random item</td><td>Yes if empty</td></tr>
          <tr><td><code>.clear()</code></td><td>Remove all items</td><td>No</td></tr>
          <tr><td><code>.union(B)</code> or <code>A|B</code></td><td>All items from A and B</td><td>No</td></tr>
          <tr><td><code>.intersection(B)</code> or <code>A&amp;B</code></td><td>Items in both A and B</td><td>No</td></tr>
          <tr><td><code>.difference(B)</code> or <code>A-B</code></td><td>Items in A but not in B</td><td>No</td></tr>
          <tr><td><code>.symmetric_difference(B)</code> or <code>A^B</code></td><td>Items in either but not both</td><td>No</td></tr>
          <tr><td><code>.issubset(B)</code></td><td>True if all A items are in B</td><td>No</td></tr>
          <tr><td><code>.issuperset(B)</code></td><td>True if A contains all of B</td><td>No</td></tr>
          <tr><td><code>.isdisjoint(B)</code></td><td>True if A and B share no items</td><td>No</td></tr>
          <tr><td><code>.copy()</code></td><td>Return a shallow copy of the set</td><td>No</td></tr>
        </tbody>
      </table>

    </div>
    `,

    examples: [
      {
        title: "Creating Sets and Removing Duplicates",
        desc: "Sets automatically remove duplicate items — great for finding unique values.",
        code: `# Normal set
fruits = {'banana', 'orange', 'mango', 'lemon'}
print(fruits)
print(len(fruits))  # 4

# Convert list to set — duplicates removed!
ages = [22, 19, 24, 25, 26, 24, 25, 24]
unique_ages = set(ages)
print(unique_ages)
print("List length:", len(ages), "| Set length:", len(unique_ages))`,
      },
      {
        title: "Adding and Removing Items",
        desc: "Use add(), update(), remove(), and discard() to manage set contents.",
        code: `companies = {'Google', 'Apple', 'Microsoft'}

companies.add('Amazon')                    # add one
companies.update(['Meta', 'Netflix'])      # add multiple
print("After adding:", companies)

companies.remove('Netflix')               # remove (raises error if missing)
companies.discard('Oracle')               # safe remove (no error if missing)
print("After removing:", companies)`,
      },
      {
        title: "Union and Intersection",
        desc: "Combine sets or find what they have in common.",
        code: `python_skills = {'Python', 'Django', 'Flask'}
js_skills = {'JavaScript', 'React', 'Node', 'Python'}

# Union — all skills from both
all_skills = python_skills.union(js_skills)
print("All skills:", all_skills)

# Intersection — skills in BOTH
shared = python_skills.intersection(js_skills)
print("Shared skills:", shared)`,
      },
      {
        title: "Difference and Symmetric Difference",
        desc: "Find what's unique to each set.",
        code: `A = {19, 22, 24, 20, 25, 26}
B = {19, 22, 20, 25, 26, 24, 28, 27}

# Difference: in A but not B
print("Only in A:", A.difference(B))  # set()

# Difference: in B but not A
print("Only in B:", B.difference(A))  # {28, 27}

# Symmetric difference: in either but not both
print("Not shared:", A.symmetric_difference(B))`,
      },
      {
        title: "Subset, Superset, Disjoint",
        desc: "Check the relationship between two sets.",
        code: `whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
even_numbers  = {0, 2, 4, 6, 8, 10}
odd_numbers   = {1, 3, 5, 7, 9}

print(even_numbers.issubset(whole_numbers))    # True
print(whole_numbers.issuperset(even_numbers))  # True
print(even_numbers.isdisjoint(odd_numbers))    # True — no overlap`,
      },
      {
        title: "Operator Shortcuts for Set Operations",
        desc: "Use |, &, -, ^ operators instead of method names.",
        code: `A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# All four operations with operators
print("Union:              ", A | B)   # {1, 2, 3, 4, 5, 6}
print("Intersection:       ", A & B)   # {3, 4}
print("Difference (A - B): ", A - B)   # {1, 2}
print("Sym. Difference:    ", A ^ B)   # {1, 2, 5, 6}

# These are equivalent to the method calls:
print(A.union(B) == A | B)              # True
print(A.intersection(B) == A & B)      # True`,
      },

    ],

    exercises: {
      level1: [
        "Create an empty set using <code>set()</code> (not <code>{}</code>) and print its type.",
        "Create a set called <code>it_companies</code> with: <code>'Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon'</code>.",
        "Print the length of <code>it_companies</code>.",
        "Add <code>'Twitter'</code> to <code>it_companies</code> using <code>add()</code>.",
        "Remove one company from <code>it_companies</code> using <code>remove()</code>.",
        "Explain in a comment: what is the difference between <code>remove()</code> and <code>discard()</code>?",
      ],
      level2: [
        "Given <code>A = {19, 22, 24, 20, 25, 26}</code> and <code>B = {19, 22, 20, 25, 26, 24, 28, 27}</code> — find the union of A and B.",
        "Find the intersection of A and B.",
        "Check if A is a subset of B using <code>issubset()</code>.",
        "Check if A and B are disjoint sets.",
        "Find the symmetric difference between A and B.",
        "Delete both sets completely using <code>del</code>.",
      ],
      level3: [
        "Given <code>age = [22, 19, 24, 25, 26, 24, 25, 24]</code> — convert to a set and compare lengths. Which is bigger and why?",
        "Write a program that finds the unique letters shared between the words <code>'python'</code> and <code>'dragon'</code> using set intersection.",
        "Given this sentence: <code>'I am a teacher and I love to inspire and teach people'</code> — use <code>split()</code> and <code>set()</code> to find how many unique words it contains.",
        "Redo the union, intersection, difference, and symmetric difference from level 2 using <strong>operator shortcuts</strong> (<code>|</code>, <code>&amp;</code>, <code>-</code>, <code>^</code>) instead of method calls. Confirm the results are the same.",

      ],
    },

    quiz: [
      {
        q: "What makes sets different from lists?",
        opts: ["Sets are ordered and allow duplicates", "Sets are unordered and only store unique items", "Sets use square brackets", "Sets can only hold numbers"],
        answer: 1,
        explain: "Sets are unordered (no index) and automatically remove duplicates, so each item is stored only once.",
      },
      {
        q: "How do you create an empty set in Python?",
        opts: ["{}", "[]", "set()", "empty_set()"],
        answer: 2,
        explain: "{} creates an empty dictionary, not a set. You must use set() to create an empty set.",
      },
      {
        q: "What does A.intersection(B) return for A = {1,2,3} and B = {2,3,4}?",
        opts: ["{1, 2, 3, 4}", "{2, 3}", "{1, 4}", "{1}"],
        answer: 1,
        explain: "intersection() returns only items that appear in BOTH sets. 2 and 3 are in both A and B.",
      },
      {
        q: "Which method safely removes an item without raising an error if it doesn't exist?",
        opts: ["remove()", "pop()", "discard()", "delete()"],
        answer: 2,
        explain: "discard() removes the item if it exists, and does nothing if it doesn't. remove() raises a KeyError if the item is missing.",
      },
      {
        q: "What does A.symmetric_difference(B) return for A = {1,2,3} and B = {3,4,5}?",
        opts: ["{3}", "{1, 2, 4, 5}", "{1, 2, 3, 4, 5}", "{}"],
        answer: 1,
        explain: "Symmetric difference returns items that are in either set but NOT in both. 3 is shared so it's excluded.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 8 — DICTIONARIES
  // ═══════════════════════════════════════════════
  {
    day: 8,
    emoji: "📖",
    title: "Dictionaries",
    subtitle: "Master dictionaries — Python's key-value store — to label, organize, and look up data with ease.",
    topics: ["Creating Dicts", "Accessing Values", "Adding & Modifying", "Removing Items", "Keys & Values", "Nested Dicts"],

    lesson: `
    <div class="lesson-section">
      <h2>What is a Dictionary?</h2>
      <p>A <strong>dictionary</strong> is a collection of <strong>key: value pairs</strong>. Instead of accessing items by a number (like lists do), you access them by a <strong>key</strong> — usually a descriptive string.</p>
      <p>Dictionaries are written with <strong>curly brackets <code>{}</code></strong>, with each pair separated by a comma:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">person = {
    'name': 'Alice',
    'age': 25,
    'city': 'New York'
}
print(person['name'])  # Alice</pre>
      <div class="info-box success">
        <strong>Think of it like a contact card:</strong> each field (name, age, city) is a key, and the actual data is the value.
      </div>

      <div class="section-divider"></div>
      <h2>Creating a Dictionary</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Empty dictionary
empty = {}

# Dictionary with values — values can be ANY type
person = {
    'first_name': 'Asabeneh',
    'last_name': 'Yetayeh',
    'age': 250,
    'is_married': True,
    'skills': ['JavaScript', 'React', 'Python'],   # list as a value!
    'address': {'street': 'Space street', 'zipcode': '02210'}  # nested dict!
}
print(len(person))  # 6</pre>

      <div class="section-divider"></div>
      <h2>Accessing Values</h2>
      <p>There are two ways to get a value from a dictionary:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">person = {'name': 'Alice', 'age': 25, 'city': 'NY'}

# Method 1: square bracket — raises KeyError if key doesn't exist
print(person['name'])   # Alice

# Method 2: .get() — returns None if key doesn't exist (safer)
print(person.get('age'))     # 25
print(person.get('email'))   # None  ← no error!</pre>
      <div class="info-box">
        <strong>Tip:</strong> Use <code>.get()</code> when you're not sure the key exists.
      </div>

      <div class="section-divider"></div>
      <h2>Adding and Modifying Items</h2>
      <p>You can add a new key or change an existing one using the same syntax:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">person = {'name': 'Alice', 'age': 25}

# Add a new key
person['email'] = 'alice@example.com'

# Modify an existing key
person['age'] = 26

print(person)</pre>

      <div class="section-divider"></div>
      <h2>Removing Items</h2>
      <table>
        <thead><tr><th>Method</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><code>pop('key')</code></td><td>Remove a specific key and return its value</td></tr>
          <tr><td><code>popitem()</code></td><td>Remove and return the last inserted key-value pair</td></tr>
          <tr><td><code>del d['key']</code></td><td>Delete a specific key</td></tr>
          <tr><td><code>clear()</code></td><td>Empty the entire dictionary</td></tr>
        </tbody>
      </table>

      <div class="section-divider"></div>
      <h2>Checking if a Key Exists</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">person = {'name': 'Alice', 'age': 25}
print('name' in person)   # True
print('email' in person)  # False</pre>

      <div class="section-divider"></div>
      <h2>Keys, Values, and Items</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">person = {'name': 'Alice', 'age': 25, 'city': 'NY'}

print(person.keys())    # dict_keys(['name', 'age', 'city'])
print(person.values())  # dict_values(['Alice', 25, 'NY'])
print(person.items())   # dict_items([('name', 'Alice'), ...])

# Convert to list if needed
keys_list = list(person.keys())
print(keys_list)  # ['name', 'age', 'city']</pre>

      <div class="section-divider"></div>
      <h2>Copying a Dictionary</h2>
      <p>Use <code>.copy()</code> to make an independent copy. If you just do <code>copy = original</code>, both variables point to the same dictionary and changes affect both.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">original = {'a': 1, 'b': 2}
safe_copy = original.copy()
safe_copy['c'] = 3
print(original)   # {'a': 1, 'b': 2}  ← unchanged
print(safe_copy)  # {'a': 1, 'b': 2, 'c': 3}</pre>

      <div class="section-divider"></div>
      <h2>Updating a Dictionary</h2>
      <p>Use <code>.update()</code> to merge another dictionary in. Existing keys are overwritten with the new values:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">person = {'name': 'Alice', 'age': 25}
extra  = {'city': 'Boston', 'age': 26}  # age will be overwritten

person.update(extra)
print(person)  # {'name': 'Alice', 'age': 26, 'city': 'Boston'}</pre>

      <div class="section-divider"></div>
      <h2>Nested Dictionaries</h2>
      <p>A dictionary can have another dictionary as a value. This is called a <strong>nested dictionary</strong> and is useful for structured data like student records:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">students = {
    'alice': {'age': 20, 'grade': 'A', 'score': 95},
    'bob':   {'age': 22, 'grade': 'B', 'score': 83},
    'carol': {'age': 21, 'grade': 'A', 'score': 91},
}

# Access nested value with chained []
print(students['alice']['grade'])   # A
print(students['bob']['score'])     # 83

# Access any student's data by name
print(students['carol']['grade'])   # A
print(students['carol']['score'])   # 91</pre>

    </div>
    `,

    examples: [
      {
        title: "Creating and Accessing a Dictionary",
        desc: "Build a person profile and access values by key.",
        code: `person = {
    'first_name': 'Asabeneh',
    'last_name': 'Yetayeh',
    'age': 250,
    'country': 'Finland',
    'skills': ['JavaScript', 'React', 'Python']
}

print(person['first_name'])        # Asabeneh
print(person['country'])           # Finland
print(person['skills'][0])         # JavaScript (first skill)
print(person.get('email'))         # None (no error)
print(len(person))                 # 5`,
      },
      {
        title: "Adding, Modifying, and Removing",
        desc: "Update a dictionary after it's created.",
        code: `person = {'name': 'Alice', 'age': 25}

# Add new keys
person['email'] = 'alice@example.com'
person['city'] = 'New York'

# Modify existing key
person['age'] = 26

print("After update:", person)

# Remove a key
removed = person.pop('city')
print("Removed:", removed)
print("After pop:", person)`,
      },
      {
        title: "Keys, Values, and Items",
        desc: "Extract all keys, values, or key-value pairs from a dictionary.",
        code: `student = {
    'name': 'Bob',
    'grade': 'A',
    'score': 95
}

# Get all keys as a view
print(student.keys())    # dict_keys(['name', 'grade', 'score'])

# Get all values as a view
print(student.values())  # dict_values(['Bob', 'A', 95])

# Get all key-value pairs as tuples
print(student.items())   # dict_items([('name', 'Bob'), ...])

# Convert to a plain list
print(list(student.keys()))    # ['name', 'grade', 'score']
print(list(student.values()))  # ['Bob', 'A', 95]`,
      },
      {
        title: "Checking Keys and Nested Dicts",
        desc: "Test if a key exists and access nested dictionary values.",
        code: `person = {
    'name': 'Alice',
    'skills': ['Python', 'Django'],
    'address': {
        'street': '123 Main St',
        'city': 'Boston'
    }
}

# Check key existence
print('name' in person)      # True
print('email' in person)     # False

# Access nested dict
print(person['address']['city'])   # Boston
print(person['skills'][1])         # Django`,
      },
      {
        title: "Keys, Values, Items, and Copy",
        desc: "Extract all keys or values, and safely copy a dictionary.",
        code: `scores = {'Alice': 95, 'Bob': 82, 'Charlie': 91}

print(list(scores.keys()))    # ['Alice', 'Bob', 'Charlie']
print(list(scores.values()))  # [95, 82, 91]
print(list(scores.items()))   # [('Alice', 95), ...]

# Safe copy
backup = scores.copy()
backup['Dave'] = 78
print("Original:", scores)
print("Backup:", backup)`,
      },

      {
        title: "Nested Dictionaries",
        desc: "Store dictionaries inside dictionaries to represent structured data.",
        code: `students = {
    'alice': {'age': 20, 'grade': 'A', 'score': 95},
    'bob':   {'age': 22, 'grade': 'B', 'score': 83},
    'carol': {'age': 21, 'grade': 'A', 'score': 91},
}

# Access any student's data by name
print(students['alice']['grade'])    # A
print(students['bob']['score'])      # 83
print(students['carol']['age'])      # 21

# Access using variables
name = 'alice'
print(students[name]['score'])       # 95

# Add a new student
students['dave'] = {'age': 23, 'grade': 'C', 'score': 74}
print(students['dave'])`,
      },

    ],

    exercises: {
      level1: [
        "Create an empty dictionary called <code>dog</code>.",
        "Add keys to <code>dog</code>: <code>name</code>, <code>color</code>, <code>breed</code>, <code>legs</code>, <code>age</code>.",
        "Create a <code>student</code> dictionary with keys: <code>first_name</code>, <code>last_name</code>, <code>age</code>, <code>country</code>, <code>skills</code> (a list).",
        "Print the length of your <code>student</code> dictionary.",
        "Get the value of <code>skills</code> from <code>student</code> and check its data type — it should be a list.",
        "Use <code>'email' in student</code> to check whether the <code>email</code> key exists.",
      ],
      level2: [
        "Add two new skills to <code>student['skills']</code> using <code>append()</code>.",
        "Get all keys from <code>student</code> as a list using <code>.keys()</code>.",
        "Get all values from <code>student</code> as a list using <code>.values()</code>.",
        "Convert the student dictionary to a list of tuples using <code>.items()</code> and print it.",
        "Delete one key from <code>student</code> using <code>pop()</code> or <code>del</code>.",
        "Clear the entire <code>dog</code> dictionary using <code>.clear()</code>.",
      ],
      level3: [
        "Build a nested dictionary for a school: it should contain at least 3 students, each with a name, grade, and list of subjects. Access and print the grade of each student directly by key.",
        "Given two dicts <code>a = {'x': 1, 'y': 2}</code> and <code>b = {'y': 99, 'z': 3}</code>, merge them using <code>a.update(b)</code> and print the result. Which value wins for key <code>'y'</code>?",
        "Build a contacts book dictionary with at least 3 contacts, each having a <code>phone</code> and <code>email</code> field. Access and print each contact's phone number individually by key (e.g. <code>contacts['Alice']['phone']</code>).",
        "Use <code>update()</code> to merge a dictionary of new values into an existing one. Print the dictionary before and after to see which keys changed.",
      ],
    },

    quiz: [
      {
        q: "How do you access the value for key 'name' in a dictionary called person?",
        opts: ["person(name)", "person.name", "person['name']", "person->name"],
        answer: 2,
        explain: "Use square brackets with the key as a string: person['name']. This returns the value stored for that key.",
      },
      {
        q: "What does person.get('email') return if 'email' is not in the dictionary?",
        opts: ["KeyError", "0", "None", "False"],
        answer: 2,
        explain: ".get() returns None (instead of raising an error) when the key doesn't exist, making it the safer choice.",
      },
      {
        q: "Which method returns all key-value pairs as a list of tuples?",
        opts: [".keys()", ".values()", ".items()", ".pairs()"],
        answer: 2,
        explain: ".items() returns dict_items of (key, value) tuples. You can loop over them with: for k, v in d.items().",
      },
      {
        q: "What happens if you do: d = {'a': 1}; d['a'] = 99?",
        opts: ["A new key 'a' is added", "The value for 'a' is updated to 99", "An error is raised", "Nothing changes"],
        answer: 1,
        explain: "Assigning to an existing key updates its value. Assigning to a new key adds it. No error is raised either way.",
      },
      {
        q: "How do you remove the key 'city' from a dictionary and get its value back?",
        opts: ["del d['city']", "d.remove('city')", "d.pop('city')", "d.discard('city')"],
        answer: 2,
        explain: "pop('key') removes the key and returns its value. del d['key'] also removes it but doesn't return the value.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 9 — CONDITIONALS
  // ═══════════════════════════════════════════════
  {
    day: 9,
    emoji: "🔀",
    title: "Conditionals",
    subtitle: "Teach your code to make decisions using if, elif, and else — the foundation of all program logic.",
    topics: ["if Statement", "if/else", "elif", "Nested Conditions", "and / or", "Ternary Expression"],

    lesson: `
    <div class="lesson-section">
      <h2>What are Conditionals?</h2>
      <p>By default, Python runs your code line by line from top to bottom. <strong>Conditionals</strong> let you say: <em>"Only run this code IF a certain condition is true."</em></p>
      <p>The main keyword is <strong><code>if</code></strong>. After the condition, you write a <strong>colon <code>:</code></strong>, then indent the code that should run when the condition is true.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">a = 3
if a > 0:
    print('A is positive')</pre>
      <div class="info-box warning">
        <strong>Indentation matters!</strong> Python uses indentation (spaces) to define which code belongs to the <code>if</code> block. Missing indentation causes an error.
      </div>

      <div class="section-divider"></div>
      <h2>if / else</h2>
      <p>Add an <strong><code>else</code></strong> block to run code when the condition is <em>false</em>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">a = -3
if a > 0:
    print('A is positive')
else:
    print('A is not positive')</pre>

      <div class="section-divider"></div>
      <h2>if / elif / else</h2>
      <p>Use <strong><code>elif</code></strong> (short for "else if") to check multiple conditions:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">a = 0
if a > 0:
    print('Positive')
elif a < 0:
    print('Negative')
else:
    print('Zero')

# Grade example
score = 85
if score >= 90:
    print('A')
elif score >= 80:
    print('B')
elif score >= 70:
    print('C')
else:
    print('Below C')</pre>
      <div class="info-box">
        <strong>Python checks conditions top to bottom</strong> and stops at the first one that's true. Only one block ever runs.
      </div>

      <div class="section-divider"></div>
      <h2>Nested Conditions</h2>
      <p>You can put an <code>if</code> inside another <code>if</code>. Each inner level needs another indent:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">a = 6
if a > 0:
    if a % 2 == 0:
        print('Positive and even')
    else:
        print('Positive and odd')
else:
    print('Not positive')</pre>

      <div class="section-divider"></div>
      <h2>Logical Operators: and / or</h2>
      <p>Combine multiple conditions in a single <code>if</code>:</p>
      <table>
        <thead><tr><th>Operator</th><th>Meaning</th><th>True when…</th></tr></thead>
        <tbody>
          <tr><td><code>and</code></td><td>Both must be true</td><td>A is true AND B is true</td></tr>
          <tr><td><code>or</code></td><td>At least one must be true</td><td>A is true OR B is true</td></tr>
          <tr><td><code>not</code></td><td>Flip the result</td><td>NOT A</td></tr>
        </tbody>
      </table>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">age = 20
has_id = True

if age >= 18 and has_id:
    print('Access granted')
else:
    print('Access denied')

# OR example
day = 'Saturday'
if day == 'Saturday' or day == 'Sunday':
    print('Weekend!')</pre>

      <div class="section-divider"></div>
      <h2>Shorthand (Ternary) Expression</h2>
      <p>For simple if/else in one line, Python has a <strong>ternary expression</strong>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">a = 3
label = 'positive' if a > 0 else 'not positive'
print(label)

# Or directly in print:
print('Even') if a % 2 == 0 else print('Odd')</pre>

    </div>
    `,

    examples: [
      {
        title: "Basic if / elif / else",
        desc: "Check a number and print whether it's positive, negative, or zero.",
        code: `a = 0

if a > 0:
    print('A is positive')
elif a < 0:
    print('A is negative')
else:
    print('A is zero')`,
      },
      {
        title: "Grade Calculator",
        desc: "Assign a letter grade based on a numeric score.",
        code: `score = 78

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"Score: {score} → Grade: {grade}")`,
      },
      {
        title: "Using and / or",
        desc: "Combine conditions with logical operators.",
        code: `age = 20
has_id = True

# AND — both must be true
if age >= 18 and has_id:
    print('Access granted!')
else:
    print('Access denied!')

# OR — at least one must be true
user = 'James'
access_level = 3
if user == 'admin' or access_level >= 4:
    print('Admin access')
else:
    print('Regular access')`,
      },
      {
        title: "Nested Conditions",
        desc: "Check multiple layers of conditions.",
        code: `a = 6

if a > 0:
    if a % 2 == 0:
        print('Positive and even')
    else:
        print('Positive and odd')
elif a == 0:
    print('Zero')
else:
    print('Negative')`,
      },
      {
        title: "Season Detector",
        desc: "Use elif to determine the season from a month name.",
        code: `month = 'July'

if month in ('December', 'January', 'February'):
    season = 'Winter'
elif month in ('March', 'April', 'May'):
    season = 'Spring'
elif month in ('June', 'July', 'August'):
    season = 'Summer'
else:
    season = 'Autumn'

print(f"{month} is in {season}")`,
      },
    ],

    exercises: {
      level1: [
        "Write an <code>if/else</code> that prints <code>'Positive'</code> if a number is greater than 0, and <code>'Not positive'</code> otherwise.",
        "Write an <code>if/elif/else</code> that checks whether a number is positive, negative, or zero.",
        "Write code that prints <code>'Even'</code> if a number is divisible by 2, and <code>'Odd'</code> otherwise. (Hint: use <code>%</code>)",
        "Assign a letter grade to a score using <code>if/elif/else</code>: A (90+), B (80-89), C (70-79), D (60-69), F (below 60).",
        "Use a ternary expression to assign <code>'adult'</code> or <code>'minor'</code> based on whether age is 18 or older.",
        "Write code that checks if a number is divisible by both 2 and 3 using <code>and</code>.",
      ],
      level2: [
        "Given <code>fruits = ['banana', 'orange', 'mango', 'lemon']</code> — write code that checks if <code>'apple'</code> is in the list. If not, add it. If it is, print that it already exists.",
        "Write a season detector: given a month name, print the correct season (Winter, Spring, Summer, Autumn).",
        "Write a program that checks if a year is a leap year. A leap year is divisible by 4, but not 100, unless also divisible by 400.",
        "Write a number comparison: given two numbers <code>a</code> and <code>b</code>, print which is bigger, or if they're equal.",
      ],
      level3: [
        "Given a <code>person</code> dictionary with <code>skills</code>, <code>country</code>, and <code>is_married</code> keys — write conditions to: check if Python is in skills, classify them as frontend/backend/fullstack developer, and print a message if they are married and live in Finland.",
        "Write a BMI calculator: BMI = weight / height². Then classify: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (30+).",
        "Write a rock-paper-scissors game logic (no input needed — just hard-code player1 and player2 choices and print the winner).",
        "Write a program that checks if a given string is a <strong>palindrome</strong> (reads the same forwards and backwards, ignoring case). Example: <code>'racecar'</code>, <code>'racecar'</code>.",


      ],
    },

    quiz: [
      {
        q: "What keyword do you add to check a second condition if the first one is false?",
        opts: ["else if", "elseif", "elif", "otherwise"],
        answer: 2,
        explain: "Python uses elif (short for 'else if') to chain additional conditions after the initial if.",
      },
      {
        q: "What is the output of: x = 5; print('big') if x > 3 else print('small')?",
        opts: ["small", "big", "Error", "None"],
        answer: 1,
        explain: "x = 5 which is > 3, so the condition is True and 'big' is printed.",
      },
      {
        q: "Which logical operator requires ALL conditions to be true?",
        opts: ["or", "not", "and", "all()"],
        answer: 2,
        explain: "The 'and' operator returns True only when every condition it connects is True.",
      },
      {
        q: "What happens when Python finds the first true condition in an if/elif/else chain?",
        opts: ["It checks all conditions anyway", "It runs that block and skips the rest", "It raises an error", "It runs all matching blocks"],
        answer: 1,
        explain: "Python checks conditions top-to-bottom and stops at the first True one — only that block executes.",
      },
      {
        q: "What does indentation do in Python if/else blocks?",
        opts: ["It's optional and just for style", "It defines which code belongs to the if/else block", "It makes code run faster", "It is required only for functions"],
        answer: 1,
        explain: "Python uses indentation to define code blocks. All code inside an if must be indented consistently, or you'll get an IndentationError.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 10 — LOOPS
  // ═══════════════════════════════════════════════
  {
    day: 10,
    emoji: "🔁",
    title: "Loops",
    subtitle: "Repeat code automatically with for and while loops — and control them with break, continue, and range().",
    topics: ["while Loop", "for Loop", "range()", "break & continue", "Nested Loops", "for/else"],

    lesson: `
    <div class="lesson-section">
      <h2>Why Loops?</h2>
      <p>Imagine printing the numbers 1 to 100. Without loops you'd write 100 <code>print()</code> statements. With a loop, it's two lines. <strong>Loops</strong> let you repeat a block of code automatically.</p>

      <div class="section-divider"></div>
      <h2>The while Loop</h2>
      <p>A <strong>while loop</strong> keeps running as long as a condition is <code>True</code>. The condition is checked <em>before</em> each iteration.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">count = 0
while count < 5:
    print(count)
    count += 1     # IMPORTANT: always update the variable or loop runs forever!</pre>
      <div class="info-box warning">
        <strong>Infinite loop danger!</strong> If the condition never becomes False, the loop runs forever. Always make sure the loop variable changes each iteration.
      </div>

      <div class="section-divider"></div>
      <h2>The for Loop</h2>
      <p>A <strong>for loop</strong> iterates over a <strong>sequence</strong> (list, tuple, string, range, dict, set) — one item at a time.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Looping over a list
fruits = ['banana', 'orange', 'mango']
for fruit in fruits:
    print(fruit)

# Looping over a string
for letter in 'Python':
    print(letter)</pre>

      <div class="section-divider"></div>
      <h2>The range() Function</h2>
      <p><code>range()</code> generates a sequence of numbers. It takes up to 3 arguments:</p>
      <table>
        <thead><tr><th>Call</th><th>What it produces</th></tr></thead>
        <tbody>
          <tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4</td></tr>
          <tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5</td></tr>
          <tr><td><code>range(0, 11, 2)</code></td><td>0, 2, 4, 6, 8, 10 (step of 2)</td></tr>
          <tr><td><code>range(10, 0, -1)</code></td><td>10, 9, 8, … 1 (count down)</td></tr>
        </tbody>
      </table>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">for i in range(5):
    print(i)         # 0 1 2 3 4

for i in range(1, 6):
    print(i)         # 1 2 3 4 5

for i in range(0, 11, 2):
    print(i)         # 0 2 4 6 8 10</pre>

      <div class="section-divider"></div>
      <h2>break and continue</h2>
      <p><strong><code>break</code></strong> — exits the loop immediately:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">for i in range(10):
    if i == 5:
        break         # stop when i reaches 5
    print(i)          # prints 0 1 2 3 4</pre>

      <p><strong><code>continue</code></strong> — skips the current iteration and moves to the next:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">for i in range(6):
    if i == 3:
        continue      # skip 3
    print(i)          # prints 0 1 2 4 5</pre>

      <div class="section-divider"></div>
      <h2>Nested Loops</h2>
      <p>A loop inside another loop. The inner loop completes fully for every single iteration of the outer loop:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i*j}")
    print("---")</pre>

      <div class="section-divider"></div>
      <h2>for / else</h2>
      <p>Python's <code>for</code> loop can have an <code>else</code> block that runs only if the loop <em>completed normally</em> (without a <code>break</code>):</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">for number in range(11):
    print(number)
else:
    print('Loop finished at:', number)</pre>

      <div class="section-divider"></div>
      <h2>pass</h2>
      <p><code>pass</code> is a placeholder — it does nothing but prevents Python from complaining about an empty block:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">for i in range(5):
    pass   # placeholder — loop runs but does nothing yet</pre>

      <div class="section-divider"></div>
      <h2>enumerate() — Loop with Index</h2>
      <p><code>enumerate()</code> adds a counter to any iterable. Instead of tracking a separate index variable, Python does it for you:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ['banana', 'orange', 'mango', 'lemon']

# With enumerate — index and value together
for i, fruit in enumerate(fruits):
    print(i, fruit)         # 0 banana, 1 orange…

# Start counting from 1 instead of 0
for i, fruit in enumerate(fruits, 1):
    print(f"{i}. {fruit}")  # 1. banana, 2. orange…</pre>

      <div class="section-divider"></div>
      <h2>zip() — Loop Over Two Lists at Once</h2>
      <p><code>zip()</code> pairs up items from two (or more) lists so you can loop over them together:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">fruits = ['banana', 'orange', 'mango']
scores = [85, 92, 78]

for fruit, score in zip(fruits, scores):
    print(f"{fruit}: {score}")
# banana: 85
# orange: 92
# mango: 78</pre>
      <div class="info-box">
        <strong>zip() stops at the shortest list.</strong> If one list has 3 items and another has 5, zip() only pairs the first 3 from each.
      </div>

      <div class="section-divider"></div>
      <h2>The while Loop — In Depth</h2>
      <p>The <code>while</code> loop is best when you don't know in advance how many iterations you need — you just want to keep going until a condition changes:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Common pattern: keep looping until a target is found
found = False
items = ['apple', 'banana', 'mango']
i = 0
while not found and i < len(items):
    if items[i] == 'banana':
        found = True
    i += 1
print(f"banana found: {found}")

# Countdown with break
n = 10
while True:         # runs forever UNLESS we break
    print(n)
    n -= 1
    if n == 0:
        break
print("Done!")</pre>
      <div class="info-box warning">
        <strong>Always update the condition variable!</strong> If nothing in the loop body changes the condition, the loop runs forever. Use a counter or <code>break</code> as an escape hatch.
      </div>

      <div class="section-divider"></div>
      <h2>Nested Loops — Multiplication Table</h2>
      <p>A <strong>nested loop</strong> is a loop inside another loop. The inner loop runs completely for every single step of the outer loop. A classic example is a multiplication table:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># 5x5 multiplication table
for i in range(1, 6):           # outer loop: rows 1-5
    for j in range(1, 6):       # inner loop: columns 1-5
        print(f"{i*j:3}", end="")  # :3 pads to 3 chars wide
    print()                     # newline after each row</pre>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#86efac;overflow-x:auto"># Output:
  1  2  3  4  5
  2  4  6  8 10
  3  6  9 12 15
  4  8 12 16 20
  5 10 15 20 25</pre>

      <div class="section-divider"></div>
      <h2>else Clause on Loops — The "Not Found" Pattern</h2>
      <p>Python's loop <code>else</code> block runs only when the loop <em>completed without a <code>break</code></em>. This makes it perfect for "search and report if not found" patterns:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">numbers = [3, 7, 12, 8, 19]
target = 15

for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
else:
    # This runs ONLY if the loop finished without break
    print(f"{target} was not in the list")
# Output: 15 was not in the list

# Same pattern with while
i = 0
while i < 5:
    if numbers[i] == target:
        print("Found it!")
        break
    i += 1
else:
    print("Searched all items — not found")</pre>
      <div class="info-box">
        <strong>Key rule:</strong> The <code>else</code> block is SKIPPED if the loop exits via <code>break</code>. It only runs when the loop exhausts all its iterations naturally.
      </div>
    </div>
    `,

    examples: [
      {
        title: "while Loop Basics",
        desc: "Count up and count down using while loops.",
        code: `# Count up
count = 0
while count < 5:
    print(count)
    count += 1

print("---")

# Count down
n = 5
while n > 0:
    print(n)
    n -= 1
print("Blast off!")`,
      },
      {
        title: "for Loop with range()",
        desc: "Use range() to control how many times a loop runs.",
        code: `# range(5) → 0,1,2,3,4
for i in range(5):
    print(i)

print("---")

# range(1, 6) → 1,2,3,4,5
for i in range(1, 6):
    print(i)

print("---")

# range(0, 11, 2) → even numbers
for i in range(0, 11, 2):
    print(i)`,
      },
      {
        title: "Looping Over Collections",
        desc: "Iterate over lists, strings, tuples, and dictionaries.",
        code: `# List
fruits = ['banana', 'orange', 'mango']
for fruit in fruits:
    print(fruit)

# String (character by character)
for letter in 'Python':
    print(letter)

# Dictionary key-value pairs
person = {'name': 'Alice', 'age': 25}
for key, value in person.items():
    print(f"{key}: {value}")`,
      },
      {
        title: "break and continue",
        desc: "Control loop flow — stop early or skip iterations.",
        code: `# break — stop when we find 'mango'
fruits = ['banana', 'orange', 'mango', 'lemon']
for fruit in fruits:
    if fruit == 'mango':
        print("Found mango! Stopping.")
        break
    print(fruit)

print("---")

# continue — skip even numbers
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)   # only odd numbers`,
      },
      {
        title: "Nested Loops and Patterns",
        desc: "Use nested for loops to build a multiplication table and patterns.",
        code: `# Triangle pattern
for i in range(1, 6):
    print('#' * i)

print("---")

# Multiplication table (3x3)
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i*j}", end="  ")
    print()   # newline after each row`,
      },
      {
        title: "enumerate() and zip()",
        desc: "Loop with index using enumerate(), and loop over multiple lists simultaneously using zip().",
        code: `# enumerate() -- get index AND value together
fruits = ['apple', 'banana', 'cherry']
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry

print("---")

# zip() -- loop over two lists in parallel
names  = ['Alice', 'Bob', 'Carol']
scores = [95, 83, 91]
for name, score in zip(names, scores):
    print(f"{name}: {score}")`,
      },
      {
        title: "while Loop with break and else",
        desc: "Use while for unknown iteration counts, and else to detect if a search succeeded.",
        code: `# Search using while + break + else
items = ['pen', 'notebook', 'eraser', 'ruler']
target = 'notebook'
i = 0

while i < len(items):
    if items[i] == target:
        print(f"Found '{target}' at index {i}")
        break
    i += 1
else:
    print(f"'{target}' was not found")

# The else block only runs if no 'break' was hit
# Try changing target to 'stapler' to see the else block run`,
      },
    ],

    exercises: {
      level1: [
        "Use a <code>for</code> loop with <code>range()</code> to print numbers 0 to 10.",
        "Use a <code>while</code> loop to print numbers 10 down to 0.",
        "Loop through the list <code>['Python', 'Numpy', 'Pandas', 'Django', 'Flask']</code> and print each item.",
        "Print all even numbers from 0 to 100 using a loop and <code>if</code>.",
        "Print all odd numbers from 0 to 100.",
        "Use a <code>for</code> loop to print this triangle pattern (7 rows of #).",
      ],
      level2: [
        "Calculate the sum of all numbers from 0 to 100 using a loop. The answer should be 5050.",
        "Calculate the sum of all even numbers from 0 to 100 (answer: 2550) and all odd numbers (answer: 2500).",
        "Use a nested loop to print a 5×5 grid of <code>#</code> symbols.",
        "Print the multiplication table for numbers 1 through 5 using nested loops.",
        "Reverse the list <code>['banana', 'orange', 'mango', 'lemon']</code> using a loop (without using <code>.reverse()</code>).",
      ],
      level3: [
        "Write a loop that prints the first 20 Fibonacci numbers (each number is the sum of the previous two: 0, 1, 1, 2, 3, 5…).",
        "Write a program using a loop that checks if a number is prime.",
        "Use <code>range()</code> with a step to print all multiples of 7 from 0 to 100.",
      ],
    },

    quiz: [
      {
        q: "What is the output of: for i in range(3): print(i)?",
        opts: ["1 2 3", "0 1 2 3", "0 1 2", "1 2"],
        answer: 2,
        explain: "range(3) produces 0, 1, 2. It starts at 0 and stops BEFORE 3.",
      },
      {
        q: "What does 'break' do inside a loop?",
        opts: ["Skips the current iteration", "Pauses the loop temporarily", "Exits the loop immediately", "Restarts the loop"],
        answer: 2,
        explain: "break exits the loop entirely the moment it's reached, regardless of the loop condition.",
      },
      {
        q: "What does 'continue' do inside a loop?",
        opts: ["Exits the loop", "Skips to the next iteration", "Restarts from iteration 0", "Does nothing"],
        answer: 1,
        explain: "continue skips the rest of the current iteration and jumps to the next one.",
      },
      {
        q: "What does range(2, 10, 2) produce?",
        opts: ["2, 4, 6, 8, 10", "2, 4, 6, 8", "0, 2, 4, 6, 8", "2, 3, 4, 5, 6, 7, 8, 9"],
        answer: 1,
        explain: "range(start, stop, step) → starts at 2, counts by 2, stops before 10: gives 2, 4, 6, 8.",
      },
      {
        q: "Which loop type checks its condition BEFORE each iteration?",
        opts: ["for loop", "while loop", "Both", "Neither"],
        answer: 1,
        explain: "The while loop evaluates its condition before each run. If False from the start, the body never executes.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // DAY 11 — FUNCTIONS
  // ═══════════════════════════════════════════════
  {
    day: 11,
    emoji: "⚙️",
    title: "Functions",
    subtitle: "Write reusable blocks of code with functions — learn def, parameters, return values, default arguments, and *args.",
    topics: ["def & return", "Parameters", "Default Args", "*args **kwargs", "Scope", "Functions as Args"],

    lesson: `
    <div class="lesson-section">
      <h2>What is a Function?</h2>
      <p>A <strong>function</strong> is a named, reusable block of code. Instead of writing the same logic over and over, you define it once and <strong>call</strong> it whenever you need it.</p>
      <p>Functions are declared with the <strong><code>def</code></strong> keyword:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def greet():
    print("Hello, World!")

greet()   # call the function → Hello, World!</pre>
      <div class="info-box">
        <strong>Defining vs calling:</strong> <code>def greet():</code> creates the function. <code>greet()</code> runs it. Nothing happens until you call it.
      </div>

      <div class="section-divider"></div>
      <h2>Return Values</h2>
      <p>Use <strong><code>return</code></strong> to send a result back to whoever called the function. Without <code>return</code>, the function returns <code>None</code>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8</pre>

      <div class="section-divider"></div>
      <h2>Parameters and Arguments</h2>
      <p><strong>Parameters</strong> are the variable names listed in the function definition. <strong>Arguments</strong> are the actual values you pass in when calling the function.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def greet(name):           # 'name' is a parameter
    return name + ', welcome!'

print(greet('Alice'))      # 'Alice' is the argument → Alice, welcome!
print(greet('Bob'))        # → Bob, welcome!</pre>

      <h3>Multiple parameters</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def full_name(first, last):
    return first + ' ' + last

print(full_name('Asabeneh', 'Yetayeh'))

# Keyword arguments — order doesn't matter
print(full_name(last='Yetayeh', first='Asabeneh'))</pre>

      <div class="section-divider"></div>
      <h2>Default Parameters</h2>
      <p>Give a parameter a <strong>default value</strong> so it works even when no argument is passed:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def greet(name='Guest'):
    return f'Hello, {name}!'

print(greet())          # Hello, Guest!
print(greet('Alice'))   # Hello, Alice!</pre>

      <div class="section-divider"></div>
      <h2>*args — Arbitrary Number of Arguments</h2>
      <p><strong><code>*args</code></strong> lets a function accept <em>any number</em> of positional arguments. They come in as a tuple.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def total(*nums):
    return sum(nums)

print(total(1, 2, 3))        # 6
print(total(1, 2, 3, 4, 5))  # 15</pre>

      <div class="section-divider"></div>
      <h2>**kwargs — Arbitrary Keyword Arguments</h2>
      <p><strong><code>**kwargs</code></strong> lets a function accept any number of <em>named</em> arguments. They come in as a dictionary.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def show_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

show_info(name='Alice', age=25, city='NY')</pre>

      <div class="section-divider"></div>
      <h2>Functions as Arguments</h2>
      <p>In Python, functions are <strong>first-class objects</strong> — you can pass them as arguments to other functions:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def square(n):
    return n ** 2

def apply(func, value):
    return func(value)

print(apply(square, 4))   # 16</pre>

      <div class="section-divider"></div>
      <h2>Variable Scope</h2>
      <p>Variables created <em>inside</em> a function are <strong>local</strong> — they only exist within that function. Variables created <em>outside</em> are <strong>global</strong>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">x = 10   # global

def show():
    y = 5  # local — only exists inside show()
    print(x)   # can read global
    print(y)

show()
# print(y)  ← would cause NameError — y doesn't exist outside</pre>
    </div>
    `,

    examples: [
      {
        title: "Functions Without and With Parameters",
        desc: "Define functions that do work with and without input.",
        code: `# No parameters
def say_hello():
    print("Hello, World!")

say_hello()

# With parameter and return
def square(n):
    return n * n

print(square(4))   # 16
print(square(7))   # 49`,
      },
      {
        title: "Multiple Parameters and Keyword Arguments",
        desc: "Functions with multiple inputs, and calling with keyword syntax.",
        code: `def calculate_age(current_year, birth_year):
    return current_year - birth_year

print(calculate_age(2025, 1999))   # 26

# Keyword arguments — order doesn't matter
def weight(mass, gravity=9.81):
    return mass * gravity

print(weight(100))          # uses default gravity (Earth)
print(weight(100, 1.62))    # Moon gravity`,
      },
      {
        title: "Default Parameters",
        desc: "Parameters with fallback values when no argument is passed.",
        code: `def greet(name='Guest', language='English'):
    if language == 'Spanish':
        return f'Hola, {name}!'
    return f'Hello, {name}!'

print(greet())                      # Hello, Guest!
print(greet('Alice'))               # Hello, Alice!
print(greet('Carlos', 'Spanish'))   # Hola, Carlos!`,
      },
      {
        title: "*args — Accept Any Number of Arguments",
        desc: "Use *args to pass as many values as you need.",
        code: `def sum_all(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

print(sum_all(1, 2, 3))         # 6
print(sum_all(1, 2, 3, 4, 5))  # 15
print(sum_all(10, 20))          # 30

# *args with a fixed first argument
def show_team(team_name, *members):
    print(f"Team: {team_name}")
    for m in members:
        print(f"  - {m}")

show_team('Alpha', 'Alice', 'Bob', 'Charlie')`,
      },
      {
        title: "Returning Different Data Types",
        desc: "Functions can return strings, numbers, booleans, and lists.",
        code: `def is_even(n):
    return n % 2 == 0

print(is_even(4))   # True
print(is_even(7))   # False

def find_evens(limit):
    return [i for i in range(limit + 1) if i % 2 == 0]

print(find_evens(10))  # [0, 2, 4, 6, 8, 10]

def area_of_circle(r):
    PI = 3.14159
    return PI * r ** 2

print(round(area_of_circle(5), 2))  # 78.54`,
      },
    ],

    exercises: {
      level1: [
        "Declare a function <code>add_two_numbers(a, b)</code> that returns the sum of two numbers.",
        "Declare a function <code>area_of_circle(r)</code> that returns the area. Formula: <code>PI × r²</code> (use PI = 3.14).",
        "Declare a function <code>convert_celsius_to_fahrenheit(c)</code>. Formula: <code>(c × 9/5) + 32</code>.",
        "Declare a function <code>check_season(month)</code> that returns the season (Spring, Summer, Autumn, Winter).",
        "Declare a function <code>print_list(lst)</code> that takes a list and prints each element.",
        "Declare a function <code>sum_of_numbers(n)</code> that adds all numbers from 0 to <code>n</code>. Verify: <code>sum_of_numbers(10)</code> = 55, <code>sum_of_numbers(100)</code> = 5050.",
      ],
      level2: [
        "Declare a function <code>evens_and_odds(n)</code> that counts even and odd numbers from 0 to <code>n</code>.",
        "Declare a function <code>factorial(n)</code> that returns <code>n!</code> (5! = 120).",
        "Declare a function <code>reverse_list(lst)</code> that returns the reversed list using a loop (not <code>.reverse()</code>).",
        "Declare a function <code>capitalize_list_items(lst)</code> that returns a new list with all strings capitalized.",
        "Write a function <code>greet(name='Guest')</code> that prints <code>'Hello, Guest!'</code> when called with no argument, and <code>'Hello, [name]!'</code> otherwise.",
        "Write a function <code>show_args(**kwargs)</code> that prints each key-value pair it receives.",
      ],
      level3: [
        "Write a function <code>is_prime(n)</code> that returns <code>True</code> if <code>n</code> is a prime number.",
        "Write a function <code>calculate_mean(lst)</code> that returns the average of a list of numbers.",
        "Write a function <code>unique_items(lst)</code> that returns <code>True</code> if all items in the list are unique.",
        "Write a function <code>solve_quadratic(a, b, c)</code> that returns both solutions of <code>ax² + bx + c = 0</code> using the quadratic formula.",
      ],
    },

    quiz: [
      {
        q: "What keyword is used to define a function in Python?",
        opts: ["function", "func", "def", "define"],
        answer: 2,
        explain: "Functions are defined with the def keyword, followed by the function name and parentheses.",
      },
      {
        q: "What does a function return if it has no return statement?",
        opts: ["0", "False", "None", "An error"],
        answer: 2,
        explain: "Without a return statement, Python implicitly returns None.",
      },
      {
        q: "What does *args allow you to do?",
        opts: ["Pass a dictionary of arguments", "Pass any number of positional arguments", "Create a global variable", "Define a recursive function"],
        answer: 1,
        explain: "*args collects any number of positional arguments into a tuple inside the function.",
      },
      {
        q: "What is a default parameter?",
        opts: ["A parameter that is always required", "A parameter with a preset value used when no argument is passed", "The first parameter of any function", "A parameter that cannot be changed"],
        answer: 1,
        explain: "Default parameters have a value defined in the function signature (e.g. def greet(name='Guest')). If no argument is passed, the default is used.",
      },
      {
        q: "What is the scope of a variable declared inside a function?",
        opts: ["Global — visible everywhere", "Local — only inside that function", "Module — visible in the same file", "Permanent — exists until deleted"],
        answer: 1,
        explain: "Variables created inside a function are local — they only exist within that function and are destroyed when it returns.",
      },
    ],
  },

  {
    day: 12,
    emoji: "📦",
    title: "Modules",
    subtitle: "Reuse code by splitting it into files. Learn import, from...import, and tour Python's standard library.",
    topics: ["import", "from...import", "as alias", "math & random", "os & sys", "Custom modules"],

    lesson: `
    <div class="lesson-section">
      <h2>What is a Module?</h2>
      <p>A <strong>module</strong> is just a Python file (<code>.py</code>) that contains code — functions, variables, or classes — that you can reuse in other files. Instead of rewriting the same logic everywhere, you write it once in a module and <strong>import</strong> it where you need it.</p>
      <p>Python comes with a huge <strong>standard library</strong> — hundreds of built-in modules ready to use without installing anything.</p>

      <div class="section-divider"></div>
      <h2>Importing a Whole Module</h2>
      <p>Use the <strong><code>import</code></strong> keyword. Then access things inside it with <code>module.name</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import math

print(math.pi)          # 3.141592653589793
print(math.sqrt(25))    # 5.0
print(math.floor(2.9))  # 2</pre>

      <div class="section-divider"></div>
      <h2>Importing Specific Items</h2>
      <p>If you only need one or two things from a module, use <strong><code>from ... import ...</code></strong>. Then you can use the name directly — no <code>module.</code> prefix needed:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from math import pi, sqrt

print(pi)        # 3.141592653589793
print(sqrt(81))  # 9.0</pre>

      <div class="section-divider"></div>
      <h2>Renaming with <code>as</code></h2>
      <p>Use <strong><code>as</code></strong> to give an imported module or item a shorter alias:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import math as m
from statistics import mean as avg

print(m.pi)
print(avg([1, 2, 3, 4, 5]))   # 3</pre>

      <div class="section-divider"></div>
      <h2>A Tour of Useful Standard Modules</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">math</div><div class="cheatsheet-desc">pi, sqrt, pow, floor, ceil, log10</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">random</div><div class="cheatsheet-desc">random(), randint(a,b), choice(seq), shuffle(seq)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">statistics</div><div class="cheatsheet-desc">mean, median, mode, stdev</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">os</div><div class="cheatsheet-desc">getcwd(), listdir(), mkdir(), path operations</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">sys</div><div class="cheatsheet-desc">argv, version, exit(), maxsize, path</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">string</div><div class="cheatsheet-desc">ascii_letters, digits, punctuation</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Creating Your Own Module</h2>
      <p>A module is just a file. If you make <strong><code>mymath.py</code></strong>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto"># mymath.py
def double(n):
    return n * 2

def triple(n):
    return n * 3</pre>
      <p>You can import it from another file in the same folder:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># main.py
from mymath import double, triple

print(double(5))   # 10
print(triple(5))   # 15</pre>

      <div class="section-divider"></div>
      <h2>The <code>__name__ == "__main__"</code> Pattern</h2>
      <p>When a Python file runs directly, its <code>__name__</code> equals <code>"__main__"</code>. When it's imported, <code>__name__</code> equals the module's name. This lets you write code that only runs when the file is the main program:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def greet(name):
    print(f"Hello, {name}!")

if __name__ == "__main__":
    # Only runs when this file is executed directly
    greet("World")</pre>
      <div class="info-box">
        <strong>Why bother?</strong> Without that guard, every <code>import</code> would trigger your demo code. With it, your file is safe to import as a library AND runnable on its own.
      </div>
    </div>
    `,

    examples: [
      {
        title: "Math Module Basics",
        desc: "Constants and common math functions.",
        code: `import math

print(math.pi)                # 3.141592653589793
print(math.sqrt(144))         # 12.0
print(math.pow(2, 10))        # 1024.0
print(math.floor(3.7))        # 3
print(math.ceil(3.2))         # 4
print(math.log10(1000))       # 3.0`,
      },
      {
        title: "Random Module — Numbers and Choices",
        desc: "Generate random numbers and pick from sequences.",
        code: `import random

print(random.random())              # float between 0.0 and 1.0
print(random.randint(1, 100))       # integer between 1 and 100 inclusive
print(random.choice(['a','b','c'])) # random pick from list

deck = [1, 2, 3, 4, 5]
random.shuffle(deck)
print(deck)`,
      },
      {
        title: "Statistics Module",
        desc: "Quick stats on a list of numbers.",
        code: `from statistics import mean, median, mode, stdev

scores = [88, 92, 75, 92, 80, 100, 92]

print("Mean:  ", mean(scores))
print("Median:", median(scores))
print("Mode:  ", mode(scores))
print("Stdev: ", round(stdev(scores), 2))`,
      },
      {
        title: "Importing with Aliases",
        desc: "Shorten long module names with as.",
        code: `import math as m
from random import randint as ri

print(m.pi)                    # 3.141592653589793
print(m.sqrt(49))              # 7.0
print(ri(1, 6), ri(1, 6))      # roll two dice`,
      },
      {
        title: "Building a Random User ID",
        desc: "Combine string + random to build IDs.",
        code: `import random
import string

def user_id(length=8):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

print(user_id())       # e.g. 'aZ3kPq9X'
print(user_id(12))     # 12-character ID
print(user_id(6))      # 6-character ID`,
      },
    ],

    exercises: {
      level1: [
        "Import the <code>math</code> module and print <code>math.pi</code> and <code>math.sqrt(2)</code>.",
        "Use <code>from math import floor, ceil</code> and print <code>floor(3.7)</code> and <code>ceil(3.2)</code>.",
        "Import <code>random</code> and print a random integer between 1 and 100 using <code>random.randint()</code>.",
        "Use <code>random.choice()</code> to pick a random color from <code>['red','blue','green','yellow']</code>.",
        "Import <code>statistics</code> and print the <code>mean</code> and <code>median</code> of <code>[10, 20, 30, 40, 50]</code>.",
        "Import <code>math</code> as <code>m</code> and print <code>m.pow(2, 8)</code>.",
      ],
      level2: [
        "Write a function <code>rgb_color()</code> that returns a tuple of three random integers between 0 and 255.",
        "Write a function <code>random_user_id()</code> that returns a 6-character random ID using letters and digits.",
        "Write a function <code>list_of_rgb_colors(n)</code> that returns a list of <code>n</code> random RGB tuples.",
        "Use <code>random.shuffle()</code> to shuffle the list <code>[1,2,3,4,5,6,7,8,9,10]</code> and print it.",
        "Write a function <code>generate_password(length)</code> that returns a random password mixing letters, digits, and punctuation.",
        "Use the <code>statistics</code> module to compute the standard deviation of <code>[2, 4, 4, 4, 5, 5, 7, 9]</code>.",
      ],
      level3: [
        "Build a custom module <code>shapes.py</code> with functions for area of circle, square, and triangle. Import and use them.",
        "Write a function <code>generate_colors(kind, n)</code> that returns <code>n</code> random colors as RGB tuples if <code>kind == 'rgb'</code>, or hex strings if <code>kind == 'hex'</code>.",
        "Use the <code>__name__ == '__main__'</code> guard in a script that defines a function and only calls it when run directly.",
        "Write a function <code>seven_unique_numbers()</code> that returns seven unique random numbers between 0 and 9 (hint: use <code>random.sample()</code>).",
      ],
    },

    quiz: [
      {
        q: "What is a module in Python?",
        opts: ["A class with one method", "A Python file you can import and reuse", "A built-in keyword", "A type of variable"],
        answer: 1,
        explain: "A module is simply a Python file containing reusable code — functions, variables, or classes — that other files can import.",
      },
      {
        q: "Which statement imports only the sqrt function from math?",
        opts: ["import sqrt from math", "from math import sqrt", "import math.sqrt", "use math.sqrt"],
        answer: 1,
        explain: "The correct syntax is from <module> import <name>, so: from math import sqrt.",
      },
      {
        q: "What does `import math as m` do?",
        opts: ["Renames the math module to m for use in this file", "Makes math global", "Imports only m from math", "Deletes math"],
        answer: 0,
        explain: "The 'as' keyword gives the imported module a local alias — here, m — so you can write m.pi instead of math.pi.",
      },
      {
        q: "What is the purpose of `if __name__ == '__main__':`?",
        opts: ["Required at the top of every Python file", "Prevents the file from running", "Lets code run only when the file is executed directly, not when imported", "Defines a function"],
        answer: 2,
        explain: "It separates code that should only run when the file is the main program from code that should always run when imported.",
      },
      {
        q: "Which module would you use to pick a random item from a list?",
        opts: ["math", "statistics", "random", "os"],
        answer: 2,
        explain: "The random module's choice() function picks a random element from a sequence.",
      },
    ],
  },

  {
    day: 13,
    emoji: "🗜️",
    title: "List Comprehension",
    subtitle: "Write loops in a single line. Build new lists, sets, and dicts with concise, readable syntax.",
    topics: ["Basic syntax", "if filter", "Nested loops", "Set & dict comprehensions", "Lambda functions", "When NOT to use"],

    lesson: `
    <div class="lesson-section">
      <h2>What is a List Comprehension?</h2>
      <p>A <strong>list comprehension</strong> builds a new list from an existing iterable in one expressive line. It does the work of a <code>for</code> loop + <code>append()</code> — but shorter and often faster.</p>

      <h3>The traditional way</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)   # [1, 4, 9, 16, 25]</pre>

      <h3>The comprehension way</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">squares = [n * n for n in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]</pre>

      <div class="info-box">
        <strong>The pattern:</strong> <code>[expression for item in iterable]</code> — read left to right: "give me <em>expression</em> for each <em>item</em> in <em>iterable</em>."
      </div>

      <div class="section-divider"></div>
      <h2>Adding an <code>if</code> Filter</h2>
      <p>Add a condition at the end to skip items you don't want:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">numbers = [1, -2, 3, -4, 5, -6, 7]
positives = [n for n in numbers if n > 0]
print(positives)   # [1, 3, 5, 7]

evens = [n for n in range(1, 11) if n % 2 == 0]
print(evens)       # [2, 4, 6, 8, 10]</pre>

      <div class="section-divider"></div>
      <h2>if / else Inside</h2>
      <p>Use <code>if/else</code> <em>before</em> the <code>for</code> to transform each item conditionally:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">labels = ["even" if n % 2 == 0 else "odd" for n in range(1, 6)]
print(labels)   # ['odd', 'even', 'odd', 'even', 'odd']</pre>

      <div class="section-divider"></div>
      <h2>Nested Loops — Flattening</h2>
      <p>Flatten a 2D list into a 1D list with two <code>for</code> clauses:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in matrix for n in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]</pre>

      <div class="section-divider"></div>
      <h2>Set and Dict Comprehensions</h2>
      <p>The same idea works for sets <code>{}</code> and dicts <code>{key: value}</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># set comprehension — duplicates removed automatically
unique = {n % 5 for n in range(20)}
print(unique)   # {0, 1, 2, 3, 4}

# dict comprehension
squares = {n: n * n for n in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}</pre>

      <div class="section-divider"></div>
      <h2>Lambda Functions</h2>
      <p>A <strong>lambda</strong> is a tiny anonymous function — one line, no <code>def</code>, no name (unless you assign it). Useful when you need a quick function to pass to something else.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">add = lambda a, b: a + b
print(add(3, 4))   # 7

square = lambda n: n * n
print(square(5))   # 25</pre>
      <div class="info-box">
        <strong>Rule:</strong> <code>lambda parameters: expression</code> — only ONE expression allowed (no statements, no multiple lines). Use <code>def</code> for anything more complex.
      </div>

      <div class="section-divider"></div>
      <h2>When NOT to Use Comprehensions</h2>
      <p>If the logic needs multiple steps, nested conditions, or side effects, write a normal loop. A comprehension that takes 3 minutes to understand is worse than a 6-line loop anyone can read.</p>
      <div class="info-box warning">
        <strong>Readability first.</strong> Comprehensions shine when they fit comfortably on one line and the intent is obvious. If you need a comment to explain it, use a regular loop instead.
      </div>
    </div>
    `,

    examples: [
      {
        title: "Squares with Comprehension",
        desc: "Build a list of squares in one line.",
        code: `squares = [n ** 2 for n in range(1, 11)]
print(squares)   # [1, 4, 9, ..., 100]

cubes = [n ** 3 for n in range(1, 6)]
print(cubes)     # [1, 8, 27, 64, 125]`,
      },
      {
        title: "Filtering with if",
        desc: "Keep only items that pass a test.",
        code: `numbers = [-4, -2, 0, 1, 3, 5, -7, 8]

positives = [n for n in numbers if n > 0]
print(positives)   # [1, 3, 5, 8]

evens = [n for n in range(1, 21) if n % 2 == 0]
print(evens)       # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]`,
      },
      {
        title: "Flatten a 2D List",
        desc: "Turn a list of lists into a single flat list.",
        code: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

flat = [n for row in matrix for n in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Bonus: only even numbers
even_flat = [n for row in matrix for n in row if n % 2 == 0]
print(even_flat)  # [2, 4, 6, 8]`,
      },
      {
        title: "Dict and Set Comprehensions",
        desc: "Same pattern, different container.",
        code: `# Dict — word → length
words = ["apple", "banana", "cherry", "date"]
lengths = {w: len(w) for w in words}
print(lengths)
# {'apple': 5, 'banana': 6, 'cherry': 6, 'date': 4}

# Set — first letters, no duplicates
letters = {w[0] for w in ['apple', 'avocado', 'banana', 'berry']}
print(letters)   # {'a', 'b'}`,
      },
      {
        title: "Lambda Functions",
        desc: "Small one-line functions assigned to a name or used inline.",
        code: `double = lambda n: n * 2
print(double(7))            # 14

# Lambda in sorted()
people = [('Alice', 30), ('Bob', 25), ('Carol', 35)]
by_age = sorted(people, key=lambda p: p[1])
print(by_age)
# [('Bob', 25), ('Alice', 30), ('Carol', 35)]`,
      },
    ],

    exercises: {
      level1: [
        "Use a list comprehension to build a list of the squares of numbers 1 to 10.",
        "Use a list comprehension with <code>if</code> to keep only the even numbers from <code>range(20)</code>.",
        "Use a list comprehension to convert <code>['apple','banana','cherry']</code> to all uppercase.",
        "Use a list comprehension to build a list of the lengths of each word in <code>['hi','hello','hey','greetings']</code>.",
        "Write a lambda function <code>add</code> that takes two numbers and returns their sum.",
        "Write a lambda function <code>cube</code> that returns <code>n ** 3</code>.",
      ],
      level2: [
        "Given <code>nums = [-3, -1, 0, 2, 4, -5, 6]</code>, use a comprehension to keep only positive numbers.",
        "Flatten <code>[[1,2],[3,4],[5,6]]</code> into <code>[1,2,3,4,5,6]</code> using a nested comprehension.",
        "Build a dict comprehension that maps each number from 1 to 5 to its factorial. (Hint: <code>math.factorial</code>.)",
        "Use a comprehension to build <code>['odd' if n%2 else 'even' for n in range(10)]</code> — predict the output, then run it.",
        "Sort <code>[('Alice', 30), ('Bob', 25), ('Carol', 35)]</code> by age using <code>sorted()</code> and a <code>lambda</code>.",
        "Use a set comprehension to get all unique first letters of <code>['cat','car','dog','duck','eel']</code>.",
      ],
      level3: [
        "Given <code>countries = [['Finland','Helsinki'],['Sweden','Stockholm'],['Norway','Oslo']]</code>, use a comprehension to build <code>['FINLAND-HELSINKI', ...]</code>.",
        "Write a list comprehension that returns all coordinates <code>(x, y)</code> where <code>x</code> is in <code>range(3)</code> and <code>y</code> is in <code>range(3)</code> AND <code>x != y</code>.",
        "Convert <code>[{'name':'Alice','age':30}, {'name':'Bob','age':25}]</code> into a list of just the names using a comprehension.",
        "Write a function that takes a list of numbers and returns a dict <code>{n: n**2}</code> for only the even ones, using a single comprehension.",
      ],
    },

    quiz: [
      {
        q: "What does `[n * 2 for n in range(5)]` produce?",
        opts: ["[0, 1, 2, 3, 4]", "[0, 2, 4, 6, 8]", "[2, 4, 6, 8, 10]", "[10]"],
        answer: 1,
        explain: "It doubles each number from range(5) which is 0,1,2,3,4 → 0,2,4,6,8.",
      },
      {
        q: "Where does the if filter go in a list comprehension?",
        opts: ["At the beginning", "After the expression, before for", "At the end, after the for clause", "Inside the brackets only as if/else"],
        answer: 2,
        explain: "Pattern: [expression for item in iterable if condition] — the filter goes last.",
      },
      {
        q: "What does `[n for row in matrix for n in row]` do?",
        opts: ["Counts items in matrix", "Sorts the matrix", "Flattens a 2D list into a 1D list", "Reverses each row"],
        answer: 2,
        explain: "Two for clauses produce a nested loop — it walks each row, then each item, building a flat list.",
      },
      {
        q: "What is a lambda function?",
        opts: ["A function with no return value", "A small anonymous one-expression function", "A function that runs in parallel", "A function defined with def"],
        answer: 1,
        explain: "Lambdas are tiny, anonymous functions limited to a single expression — useful where you need a quick function inline.",
      },
      {
        q: "What does `{n: n*n for n in range(1, 4)}` produce?",
        opts: ["[1, 4, 9]", "{1, 4, 9}", "{1: 1, 2: 4, 3: 9}", "(1, 4, 9)"],
        answer: 2,
        explain: "Curly braces with a key:value expression make a dict comprehension — n maps to n*n for each n.",
      },
    ],
  },

  {
    day: 14,
    emoji: "🏗️",
    title: "Higher Order Functions",
    subtitle: "Functions that take or return other functions. Master map, filter, reduce, and decorators.",
    topics: ["Functions as values", "map()", "filter()", "reduce()", "Closures", "Decorators"],

    lesson: `
    <div class="lesson-section">
      <h2>Functions Are First-Class Values</h2>
      <p>In Python, functions are <strong>objects</strong>. You can assign them to variables, pass them as arguments, and return them from other functions. A function that takes or returns another function is called a <strong>higher order function</strong>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def shout(text):
    return text.upper()

# Assign function to a variable
yell = shout
print(yell("hello"))   # HELLO

# Pass function as an argument
def apply(func, value):
    return func(value)

print(apply(shout, "hi there"))   # HI THERE</pre>

      <div class="section-divider"></div>
      <h2>The Three Classics: map, filter, reduce</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">map(func, iterable)</div><div class="cheatsheet-desc">Apply func to every item — returns an iterator</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">filter(func, iterable)</div><div class="cheatsheet-desc">Keep items where func returns True</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">reduce(func, iterable)</div><div class="cheatsheet-desc">Combine items pairwise into one value (from functools)</div></div>
      </div>

      <h3>map()</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">numbers = [1, 2, 3, 4]
doubled = list(map(lambda n: n * 2, numbers))
print(doubled)   # [2, 4, 6, 8]</pre>

      <h3>filter()</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">numbers = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda n: n % 2 == 0, numbers))
print(evens)   # [2, 4, 6, 8]</pre>

      <h3>reduce()</h3>
      <p><code>reduce</code> isn't built-in — you import it from <code>functools</code>. It reduces a list to one value by combining pairs:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from functools import reduce

numbers = [1, 2, 3, 4, 5]
total = reduce(lambda a, b: a + b, numbers)
print(total)   # 15  (((1+2)+3)+4)+5</pre>

      <div class="section-divider"></div>
      <h2>Closures</h2>
      <p>A <strong>closure</strong> is a function that "remembers" variables from the scope where it was created — even after that outer scope has finished.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def make_multiplier(n):
    def multiply(x):
        return x * n   # 'n' is remembered
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(10))   # 20
print(triple(10))   # 30</pre>

      <div class="section-divider"></div>
      <h2>Decorators</h2>
      <p>A <strong>decorator</strong> is a function that wraps another function to add behavior — without changing its code. You apply it with <code>@decorator_name</code> above the <code>def</code>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def shouting(func):
    def wrapper(text):
        result = func(text)
        return result.upper() + "!!!"
    return wrapper

@shouting
def greet(name):
    return f"hello {name}"

print(greet("alice"))   # HELLO ALICE!!!</pre>
      <div class="info-box">
        <strong>What <code>@shouting</code> means:</strong> Python rewrites <code>greet = shouting(greet)</code>. Now whenever you call <code>greet()</code>, you're really calling the wrapper that the decorator returned.
      </div>
    </div>
    `,

    examples: [
      {
        title: "Passing a Function as an Argument",
        desc: "Functions are objects — you can pass them around.",
        code: `def square(n):
    return n * n

def cube(n):
    return n ** 3

def apply(func, value):
    return func(value)

print(apply(square, 5))   # 25
print(apply(cube, 5))     # 125`,
      },
      {
        title: "map() with lambda",
        desc: "Transform every item in a list.",
        code: `numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda n: n * 2, numbers))
print(doubled)   # [2, 4, 6, 8, 10]

names = ['alice', 'bob', 'carol']
upper = list(map(str.upper, names))
print(upper)     # ['ALICE', 'BOB', 'CAROL']`,
      },
      {
        title: "filter() — Keep What Matches",
        desc: "Drop items that fail a test.",
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = list(filter(lambda n: n % 2 == 0, numbers))
print(evens)   # [2, 4, 6, 8, 10]

words = ['hi', 'hello', 'hey', 'greetings', 'yo']
long_words = list(filter(lambda w: len(w) > 3, words))
print(long_words)   # ['hello', 'greetings']`,
      },
      {
        title: "reduce() — Collapse to One Value",
        desc: "Combine items pairwise.",
        code: `from functools import reduce

# Sum
total = reduce(lambda a, b: a + b, [1, 2, 3, 4, 5])
print(total)   # 15

# Max
biggest = reduce(lambda a, b: a if a > b else b, [3, 1, 7, 2, 9, 4])
print(biggest)   # 9

# Product
product = reduce(lambda a, b: a * b, [1, 2, 3, 4, 5])
print(product)   # 120`,
      },
      {
        title: "A Simple Decorator",
        desc: "Wrap a function to add behavior.",
        code: `def timestamp(func):
    def wrapper(*args, **kwargs):
        print(f"[Running {func.__name__}...]")
        result = func(*args, **kwargs)
        print(f"[Done]")
        return result
    return wrapper

@timestamp
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
# [Running greet...]
# [Done]
# Hello, Alice!`,
      },
    ],

    exercises: {
      level1: [
        "Explain in your own words the difference between <code>map</code>, <code>filter</code>, and <code>reduce</code>.",
        "Define a function <code>double(n)</code> and pass it to <code>map()</code> with <code>[1,2,3,4,5]</code>.",
        "Use <code>filter()</code> with a lambda to keep only the odd numbers in <code>range(20)</code>.",
        "Use <code>map()</code> with a lambda to convert <code>['python','is','fun']</code> to all uppercase.",
        "Use <code>map()</code> to square each number in <code>[1,2,3,4,5]</code>.",
        "Use <code>filter()</code> with <code>lambda w: len(w) > 4</code> on <code>['hi','hello','hey','python']</code>.",
      ],
      level2: [
        "Use <code>filter()</code> to keep only countries from <code>['Finland','Sweden','Norway','Iceland','Denmark']</code> that contain the substring <code>'land'</code>.",
        "Use <code>filter()</code> to keep countries with exactly 6 letters.",
        "Use <code>filter()</code> to keep countries that start with the letter <code>'E'</code>.",
        "Use <code>reduce()</code> to sum all numbers in <code>[10, 20, 30, 40, 50]</code>.",
        "Use <code>reduce()</code> to concatenate <code>['Python', 'is', 'fun']</code> into the string <code>'Python is fun'</code>.",
        "Write a closure <code>make_adder(n)</code> that returns a function adding <code>n</code> to its argument. Verify <code>make_adder(10)(5) == 15</code>.",
      ],
      level3: [
        "Write a decorator <code>@uppercase</code> that converts the return value of any function it wraps to uppercase.",
        "Chain <code>map()</code> and <code>filter()</code>: take <code>[1,2,3,4,5,6,7,8,9,10]</code>, keep only even numbers, then square each one.",
        "Write a decorator <code>@log_calls</code> that prints the function name and arguments before calling it.",
        "Write a closure <code>counter()</code> that returns a function which, each time it's called, returns 1, 2, 3, ... in order.",
      ],
    },

    quiz: [
      {
        q: "What is a higher order function?",
        opts: ["Any function with more than 5 lines", "A function that takes or returns another function", "A function that runs faster", "A function that uses recursion"],
        answer: 1,
        explain: "Higher order functions take other functions as arguments or return them. map, filter, and reduce are classic examples.",
      },
      {
        q: "What does `list(map(lambda x: x*2, [1,2,3]))` produce?",
        opts: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "[3]"],
        answer: 1,
        explain: "map applies the lambda (x*2) to each element: 1→2, 2→4, 3→6.",
      },
      {
        q: "Where is reduce() defined?",
        opts: ["Built-in (no import needed)", "In the math module", "In the functools module", "In the itertools module"],
        answer: 2,
        explain: "Unlike map and filter, reduce was moved out of built-ins — you must import it: from functools import reduce.",
      },
      {
        q: "What is a closure?",
        opts: ["A function that closes a file", "A function that remembers variables from its enclosing scope", "A function with no return value", "A built-in Python function"],
        answer: 1,
        explain: "A closure is a function defined inside another function that 'captures' and remembers variables from the outer function's scope.",
      },
      {
        q: "What does the @ symbol do above a function definition?",
        opts: ["Comment line", "Applies a decorator to the function", "Marks it as private", "Imports a module"],
        answer: 1,
        explain: "@decorator above a def is syntactic sugar for `func = decorator(func)` — it wraps the function with the decorator.",
      },
    ],
  },

  {
    day: 15,
    emoji: "🐛",
    title: "Python Type Errors",
    subtitle: "Read tracebacks like a detective. Understand the most common Python errors and how to fix them.",
    topics: ["Reading tracebacks", "SyntaxError", "NameError", "TypeError", "ValueError", "IndexError & KeyError", "ImportError"],

    lesson: `
    <div class="lesson-section">
      <h2>How to Read a Traceback</h2>
      <p>When Python hits an error, it stops and prints a <strong>traceback</strong> — a report of what went wrong and where. Read it from <em>bottom to top</em>: the last line tells you the error type and message; the lines above show where it happened.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">Traceback (most recent call last):
  File "main.py", line 3, in <module>
    print(x)
NameError: name 'x' is not defined</pre>
      <div class="info-box">
        <strong>The fix is in the message.</strong> Almost every error tells you what's missing or wrong. Learning to read tracebacks is half the battle.
      </div>

      <div class="section-divider"></div>
      <h2>The Big Ten — Errors You'll Actually See</h2>

      <h3>1. SyntaxError</h3>
      <p>You wrote something Python can't parse. Often a missing parenthesis, colon, or quote.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">print "Hello"        # SyntaxError — Python 3 needs parentheses
print("Hello")       # ✓</pre>

      <h3>2. NameError</h3>
      <p>You used a name that wasn't defined.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">print(age)           # NameError: name 'age' is not defined
age = 30
print(age)           # ✓ 30</pre>

      <h3>3. IndexError</h3>
      <p>You asked for a list index that doesn't exist.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">colors = ['red', 'green']
print(colors[5])     # IndexError: list index out of range
print(colors[1])     # ✓ green</pre>

      <h3>4. KeyError</h3>
      <p>You asked for a dictionary key that doesn't exist.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">user = {'name': 'Alice'}
print(user['age'])   # KeyError: 'age'
print(user.get('age', 'unknown'))   # ✓ uses default</pre>

      <h3>5. TypeError</h3>
      <p>You used an operation on the wrong type — like adding a number to a string.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">result = '4' + 4     # TypeError: can only concatenate str to str
result = int('4') + 4   # ✓ 8</pre>

      <h3>6. ValueError</h3>
      <p>The type is right but the value can't be used. Classic: converting a non-numeric string to <code>int</code>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">n = int('hello')     # ValueError: invalid literal for int()
n = int('42')        # ✓ 42</pre>

      <h3>7. AttributeError</h3>
      <p>You called a method that doesn't exist on this object.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">numbers = [1, 2, 3]
numbers.push(4)      # AttributeError — lists have no .push()
numbers.append(4)    # ✓</pre>

      <h3>8. ZeroDivisionError</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">result = 10 / 0      # ZeroDivisionError: division by zero
result = 10 / 2      # ✓ 5.0</pre>

      <h3>9. ImportError / ModuleNotFoundError</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">import maath        # ModuleNotFoundError — typo
import math         # ✓

from math import sqrtt   # ImportError — name doesn't exist
from math import sqrt    # ✓</pre>

      <h3>10. IndentationError</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">def greet():
print("Hello")       # IndentationError — body not indented

def greet():
    print("Hello")   # ✓</pre>

      <div class="section-divider"></div>
      <div class="info-box">
        <strong>Pro tip:</strong> When you see an error you don't recognize, copy the last line into a search engine. Almost every Python error has a clear, common cause.
      </div>
    </div>
    `,

    examples: [
      {
        title: "NameError — Undefined Variable",
        desc: "Try running, then fix it.",
        code: `# This raises NameError
# print(score)

# Define it first
score = 100
print(score)   # ✓ 100`,
      },
      {
        title: "TypeError — Mixing Types",
        desc: "Can't add a string and a number directly.",
        code: `age = '25'
# total = age + 5         # TypeError
total = int(age) + 5      # ✓ convert first
print(total)              # 30

# Same problem in reverse
# msg = 'You are ' + 25   # TypeError
msg = 'You are ' + str(25) + ' years old'
print(msg)`,
      },
      {
        title: "IndexError and KeyError",
        desc: "Out-of-bounds list or missing dict key.",
        code: `colors = ['red', 'green', 'blue']
# print(colors[10])     # IndexError
print(colors[-1])       # ✓ 'blue'

user = {'name': 'Alice', 'age': 30}
# print(user['email'])  # KeyError
print(user.get('email', 'no email'))   # ✓ default value`,
      },
      {
        title: "ValueError — Bad Conversion",
        desc: "int() on a non-numeric string fails.",
        code: `# n = int('hello')   # ValueError
n = int('42')        # ✓ 42
print(n)

# Safe conversion pattern
def safe_int(s):
    try:
        return int(s)
    except ValueError:
        return None

print(safe_int('100'))      # 100
print(safe_int('oops'))     # None`,
      },
      {
        title: "ZeroDivisionError",
        desc: "Divide-by-zero is always an error.",
        code: `def safe_divide(a, b):
    if b == 0:
        return "Can't divide by zero"
    return a / b

print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # Can't divide by zero`,
      },
    ],

    exercises: {
      level1: [
        "Predict the error type: <code>print(x)</code> when <code>x</code> is not defined.",
        "Predict the error type: <code>print([1,2,3][5])</code>.",
        "Predict the error type: <code>print('hello' + 5)</code>.",
        "Predict the error type: <code>print(int('abc'))</code>.",
        "Predict the error type: <code>print(10 / 0)</code>.",
        "Predict the error type: <code>import xyzmodule</code>.",
      ],
      level2: [
        "Run each broken example in the lesson in the playground, observe the error message, then fix it.",
        "Write a function that catches a <code>ValueError</code> when converting a string to <code>int</code> and returns <code>0</code> instead.",
        "Write code that produces a <code>KeyError</code>, then rewrite it using <code>.get()</code> with a default value.",
        "Write code that produces an <code>IndexError</code>, then rewrite it to check <code>len(lst)</code> first.",
        "Write code that produces a <code>TypeError</code> by adding a string and a number — then fix it with proper conversion.",
        "Write a function <code>safe_divide(a, b)</code> that returns <code>None</code> when <code>b == 0</code>.",
      ],
      level3: [
        "Write a function <code>parse_int_list(strings)</code> that takes a list of strings and returns a list of integers, skipping any string that can't be converted.",
        "Write a function that takes a dictionary and a list of keys and returns a list of the values, using <code>None</code> for missing keys.",
        "Read the traceback of a multi-function call and identify exactly which line caused the error.",
        "Write a wrapper function <code>try_run(func, *args)</code> that calls <code>func</code> with <code>args</code> and prints the error type if it fails.",
      ],
    },

    quiz: [
      {
        q: "What does `NameError: name 'x' is not defined` mean?",
        opts: ["x is the wrong type", "You used x before defining it", "x is read-only", "x is too big"],
        answer: 1,
        explain: "NameError means Python looked up the name and didn't find it in any scope — it was never assigned.",
      },
      {
        q: "Which error does `int('hello')` raise?",
        opts: ["TypeError", "ValueError", "SyntaxError", "NameError"],
        answer: 1,
        explain: "The type (string) is correct for int(), but the value 'hello' can't be parsed as a number — that's a ValueError.",
      },
      {
        q: "Which error does `[1,2,3][10]` raise?",
        opts: ["KeyError", "TypeError", "IndexError", "ValueError"],
        answer: 2,
        explain: "Lists raise IndexError when the index is outside the valid range. (Dictionaries raise KeyError.)",
      },
      {
        q: "How should you read a Python traceback?",
        opts: ["Top to bottom", "Bottom to top — the error message is on the last line", "Only the first line matters", "Skip it and re-run"],
        answer: 1,
        explain: "Read tracebacks from the bottom up. The last line tells you the error type and message; the lines above trace the call path.",
      },
      {
        q: "What error does `import maath` raise?",
        opts: ["NameError", "ValueError", "ModuleNotFoundError", "SyntaxError"],
        answer: 2,
        explain: "When Python can't find a module with that name, it raises ModuleNotFoundError (a subclass of ImportError).",
      },
    ],
  },

  {
    day: 16,
    emoji: "📅",
    title: "Python DateTime",
    subtitle: "Work with dates and times. Format, parse, calculate durations, and use timedelta.",
    topics: ["datetime.now()", "date & time", "strftime", "strptime", "timedelta", "Time differences"],

    lesson: `
    <div class="lesson-section">
      <h2>The <code>datetime</code> Module</h2>
      <p>The <strong><code>datetime</code></strong> module gives you classes for working with dates and times. It's part of the standard library — no install needed.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from datetime import datetime, date, time, timedelta

now = datetime.now()
print(now)            # 2026-05-15 14:23:45.123456
print(now.year)       # 2026
print(now.month)      # 5
print(now.day)        # 15
print(now.hour)       # 14</pre>

      <div class="section-divider"></div>
      <h2>Formatting with <code>strftime</code></h2>
      <p><strong><code>strftime</code></strong> ("string format time") turns a datetime into a custom string. You pass a format string built from special codes:</p>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">%Y</div><div class="cheatsheet-desc">4-digit year (2026)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">%m</div><div class="cheatsheet-desc">Month as number (01–12)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">%d</div><div class="cheatsheet-desc">Day of month (01–31)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">%B</div><div class="cheatsheet-desc">Full month name (May)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">%A</div><div class="cheatsheet-desc">Full weekday name (Friday)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">%H:%M:%S</div><div class="cheatsheet-desc">Hour:minute:second</div></div>
      </div>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from datetime import datetime

now = datetime.now()
print(now.strftime("%Y-%m-%d"))            # 2026-05-15
print(now.strftime("%d/%m/%Y, %H:%M:%S"))  # 15/05/2026, 14:23:45
print(now.strftime("%A, %B %d, %Y"))       # Friday, May 15, 2026</pre>

      <div class="section-divider"></div>
      <h2>Parsing with <code>strptime</code></h2>
      <p><strong><code>strptime</code></strong> ("string parse time") goes the other way — text to datetime. You give it the string AND the format code:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from datetime import datetime

text = "15 May, 2026"
date_obj = datetime.strptime(text, "%d %B, %Y")
print(date_obj)          # 2026-05-15 00:00:00
print(date_obj.year)     # 2026</pre>

      <div class="section-divider"></div>
      <h2><code>date</code> and <code>time</code> Alone</h2>
      <p>If you only need the date or time part:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from datetime import date, time

today = date.today()
print(today)             # 2026-05-15

birthday = date(2013, 10, 11)
print(birthday)          # 2013-10-11

t = time(14, 30, 0)
print(t)                 # 14:30:00</pre>

      <div class="section-divider"></div>
      <h2>Time Differences with <code>timedelta</code></h2>
      <p>Subtracting two dates gives a <strong><code>timedelta</code></strong> — a duration:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from datetime import datetime, timedelta

now = datetime.now()
new_year = datetime(2027, 1, 1)
diff = new_year - now

print(diff.days)          # 231 (or however many days away)
print(diff.seconds)       # leftover seconds

# Add or subtract duration
tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
two_hours_later = now + timedelta(hours=2)
print(tomorrow)
print(next_week)
print(two_hours_later)</pre>

      <div class="info-box">
        <strong>Real use cases:</strong> scheduling reminders, calculating ages, measuring how long a task took, formatting timestamps for logs, finding business days between two dates.
      </div>
    </div>
    `,

    examples: [
      {
        title: "Get Current Date and Time",
        desc: "Pull each piece out of datetime.now().",
        code: `from datetime import datetime

now = datetime.now()
print("Now:    ", now)
print("Year:   ", now.year)
print("Month:  ", now.month)
print("Day:    ", now.day)
print("Hour:   ", now.hour)
print("Minute: ", now.minute)
print("Second: ", now.second)
print("Weekday:", now.strftime("%A"))`,
      },
      {
        title: "Formatting with strftime",
        desc: "Turn datetime into a custom string.",
        code: `from datetime import datetime

now = datetime.now()

print(now.strftime("%Y-%m-%d"))
print(now.strftime("%d/%m/%Y, %H:%M:%S"))
print(now.strftime("%B %d, %Y"))
print(now.strftime("%A, %d %B %Y"))
print(now.strftime("%I:%M %p"))`,
      },
      {
        title: "Parsing with strptime",
        desc: "Read text into a datetime object.",
        code: `from datetime import datetime

text = "5 December, 2019"
parsed = datetime.strptime(text, "%d %B, %Y")

print(parsed)              # 2019-12-05 00:00:00
print(parsed.year)         # 2019
print(parsed.month)        # 12
print(parsed.day)          # 5
print(parsed.strftime("%A"))   # Thursday`,
      },
      {
        title: "Time Difference",
        desc: "Subtract dates to get a duration.",
        code: `from datetime import datetime, date

today = date.today()
new_year = date(today.year + 1, 1, 1)
diff = new_year - today

print(f"Days until new year: {diff.days}")

# Age in days
birthday = date(2013, 10, 11)
days_old = (today - birthday).days
print(f"You are {days_old} days old")`,
      },
      {
        title: "timedelta — Adding and Subtracting Time",
        desc: "Move dates forward or backward.",
        code: `from datetime import datetime, timedelta

now = datetime.now()

print("Now:           ", now)
print("Tomorrow:      ", now + timedelta(days=1))
print("Next week:     ", now + timedelta(weeks=1))
print("3 hours later: ", now + timedelta(hours=3))
print("2 days ago:    ", now - timedelta(days=2))`,
      },
    ],

    exercises: {
      level1: [
        "Import <code>datetime</code> and print the current date and time.",
        "Print just the current <code>year</code>, <code>month</code>, and <code>day</code> using attributes on <code>datetime.now()</code>.",
        "Print today's date as <code>YYYY-MM-DD</code> using <code>strftime</code>.",
        "Print today's date as <code>DD/MM/YYYY, HH:MM:SS</code>.",
        "Print the full weekday name (e.g. <code>Monday</code>) for today using <code>%A</code>.",
        "Create a <code>date</code> object for January 1, 2030 and print it.",
      ],
      level2: [
        "Parse the string <code>'5 December, 2019'</code> into a datetime object using <code>strptime</code>.",
        "Calculate how many days until next New Year's Day from today.",
        "Use <code>timedelta(days=30)</code> to print the date 30 days from now.",
        "Use <code>timedelta(weeks=2, hours=3)</code> to print a future datetime.",
        "Calculate the difference in days between January 1, 1970 and today.",
        "Given a birth date, write a function that returns the person's age in years.",
      ],
      level3: [
        "Write a function <code>days_between(date1, date2)</code> that returns the number of days between two date strings in <code>YYYY-MM-DD</code> format.",
        "Write a function <code>is_weekend(date_obj)</code> that returns <code>True</code> if the date falls on Saturday or Sunday.",
        "Write a function <code>add_business_days(start, n)</code> that returns the date <code>n</code> business days (Mon–Fri) after <code>start</code>.",
        "Use <code>datetime</code> to time how long a loop takes: store <code>datetime.now()</code> before and after, then print the <code>timedelta</code>.",
      ],
    },

    quiz: [
      {
        q: "Which module gives you the datetime class?",
        opts: ["time", "date", "datetime", "calendar"],
        answer: 2,
        explain: "The datetime module contains the datetime class. Import with `from datetime import datetime`.",
      },
      {
        q: "What does `strftime` do?",
        opts: ["Parses a string into a date", "Formats a datetime as a custom string", "Returns the current time", "Compares two dates"],
        answer: 1,
        explain: "strftime = 'string format time' — turns a datetime into a custom-formatted string using % codes.",
      },
      {
        q: "What format code prints the full weekday name?",
        opts: ["%w", "%A", "%D", "%W"],
        answer: 1,
        explain: "%A is the full weekday name (Monday, Tuesday, ...). %a is the short version (Mon, Tue).",
      },
      {
        q: "What does subtracting two datetime objects return?",
        opts: ["A number of seconds", "A new datetime", "A timedelta", "A string"],
        answer: 2,
        explain: "datetime - datetime gives a timedelta — a duration object with .days and .seconds attributes.",
      },
      {
        q: "How do you get tomorrow's date from today?",
        opts: ["today + 1", "today.add_day()", "today + timedelta(days=1)", "today.next()"],
        answer: 2,
        explain: "Use timedelta(days=1) and add it: `tomorrow = today + timedelta(days=1)`.",
      },
    ],
  },

  {
    day: 17,
    emoji: "🛡️",
    title: "Exception Handling",
    subtitle: "Catch errors before they crash your program. Master try, except, else, finally, and raise.",
    topics: ["try / except", "Multiple except", "except as e", "else & finally", "raise", "Custom exceptions"],

    lesson: `
    <div class="lesson-section">
      <h2>Why Handle Exceptions?</h2>
      <p>If your code might fail — bad user input, missing file, network error — you can <strong>catch</strong> the failure instead of letting your program crash. That's exception handling.</p>

      <div class="section-divider"></div>
      <h2>Basic try / except</h2>
      <p>Put the risky code in <code>try</code>. If anything goes wrong, control jumps to <code>except</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">try:
    n = int("hello")
except:
    print("That wasn't a number!")

# Program continues
print("Still running")</pre>

      <div class="info-box warning">
        <strong>Avoid bare <code>except:</code></strong> — it catches everything, including bugs you didn't expect. Always catch a specific error type when you can.
      </div>

      <div class="section-divider"></div>
      <h2>Catching a Specific Error</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">try:
    n = int("hello")
except ValueError:
    print("Couldn't convert to int")</pre>

      <h3>Multiple specific errors</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">try:
    n = int(input_string)
    result = 100 / n
except ValueError:
    print("Not a valid number")
except ZeroDivisionError:
    print("Can't divide by zero")</pre>

      <div class="section-divider"></div>
      <h2>Capturing the Error: <code>except ... as e</code></h2>
      <p>Use <code>as</code> to get the actual exception object — useful for logging or showing the message:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">try:
    n = int("hello")
except ValueError as e:
    print(f"Error: {e}")
# Error: invalid literal for int() with base 10: 'hello'</pre>

      <div class="section-divider"></div>
      <h2><code>else</code> and <code>finally</code></h2>
      <ul style="margin:8px 0 16px 24px;color:var(--text-2);line-height:1.8">
        <li><strong><code>else</code></strong> — runs only if the <code>try</code> block succeeded (no exception)</li>
        <li><strong><code>finally</code></strong> — runs no matter what, even if an exception was raised</li>
      </ul>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">try:
    n = int("42")
except ValueError:
    print("Bad number")
else:
    print(f"Got {n}")        # only if no error
finally:
    print("Cleanup runs every time")</pre>

      <div class="section-divider"></div>
      <h2>Raising Your Own Exceptions</h2>
      <p>Use <strong><code>raise</code></strong> to trigger an exception yourself — when bad input deserves a hard stop:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

print(set_age(25))   # 25
# print(set_age(-3))   # ValueError: Age cannot be negative</pre>

      <div class="section-divider"></div>
      <h2>Custom Exception Classes</h2>
      <p>Create your own exception by inheriting from <code>Exception</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">class TooYoungError(Exception):
    pass

def check_age(age):
    if age < 13:
        raise TooYoungError(f"Age {age} is too young to join")
    return "Welcome!"

try:
    print(check_age(10))
except TooYoungError as e:
    print(f"Sorry: {e}")
# Sorry: Age 10 is too young to join</pre>
    </div>
    `,

    examples: [
      {
        title: "Basic try / except",
        desc: "Catch a bad conversion.",
        code: `def safe_int(s):
    try:
        return int(s)
    except ValueError:
        return None

print(safe_int('42'))     # 42
print(safe_int('hello'))  # None
print(safe_int('3.14'))   # None  (int() can't parse decimals)`,
      },
      {
        title: "Multiple except Clauses",
        desc: "Handle different error types differently.",
        code: `def divide(a, b):
    try:
        return int(a) / int(b)
    except ValueError:
        return "One of those wasn't a number"
    except ZeroDivisionError:
        return "Can't divide by zero"

print(divide('10', '2'))      # 5.0
print(divide('hi', '2'))      # One of those wasn't a number
print(divide('10', '0'))      # Can't divide by zero`,
      },
      {
        title: "except ... as e — Getting the Message",
        desc: "Capture the exception object.",
        code: `try:
    user = {'name': 'Alice'}
    print(user['email'])
except KeyError as e:
    print(f"Missing key: {e}")
# Missing key: 'email'

try:
    n = int('not-a-number')
except ValueError as e:
    print(f"Bad input — {e}")`,
      },
      {
        title: "else and finally",
        desc: "Run code only on success / always.",
        code: `def parse_age(s):
    try:
        age = int(s)
    except ValueError:
        print("Bad input")
    else:
        print(f"Got age: {age}")
    finally:
        print("Done parsing")
    print("---")

parse_age('25')
parse_age('hello')`,
      },
      {
        title: "raise and Custom Exceptions",
        desc: "Throw your own errors.",
        code: `class NegativeNumberError(Exception):
    pass

def square_root(n):
    if n < 0:
        raise NegativeNumberError(f"Can't sqrt negative number: {n}")
    return n ** 0.5

try:
    print(square_root(16))    # 4.0
    print(square_root(-9))    # raises
except NegativeNumberError as e:
    print(f"Error: {e}")`,
      },
    ],

    exercises: {
      level1: [
        "Wrap <code>int('hello')</code> in a <code>try/except ValueError</code> that prints <code>'bad input'</code>.",
        "Wrap <code>10 / 0</code> in a <code>try/except ZeroDivisionError</code>.",
        "Wrap a dictionary lookup that misses (<code>{'a': 1}['b']</code>) in a <code>try/except KeyError</code>.",
        "Wrap a list lookup that's out of bounds in <code>try/except IndexError</code>.",
        "Catch the error message with <code>except ValueError as e</code> and print it.",
        "Use a <code>finally</code> block that prints <code>'cleanup'</code> regardless of what happens.",
      ],
      level2: [
        "Write a function <code>safe_divide(a, b)</code> that uses <code>try/except ZeroDivisionError</code> and returns <code>None</code> on failure.",
        "Write a function <code>parse_int(s)</code> that uses <code>try/except ValueError</code> and returns <code>0</code> if the string can't be converted.",
        "Write a loop that asks for a list of values and converts each to <code>int</code>, skipping ones that fail.",
        "Use <code>raise ValueError('...')</code> inside a function that rejects negative numbers.",
        "Use both <code>else</code> and <code>finally</code> in one <code>try</code> block.",
        "Catch two different error types in the same <code>try</code> block with two <code>except</code> clauses.",
      ],
      level3: [
        "Create a custom exception class <code>InvalidEmailError</code> and a function that raises it if a string has no <code>'@'</code>.",
        "Write a function <code>retry(func, attempts=3)</code> that calls <code>func</code> and retries up to <code>attempts</code> times on any exception.",
        "Write a function <code>safe_get(d, *keys)</code> that navigates nested dicts and returns <code>None</code> if any key is missing.",
        "Write a context-style function using <code>try/finally</code> that simulates opening and always closing a resource, even on error.",
      ],
    },

    quiz: [
      {
        q: "What does the `try` block contain?",
        opts: ["The error handler", "Code that might raise an exception", "Cleanup code", "Code that always runs"],
        answer: 1,
        explain: "Put potentially-failing code inside try. If an exception happens, control jumps to the matching except clause.",
      },
      {
        q: "Why is `except:` (bare except) discouraged?",
        opts: ["It's slower", "It catches every exception including ones you didn't anticipate (like KeyboardInterrupt)", "It's deprecated", "It causes infinite loops"],
        answer: 1,
        explain: "Bare except swallows ALL exceptions including bugs and system interrupts — catch specific types instead.",
      },
      {
        q: "When does the `finally` block run?",
        opts: ["Only when an exception is raised", "Only when no exception is raised", "Always — exception or not", "Only when else runs"],
        answer: 2,
        explain: "finally always runs, making it perfect for cleanup like closing files or releasing resources.",
      },
      {
        q: "What does `raise ValueError('bad')` do?",
        opts: ["Catches a ValueError", "Triggers a ValueError manually", "Defines a new exception class", "Prints 'bad'"],
        answer: 1,
        explain: "raise manually triggers an exception. The string is the error message attached to it.",
      },
      {
        q: "How do you capture the exception object for inspection?",
        opts: ["except ValueError: e", "except ValueError as e:", "except ValueError -> e:", "except e is ValueError:"],
        answer: 1,
        explain: "The 'as' keyword binds the exception object to a variable name you choose — typically `e`.",
      },
    ],
  },

  {
    day: 18,
    emoji: "🔍",
    title: "Regular Expressions",
    subtitle: "Find, match, and transform text patterns with the re module. Powerful pattern matching in one line.",
    topics: ["re.match & re.search", "re.findall", "re.sub", "Character classes", "Quantifiers", "Groups"],

    lesson: `
    <div class="lesson-section">
      <h2>What is a Regular Expression?</h2>
      <p>A <strong>regular expression</strong> (regex) is a tiny pattern language for describing text. You can use it to find, match, replace, or split strings based on rules — instead of writing loops with <code>if</code>s.</p>
      <p>In Python, regex lives in the <strong><code>re</code></strong> module.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import re

text = "I have 3 apples and 12 oranges."
numbers = re.findall(r"\\d+", text)
print(numbers)   # ['3', '12']</pre>

      <div class="section-divider"></div>
      <h2>The Main <code>re</code> Functions</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">re.match(pattern, str)</div><div class="cheatsheet-desc">Match only at the START of the string</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">re.search(pattern, str)</div><div class="cheatsheet-desc">Find first match ANYWHERE</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">re.findall(pattern, str)</div><div class="cheatsheet-desc">Return list of all matches</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">re.sub(pattern, repl, str)</div><div class="cheatsheet-desc">Replace matches with new text</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">re.split(pattern, str)</div><div class="cheatsheet-desc">Split string at every match</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Pattern Building Blocks</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">.</div><div class="cheatsheet-desc">Any single character (except newline)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">\\d</div><div class="cheatsheet-desc">A digit (0–9)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">\\D</div><div class="cheatsheet-desc">NOT a digit</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">\\w</div><div class="cheatsheet-desc">Word character (letter, digit, underscore)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">\\s</div><div class="cheatsheet-desc">Whitespace (space, tab, newline)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">[abc]</div><div class="cheatsheet-desc">Any one of a, b, or c</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">[a-z]</div><div class="cheatsheet-desc">Any lowercase letter</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">[^abc]</div><div class="cheatsheet-desc">Anything EXCEPT a, b, or c</div></div>
      </div>

      <h3>Quantifiers — how many?</h3>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">*</div><div class="cheatsheet-desc">0 or more</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">+</div><div class="cheatsheet-desc">1 or more</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">?</div><div class="cheatsheet-desc">0 or 1 (optional)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{3}</div><div class="cheatsheet-desc">exactly 3</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{2,5}</div><div class="cheatsheet-desc">2 to 5</div></div>
      </div>

      <h3>Anchors — where?</h3>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">^</div><div class="cheatsheet-desc">Start of string</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">$</div><div class="cheatsheet-desc">End of string</div></div>
      </div>

      <div class="info-box">
        <strong>Always use raw strings:</strong> Write <code>r"\\d+"</code>, not <code>"\\d+"</code>. The <code>r</code> tells Python "don't interpret backslashes" so regex shortcuts like <code>\\d</code> survive.
      </div>

      <div class="section-divider"></div>
      <h2>Groups with <code>()</code></h2>
      <p>Parentheses capture parts of the match so you can pull them out:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import re

text = "Charles is 12 years old."
m = re.search(r"(\\w+) is (\\d+) years old", text)
if m:
    print(m.group(0))   # whole match
    print(m.group(1))   # 'Charles'
    print(m.group(2))   # '12'</pre>

      <div class="section-divider"></div>
      <h2>Replacing with <code>re.sub</code></h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import re

text = "Call me at 555-1234 or 555-9999."
hidden = re.sub(r"\\d", "*", text)
print(hidden)
# Call me at ***-**** or ***-****.</pre>
    </div>
    `,

    examples: [
      {
        title: "Find All Numbers in Text",
        desc: "Pull every digit-run out of a string.",
        code: `import re

text = "There are 3 cats, 12 dogs, and 7 hamsters."
nums = re.findall(r"\\d+", text)
print(nums)              # ['3', '12', '7']

# Convert to ints
totals = [int(n) for n in nums]
print(sum(totals))       # 22`,
      },
      {
        title: "re.search vs re.match",
        desc: "search() finds anywhere; match() only at the start.",
        code: `import re

text = "hello world"

m1 = re.match(r"world", text)
print(m1)   # None — not at start

m2 = re.search(r"world", text)
print(m2)   # <re.Match object; ...>
print(m2.group())   # 'world'`,
      },
      {
        title: "Replace with re.sub",
        desc: "Mask all digits in a string.",
        code: `import re

text = "My number is 555-867-5309."
masked = re.sub(r"\\d", "*", text)
print(masked)   # My number is ***-***-****.

# Replace with a string
shouty = re.sub(r"\\bworld\\b", "WORLD", "hello world wide world")
print(shouty)   # hello WORLD wide WORLD`,
      },
      {
        title: "Splitting Text",
        desc: "Use a regex to split on any non-word character.",
        code: `import re

sentence = "Python, is; really: powerful! And -- fun."
words = re.split(r"[^\\w]+", sentence)
print(words)
# ['Python', 'is', 'really', 'powerful', 'And', 'fun', '']

# Filter out empties
clean = [w for w in words if w]
print(clean)`,
      },
      {
        title: "Capturing Groups",
        desc: "Pull dates apart into year, month, day.",
        code: `import re

text = "Today is 2026-05-15."
m = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", text)
if m:
    print("Year: ", m.group(1))    # 2026
    print("Month:", m.group(2))    # 05
    print("Day:  ", m.group(3))    # 15
    print("Full: ", m.group(0))    # 2026-05-15`,
      },
    ],

    exercises: {
      level1: [
        "Use <code>re.findall(r'\\d+', text)</code> to extract all numbers from <code>'I have 3 apples and 12 oranges'</code>.",
        "Use <code>re.search()</code> to check if the word <code>'python'</code> appears in a string.",
        "Use <code>re.match()</code> to check whether a string STARTS with <code>'hello'</code>.",
        "Use <code>re.sub(r'\\d', '*', text)</code> to mask all digits.",
        "Use <code>re.split(r'\\s+', text)</code> to split a string on whitespace.",
        "Use a character class <code>[aeiou]</code> with <code>re.findall</code> to count vowels in a sentence.",
      ],
      level2: [
        "Use <code>re.findall(r'-?\\d+', text)</code> to extract positive AND negative numbers.",
        "Write a regex that validates a Python variable name: starts with a letter or underscore, followed by letters, digits, or underscores.",
        "Use <code>re.sub</code> to strip all punctuation from a sentence (replace <code>[^\\w\\s]</code> with <code>''</code>).",
        "Use <code>re.split</code> on a paragraph to get a list of all words, then count word frequencies.",
        "Write a regex with capturing groups to extract <code>(year, month, day)</code> from <code>'2026-05-15'</code>.",
        "Validate an email-like string using <code>r'\\w+@\\w+\\.\\w+'</code>.",
      ],
      level3: [
        "Given a paragraph, find the most common word using <code>re.findall(r'\\w+', text.lower())</code> + a dictionary count.",
        "Extract all hashtags (words starting with <code>#</code>) from a tweet-like string.",
        "Find the difference between the largest and smallest numbers in a text using a regex.",
        "Write a function <code>clean_text(s)</code> that removes all special characters and returns the three most frequent words.",
      ],
    },

    quiz: [
      {
        q: "What does `re.findall(r'\\d+', text)` return?",
        opts: ["A single match object", "A boolean True/False", "A list of all matched substrings", "The first match only"],
        answer: 2,
        explain: "findall returns a list of every match in the string. r'\\d+' matches one or more digits, so you get a list of digit-runs.",
      },
      {
        q: "What is the difference between re.match and re.search?",
        opts: ["No difference", "match only checks the start; search finds anywhere", "match is faster", "search returns a list"],
        answer: 1,
        explain: "re.match anchors to the start of the string; re.search scans the whole string for the first match.",
      },
      {
        q: "What does the `+` quantifier mean?",
        opts: ["Exactly one", "Zero or one", "One or more", "Zero or more"],
        answer: 2,
        explain: "+ means one or more occurrences. * means zero or more. ? means zero or one.",
      },
      {
        q: "What does `\\d` match?",
        opts: ["Any character", "Any digit (0–9)", "Whitespace", "A literal 'd'"],
        answer: 1,
        explain: "\\d is shorthand for [0-9] — any single digit character.",
      },
      {
        q: "Why use a raw string `r'...'` for regex patterns?",
        opts: ["It's faster", "So Python doesn't interpret backslashes — your regex escapes survive", "Required for findall only", "It's case-sensitive"],
        answer: 1,
        explain: "Raw strings prevent Python from processing \\n, \\t, \\d, etc., so the regex engine sees your pattern exactly as written.",
      },
    ],
  },

  {
    day: 19,
    emoji: "📂",
    title: "File Handling",
    subtitle: "Read, write, and manage files. Work with text, JSON, and CSV — the building blocks of real data work.",
    topics: ["open() & modes", "with statement", "read & write", "JSON files", "CSV files", "Deleting files"],

    lesson: `
    <div class="lesson-section">
      <h2>Opening a File</h2>
      <p>Use the built-in <strong><code>open()</code></strong> function. It takes a filename and a <strong>mode</strong>:</p>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">'r'</div><div class="cheatsheet-desc">Read (default) — file must exist</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">'w'</div><div class="cheatsheet-desc">Write — overwrites or creates</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">'a'</div><div class="cheatsheet-desc">Append — adds to the end</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">'x'</div><div class="cheatsheet-desc">Create — fails if file exists</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">'r+'</div><div class="cheatsheet-desc">Read AND write</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">'b'</div><div class="cheatsheet-desc">Binary mode (e.g. 'rb' for binary read)</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>The <code>with</code> Statement (Always Use It)</h2>
      <p>Files need to be closed when you're done. The <strong><code>with</code></strong> statement does this for you automatically — even if an error happens:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">with open("notes.txt", "r") as f:
    contents = f.read()
    print(contents)
# file is automatically closed here</pre>

      <div class="info-box warning">
        <strong>The old way:</strong> <code>f = open(...)</code> followed by <code>f.close()</code> works, but if an error happens between them, the file stays open and may leak. <code>with</code> prevents that.
      </div>

      <div class="section-divider"></div>
      <h2>Reading Files</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">f.read()</div><div class="cheatsheet-desc">Whole file as one string</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">f.readline()</div><div class="cheatsheet-desc">One line at a time</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">f.readlines()</div><div class="cheatsheet-desc">List of all lines</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">for line in f:</div><div class="cheatsheet-desc">Iterate line by line (most memory-efficient)</div></div>
      </div>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">with open("notes.txt") as f:
    for line in f:
        print(line.strip())</pre>

      <div class="section-divider"></div>
      <h2>Writing Files</h2>
      <p><code>"w"</code> opens for writing — it ERASES existing content. Use <code>"a"</code> to append.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">with open("notes.txt", "w") as f:
    f.write("Hello, world!\\n")
    f.write("Second line.\\n")

with open("notes.txt", "a") as f:
    f.write("Appended line.\\n")</pre>

      <div class="section-divider"></div>
      <h2>JSON Files</h2>
      <p><strong>JSON</strong> (JavaScript Object Notation) is a universal data format that maps cleanly to Python dicts and lists. Use the <code>json</code> module:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import json

# Write a dict as JSON
data = {"name": "Charles", "age": 12, "hobbies": ["coding", "chess"]}
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read JSON back into a dict
with open("data.json") as f:
    loaded = json.load(f)
print(loaded["name"])   # Charles</pre>

      <div class="info-box">
        <strong>4 functions to remember:</strong>
        <ul style="margin-top:8px;padding-left:20px">
          <li><code>json.dump(data, file)</code> — write to file</li>
          <li><code>json.load(file)</code> — read from file</li>
          <li><code>json.dumps(data)</code> — convert to JSON string</li>
          <li><code>json.loads(text)</code> — parse JSON string</li>
        </ul>
      </div>

      <div class="section-divider"></div>
      <h2>CSV Files</h2>
      <p><strong>CSV</strong> (Comma-Separated Values) is the simplest tabular format. Use the <code>csv</code> module:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import csv

# Write rows
with open("scores.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "score"])
    writer.writerow(["Alice", 95])
    writer.writerow(["Bob", 82])

# Read rows
with open("scores.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)</pre>

      <div class="section-divider"></div>
      <h2>Deleting Files</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import os

if os.path.exists("notes.txt"):
    os.remove("notes.txt")
    print("Deleted.")
else:
    print("File doesn't exist.")</pre>
    </div>
    `,

    examples: [
      {
        title: "Write and Read a Text File (in-memory demo)",
        desc: "Use io.StringIO to simulate a file without touching disk.",
        code: `import io

# Pretend this is a file
fake_file = io.StringIO()
fake_file.write("Line 1\\n")
fake_file.write("Line 2\\n")
fake_file.write("Line 3\\n")

# Rewind and read it back
fake_file.seek(0)
for line in fake_file:
    print(line.strip())`,
      },
      {
        title: "JSON — Dict to String and Back",
        desc: "Use dumps/loads to convert without files.",
        code: `import json

data = {
    "name": "Charles",
    "age": 12,
    "hobbies": ["python", "chess"]
}

# Dict → JSON string
text = json.dumps(data, indent=2)
print(text)

# JSON string → dict
parsed = json.loads(text)
print(parsed["name"])              # Charles
print(parsed["hobbies"][0])        # python`,
      },
      {
        title: "CSV — Build and Parse with StringIO",
        desc: "Write CSV rows to memory, then read them back.",
        code: `import csv
import io

# Write to in-memory file
buf = io.StringIO()
writer = csv.writer(buf)
writer.writerow(["name", "score"])
writer.writerow(["Alice", 95])
writer.writerow(["Bob", 82])
writer.writerow(["Carol", 88])

# Read it back
buf.seek(0)
reader = csv.reader(buf)
for row in reader:
    print(row)`,
      },
      {
        title: "Count Lines and Words",
        desc: "Common file-analysis pattern.",
        code: `text = """Python is great.
Reading files is easy.
JSON and CSV make data simple.
"""

lines = text.strip().split("\\n")
print(f"Lines: {len(lines)}")

word_count = sum(len(line.split()) for line in lines)
print(f"Words: {word_count}")`,
      },
      {
        title: "Reading a JSON 'File' from a String",
        desc: "Parse JSON data and pull out fields.",
        code: `import json

raw = '''
{
    "countries": [
        {"name": "Finland", "population": 5500000},
        {"name": "Sweden",  "population": 10400000},
        {"name": "Norway",  "population": 5400000}
    ]
}
'''

data = json.loads(raw)
for c in data["countries"]:
    print(f"{c['name']:8s} — {c['population']:,}")`,
      },
    ],

    exercises: {
      level1: [
        "Open a file with <code>open('notes.txt', 'w')</code> and write the line <code>'Hello, file!'</code>. Use <code>with</code>.",
        "Open <code>'notes.txt'</code> in read mode and print its contents using <code>f.read()</code>.",
        "Use <code>f.readlines()</code> to get a list of every line.",
        "Open the same file in <code>'a'</code> mode and append a new line.",
        "Use <code>os.path.exists('notes.txt')</code> to check whether a file exists before opening it.",
        "Delete a file with <code>os.remove()</code>.",
      ],
      level2: [
        "Use <code>json.dumps</code> to convert <code>{'name': 'Alice', 'age': 30}</code> to a JSON string.",
        "Use <code>json.loads</code> to parse <code>'{\"name\": \"Alice\"}'</code> back to a dict.",
        "Use <code>json.dump</code> to save a dictionary to a file named <code>'data.json'</code>.",
        "Use <code>csv.writer</code> to write three rows to a CSV file: a header and two data rows.",
        "Use <code>csv.reader</code> to read those rows back and print each one.",
        "Write a function <code>count_words(text)</code> that returns the number of words in a string.",
      ],
      level3: [
        "Write a function <code>read_json(path)</code> that reads a JSON file and returns the parsed Python object.",
        "Given a JSON list of <code>{name, population}</code> dicts, find the ten most populated entries.",
        "Write a function <code>most_common_words(text, n)</code> that returns the <code>n</code> most frequent words in the text.",
        "Write a function <code>extract_emails(text)</code> that returns all email addresses using <code>re.findall</code>.",
      ],
    },

    quiz: [
      {
        q: "Why use `with open(...) as f:` instead of `f = open(...)`?",
        opts: ["Faster execution", "Automatically closes the file even if an error happens", "Works with all file types", "Saves disk space"],
        answer: 1,
        explain: "The 'with' statement guarantees the file is closed when the block exits — even on exceptions — preventing resource leaks.",
      },
      {
        q: "What does mode 'w' do if the file already exists?",
        opts: ["Appends to it", "Raises an error", "Overwrites it (erases all content)", "Reads it"],
        answer: 2,
        explain: "Opening with 'w' truncates the file to zero bytes. Use 'a' to append, or 'x' to fail if the file exists.",
      },
      {
        q: "Which function reads the entire file into one string?",
        opts: ["f.readlines()", "f.read()", "f.line()", "f.all()"],
        answer: 1,
        explain: "f.read() returns the whole file as a single string. readlines() returns a list of lines.",
      },
      {
        q: "Which function converts a Python dict to a JSON string?",
        opts: ["json.dump", "json.dumps", "json.load", "json.loads"],
        answer: 1,
        explain: "json.dumps returns a JSON string. json.dump writes directly to a file. The 's' suffix means 'string'.",
      },
      {
        q: "How do you safely delete a file?",
        opts: ["os.delete('file.txt')", "Check os.path.exists() first, then os.remove()", "file.delete()", "os.unlink_all()"],
        answer: 1,
        explain: "Check existence with os.path.exists() before calling os.remove() to avoid a FileNotFoundError.",
      },
    ],
  },

  {
    day: 20,
    emoji: "📦",
    title: "Python Package Manager",
    subtitle: "Use pip to install, manage, and share packages. Build your own module and understand the Python ecosystem.",
    topics: ["pip install", "pip freeze", "requirements.txt", "requests", "Creating packages", "Package ecosystem"],

    lesson: `
    <div class="lesson-section">
      <h2>What is pip?</h2>
      <p><strong>pip</strong> stands for <em>Preferred Installer Program</em>. It's Python's built-in tool for downloading and installing third-party packages from <strong>PyPI</strong> — the Python Package Index, a registry of over 400,000 packages.</p>
      <div class="info-box">
        <strong>Run pip in your terminal</strong> — not inside Python itself. These are shell commands, not Python code.
      </div>

      <div class="section-divider"></div>
      <h2>Core pip Commands</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">pip install package</div><div class="cheatsheet-desc">Download and install a package</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">pip uninstall package</div><div class="cheatsheet-desc">Remove an installed package</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">pip list</div><div class="cheatsheet-desc">Show all installed packages</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">pip show package</div><div class="cheatsheet-desc">Show version, author, location</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">pip freeze</div><div class="cheatsheet-desc">List installed packages with exact versions</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">pip install -r requirements.txt</div><div class="cheatsheet-desc">Install everything in a requirements file</div></div>
      </div>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Install packages
pip install numpy
pip install pandas
pip install requests

# Save your environment
pip freeze > requirements.txt

# Recreate an environment from the file
pip install -r requirements.txt</pre>

      <div class="section-divider"></div>
      <h2>The requests Module</h2>
      <p>One of the most popular third-party packages. It lets you fetch data from the web — APIs, web pages, JSON feeds — in a few lines.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import requests

response = requests.get('https://api.github.com')
print(response.status_code)   # 200 = OK
print(response.headers['content-type'])
data = response.json()        # parse JSON automatically
print(data)</pre>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">response.status_code</div><div class="cheatsheet-desc">HTTP status (200=OK, 404=not found, 500=server error)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">response.text</div><div class="cheatsheet-desc">Response body as a string</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">response.json()</div><div class="cheatsheet-desc">Parse JSON body into a Python dict/list</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">response.headers</div><div class="cheatsheet-desc">Response headers as a dict</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Creating Your Own Package</h2>
      <p>A <strong>package</strong> is a folder with an <code>__init__.py</code> file. That file (even if empty) tells Python "this folder is importable".</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">mypackage/
    __init__.py       ← marks this as a package
    arithmetic.py     ← module inside the package
    strings.py        ← another module</pre>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># arithmetic.py
def add(a, b): return a + b
def subtract(a, b): return a - b

# In main.py
from mypackage.arithmetic import add
print(add(3, 5))   # 8</pre>

      <div class="section-divider"></div>
      <h2>The Python Ecosystem</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Data Science</div><div class="cheatsheet-desc">numpy, pandas, matplotlib, scikit-learn</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Web</div><div class="cheatsheet-desc">flask, django, fastapi, requests</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Automation</div><div class="cheatsheet-desc">selenium, playwright, pyautogui</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">APIs</div><div class="cheatsheet-desc">requests, httpx, aiohttp</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Databases</div><div class="cheatsheet-desc">sqlalchemy, pymongo, psycopg2</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">AI / ML</div><div class="cheatsheet-desc">tensorflow, pytorch, openai</div></div>
      </div>
    </div>
    `,

    examples: [
      {
        title: "pip Commands Reference",
        desc: "Key commands you'll use in your terminal (not runnable in browser).",
        code: `# Install a package
# pip install requests

# Check installed packages
# pip list

# Show details about a package
# pip show requests

# Save environment
# pip freeze > requirements.txt

# Recreate environment
# pip install -r requirements.txt

print("Run these in your terminal, not in Python!")
print("pip is a terminal tool, not a Python function.")`,
      },
      {
        title: "Simulating an API Response",
        desc: "What requests.get().json() gives you — shown with a mock dict.",
        code: `import json

# This simulates what requests.get(url).json() returns
mock_response = {
    "status": "ok",
    "country": "Finland",
    "capital": "Helsinki",
    "population": 5540720,
    "languages": ["Finnish", "Swedish"]
}

print("Country:", mock_response["country"])
print("Capital:", mock_response["capital"])
print("Population:", f"{mock_response['population']:,}")
print("Languages:", ", ".join(mock_response["languages"]))`,
      },
      {
        title: "Working with JSON Data",
        desc: "Parse and explore a JSON payload like an API would return.",
        code: `import json

raw = '''
[
  {"name": "numpy",   "version": "1.26.0", "category": "data"},
  {"name": "requests","version": "2.31.0", "category": "web"},
  {"name": "flask",   "version": "3.0.0",  "category": "web"},
  {"name": "pandas",  "version": "2.1.0",  "category": "data"}
]
'''

packages = json.loads(raw)

web = [p for p in packages if p["category"] == "web"]
print("Web packages:")
for p in web:
    print(f"  {p['name']} v{p['version']}")`,
      },
      {
        title: "Building a Simple Package Structure",
        desc: "How you'd organize a reusable package (concept demo).",
        code: `# Imagine this is mypackage/arithmetic.py
def add(a, b):      return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# And mypackage/strings.py
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# Inline demo (no folder structure needed here)
print(add(10, 5))
print(divide(10, 4))
print(is_palindrome("racecar"))   # True`,
      },
      {
        title: "requirements.txt Format",
        desc: "What a real requirements file looks like.",
        code: `# This is what pip freeze produces — exact versions pinned
requirements = """
requests==2.31.0
numpy==1.26.4
pandas==2.2.0
flask==3.0.2
python-dotenv==1.0.1
""".strip()

print("requirements.txt contents:")
print(requirements)
print()
for line in requirements.splitlines():
    name, version = line.split("==")
    print(f"  {name:20s} → {version}")`,
      },
    ],

    exercises: {
      level1: [
        "Open your terminal and run <code>pip list</code> to see what's installed. How many packages do you have?",
        "Run <code>pip show pip</code> to see information about pip itself.",
        "Run <code>pip freeze</code> in your terminal. What format does it use?",
        "What command installs a package called <code>colorama</code>?",
        "What command would you run to save all installed packages to a file?",
        "What does the <code>__init__.py</code> file do inside a folder?",
      ],
      level2: [
        "Install the <code>requests</code> library and write a script that fetches <code>https://api.github.com</code> and prints the status code.",
        "Use <code>requests.get()</code> on a public API (e.g. <code>https://catfact.ninja/fact</code>) and print the JSON result.",
        "Create a <code>requirements.txt</code> from your current environment using <code>pip freeze</code>.",
        "Create a package folder called <code>mymath</code> with an <code>__init__.py</code> and an <code>arithmetic.py</code> containing <code>add</code> and <code>subtract</code> functions.",
        "Import your <code>mymath</code> package in a <code>main.py</code> and test it.",
        "Use <code>pip show requests</code> to find out who authored the requests library.",
      ],
      level3: [
        "Fetch the countries REST API at <code>https://restcountries.com/v3.1/all</code>, parse the JSON, and print the 10 most populated countries.",
        "Write a script that reads a <code>requirements.txt</code> and prints each package name and version in a formatted table.",
        "Build a package <code>texttools</code> with modules for string analysis (word count, most common words) and character analysis (vowel count, palindrome check).",
        "Create a simple CLI script that takes a URL as a command-line argument (<code>sys.argv[1]</code>) and prints the HTTP status code and response size.",
      ],
    },

    quiz: [
      {
        q: "What does pip stand for?",
        opts: ["Python Install Package", "Preferred Installer Program", "Package Index Python", "Python Integration Program"],
        answer: 1,
        explain: "pip stands for Preferred Installer Program — it's Python's official tool for installing packages from PyPI.",
      },
      {
        q: "Which command saves your installed packages to a file?",
        opts: ["pip save", "pip export", "pip freeze > requirements.txt", "pip list --save"],
        answer: 2,
        explain: "pip freeze outputs all installed packages with exact versions; redirect with > to save to requirements.txt.",
      },
      {
        q: "What makes a folder a Python package?",
        opts: ["A .py file inside it", "An __init__.py file inside it", "Being named 'package'", "Having more than one module"],
        answer: 1,
        explain: "The presence of __init__.py (even empty) tells Python to treat the folder as an importable package.",
      },
      {
        q: "What does response.json() do in the requests library?",
        opts: ["Sends JSON to the server", "Converts the response body from JSON to a Python dict/list", "Returns the raw JSON string", "Saves JSON to a file"],
        answer: 1,
        explain: "response.json() parses the HTTP response body as JSON and returns the equivalent Python object (dict or list).",
      },
      {
        q: "Which command installs all packages listed in requirements.txt?",
        opts: ["pip install requirements.txt", "pip load -r requirements.txt", "pip install -r requirements.txt", "pip get requirements.txt"],
        answer: 2,
        explain: "The -r flag tells pip to read a requirements file and install everything listed in it.",
      },
    ],
  },

  {
    day: 21,
    emoji: "🏛️",
    title: "Classes and Objects",
    subtitle: "Model real-world things in code. Learn OOP with class, __init__, methods, inheritance, and more.",
    topics: ["class & __init__", "self", "Methods", "Inheritance", "super()", "Method overriding"],

    lesson: `
    <div class="lesson-section">
      <h2>What is Object-Oriented Programming?</h2>
      <p><strong>OOP</strong> is a way of organizing code around <strong>objects</strong> — bundles of data (attributes) and behavior (methods). A <strong>class</strong> is the blueprint; an <strong>object</strong> is what you create from it.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">class Person:
    def __init__(self, name, age):
        self.name = name     # attribute
        self.age = age

    def greet(self):         # method
        return f"Hi, I'm {self.name}, {self.age} years old."

alice = Person("Alice", 30)  # create an object
print(alice.greet())         # Hi, I'm Alice, 30 years old.</pre>

      <div class="info-box">
        <strong>Key terms:</strong> <code>class</code> = blueprint · <code>object</code> = instance · <code>__init__</code> = constructor (runs on creation) · <code>self</code> = reference to this specific object
      </div>

      <div class="section-divider"></div>
      <h2>The <code>__init__</code> Constructor</h2>
      <p><code>__init__</code> is a special method that runs automatically when you create a new object. Use it to set up the object's initial state:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
        self.courses = []     # all students start with empty list

    def add_course(self, course):
        self.courses.append(course)

s = Student("Bob", "A")
s.add_course("Python")
s.add_course("Math")
print(s.courses)   # ['Python', 'Math']</pre>

      <div class="section-divider"></div>
      <h2>Default Parameter Values</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">class Animal:
    def __init__(self, name, sound="..."):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}"

cat = Animal("Cat", "meow")
fish = Animal("Fish")    # uses default
print(cat.speak())       # Cat says meow
print(fish.speak())      # Fish says ...</pre>

      <div class="section-divider"></div>
      <h2>Inheritance</h2>
      <p><strong>Inheritance</strong> lets a child class reuse everything from a parent class, and add or change specific behavior. Write <code>class Child(Parent):</code> to inherit.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        return f"{self.name}, age {self.age}"

class Student(Person):       # inherits from Person
    def __init__(self, name, age, student_id):
        super().__init__(name, age)   # call parent __init__
        self.student_id = student_id

    def info(self):           # override parent method
        return f"{super().info()} | ID: {self.student_id}"

s = Student("Carol", 20, "S001")
print(s.info())   # Carol, age 20 | ID: S001</pre>

      <div class="info-box">
        <strong><code>super()</code></strong> gives you access to the parent class. Always call <code>super().__init__()</code> in a child's constructor so the parent's setup code still runs.
      </div>

      <div class="section-divider"></div>
      <h2>Modifying Attributes via Methods</h2>
      <p>Encapsulate state changes inside methods — don't reach into objects and set attributes directly from outside:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount

    def __str__(self):
        return f"{self.owner}: " + f"\${self.balance:,.2f}"

acc = BankAccount("Alice", 1000)
acc.deposit(500)
acc.withdraw(200)
print(acc)   # Alice: $1,300.00</pre>
    </div>
    `,

    examples: [
      {
        title: "Basic Class — Person",
        desc: "Define a class, create objects, call methods.",
        code: `class Person:
    def __init__(self, first, last, age):
        self.first = first
        self.last = last
        self.age = age

    def full_name(self):
        return f"{self.first} {self.last}"

    def describe(self):
        return f"{self.full_name()} is {self.age} years old."

p1 = Person("Alice", "Smith", 30)
p2 = Person("Bob", "Jones", 25)

print(p1.describe())
print(p2.describe())
print(p1.full_name())`,
      },
      {
        title: "Class with Mutable Default — Student",
        desc: "Track changing state inside an object.",
        code: `class Student:
    def __init__(self, name):
        self.name = name
        self.scores = []

    def add_score(self, score):
        self.scores.append(score)

    def average(self):
        if not self.scores:
            return 0
        return sum(self.scores) / len(self.scores)

    def __str__(self):
        return f"{self.name}: avg={self.average():.1f}"

s = Student("Alice")
s.add_score(85)
s.add_score(92)
s.add_score(78)
print(s)`,
      },
      {
        title: "Inheritance — Employee from Person",
        desc: "Child class extends parent with extra attributes.",
        code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        return f"{self.name} ({self.age})"

class Employee(Person):
    def __init__(self, name, age, company, salary):
        super().__init__(name, age)
        self.company = company
        self.salary = salary

    def info(self):
        return f"{super().info()} @ {self.company}, " + f"\${self.salary:,}"

e = Employee("Carol", 32, "Acme Corp", 95000)
print(e.info())`,
      },
      {
        title: "BankAccount — Encapsulation",
        desc: "Control state through methods, not direct access.",
        code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        self.balance += amount
        self.history.append("+" + str(amount))

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
            return
        self.balance -= amount
        self.history.append("-" + str(amount))

    def __str__(self):
        return f"{self.owner}: " + f"\${self.balance:,.2f}"

acc = BankAccount("Alice", 1000)
acc.deposit(500)
acc.withdraw(200)
acc.withdraw(2000)
print(acc)
print("History:", acc.history)`,
      },
      {
        title: "Statistics Class",
        desc: "A class that computes stats on a list of numbers.",
        code: `class Statistics:
    def __init__(self, data):
        self.data = sorted(data)

    def mean(self):
        return sum(self.data) / len(self.data)

    def median(self):
        n = len(self.data)
        mid = n // 2
        if n % 2 == 0:
            return (self.data[mid-1] + self.data[mid]) / 2
        return self.data[mid]

    def mode(self):
        from collections import Counter
        return Counter(self.data).most_common(1)[0][0]

    def std(self):
        m = self.mean()
        return (sum((x - m)**2 for x in self.data) / len(self.data)) ** 0.5

s = Statistics([9, 3, 8, 3, 7, 5, 3, 6])
print(f"Mean:   {s.mean():.2f}")
print(f"Median: {s.median()}")
print(f"Mode:   {s.mode()}")
print(f"Std:    {s.std():.2f}")`,
      },
    ],

    exercises: {
      level1: [
        "Create a class <code>Dog</code> with attributes <code>name</code> and <code>breed</code>, and a method <code>bark()</code> that returns <code>'Woof!'</code>.",
        "Create a class <code>Rectangle</code> with <code>width</code> and <code>height</code>, and methods <code>area()</code> and <code>perimeter()</code>.",
        "Create a class <code>Circle</code> with a <code>radius</code> attribute and methods <code>area()</code> and <code>circumference()</code>.",
        "Create a class <code>Person</code> with <code>first_name</code>, <code>last_name</code>, and <code>age</code>, and a method <code>full_name()</code>.",
        "Instantiate two <code>Person</code> objects and print their full names.",
        "Add a <code>__str__</code> method to <code>Person</code> that returns a formatted string.",
      ],
      level2: [
        "Build a <code>Student(Person)</code> class that inherits from <code>Person</code> and adds <code>student_id</code> and a <code>courses</code> list.",
        "Add <code>add_course()</code> and <code>remove_course()</code> methods to <code>Student</code>.",
        "Create a <code>Teacher(Person)</code> class with a <code>subject</code> attribute and an <code>info()</code> method that overrides the parent's.",
        "Build a <code>BankAccount</code> class with <code>deposit</code>, <code>withdraw</code>, and <code>balance</code>. Raise <code>ValueError</code> on overdraft.",
        "Add a <code>transfer(amount, other_account)</code> method to <code>BankAccount</code>.",
        "Create a <code>Statistics</code> class that takes a list and has <code>mean()</code>, <code>median()</code>, and <code>mode()</code> methods.",
      ],
      level3: [
        "Build a <code>PersonAccount</code> class with <code>incomes</code> and <code>expenses</code> lists, and methods <code>total_income()</code>, <code>total_expense()</code>, and <code>account_balance()</code>.",
        "Create a <code>Shape</code> base class and subclasses <code>Circle</code>, <code>Rectangle</code>, <code>Triangle</code> — each with <code>area()</code> and <code>perimeter()</code>.",
        "Build a class hierarchy: <code>Animal → Mammal → Dog</code> and <code>Animal → Bird → Parrot</code>. Each level adds attributes and overrides <code>speak()</code>.",
        "Create a <code>Stack</code> class backed by a list with <code>push()</code>, <code>pop()</code>, <code>peek()</code>, <code>is_empty()</code>, and <code>size()</code>.",
      ],
    },

    quiz: [
      {
        q: "What does `__init__` do?",
        opts: ["Destroys an object", "Runs automatically when a new object is created", "Imports a module", "Defines a class variable"],
        answer: 1,
        explain: "__init__ is the constructor — it runs the moment you create an instance and sets up the object's initial attributes.",
      },
      {
        q: "What is `self` in a class method?",
        opts: ["The class itself", "A reference to the specific instance the method is called on", "A global variable", "The parent class"],
        answer: 1,
        explain: "self refers to the current instance. It lets methods access and modify the object's own attributes.",
      },
      {
        q: "How do you make a class inherit from another?",
        opts: ["class Child extends Parent:", "class Child inherits Parent:", "class Child(Parent):", "child = Child(Parent)"],
        answer: 2,
        explain: "Put the parent class name in parentheses: class Child(Parent): — this is Python's inheritance syntax.",
      },
      {
        q: "What does `super().__init__()` do in a child class?",
        opts: ["Creates a new parent object", "Calls the parent class's __init__ to run its setup code", "Deletes the parent", "Imports the parent module"],
        answer: 1,
        explain: "super() gives access to the parent class. Calling super().__init__() ensures the parent's constructor runs and sets up inherited attributes.",
      },
      {
        q: "What is an instance?",
        opts: ["The class definition", "A specific object created from a class", "A class method", "A module import"],
        answer: 1,
        explain: "An instance is a concrete object created from a class blueprint. `alice = Person('Alice', 30)` creates an instance named alice.",
      },
    ],
  },

  {
    day: 22,
    emoji: "🕸️",
    title: "Web Scraping",
    subtitle: "Extract data from websites automatically using requests and BeautifulSoup.",
    topics: ["requests.get()", "BeautifulSoup", "find() & find_all()", "HTML parsing", "Extracting data", "Ethics & robots.txt"],

    lesson: `
    <div class="lesson-section">
      <h2>What is Web Scraping?</h2>
      <p><strong>Web scraping</strong> is automatically extracting data from websites. You fetch the HTML of a page, then parse it to pull out the information you need — prices, headlines, scores, tables, anything.</p>
      <div class="info-box warning">
        <strong>Always check robots.txt first.</strong> Visit <code>site.com/robots.txt</code> to see what the site allows scrapers to access. Scraping without permission can violate terms of service.
      </div>

      <div class="section-divider"></div>
      <h2>Step 1 — Fetch the Page with requests</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import requests

url = "https://example.com"
response = requests.get(url)

print(response.status_code)   # 200 = success
print(response.text[:500])    # raw HTML of the page</pre>

      <div class="section-divider"></div>
      <h2>Step 2 — Parse HTML with BeautifulSoup</h2>
      <p><strong>BeautifulSoup</strong> turns raw HTML into a structured object you can navigate. Install it with <code>pip install beautifulsoup4</code>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from bs4 import BeautifulSoup

html = response.text
soup = BeautifulSoup(html, 'html.parser')

# Find the first h1 tag
title = soup.find('h1')
print(title.get_text())</pre>

      <div class="section-divider"></div>
      <h2>find() vs find_all()</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">soup.find('tag')</div><div class="cheatsheet-desc">First matching element, or None</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">soup.find_all('tag')</div><div class="cheatsheet-desc">All matching elements as a list</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">soup.find('tag', class_='name')</div><div class="cheatsheet-desc">Match by CSS class (note the underscore)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">element.get_text()</div><div class="cheatsheet-desc">Extract the visible text content</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">element['href']</div><div class="cheatsheet-desc">Read an attribute value (like a link)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">element.get('attr')</div><div class="cheatsheet-desc">Same, but returns None if missing</div></div>
      </div>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import requests
from bs4 import BeautifulSoup

response = requests.get("https://python.org/blogs/")
soup = BeautifulSoup(response.text, 'html.parser')

# Get all links on the page
links = soup.find_all('a')
for link in links[:5]:
    href = link.get('href')
    text = link.get_text(strip=True)
    print(f"{text} → {href}")</pre>

      <div class="section-divider"></div>
      <h2>Extracting a Table</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">table = soup.find('table')
rows = table.find_all('tr')

for row in rows:
    cells = row.find_all(['td', 'th'])
    values = [c.get_text(strip=True) for c in cells]
    print(values)</pre>

      <div class="section-divider"></div>
      <h2>Full Scraping Pipeline</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">import requests
from bs4 import BeautifulSoup
import json

url = "https://books.toscrape.com/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

books = []
for article in soup.find_all('article', class_='product_pod'):
    title = article.find('h3').find('a')['title']
    price = article.find('p', class_='price_color').get_text()
    books.append({"title": title, "price": price})

print(json.dumps(books[:3], indent=2))</pre>
    </div>
    `,

    examples: [
      {
        title: "BeautifulSoup with Local HTML",
        desc: "Parse HTML without needing a network request.",
        code: `from bs4 import BeautifulSoup

html = """
<html>
  <body>
    <h1>Python News</h1>
    <ul>
      <li class="article">Python 3.13 released</li>
      <li class="article">NumPy hits 1.0 billion downloads</li>
      <li class="article">PyCon 2025 dates announced</li>
    </ul>
    <a href="https://python.org">Python.org</a>
  </body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

print(soup.find('h1').get_text())

articles = soup.find_all('li', class_='article')
for a in articles:
    print(" -", a.get_text())

link = soup.find('a')
print("Link:", link['href'])`,
      },
      {
        title: "Parsing a Table from HTML",
        desc: "Extract rows and cells from an HTML table.",
        code: `from bs4 import BeautifulSoup

html = """
<table>
  <tr><th>Country</th><th>Capital</th><th>Pop (M)</th></tr>
  <tr><td>Finland</td><td>Helsinki</td><td>5.5</td></tr>
  <tr><td>Sweden</td><td>Stockholm</td><td>10.4</td></tr>
  <tr><td>Norway</td><td>Oslo</td><td>5.4</td></tr>
</table>
"""

soup = BeautifulSoup(html, 'html.parser')
rows = soup.find_all('tr')

for row in rows:
    cells = row.find_all(['th', 'td'])
    print([c.get_text() for c in cells])`,
      },
      {
        title: "Collecting All Links",
        desc: "Find every anchor tag and extract href and text.",
        code: `from bs4 import BeautifulSoup

html = """
<html>
<body>
  <nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <a href="https://python.org">Python.org</a>
  </nav>
  <p>Visit <a href="https://docs.python.org">the docs</a> for more.</p>
</body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')
links = soup.find_all('a')

for link in links:
    text = link.get_text(strip=True)
    href = link.get('href', 'no href')
    print(f"{text:12s} → {href}")`,
      },
      {
        title: "Scraping Pipeline — Books (Concept)",
        desc: "The full pattern: fetch → parse → extract → store.",
        code: `# This shows the pattern without actually hitting the network
# In real code you'd do: response = requests.get(url)

from bs4 import BeautifulSoup
import json

# Simulated HTML (like books.toscrape.com returns)
html = """
<div>
  <article class="product_pod">
    <h3><a title="A Light in the Attic">A Light in the Attic</a></h3>
    <p class="price_color">£51.77</p>
  </article>
  <article class="product_pod">
    <h3><a title="Tipping the Velvet">Tipping the Velvet</a></h3>
    <p class="price_color">£53.74</p>
  </article>
</div>
"""

soup = BeautifulSoup(html, 'html.parser')
books = []
for article in soup.find_all('article', class_='product_pod'):
    title = article.find('h3').find('a')['title']
    price = article.find('p', class_='price_color').get_text()
    books.append({"title": title, "price": price})

print(json.dumps(books, indent=2))`,
      },
      {
        title: "Finding Elements by Class and Tag",
        desc: "Use class_ to narrow your search.",
        code: `from bs4 import BeautifulSoup

html = """
<div class="container">
  <p class="highlight">Important message</p>
  <p class="normal">Regular text</p>
  <p class="highlight">Another key point</p>
  <span class="tag">python</span>
  <span class="tag">tutorial</span>
</div>
"""

soup = BeautifulSoup(html, 'html.parser')

highlights = soup.find_all('p', class_='highlight')
for h in highlights:
    print("Highlight:", h.get_text())

tags = soup.find_all('span', class_='tag')
print("Tags:", [t.get_text() for t in tags])`,
      },
    ],

    exercises: {
      level1: [
        "Create a BeautifulSoup object from a hand-written HTML string and extract the <code>&lt;h1&gt;</code> text.",
        "Use <code>find_all('p')</code> on a local HTML string and print each paragraph.",
        "Extract the <code>href</code> attribute from all <code>&lt;a&gt;</code> tags in an HTML string.",
        "Use <code>find('table')</code> to locate a table and print its raw HTML.",
        "Use <code>get_text(strip=True)</code> to extract clean text from a tag.",
        "What HTTP status code means 'success'? What does 404 mean?",
      ],
      level2: [
        "Scrape <code>https://books.toscrape.com/</code> (a safe practice site) and list the first 10 book titles and prices.",
        "Scrape <code>https://quotes.toscrape.com/</code> and print 5 quotes with their authors.",
        "Parse an HTML table from a web page into a list of dicts, one per row.",
        "Collect all unique domain names from links on a web page.",
        "Extract all image <code>src</code> URLs from a page.",
        "Save scraped data to a JSON file using <code>json.dump()</code>.",
      ],
      level3: [
        "Scrape the Wikipedia table of U.S. Presidents and convert it to a list of dicts with name, term, and party.",
        "Scrape multiple pages of a paginated site (e.g. books.toscrape.com pages 1-5) and aggregate results.",
        "Write a scraper that checks a product price across multiple pages and alerts (prints) when it drops below a threshold.",
        "Convert a scraped dataset to CSV using the <code>csv</code> module.",
      ],
    },

    quiz: [
      {
        q: "What does `requests.get(url)` return?",
        opts: ["The HTML as a string", "A Response object with status_code, text, json() etc.", "A BeautifulSoup object", "A dictionary of the page content"],
        answer: 1,
        explain: "requests.get() returns a Response object. Access .text for HTML, .json() for JSON data, and .status_code for HTTP status.",
      },
      {
        q: "What is the difference between find() and find_all()?",
        opts: ["find() is faster", "find() returns the first match; find_all() returns a list of all matches", "find_all() only works on tables", "No difference"],
        answer: 1,
        explain: "find() returns the first matching tag (or None). find_all() returns a list of every matching tag.",
      },
      {
        q: "Why do you use `class_` (with underscore) in BeautifulSoup instead of `class`?",
        opts: ["It's faster", "class is a reserved keyword in Python — the underscore avoids the conflict", "class_ searches more tags", "It's case-insensitive"],
        answer: 1,
        explain: "class is a Python keyword (used to define classes), so BeautifulSoup uses class_ as the parameter name to avoid a syntax conflict.",
      },
      {
        q: "What should you check before scraping a website?",
        opts: ["The page's font size", "The robots.txt file and terms of service", "Whether the site uses Python", "The server's location"],
        answer: 1,
        explain: "robots.txt (e.g. site.com/robots.txt) tells crawlers what is allowed. Always check it and the terms of service before scraping.",
      },
      {
        q: "What does `element.get_text(strip=True)` do?",
        opts: ["Deletes the element", "Returns the visible text content with leading/trailing whitespace removed", "Returns the HTML of the element", "Finds the next sibling"],
        answer: 1,
        explain: "get_text() extracts only the visible text (no HTML tags). strip=True removes leading and trailing whitespace.",
      },
    ],
  },

  {
    day: 23,
    emoji: "🔒",
    title: "Virtual Environment",
    subtitle: "Keep projects isolated. Create clean environments so packages don't conflict between projects.",
    topics: ["Why venv?", "virtualenv", "Creating & activating", "pip inside venv", "deactivate", "pipenv"],

    lesson: `
    <div class="lesson-section">
      <h2>The Problem — Why Virtual Environments?</h2>
      <p>Imagine Project A needs <code>flask==2.0</code> and Project B needs <code>flask==3.0</code>. If you install both globally, one will overwrite the other and one project will break.</p>
      <p>A <strong>virtual environment</strong> is an isolated Python installation for each project — its own packages, its own versions, completely separate from everything else.</p>
      <div class="info-box">
        <strong>Rule of thumb:</strong> Always use a virtual environment for every project. It takes 10 seconds to set up and saves hours of debugging version conflicts.
      </div>

      <div class="section-divider"></div>
      <h2>Creating a Virtual Environment</h2>
      <p>Python 3 ships with the <code>venv</code> module built in:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto"># Create a virtual environment in a folder called 'venv'
python -m venv venv

# Or on some systems:
python3 -m venv venv</pre>

      <div class="section-divider"></div>
      <h2>Activating and Deactivating</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Mac / Linux</div><div class="cheatsheet-desc">source venv/bin/activate</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Windows (PowerShell)</div><div class="cheatsheet-desc">venv\\Scripts\\activate</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Windows (Git Bash)</div><div class="cheatsheet-desc">source venv/Scripts/activate</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Deactivate (any OS)</div><div class="cheatsheet-desc">deactivate</div></div>
      </div>
      <p>Once activated, your terminal prompt shows <code>(venv)</code> — everything you <code>pip install</code> now goes into that environment only.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">(venv) $ pip install flask
(venv) $ pip install requests
(venv) $ pip freeze > requirements.txt
(venv) $ deactivate
$   # back to global Python</pre>

      <div class="section-divider"></div>
      <h2>The Full Workflow</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto"># 1. Create project folder
mkdir my_project && cd my_project

# 2. Create virtual environment
python -m venv venv

# 3. Activate it
source venv/bin/activate     # Mac/Linux

# 4. Install what you need
pip install flask requests

# 5. Work on your project...

# 6. Save dependencies
pip freeze > requirements.txt

# 7. Deactivate when done
deactivate

# Anyone else clones your project and runs:
# pip install -r requirements.txt</pre>

      <div class="section-divider"></div>
      <h2>What to Add to .gitignore</h2>
      <p>Never commit your <code>venv/</code> folder to git — it's huge and system-specific. Commit <code>requirements.txt</code> instead:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto"># .gitignore
venv/
__pycache__/
*.pyc
.env</pre>

      <div class="section-divider"></div>
      <h2>Alternative: pipenv</h2>
      <p><strong>pipenv</strong> combines pip and venv into one tool, managing a <code>Pipfile</code> automatically:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">pip install pipenv       # install once

pipenv install flask     # creates venv + installs
pipenv shell             # activate the shell
pipenv run python app.py # run without activating</pre>
    </div>
    `,

    examples: [
      {
        title: "venv Workflow Reference",
        desc: "Complete virtual environment setup — run in terminal.",
        code: `# === Run these in your terminal (not Python) ===

# Step 1: Create the environment
# python -m venv venv

# Step 2: Activate (Mac/Linux)
# source venv/bin/activate

# Step 2: Activate (Windows)
# venv\\Scripts\\activate

# Step 3: Install packages
# pip install requests flask

# Step 4: Save dependencies
# pip freeze > requirements.txt

# Step 5: Deactivate
# deactivate

print("Virtual environments keep projects clean and isolated!")
print("One venv per project — always.")`,
      },
      {
        title: "Checking Your Python Environment",
        desc: "See which Python and pip you're using right now.",
        code: `import sys
import os

print("Python version:", sys.version)
print("Python executable:", sys.executable)
print()

# Check if we're in a virtual environment
in_venv = hasattr(sys, 'real_prefix') or (
    hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix
)

if in_venv:
    print("Running inside a virtual environment")
    print("venv path:", sys.prefix)
else:
    print("Running in global Python")
    print("Consider creating a venv for your project!")`,
      },
      {
        title: "requirements.txt — Read and Parse",
        desc: "Parse a requirements file programmatically.",
        code: `requirements_content = """
flask==3.0.2
requests==2.31.0
python-dotenv==1.0.1
beautifulsoup4==4.12.3
numpy==1.26.4
pandas==2.2.0
""".strip()

packages = []
for line in requirements_content.splitlines():
    if line and not line.startswith('#'):
        if '==' in line:
            name, version = line.split('==')
            packages.append({'name': name, 'version': version})

print(f"{'Package':<20} {'Version'}")
print("-" * 30)
for p in packages:
    print(f"{p['name']:<20} {p['version']}")`,
      },
      {
        title: "Project Structure Best Practice",
        desc: "The standard layout for a Python project.",
        code: `structure = """
my_project/
├── venv/               ← virtual environment (NOT committed to git)
├── src/
│   ├── __init__.py
│   └── main.py
├── tests/
│   └── test_main.py
├── .gitignore          ← includes venv/ and __pycache__/
├── requirements.txt    ← committed to git
└── README.md
"""

gitignore_content = """
venv/
__pycache__/
*.pyc
*.pyo
.env
.DS_Store
"""

print("Standard project layout:")
print(structure)
print(".gitignore should contain:")
print(gitignore_content)`,
      },
      {
        title: "Simulating a Dependency Conflict",
        desc: "Why venvs matter — version conflicts illustrated.",
        code: `# Illustrate why isolated environments matter

project_a_needs = {"flask": "2.0.0", "requests": "2.25.0"}
project_b_needs = {"flask": "3.0.2", "requests": "2.31.0"}

print("Without virtual environments:")
print("Installing Project A's packages globally...")
global_packages = dict(project_a_needs)
print("Global packages:", global_packages)

print()
print("Now installing Project B's packages...")
for pkg, ver in project_b_needs.items():
    if pkg in global_packages and global_packages[pkg] != ver:
        print(f"  CONFLICT: {pkg} {global_packages[pkg]} → overwritten by {ver}")
    global_packages[pkg] = ver

print()
print("Project A now broken — it needed flask 2.0.0 but got", global_packages["flask"])
print()
print("With virtual environments: each project keeps its own packages.")`,
      },
    ],

    exercises: {
      level1: [
        "Create a virtual environment called <code>venv</code> in a new project folder.",
        "Activate the virtual environment and run <code>pip list</code> — what packages are there?",
        "Install <code>requests</code> inside the venv and verify with <code>pip show requests</code>.",
        "Run <code>pip freeze > requirements.txt</code> and open the file to see the output.",
        "Deactivate the virtual environment.",
        "Add <code>venv/</code> and <code>__pycache__/</code> to a <code>.gitignore</code> file.",
      ],
      level2: [
        "Create two separate project folders, each with their own venv, and install different versions of a package in each.",
        "Write a Python script that checks whether it's running inside a virtual environment.",
        "Clone a project that has a <code>requirements.txt</code> and recreate its environment from scratch.",
        "Use <code>pip install pipenv</code> and create a new project with <code>pipenv install flask</code>.",
        "Explain the difference between <code>pip freeze</code> and <code>pip list</code> in your own words.",
        "Create a project template script that automatically creates a venv and installs from a requirements list.",
      ],
      level3: [
        "Write a shell script (or Python script using <code>subprocess</code>) that automates the full project setup: create folder, create venv, install from requirements.txt.",
        "Research <code>poetry</code> as an alternative to pip+venv. How does <code>pyproject.toml</code> compare to <code>requirements.txt</code>?",
        "Set up a virtual environment for a Flask project and a separate one for a data science project. Document the difference in their dependencies.",
        "Write a script that reads two requirements files and prints the packages that differ between them.",
      ],
    },

    quiz: [
      {
        q: "Why do you use a virtual environment?",
        opts: ["To make Python run faster", "To isolate project dependencies so packages don't conflict between projects", "To access the internet", "To compile Python to bytecode"],
        answer: 1,
        explain: "Virtual environments keep each project's packages isolated — Project A can use flask 2.0 while Project B uses flask 3.0 without conflicts.",
      },
      {
        q: "Which command creates a virtual environment called 'venv'?",
        opts: ["venv create venv", "python -m venv venv", "pip create venv", "virtualenv --new venv"],
        answer: 1,
        explain: "python -m venv venv uses the built-in venv module to create an isolated environment in a folder called 'venv'.",
      },
      {
        q: "How do you activate a virtual environment on Mac/Linux?",
        opts: ["activate venv", "venv activate", "source venv/bin/activate", "python venv/activate"],
        answer: 2,
        explain: "On Mac/Linux, use: source venv/bin/activate. On Windows PowerShell: venv\\Scripts\\activate.",
      },
      {
        q: "Should you commit the venv/ folder to git?",
        opts: ["Yes, always", "No — add it to .gitignore and commit requirements.txt instead", "Only on Windows", "Only if it's small"],
        answer: 1,
        explain: "The venv/ folder is large and system-specific. Commit requirements.txt so others can recreate the environment with pip install -r requirements.txt.",
      },
      {
        q: "How do you leave a virtual environment?",
        opts: ["exit", "close", "deactivate", "quit"],
        answer: 2,
        explain: "Type 'deactivate' in the terminal to leave the virtual environment and return to the global Python.",
      },
    ],
  },

  {
    day: 24,
    emoji: "📊",
    title: "Statistics",
    subtitle: "Analyze data with Python's statistics module and NumPy. Work with arrays, distributions, and linear algebra.",
    topics: ["statistics module", "numpy arrays", "Array math", "Statistical functions", "Random arrays", "Linear algebra"],

    lesson: `
    <div class="lesson-section">
      <h2>The statistics Module</h2>
      <p>Python's built-in <code>statistics</code> module handles common statistical calculations without any extra install:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from statistics import mean, median, mode, stdev, variance

data = [2, 3, 5, 7, 11, 13, 5, 7, 5]
print(mean(data))      # 6.44
print(median(data))    # 5
print(mode(data))      # 5
print(stdev(data))     # 3.5</pre>

      <div class="section-divider"></div>
      <h2>NumPy — Fast Array Computing</h2>
      <p><strong>NumPy</strong> is the foundation of Python's data science ecosystem. It provides fast multi-dimensional arrays and math operations that work on entire arrays at once — no loops needed.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr * 2)        # [2 4 6 8 10] — no loop needed!
print(arr ** 2)       # [1 4 9 16 25]
print(arr.mean())     # 3.0
print(arr.sum())      # 15</pre>

      <div class="section-divider"></div>
      <h2>Creating Arrays</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.array([1,2,3])</div><div class="cheatsheet-desc">From a Python list</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.zeros((3, 3))</div><div class="cheatsheet-desc">3×3 array of zeros</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.ones((2, 4))</div><div class="cheatsheet-desc">2×4 array of ones</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.arange(0, 10, 2)</div><div class="cheatsheet-desc">0,2,4,6,8 (like range but for arrays)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.linspace(0, 1, 5)</div><div class="cheatsheet-desc">5 evenly spaced values between 0 and 1</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.random.randint(0,10,(3,3))</div><div class="cheatsheet-desc">3×3 of random ints</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Array Properties and Slicing</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import numpy as np

m = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(m.shape)   # (3, 3)
print(m.dtype)   # int64
print(m.size)    # 9

# Slicing — same syntax as Python lists but works on 2D
print(m[0])       # first row: [1 2 3]
print(m[:, 1])    # second column: [2 5 8]
print(m[1:, 1:])  # bottom-right 2x2</pre>

      <div class="section-divider"></div>
      <h2>Statistical Functions</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.min() / np.max()</div><div class="cheatsheet-desc">Minimum / maximum value</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.mean()</div><div class="cheatsheet-desc">Average</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.median()</div><div class="cheatsheet-desc">Middle value</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.std()</div><div class="cheatsheet-desc">Standard deviation</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.sum()</div><div class="cheatsheet-desc">Sum of all elements</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">np.cumsum()</div><div class="cheatsheet-desc">Cumulative sum</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Linear Algebra</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(np.dot(A, B))            # matrix multiplication
print(np.linalg.det(A))        # determinant: -2.0
print(A.T)                     # transpose</pre>
    </div>
    `,

    examples: [
      {
        title: "statistics Module",
        desc: "Built-in stats — no install needed.",
        code: `from statistics import mean, median, mode, stdev, variance

scores = [85, 92, 78, 95, 88, 92, 76, 92, 100, 84]

print(f"Mean:     {mean(scores):.1f}")
print(f"Median:   {median(scores)}")
print(f"Mode:     {mode(scores)}")
print(f"Std Dev:  {stdev(scores):.2f}")
print(f"Variance: {variance(scores):.2f}")
print(f"Min:      {min(scores)}")
print(f"Max:      {max(scores)}")`,
      },
      {
        title: "NumPy Array Basics",
        desc: "Create arrays and do math on all elements at once.",
        code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print("Array:    ", arr)
print("Times 2:  ", arr * 2)
print("Squared:  ", arr ** 2)
print("Sum:      ", arr.sum())
print("Mean:     ", arr.mean())
print("Shape:    ", arr.shape)
print("Dtype:    ", arr.dtype)`,
      },
      {
        title: "2D Arrays and Slicing",
        desc: "Multi-dimensional arrays and how to index them.",
        code: `import numpy as np

m = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

print("Full matrix:")
print(m)
print("Row 0:    ", m[0])
print("Col 1:    ", m[:, 1])
print("Bottom-right 2x2:")
print(m[1:, 1:])
print("Shape:", m.shape, "  Size:", m.size)`,
      },
      {
        title: "Statistical Functions on Arrays",
        desc: "Apply stats to the whole array in one call.",
        code: `import numpy as np

data = np.array([14, 18, 11, 13, 6, 8, 2, 14, 3, 2, 14, 3, 3, 15, 11])

print(f"Count:  {data.size}")
print(f"Min:    {data.min()}")
print(f"Max:    {data.max()}")
print(f"Mean:   {data.mean():.2f}")
print(f"Median: {np.median(data)}")
print(f"Std:    {data.std():.2f}")
print(f"Sum:    {data.sum()}")`,
      },
      {
        title: "Creating Special Arrays",
        desc: "zeros, ones, arange, linspace, random.",
        code: `import numpy as np

print("Zeros 3x3:")
print(np.zeros((3, 3)))

print("Ones 2x4:")
print(np.ones((2, 4)))

print("arange(0, 20, 3):", np.arange(0, 20, 3))

print("linspace(0, 1, 6):", np.linspace(0, 1, 6))

print("Random 3x3 (0-9):")
print(np.random.randint(0, 10, (3, 3)))`,
      },
    ],

    exercises: {
      level1: [
        "Use the <code>statistics</code> module to find the mean, median, and mode of <code>[4, 5, 6, 6, 7, 8, 8, 8, 9]</code>.",
        "Create a NumPy array from the list <code>[10, 20, 30, 40, 50]</code> and multiply every element by 3.",
        "Create a <code>np.zeros((3, 4))</code> array and print its shape.",
        "Use <code>np.arange(1, 11)</code> to create an array of 1 through 10.",
        "Use <code>np.linspace(0, 100, 5)</code> and print the result.",
        "Print the <code>.mean()</code> and <code>.std()</code> of <code>[3, 7, 2, 8, 1, 9, 4, 6]</code> using NumPy.",
      ],
      level2: [
        "Create a random 5×5 integer array and find the min, max, and mean of each row.",
        "Create two 2×2 matrices and compute their dot product with <code>np.dot()</code>.",
        "Use <code>np.reshape()</code> to convert a 1D array of 12 elements into a 3×4 matrix.",
        "Use <code>np.hstack()</code> and <code>np.vstack()</code> to combine two arrays.",
        "Compute the cumulative sum of <code>[1, 2, 3, 4, 5]</code> using <code>np.cumsum()</code>.",
        "Generate 1000 random numbers from a normal distribution and compute their mean and std.",
      ],
      level3: [
        "Implement a <code>Statistics</code> class (no external libraries) with methods: <code>mean</code>, <code>median</code>, <code>mode</code>, <code>std</code>, <code>variance</code>, <code>percentile(p)</code>.",
        "Use NumPy to solve a system of linear equations Ax = b using <code>np.linalg.solve()</code>.",
        "Generate a 100×100 random matrix, compute its transpose, and verify that <code>A @ A.T</code> is symmetric.",
        "Simulate rolling two dice 10,000 times with NumPy and plot the frequency distribution of sums (describe what the histogram would look like).",
      ],
    },

    quiz: [
      {
        q: "What does `np.array([1,2,3]) * 2` produce?",
        opts: ["[[1,2,3],[1,2,3]]", "[1,2,3,1,2,3]", "[2,4,6]", "An error"],
        answer: 2,
        explain: "NumPy applies the operation element-wise to the entire array — multiplying each element by 2 gives [2,4,6].",
      },
      {
        q: "What is the shape of np.zeros((3, 4))?",
        opts: ["(4, 3)", "(12,)", "(3, 4)", "(7,)"],
        answer: 2,
        explain: "np.zeros((3, 4)) creates a 2D array with 3 rows and 4 columns — shape (3, 4).",
      },
      {
        q: "How do you get the second column of a 2D NumPy array m?",
        opts: ["m[1]", "m[:, 1]", "m[1, :]", "m.col(1)"],
        answer: 1,
        explain: "m[:, 1] means: all rows (:), column index 1. m[1] would be the second row.",
      },
      {
        q: "Which module do you import for mean/median/mode without pip installing anything?",
        opts: ["numpy", "pandas", "statistics", "math"],
        answer: 2,
        explain: "The statistics module is part of Python's standard library — no install needed.",
      },
      {
        q: "What does np.linspace(0, 1, 5) return?",
        opts: ["[0, 0.25, 0.5, 0.75, 1.0]", "[0, 1, 2, 3, 4]", "[0.2, 0.4, 0.6, 0.8, 1.0]", "[0, 1]"],
        answer: 0,
        explain: "np.linspace(start, stop, num) gives num evenly spaced values from start to stop inclusive.",
      },
    ],
  },

  {
    day: 25,
    emoji: "🐼",
    title: "Pandas",
    subtitle: "The go-to library for data analysis. Work with DataFrames, filter rows, read CSVs, and explore datasets.",
    topics: ["Series", "DataFrame", "read_csv()", "head() & tail()", "Boolean filtering", "describe() & info()"],

    lesson: `
    <div class="lesson-section">
      <h2>What is Pandas?</h2>
      <p><strong>Pandas</strong> is Python's most important data analysis library. It gives you two core objects: <code>Series</code> (one column) and <code>DataFrame</code> (a table). Install with <code>pip install pandas</code>.</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import pandas as pd</pre>

      <div class="section-divider"></div>
      <h2>Series — One Column</h2>
      <p>A <code>Series</code> is like a labeled list. Each value has an <strong>index</strong>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import pandas as pd

s = pd.Series([85, 92, 78, 95], index=['Alice','Bob','Carol','Dave'])
print(s)
# Alice    85
# Bob      92
# Carol    78
# Dave     95

print(s['Alice'])   # 85
print(s.mean())     # 87.5</pre>

      <div class="section-divider"></div>
      <h2>DataFrame — A Table</h2>
      <p>A <code>DataFrame</code> is a 2D table with labeled rows and columns — like an Excel sheet:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import pandas as pd

data = {
    'name': ['Alice', 'Bob', 'Carol'],
    'age':  [30, 25, 35],
    'city': ['Helsinki', 'Stockholm', 'Oslo']
}

df = pd.DataFrame(data)
print(df)
#     name  age       city
# 0  Alice   30   Helsinki
# 1    Bob   25  Stockholm
# 2  Carol   35       Oslo</pre>

      <div class="section-divider"></div>
      <h2>Exploring a DataFrame</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">df.head(n)</div><div class="cheatsheet-desc">First n rows (default 5)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">df.tail(n)</div><div class="cheatsheet-desc">Last n rows</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">df.shape</div><div class="cheatsheet-desc">Tuple: (rows, columns)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">df.columns</div><div class="cheatsheet-desc">List of column names</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">df.describe()</div><div class="cheatsheet-desc">Stats summary for numeric columns</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">df.info()</div><div class="cheatsheet-desc">Data types and null counts</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Reading a CSV File</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">df = pd.read_csv('data.csv')
print(df.head())
print(df.shape)</pre>

      <div class="section-divider"></div>
      <h2>Boolean Filtering</h2>
      <p>Filter rows using conditions — like SQL <code>WHERE</code>:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import pandas as pd

data = {'name':['Alice','Bob','Carol','Dave'], 'age':[30,25,35,28]}
df = pd.DataFrame(data)

over_30 = df[df['age'] >= 30]
print(over_30)

# Filter with string contains
# python_titles = df[df['title'].str.contains('python', case=False)]</pre>

      <div class="section-divider"></div>
      <h2>Adding and Modifying Columns</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">df['age_in_months'] = df['age'] * 12
df['name'] = df['name'].str.upper()
print(df)</pre>
    </div>
    `,

    examples: [
      {
        title: "Creating a Series and DataFrame",
        desc: "The two core Pandas data structures.",
        code: `import pandas as pd

# Series
s = pd.Series([100, 200, 300, 400], index=['Q1','Q2','Q3','Q4'])
print("Series:")
print(s)
print(f"Mean: {s.mean()}, Total: {s.sum()}")

# DataFrame from dict
data = {
    'country': ['Finland', 'Sweden', 'Norway', 'Denmark'],
    'population': [5540000, 10400000, 5380000, 5900000],
    'area_km2': [338440, 450295, 323802, 42933]
}
df = pd.DataFrame(data)
print("\\nDataFrame:")
print(df)`,
      },
      {
        title: "Exploring a DataFrame",
        desc: "head, tail, shape, describe, columns.",
        code: `import pandas as pd

data = {
    'name': ['Alice','Bob','Carol','Dave','Eve'],
    'score': [88, 72, 95, 63, 91],
    'grade': ['B','C','A','D','A'],
    'passed': [True, True, True, False, True]
}
df = pd.DataFrame(data)

print("First 3 rows:")
print(df.head(3))
print("\\nShape:", df.shape)
print("Columns:", list(df.columns))
print("\\nNumeric summary:")
print(df.describe())`,
      },
      {
        title: "Boolean Filtering",
        desc: "Select rows that match a condition.",
        code: `import pandas as pd

data = {
    'name': ['Alice','Bob','Carol','Dave','Eve','Frank'],
    'score': [88, 72, 95, 63, 91, 55],
    'passed': [True, True, True, False, True, False]
}
df = pd.DataFrame(data)

high_scorers = df[df['score'] >= 88]
print("High scorers (>=88):")
print(high_scorers)

failed = df[df['passed'] == False]
print("\\nFailed:")
print(failed[['name','score']])`,
      },
      {
        title: "Adding Columns and Type Conversion",
        desc: "Transform and extend a DataFrame.",
        code: `import pandas as pd

df = pd.DataFrame({
    'name': ['alice', 'bob', 'carol'],
    'price': ['10.50', '25.99', '7.75'],
    'qty': [3, 1, 5]
})

# Convert string to float
df['price'] = df['price'].astype(float)

# Add calculated column
df['total'] = df['price'] * df['qty']

# Capitalize names
df['name'] = df['name'].str.title()

print(df)
print("Grand total: " + str(round(df["total"].sum(), 2)))`,
      },
      {
        title: "Reading CSV with StringIO (in-browser safe)",
        desc: "Simulate reading a CSV file without disk access.",
        code: `import pandas as pd
from io import StringIO

csv_data = """title,score,votes
The Shawshank Redemption,9.3,2700000
The Godfather,9.2,1800000
The Dark Knight,9.0,2600000
Pulp Fiction,8.9,2000000
Forrest Gump,8.8,2100000
"""

df = pd.read_csv(StringIO(csv_data))
print(df)
print("\\nTop 3 by score:")
print(df.nlargest(3, 'score')[['title','score']])`,
      },
    ],

    exercises: {
      level1: [
        "Create a <code>pd.Series</code> of 5 countries and their populations.",
        "Create a <code>pd.DataFrame</code> from a dict with columns <code>name</code>, <code>age</code>, <code>city</code>.",
        "Print the first 3 rows of a DataFrame with <code>df.head(3)</code>.",
        "Print the shape, column names, and dtypes of a DataFrame.",
        "Use <code>df.describe()</code> on a DataFrame with numeric columns.",
        "Filter rows where <code>age > 30</code> using boolean indexing.",
      ],
      level2: [
        "Read a CSV file with <code>pd.read_csv()</code> and print the first 5 rows and shape.",
        "Filter a DataFrame to show only rows where a column contains the word <code>'python'</code> (case-insensitive).",
        "Add a new column <code>total = price * quantity</code> to an existing DataFrame.",
        "Convert a column from string to float using <code>.astype(float)</code>.",
        "Sort a DataFrame by a numeric column descending using <code>.sort_values()</code>.",
        "Extract only the title column as a <code>Series</code> and count unique values.",
      ],
      level3: [
        "Read the Hacker News CSV, filter for titles containing <code>'python'</code> or <code>'Python'</code>, and display the top 10 by score.",
        "Group a DataFrame by a category column and compute the mean of a numeric column per group using <code>.groupby()</code>.",
        "Read a CSV of countries, find the 10 most populated, and calculate the percentage of world population each represents.",
        "Merge two DataFrames on a shared key column using <code>pd.merge()</code>.",
      ],
    },

    quiz: [
      {
        q: "What is the difference between a Series and a DataFrame?",
        opts: ["No difference", "Series is 1D (one column); DataFrame is 2D (a table)", "DataFrame is faster", "Series can only hold strings"],
        answer: 1,
        explain: "A Series is a labeled 1D array (like one column). A DataFrame is a 2D table of multiple Series sharing the same index.",
      },
      {
        q: "How do you read a CSV file into a DataFrame?",
        opts: ["pd.open('file.csv')", "pd.read_csv('file.csv')", "pd.load('file.csv')", "pd.DataFrame.from_csv()"],
        answer: 1,
        explain: "pd.read_csv('file.csv') reads a CSV file and returns a DataFrame.",
      },
      {
        q: "What does df[df['age'] > 30] do?",
        opts: ["Selects the age column", "Filters rows where age is greater than 30", "Deletes rows where age > 30", "Returns a count"],
        answer: 1,
        explain: "df['age'] > 30 creates a boolean mask, and df[mask] returns only the rows where the condition is True.",
      },
      {
        q: "What does df.shape return?",
        opts: ["The column names", "A tuple of (number of rows, number of columns)", "The data types", "The index"],
        answer: 1,
        explain: "df.shape returns a tuple (rows, columns) — e.g. (100, 5) for a 100-row, 5-column DataFrame.",
      },
      {
        q: "What does df.describe() show?",
        opts: ["The first 5 rows", "The last 5 rows", "Statistical summary: count, mean, std, min, max, quartiles for numeric columns", "The column data types"],
        answer: 2,
        explain: "describe() gives a statistical summary of all numeric columns: count, mean, standard deviation, min, quartiles, and max.",
      },
    ],
  },

  {
    day: 26,
    emoji: "🌐",
    title: "Python Web (Flask)",
    subtitle: "Build web applications with Flask. Create routes, render HTML templates, handle forms, and serve a web app.",
    topics: ["Flask setup", "@app.route()", "render_template()", "Jinja2 templates", "Forms & POST", "url_for()"],

    lesson: `
    <div class="lesson-section">
      <h2>What is Flask?</h2>
      <p><strong>Flask</strong> is a lightweight Python web framework. You write Python functions, decorate them with <code>@app.route()</code>, and Flask turns them into web pages. Install with <code>pip install flask</code>.</p>
      <div class="info-box">
        <strong>Note:</strong> Flask runs as a local server — code in this day won't run in the browser playground. Run it in your terminal with <code>python app.py</code>.
      </div>

      <div class="section-divider"></div>
      <h2>Minimal Flask App</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '&lt;h1&gt;Hello, World!&lt;/h1&gt;'

@app.route('/about')
def about():
    return '&lt;p&gt;This is my Python web app.&lt;/p&gt;'

if __name__ == '__main__':
    app.run(debug=True)</pre>
      <p>Run it: <code>python app.py</code> → open <code>http://localhost:5000</code></p>

      <div class="section-divider"></div>
      <h2>HTML Templates with Jinja2</h2>
      <p>Return full HTML files from a <code>templates/</code> folder using <code>render_template()</code>. Jinja2 lets you inject Python variables into HTML:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from flask import Flask, render_template
app = Flask(__name__)

@app.route('/user/&lt;name&gt;')
def user(name):
    return render_template('user.html', username=name)</pre>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">&lt;!-- templates/user.html --&gt;
&lt;h1&gt;Hello, {{ username }}!&lt;/h1&gt;

{% for item in items %}
  &lt;li&gt;{{ item }}&lt;/li&gt;
{% endfor %}

{% if user_logged_in %}
  &lt;p&gt;Welcome back!&lt;/p&gt;
{% endif %}</pre>

      <div class="section-divider"></div>
      <h2>Jinja2 Syntax Cheatsheet</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{{ variable }}</div><div class="cheatsheet-desc">Output a variable value</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{% for x in list %} {% endfor %}</div><div class="cheatsheet-desc">Loop</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{% if condition %} {% endif %}</div><div class="cheatsheet-desc">Conditional</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{% extends 'base.html' %}</div><div class="cheatsheet-desc">Template inheritance</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{% block content %} {% endblock %}</div><div class="cheatsheet-desc">Define a slot in a base template</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">{{ url_for('route_name') }}</div><div class="cheatsheet-desc">Generate URL for a route</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Handling Forms (GET and POST)</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        name = request.form['name']
        return f'&lt;h1&gt;Hello, {name}!&lt;/h1&gt;'
    return render_template('form.html')</pre>

      <div class="section-divider"></div>
      <h2>Project Structure</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">my_flask_app/
├── app.py
├── templates/
│   ├── base.html
│   ├── index.html
│   └── form.html
├── static/
│   └── style.css
└── requirements.txt</pre>
    </div>
    `,

    examples: [
      {
        title: "Flask App Structure (Reference)",
        desc: "A complete minimal Flask app — run in your terminal.",
        code: `# app.py — run with: python app.py
# Then open http://localhost:5000 in your browser

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Home Page</h1><a href="/about">About</a>'

@app.route('/about')
def about():
    return '<h1>About Page</h1>'

@app.route('/user/<name>')
def user(name):
    return f'<h1>Hello, {name.title()}!</h1>'

if __name__ == '__main__':
    app.run(debug=True)

print("To run: python app.py")
print("Then visit: http://localhost:5000")`,
      },
      {
        title: "Jinja2 Template Rendering (Simulated)",
        desc: "See how Jinja2 fills templates with data.",
        code: `# Jinja2 renders templates like this:
# {{ name }} becomes the actual value
# {% for item in list %} becomes a loop

# Simulating what Flask sends to a template
context = {
    "username": "Charles",
    "items": ["Python", "Flask", "HTML", "CSS"],
    "is_admin": True
}

# This is what the Jinja2 engine does (simplified)
template = """
Hello, {username}!
Your items:
{items_list}
{admin_msg}
"""

items_html = "\\n".join(f"  - {item}" for item in context["items"])
admin_msg = "You have admin access." if context["is_admin"] else ""

print(template.format(
    username=context["username"],
    items_list=items_html,
    admin_msg=admin_msg
))`,
      },
      {
        title: "Route Patterns",
        desc: "Dynamic routes, URL parameters, and url_for.",
        code: `# Flask route patterns reference

routes = [
    ("@app.route('/')",           "home page"),
    ("@app.route('/about')",      "static about page"),
    ("@app.route('/user/<name>')", "dynamic — name is a variable"),
    ("@app.route('/post/<int:id>)","dynamic — id must be an integer"),
    ("@app.route('/form', methods=['GET','POST'])", "accepts both methods"),
]

print("Flask Route Patterns:")
for route, desc in routes:
    print(f"  {route}")
    print(f"    → {desc}")
    print()

print("url_for examples:")
print("  url_for('home')           → '/'")
print("  url_for('user', name='Alice') → '/user/Alice'")`,
      },
      {
        title: "Form Handling Logic",
        desc: "What happens on GET vs POST.",
        code: `# Simulating Flask form handling logic

def handle_form(method, form_data=None):
    if method == 'GET':
        return "Show empty form to user"
    elif method == 'POST':
        name = form_data.get('name', '')
        message = form_data.get('message', '')
        if not name:
            return "Error: name is required"
        return f"Thank you, {name}! Message received: '{message}'"

# GET request (user visits the page)
print(handle_form('GET'))

# POST request (user submits the form)
print(handle_form('POST', {'name': 'Alice', 'message': 'Hello!'}))

# POST with missing field
print(handle_form('POST', {'message': 'no name here'}))`,
      },
      {
        title: "Template Inheritance Concept",
        desc: "How base.html + child templates work.",
        code: `# Flask's template inheritance explained in code

base_template = """
<!DOCTYPE html>
<html>
<head><title>{title}</title></head>
<body>
  <nav>Home | About | Contact</nav>
  {content}
  <footer>© 2026 My Site</footer>
</body>
</html>
"""

# Child page fills in the slots
def render_page(title, content):
    return base_template.format(title=title, content=content)

# Home page
home_content = "<h1>Welcome!</h1><p>This is the home page.</p>"
print(render_page("Home", home_content))`,
      },
    ],

    exercises: {
      level1: [
        "Create a minimal Flask app with one route <code>'/'</code> that returns <code>'Hello, World!'</code>. Run it and open it in your browser.",
        "Add a second route <code>'/about'</code> that returns a short paragraph about yourself.",
        "Create a dynamic route <code>'/user/&lt;name&gt;'</code> that returns <code>'Hello, &lt;name&gt;!'</code>.",
        "Create a <code>templates/</code> folder and a <code>home.html</code> file. Use <code>render_template('home.html')</code> to serve it.",
        "Add a Jinja2 variable <code>{{ title }}</code> to your template and pass it from the route.",
        "Add a <code>{% for %}</code> loop to your template to render a list of items.",
      ],
      level2: [
        "Build a route that accepts a name via URL parameter and renders a greeting template.",
        "Create a form in HTML and a Flask route that handles GET (show form) and POST (process input).",
        "Use template inheritance: create <code>base.html</code> with a nav and footer, and extend it in child templates.",
        "Add a CSS file to <code>static/</code> and link it in your template using <code>url_for('static', filename='style.css')</code>.",
        "Create a route that accepts an integer <code>/multiply/&lt;int:a&gt;/&lt;int:b&gt;</code> and returns the product.",
        "Use <code>redirect(url_for('home'))</code> after a POST to prevent form resubmission.",
      ],
      level3: [
        "Build a text analyzer web app: a form where users paste text, submit it, and see word count, character count, and most common words.",
        "Add a simple in-memory 'database' (a Python list of dicts) and create routes to view, add, and delete items.",
        "Build a multi-page site with a navigation bar that highlights the active page using Jinja2 conditionals.",
        "Deploy your Flask app to a free hosting service (Railway, Render, or PythonAnywhere) and share the URL.",
      ],
    },

    quiz: [
      {
        q: "What decorator defines a Flask route?",
        opts: ["@flask.route()", "@app.url()", "@app.route()", "@route.flask()"],
        answer: 2,
        explain: "@app.route('/path') tells Flask to call the decorated function when that URL is visited.",
      },
      {
        q: "What does render_template('page.html') do?",
        opts: ["Creates an HTML file", "Reads and renders an HTML file from the templates/ folder", "Downloads a template from the internet", "Converts Python to HTML"],
        answer: 1,
        explain: "render_template() reads the specified HTML file from the templates/ directory, processes Jinja2 syntax, and returns the result.",
      },
      {
        q: "In Jinja2, how do you output a variable?",
        opts: ["{variable}", "#{variable}", "{{ variable }}", "[[variable]]"],
        answer: 2,
        explain: "Double curly braces {{ variable }} output a variable's value in Jinja2 templates.",
      },
      {
        q: "What does `methods=['GET', 'POST']` do in a route?",
        opts: ["Makes the route faster", "Allows the route to handle both GET (view) and POST (submit) requests", "Connects to a database", "Creates two separate routes"],
        answer: 1,
        explain: "By default Flask only accepts GET. Adding POST allows the route to handle form submissions.",
      },
      {
        q: "What does `request.form['name']` access?",
        opts: ["A URL parameter", "Data submitted in an HTML form via POST", "A query string parameter", "A cookie"],
        answer: 1,
        explain: "request.form accesses data submitted in an HTML form's POST body — the input field with name='name'.",
      },
    ],
  },

  {
    day: 27,
    emoji: "🍃",
    title: "Python with MongoDB",
    subtitle: "Store and query data in MongoDB — a NoSQL database. Learn CRUD operations with pymongo.",
    topics: ["SQL vs NoSQL", "pymongo", "insert_one/many", "find & filter", "update & delete", "Collections"],

    lesson: `
    <div class="lesson-section">
      <h2>SQL vs NoSQL</h2>
      <p>Traditional <strong>SQL databases</strong> store data in rigid tables with fixed columns. <strong>NoSQL databases</strong> like MongoDB store data as flexible JSON-like documents — no fixed schema required.</p>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">SQL</div><div class="cheatsheet-desc">Tables, rows, fixed columns, strict schema</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">MongoDB</div><div class="cheatsheet-desc">Collections, documents (JSON), flexible schema</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Table</div><div class="cheatsheet-desc">→ Collection</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Row</div><div class="cheatsheet-desc">→ Document (a dict/JSON object)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Column</div><div class="cheatsheet-desc">→ Field (key in the dict)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">PRIMARY KEY</div><div class="cheatsheet-desc">→ _id (auto-generated ObjectId)</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Connecting with pymongo</h2>
      <p>Install: <code>pip install pymongo</code>. Connect to a MongoDB Atlas cluster (free tier available at mongodb.com):</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from pymongo import MongoClient

# Atlas connection string (from your cluster's Connect button)
client = MongoClient("mongodb+srv://user:password@cluster.mongodb.net/")

db = client["my_database"]
collection = db["students"]</pre>

      <div class="section-divider"></div>
      <h2>CRUD Operations</h2>
      <h3>Create — Insert</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">student = {"name": "Alice", "age": 20, "grade": "A"}
result = collection.insert_one(student)
print(result.inserted_id)   # the auto-generated _id

students = [
    {"name": "Bob",   "age": 22, "grade": "B"},
    {"name": "Carol", "age": 21, "grade": "A"},
]
collection.insert_many(students)</pre>

      <h3>Read — Find</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">for doc in collection.find():
    print(doc)

# Filter
alice = collection.find_one({"name": "Alice"})
a_students = collection.find({"grade": "A"})

# Sort and limit
top = collection.find().sort("age", -1).limit(3)</pre>

      <h3>Update</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">collection.update_one(
    {"name": "Alice"},
    {"$set": {"age": 21}}
)

collection.update_many(
    {"grade": "B"},
    {"$set": {"grade": "B+"}}
)</pre>

      <h3>Delete</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">collection.delete_one({"name": "Bob"})
collection.delete_many({"grade": "D"})
collection.drop()   # delete the whole collection</pre>
    </div>
    `,

    examples: [
      {
        title: "Simulating MongoDB Documents",
        desc: "MongoDB stores Python dicts as documents — practice with dicts.",
        code: `# MongoDB documents are just Python dicts
# This simulates a 'students' collection in memory

students = [
    {"_id": 1, "name": "Alice", "age": 20, "grade": "A"},
    {"_id": 2, "name": "Bob",   "age": 22, "grade": "B"},
    {"_id": 3, "name": "Carol", "age": 21, "grade": "A"},
    {"_id": 4, "name": "Dave",  "age": 23, "grade": "C"},
]

# find() — return all
print("All students:")
for s in students:
    print(f"  {s['name']} ({s['grade']})")

# find_one() — filter
alice = next((s for s in students if s['name'] == 'Alice'), None)
print("\\nAlice:", alice)

# find() with filter
a_grade = [s for s in students if s['grade'] == 'A']
print("\\nA students:", [s['name'] for s in a_grade])`,
      },
      {
        title: "CRUD Simulation",
        desc: "Insert, find, update, delete — MongoDB style.",
        code: `# Simulating pymongo CRUD without a live connection

class FakeCollection:
    def __init__(self):
        self.docs = []
        self._counter = 1

    def insert_one(self, doc):
        doc['_id'] = self._counter
        self._counter += 1
        self.docs.append(doc)
        return doc

    def find(self, query=None):
        if not query:
            return self.docs
        return [d for d in self.docs
                if all(d.get(k) == v for k, v in query.items())]

    def update_one(self, query, update):
        for d in self.docs:
            if all(d.get(k) == v for k, v in query.items()):
                d.update(update.get('$set', {}))
                return

    def delete_one(self, query):
        for i, d in enumerate(self.docs):
            if all(d.get(k) == v for k, v in query.items()):
                self.docs.pop(i)
                return

col = FakeCollection()
col.insert_one({"name": "Alice", "grade": "A"})
col.insert_one({"name": "Bob",   "grade": "B"})
print("All:", col.find())
col.update_one({"name": "Bob"}, {"$set": {"grade": "B+"}})
print("After update:", col.find())
col.delete_one({"name": "Alice"})
print("After delete:", col.find())`,
      },
      {
        title: "MongoDB Query Operators",
        desc: "Filter with comparison operators.",
        code: `# MongoDB uses special operators in query dicts
# In real pymongo: collection.find({"age": {"$gt": 20}})

data = [
    {"name": "Alice", "age": 20, "score": 88},
    {"name": "Bob",   "age": 25, "score": 72},
    {"name": "Carol", "age": 22, "score": 95},
    {"name": "Dave",  "age": 28, "score": 63},
]

def mongo_find(collection, query):
    results = []
    for doc in collection:
        match = True
        for field, condition in query.items():
            if isinstance(condition, dict):
                val = doc.get(field, 0)
                if "$gt" in condition and not (val > condition["$gt"]):
                    match = False
                if "$gte" in condition and not (val >= condition["$gte"]):
                    match = False
            else:
                if doc.get(field) != condition:
                    match = False
        if match:
            results.append(doc)
    return results

print("age > 21:", [d['name'] for d in mongo_find(data, {"age": {"$gt": 21}})])
print("score >= 80:", [d['name'] for d in mongo_find(data, {"score": {"$gte": 80}})])`,
      },
      {
        title: "Sort and Limit Simulation",
        desc: "Replicate .sort().limit() behavior.",
        code: `students = [
    {"name": "Alice", "age": 20, "gpa": 3.9},
    {"name": "Bob",   "age": 22, "gpa": 3.2},
    {"name": "Carol", "age": 21, "gpa": 3.8},
    {"name": "Dave",  "age": 23, "gpa": 3.5},
    {"name": "Eve",   "age": 20, "gpa": 4.0},
]

# Sort by GPA descending (like .sort("gpa", -1))
sorted_by_gpa = sorted(students, key=lambda s: s['gpa'], reverse=True)

# Limit to top 3 (like .limit(3))
top_3 = sorted_by_gpa[:3]

print("Top 3 students by GPA:")
for s in top_3:
    print(f"  {s['name']}: {s['gpa']}")`,
      },
      {
        title: "Document Structure Best Practices",
        desc: "Designing MongoDB documents for real projects.",
        code: `import json

# Good MongoDB document design

user_doc = {
    "_id": "user_001",
    "name": {"first": "Alice", "last": "Smith"},
    "email": "alice@example.com",
    "age": 30,
    "tags": ["python", "data-science"],
    "address": {
        "city": "Helsinki",
        "country": "Finland"
    },
    "created_at": "2026-01-15T10:00:00Z"
}

print("User document:")
print(json.dumps(user_doc, indent=2))
print()
print("Access nested field:")
print("City:", user_doc["address"]["city"])
print("First name:", user_doc["name"]["first"])`,
      },
    ],

    exercises: {
      level1: [
        "What is the difference between a MongoDB collection and a document?",
        "Write the pymongo code to connect to a local MongoDB instance at <code>mongodb://localhost:27017/</code>.",
        "Write the code to insert one document <code>{'name': 'Alice', 'age': 25}</code> into a collection.",
        "Write the code to retrieve all documents from a collection using <code>find()</code>.",
        "Write the code to find the first document where <code>name == 'Alice'</code>.",
        "What does <code>collection.drop()</code> do?",
      ],
      level2: [
        "Insert 5 student documents into a collection and retrieve only those with <code>grade == 'A'</code>.",
        "Update all documents where <code>grade == 'B'</code> to set <code>grade = 'B+'</code>.",
        "Sort documents by <code>age</code> descending and limit to 3 results.",
        "Delete a document where <code>name == 'Bob'</code>.",
        "Count the number of documents in a collection using <code>collection.count_documents({})</code>.",
        "Use <code>{'$gt': 20}</code> to find documents where age is greater than 20.",
      ],
      level3: [
        "Build a simple student management CLI: menu-driven add/list/update/delete using pymongo.",
        "Design a MongoDB document schema for a blog: posts with embedded comments and tags.",
        "Write a script that reads a JSON file and bulk-inserts all records into MongoDB using <code>insert_many()</code>.",
        "Create an index on the <code>email</code> field using <code>collection.create_index('email', unique=True)</code> and explain why.",
      ],
    },

    quiz: [
      {
        q: "What is a MongoDB collection?",
        opts: ["A SQL table with fixed columns", "A group of JSON-like documents (like a table but flexible)", "A Python list", "A database connection"],
        answer: 1,
        explain: "A collection is MongoDB's equivalent of a table — it holds documents (JSON objects) that can have different fields.",
      },
      {
        q: "Which pymongo method inserts one document?",
        opts: ["collection.add()", "collection.insert()", "collection.insert_one()", "collection.push()"],
        answer: 2,
        explain: "insert_one() inserts a single document. insert_many() inserts a list of documents.",
      },
      {
        q: "What does collection.find({'grade': 'A'}) return?",
        opts: ["A single document", "A cursor (iterable) of all documents where grade equals 'A'", "True or False", "The count of matching documents"],
        answer: 1,
        explain: "find() returns a cursor — an iterable of all matching documents. Use find_one() for a single result.",
      },
      {
        q: "What does {'$set': {'age': 21}} do in update_one?",
        opts: ["Creates a new document", "Sets the age field to 21 in the matched document", "Deletes the age field", "Filters by age"],
        answer: 1,
        explain: "$set is an update operator that modifies specific fields without replacing the whole document.",
      },
      {
        q: "How is MongoDB different from a SQL database?",
        opts: ["MongoDB is slower", "MongoDB stores data in flexible JSON documents, not fixed-column tables", "MongoDB doesn't support queries", "MongoDB can only store text"],
        answer: 1,
        explain: "MongoDB is NoSQL — documents can have different fields and nested structures. SQL requires a fixed schema (columns) for every row.",
      },
    ],
  },

  {
    day: 28,
    emoji: "📡",
    title: "APIs",
    subtitle: "Understand how APIs work. Consume REST APIs using HTTP methods, status codes, and JSON data.",
    topics: ["What is an API", "REST", "HTTP methods", "Status codes", "JSON responses", "requests library"],

    lesson: `
    <div class="lesson-section">
      <h2>What is an API?</h2>
      <p>An <strong>API</strong> (Application Programming Interface) is a defined way for programs to communicate. A <strong>Web API</strong> lets you send an HTTP request to a URL and get data back — usually JSON.</p>
      <p>Think of it as a waiter: you (the client) tell the waiter (API) what you want, and it brings data from the kitchen (server) back to you.</p>

      <div class="section-divider"></div>
      <h2>REST — How Web APIs Are Structured</h2>
      <p>Most modern web APIs are <strong>RESTful</strong>. REST uses standard HTTP methods to perform operations:</p>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">GET</div><div class="cheatsheet-desc">Retrieve data — read only, no side effects</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">POST</div><div class="cheatsheet-desc">Create new data — sends a body</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">PUT</div><div class="cheatsheet-desc">Replace/update an existing resource</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">DELETE</div><div class="cheatsheet-desc">Remove a resource</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>HTTP Status Codes</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">200 OK</div><div class="cheatsheet-desc">Request succeeded</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">201 Created</div><div class="cheatsheet-desc">New resource created (POST success)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">400 Bad Request</div><div class="cheatsheet-desc">Your request was malformed</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">401 Unauthorized</div><div class="cheatsheet-desc">Authentication required</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">404 Not Found</div><div class="cheatsheet-desc">Resource doesn't exist</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">500 Server Error</div><div class="cheatsheet-desc">Something broke on the server</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Consuming an API with requests</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">import requests

# GET request
response = requests.get('https://api.github.com/users/Asabeneh')
print(response.status_code)   # 200
data = response.json()
print(data['name'])
print(data['public_repos'])</pre>

      <h3>With Headers (API Key)</h3>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">headers = {'Authorization': 'Bearer YOUR_API_KEY'}
response = requests.get(url, headers=headers)

# POST — send JSON body
payload = {'title': 'New Post', 'body': 'Content here'}
response = requests.post(url, json=payload, headers=headers)
print(response.status_code)   # 201 Created</pre>

      <div class="section-divider"></div>
      <h2>API Response Structure</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#94a3b8;overflow-x:auto">{
  "status": "ok",
  "total_results": 3,
  "data": [
    { "id": 1, "name": "Alice", "score": 88 },
    { "id": 2, "name": "Bob",   "score": 72 }
  ]
}</pre>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">data = response.json()
for person in data['data']:
    print(person['name'], person['score'])</pre>
    </div>
    `,

    examples: [
      {
        title: "HTTP Methods and Status Codes",
        desc: "Understanding the building blocks of APIs.",
        code: `# The 4 core HTTP methods and what they map to
http_methods = {
    "GET":    "Read/retrieve data",
    "POST":   "Create new data",
    "PUT":    "Update/replace existing data",
    "DELETE": "Delete data"
}

status_codes = {
    200: ("OK",           "Request succeeded"),
    201: ("Created",      "POST succeeded, new resource created"),
    400: ("Bad Request",  "Your request was malformed"),
    401: ("Unauthorized", "Authentication required"),
    403: ("Forbidden",    "You don't have permission"),
    404: ("Not Found",    "The resource doesn't exist"),
    500: ("Server Error", "Something broke on the server side"),
}

print("HTTP Methods:")
for method, desc in http_methods.items():
    print(f"  {method:<8} → {desc}")

print("\\nCommon Status Codes:")
for code, (name, desc) in status_codes.items():
    print(f"  {code} {name:<15} → {desc}")`,
      },
      {
        title: "Simulating an API Response",
        desc: "Parse JSON like you'd get from a real API call.",
        code: `import json

# What response.json() would return from a countries API
raw_json = '''
{
  "status": "ok",
  "count": 4,
  "data": [
    {"name": "Finland", "capital": "Helsinki", "population": 5540000},
    {"name": "Sweden",  "capital": "Stockholm","population": 10400000},
    {"name": "Norway",  "capital": "Oslo",     "population": 5380000},
    {"name": "Denmark", "capital": "Copenhagen","population": 5900000}
  ]
}
'''

data = json.loads(raw_json)
print(f"Status: {data['status']}, Count: {data['count']}")
print()
for country in data['data']:
    print(f"{country['name']:10s} ({country['capital']}) — {country['population']:,}")`,
      },
      {
        title: "Using the requests Library",
        desc: "A real GET request to a public API.",
        code: `import requests

# JSONPlaceholder is a free fake API for testing
url = "https://jsonplaceholder.typicode.com/posts/1"

response = requests.get(url)
print(f"Status: {response.status_code}")
print(f"Content-Type: {response.headers.get('content-type')}")
print()

post = response.json()
print(f"Title: {post['title']}")
print(f"Body:  {post['body'][:80]}...")
print(f"User ID: {post['userId']}")`,
      },
      {
        title: "Handling API Errors",
        desc: "Check status codes before processing the response.",
        code: `import requests

def safe_get(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            print(f"Not found: {url}")
        elif response.status_code == 401:
            print("Authentication required — check your API key")
        else:
            print(f"Error {response.status_code}: {response.text[:100]}")
    except requests.exceptions.Timeout:
        print("Request timed out")
    except requests.exceptions.ConnectionError:
        print("Could not connect to the server")
    return None

result = safe_get("https://jsonplaceholder.typicode.com/posts/1")
if result:
    print("Got:", result['title'])`,
      },
      {
        title: "Query Parameters",
        desc: "Pass filters to an API via URL parameters.",
        code: `import requests

# Many APIs accept query parameters for filtering
# e.g. GET /posts?userId=1&_limit=3

url = "https://jsonplaceholder.typicode.com/posts"
params = {
    "userId": 1,    # filter by user
    "_limit": 3     # limit to 3 results
}

response = requests.get(url, params=params)
# requests builds: https://...posts?userId=1&_limit=3

print(f"URL called: {response.url}")
print(f"Status: {response.status_code}")
posts = response.json()
print(f"Got {len(posts)} posts:")
for post in posts:
    print(f"  [{post['id']}] {post['title'][:50]}")`,
      },
    ],

    exercises: {
      level1: [
        "What does HTTP GET do? When would you use POST instead?",
        "What do status codes 200, 404, and 500 mean?",
        "Use <code>requests.get('https://jsonplaceholder.typicode.com/posts/1')</code> and print the status code and title.",
        "Use <code>response.json()</code> to parse the response and print the <code>body</code> field.",
        "What is the <code>Content-Type</code> header used for?",
        "What is the difference between a REST API and a regular website?",
      ],
      level2: [
        "Fetch all posts from <code>https://jsonplaceholder.typicode.com/posts</code> and print the title of the first 5.",
        "Use query parameters to fetch only posts by <code>userId=2</code>.",
        "Write a function <code>get_post(id)</code> that fetches a single post by ID and returns the dict.",
        "Handle the case where the API returns a 404 — print a friendly error message.",
        "Fetch data from a real public API (e.g. <code>https://catfact.ninja/fact</code>) and print the result.",
        "Add a <code>timeout=5</code> parameter to your request and handle <code>requests.exceptions.Timeout</code>.",
      ],
      level3: [
        "Fetch all 100 posts from JSONPlaceholder, group them by <code>userId</code>, and print how many posts each user made.",
        "Build a function that paginates through multiple pages of an API and returns all results combined.",
        "Use the <code>requests</code> library to make a POST request to JSONPlaceholder and print the created resource.",
        "Fetch exchange rates from a free currency API and write a <code>convert(amount, from_currency, to_currency)</code> function.",
      ],
    },

    quiz: [
      {
        q: "What does REST stand for in REST API?",
        opts: ["Really Easy Server Technology", "Representational State Transfer", "Remote Execution of Server Tasks", "Resource Endpoint Service Transfer"],
        answer: 1,
        explain: "REST stands for Representational State Transfer — an architectural style for building web APIs using HTTP.",
      },
      {
        q: "Which HTTP method retrieves data without changing anything?",
        opts: ["POST", "DELETE", "PUT", "GET"],
        answer: 3,
        explain: "GET is read-only — it retrieves data without creating, modifying, or deleting anything on the server.",
      },
      {
        q: "What does a 404 status code mean?",
        opts: ["Server crashed", "Request succeeded", "The requested resource was not found", "Authentication required"],
        answer: 2,
        explain: "404 Not Found means the URL/resource you requested doesn't exist on the server.",
      },
      {
        q: "What does response.json() do?",
        opts: ["Sends JSON to the server", "Converts the response body from JSON to a Python dict or list", "Saves the response to a file", "Prints the raw JSON"],
        answer: 1,
        explain: "response.json() parses the JSON response body and returns the equivalent Python object (dict or list).",
      },
      {
        q: "How do you pass query parameters with requests.get()?",
        opts: ["Append them manually to the URL string", "Use the params= argument with a dict", "Use the query= argument", "Query parameters aren't supported"],
        answer: 1,
        explain: "Pass params={'key': 'value'} to requests.get() and it will automatically append them to the URL correctly.",
      },
    ],
  },

  {
    day: 29,
    emoji: "🔨",
    title: "Building an API",
    subtitle: "Build your own REST API with Flask. Create routes that return JSON and handle full CRUD operations.",
    topics: ["Flask JSON routes", "jsonify()", "GET & POST routes", "PUT & DELETE routes", "Status codes", "MongoDB integration"],

    lesson: `
    <div class="lesson-section">
      <h2>From Consuming to Building</h2>
      <p>Day 28 covered <em>consuming</em> APIs. Today you build your own. Instead of returning HTML, your Flask routes will return <strong>JSON data</strong> that any client (web app, mobile app, another Python script) can consume.</p>

      <div class="section-divider"></div>
      <h2>Returning JSON from Flask</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from flask import Flask, jsonify

app = Flask(__name__)

students = [
    {"id": 1, "name": "Alice", "grade": "A"},
    {"id": 2, "name": "Bob",   "grade": "B"},
]

@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify(students), 200

@app.route('/api/students/&lt;int:id&gt;', methods=['GET'])
def get_student(id):
    student = next((s for s in students if s['id'] == id), None)
    if not student:
        return jsonify({"error": "Not found"}), 404
    return jsonify(student), 200</pre>

      <div class="section-divider"></div>
      <h2>Creating Resources — POST</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">from flask import Flask, jsonify, request

@app.route('/api/students', methods=['POST'])
def create_student():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({"error": "name is required"}), 400
    new_student = {
        "id": len(students) + 1,
        "name": data['name'],
        "grade": data.get('grade', 'ungraded')
    }
    students.append(new_student)
    return jsonify(new_student), 201   # 201 = Created</pre>

      <div class="section-divider"></div>
      <h2>Updating — PUT</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">@app.route('/api/students/&lt;int:id&gt;', methods=['PUT'])
def update_student(id):
    student = next((s for s in students if s['id'] == id), None)
    if not student:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json()
    student.update(data)
    return jsonify(student), 200</pre>

      <div class="section-divider"></div>
      <h2>Deleting — DELETE</h2>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">@app.route('/api/students/&lt;int:id&gt;', methods=['DELETE'])
def delete_student(id):
    global students
    before = len(students)
    students = [s for s in students if s['id'] != id]
    if len(students) == before:
        return jsonify({"error": "Not found"}), 404
    return jsonify({"message": "Deleted"}), 200</pre>

      <div class="section-divider"></div>
      <h2>REST API Design Pattern</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">GET /api/students</div><div class="cheatsheet-desc">List all students</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">GET /api/students/1</div><div class="cheatsheet-desc">Get student with id=1</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">POST /api/students</div><div class="cheatsheet-desc">Create a new student</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">PUT /api/students/1</div><div class="cheatsheet-desc">Update student with id=1</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">DELETE /api/students/1</div><div class="cheatsheet-desc">Delete student with id=1</div></div>
      </div>
    </div>
    `,

    examples: [
      {
        title: "Complete Student API",
        desc: "Full CRUD API — run in your terminal with Flask.",
        code: `# app.py — run with: python app.py
# Test with: curl http://localhost:5000/api/students

from flask import Flask, jsonify, request

app = Flask(__name__)

students = [
    {"id": 1, "name": "Alice", "grade": "A"},
    {"id": 2, "name": "Bob",   "grade": "B"},
]

@app.route('/api/students')
def list_students():
    return jsonify(students)

@app.route('/api/students/<int:id>')
def get_student(id):
    s = next((s for s in students if s['id'] == id), None)
    return jsonify(s) if s else (jsonify({"error":"not found"}), 404)

@app.route('/api/students', methods=['POST'])
def create_student():
    data = request.get_json()
    s = {"id": len(students)+1, "name": data['name'], "grade": data.get('grade','?')}
    students.append(s)
    return jsonify(s), 201

if __name__ == '__main__':
    app.run(debug=True)

print("Full CRUD API ready at http://localhost:5000/api/students")`,
      },
      {
        title: "CRUD Logic Without Flask",
        desc: "The in-memory CRUD logic that powers the API.",
        code: `students = [
    {"id": 1, "name": "Alice", "grade": "A"},
    {"id": 2, "name": "Bob",   "grade": "B"},
]
_next_id = 3

def create(name, grade="?"):
    global _next_id
    s = {"id": _next_id, "name": name, "grade": grade}
    students.append(s)
    _next_id += 1
    return s

def read_all():
    return students

def read_one(id):
    return next((s for s in students if s['id'] == id), None)

def update(id, **fields):
    s = read_one(id)
    if s: s.update(fields)
    return s

def delete(id):
    global students
    prev = len(students)
    students = [s for s in students if s['id'] != id]
    return len(students) < prev

print(create("Carol", "A+"))
print(update(1, grade="A+"))
print(delete(2))
print(read_all())`,
      },
      {
        title: "Status Codes in API Design",
        desc: "Return the right code for each situation.",
        code: `def api_response_guide():
    guide = {
        "GET /items         (success)": (200, {"items": [...]}),
        "GET /items/99      (not found)": (404, {"error": "Not found"}),
        "POST /items        (created)": (201, {"id": 3, "name": "new item"}),
        "POST /items        (bad input)": (400, {"error": "name is required"}),
        "DELETE /items/1    (success)": (200, {"message": "Deleted"}),
        "PUT /items/1       (unauthorized)": (401, {"error": "Auth required"}),
    }
    print(f"{'Scenario':<40} {'Status':<8} Response")
    print("-" * 70)
    for scenario, (code, body) in guide.items():
        print(f"{scenario:<40} {code:<8} {body}")

api_response_guide()`,
      },
      {
        title: "Testing Your API with requests",
        desc: "How to test a Flask API from Python.",
        code: `import requests
import json

BASE = "https://jsonplaceholder.typicode.com"

# GET all posts
r = requests.get(f"{BASE}/posts", params={"_limit": 3})
print(f"GET /posts → {r.status_code}")
for p in r.json():
    print(f"  [{p['id']}] {p['title'][:40]}")

# POST — create a new post
new_post = {"title": "My Test Post", "body": "Hello API!", "userId": 1}
r = requests.post(f"{BASE}/posts", json=new_post)
print(f"\\nPOST /posts → {r.status_code}")
print(r.json())

# DELETE
r = requests.delete(f"{BASE}/posts/1")
print(f"\\nDELETE /posts/1 → {r.status_code}")`,
      },
      {
        title: "API with Input Validation",
        desc: "Always validate before saving data.",
        code: `def validate_student(data):
    errors = []
    if not data:
        return ["Request body is required"]
    if "name" not in data or not data["name"].strip():
        errors.append("'name' is required and cannot be empty")
    if "grade" in data and data["grade"] not in ["A","B","C","D","F","?"]:
        errors.append(f"Invalid grade: {data['grade']}")
    if "age" in data:
        try:
            age = int(data["age"])
            if age < 5 or age > 100:
                errors.append("Age must be between 5 and 100")
        except (ValueError, TypeError):
            errors.append("Age must be an integer")
    return errors

# Test validation
test_cases = [
    {"name": "Alice", "grade": "A", "age": 20},  # valid
    {},                                             # missing name
    {"name": "", "grade": "Z"},                    # bad grade
    {"name": "Bob", "age": "old"},                 # bad age type
]

for data in test_cases:
    errors = validate_student(data)
    if errors:
        print(f"INVALID {data}: {errors}")
    else:
        print(f"VALID: {data}")`,
      },
    ],

    exercises: {
      level1: [
        "Create a Flask route <code>GET /api/items</code> that returns a JSON list of 3 items.",
        "Add a route <code>GET /api/items/&lt;int:id&gt;</code> that returns one item by ID, or a 404 error.",
        "What HTTP status code should a POST route return when it successfully creates a resource?",
        "What does <code>jsonify()</code> do in Flask?",
        "What does <code>request.get_json()</code> return in a POST route?",
        "Write a route that returns <code>{'error': 'Not found'}</code> with status code 404.",
      ],
      level2: [
        "Add a <code>POST /api/students</code> route that reads JSON from the request body and appends a new student.",
        "Add a <code>PUT /api/students/&lt;id&gt;</code> route that updates a specific student.",
        "Add a <code>DELETE /api/students/&lt;id&gt;</code> route that removes a student.",
        "Add input validation that returns 400 if <code>name</code> is missing from a POST body.",
        "Test your API using the <code>requests</code> library in a separate script.",
        "Add a <code>GET /api/students?grade=A</code> query parameter filter using <code>request.args.get('grade')</code>.",
      ],
      level3: [
        "Connect your Flask API to MongoDB using pymongo instead of an in-memory list.",
        "Add error handling middleware that catches unhandled exceptions and returns a 500 JSON response.",
        "Deploy your API to Railway or Render and test it with a real HTTP client.",
        "Add a simple API key check: require an <code>X-API-Key</code> header on all routes and return 401 if missing.",
      ],
    },

    quiz: [
      {
        q: "What does jsonify() do in Flask?",
        opts: ["Reads JSON from the request", "Converts a Python dict/list to a JSON HTTP response with correct Content-Type", "Parses query parameters", "Connects to a database"],
        answer: 1,
        explain: "jsonify() takes a Python object, serializes it to JSON, and returns a Flask Response with Content-Type: application/json.",
      },
      {
        q: "What status code should a successful POST (create) return?",
        opts: ["200", "201", "204", "301"],
        answer: 1,
        explain: "201 Created is the correct status for a successful POST that created a new resource. 200 OK is for successful GET/PUT.",
      },
      {
        q: "How do you read JSON from an incoming POST request in Flask?",
        opts: ["request.json()", "request.body", "request.get_json()", "flask.parse_json()"],
        answer: 2,
        explain: "request.get_json() parses the request body as JSON and returns the Python dict/list.",
      },
      {
        q: "What does `methods=['GET', 'POST']` do in a route decorator?",
        opts: ["Creates two separate routes", "Allows the route to handle both GET and POST requests", "Makes it faster", "Sets the Content-Type"],
        answer: 1,
        explain: "By default Flask only allows GET. Specifying methods=['GET','POST'] lets one route function handle both request types.",
      },
      {
        q: "What should your API return when a requested resource doesn't exist?",
        opts: ["200 with an empty body", "404 Not Found with an error message", "301 Redirect", "200 with null"],
        answer: 1,
        explain: "Return 404 Not Found with a JSON error body like {'error': 'Not found'} so the client knows exactly what happened.",
      },
    ],
  },

  {
    day: 30,
    emoji: "🎓",
    title: "Conclusions",
    subtitle: "You made it. Review what you built, celebrate the journey, and map out your next steps as a Python developer.",
    topics: ["30-day recap", "What you built", "Python paths", "Projects to build", "Resources", "Next steps"],

    lesson: `
    <div class="lesson-section">
      <h2>Congratulations — You Did It.</h2>
      <p>You just completed 30 days of structured Python learning. From <code>print("Hello, World!")</code> to building REST APIs, you've covered the entire core of the Python language and its ecosystem.</p>
      <div class="info-box">
        <strong>This is not the end.</strong> 30 Days of Python is the foundation. What you build on it is up to you.
      </div>

      <div class="section-divider"></div>
      <h2>What You Learned — 30 Days in Review</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 1–3</div><div class="cheatsheet-desc">Data types, variables, operators, comments</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 4–8</div><div class="cheatsheet-desc">Strings, Lists, Tuples, Sets, Dictionaries</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 9–11</div><div class="cheatsheet-desc">Conditionals, Loops, Functions</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 12–14</div><div class="cheatsheet-desc">Modules, List Comprehension, Higher Order Functions</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 15–17</div><div class="cheatsheet-desc">Type Errors, DateTime, Exception Handling</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 18–19</div><div class="cheatsheet-desc">Regular Expressions, File Handling</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 20–21</div><div class="cheatsheet-desc">Packages (pip), Classes & Objects (OOP)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 22–23</div><div class="cheatsheet-desc">Web Scraping, Virtual Environments</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 24–25</div><div class="cheatsheet-desc">Statistics & NumPy, Pandas</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Days 26–29</div><div class="cheatsheet-desc">Flask Web Apps, MongoDB, APIs, Building APIs</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Four Paths from Here</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Web Development</div><div class="cheatsheet-desc">Django, FastAPI, HTML/CSS/JS → build full web apps</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Data Science</div><div class="cheatsheet-desc">NumPy, Pandas, Matplotlib, Seaborn → analyze real data</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Machine Learning</div><div class="cheatsheet-desc">scikit-learn, TensorFlow, PyTorch → build AI models</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">Automation</div><div class="cheatsheet-desc">Selenium, Playwright, schedule → automate tasks</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>Projects to Build Next</h2>
      <ul style="margin:12px 0 16px 24px;color:var(--text-2);line-height:2">
        <li>Personal finance tracker (pandas + matplotlib + Flask)</li>
        <li>Web scraper that emails you alerts (requests + smtplib)</li>
        <li>REST API with full auth (Flask + JWT + MongoDB)</li>
        <li>Portfolio website with a contact form (Flask + deployment)</li>
        <li>Data visualization dashboard (pandas + plotly + Dash)</li>
        <li>Discord or Telegram bot (discord.py or python-telegram-bot)</li>
      </ul>

      <div class="section-divider"></div>
      <h2>Keep Learning Resources</h2>
      <div class="cheatsheet-grid">
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">docs.python.org</div><div class="cheatsheet-desc">Official Python docs — the ground truth</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">realpython.com</div><div class="cheatsheet-desc">In-depth tutorials for every Python topic</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">github.com/Asabeneh</div><div class="cheatsheet-desc">The original 30 Days of Python and more</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">kaggle.com</div><div class="cheatsheet-desc">Real datasets + Python notebooks to practice data science</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">leetcode.com</div><div class="cheatsheet-desc">Coding challenges to sharpen your Python logic</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">stackoverflow.com</div><div class="cheatsheet-desc">Search first — your question has probably been answered</div></div>
      </div>

      <div class="section-divider"></div>
      <h2>The Most Important Thing</h2>
      <p><strong>Build things.</strong> Not tutorials, not courses, not exercises — real things you actually care about. That's when Python stops being something you're learning and becomes something you use.</p>
      <p>The gap between "I finished 30 days" and "I'm a Python developer" is exactly one project.</p>
    </div>
    `,

    examples: [
      {
        title: "Python Skills Self-Assessment",
        desc: "Test how much you remember across all 30 days.",
        code: `# A quick skills quiz — try to answer each before running

skills = {
    "List comprehension: squares of 1-10": [n**2 for n in range(1, 11)],
    "Dict from two lists": dict(zip(['a','b','c'], [1,2,3])),
    "Lambda: sort by second element": sorted([(1,'b'),(2,'a'),(3,'c')], key=lambda x: x[1]),
    "Filter evens from 1-20": list(filter(lambda n: n%2==0, range(1,21))),
    "Flatten [[1,2],[3,4],[5,6]]": [n for row in [[1,2],[3,4],[5,6]] for n in row],
    "String methods chain": "  hello, world  ".strip().title().replace(",", ""),
}

print("30-Day Python — Quick Recap Test")
print("=" * 40)
for question, answer in skills.items():
    print(f"\\n{question}")
    print(f"→ {answer}")`,
      },
      {
        title: "What You Now Know",
        desc: "A tour through 30 days of Python concepts.",
        code: `# Each line demonstrates a concept you've learned

# Day 1-3: Basics
name, age = "Charles", 12
print(f"Name: {name}, Age: {age}")

# Day 4: Strings
print("python".upper().center(20, "-"))

# Day 5: Lists + Day 13: Comprehensions
squares = [n**2 for n in range(1, 6)]

# Day 8: Dicts
person = {"name": name, "squares": squares}

# Day 11: Functions
def greet(n): return f"Hello, {n}!"

# Day 14: Higher Order Functions
doubled = list(map(lambda x: x*2, squares))

# Day 16: DateTime
from datetime import datetime
print(datetime.now().strftime("%Y-%m-%d"))

# Day 17: Exception Handling
try:
    x = int("42")
except ValueError as e:
    print(e)

# Day 18: Regex
import re
emails = re.findall(r'\\w+@\\w+\\.\\w+', 'test@example.com hello@world.org')
print(emails)

print("\\n30 days done. What will you build?")`,
      },
      {
        title: "Your First Real Project Skeleton",
        desc: "A starter template for a Flask + data project.",
        code: `# A real project structure for your next build

project_structure = """
my_first_real_project/
├── venv/                      (Day 23)
├── app/
│   ├── __init__.py            (Day 20)
│   ├── models.py              (Day 21 — Classes)
│   ├── routes.py              (Day 26 — Flask routes)
│   └── api.py                 (Day 29 — JSON API)
├── data/
│   └── dataset.csv            (Day 25 — Pandas)
├── tests/
│   └── test_models.py
├── requirements.txt           (Day 20)
├── .env                       (API keys — never commit!)
└── README.md
"""

workflow = [
    "1. Create project folder",
    "2. python -m venv venv && source venv/bin/activate",
    "3. pip install flask pandas requests pymongo",
    "4. pip freeze > requirements.txt",
    "5. Write your models (classes)",
    "6. Write your routes",
    "7. Test locally",
    "8. Deploy",
]

print("Project structure:")
print(project_structure)
print("Build workflow:")
for step in workflow:
    print(f"  {step}")`,
      },
      {
        title: "Full Python Cheatsheet",
        desc: "One-line reminders of the most important syntax.",
        code: `cheatsheet = {
    # Data structures
    "list":          "[1, 2, 3]",
    "tuple":         "(1, 2, 3)",
    "set":           "{1, 2, 3}",
    "dict":          "{'a': 1, 'b': 2}",

    # Comprehensions
    "list comp":     "[x*2 for x in range(5) if x > 0]",
    "dict comp":     "{k: v for k, v in items}",
    "set comp":      "{x%3 for x in range(10)}",

    # Functions
    "lambda":        "lambda x: x**2",
    "args":          "def f(*args, **kwargs): ...",

    # OOP
    "class":         "class Dog(Animal): def __init__(self, name): ...",
    "inherit":       "class Child(Parent): super().__init__(...)",

    # Error handling
    "try/except":    "try: risky() except ValueError as e: ...",

    # File I/O
    "read file":     "with open('f.txt') as f: data = f.read()",
    "write file":    "with open('f.txt', 'w') as f: f.write('hello')",

    # APIs
    "GET":           "requests.get(url).json()",
    "POST":          "requests.post(url, json=data)",
}

for concept, syntax in cheatsheet.items():
    print(f"{concept:<14} → {syntax}")`,
      },
      {
        title: "Next Steps — Build Something Real",
        desc: "Ideas organized by what you want to specialize in.",
        code: `paths = {
    "Web Dev": [
        "Build a portfolio site with Flask",
        "Add a contact form (sends real emails)",
        "Connect to a database (SQLite or MongoDB)",
        "Learn Django for bigger apps",
        "Deploy to Railway or Render"
    ],
    "Data Science": [
        "Analyze a Kaggle dataset with Pandas",
        "Create visualizations with Matplotlib",
        "Build a data dashboard with Streamlit",
        "Learn SQL to complement your Python",
        "Take a stats course alongside Pandas"
    ],
    "Automation": [
        "Automate a repetitive task you do manually",
        "Write a web scraper for data you care about",
        "Schedule scripts with cron or schedule library",
        "Build a Telegram or Discord bot"
    ],
    "Machine Learning": [
        "Learn scikit-learn with a real dataset",
        "Build a classifier (predict categories)",
        "Learn what train/test split means",
        "Try a Kaggle competition"
    ]
}

for path, steps in paths.items():
    print(f"\\n{path}:")
    for i, step in enumerate(steps, 1):
        print(f"  {i}. {step}")`,
      },
    ],

    exercises: {
      level1: [
        "Write a list comprehension that produces the first 10 perfect squares.",
        "Write a function that uses <code>try/except</code> to safely convert a string to <code>float</code>.",
        "Write a class <code>Counter</code> with a <code>count</code> attribute and <code>increment()</code>, <code>decrement()</code>, and <code>reset()</code> methods.",
        "Open a file, read its content, and count the number of words.",
        "Use the <code>datetime</code> module to print how many days you've been alive.",
        "Write a regex that validates an email address format.",
      ],
      level2: [
        "Write a web scraper that fetches quotes from <code>quotes.toscrape.com</code> and saves them to a JSON file.",
        "Build a <code>Statistics</code> class with <code>mean</code>, <code>median</code>, <code>mode</code>, <code>std</code>, and <code>describe()</code> methods.",
        "Create a Flask API with <code>GET /api/todos</code> and <code>POST /api/todos</code> routes.",
        "Read a CSV with Pandas, clean the data (drop nulls, fix types), and print a summary.",
        "Write a higher-order function <code>memoize(func)</code> that caches results of expensive function calls.",
        "Build a file organizer: move files in a folder into subfolders by extension (images, docs, code, etc.).",
      ],
      level3: [
        "Build a complete Flask REST API for a todo app: full CRUD, JSON responses, input validation, proper status codes.",
        "Scrape a website, store the data in MongoDB, and expose it through a Flask API — a complete data pipeline.",
        "Build a CLI tool that takes a GitHub username and prints their repositories, sorted by stars.",
        "Your final challenge: build something YOU want to use. Any domain, any complexity — just ship it.",
      ],
    },

    quiz: [
      {
        q: "Which Python data structure guarantees no duplicate values?",
        opts: ["list", "tuple", "dict", "set"],
        answer: 3,
        explain: "Sets automatically remove duplicates — {1, 2, 2, 3} becomes {1, 2, 3}.",
      },
      {
        q: "What does `super().__init__()` do in a child class?",
        opts: ["Creates a new instance", "Calls the parent class's constructor to run its setup code", "Imports the parent module", "Deletes the parent class"],
        answer: 1,
        explain: "super() gives access to the parent class. Calling __init__ on it ensures the parent's setup code runs in the child.",
      },
      {
        q: "What is the best way to open a file in Python?",
        opts: ["f = open('file.txt'); f.close()", "with open('file.txt') as f: ...", "file.open('file.txt')", "import file; file.read()"],
        answer: 1,
        explain: "The with statement automatically closes the file when the block exits — even if an error occurs.",
      },
      {
        q: "What is the correct HTTP status code for 'resource created successfully'?",
        opts: ["200", "201", "204", "302"],
        answer: 1,
        explain: "201 Created is the standard response for a successful POST that created a new resource.",
      },
      {
        q: "What is the most important thing to do after finishing 30 Days of Python?",
        opts: ["Read more Python books", "Start another 30-day course", "Build a real project you actually care about", "Memorize all the syntax"],
        answer: 2,
        explain: "Building real projects is what turns knowledge into skill. The gap between 'I know Python' and 'I'm a Python developer' is exactly one project.",
      },
    ],
  },

]; // end of DAYS array

// No more placeholders needed — all 30 days are complete!
for (let d = 99; d <= 30; d++) {
  const topics = {
    20: {
      emoji: "📦",
      title: "Package Manager",
      sub: "pip, virtual environments, requirements.txt.",
    },
    21: {
      emoji: "🏛️",
      title: "Classes & Objects",
      sub: "OOP: class, __init__, methods, inheritance, encapsulation.",
    },
    22: {
      emoji: "🕸️",
      title: "Web Scraping",
      sub: "requests + BeautifulSoup to extract data from websites.",
    },
    23: {
      emoji: "🔒",
      title: "Virtual Environment",
      sub: "venv, pipenv, isolated project dependencies.",
    },
    24: {
      emoji: "📊",
      title: "Statistics",
      sub: "statistics module, numpy basics, data analysis.",
    },
    25: {
      emoji: "🐼",
      title: "Pandas",
      sub: "DataFrame, Series, reading CSVs, data manipulation.",
    },
    26: {
      emoji: "🌐",
      title: "Python Web (Flask)",
      sub: "Routes, templates, HTTP methods, Flask basics.",
    },
    27: {
      emoji: "🍃",
      title: "Python & MongoDB",
      sub: "pymongo, CRUD operations, NoSQL databases.",
    },
    28: {
      emoji: "📡",
      title: "APIs",
      sub: "REST APIs, requests module, JSON data.",
    },
    29: {
      emoji: "🔨",
      title: "Building an API",
      sub: "Build a Flask REST API with full CRUD.",
    },
    30: {
      emoji: "🎓",
      title: "Conclusions",
      sub: "What you have built, what is next, advanced topics.",
    },
  };
  const t = topics[d];
  DAYS.push({
    day: d,
    emoji: t.emoji,
    title: t.title,
    subtitle: t.sub,
    topics: [t.title],
    lesson: `
      <div class="lesson-section">
        <div style="text-align:center;padding:60px 20px">
          <div style="font-size:64px;margin-bottom:20px">${t.emoji}</div>
          <h2 style="font-size:28px;margin-bottom:16px">Day ${d}: ${t.title}</h2>
          <p style="color:var(--text-3);max-width:480px;margin:0 auto 24px;font-size:16px">${t.sub}</p>
          <div class="info-box" style="max-width:480px;margin:0 auto;text-align:left">
            <strong>Coming Soon</strong>
            This lesson will be added in the next update. Days 1–11 are fully complete — practice those first!
          </div>
        </div>
      </div>
    `,
    examples: [],
    exercises: {
      level1: ["Check back soon — this day's exercises are coming!"],
      level2: [],
      level3: [],
    },
    quiz: [],
  });
}
