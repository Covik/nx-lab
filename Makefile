.PHONY: *

build:
	docker buildx build . -t nx-lab:local

exec:
	docker run -it --rm --network host --user=$$UID:$$GID -v $$PWD:/src nx-lab:local bash
