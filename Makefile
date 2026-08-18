# dsh-file-explorer-preview-sequence — install & deploy helpers
#
# Common flows
#
#   Local checkout → DSH web profile:
#     make deploy          # npm build + register this checkout into the profile
#     make web             # boot the profile (or just: dsh web)
#
#   Published GitHub package:
#     make deploy-git
#
#   Pull the checkout back out of the profile:
#     make undeploy

DSH      ?= dsh
PROFILE  ?= web
PACKAGE  := @dsh-external/dsh-file-explorer-preview-sequence
GIT_SPEC ?= github:wolfsonliu/dsh-file-explorer-preview-sequence

.PHONY: help install check test build clean distclean deploy deploy-git undeploy web

help: ## Show this help
	@awk 'BEGIN {FS = ":.*## "; print "Targets:"} /^[a-zA-Z_-]+:.*## / {printf "  %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies (npm install)
	npm install

check: ## Type-check src/ only (tsc --noEmit)
	npm run check

test: ## Run the vitest suite
	npm test

build: ## Build lib/ (tsc + tsdown) — keep committed lib/ in lockstep with src/
	npm run build

clean: ## Remove build output only (lib/ + tsbuildinfo artifacts)
	rm -rf lib *.tsbuildinfo

distclean: clean ## Remove build output and all install artifacts (node_modules/.npm-cache)
	rm -rf node_modules .npm-cache

deploy: build ## Build, then register this checkout into the DSH profile (dsh plugin … add .)
	$(DSH) plugin --profile $(PROFILE) add .

deploy-git: ## Install the published GitHub package into the DSH profile
	$(DSH) plugin --profile $(PROFILE) add $(GIT_SPEC)

undeploy: ## Remove this plugin from the DSH profile
	$(DSH) plugin --profile $(PROFILE) remove $(PACKAGE)

web: ## Boot the DSH web profile
	$(DSH) web