TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = tap
TIMEOUT = 30000
MOCHA_OPTS =
REGISTRY = --registry=http://registry.npm.taobao.org

install:
	@npm install $(REGISTRY)

test: install

.PHONY: test
