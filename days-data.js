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

# Complex numbers
print(1 + 1j)
print(type(1 + 1j))   # <class 'complex'>`,
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
print(type(1 + 1j))
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
        "Write a script that prints a formatted table of squares and cubes: for i from 1 to 5, print i, i², i³.",
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
      <h2>Getting User Input</h2>
      <p>The <code>input()</code> function pauses your program and waits for the user to type something. It <strong>always returns a string</strong>, so convert it if you need a number:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">name = input("What is your name? ")
age  = int(input("How old are you? "))   # convert string to int
print(f"Hello {name}, you are {age} years old.")</pre>
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
    ],

    exercises: {
      level1: [
        'Create a <code>variables.py</code> file. Add the comment: <em>"Day 2: 30 Days of Python programming"</em>.',
        "Declare variables: <code>first_name</code>, <code>last_name</code>, <code>country</code>, <code>city</code>, <code>age</code>. Print each one.",
        "Declare: <code>is_married = True</code>, <code>is_true = True</code>, <code>is_light_on = False</code>. Print each.",
        "Declare all 10 variables from exercises 2 and 3 in a <strong>single line</strong> using multiple assignment.",
        "Print the length of your first name using <code>len()</code>.",
        "Compare: does your first name have more characters than your last name? Print the result.",
      ],
      level2: [
        "Use <code>type()</code> on every variable you declared (first_name, age, is_married, etc.). Print each type.",
        "Declare <code>num_one = 5</code> and <code>num_two = 4</code>. Perform all 7 arithmetic operations and store results in variables. Print each with a label.",
        "Calculate the <strong>area</strong> and <strong>circumference</strong> of a circle with radius 30 meters. (Area = π×r², Circumference = 2×π×r, use pi = 3.14). Print both results.",
        "Ask the user for their first name, last name, country, and age using <code>input()</code>. Print a formatted sentence with all 4 values.",
        'Run <code>help("keywords")</code> in Python shell. Write down 5 reserved words you cannot use as variable names.',
      ],
      level3: [
        "Write a program that asks for a radius and prints both the area and circumference of the circle, formatted to 2 decimal places.",
        "Write a program that takes two numbers from the user and prints: their sum, difference, product, division, floor division, modulus, and power.",
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
      "Master arithmetic, comparison, logical, assignment, and identity operators — the tools Python uses to do calculations and make decisions.",
    topics: [
      "Arithmetic",
      "Comparison",
      "Logical",
      "Assignment",
      "Boolean",
      "Identity",
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
      <h2>Identity &amp; Membership Operators</h2>
      <table>
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>is</code></td><td>Same object in memory</td><td><code>1 is 1</code> → True</td></tr>
          <tr><td><code>is not</code></td><td>Different objects</td><td><code>1 is not 2</code> → True</td></tr>
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

# Identity and membership
print(1 is 1)                    # True
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
        "Declare a complex number variable and print it with <code>type()</code>.",
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
        'Write a script that checks whether a given number is even. Use modulus. Print "Even" or "Odd".',
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
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">find()</div><div class="cheatsheet-desc">Find first occurrence (returns index)</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">count()</div><div class="cheatsheet-desc">Count occurrences of substring</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">startswith()</div><div class="cheatsheet-desc">Check if starts with text</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">endswith()</div><div class="cheatsheet-desc">Check if ends with text</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">isalpha()</div><div class="cheatsheet-desc">All letters? True/False</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">isdigit()</div><div class="cheatsheet-desc">All digits? True/False</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">isidentifier()</div><div class="cheatsheet-desc">Valid variable name? True/False</div></div>
        <div class="cheatsheet-item"><div class="cheatsheet-syntax">swapcase()</div><div class="cheatsheet-desc">Swap UPPER↔lower case</div></div>
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
print(challenge.swapcase())      # THIRTY DAYS OF PYTHON

# Search methods
print(challenge.find('y'))       # 5  (first occurrence)
print(challenge.rfind('y'))      # 16 (last occurrence)
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
print('123'.isdigit())            # True
print('thirty_days'.isidentifier()) # True
print('30DaysOfPython'.isidentifier()) # False (starts with number)`,
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
        'Apply <code>capitalize()</code>, <code>title()</code>, and <code>swapcase()</code> to "Coding For All". Print all 3.',
        'Slice out the first word ("Coding") from "Coding For All".',
        'Check if "Coding For All" contains the word "Coding" using <code>find()</code> or <code>in</code>.',
        'Replace "Coding" with "Python" in "Coding For All". Print the result.',
        'Split "Facebook, Google, Microsoft, Apple, IBM" at commas into a list.',
      ],
      level2: [
        'Find the position of the first "because" in: "You cannot end a sentence with because because because is a conjunction". Then find the last one using <code>rfind()</code>.',
        'Slice the phrase "because because because" out of that sentence.',
        "Join the list <code>['Django', 'Flask', 'Bottle', 'Pyramid', 'Falcon']</code> with '# ' separator.",
        "Use newline escape to print two sentences on separate lines.",
        "Use a tab escape to format a Name / Age / Country table for a person.",
        'Format: "The area of a circle with radius 10 is 314 meters square." Use an f-string, calculate the real result.',
      ],
      level3: [
        'Check if "30DaysOfPython" is a valid identifier. Then check "thirty_days_of_python". What is the difference?',
        'Use <code>isnumeric()</code>, <code>isdigit()</code>, and <code>isdecimal()</code> on the string "½". What do you find?',
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
      "Unpacking",
      "Sorting",
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
      <h2>Unpacking Lists</h2>
      <p>You can assign list items directly to variables. Use <code>*</code> to capture the rest:</p>
      <pre style="background:var(--bg-code);padding:16px 20px;border-radius:10px;margin:12px 0;font-family:'Fira Code',monospace;font-size:14px;color:#a5b4fc;overflow-x:auto">first, second, *rest = ['apple', 'banana', 'cherry', 'date', 'elderberry']
print(first)   # apple
print(second)  # banana
print(rest)    # ['cherry', 'date', 'elderberry']</pre>

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

# Unpacking list items into variables
first, second, *rest = ['item1', 'item2', 'item3', 'item4', 'item5']
print(first)   # item1
print(second)  # item2
print(rest)    # ['item3', 'item4', 'item5']

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
        "Unpack <code>['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']</code> — first three into separate variables, the rest into <code>scandic</code>.",
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
        q: "What does first, *rest = [1, 2, 3, 4, 5] assign to rest?",
        opts: ["[2]", "[2, 3, 4, 5]", "(2, 3, 4, 5)", "2, 3, 4, 5"],
        answer: 1,
        explain:
          "The * operator in unpacking collects all remaining items into a list. first=1, rest=[2, 3, 4, 5].",
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
        title: "Iterating Over a Dictionary",
        desc: "Loop through keys, values, or both using .items().",
        code: `student = {
    'name': 'Bob',
    'grade': 'A',
    'score': 95
}

# Loop over keys
for key in student:
    print(key)

# Loop over key-value pairs
for key, value in student.items():
    print(f"{key}: {value}")`,
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
        "Build a nested dictionary for a school: it should contain at least 3 students, each with a name, grade, and list of subjects.",
        "Write a program that counts how many times each character appears in the string <code>'hello world'</code> using a dictionary.",
        "Given a list of words, build a dictionary that maps each word to its length: <code>{'apple': 5, 'cat': 3, ...}</code>.",
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

]; // end of DAYS array

// Fill remaining days 12-30 with placeholder so navigation doesn't break
for (let d = 12; d <= 30; d++) {
  const topics = {
    12: {
      emoji: "📦",
      title: "Modules",
      sub: "import, from...import, standard library, custom modules.",
    },
    13: {
      emoji: "🗜️",
      title: "List Comprehension",
      sub: "Write concise, powerful list, dict, and set comprehensions.",
    },
    14: {
      emoji: "🏗️",
      title: "Higher Order Functions",
      sub: "map(), filter(), reduce(), lambda — functional programming.",
    },
    15: {
      emoji: "🐛",
      title: "Python Type Errors",
      sub: "Understand, read, and fix Python error messages.",
    },
    16: {
      emoji: "📅",
      title: "Python DateTime",
      sub: "Work with dates, times, timedelta, and strftime.",
    },
    17: {
      emoji: "🛡️",
      title: "Exception Handling",
      sub: "try, except, finally, raise — handle errors gracefully.",
    },
    18: {
      emoji: "🔍",
      title: "Regular Expressions",
      sub: "Pattern matching with the re module.",
    },
    19: {
      emoji: "📂",
      title: "File Handling",
      sub: "Read, write, and manage files. Work with CSV and JSON.",
    },
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
