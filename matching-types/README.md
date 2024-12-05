Package written in latest Typescript which targets CJS Node 12 (even though it uses Node 20 at author time to use latest build tools).

Uses `@tsconfig/node12` for syntax and `@types/node12` for Node API types.

Run

```sh
./start.sh
```

to build and run the example. Note that this script executes build using Node 20 (`nvm use 20`) but then runs the built code using Node 12 (`nvm use 12`).
