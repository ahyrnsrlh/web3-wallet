#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
};

console.log(`${colors.blue}=== Web3 Wallet Setup ====${colors.reset}\n`);

// Step 1: Install dependencies
try {
  console.log(`${colors.yellow}Installing dependencies...${colors.reset}`);
  execSync("npm install", { stdio: "inherit" });
  console.log(
    `${colors.green}✓ Dependencies installed successfully${colors.reset}\n`
  );
} catch (error) {
  console.log(
    `${colors.yellow}Attempting installation with --force flag...${colors.reset}`
  );
  try {
    execSync("npm install --force", { stdio: "inherit" });
    console.log(
      `${colors.green}✓ Dependencies installed successfully with --force${colors.reset}\n`
    );
  } catch (forceError) {
    console.error(
      `${colors.red}× Failed to install dependencies: ${forceError.message}${colors.reset}\n`
    );
    process.exit(1);
  }
}

// Step 2: Set up environment variables
try {
  console.log(
    `${colors.yellow}Setting up environment variables...${colors.reset}`
  );
  if (fs.existsSync("env.example") && !fs.existsSync(".env.local")) {
    fs.copyFileSync("env.example", ".env.local");
    console.log(`${colors.green}✓ Created .env.local file${colors.reset}`);
    console.log(
      `${colors.yellow}NOTE: Remember to update your API keys in .env.local${colors.reset}\n`
    );
  } else if (fs.existsSync(".env.local")) {
    console.log(
      `${colors.green}✓ .env.local file already exists${colors.reset}\n`
    );
  } else {
    console.log(`${colors.red}× env.example file not found${colors.reset}\n`);
  }
} catch (error) {
  console.error(
    `${colors.red}× Error setting up environment variables: ${error.message}${colors.reset}\n`
  );
}

// Step 3: Check for Spline script in layout.tsx
try {
  console.log(`${colors.yellow}Checking Spline integration...${colors.reset}`);
  const layoutPath = path.join("app", "layout.tsx");

  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, "utf8");
    if (layoutContent.includes("@splinetool/viewer")) {
      console.log(
        `${colors.green}✓ Spline script found in layout.tsx${colors.reset}\n`
      );
    } else {
      console.log(
        `${colors.yellow}! Spline script not found in layout.tsx${colors.reset}`
      );
      console.log(`  Add the following to your layout.tsx head section:`);
      console.log(`  <Script
    type="module"
    src="https://unpkg.com/@splinetool/viewer@1.9.93/build/spline-viewer.js"
    strategy="beforeInteractive"
  />\n`);
    }
  } else {
    console.log(`${colors.red}× layout.tsx not found${colors.reset}\n`);
  }
} catch (error) {
  console.error(
    `${colors.red}× Error checking Spline integration: ${error.message}${colors.reset}\n`
  );
}

// Step 4: Start the development server
try {
  console.log(`${colors.blue}Setup completed successfully!${colors.reset}`);
  console.log(
    `${colors.yellow}Would you like to start the development server? (y/n)${colors.reset}`
  );

  // This is a simple way to ask for input, but it's synchronous and blocks execution
  // In a real setup script, you'd use readline or inquirer for better interaction
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("", (answer) => {
    if (answer.toLowerCase() === "y") {
      console.log(
        `${colors.yellow}Starting development server...${colors.reset}`
      );
      readline.close();
      execSync("npm run dev", { stdio: "inherit" });
    } else {
      console.log(
        `${colors.blue}To start the server later, run: npm run dev${colors.reset}`
      );
      readline.close();
    }
  });
} catch (error) {
  console.error(`${colors.red}× Error: ${error.message}${colors.reset}`);
}
