// Copyright 2018 The Nakama Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"text/template"
)

const codeTemplate string = `// tslint:disable
/* Code generated by openapi-gen/main.go. DO NOT EDIT. */

import {encode, decode} from 'js-base64';

export interface ConfigurationParameters {
  basePath?: string;
  username?: string;
  password?: string;
  bearerToken?: string;
  timeoutMs?: number;
}

{{- range $classname, $definition := .Definitions}}
	{{- if isRefToEnum $classname }}

/**
* {{ enumSummary $definition }}
*/
export enum {{ $classname | title }}
{
		{{- range $idx, $enum := $definition.Enum }}
	/* {{ (index (enumDescriptions $definition) $idx) }} */
	{{ $enum }} = {{ $idx }},
		{{- end }}
}
	{{- else }}

/** {{$definition.Description}} */
export interface {{$classname | title}} {
  		{{- range $key, $property := $definition.Properties}}
  			{{- $fieldname := camelToSnake $key }}
  // {{$property.Description}}
  			{{- if eq $property.Type "integer"}}
  {{$fieldname}}?: number;
  			{{- else if eq $property.Type "number" }}
  {{$fieldname}}?: number;
  			{{- else if eq $property.Type "boolean"}}
  {{$fieldname}}?: boolean;
  			{{- else if eq $property.Type "array"}}
    			{{- if eq $property.Items.Type "string"}}
  {{$fieldname}}?: Array<string>;
    			{{- else if eq $property.Items.Type "integer"}}
  {{$fieldname}}?: Array<number>;
    			{{- else if eq $property.Items.Type "boolean"}}
  {{$fieldname}}?: Array<boolean>;
    			{{- else}}
  {{$fieldname}}?: Array<{{$property.Items.Ref | cleanRef}}>;
    			{{- end}}
  			{{- else if eq $property.Type "object"}}
    			{{- if eq $property.AdditionalProperties.Type "string"}}
  {{$fieldname}}?: Map<string, string>;
    			{{- else if eq $property.AdditionalPrgioperties.Type "integer"}}
  {{$fieldname}}?: Map<string, integer>;
    			{{- else if eq $property.AdditionalProperties.Type "boolean"}}
  {{$fieldname}}?: Map<string, boolean>;
    			{{- else}}
  {{$fieldname}}?: Map<{{$property.AdditionalProperties | cleanRef}}>;
    			{{- end}}
  			{{- else if eq $property.Type "string"}}
  {{$fieldname}}?: string;
  			{{- else}}
  {{$fieldname}}?: {{$property.Ref | cleanRef}};
  			{{- end}}
  		{{- end}}
}
	{{- end}}
{{- end }}

export class NakamaApi {

  configuration : ConfigurationParameters;

  constructor(configuration: ConfigurationParameters) {
    this.configuration = configuration;
  }

  /** Perform the underlying Fetch operation and return Promise object **/
  doFetch(urlPath: string, method: string, queryParams: any, body?: any, options?: any): Promise<any> {
    const urlQuery = "?" + Object.keys(queryParams)
      .map(k => {
        if (queryParams[k] instanceof Array) {
          return queryParams[k].reduce((prev: any, curr: any) => {
            return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
          }, "");
        } else {
          if (queryParams[k] != null) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
          }
        }
      })
      .join("");

    const fetchOptions = {...{ method: method /*, keepalive: true */ }, ...options};
    fetchOptions.headers = {...options.headers};

    const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "withCredentials");
    // in Cocos Creator, XMLHttpRequest.withCredentials is not writable, so make the fetch
    // polyfill avoid writing to it.
    if (!descriptor?.set) {
      fetchOptions.credentials = 'cocos-ignore'; // string value is arbitrary, cannot be 'omit' or 'include
    }

    if (this.configuration.bearerToken) {
      fetchOptions.headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
    } else if (this.configuration.username) {
      fetchOptions.headers["Authorization"] = "Basic " + encode(this.configuration.username + ":" + this.configuration.password);
    }
    if(!Object.keys(fetchOptions.headers).includes("Accept")) {
      fetchOptions.headers["Accept"] = "application/json";
    }
    if(!Object.keys(fetchOptions.headers).includes("Content-Type")) {
      fetchOptions.headers["Content-Type"] = "application/json";
    }
    Object.keys(fetchOptions.headers).forEach((key: string) => {
      if(!fetchOptions.headers[key]) {
        delete fetchOptions.headers[key];
      }
    });
    fetchOptions.body = body;

    return Promise.race([
      fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then((response) => {
        if (response.status == 204) {
          return response;
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw response;
        }
      }),
      new Promise((_, reject) =>
        setTimeout(reject, this.configuration.timeoutMs, "Request timed out.")
      ),
    ]);
  }

{{- range $url, $path := .Paths}}
  {{- range $method, $operation := $path}}
  /** {{$operation.Summary}} */

  {{$operation.OperationId | stripOperationPrefix | snakeToCamel }}(
  {{- range $parameter := $operation.Parameters}}
  {{- $snakeToCamel := $parameter.Name | snakeToCamel}}
  {{- if eq $parameter.In "path"}}
  {{- $snakeToCamel}}{{- if not $parameter.Required }}?{{- end}}: {{$parameter.Type}},
  {{- else if eq $parameter.In "body"}}
    {{- if eq $parameter.Schema.Type "string"}}
  {{- $snakeToCamel}}{{- if not $parameter.Required }}?{{- end}}: {{$parameter.Schema.Type}},
    {{- else}}
  {{- $snakeToCamel}}{{- if not $parameter.Required }}?{{- end}}: {{$parameter.Schema.Ref | cleanRef}},
    {{- end}}
  {{- else if eq $parameter.Type "array"}}
  {{- $snakeToCamel}}{{- if not $parameter.Required }}?{{- end}}: Array<{{$parameter.Items.Type}}>,
  {{- else if eq $parameter.Type "object"}}
  {{- $snakeToCamel}}{{- if not $parameter.Required }}?{{- end}}: Map<{{$parameter.AdditionalProperties.Type}}>,
  {{- else if eq $parameter.Type "integer"}}
  {{- $snakeToCamel}}{{- if not $parameter.Required }}?{{- end}}: number,
  {{- else}}
  {{- $snakeToCamel}}{{- if not $parameter.Required }}?{{- end}}: {{$parameter.Type}},
  {{- end}}
  {{- " "}}
  {{- end}}options: any = {}): Promise<{{- if $operation.Responses.Ok.Schema.Ref | cleanRef -}} {{- $operation.Responses.Ok.Schema.Ref | cleanRef -}} {{- else -}} any {{- end}}> {
    {{- range $parameter := $operation.Parameters}}
    {{- $snakeToCamel := $parameter.Name | snakeToCamel}}
    {{- if $parameter.Required }}
    if ({{$snakeToCamel}} === null || {{$snakeToCamel}} === undefined) {
      throw new Error("'{{$snakeToCamel}}' is a required parameter but is null or undefined.");
    }
    {{- end}}
    {{- end}}
    const urlPath = "{{- $url}}"
    {{- range $parameter := $operation.Parameters}}
    {{- $snakeToCamel := $parameter.Name | snakeToCamel}}
    {{- if eq $parameter.In "path"}}
        .replace("{{- print "{" $parameter.Name "}"}}", encodeURIComponent(String({{- $snakeToCamel}})))
    {{- end}}
    {{- end}};

    const queryParams = {
    {{- range $parameter := $operation.Parameters}}
    {{- $camelToSnake := $parameter.Name | camelToSnake}}
    {{- if eq $parameter.In "query"}}
      {{$parameter.Name}}: {{$parameter.Name | snakeToCamel}},
    {{- end}}
    {{- end}}
    } as any;

    let _body = null;
    {{- range $parameter := $operation.Parameters}}
    {{- $snakeToCamel := $parameter.Name | snakeToCamel}}
    {{- if eq $parameter.In "body"}}
    _body = JSON.stringify({{$snakeToCamel}} || {});
    {{- end}}
    {{- end}}

    return this.doFetch(urlPath, "{{- $method | uppercase}}", queryParams, _body, options)
  }

  {{- end}}
{{- end}}
};
`

type Definition struct {
	Properties map[string]struct {
		Type  string
		Ref   string   `json:"$ref"` // used with object
		Items struct { // used with type "array"
			Type string
			Ref  string `json:"$ref"`
		}
		AdditionalProperties struct {
			Type string // used with type "map"
		}
		Format      string // used with type "boolean"
		Description string
	}
	Enum        []string
	Description string
	// used only by enums
	Title string
}

func snakeToCamel(input string) (snakeToCamel string) {
	isToUpper := false
	for k, v := range input {
		if k == 0 {
			snakeToCamel = strings.ToLower(string(input[0]))
		} else {
			if isToUpper {
				snakeToCamel += strings.ToUpper(string(v))
				isToUpper = false
			} else {
				if v == '_' {
					isToUpper = true
				} else {
					snakeToCamel += string(v)
				}
			}
		}
	}
	return
}

func enumSummary(def Definition) string {
	// quirk of swagger generation: if enum doesn't have a title
	// then the title can be found as the first entry in the split description.
	if def.Title != "" {
		return def.Title
	}

	split := strings.Split(def.Description, "\n")

	if len(split) <= 0 {
		panic("No newlines in enum description found.")
	}

	return split[0]
}

func enumDescriptions(def Definition) (output []string) {

	split := strings.Split(def.Description, "\n")

	if len(split) <= 0 {
		panic("No newlines in enum description found.")
	}

	if def.Title != "" {
		return split
	}

	// quirk of swagger generation: if enum doesn't have a title
	// then the title can be found as the first entry in the split description.
	// so ignore for individual enum descriptions.
	return split[2:]
}

func stripOperationPrefix(input string) string {
	return strings.Replace(input, "Nakama_", "", 1)
}

func convertRefToClassName(input string) (className string) {
	cleanRef := strings.TrimPrefix(input, "#/definitions/")
	className = strings.Title(cleanRef)
	return
}

func iscamelToSnake(input string) (output bool) {

	output = true

	for _, v := range input {
		vString := string(v)
		if vString != "_" && strings.ToUpper(vString) == vString {
			output = false
		}
	}

	return
}

// camelToPascal converts a string from camel case to Pascal case.
func camelToPascal(camelCase string) (pascalCase string) {

	if len(camelCase) <= 0 {
		return ""
	}

	pascalCase = strings.ToUpper(string(camelCase[0])) + camelCase[1:]
	return
}

func camelToSnake(input string) (output string) {
	output = ""

	if iscamelToSnake(input) {
		output = input
		return
	}

	for _, v := range input {
		vString := string(v)
		if vString == strings.ToUpper(vString) {
			output += "_" + strings.ToLower(vString)
		} else {
			output += vString
		}
	}

	return
}

// pascalToCamel converts a Pascal case string to a camel case string.
func pascalToCamel(input string) (camelCase string) {
	if input == "" {
		return ""
	}

	camelCase = strings.ToLower(string(input[0]))
	camelCase += string(input[1:])
	return camelCase
}

func main() {
	// Argument flags
	var output = flag.String("output", "", "The output for generated code.")
	flag.Parse()

	inputs := flag.Args()
	if len(inputs) < 1 {
		fmt.Printf("No input file found: %s\n", inputs)
		flag.PrintDefaults()
		return
	}

	var schema struct {
		Paths map[string]map[string]struct {
			Summary     string
			OperationId string
			Responses   struct {
				Ok struct {
					Schema struct {
						Ref string `json:"$ref"`
					}
				} `json:"200"`
			}
			Parameters []struct {
				Name     string
				In       string
				Required bool
				Type     string   // used with primitives
				Items    struct { // used with type "array"
					Type string
				}
				Schema struct { // used with http body
					Type string
					Ref  string `json:"$ref"`
				}
			}
		}
		Definitions map[string]Definition
	}

	fmap := template.FuncMap{
		"enumDescriptions": enumDescriptions,
		"enumSummary":      enumSummary,
		"snakeToCamel":     snakeToCamel,
		"cleanRef":         convertRefToClassName,
		"isRefToEnum": func(ref string) bool {
			// swagger schema definition keys have inconsistent casing
			var camelOk bool
			var pascalOk bool
			var enums []string

			asCamel := pascalToCamel(ref)
			if _, camelOk = schema.Definitions[asCamel]; camelOk {
				enums = schema.Definitions[asCamel].Enum
			}

			asPascal := camelToPascal(ref)
			if _, pascalOk = schema.Definitions[asPascal]; pascalOk {
				enums = schema.Definitions[asPascal].Enum
			}

			if !pascalOk && !camelOk {
				fmt.Printf("no definition found: %v", ref)
				return false
			}

			return len(enums) > 0
		},
		"title":                strings.Title,
		"camelToSnake":         camelToSnake,
		"uppercase":            strings.ToUpper,
		"stripOperationPrefix": stripOperationPrefix,
	}

	input := inputs[0]
	content, err := ioutil.ReadFile(input)
	if err != nil {
		fmt.Printf("Unable to read file: %s\n", err)
		return
	}

	if err := json.Unmarshal(content, &schema); err != nil {
		fmt.Printf("Unable to decode input %s : %s\n", input, err)
		return
	}

	tmpl, err := template.New(input).Funcs(fmap).Parse(codeTemplate)
	if err != nil {
		fmt.Printf("Template parse error: %s\n", err)
		return
	}

	if len(*output) < 1 {
		tmpl.Execute(os.Stdout, schema)
		return
	}

	f, err := os.Create(*output)
	if err != nil {
		fmt.Printf("Unable to create file %s", err)
		return
	}
	defer f.Close()

	writer := bufio.NewWriter(f)
	tmpl.Execute(writer, schema)
	writer.Flush()
}
