import { strings } from '@angular-devkit/core';
import {
    apply,
    applyTemplates,
    chain,
    externalSchematic,
    mergeWith,
    move,
    Rule, Tree,
    url
} from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath, getProject } from '@schematics/angular/utility/project';

export function storyComponent(_options: any): Rule {
    return chain([
        externalSchematic('@schematics/angular', 'module', {name: _options.name}),
        externalSchematic('@schematics/angular', 'component', {name: _options.name, module: _options.name}),
        (host: Tree) => {
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
        }
    ]);
}
