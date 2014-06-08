TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = tap
TIMEOUT = 30000
MOCHA_OPTS =
REGISTRY = --registry=http://registry.npm.taobao.org

install:
	@npm install $(REGISTRY)

test: install
	@NODE_ENV=test node_modules/mocha/bin/mocha \
		--bail --reporter $(REPORTER) --timeout $(TIMEOUT) $(MOCHA_OPTS) $(TESTS)

.PHONY: test
