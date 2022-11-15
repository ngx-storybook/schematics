import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  Tree,
  url,
} from "@angular-devkit/schematics";
import { Style } from "@schematics/angular/component/schema";
import { parseName } from "@schematics/angular/utility/parse-name";
import {
  buildDefaultPath,
  getProject,
} from "@schematics/angular/utility/project";

const configKey = "@schematics/angular:component";

export function component(_options: any): Rule {
  return chain([
    (host: Tree) => {
      const project = getProject(host, _options.project);
      const style =
        project.schematics &&
        project.schematics[configKey] &&
        project.schematics[configKey].style;
      _options.style = style || Style.Css;
    },
    externalSchematic("@schematics/angular", "module", { name: _options.name }),
    externalSchematic("@schematics/angular", "component", {
      name: _options.name,
      module: _options.name,
      get style() {
        return _options.style;
      },
    }),
    (host: Tree) => {
      const project = getProject(host, _options.project);

      if (_options.path === undefined) {
        _options.path = buildDefaultPath(project);
      }
      const parsedPath = parseName(_options.path, _options.name);

      /* Gets the name of a path. Example: path/to/somewhere/component sets _option.name to component
         As a result the story is not saved in src/app/path/to/somewhere/path/to/somewhere/component/path/to/somewhere/component.stories.ts
         but in src/app/path/to/somewhere/component/component.stories.ts
     */
      _options.name = _options.name.split("/").slice(-1).join();

      const templateSource = apply(url("./files"), [
        applyTemplates({
          ...strings,
          ..._options,
        }),
        move(parsedPath.path),
      ]);

      return mergeWith(templateSource);
    },
  ]);
}
