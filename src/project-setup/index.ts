import { Rule, Tree } from "@angular-devkit/schematics";

export function projectSetup(): Rule {
  return (tree: Tree) => {
    const configPath = ".storybook/config.js";
    if (tree.exists(configPath)) {
      let contents = tree.read(configPath)!.toString();
      tree.overwrite(
        configPath,
        contents.replace("'../src/stories'", "'../src'")
      );
    }
    return tree;
  };
}
