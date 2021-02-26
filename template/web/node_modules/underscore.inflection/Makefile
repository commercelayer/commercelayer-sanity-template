install: .git/hooks/pre-commit
install: .git/hooks/pre-push

.git/hooks/pre-commit: script/hook.sh
	cp $< $@

.git/hooks/pre-push: script/hook.sh
	cp $< $@

release-patch:
	$(shell npm bin)/mversion patch -m
	git push origin master
	git push origin --tags
	npm publish

release-minor:
	$(shell npm bin)/mversion minor -m
	git push origin master
	git push origin --tags
	npm publish

release-major:
	$(shell npm bin)/mversion major -m
	git push origin master
	git push origin --tags
	npm publish
