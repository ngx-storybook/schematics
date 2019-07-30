import { strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  mergeWith,
  move,
  Rule, Tree,
  url
} from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath, getProject } from '@schematics/angular/utility/project';

export function stories(_options: any): Rule {
  return (host: Tree) => {
      const project = getProject(host, _options.project);
      const parsedPath = parseName(buildDefaultPath(project), _options.name);
      const templateSource = apply(url('./files'), [
        applyTemplates({
          ...strings,
          ..._options,
        }),
        move(parsedPath.path),
      ]);

      return mergeWith(templateSource);
    };
}
