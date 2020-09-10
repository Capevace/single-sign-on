<div align="center">
	<!-- <a href="https://mateffy.me/mission-control-project">
		<img src="resources/icon-web.png">
	</a> -->
	<h1>Single Sign On</h1>
	<p>
		Simple auth server used by <a href="https://github.com/capevace/mission-control">Mission Control</a>
	</p>
</div>

<br>

## Installation
```sh
$ npm install -g @capevace/single-sign-on
```

## Usage
You can now start the server like you would any binary.
```sh
$ single-sign-on --version
v0.2.0
```

### Options
```
Usage: single-sign-on [options] [command]

Options:
  -V, --version        output the version number
  -u, --url <url>      the url SSO is reachable at
  -p, --port <port>    the port to use for the http server
  -h, --help           display help for command

Commands:
  password [password]  hash a password to put it in config
  help [command]       display help for command
```

### Config
A config file for mission-control will be created at `$HOME_DIR/.mission-control-sso/config`. This can also be used to configure mission-control. However, options passed as command line arguments override settings in this file.

## Changelog
### Version 0.2.0
- Added support for server to be proxied. Mission Control now does this by default.

## Authors

Lukas Mateffy – [@Capevace](https://twitter.com/capevace) – [mateffy.me](https://mateffy.me)

Distributed under the MIT license. See `LICENSE` for more information.

## Contributing

1. Fork it (<https://github.com/capevace/mission-control/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
