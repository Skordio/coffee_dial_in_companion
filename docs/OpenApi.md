## Generating apis and types for a language from a yaml

The openapi generator cli can help generate a configuration for a static set of types from a yaml or json file.

To utilize it, make sure you run

```
pnpm install
```

at the root of the workspace first, so it will be installed.

You will also need Java 8 or higher

Then, run the following command or a similar command:

```bash
pnpm openapi-generator-cli generate -g typescript-axios -o .\frontend\src\openapi -i .\backend\schema.yml --skip-validate-spec
```

-g arg is for the language to generate in
-o arg is specifying the output folder
-i arg is specifying the incoming configuration
--skip-validate-spec was necessary in order to make the command run at first, however I don't think it should be necessary for generating valid schemas.

To find more info on the args this command takes or the generator in general, you can look at the [OpenAPI Generator Documentation](https://openapi-generator.tech/docs/usage#generate)

## DRF-Spectactular

Use DRF-Spectactular to generate schema

```bash
./manage.py spectacular --color --file schema.yml
```
