export default {
    "openapi": "3.0.0",
    "info": {
      "title": "RATP Toilets API",
      "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
      "version": "0.1.9"
    },
    "servers": [
      {
        "url": "http://api.example.com/v1",
        "description": "Optional server description, e.g. Main (production) server"
      },
      {
        "url": "http://staging-api.example.com",
        "description": "Optional server description, e.g. Internal staging server for testing"
      }
    ],
    "paths": {
      "/toilets": {
        "get": {
          "summary": "Returns a list of toilets.",
          "description": "Optional extended description in CommonMark or HTML.",
          "responses": {
            "200": {
              "description": "A JSON array of toilets",
              "content": {
                "application/json": {
                  "schema": {
                    "type": {
                      "publicAccess": "boolean",
                      "free": "boolean",
                      "metroLine": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }