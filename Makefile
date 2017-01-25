.PHONY: lint extension

lint:
	-jshint -c .jshintrc --exclude-path .jshintignore .

deploy: lint
	./deploy/deploy.sh
