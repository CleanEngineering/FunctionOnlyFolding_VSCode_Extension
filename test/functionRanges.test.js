const test = require("node:test");
const assert = require("node:assert/strict");
const { getFunctionStartLines } = require("../src/functionRanges");

test("fold targets are functions and methods, not classes or control-flow blocks", () => {
    const source = [
        "class Sample {",
        "  method() {",
        "    if (true) {",
        "      while (false) {",
        "        run();",
        "      }",
        "    }",
        "  }",
        "}",
        "",
        "function standalone() {",
        "  try {",
        "    run();",
        "  } catch {",
        "    recover();",
        "  }",
        "}"
    ].join("\n");

    assert.deepEqual(
        getFunctionStartLines(source, "sample.ts", "typescript"),
        [1, 10]
    );
});

test("supports arrow functions, async functions, function expressions and class members", () => {
    const source = [
        "const arrow = async () => {",
        "  await run();",
        "};",
        "const expression = function () {",
        "  run();",
        "};",
        "class Sample {",
        "  constructor() {",
        "    run();",
        "  }",
        "  get value() {",
        "    return 1;",
        "  }",
        "  set value(input: number) {",
        "    run(input);",
        "  }",
        "}"
    ].join("\n");

    assert.deepEqual(
        getFunctionStartLines(source, "sample.ts", "typescript"),
        [0, 3, 7, 10, 13]
    );
});

test("does not target signatures or single-line bodies", () => {
    const source = [
        "interface Contract {",
        "  execute(): void;",
        "}",
        "const inline = () => { return 1; };",
        "declare function ambient(): void;"
    ].join("\n");

    assert.deepEqual(
        getFunctionStartLines(source, "sample.ts", "typescript"),
        []
    );
});

test("supports TSX function components", () => {
    const source = [
        "const View = () => {",
        "  return <div />;",
        "};"
    ].join("\n");

    assert.deepEqual(
        getFunctionStartLines(source, "view.tsx", "typescriptreact"),
        [0]
    );
});

test("finds nested functions independently", () => {
    const source = [
        "function outer() {",
        "  const inner = () => {",
        "    run();",
        "  };",
        "  run();",
        "}"
    ].join("\n");

    assert.deepEqual(
        getFunctionStartLines(source, "nested.ts", "typescript"),
        [0, 1]
    );
});
