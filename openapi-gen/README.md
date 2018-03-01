openapi-gen
===========

> A util command to generate Nakama server's API client from the Swagger specification.

## Usage

```shell
go run main.go $GOPATH/src/github.com/heroiclabs/nakama/api/api.swagger.json > ../src/api.gen.ts
```

### Rationale

The TypeScript generator available with swagger-codegen depends on Node's `"url"` package. The usage in the generated code does not warrant the need for it's inclusion. We wanted to generate lean and simple code output with minimal dependencies so we built our own. This gives us complete control over the dependencies required by the Nakama JS client.

The only dependencies with the generated code is implicit usage of `"fetch"` which can be resolved with a polyfill and `"Base64"`.

### Limitations

The code generator has __only__ been checked against the Swagger specification generated for Nakama server. YMMV.
