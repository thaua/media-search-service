<p align="center">
<a href="https://codeclimate.com/github/thaua/media-search-service/maintainability"><img src="https://api.codeclimate.com/v1/badges/35ad034f85cf0f28c319/maintainability" /></a>
<a href="https://codeclimate.com/github/thaua/media-search-service/test_coverage"><img src="https://api.codeclimate.com/v1/badges/35ad034f85cf0f28c319/test_coverage" /></a>
</p>

## Description

This application is responsible for searching into media providers (such as YouTube, Spotify, etc) based on query
string.

This is a small part of a bigger private personal project.

## Requirements

- [Docker](https://www.docker.com/get-started)

## Development

We are using Docker with the [scripts-to-rule-them-all](https://github.com/github/scripts-to-rule-them-all) idea, so we
have a set of scripts inside `script` folder that should cover all development needs:

```bash
$ script/setup    # builds application
$ script/server   # runs application
$ script/update   # keeps application up to date
$ script/test     # run tests of the application
$ script/lint     # runs lint tool on application
$ script/quality  # runs quality tool on application (CodeClimate)
$ script/bash     # access bash into container
```

## Architecture

#### Application Flow

```mermaid
flowchart TD
    USER[User]
    ENDPOINT["Search Endpoint"]
    FACTORY{Media Provider Factory}
    YT_PROVIDER[Youtube Provider]
    SF_PROVIDER[Spotify Provider]

    subgraph External
        YT_API(Youtube Data API)
        SF_API(Spotify Web API)
    end

    USER -->|"[REST] provider + term"| ENDPOINT
    ENDPOINT --> FACTORY
    FACTORY -->|When provider is YouTube| YT_PROVIDER
    FACTORY -->|When provider is Spotify| SF_PROVIDER
    YT_PROVIDER -->|"[REST] term + api-key"| YT_API
    SF_PROVIDER -->|"[REST] term + api-key"| SF_API
```

#### Application Layers (Path Organization)

- **core:** Domains and business logics decoupled from tools/frameworks.
- **infrastructure:** Infrastructure setup such as data providers, external connections and overall configuration.
- **presentation:** Entrypoint with routing, controllers and REST API framework.

#### Motivation

The reason to use this architecture is to get the base idea of Clean Architecture separating **core** and **infrastructure** layers in order to keep separation of concerns and maintainability frequency separated (**CCP - Common Closure Principle**). Since it is a very small service with a few routes, the idea is to keep the presentation layer as the simple one being very close to the use case calling (layer with business logic).

## Request Examples

###### Request
`{{mediaSearchUrl}}/provider/youtube/search?term=iron%20maiden`

###### Response
```
[
    {
        "code": "X4bgXH3sJ2Q",
        "title": "Iron Maiden - The Trooper (Official Video)",
        "thumbnail": "https://i.ytimg.com/vi/X4bgXH3sJ2Q/default.jpg",
        "time": 0
    },
    {
        "code": "BrrO2q9VwRM",
        "title": "Best Of Iron Maiden - Greatest Hits full Album - Vol. 04",
        "thumbnail": "https://i.ytimg.com/vi/BrrO2q9VwRM/default.jpg",
        "time": 0
    },
    ...
]
```

###### Request
`{{mediaSearchUrl}}/provider/spotify/search?term=hammerfall`

###### Response
```
[
    {
        "code": "0eV3PB3T0OxW4feG1DlOjQ",
        "title": "HammerFall - Hearts on Fire",
        "thumbnail": "https://i.scdn.co/image/ab67616d00004851bceefa541bb181ec0b8d32e4",
        "time": 0
    },
    {
        "code": "18cs5UrDMRFyU74Mfdagwf",
        "title": "HammerFall - The Way of the Warrior",
        "thumbnail": "https://i.scdn.co/image/ab67616d00004851f9354765b1904289474c7860",
        "time": 0
    },
    ...
]
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Stay in touch

For questions or inquiries, please contact **Thauã Silveira** at [thaua@outlook.com](mailto:thaua@outlook.com).
