window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-file-explorer-preview-sequence",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		var process = {
			env: { NODE_ENV: "production" },
			versions: {},
			argv: [],
			browser: true,
			nextTick: function(fn) {
				return setTimeout(fn, 0);
			}
		};
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __esmMin = (fn, res, err) => () => {
			if (err) throw err[0];
			try {
				return fn && (res = fn(fn = 0)), res;
			} catch (e) {
				throw err = [e], e;
			}
		};
		var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
		var __exportAll = (all, no_symbols) => {
			let target = {};
			for (var name in all) __defProp(target, name, {
				get: all[name],
				enumerable: true
			});
			if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
			return target;
		};
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/protocol.ts
		/**
		* Sequence file extensions (lowercase, no leading dot) whose preview this
		* plugin overrides at priority 10, mapped to the format label shown in the
		* status bar. `.xml` (SBOL) and `.seq` (JBEI) are ambiguous with generic XML /
		* Ape `.seq`, so their component falls back to plain-text when parsing fails.
		*/
		const SEQUENCE_FORMATS = {
			fasta: "FASTA",
			fa: "FASTA",
			fas: "FASTA",
			fna: "FASTA",
			faa: "FASTA",
			ffn: "FASTA",
			gb: "GenBank",
			gbk: "GenBank",
			genbank: "GenBank",
			gp: "GenBank",
			dna: "SnapGene",
			seq: "JBEI SEQ",
			sbol: "SBOL",
			xml: "SBOL"
		};
		/** Every extension this plugin registers, in the canonical map order. */
		const SEQUENCE_EXTS = Object.keys(SEQUENCE_FORMATS);
		//#endregion
		//#region node_modules/es-toolkit/dist/function/debounce.mjs
		/**
		* Creates a debounced function that delays invoking the provided function until after `debounceMs` milliseconds
		* have elapsed since the last time the debounced function was invoked. The debounced function also has a `cancel`
		* method to cancel any pending execution.
		*
		* @template F - The type of function.
		* @param func - The function to debounce.
		* @param debounceMs - The number of milliseconds to delay.
		* @param options - The options object
		* @param options.signal - An optional AbortSignal to cancel the debounced function.
		* @param options.edges - An optional array specifying whether the function should be invoked on the leading edge, trailing edge, or both.
		* @returns A new debounced function with a `cancel` method.
		*
		* @example
		* const debouncedFunction = debounce(() => {
		*   console.log('Function executed');
		* }, 1000);
		*
		* // Will log 'Function executed' after 1 second if not called again in that time
		* debouncedFunction();
		*
		* // Will not log anything as the previous call is canceled
		* debouncedFunction.cancel();
		*
		* // With AbortSignal
		* const controller = new AbortController();
		* const signal = controller.signal;
		* const debouncedWithSignal = debounce(() => {
		*  console.log('Function executed');
		* }, 1000, { signal });
		*
		* debouncedWithSignal();
		*
		* // Will cancel the debounced function call
		* controller.abort();
		*/
		function debounce$1(func, debounceMs, { signal, edges } = {}) {
			let pendingThis = void 0;
			let pendingArgs = null;
			const leading = edges != null && edges.includes("leading");
			const trailing = edges == null || edges.includes("trailing");
			const invoke = () => {
				if (pendingArgs !== null) {
					func.apply(pendingThis, pendingArgs);
					pendingThis = void 0;
					pendingArgs = null;
				}
			};
			const onTimerEnd = () => {
				if (trailing) invoke();
				cancel();
			};
			let timeoutId = null;
			const schedule = () => {
				if (timeoutId != null) clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					timeoutId = null;
					onTimerEnd();
				}, debounceMs);
			};
			const cancelTimer = () => {
				if (timeoutId !== null) {
					clearTimeout(timeoutId);
					timeoutId = null;
				}
			};
			const cancel = () => {
				cancelTimer();
				pendingThis = void 0;
				pendingArgs = null;
			};
			const flush = () => {
				invoke();
			};
			const debounced = function(...args) {
				if (signal?.aborted) return;
				pendingThis = this;
				pendingArgs = args;
				const isFirstCall = timeoutId == null;
				schedule();
				if (leading && isFirstCall) invoke();
			};
			debounced.schedule = schedule;
			debounced.cancel = cancel;
			debounced.flush = flush;
			signal?.addEventListener("abort", cancel, { once: true });
			return debounced;
		}
		var init_debounce$1 = __esmMin((() => {}));
		//#endregion
		//#region node_modules/es-toolkit/dist/compat/function/debounce.mjs
		function debounce(func, debounceMs = 0, options = {}) {
			if (typeof options !== "object") options = {};
			const { leading = false, trailing = true, maxWait } = options;
			const edges = Array(2);
			if (leading) edges[0] = "leading";
			if (trailing) edges[1] = "trailing";
			let result = void 0;
			let pendingAt = null;
			const _debounced = debounce$1(function(...args) {
				result = func.apply(this, args);
				pendingAt = null;
			}, debounceMs, { edges });
			const debounced = function(...args) {
				if (maxWait != null) {
					if (pendingAt === null) pendingAt = Date.now();
					if (Date.now() - pendingAt >= maxWait) {
						result = func.apply(this, args);
						pendingAt = Date.now();
						_debounced.cancel();
						_debounced.schedule();
						return result;
					}
				}
				_debounced.apply(this, args);
				return result;
			};
			const flush = () => {
				_debounced.flush();
				return result;
			};
			debounced.cancel = _debounced.cancel;
			debounced.flush = flush;
			return debounced;
		}
		var init_debounce = __esmMin((() => {
			init_debounce$1();
		}));
		//#endregion
		//#region node_modules/es-toolkit/dist/compat/function/throttle.mjs
		/**
		* Creates a throttled function that only invokes the provided function at most once
		* per every `throttleMs` milliseconds. Subsequent calls to the throttled function
		* within the wait time will not trigger the execution of the original function.
		*
		* @template F - The type of function.
		* @param func - The function to throttle.
		* @param throttleMs - The number of milliseconds to throttle executions to.
		* @param options - The options object
		* @param options.signal - An optional AbortSignal to cancel the throttled function.
		* @param options.leading - If `true`, the function will be invoked on the leading edge of the timeout.
		* @param options.trailing - If `true`, the function will be invoked on the trailing edge of the timeout.
		* @returns A new throttled function that accepts the same parameters as the original function.
		*
		* @example
		* const throttledFunction = throttle(() => {
		*   console.log('Function executed');
		* }, 1000);
		*
		* // Will log 'Function executed' immediately
		* throttledFunction();
		*
		* // Will not log anything as it is within the throttle time
		* throttledFunction();
		*
		* // After 1 second
		* setTimeout(() => {
		*   throttledFunction(); // Will log 'Function executed'
		* }, 1000);
		*/
		function throttle(func, throttleMs = 0, options = {}) {
			const { leading = true, trailing = true } = options;
			return debounce(func, throttleMs, {
				leading,
				maxWait: throttleMs,
				trailing
			});
		}
		var init_throttle = __esmMin((() => {
			init_debounce();
		}));
		//#endregion
		//#region node_modules/es-toolkit/dist/compat/index.mjs
		var init_compat = __esmMin((() => {
			init_debounce();
			init_throttle();
		}));
		//#endregion
		//#region node_modules/@lattice-automation/react-resize-detector/build/utils.js
		var patchResizeCallback, useCallbackRef, useRefProxy, getDimensions;
		var init_utils = __esmMin((() => {
			init_compat();
			patchResizeCallback = (resizeCallback, refreshMode, refreshRate, refreshOptions) => {
				switch (refreshMode) {
					case "debounce": return debounce(resizeCallback, refreshRate, refreshOptions);
					case "throttle": return throttle(resizeCallback, refreshRate, refreshOptions);
					default: return resizeCallback;
				}
			};
			useCallbackRef = (callback) => {
				const callbackRef = react.useRef(callback);
				react.useEffect(() => {
					callbackRef.current = callback;
				});
				return react.useMemo(() => ((...args) => {
					var _a;
					return (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef, ...args);
				}), []);
			};
			useRefProxy = (targetRef) => {
				const [refElement, setRefElement] = react.useState((targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) || null);
				if (targetRef) setTimeout(() => {
					if (targetRef.current !== refElement) setRefElement(targetRef.current);
				}, 0);
				return {
					refProxy: react.useMemo(() => new Proxy((node) => {
						if (node !== refElement) setRefElement(node);
					}, {
						get(target, prop) {
							if (prop === "current") return refElement;
							return target[prop];
						},
						set(target, prop, value) {
							if (prop === "current") setRefElement(value);
							else target[prop] = value;
							return true;
						}
					}), [refElement]),
					refElement,
					setRefElement
				};
			};
			getDimensions = (entry, box) => {
				var _a, _b;
				const borderBox = (_a = entry.borderBoxSize) === null || _a === void 0 ? void 0 : _a[0];
				const contentBox = (_b = entry.contentBoxSize) === null || _b === void 0 ? void 0 : _b[0];
				if (box === "border-box" && borderBox) return {
					width: borderBox.inlineSize,
					height: borderBox.blockSize
				};
				if (box === "content-box" && contentBox) return {
					width: contentBox.inlineSize,
					height: contentBox.blockSize
				};
				return {
					width: entry.contentRect.width,
					height: entry.contentRect.height
				};
			};
		}));
		//#endregion
		//#region node_modules/@lattice-automation/react-resize-detector/build/useResizeDetector.js
		function useResizeDetector({ skipOnMount = false, refreshMode, refreshRate = 1e3, refreshOptions, handleWidth = true, handleHeight = true, targetRef, observerOptions, onResize, disableRerender = false } = {}) {
			const skipResize = (0, react.useRef)(skipOnMount);
			const onResizeRef = useCallbackRef(onResize);
			const [size, setSize] = (0, react.useState)({
				width: void 0,
				height: void 0
			});
			const sizeRef = (0, react.useRef)({
				width: void 0,
				height: void 0
			});
			const { refProxy, refElement } = useRefProxy(targetRef);
			const { box } = observerOptions || {};
			const resizeCallback = (0, react.useCallback)((entries) => {
				if (!handleWidth && !handleHeight) return;
				if (skipResize.current) {
					skipResize.current = false;
					return;
				}
				const shouldSetSize = (prevSize, nextSize) => handleWidth && prevSize.width !== nextSize.width || handleHeight && prevSize.height !== nextSize.height;
				entries.forEach((entry) => {
					const dimensions = getDimensions(entry, box);
					if (disableRerender) {
						if (shouldSetSize(sizeRef.current, dimensions)) {
							sizeRef.current.width = dimensions.width;
							sizeRef.current.height = dimensions.height;
							onResizeRef === null || onResizeRef === void 0 || onResizeRef({
								width: dimensions.width,
								height: dimensions.height,
								entry
							});
						}
					} else setSize((prevSize) => {
						if (!shouldSetSize(prevSize, dimensions)) return prevSize;
						onResizeRef === null || onResizeRef === void 0 || onResizeRef({
							width: dimensions.width,
							height: dimensions.height,
							entry
						});
						return dimensions;
					});
				});
			}, [
				handleWidth,
				handleHeight,
				skipResize,
				box,
				disableRerender
			]);
			const resizeHandler = (0, react.useCallback)(patchResizeCallback(resizeCallback, refreshMode, refreshRate, refreshOptions), [
				resizeCallback,
				refreshMode,
				refreshRate,
				refreshOptions
			]);
			(0, react.useEffect)(() => {
				let resizeObserver;
				if (refElement) try {
					resizeObserver = new window.ResizeObserver(resizeHandler);
					resizeObserver.observe(refElement, observerOptions);
				} catch (error) {
					console.warn("ResizeObserver not supported or failed to initialize:", error);
				}
				else if (size.width || size.height) {
					onResizeRef === null || onResizeRef === void 0 || onResizeRef({
						width: null,
						height: null,
						entry: null
					});
					sizeRef.current.width = void 0;
					sizeRef.current.height = void 0;
					if (!disableRerender) setSize({
						width: void 0,
						height: void 0
					});
				}
				return () => {
					var _a, _b, _c;
					(_a = resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.disconnect) === null || _a === void 0 || _a.call(resizeObserver);
					(_c = (_b = resizeHandler).cancel) === null || _c === void 0 || _c.call(_b);
				};
			}, [resizeHandler, refElement]);
			return Object.assign({ ref: refProxy }, disableRerender ? sizeRef.current : size);
		}
		var init_useResizeDetector = __esmMin((() => {
			init_utils();
		}));
		//#endregion
		//#region node_modules/@lattice-automation/react-resize-detector/build/index.js
		var build_exports = /* @__PURE__ */ __exportAll({ useResizeDetector: () => useResizeDetector });
		var init_build = __esmMin((() => {
			init_useResizeDetector();
		}));
		//#endregion
		//#region node_modules/node-fetch/browser.js
		var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			var getGlobal = function() {
				if (typeof self !== "undefined") return self;
				if (typeof window !== "undefined") return window;
				if (typeof global !== "undefined") return global;
				throw new Error("unable to locate global object");
			};
			var globalObject = getGlobal();
			module.exports = exports = globalObject.fetch;
			if (globalObject.fetch) exports.default = globalObject.fetch.bind(globalObject);
			exports.Headers = globalObject.Headers;
			exports.Request = globalObject.Request;
			exports.Response = globalObject.Response;
		}));
		//#endregion
		//#region node_modules/fast-xml-parser/lib/fxp.cjs
		var require_fxp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			(() => {
				"use strict";
				var t = {
					d: (e, i) => {
						for (var n in i) t.o(i, n) && !t.o(e, n) && Object.defineProperty(e, n, {
							enumerable: !0,
							get: i[n]
						});
					},
					o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
					r: (t) => {
						"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
					}
				}, e = {};
				t.r(e), t.d(e, {
					XMLBuilder: () => Oe,
					XMLParser: () => re,
					XMLValidator: () => je
				});
				const n = /* @__PURE__ */ new RegExp("^[:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
				function r(t, e) {
					const i = [];
					let n = e.exec(t);
					for (; n;) {
						const r = [];
						r.startIndex = e.lastIndex - n[0].length;
						const s = n.length;
						for (let t = 0; t < s; t++) r.push(n[t]);
						i.push(r), n = e.exec(t);
					}
					return i;
				}
				const s = function(t) {
					return !(null == n.exec(t));
				}, o = [
					"hasOwnProperty",
					"toString",
					"valueOf",
					"__defineGetter__",
					"__defineSetter__",
					"__lookupGetter__",
					"__lookupSetter__"
				], a = [
					"__proto__",
					"constructor",
					"prototype"
				], l = {
					allowBooleanAttributes: !1,
					unpairedTags: []
				};
				function p(t, e) {
					e = Object.assign({}, l, e);
					const i = [];
					let n = !1, r = !1;
					"﻿" === t[0] && (t = t.substr(1));
					for (let s = 0; s < t.length; s++) if ("<" === t[s] && "?" === t[s + 1]) {
						if (s += 2, s = h(t, s), s.err) return s;
					} else {
						if ("<" !== t[s]) {
							if (c(t[s])) continue;
							return y("InvalidChar", "char '" + t[s] + "' is not expected.", w(t, s));
						}
						{
							let o = s;
							if (s++, "!" === t[s]) {
								s = d(t, s);
								continue;
							}
							{
								let a = !1;
								"/" === t[s] && (a = !0, s++);
								let l = "";
								for (; s < t.length && ">" !== t[s] && " " !== t[s] && "	" !== t[s] && "\n" !== t[s] && "\r" !== t[s]; s++) l += t[s];
								if (l = l.trim(), "/" === l[l.length - 1] && (l = l.substring(0, l.length - 1), s--), !E(l)) {
									let e;
									return e = 0 === l.trim().length ? "Invalid space after '<'." : "Tag '" + l + "' is an invalid name.", y("InvalidTag", e, w(t, s));
								}
								const p = g(t, s);
								if (!1 === p) return y("InvalidAttr", "Attributes for '" + l + "' have open quote.", w(t, s));
								let u = p.value;
								if (s = p.index, "/" === u[u.length - 1]) {
									const i = s - u.length;
									u = u.substring(0, u.length - 1);
									const r = x(u, e);
									if (!0 !== r) return y(r.err.code, r.err.msg, w(t, i + r.err.line));
									n = !0;
								} else if (a) {
									if (!p.tagClosed) return y("InvalidTag", "Closing tag '" + l + "' doesn't have proper closing.", w(t, s));
									if (u.trim().length > 0) return y("InvalidTag", "Closing tag '" + l + "' can't have attributes or invalid starting.", w(t, o));
									if (0 === i.length) return y("InvalidTag", "Closing tag '" + l + "' has not been opened.", w(t, o));
									{
										const e = i.pop();
										if (l !== e.tagName) {
											let i = w(t, e.tagStartPos);
											return y("InvalidTag", "Expected closing tag '" + e.tagName + "' (opened in line " + i.line + ", col " + i.col + ") instead of closing tag '" + l + "'.", w(t, o));
										}
										0 == i.length && (r = !0);
									}
								} else {
									const a = x(u, e);
									if (!0 !== a) return y(a.err.code, a.err.msg, w(t, s - u.length + a.err.line));
									if (!0 === r) return y("InvalidXml", "Multiple possible root nodes found.", w(t, s));
									-1 !== e.unpairedTags.indexOf(l) || i.push({
										tagName: l,
										tagStartPos: o
									}), n = !0;
								}
								for (s++; s < t.length; s++) if ("<" === t[s]) {
									if ("!" === t[s + 1]) {
										s++, s = d(t, s);
										continue;
									}
									if ("?" !== t[s + 1]) break;
									if (s = h(t, ++s), s.err) return s;
								} else if ("&" === t[s]) {
									const e = b(t, s);
									if (-1 == e) return y("InvalidChar", "char '&' is not expected.", w(t, s));
									s = e;
								} else if (!0 === r && !c(t[s])) return y("InvalidXml", "Extra text at the end", w(t, s));
								"<" === t[s] && s--;
							}
						}
					}
					return n ? 1 == i.length ? y("InvalidTag", "Unclosed tag '" + i[0].tagName + "'.", w(t, i[0].tagStartPos)) : !(i.length > 0) || y("InvalidXml", "Invalid '" + JSON.stringify(i.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", {
						line: 1,
						col: 1
					}) : y("InvalidXml", "Start tag expected.", 1);
				}
				function c(t) {
					return " " === t || "	" === t || "\n" === t || "\r" === t;
				}
				function h(t, e) {
					const i = e;
					for (; e < t.length; e++) if ("?" == t[e] || " " == t[e]) {
						const n = t.substr(i, e - i);
						if (e > 5 && "xml" === n) return y("InvalidXml", "XML declaration allowed only at the start of the document.", w(t, e));
						if ("?" == t[e] && ">" == t[e + 1]) {
							e++;
							break;
						}
						continue;
					}
					return e;
				}
				function d(t, e) {
					if (t.length > e + 5 && "-" === t[e + 1] && "-" === t[e + 2]) {
						for (e += 3; e < t.length; e++) if ("-" === t[e] && "-" === t[e + 1] && ">" === t[e + 2]) {
							e += 2;
							break;
						}
					} else if (t.length > e + 8 && "D" === t[e + 1] && "O" === t[e + 2] && "C" === t[e + 3] && "T" === t[e + 4] && "Y" === t[e + 5] && "P" === t[e + 6] && "E" === t[e + 7]) {
						let i = 1;
						for (e += 8; e < t.length; e++) if ("<" === t[e]) i++;
						else if (">" === t[e] && (i--, 0 === i)) break;
					} else if (t.length > e + 9 && "[" === t[e + 1] && "C" === t[e + 2] && "D" === t[e + 3] && "A" === t[e + 4] && "T" === t[e + 5] && "A" === t[e + 6] && "[" === t[e + 7]) {
						for (e += 8; e < t.length; e++) if ("]" === t[e] && "]" === t[e + 1] && ">" === t[e + 2]) {
							e += 2;
							break;
						}
					}
					return e;
				}
				const u = "\"", f = "'";
				function g(t, e) {
					let i = "", n = "", r = !1;
					for (; e < t.length; e++) {
						if (t[e] === u || t[e] === f) "" === n ? n = t[e] : n !== t[e] || (n = "");
						else if (">" === t[e] && "" === n) {
							r = !0;
							break;
						}
						i += t[e];
					}
					return "" === n && {
						value: i,
						index: e,
						tagClosed: r
					};
				}
				const m = /* @__PURE__ */ new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?", "g");
				function x(t, e) {
					const i = r(t, m), n = {};
					for (let t = 0; t < i.length; t++) {
						if (0 === i[t][1].length) return y("InvalidAttr", "Attribute '" + i[t][2] + "' has no space in starting.", v(i[t]));
						if (void 0 !== i[t][3] && void 0 === i[t][4]) return y("InvalidAttr", "Attribute '" + i[t][2] + "' is without value.", v(i[t]));
						if (void 0 === i[t][3] && !e.allowBooleanAttributes) return y("InvalidAttr", "boolean attribute '" + i[t][2] + "' is not allowed.", v(i[t]));
						const r = i[t][2];
						if (!N(r)) return y("InvalidAttr", "Attribute '" + r + "' is an invalid name.", v(i[t]));
						if (Object.prototype.hasOwnProperty.call(n, r)) return y("InvalidAttr", "Attribute '" + r + "' is repeated.", v(i[t]));
						n[r] = 1;
					}
					return !0;
				}
				function b(t, e) {
					if (";" === t[++e]) return -1;
					if ("#" === t[e]) return function(t, e) {
						let i = /\d/;
						for ("x" === t[e] && (e++, i = /[\da-fA-F]/); e < t.length; e++) {
							if (";" === t[e]) return e;
							if (!t[e].match(i)) break;
						}
						return -1;
					}(t, ++e);
					let i = 0;
					for (; e < t.length; e++, i++) if (!(t[e].match(/\w/) && i < 20)) {
						if (";" === t[e]) break;
						return -1;
					}
					return e;
				}
				function y(t, e, i) {
					return { err: {
						code: t,
						msg: e,
						line: i.line || i,
						col: i.col
					} };
				}
				function N(t) {
					return s(t);
				}
				function E(t) {
					return s(t);
				}
				function w(t, e) {
					const i = t.substring(0, e).split(/\r?\n/);
					return {
						line: i.length,
						col: i[i.length - 1].length + 1
					};
				}
				function v(t) {
					return t.startIndex + t[1].length;
				}
				const S = (t) => o.includes(t) ? "__" + t : t, A = {
					preserveOrder: !1,
					attributeNamePrefix: "@_",
					attributesGroupName: !1,
					textNodeName: "#text",
					ignoreAttributes: !0,
					removeNSPrefix: !1,
					allowBooleanAttributes: !1,
					parseTagValue: !0,
					parseAttributeValue: !1,
					trimValues: !0,
					cdataPropName: !1,
					numberParseOptions: {
						hex: !0,
						leadingZeros: !0,
						eNotation: !0,
						unicode: !1
					},
					tagValueProcessor: function(t, e) {
						return e;
					},
					attributeValueProcessor: function(t, e) {
						return e;
					},
					stopNodes: [],
					alwaysCreateTextNode: !1,
					isArray: () => !1,
					commentPropName: !1,
					unpairedTags: [],
					processEntities: !0,
					htmlEntities: !1,
					entityDecoder: null,
					ignoreDeclaration: !1,
					ignorePiTags: !1,
					transformTagName: !1,
					transformAttributeName: !1,
					updateTag: function(t, e, i) {
						return t;
					},
					captureMetaData: !1,
					maxNestedTags: 100,
					strictReservedNames: !0,
					jPath: !0,
					onDangerousProperty: S
				};
				function T(t, e) {
					if ("string" != typeof t) return;
					const i = t.toLowerCase();
					if (o.some((t) => i === t.toLowerCase())) throw new Error(`[SECURITY] Invalid ${e}: "${t}" is a reserved JavaScript keyword that could cause prototype pollution`);
					if (a.some((t) => i === t.toLowerCase())) throw new Error(`[SECURITY] Invalid ${e}: "${t}" is a reserved JavaScript keyword that could cause prototype pollution`);
				}
				function _(t, e) {
					return "boolean" == typeof t ? {
						enabled: t,
						maxEntitySize: 1e4,
						maxExpansionDepth: 1e4,
						maxTotalExpansions: 1 / 0,
						maxExpandedLength: 1e5,
						maxEntityCount: 1e3,
						allowedTags: null,
						tagFilter: null,
						appliesTo: "all"
					} : "object" == typeof t && null !== t ? {
						enabled: !1 !== t.enabled,
						maxEntitySize: Math.max(1, t.maxEntitySize ?? 1e4),
						maxExpansionDepth: Math.max(1, t.maxExpansionDepth ?? 1e4),
						maxTotalExpansions: Math.max(1, t.maxTotalExpansions ?? 1 / 0),
						maxExpandedLength: Math.max(1, t.maxExpandedLength ?? 1e5),
						maxEntityCount: Math.max(1, t.maxEntityCount ?? 1e3),
						allowedTags: t.allowedTags ?? null,
						tagFilter: t.tagFilter ?? null,
						appliesTo: t.appliesTo ?? "all"
					} : _(!0);
				}
				const C = function(t) {
					const e = Object.assign({}, A, t), i = [
						{
							value: e.attributeNamePrefix,
							name: "attributeNamePrefix"
						},
						{
							value: e.attributesGroupName,
							name: "attributesGroupName"
						},
						{
							value: e.textNodeName,
							name: "textNodeName"
						},
						{
							value: e.cdataPropName,
							name: "cdataPropName"
						},
						{
							value: e.commentPropName,
							name: "commentPropName"
						}
					];
					for (const { value: t, name: e } of i) t && T(t, e);
					return null === e.onDangerousProperty && (e.onDangerousProperty = S), e.processEntities = _(e.processEntities, e.htmlEntities), e.unpairedTagsSet = new Set(e.unpairedTags), e.stopNodes && Array.isArray(e.stopNodes) && (e.stopNodes = e.stopNodes.map((t) => "string" == typeof t && t.startsWith("*.") ? ".." + t.substring(2) : t)), e;
				};
				let $;
				$ = "function" != typeof Symbol ? "@@xmlMetadata" : Symbol("XML Node Metadata");
				class P {
					constructor(t) {
						this.tagname = t, this.child = [], this[":@"] = Object.create(null);
					}
					add(t, e) {
						"__proto__" === t && (t = "#__proto__"), this.child.push({ [t]: e });
					}
					addChild(t, e) {
						"__proto__" === t.tagname && (t.tagname = "#__proto__"), t[":@"] && Object.keys(t[":@"]).length > 0 ? this.child.push({
							[t.tagname]: t.child,
							":@": t[":@"]
						}) : this.child.push({ [t.tagname]: t.child }), void 0 !== e && (this.child[this.child.length - 1][$] = { startIndex: e });
					}
					static getMetaDataSymbol() {
						return $;
					}
				}
				const O = ":A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", j = ":A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿", I = ":A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿\\-\\.\\d·̀-ͯ҇‿-⁀", k = (t, e, i = "") => {
					const n = `[${t.replace(":", "")}][${e.replace(":", "")}]*`;
					return {
						name: new RegExp(`^[${t}][${e}]*$`, i),
						ncName: new RegExp(`^${n}$`, i),
						qName: new RegExp(`^${n}(?::${n})?$`, i),
						nmToken: new RegExp(`^[${e}]+$`, i),
						nmTokens: new RegExp(`^[${e}]+(?:\\s+[${e}]+)*$`, i)
					};
				}, L = k(O, ":A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�\\-\\.\\d·̀-ͯ‿-⁀"), D = k(j, I, "u"), M = k(":A-Za-z_", ":A-Za-z_\\-\\.\\d"), V = (t, { xmlVersion: e = "1.0", asciiOnly: i = !1 } = {}) => ((t = "1.0", e = !1) => e ? M : "1.1" === t ? D : L)(e, i).qName.test(t);
				class q {
					constructor(t, e) {
						this.suppressValidationErr = !t, this.options = t, this.xmlVersion = e || 1;
					}
					setXmlVersion(t = 1) {
						this.xmlVersion = t;
					}
					readDocType(t, e) {
						const i = Object.create(null);
						let n = 0;
						if ("O" !== t[e + 3] || "C" !== t[e + 4] || "T" !== t[e + 5] || "Y" !== t[e + 6] || "P" !== t[e + 7] || "E" !== t[e + 8]) throw new Error("Invalid Tag instead of DOCTYPE");
						{
							e += 9;
							let r = 1, s = !1, o = !1, a = "";
							for (; e < t.length; e++) if ("<" !== t[e] || o) if (">" === t[e]) {
								if (o ? "-" === t[e - 1] && "-" === t[e - 2] && (o = !1, r--) : r--, 0 === r) break;
							} else "[" === t[e] ? s = !0 : a += t[e];
							else {
								if (s && U(t, "!ENTITY", e)) {
									let r, s;
									if (e += 7, [r, s, e] = this.readEntityExp(t, e + 1, this.suppressValidationErr), -1 === s.indexOf("&")) {
										if (!1 !== this.options.enabled && null != this.options.maxEntityCount && n >= this.options.maxEntityCount) throw new Error(`Entity count (${n + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`);
										i[r] = s, n++;
									}
								} else if (s && U(t, "!ELEMENT", e)) {
									e += 8;
									const { index: i } = this.readElementExp(t, e + 1);
									e = i;
								} else if (s && U(t, "!ATTLIST", e)) e += 8;
								else if (s && U(t, "!NOTATION", e)) {
									e += 9;
									const { index: i } = this.readNotationExp(t, e + 1, this.suppressValidationErr);
									e = i;
								} else {
									if (!U(t, "!--", e)) throw new Error("Invalid DOCTYPE");
									o = !0;
								}
								r++, a = "";
							}
							if (0 !== r) throw new Error("Unclosed DOCTYPE");
						}
						return {
							entities: i,
							i: e
						};
					}
					readEntityExp(t, e) {
						const i = e = F(t, e);
						for (; e < t.length && !/\s/.test(t[e]) && "\"" !== t[e] && "'" !== t[e];) e++;
						let n = t.substring(i, e);
						if (B(n, { xmlVersion: this.xmlVersion }), e = F(t, e), !this.suppressValidationErr) {
							if ("SYSTEM" === t.substring(e, e + 6).toUpperCase()) throw new Error("External entities are not supported");
							if ("%" === t[e]) throw new Error("Parameter entities are not supported");
						}
						let r = "";
						if ([e, r] = this.readIdentifierVal(t, e, "entity"), !1 !== this.options.enabled && null != this.options.maxEntitySize && r.length > this.options.maxEntitySize) throw new Error(`Entity "${n}" size (${r.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);
						return [
							n,
							r,
							--e
						];
					}
					readNotationExp(t, e) {
						const i = e = F(t, e);
						for (; e < t.length && !/\s/.test(t[e]);) e++;
						let n = t.substring(i, e);
						!this.suppressValidationErr && B(n, { xmlVersion: this.xmlVersion }), e = F(t, e);
						const r = t.substring(e, e + 6).toUpperCase();
						if (!this.suppressValidationErr && "SYSTEM" !== r && "PUBLIC" !== r) throw new Error(`Expected SYSTEM or PUBLIC, found "${r}"`);
						e += r.length, e = F(t, e);
						let s = null, o = null;
						if ("PUBLIC" === r) [e, s] = this.readIdentifierVal(t, e, "publicIdentifier"), "\"" !== t[e = F(t, e)] && "'" !== t[e] || ([e, o] = this.readIdentifierVal(t, e, "systemIdentifier"));
						else if ("SYSTEM" === r && ([e, o] = this.readIdentifierVal(t, e, "systemIdentifier"), !this.suppressValidationErr && !o)) throw new Error("Missing mandatory system identifier for SYSTEM notation");
						return {
							notationName: n,
							publicIdentifier: s,
							systemIdentifier: o,
							index: --e
						};
					}
					readIdentifierVal(t, e, i) {
						let n = "";
						const r = t[e];
						if ("\"" !== r && "'" !== r) throw new Error(`Expected quoted string, found "${r}"`);
						const s = ++e;
						for (; e < t.length && t[e] !== r;) e++;
						if (n = t.substring(s, e), t[e] !== r) throw new Error(`Unterminated ${i} value`);
						return [++e, n];
					}
					readElementExp(t, e) {
						const i = e = F(t, e);
						for (; e < t.length && !/\s/.test(t[e]);) e++;
						let n = t.substring(i, e);
						if (!this.suppressValidationErr && !V(n, { xmlVersion: this.xmlVersion })) throw new Error(`Invalid element name: "${n}"`);
						let r = "";
						if ("E" === t[e = F(t, e)] && U(t, "MPTY", e)) e += 4;
						else if ("A" === t[e] && U(t, "NY", e)) e += 2;
						else if ("(" === t[e]) {
							const i = ++e;
							for (; e < t.length && ")" !== t[e];) e++;
							if (r = t.substring(i, e), ")" !== t[e]) throw new Error("Unterminated content model");
						} else if (!this.suppressValidationErr) throw new Error(`Invalid Element Expression, found "${t[e]}"`);
						return {
							elementName: n,
							contentModel: r.trim(),
							index: e
						};
					}
					readAttlistExp(t, e) {
						let i = e = F(t, e);
						for (; e < t.length && !/\s/.test(t[e]);) e++;
						let n = t.substring(i, e);
						for (B(n, { xmlVersion: this.xmlVersion }), i = e = F(t, e); e < t.length && !/\s/.test(t[e]);) e++;
						let r = t.substring(i, e);
						if (!B(r, { xmlVersion: this.xmlVersion })) throw new Error(`Invalid attribute name: "${r}"`);
						e = F(t, e);
						let s = "";
						if ("NOTATION" === t.substring(e, e + 8).toUpperCase()) {
							if (s = "NOTATION", "(" !== t[e = F(t, e += 8)]) throw new Error(`Expected '(', found "${t[e]}"`);
							e++;
							let i = [];
							for (; e < t.length && ")" !== t[e];) {
								const n = e;
								for (; e < t.length && "|" !== t[e] && ")" !== t[e];) e++;
								let r = t.substring(n, e);
								if (r = r.trim(), !B(r, { xmlVersion: this.xmlVersion })) throw new Error(`Invalid notation name: "${r}"`);
								i.push(r), "|" === t[e] && (e++, e = F(t, e));
							}
							if (")" !== t[e]) throw new Error("Unterminated list of notations");
							e++, s += " (" + i.join("|") + ")";
						} else {
							const i = e;
							for (; e < t.length && !/\s/.test(t[e]);) e++;
							s += t.substring(i, e);
							if (!this.suppressValidationErr && ![
								"CDATA",
								"ID",
								"IDREF",
								"IDREFS",
								"ENTITY",
								"ENTITIES",
								"NMTOKEN",
								"NMTOKENS"
							].includes(s.toUpperCase())) throw new Error(`Invalid attribute type: "${s}"`);
						}
						e = F(t, e);
						let o = "";
						return "#REQUIRED" === t.substring(e, e + 8).toUpperCase() ? (o = "#REQUIRED", e += 8) : "#IMPLIED" === t.substring(e, e + 7).toUpperCase() ? (o = "#IMPLIED", e += 7) : [e, o] = this.readIdentifierVal(t, e, "ATTLIST"), {
							elementName: n,
							attributeName: r,
							attributeType: s,
							defaultValue: o,
							index: e
						};
					}
				}
				const F = (t, e) => {
					for (; e < t.length && /\s/.test(t[e]);) e++;
					return e;
				};
				function U(t, e, i) {
					for (let n = 0; n < e.length; n++) if (e[n] !== t[i + n + 1]) return !1;
					return !0;
				}
				function B(t, e) {
					if (V(t, { xmlVersion: e })) return t;
					throw new Error(`Invalid entity name ${t}`);
				}
				const G = [
					48,
					1632,
					1776,
					2406,
					2534,
					2662,
					2790,
					2918,
					3046,
					3174,
					3302,
					3430,
					3558,
					3664,
					3792,
					3872,
					4160,
					4240,
					6112,
					6160,
					6470,
					6608,
					6784,
					6800,
					6992,
					7088,
					7232,
					7248,
					65296,
					120782,
					120792,
					120802,
					120812,
					120822,
					66720,
					68912,
					69734,
					69872,
					69942,
					70096,
					70384,
					70736,
					70864,
					71248,
					71360,
					71472,
					71904,
					72016,
					72688,
					72784,
					73040,
					73120,
					73552,
					92768,
					92864,
					93008,
					123200,
					123632,
					124144,
					125264,
					130032
				], X = /* @__PURE__ */ new Map(), W = 1632, z = (/* @__PURE__ */ new Uint8Array(63904)).fill(255);
				for (const t of G) for (let e = 0; e < 10; e++) {
					const i = t + e;
					i <= 65535 ? z[i - W] = e : X.set(i, e);
				}
				const Y = /* @__PURE__ */ new Set([
					8722,
					65293,
					65123
				]), H = /^[-+]?0x[a-fA-F0-9]+$/, Q = /^0b[01]+$/, J = /^0o[0-7]+$/, Z = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, K = {
					hex: !0,
					binary: !1,
					octal: !1,
					leadingZeros: !0,
					decimalPoint: ".",
					eNotation: !0,
					infinity: "original",
					unicode: !1
				};
				function tt(t, e = {}) {
					if (e = Object.assign({}, K, e), !t || "string" != typeof t) return t;
					let i = t.trim();
					if (0 === i.length) return t;
					if (void 0 !== e.skipLike && e.skipLike.test(i)) return t;
					if ("0" === i) return 0;
					if (e.unicode && (i = function(t) {
						if ("string" != typeof t) return t;
						const e = t.length;
						if (0 === e) return t;
						let i = -1;
						for (let n = 0; n < e; n++) {
							const r = t.charCodeAt(n);
							if (!(r >= 48 && r <= 57 || 45 === r)) {
								if (r < W) {
									if (Y.has(r)) {
										i = n;
										break;
									}
								} else if (r >= 55296 && r <= 56319) {
									if (n + 1 < e) {
										const e = t.charCodeAt(n + 1);
										if (e >= 56320 && e <= 57343) {
											const t = 65536 + (r - 55296 << 10) + (e - 56320);
											if (X.has(t)) {
												i = n;
												break;
											}
										}
									}
								} else if (255 !== z[r - W] || Y.has(r)) {
									i = n;
									break;
								}
							}
						}
						if (-1 === i) return t;
						const n = [];
						i > 0 && n.push(t.slice(0, i));
						for (let r = i; r < e; r++) {
							const i = t.charCodeAt(r);
							if (i >= 48 && i <= 57 || 45 === i) {
								n.push(t[r]);
								continue;
							}
							if (i < W) {
								n.push(Y.has(i) ? "-" : t[r]);
								continue;
							}
							if (i >= 55296 && i <= 56319) {
								if (r + 1 < e) {
									const e = t.charCodeAt(r + 1);
									if (e >= 56320 && e <= 57343) {
										const t = 65536 + (i - 55296 << 10) + (e - 56320), s = X.get(t);
										if (void 0 !== s) {
											n.push(String.fromCharCode(s + 48)), r++;
											continue;
										}
									}
								}
								n.push(t[r]);
								continue;
							}
							if (Y.has(i)) {
								n.push("-");
								continue;
							}
							const s = z[i - W];
							n.push(255 !== s ? String.fromCharCode(s + 48) : t[r]);
						}
						return n.join("");
					}(i), "0" === i)) return 0;
					if (e.hex && H.test(i)) return it(i, 16);
					if (e.binary && Q.test(i)) return it(i, 2);
					if (e.octal && J.test(i)) return it(i, 8);
					if (isFinite(i)) {
						if (i.includes("e") || i.includes("E")) return function(t, e, i) {
							if (!i.eNotation) return t;
							const n = e.match(et);
							if (n) {
								let r = n[1] || "";
								const s = -1 === n[3].indexOf("e") ? "E" : "e", o = n[2], a = r ? t[o.length + 1] === s : t[o.length] === s;
								return o.length > 1 && a ? t : (1 !== o.length || !n[3].startsWith(`.${s}`) && n[3][0] !== s) && o.length > 0 ? i.leadingZeros && !a ? (e = (n[1] || "") + n[3], Number(e)) : t : Number(e);
							}
							return t;
						}(t, i, e);
						{
							const r = Z.exec(i);
							if (r) {
								const s = r[1] || "", o = r[2];
								let a = (n = r[3]) && -1 !== n.indexOf(".") ? ("." === (n = n.replace(/0+$/, "")) ? n = "0" : "." === n[0] ? n = "0" + n : "." === n[n.length - 1] && (n = n.substring(0, n.length - 1)), n) : n;
								const l = s ? "." === t[o.length + 1] : "." === t[o.length];
								if (!e.leadingZeros && (o.length > 1 || 1 === o.length && !l)) return t;
								{
									const n = Number(i), r = String(n);
									if (0 === n) return n;
									if (-1 !== r.search(/[eE]/)) return e.eNotation ? n : t;
									if (-1 !== i.indexOf(".")) return "0" === r || r === a || r === `${s}${a}` ? n : t;
									let l = o ? a : i;
									return o ? l === r || s + l === r ? n : t : l === r || l === s + r ? n : t;
								}
							}
							return t;
						}
					}
					var n;
					return function(t, e, i) {
						const n = e === 1 / 0;
						switch (i.infinity.toLowerCase()) {
							case "null": return null;
							case "infinity": return e;
							case "string": return n ? "Infinity" : "-Infinity";
							default: return t;
						}
					}(t, Number(i), e);
				}
				const et = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
				function it(t, e) {
					const i = t.trim();
					if (2 !== e && 8 !== e || (t = i.substring(2)), parseInt) return parseInt(t, e);
					if (Number.parseInt) return Number.parseInt(t, e);
					if (window && window.parseInt) return window.parseInt(t, e);
					throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
				}
				class nt {
					constructor(t) {
						this._matcher = t;
					}
					get separator() {
						return this._matcher.separator;
					}
					getCurrentTag() {
						const t = this._matcher.path;
						return t.length > 0 ? t[t.length - 1].tag : void 0;
					}
					getCurrentNamespace() {
						const t = this._matcher.path;
						return t.length > 0 ? t[t.length - 1].namespace : void 0;
					}
					getAttrValue(t) {
						const e = this._matcher.path;
						if (0 !== e.length) return e[e.length - 1].values?.[t];
					}
					hasAttr(t) {
						const e = this._matcher.path;
						if (0 === e.length) return !1;
						const i = e[e.length - 1];
						return void 0 !== i.values && t in i.values;
					}
					getAnyParentAttr(t) {
						return this._matcher.getAnyParentAttr(t);
					}
					hasAnyParentAttr(t) {
						return this._matcher.hasAnyParentAttr(t);
					}
					getPosition() {
						const t = this._matcher.path;
						return 0 === t.length ? -1 : t[t.length - 1].position ?? 0;
					}
					getCounter() {
						const t = this._matcher.path;
						return 0 === t.length ? -1 : t[t.length - 1].counter ?? 0;
					}
					getIndex() {
						return this.getPosition();
					}
					getDepth() {
						return this._matcher.path.length;
					}
					toString(t, e = !0) {
						return this._matcher.toString(t, e);
					}
					toArray() {
						return this._matcher.path.map((t) => t.tag);
					}
					matches(t) {
						return this._matcher.matches(t);
					}
					matchesAny(t) {
						return t.matchesAny(this._matcher);
					}
				}
				class rt {
					constructor(t = {}) {
						this.separator = t.separator || ".", this.path = [], this.siblingStacks = [], this._pathStringCache = null, this._view = new nt(this), this._keptAttrs = [];
					}
					push(t, e = null, i = null, n = null) {
						this._pathStringCache = null, this.path.length > 0 && (this.path[this.path.length - 1].values = void 0);
						const r = this.path.length;
						let s = this.siblingStacks[r];
						s || (s = {
							counts: /* @__PURE__ */ new Map(),
							total: 0
						}, this.siblingStacks[r] = s);
						const o = i ? `${i}:${t}` : t, a = s.counts.get(o) || 0, l = s.total;
						s.counts.set(o, a + 1), s.total++;
						const p = {
							tag: t,
							position: l,
							counter: a
						};
						null != i && (p.namespace = i), null != e && (p.values = e), this.path.push(p);
						const c = this.path.length, h = null !== n ? n.keep : null;
						if (null != h && h.length > 0 && e) for (let t = 0; t < h.length; t++) {
							const i = h[t];
							void 0 !== e[i] && this._keptAttrs.push({
								depth: c,
								name: i,
								value: e[i]
							});
						}
					}
					pop() {
						if (0 === this.path.length) return;
						this._pathStringCache = null;
						const t = this.path.pop();
						this.siblingStacks.length > this.path.length + 1 && (this.siblingStacks.length = this.path.length + 1);
						const e = this.path.length + 1;
						for (; this._keptAttrs.length > 0 && this._keptAttrs[this._keptAttrs.length - 1].depth >= e;) this._keptAttrs.pop();
						return t;
					}
					updateCurrent(t) {
						if (this.path.length > 0) {
							const e = this.path[this.path.length - 1];
							null != t && (e.values = t);
						}
					}
					getCurrentTag() {
						return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
					}
					getCurrentNamespace() {
						return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
					}
					getAttrValue(t) {
						if (0 !== this.path.length) return this.path[this.path.length - 1].values?.[t];
					}
					hasAttr(t) {
						if (0 === this.path.length) return !1;
						const e = this.path[this.path.length - 1];
						return void 0 !== e.values && t in e.values;
					}
					getAnyParentAttr(t) {
						const e = this._keptAttrs;
						for (let i = e.length - 1; i >= 0; i--) if (e[i].name === t) return e[i].value;
					}
					hasAnyParentAttr(t) {
						const e = this._keptAttrs;
						for (let i = e.length - 1; i >= 0; i--) if (e[i].name === t) return !0;
						return !1;
					}
					getPosition() {
						return 0 === this.path.length ? -1 : this.path[this.path.length - 1].position ?? 0;
					}
					getCounter() {
						return 0 === this.path.length ? -1 : this.path[this.path.length - 1].counter ?? 0;
					}
					getIndex() {
						return this.getPosition();
					}
					getDepth() {
						return this.path.length;
					}
					toString(t, e = !0) {
						const i = t || this.separator;
						if (i === this.separator && !0 === e) {
							if (null !== this._pathStringCache) return this._pathStringCache;
							const t = this.path.map((t) => t.namespace ? `${t.namespace}:${t.tag}` : t.tag).join(i);
							return this._pathStringCache = t, t;
						}
						return this.path.map((t) => e && t.namespace ? `${t.namespace}:${t.tag}` : t.tag).join(i);
					}
					toArray() {
						return this.path.map((t) => t.tag);
					}
					reset() {
						this._pathStringCache = null, this.path = [], this.siblingStacks = [], this._keptAttrs = [];
					}
					matches(t) {
						const e = t.segments;
						return 0 !== e.length && (t.hasDeepWildcard() ? this._matchWithDeepWildcard(e) : this._matchSimple(e));
					}
					_matchSimple(t) {
						if (this.path.length !== t.length) return !1;
						for (let e = 0; e < t.length; e++) if (!this._matchSegment(t[e], this.path[e], e === this.path.length - 1)) return !1;
						return !0;
					}
					_matchWithDeepWildcard(t) {
						let e = this.path.length - 1, i = t.length - 1;
						for (; i >= 0 && e >= 0;) {
							const n = t[i];
							if ("deep-wildcard" === n.type) {
								if (i--, i < 0) return !0;
								const n = t[i];
								let r = !1;
								for (let t = e; t >= 0; t--) if (this._matchSegment(n, this.path[t], t === this.path.length - 1)) {
									e = t - 1, i--, r = !0;
									break;
								}
								if (!r) return !1;
							} else {
								if (!this._matchSegment(n, this.path[e], e === this.path.length - 1)) return !1;
								e--, i--;
							}
						}
						return i < 0;
					}
					_matchSegment(t, e, i) {
						if ("*" !== t.tag && t.tag !== e.tag) return !1;
						if (void 0 !== t.namespace && "*" !== t.namespace && t.namespace !== e.namespace) return !1;
						if (void 0 !== t.attrName) {
							if (!i) return !1;
							if (!e.values || !(t.attrName in e.values)) return !1;
							if (void 0 !== t.attrValue && String(e.values[t.attrName]) !== String(t.attrValue)) return !1;
						}
						if (void 0 !== t.position) {
							if (!i) return !1;
							const n = e.counter ?? 0;
							if ("first" === t.position && 0 !== n) return !1;
							if ("odd" === t.position && n % 2 != 1) return !1;
							if ("even" === t.position && n % 2 != 0) return !1;
							if ("nth" === t.position && n !== t.positionValue) return !1;
						}
						return !0;
					}
					matchesAny(t) {
						return t.matchesAny(this);
					}
					snapshot() {
						return {
							path: this.path.map((t) => ({ ...t })),
							siblingStacks: this.siblingStacks.map((t) => t ? {
								counts: new Map(t.counts),
								total: t.total
							} : t),
							keptAttrs: this._keptAttrs.map((t) => ({ ...t }))
						};
					}
					restore(t) {
						this._pathStringCache = null, this.path = t.path.map((t) => ({ ...t })), this.siblingStacks = t.siblingStacks.map((t) => t ? {
							counts: new Map(t.counts),
							total: t.total
						} : t), this._keptAttrs = (t.keptAttrs || []).map((t) => ({ ...t }));
					}
					readOnly() {
						return this._view;
					}
				}
				class st {
					constructor(t, e = {}, i) {
						this.pattern = t, this.separator = e.separator || ".", this.segments = this._parse(t), this.data = i, this._hasDeepWildcard = this.segments.some((t) => "deep-wildcard" === t.type), this._hasAttributeCondition = this.segments.some((t) => void 0 !== t.attrName), this._hasPositionSelector = this.segments.some((t) => void 0 !== t.position);
					}
					_parse(t) {
						const e = [];
						let i = 0, n = "";
						for (; i < t.length;) t[i] === this.separator ? i + 1 < t.length && t[i + 1] === this.separator ? (n.trim() && (e.push(this._parseSegment(n.trim())), n = ""), e.push({ type: "deep-wildcard" }), i += 2) : (n.trim() && e.push(this._parseSegment(n.trim())), n = "", i++) : (n += t[i], i++);
						return n.trim() && e.push(this._parseSegment(n.trim())), e;
					}
					_parseSegment(t) {
						const e = { type: "tag" };
						let i = null, n = t;
						const r = t.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
						if (r && (n = r[1] + r[3], r[2])) {
							const t = r[2].slice(1, -1);
							t && (i = t);
						}
						let s, o, a = n;
						if (n.includes("::")) {
							const e = n.indexOf("::");
							if (s = n.substring(0, e).trim(), a = n.substring(e + 2).trim(), !s) throw new Error(`Invalid namespace in pattern: ${t}`);
						}
						let l = null;
						if (a.includes(":")) {
							const t = a.lastIndexOf(":"), e = a.substring(0, t).trim(), i = a.substring(t + 1).trim();
							[
								"first",
								"last",
								"odd",
								"even"
							].includes(i) || /^nth\(\d+\)$/.test(i) ? (o = e, l = i) : o = a;
						} else o = a;
						if (!o) throw new Error(`Invalid segment pattern: ${t}`);
						if (e.tag = o, s && (e.namespace = s), i) if (i.includes("=")) {
							const t = i.indexOf("=");
							e.attrName = i.substring(0, t).trim(), e.attrValue = i.substring(t + 1).trim();
						} else e.attrName = i.trim();
						if (l) {
							const t = l.match(/^nth\((\d+)\)$/);
							t ? (e.position = "nth", e.positionValue = parseInt(t[1], 10)) : e.position = l;
						}
						return e;
					}
					get length() {
						return this.segments.length;
					}
					hasDeepWildcard() {
						return this._hasDeepWildcard;
					}
					hasAttributeCondition() {
						return this._hasAttributeCondition;
					}
					hasPositionSelector() {
						return this._hasPositionSelector;
					}
					toString() {
						return this.pattern;
					}
				}
				class ot {
					constructor() {
						this._byDepthAndTag = /* @__PURE__ */ new Map(), this._wildcardByDepth = /* @__PURE__ */ new Map(), this._deepWildcards = [], this._deepByTerminalTag = /* @__PURE__ */ new Map(), this._patterns = /* @__PURE__ */ new Set(), this._sealed = !1;
					}
					add(t) {
						if (this._sealed) throw new TypeError("ExpressionSet is sealed. Create a new ExpressionSet to add more expressions.");
						if (this._patterns.has(t.pattern)) return this;
						if (this._patterns.add(t.pattern), t.hasDeepWildcard()) {
							const e = t.segments[t.segments.length - 1];
							if (e && "deep-wildcard" !== e.type && "*" !== e.tag) {
								const i = e.tag;
								this._deepByTerminalTag.has(i) || this._deepByTerminalTag.set(i, []), this._deepByTerminalTag.get(i).push(t);
							} else this._deepWildcards.push(t);
							return this;
						}
						const e = t.length, n = t.segments[t.segments.length - 1]?.tag;
						if (n && "*" !== n) {
							const i = `${e}:${n}`;
							this._byDepthAndTag.has(i) || this._byDepthAndTag.set(i, []), this._byDepthAndTag.get(i).push(t);
						} else this._wildcardByDepth.has(e) || this._wildcardByDepth.set(e, []), this._wildcardByDepth.get(e).push(t);
						return this;
					}
					addAll(t) {
						for (const e of t) this.add(e);
						return this;
					}
					has(t) {
						return this._patterns.has(t.pattern);
					}
					get size() {
						return this._patterns.size;
					}
					seal() {
						return this._sealed = !0, this;
					}
					get isSealed() {
						return this._sealed;
					}
					matchesAny(t) {
						return null !== this.findMatch(t);
					}
					findMatch(t) {
						const e = t.getDepth(), i = t.getCurrentTag(), n = `${e}:${i}`, r = this._byDepthAndTag.get(n);
						if (r) {
							for (let e = 0; e < r.length; e++) if (t.matches(r[e])) return r[e];
						}
						const s = this._wildcardByDepth.get(e);
						if (s) {
							for (let e = 0; e < s.length; e++) if (t.matches(s[e])) return s[e];
						}
						const o = this._deepByTerminalTag.get(i);
						if (o) {
							for (let e = 0; e < o.length; e++) if (t.matches(o[e])) return o[e];
						}
						for (let e = 0; e < this._deepWildcards.length; e++) if (t.matches(this._deepWildcards[e])) return this._deepWildcards[e];
						return null;
					}
				}
				const at = {
					cent: "¢",
					pound: "£",
					curren: "¤",
					yen: "¥",
					euro: "€",
					dollar: "$",
					fnof: "ƒ",
					inr: "₹",
					af: "؋",
					birr: "ብር",
					peso: "₱",
					rub: "₽",
					won: "₩",
					yuan: "¥",
					cedil: "¸"
				}, lt = {
					amp: "&",
					apos: "'",
					gt: ">",
					lt: "<",
					quot: "\""
				}, pt = {
					nbsp: "\xA0",
					copy: "©",
					reg: "®",
					trade: "™",
					mdash: "—",
					ndash: "–",
					hellip: "…",
					laquo: "«",
					raquo: "»",
					lsquo: "‘",
					rsquo: "’",
					ldquo: "“",
					rdquo: "”",
					bull: "•",
					para: "¶",
					sect: "§",
					deg: "°",
					frac12: "½",
					frac14: "¼",
					frac34: "¾"
				}, ct = Object.freeze({
					ALLOW: "allow",
					BLOCK: "block",
					THROW: "throw"
				}), ht = /* @__PURE__ */ new Set("!?\\\\/[]$%{}^&*()<>|+");
				function dt(t) {
					if ("#" === t[0]) throw new Error(`[EntityReplacer] Invalid character '#' in entity name: "${t}"`);
					for (const e of t) if (ht.has(e)) throw new Error(`[EntityReplacer] Invalid character '${e}' in entity name: "${t}"`);
					return t;
				}
				function ut(...t) {
					const e = Object.create(null);
					for (const i of t) if (i) for (const t of Object.keys(i)) {
						const n = i[t];
						if ("string" == typeof n) e[t] = n;
						else if (n && "object" == typeof n && void 0 !== n.val) {
							const i = n.val;
							"string" == typeof i && (e[t] = i);
						}
					}
					return e;
				}
				const ft = "external", gt = "base", mt = "all", xt = Object.freeze({
					allow: 0,
					leave: 1,
					remove: 2,
					throw: 3
				}), bt = /* @__PURE__ */ new Set([
					9,
					10,
					13
				]);
				class yt {
					constructor(t = {}) {
						var e;
						this._limit = t.limit || {}, this._maxTotalExpansions = this._limit.maxTotalExpansions || 0, this._maxExpandedLength = this._limit.maxExpandedLength || 0, this._postCheck = "function" == typeof t.postCheck ? t.postCheck : (t) => t, this._limitTiers = (e = this._limit.applyLimitsTo ?? ft) && e !== ft ? e === mt ? /* @__PURE__ */ new Set([mt]) : e === gt ? /* @__PURE__ */ new Set([gt]) : Array.isArray(e) ? new Set(e) : /* @__PURE__ */ new Set([ft]) : /* @__PURE__ */ new Set([ft]), this._numericAllowed = t.numericAllowed ?? !0, this._baseMap = ut(lt, t.namedEntities || null), this._externalMap = Object.create(null), this._inputMap = Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this._removeSet = new Set(t.remove && Array.isArray(t.remove) ? t.remove : []), this._leaveSet = new Set(t.leave && Array.isArray(t.leave) ? t.leave : []);
						const i = function(t) {
							if (!t) return {
								xmlVersion: 1,
								onLevel: xt.allow,
								nullLevel: xt.remove
							};
							const e = 1.1 === t.xmlVersion ? 1.1 : 1, i = xt[t.onNCR] ?? xt.allow, n = xt[t.nullNCR] ?? xt.remove;
							return {
								xmlVersion: e,
								onLevel: i,
								nullLevel: Math.max(n, xt.remove)
							};
						}(t.ncr);
						this._ncrXmlVersion = i.xmlVersion, this._ncrOnLevel = i.onLevel, this._ncrNullLevel = i.nullLevel, this._onExternalEntity = "function" == typeof t.onExternalEntity ? t.onExternalEntity : null, this._onInputEntity = "function" == typeof t.onInputEntity ? t.onInputEntity : null;
					}
					_applyRegistrationHook(t, e, i, n) {
						if (!t) return !0;
						const r = t(e, i);
						if (r === ct.BLOCK) return !1;
						if (r === ct.THROW) throw new Error(`[EntityDecoder] Registration of ${n} entity "&${e};" was rejected by hook`);
						return !0;
					}
					setExternalEntities(t) {
						if (t) for (const e of Object.keys(t)) dt(e);
						if (!this._onExternalEntity) return void (this._externalMap = ut(t));
						const e = ut(t), i = Object.create(null);
						for (const [t, n] of Object.entries(e)) this._applyRegistrationHook(this._onExternalEntity, t, n, "external") && (i[t] = n);
						this._externalMap = i;
					}
					addExternalEntity(t, e) {
						dt(t), "string" == typeof e && -1 === e.indexOf("&") && this._applyRegistrationHook(this._onExternalEntity, t, e, "external") && (this._externalMap[t] = e);
					}
					addInputEntities(t) {
						if (this._totalExpansions = 0, this._expandedLength = 0, !this._onInputEntity) return void (this._inputMap = ut(t));
						const e = ut(t), i = Object.create(null);
						for (const [t, n] of Object.entries(e)) this._applyRegistrationHook(this._onInputEntity, t, n, "input") && (i[t] = n);
						this._inputMap = i;
					}
					reset() {
						return this._inputMap = Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this;
					}
					setXmlVersion(t) {
						this._ncrXmlVersion = 1.1 === t ? 1.1 : 1;
					}
					decode(t) {
						if ("string" != typeof t || 0 === t.length) return t;
						if (-1 === t.indexOf("&")) return t;
						const e = t, i = [], n = t.length;
						let r = 0, s = 0;
						const o = this._maxTotalExpansions > 0, a = this._maxExpandedLength > 0, l = o || a;
						for (; s < n;) {
							if (38 !== t.charCodeAt(s)) {
								s++;
								continue;
							}
							let e = s + 1;
							for (; e < n && 59 !== t.charCodeAt(e) && e - s <= 32;) e++;
							if (e >= n || 59 !== t.charCodeAt(e)) {
								s++;
								continue;
							}
							const p = t.slice(s + 1, e);
							if (0 === p.length) {
								s++;
								continue;
							}
							let c, h;
							if (this._removeSet.has(p)) c = "", void 0 === h && (h = ft);
							else {
								if (this._leaveSet.has(p)) {
									s++;
									continue;
								}
								if (35 === p.charCodeAt(0)) {
									const t = this._resolveNCR(p);
									if (void 0 === t) {
										s++;
										continue;
									}
									c = t, h = gt;
								} else {
									const t = this._resolveName(p);
									c = t?.value, h = t?.tier;
								}
							}
							if (void 0 !== c) {
								if (s > r && i.push(t.slice(r, s)), i.push(c), r = e + 1, s = r, l && this._tierCounts(h)) {
									if (o && (this._totalExpansions++, this._totalExpansions > this._maxTotalExpansions)) throw new Error(`[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`);
									if (a) {
										const t = c.length - (p.length + 2);
										if (t > 0 && (this._expandedLength += t, this._expandedLength > this._maxExpandedLength)) throw new Error(`[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`);
									}
								}
							} else s++;
						}
						r < n && i.push(t.slice(r));
						const p = 0 === i.length ? t : i.join("");
						return this._postCheck(p, e);
					}
					_tierCounts(t) {
						return !!this._limitTiers.has(mt) || this._limitTiers.has(t);
					}
					_resolveName(t) {
						return t in this._inputMap ? {
							value: this._inputMap[t],
							tier: ft
						} : t in this._externalMap ? {
							value: this._externalMap[t],
							tier: ft
						} : t in this._baseMap ? {
							value: this._baseMap[t],
							tier: gt
						} : void 0;
					}
					_classifyNCR(t) {
						return 0 === t ? this._ncrNullLevel : t >= 55296 && t <= 57343 || 1 === this._ncrXmlVersion && t >= 1 && t <= 31 && !bt.has(t) ? xt.remove : -1;
					}
					_applyNCRAction(t, e, i) {
						switch (t) {
							case xt.allow: return String.fromCodePoint(i);
							case xt.remove: return "";
							case xt.leave: return;
							case xt.throw: throw new Error(`[EntityDecoder] Prohibited numeric character reference &${e}; (U+${i.toString(16).toUpperCase().padStart(4, "0")})`);
							default: return String.fromCodePoint(i);
						}
					}
					_resolveNCR(t) {
						const e = t.charCodeAt(1);
						let i;
						if (i = 120 === e || 88 === e ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10), Number.isNaN(i) || i < 0 || i > 1114111) return;
						const n = this._classifyNCR(i);
						if (!this._numericAllowed && n < xt.remove) return;
						const r = -1 === n ? this._ncrOnLevel : Math.max(this._ncrOnLevel, n);
						return this._applyNCRAction(r, t, i);
					}
				}
				const Nt = [
					{
						id: "sql-block-comment-open",
						description: "SQL block comment open: /* ... */ — unusual in legitimate user text",
						pattern: /\/\*/
					},
					{
						id: "sql-union-select",
						description: "UNION SELECT — most common SQL injection aggregation attack",
						pattern: /\bUNION\s{1,20}(?:ALL\s{1,20})?SELECT\b/i
					},
					{
						id: "sql-drop-table",
						description: "DROP TABLE — destructive DDL injection",
						pattern: /\bDROP\s{1,20}TABLE\b/i
					},
					{
						id: "sql-drop-database",
						description: "DROP DATABASE — destructive DDL injection",
						pattern: /\bDROP\s{1,20}DATABASE\b/i
					},
					{
						id: "sql-insert-into",
						description: "INSERT INTO — data injection",
						pattern: /\bINSERT\s{1,20}INTO\b/i
					},
					{
						id: "sql-delete-from",
						description: "DELETE FROM — data deletion injection",
						pattern: /\bDELETE\s{1,20}FROM\b/i
					},
					{
						id: "sql-update-set",
						description: "UPDATE ... SET — data modification injection",
						pattern: /\bUPDATE\b[\s\S]{1,60}\bSET\b/i
					},
					{
						id: "sql-exec-xp",
						description: "EXEC xp_ — MSSQL extended stored procedure execution",
						pattern: /\bEXEC(?:UTE)?\s{1,20}xp_/i
					},
					{
						id: "sql-tautology-string",
						description: "Classic string tautology: ' OR '1'='1 or \" OR \"1\"=\"1\"",
						pattern: /'\s{0,10}OR\s{0,10}'[^']{0,20}'\s*=\s*'[^']{0,20}/i
					},
					{
						id: "sql-tautology-numeric",
						description: "Numeric tautology: OR 1=1",
						pattern: /\bOR\s{1,10}1\s*=\s*1\b/i
					},
					{
						id: "sql-always-true-zero",
						description: "Numeric tautology: OR 0=0",
						pattern: /\bOR\s{1,10}0\s*=\s*0\b/i
					},
					{
						id: "sql-sleep-benchmark",
						description: "Time-based blind injection: SLEEP() or BENCHMARK()",
						pattern: /\b(?:SLEEP|BENCHMARK)\s*\(/i
					},
					{
						id: "sql-waitfor-delay",
						description: "MSSQL time-based blind injection: WAITFOR DELAY",
						pattern: /\bWAITFOR\s{1,20}DELAY\b/i
					},
					{
						id: "sql-char-function",
						description: "CHAR() function — used to obfuscate injected strings",
						pattern: /\bCHAR\s*\(\s*\d{1,3}/i
					},
					{
						id: "sql-information-schema",
						description: "INFORMATION_SCHEMA — reconnaissance query for table/column enumeration",
						pattern: /\bINFORMATION_SCHEMA\b/i
					}
				], Et = [
					...Nt,
					{
						id: "sql-line-comment",
						description: "SQL line comment: -- followed by whitespace or end of string",
						pattern: /--(?:\s|$)/
					},
					{
						id: "sql-stacked-query",
						description: "Stacked queries: semicolon immediately followed by a SQL keyword",
						pattern: /;\s{0,10}(?:SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b/i
					},
					{
						id: "sql-hex-encoding",
						description: "Hex-encoded string injection: 0x41414141 style (MySQL)",
						pattern: /\b0x[0-9a-f]{4,}/i
					}
				], wt = [
					{
						id: "html-script-open",
						description: "<script opening tag",
						pattern: /<script[\s>/]/i
					},
					{
						id: "html-script-close",
						description: "<\/script closing tag",
						pattern: /<\/script[\s>]/i
					},
					{
						id: "html-javascript-protocol",
						description: "javascript: URI scheme (with optional whitespace/encoding)",
						pattern: /j[\t\n\r ]*a[\t\n\r ]*v[\t\n\r ]*a[\t\n\r ]*s[\t\n\r ]*c[\t\n\r ]*r[\t\n\r ]*i[\t\n\r ]*p[\t\n\r ]*t[\t\n\r ]*:/i
					},
					{
						id: "html-vbscript-protocol",
						description: "vbscript: URI scheme",
						pattern: /vbscript[\t\n\r ]*:/i
					},
					{
						id: "html-data-html",
						description: "data:text/html URI — can execute scripts in browsers",
						pattern: /data[\t\n\r ]*:[\t\n\r ]*text\/html/i
					},
					{
						id: "html-data-xhtml",
						description: "data:application/xhtml+xml URI",
						pattern: /data[\t\n\r ]*:[\t\n\r ]*application\/xhtml/i
					},
					{
						id: "html-data-svg",
						description: "data:image/svg+xml URI — can execute scripts",
						pattern: /data[\t\n\r ]*:[\t\n\r ]*image\/svg\+xml/i
					},
					{
						id: "html-inline-event-handler",
						description: "Inline event handler attributes: onclick=, onerror=, onload=, etc.",
						pattern: /\bon\w{1,30}\s*=/i
					},
					{
						id: "html-entity-obfuscated-script",
						description: "HTML-entity-encoded <script (e.g. &#x3C;script or &lt;script)",
						pattern: /(?:&#x0*3[Cc];?|&#0*60;?|&lt;)\s*script/i
					},
					{
						id: "html-entity-obfuscated-javascript",
						description: "HTML-entity-encoded javascript: (partial — catches common &#106; or &#x6a; for \"j\")",
						pattern: /(?:&#x0*6[Aa];?|&#0*106;?)\s*(?:&#x0*61;?|a)[\s\S]{0,80}script\s*:/i
					},
					{
						id: "html-style-expression",
						description: "CSS expression() — IE-era code execution in style attributes",
						pattern: /style[\s\S]{0,20}expression\s*\(/i
					},
					{
						id: "html-object-embed",
						description: "<object or <embed tags that can load active content",
						pattern: /<(?:object|embed)[\s>/]/i
					},
					{
						id: "html-base-tag",
						description: "<base href= — can hijack all relative URLs on a page",
						pattern: /<base[\s>]/i
					},
					{
						id: "html-meta-refresh",
						description: "<meta http-equiv=\"refresh\" — can redirect users",
						pattern: /<meta[\s\S]{0,40}http-equiv[\s\S]{0,20}refresh/i
					},
					{
						id: "html-srcdoc",
						description: "srcdoc= attribute on iframes — embeds HTML that can run scripts",
						pattern: /srcdoc\s*=/i
					},
					{
						id: "html-iframe",
						description: "<iframe tag",
						pattern: /<iframe[\s>/]/i
					},
					{
						id: "html-form",
						description: "<form tag — can be used for phishing / credential harvesting injection",
						pattern: /<form[\s>/]/i
					}
				], vt = [
					{
						id: "xml-cdata-injection",
						description: "CDATA section injection: <![CDATA[ breaks out of text node context",
						pattern: /<!\[CDATA\[/i
					},
					{
						id: "xml-cdata-close",
						description: "CDATA close sequence: ]]> can terminate an enclosing CDATA section",
						pattern: /\]\]>/
					},
					{
						id: "xml-processing-instruction",
						description: "XML processing instruction: <?xml-stylesheet or <?php etc.",
						pattern: /<\?(?:xml[\- ]|php|asp)/i
					},
					{
						id: "xml-doctype-injection",
						description: "DOCTYPE declaration embedded in content — can define entities",
						pattern: /<!DOCTYPE(?:[\s[]|$)/i
					},
					{
						id: "xml-entity-system",
						description: "SYSTEM keyword — used in external entity declarations (XXE)",
						pattern: /\bSYSTEM\s+["']/i
					},
					{
						id: "xml-entity-public",
						description: "PUBLIC keyword — used in external entity declarations (XXE)",
						pattern: /\bPUBLIC\s+["']/i
					},
					{
						id: "xml-entity-declaration",
						description: "<!ENTITY declaration — defines entities, potential XXE or entity expansion",
						pattern: /<!ENTITY[\s%]/i
					},
					{
						id: "xml-billion-laughs",
						description: "Entity reference chaining / billion laughs: repeated &eX; style references",
						pattern: /(?:&\w{1,20};){3,}/
					},
					{
						id: "xml-namespace-confusion",
						description: "xmlns: attribute injection — can redefine namespaces to confuse parsers",
						pattern: /\bxmlns\s*(?::\w{1,40})?\s*=/i
					},
					{
						id: "xml-comment-injection",
						description: "<!-- comment injection — can hide content from some parsers",
						pattern: /<!--/
					},
					{
						id: "xml-comment-close",
						description: "--> closes an enclosing XML comment",
						pattern: /-->/
					},
					{
						id: "xml-pi-close",
						description: "?> closes an enclosing processing instruction",
						pattern: /\?>/
					}
				], St = [
					{
						id: "svg-script-element",
						description: "<script element inside SVG executes JavaScript",
						pattern: /<script[\s>/]/i
					},
					{
						id: "svg-xlink-href-javascript",
						description: "xlink:href with javascript: — classic SVG XSS via <a> or <use>",
						pattern: /xlink\s*:\s*href\s*=\s*["']?\s*javascript\s*:/i
					},
					{
						id: "svg-href-javascript",
						description: "href= with javascript: in SVG context (<a>, <animate>, etc.)",
						pattern: /href\s*=\s*["']?\s*javascript\s*:/i
					},
					{
						id: "svg-foreignobject",
						description: "<foreignObject embeds HTML inside SVG — can execute scripts",
						pattern: /<foreignObject[\s>/]/i
					},
					{
						id: "svg-use-external",
						description: "<use xlink:href or href pointing to external resource (non-fragment URL)",
						pattern: /<use[\s\S]{0,60}(?:xlink\s*:\s*)?href\s*=\s*(?:["'][^#]|[^"'#\s>])/i
					},
					{
						id: "svg-animate-href",
						description: "<animate attributeName=\"href\" — can dynamically change href to javascript:",
						pattern: /<animate[\s\S]{0,80}attributeName\s*=\s*["'][\s]*href["']/i
					},
					{
						id: "svg-animate-xlinkhref",
						description: "<animate attributeName=\"xlink:href\"",
						pattern: /<animate[\s\S]{0,80}attributeName\s*=\s*["'][\s]*xlink\s*:\s*href["']/i
					},
					{
						id: "svg-set-javascript",
						description: "<set to=\"javascript:...\" — sets an attribute to a javascript: URI",
						pattern: /<set[\s\S]{0,80}to\s*=\s*["']?\s*javascript\s*:/i
					},
					{
						id: "svg-event-handler",
						description: "SVG-specific event handler attributes: onload=, onerror=, onactivate=, etc.",
						pattern: /\bon(?:load|error|activate|begin|end|repeat|focus|blur|click|mouse\w{1,20}|key\w{1,20})\s*=/i
					},
					{
						id: "svg-handler-generic",
						description: "Generic on* handler catch-all for SVG attributes",
						pattern: /\bon\w{1,30}\s*=/i
					},
					{
						id: "svg-filter-feimage",
						description: "<feImage href= — filter primitive that can load external resources",
						pattern: /<feImage[\s\S]{0,80}(?:xlink\s*:\s*)?href\s*=/i
					},
					{
						id: "svg-image-external",
						description: "<image xlink:href with http/https or javascript protocol",
						pattern: /<image[\s\S]{0,80}(?:xlink\s*:\s*)?href\s*=\s*["']?\s*(?:https?|javascript)\s*:/i
					},
					{
						id: "svg-style-javascript",
						description: "style= attribute containing javascript: (e.g. background:url(javascript:...))",
						pattern: /style\s*=[\s\S]{0,60}javascript\s*:/i
					}
				], At = [
					{
						id: "shell-path-traversal-unix",
						description: "Unix path traversal: ../  — climbing the directory tree",
						pattern: /\.\.\//
					},
					{
						id: "shell-path-traversal-windows",
						description: "Windows path traversal: ..\\ — climbing the directory tree",
						pattern: /\.\.\\/
					},
					{
						id: "shell-path-traversal-encoded",
						description: "URL-encoded path traversal: %2e%2e or %2f variants",
						pattern: /%2e%2e|%2f\.\.|\.\.%2f/i
					},
					{
						id: "shell-null-byte",
						description: "Null byte injection: \\x00 or %00 — truncates strings in C-backed functions",
						pattern: /\x00|%00/
					},
					{
						id: "shell-semicolon",
						description: "Semicolon command separator: cmd1; cmd2",
						pattern: /;/
					},
					{
						id: "shell-pipe",
						description: "Pipe operator: cmd1 | cmd2",
						pattern: /\|/
					},
					{
						id: "shell-and-operator",
						description: "AND operator: cmd1 && cmd2",
						pattern: /&&/
					},
					{
						id: "shell-or-operator",
						description: "OR operator: cmd1 || cmd2",
						pattern: /\|\|/
					},
					{
						id: "shell-backtick",
						description: "Backtick command substitution: `cmd`",
						pattern: /`/
					},
					{
						id: "shell-dollar-paren",
						description: "Dollar-paren command substitution: $(cmd)",
						pattern: /\$\(/
					},
					{
						id: "shell-dollar-brace",
						description: "Dollar-brace variable expansion: ${var} — can be abused for injection",
						pattern: /\$\{/
					},
					{
						id: "shell-redirect-out",
						description: "Output redirection: cmd > file or cmd >> file",
						pattern: />{1,2}/
					},
					{
						id: "shell-redirect-in",
						description: "Input redirection: cmd < file",
						pattern: /</
					},
					{
						id: "shell-newline-injection",
						description: "Newline injection: \\n or \\r — can inject new shell commands",
						pattern: /[\n\r]/
					},
					{
						id: "shell-glob-star",
						description: "Glob expansion: * or ? — can expand to unintended files",
						pattern: /[/\\][*?]/
					},
					{
						id: "shell-absolute-root",
						description: "Absolute root path injection: string starting with / or \\ (Windows UNC)",
						pattern: /^(?:\/|\\\\)/
					},
					{
						id: "shell-windows-drive",
						description: "Windows drive letter path injection: C:\\ or D:/",
						pattern: /^[a-zA-Z]:[/\\]/
					},
					{
						id: "shell-curl-wget",
						description: "curl/wget with URL or flags — can exfiltrate data or download payloads",
						pattern: /\b(?:curl|wget)\s+(?:https?:\/\/|ftp:\/\/|-)/i
					}
				], Tt = [
					{
						id: "redos-nested-quantifier-plus",
						description: "Nested + quantifier inside a group with outer quantifier: (a+)+, (.+b)*, etc.",
						pattern: /\([^)]*\+[^)]*\)[+*]/
					},
					{
						id: "redos-nested-quantifier-star",
						description: "Nested * quantifier: (a*)* or (a*)+ — catastrophic backtracking",
						pattern: /\([^)]*\*[^)]*\)[*+]/
					},
					{
						id: "redos-nested-groups",
						description: "Doubly nested quantified groups: ((a+)+) — guaranteed catastrophic",
						pattern: /\(\([^)]{0,40}\)[+*]\)[+*]/
					},
					{
						id: "redos-alternation-overlap",
						description: "Overlapping alternation under quantifier: (a|a)+ — ambiguous NFA paths",
						pattern: /\(([^|()]{1,20})\|(?:\1)(?:\|[^|()]{1,20}){0,5}\)[+*?]{1,2}/
					},
					{
						id: "redos-star-plus-concat",
						description: "(x*x)+ pattern — triggers super-linear backtracking",
						pattern: /\([^)]{0,10}\*[^)]{0,10}\)[+*]/
					},
					{
						id: "redos-dot-star-greedy",
						description: "(.*){n,} or (.+){n,} — repeated greedy dot quantifiers",
						pattern: /\(\.[*+]\)\{?\d/
					},
					{
						id: "redos-large-repetition",
						description: "Very large fixed or range repetition count {1000,} or {1000,n} — denial of service via backtracking",
						pattern: /\{\d{4,}(?:,\d*)?\}/
					},
					{
						id: "redos-catastrophic-alternation",
						description: "Long alternation with many similar branches — polynomial backtracking risk",
						pattern: /\([^)]{0,200}(?:\|[^|)]{0,50}){9,}\)/
					}
				], _t = "[\"'\\s]*:", Ct = [
					{
						id: "nosql-where-operator",
						description: "$where — executes arbitrary JavaScript server-side in MongoDB",
						pattern: new RegExp(`\\$where${_t}`, "i")
					},
					{
						id: "nosql-ne-operator",
						description: "$ne — \"not equal\" operator used to bypass equality checks",
						pattern: new RegExp(`\\$ne${_t}`, "i")
					},
					{
						id: "nosql-gt-operator",
						description: "$gt — \"greater than\" used to bypass password/value checks",
						pattern: new RegExp(`\\$gte?${_t}`, "i")
					},
					{
						id: "nosql-lt-operator",
						description: "$lt / $lte — \"less than\" bypass variants",
						pattern: new RegExp(`\\$lte?${_t}`, "i")
					},
					{
						id: "nosql-regex-operator",
						description: "$regex — can be used to extract data character by character (blind injection)",
						pattern: new RegExp(`\\$regex${_t}`, "i")
					},
					{
						id: "nosql-or-operator",
						description: "$or — logical OR; used to create always-true conditions",
						pattern: new RegExp(`\\$or${_t}\\s*\\[`, "i")
					},
					{
						id: "nosql-and-operator",
						description: "$and — logical AND operator injection",
						pattern: new RegExp(`\\$and${_t}\\s*\\[`, "i")
					},
					{
						id: "nosql-nor-operator",
						description: "$nor — logical NOR operator injection",
						pattern: new RegExp(`\\$nor${_t}\\s*\\[`, "i")
					},
					{
						id: "nosql-exists-operator",
						description: "$exists — can enumerate fields to determine schema",
						pattern: new RegExp(`\\$exists${_t}`, "i")
					},
					{
						id: "nosql-in-operator",
						description: "$in — matches any value in a list; can enumerate values",
						pattern: new RegExp(`\\$in${_t}\\s*\\[`, "i")
					},
					{
						id: "nosql-expr-operator",
						description: "$expr — allows aggregation expressions in queries (MongoDB 3.6+)",
						pattern: new RegExp(`\\$expr${_t}`, "i")
					},
					{
						id: "nosql-function-operator",
						description: "$function — executes arbitrary JavaScript in MongoDB 4.4+",
						pattern: new RegExp(`\\$function${_t}`, "i")
					},
					{
						id: "nosql-accumulator-operator",
						description: "$accumulator — custom aggregation with arbitrary JS execution",
						pattern: new RegExp(`\\$accumulator${_t}`, "i")
					},
					{
						id: "nosql-proto-pollution",
						description: "__proto__ — prototype pollution via object key injection",
						pattern: /__proto__/
					},
					{
						id: "nosql-constructor-prototype",
						description: "constructor.prototype — alternative prototype pollution vector (dot notation or JSON key)",
						pattern: /constructor[\s"':.,{\[]*prototype/i
					},
					{
						id: "nosql-proto-bracket",
						description: "[\"__proto__\"] — bracket-notation prototype pollution",
						pattern: /\[["']__proto__["']\]/
					}
				], $t = [
					{
						id: "log-crlf-injection",
						description: "CRLF injection: literal \\r or \\n embeds fake log lines",
						pattern: /[\r\n]/
					},
					{
						id: "log-url-encoded-crlf",
						description: "URL-encoded CRLF: %0d, %0a, %0D, %0A — decoded by some log parsers",
						pattern: /%0[dDaA]/
					},
					{
						id: "log-unicode-newline",
						description: "Unicode newline variants: U+2028 (line separator), U+2029 (paragraph separator)",
						pattern: /[\u2028\u2029]/
					},
					{
						id: "log-log4shell-jndi",
						description: "Log4Shell: ${jndi:...} triggers remote code execution in Apache Log4j",
						pattern: /\$\{jndi\s*:/i
					},
					{
						id: "log-log4shell-obfuscated",
						description: "Obfuscated Log4Shell: ${::-j}... lookup-bypass prefix used to evade WAF detection",
						pattern: /\$\{::-/
					},
					{
						id: "log-log4j-lookup",
						description: "Log4j lookup syntax: ${env:...}, ${sys:...}, ${ctx:...} — data exfiltration",
						pattern: /\$\{(?:env|sys|ctx|main|map|sd|web|docker|k8s|spring)\s*:/i
					},
					{
						id: "log-ssti-double-brace",
						description: "SSTI double-brace: {{expression}} — Jinja2, Twig, Handlebars, etc.",
						pattern: /\{\{[\s\S]{0,80}\}\}/
					},
					{
						id: "log-ssti-hash-brace",
						description: "SSTI hash-brace: #{expression} — Thymeleaf, Velocity, Ruby ERB",
						pattern: /#\{[\s\S]{0,80}\}/
					},
					{
						id: "log-ssti-dollar-brace",
						description: "SSTI/EL injection: ${expression with operators or method calls} — JSP EL, Freemarker, SpEL",
						pattern: /\$\{[^}]*(?:\.|\(|\*|\+|\bclass\b|\bruntime\b|\bprocess\b|\bexec\b)[^}]{0,80}\}/i
					},
					{
						id: "log-ssti-percent-tag",
						description: "SSTI ERB/ASP tag: <%= expression %> — Ruby ERB, ASP",
						pattern: /<%=[\s\S]{0,80}%>/
					},
					{
						id: "log-null-byte",
						description: "Null byte: \\x00 or %00 — can truncate log entries in C-backed loggers",
						pattern: /\x00|%00/
					},
					{
						id: "log-ansi-escape",
						description: "ANSI escape sequence: ESC[ — can manipulate terminal output when logs are tailed",
						pattern: /\x1b\[/
					}
				];
				function Pt(t, e) {
					const i = e.label ?? "CUSTOM";
					for (const n of e) if (n.pattern.test(t)) return {
						context: i,
						id: n.id,
						description: n.description,
						pattern: n.pattern
					};
					return null;
				}
				function Ot(t, e) {
					(function(t) {
						if ("string" != typeof t) throw new TypeError("is-unsafe: first argument must be a string, got " + typeof t);
					})(t), function(t) {
						if (!(t instanceof RegExp)) {
							if (!Array.isArray(t)) throw new TypeError("is-unsafe: second argument must be a PatternList (e.g. HTML), an array of PatternLists (e.g. [HTML, XML]), or a RegExp. Got: " + typeof t);
							if (0 === t.length) throw new TypeError("is-unsafe: context must not be an empty array");
							if (Array.isArray(t[0])) {
								for (const e of t) if (!Array.isArray(e) || 0 === e.length) throw new TypeError("is-unsafe: each context in the array must be a non-empty pattern array (PatternList)");
							}
						}
					}(e);
					const { lists: i, regex: n } = function(t) {
						return t instanceof RegExp ? {
							lists: null,
							regex: t
						} : Array.isArray(t[0]) ? {
							lists: t,
							regex: null
						} : {
							lists: [t],
							regex: null
						};
					}(e);
					if (n) return n.test(t);
					for (const e of i) if (null !== Pt(t, e)) return !0;
					return !1;
				}
				function jt(t, e) {
					if (!t) return {};
					const i = e.attributesGroupName ? t[e.attributesGroupName] : t;
					if (!i) return {};
					const n = {};
					for (const t in i) t.startsWith(e.attributeNamePrefix) ? n[t.substring(e.attributeNamePrefix.length)] = i[t] : n[t] = i[t];
					return n;
				}
				function It(t) {
					if (!t || "string" != typeof t) return;
					const e = t.indexOf(":");
					if (-1 !== e && e > 0) {
						const i = t.substring(0, e);
						if ("xmlns" !== i) return i;
					}
				}
				wt.label = "HTML", vt.label = "XML", St.label = "SVG", Nt.label = "SQL", Et.label = "SQL-STRICT", At.label = "SHELL", Tt.label = "REDOS", Ct.label = "NOSQL", $t.label = "LOG", Object.freeze({
					HTML: wt,
					XML: vt,
					SVG: St,
					SQL: Nt,
					"SQL-STRICT": Et,
					SHELL: At,
					REDOS: Tt,
					NOSQL: Ct,
					LOG: $t
				});
				class kt {
					constructor(t, e) {
						var i;
						this.options = t, this.currentNode = null, this.tagsNodeStack = [], this.parseXml = Vt, this.parseTextData = Lt, this.resolveNameSpace = Dt, this.buildAttributesMap = Mt, this.isItStopNode = Bt, this.replaceEntitiesValue = Ft, this.readStopNodeData = zt, this.saveTextToParentTag = Ut, this.addChild = qt, this.ignoreAttributesFn = "function" == typeof (i = this.options.ignoreAttributes) ? i : Array.isArray(i) ? (t) => {
							for (const e of i) {
								if ("string" == typeof e && t === e) return !0;
								if (e instanceof RegExp && e.test(t)) return !0;
							}
						} : () => !1, this.entityExpansionCount = 0, this.currentExpandedLength = 0, this.doctypefound = !1;
						let n = { ...lt };
						this.options.entityDecoder ? this.entityDecoder = this.options.entityDecoder : ("object" == typeof this.options.htmlEntities ? n = this.options.htmlEntities : !0 === this.options.htmlEntities && (n = {
							...pt,
							...at
						}), this.entityDecoder = new yt({
							namedEntities: {
								...n,
								...e
							},
							numericAllowed: this.options.htmlEntities,
							limit: {
								maxTotalExpansions: this.options.processEntities.maxTotalExpansions,
								maxExpandedLength: this.options.processEntities.maxExpandedLength,
								applyLimitsTo: this.options.processEntities.appliesTo
							},
							onInputEntity: (t, e) => Ot(e, [wt, vt]) ? ct.BLOCK : ct.ALLOW
						})), this.matcher = new rt(), this.readonlyMatcher = this.matcher.readOnly(), this.isCurrentNodeStopNode = !1, this.stopNodeExpressionsSet = new ot();
						const r = this.options.stopNodes;
						if (r && r.length > 0) {
							for (let t = 0; t < r.length; t++) {
								const e = r[t];
								"string" == typeof e ? this.stopNodeExpressionsSet.add(new st(e)) : e instanceof st && this.stopNodeExpressionsSet.add(e);
							}
							this.stopNodeExpressionsSet.seal();
						}
					}
				}
				function Lt(t, e, i, n, r, s, o) {
					const a = this.options;
					if (void 0 !== t && (a.trimValues && !n && (t = t.trim()), t.length > 0)) {
						o || (t = this.replaceEntitiesValue(t, e, i));
						const n = a.jPath ? i.toString() : i, l = a.tagValueProcessor(e, t, n, r, s);
						return null == l ? t : typeof l != typeof t || l !== t ? l : a.trimValues || t.trim() === t ? Yt(t, a.parseTagValue, a.numberParseOptions) : t;
					}
				}
				function Dt(t) {
					if (this.options.removeNSPrefix) {
						const e = t.split(":"), i = "/" === t.charAt(0) ? "/" : "";
						if ("xmlns" === e[0]) return "";
						2 === e.length && (t = i + e[1]);
					}
					return t;
				}
				const Rt = /* @__PURE__ */ new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?", "gm");
				function Mt(t, e, i, n = !1) {
					const s = this.options;
					if (!0 === n || !0 !== s.ignoreAttributes && "string" == typeof t) {
						const n = r(t, Rt), o = n.length, a = {}, l = new Array(o);
						let p = !1;
						const c = {};
						for (let t = 0; t < o; t++) {
							const e = this.resolveNameSpace(n[t][1]), r = n[t][4];
							if (e.length && void 0 !== r) {
								let n = r;
								s.trimValues && (n = n.trim()), n = this.replaceEntitiesValue(n, i, this.readonlyMatcher), l[t] = n, c[e] = n, p = !0;
							}
						}
						p && "object" == typeof e && e.updateCurrent && e.updateCurrent(c);
						const h = s.jPath ? e.toString() : this.readonlyMatcher;
						let d = !1;
						for (let t = 0; t < o; t++) {
							const e = this.resolveNameSpace(n[t][1]);
							if (this.ignoreAttributesFn(e, h)) continue;
							let i = s.attributeNamePrefix + e;
							if (e.length) if (s.transformAttributeName && (i = s.transformAttributeName(i)), i = Qt(i, s), void 0 !== n[t][4]) {
								const n = l[t], r = s.attributeValueProcessor(e, n, h);
								a[i] = null == r ? n : typeof r != typeof n || r !== n ? r : Yt(n, s.parseAttributeValue, s.numberParseOptions), d = !0;
							} else s.allowBooleanAttributes && (a[i] = !0, d = !0);
						}
						if (!d) return;
						if (s.attributesGroupName && !s.preserveOrder) {
							const t = {};
							return t[s.attributesGroupName] = a, t;
						}
						return a;
					}
				}
				const Vt = function(t) {
					t = t.replace(/\r\n?/g, "\n");
					const e = new P("!xml");
					let i = e, n = "";
					this.matcher.reset(), this.entityDecoder.reset(), this.entityExpansionCount = 0, this.currentExpandedLength = 0, this.doctypefound = !1;
					const r = this.options, s = new q(r.processEntities), o = t.length;
					for (let a = 0; a < o; a++) if ("<" === t[a]) {
						const l = t.charCodeAt(a + 1);
						if (47 === l) {
							const e = Gt(t, ">", a, "Closing Tag is not closed.");
							let s = t.substring(a + 2, e).trim();
							if (r.removeNSPrefix) {
								const t = s.indexOf(":");
								-1 !== t && (s = s.substr(t + 1));
							}
							s = Ht(r.transformTagName, s, "", r).tagName, i && (n = this.saveTextToParentTag(n, i, this.readonlyMatcher));
							const o = this.matcher.getCurrentTag();
							if (s && r.unpairedTagsSet.has(s)) throw new Error(`Unpaired tag can not be used as closing tag: </${s}>`);
							o && r.unpairedTagsSet.has(o) && (this.matcher.pop(), this.tagsNodeStack.pop()), this.matcher.pop(), this.isCurrentNodeStopNode = !1, i = this.tagsNodeStack.pop(), n = "", a = e;
						} else if (63 === l) {
							let e = Wt(t, a, !1, "?>");
							if (!e) throw new Error("Pi Tag is not closed.");
							n = this.saveTextToParentTag(n, i, this.readonlyMatcher);
							const o = this.buildAttributesMap(e.tagExp, this.matcher, e.tagName, !0);
							if (o) {
								const t = o[this.options.attributeNamePrefix + "version"];
								this.entityDecoder.setXmlVersion(Number(t) || 1), s.setXmlVersion(Number(t) || 1);
							}
							if (r.ignoreDeclaration && "?xml" === e.tagName || r.ignorePiTags);
							else {
								const t = new P(e.tagName);
								t.add(r.textNodeName, ""), e.tagName !== e.tagExp && e.attrExpPresent && !0 !== r.ignoreAttributes && (t[":@"] = o), this.addChild(i, t, this.readonlyMatcher, a);
							}
							a = e.closeIndex + 1;
						} else if (33 === l && 45 === t.charCodeAt(a + 2) && 45 === t.charCodeAt(a + 3)) {
							const e = Gt(t, "-->", a + 4, "Comment is not closed.");
							if (r.commentPropName) {
								const s = t.substring(a + 4, e - 2);
								n = this.saveTextToParentTag(n, i, this.readonlyMatcher), i.add(r.commentPropName, [{ [r.textNodeName]: s }]);
							}
							a = e;
						} else if (33 === l && 68 === t.charCodeAt(a + 2)) {
							if (this.doctypefound) throw new Error("Multiple DOCTYPE declarations found.");
							this.doctypefound = !0;
							const e = s.readDocType(t, a);
							this.entityDecoder.addInputEntities(e.entities), a = e.i;
						} else if (33 === l && 91 === t.charCodeAt(a + 2)) {
							const e = Gt(t, "]]>", a, "CDATA is not closed.") - 2, s = t.substring(a + 9, e);
							n = this.saveTextToParentTag(n, i, this.readonlyMatcher);
							let o = this.parseTextData(s, i.tagname, this.readonlyMatcher, !0, !1, !0, !0);
							o ??= "", r.cdataPropName ? i.add(r.cdataPropName, [{ [r.textNodeName]: s }]) : i.add(r.textNodeName, o), a = e + 2;
						} else {
							let s = Wt(t, a, r.removeNSPrefix);
							if (!s) {
								const e = t.substring(Math.max(0, a - 50), Math.min(o, a + 50));
								throw new Error(`readTagExp returned undefined at position ${a}. Context: "${e}"`);
							}
							let l = s.tagName;
							const p = s.rawTagName;
							let c = s.tagExp, h = s.attrExpPresent, d = s.closeIndex;
							if ({tagName: l, tagExp: c} = Ht(r.transformTagName, l, c, r), r.strictReservedNames && (l === r.commentPropName || l === r.cdataPropName || l === r.textNodeName || l === r.attributesGroupName)) throw new Error(`Invalid tag name: ${l}`);
							i && n && "!xml" !== i.tagname && (n = this.saveTextToParentTag(n, i, this.readonlyMatcher, !1));
							const u = i;
							u && r.unpairedTagsSet.has(u.tagname) && (i = this.tagsNodeStack.pop(), this.matcher.pop());
							let f = !1;
							c.length > 0 && c.lastIndexOf("/") === c.length - 1 && (f = !0, "/" === l[l.length - 1] ? (l = l.substr(0, l.length - 1), c = l) : c = c.substr(0, c.length - 1), h = l !== c);
							let g, m = null;
							g = It(p), l !== e.tagname && this.matcher.push(l, {}, g), l !== c && h && (m = this.buildAttributesMap(c, this.matcher, l), m && jt(m, r)), l !== e.tagname && (this.isCurrentNodeStopNode = this.isItStopNode());
							const b = a;
							if (this.isCurrentNodeStopNode) {
								let e = "";
								if (f) a = s.closeIndex;
								else if (r.unpairedTagsSet.has(l)) a = s.closeIndex;
								else {
									const i = this.readStopNodeData(t, p, d + 1);
									if (!i) throw new Error(`Unexpected end of ${p}`);
									a = i.i, e = i.tagContent;
								}
								const n = new P(l);
								m && (n[":@"] = m), n.add(r.textNodeName, e), this.matcher.pop(), this.isCurrentNodeStopNode = !1, this.addChild(i, n, this.readonlyMatcher, b);
							} else {
								if (f) {
									({tagName: l, tagExp: c} = Ht(r.transformTagName, l, c, r));
									const t = new P(l);
									m && (t[":@"] = m), this.addChild(i, t, this.readonlyMatcher, b), this.matcher.pop(), this.isCurrentNodeStopNode = !1;
								} else {
									if (r.unpairedTagsSet.has(l)) {
										const t = new P(l);
										m && (t[":@"] = m), this.addChild(i, t, this.readonlyMatcher, b), this.matcher.pop(), this.isCurrentNodeStopNode = !1, a = s.closeIndex;
										continue;
									}
									{
										const t = new P(l);
										if (this.tagsNodeStack.length > r.maxNestedTags) throw new Error("Maximum nested tags exceeded");
										this.tagsNodeStack.push(i), m && (t[":@"] = m), this.addChild(i, t, this.readonlyMatcher, b), i = t;
									}
								}
								n = "", a = d;
							}
						}
					} else n += t[a];
					return e.child;
				};
				function qt(t, e, i, n) {
					this.options.captureMetaData || (n = void 0);
					const r = this.options.jPath ? i.toString() : i, s = this.options.updateTag(e.tagname, r, e[":@"]);
					!1 === s || ("string" == typeof s ? (e.tagname = s, t.addChild(e, n)) : t.addChild(e, n));
				}
				function Ft(t, e, i) {
					const n = this.options.processEntities;
					if (!n || !n.enabled) return t;
					if (n.allowedTags) {
						const r = this.options.jPath ? i.toString() : i;
						if (!(Array.isArray(n.allowedTags) ? n.allowedTags.includes(e) : n.allowedTags(e, r))) return t;
					}
					if (n.tagFilter) {
						const r = this.options.jPath ? i.toString() : i;
						if (!n.tagFilter(e, r)) return t;
					}
					return this.entityDecoder.decode(t);
				}
				function Ut(t, e, i, n) {
					return t && (void 0 === n && (n = 0 === e.child.length), void 0 !== (t = this.parseTextData(t, e.tagname, i, !1, !!e[":@"] && 0 !== Object.keys(e[":@"]).length, n)) && "" !== t && e.add(this.options.textNodeName, t), t = ""), t;
				}
				function Bt() {
					return 0 !== this.stopNodeExpressionsSet.size && this.matcher.matchesAny(this.stopNodeExpressionsSet);
				}
				function Gt(t, e, i, n) {
					const r = t.indexOf(e, i);
					if (-1 === r) throw new Error(n);
					return r + e.length - 1;
				}
				function Xt(t, e, i, n) {
					const r = t.indexOf(e, i);
					if (-1 === r) throw new Error(n);
					return r;
				}
				function Wt(t, e, i, n = ">") {
					const r = function(t, e, i = ">") {
						let n = 0;
						const r = t.length, s = i.charCodeAt(0), o = i.length > 1 ? i.charCodeAt(1) : -1;
						let a = "", l = e;
						for (let i = e; i < r; i++) {
							const e = t.charCodeAt(i);
							if (n) e === n && (n = 0);
							else if (34 === e || 39 === e) n = e;
							else if (e === s) {
								if (-1 === o) return a += t.substring(l, i), {
									data: a,
									index: i
								};
								if (t.charCodeAt(i + 1) === o) return a += t.substring(l, i), {
									data: a,
									index: i
								};
							} else 9 !== e || n || (a += t.substring(l, i) + " ", l = i + 1);
						}
					}(t, e + 1, n);
					if (!r) return;
					let s = r.data;
					const o = r.index, a = s.search(/\s/);
					let l = s, p = !0;
					-1 !== a && (l = s.substring(0, a), s = s.substring(a + 1).trimStart());
					const c = l;
					if (i) {
						const t = l.indexOf(":");
						-1 !== t && (l = l.substr(t + 1), p = l !== r.data.substr(t + 1));
					}
					return {
						tagName: l,
						tagExp: s,
						closeIndex: o,
						attrExpPresent: p,
						rawTagName: c
					};
				}
				function zt(t, e, i) {
					const n = i;
					let r = 1;
					const s = t.length;
					for (; i < s; i++) if ("<" === t[i]) {
						const s = t.charCodeAt(i + 1);
						if (47 === s) {
							const s = Xt(t, ">", i, `${e} is not closed`);
							if (t.substring(i + 2, s).trim() === e && (r--, 0 === r)) return {
								tagContent: t.substring(n, i),
								i: s
							};
							i = s;
						} else if (63 === s) i = Gt(t, "?>", i + 1, "StopNode is not closed.");
						else if (33 === s && 45 === t.charCodeAt(i + 2) && 45 === t.charCodeAt(i + 3)) i = Gt(t, "-->", i + 3, "StopNode is not closed.");
						else if (33 === s && 91 === t.charCodeAt(i + 2)) i = Gt(t, "]]>", i, "StopNode is not closed.") - 2;
						else {
							const n = Wt(t, i, !1);
							n && ((n && n.tagName) === e && "/" !== n.tagExp[n.tagExp.length - 1] && r++, i = n.closeIndex);
						}
					}
				}
				function Yt(t, e, i) {
					if (e && "string" == typeof t) {
						const e = t.trim();
						return "true" === e || "false" !== e && tt(t, i);
					}
					return void 0 !== t ? t : "";
				}
				function Ht(t, e, i, n) {
					if (t) {
						const n = t(e);
						i === e && (i = n), e = n;
					}
					return {
						tagName: e = Qt(e, n),
						tagExp: i
					};
				}
				function Qt(t, e) {
					if (a.includes(t)) throw new Error(`[SECURITY] Invalid name: "${t}" is a reserved JavaScript keyword that could cause prototype pollution`);
					return o.includes(t) ? e.onDangerousProperty(t) : t;
				}
				const Jt = P.getMetaDataSymbol();
				function Zt(t, e) {
					if (!t || "object" != typeof t) return {};
					if (!e) return t;
					const i = {};
					for (const n in t) n.startsWith(e) ? i[n.substring(e.length)] = t[n] : i[n] = t[n];
					return i;
				}
				function Kt(t, e, i, n) {
					return te(t, e, i, n);
				}
				function te(t, e, i, n) {
					let r;
					const s = {};
					for (let o = 0; o < t.length; o++) {
						const a = t[o], l = ee(a);
						if (void 0 !== l && l !== e.textNodeName) {
							const t = Zt(a[":@"] || {}, e.attributeNamePrefix);
							i.push(l, t);
						}
						if (l === e.textNodeName) void 0 === r ? r = a[l] : r += "" + a[l];
						else {
							if (void 0 === l) continue;
							if (a[l]) {
								let t = te(a[l], e, i, n);
								const r = ne(t, e);
								if (0 === Object.keys(t).length && e.alwaysCreateTextNode && (t[e.textNodeName] = ""), a[":@"] ? ie(t, a[":@"], n, e) : 1 !== Object.keys(t).length || void 0 === t[e.textNodeName] || e.alwaysCreateTextNode ? 0 === Object.keys(t).length && (e.alwaysCreateTextNode ? t[e.textNodeName] = "" : t = "") : t = t[e.textNodeName], void 0 !== a[Jt] && "object" == typeof t && null !== t && (t[Jt] = a[Jt]), void 0 !== s[l] && Object.prototype.hasOwnProperty.call(s, l)) Array.isArray(s[l]) || (s[l] = [s[l]]), s[l].push(t);
								else {
									const i = e.jPath ? n.toString() : n;
									e.isArray(l, i, r) ? s[l] = [t] : s[l] = t;
								}
								void 0 !== l && l !== e.textNodeName && i.pop();
							}
						}
					}
					return "string" == typeof r ? r.length > 0 && (s[e.textNodeName] = r) : void 0 !== r && (s[e.textNodeName] = r), s;
				}
				function ee(t) {
					const e = Object.keys(t);
					for (let t = 0; t < e.length; t++) {
						const i = e[t];
						if (":@" !== i) return i;
					}
				}
				function ie(t, e, i, n) {
					if (e) {
						const r = Object.keys(e), s = r.length;
						for (let o = 0; o < s; o++) {
							const s = r[o], a = s.startsWith(n.attributeNamePrefix) ? s.substring(n.attributeNamePrefix.length) : s, l = n.jPath ? i.toString() + "." + a : i;
							n.isArray(s, l, !0, !0) ? t[s] = [e[s]] : t[s] = e[s];
						}
					}
				}
				function ne(t, e) {
					const { textNodeName: i } = e, n = Object.keys(t).length;
					return 0 === n || !(1 !== n || !t[i] && "boolean" != typeof t[i] && 0 !== t[i]);
				}
				class re {
					constructor(t) {
						this.externalEntities = {}, this.options = C(t);
					}
					parse(t, e) {
						if ("string" != typeof t && t.toString) t = t.toString();
						else if ("string" != typeof t) throw new Error("XML data is accepted in String or Bytes[] form.");
						if (e) {
							!0 === e && (e = {});
							const i = p(t, e);
							if (!0 !== i) throw Error(`${i.err.msg}:${i.err.line}:${i.err.col}`);
						}
						const i = new kt(this.options, this.externalEntities), n = i.parseXml(t);
						return this.options.preserveOrder || void 0 === n ? n : Kt(n, this.options, i.matcher, i.readonlyMatcher);
					}
					addEntity(t, e) {
						if (-1 !== e.indexOf("&")) throw new Error("Entity value can't have '&'");
						if (-1 !== t.indexOf("&") || -1 !== t.indexOf(";")) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
						if ("&" === e) throw new Error("An entity with value '&' is not permitted");
						this.externalEntities[t] = e;
					}
					static getMetaDataSymbol() {
						return P.getMetaDataSymbol();
					}
				}
				function se(t) {
					return String(t).replace(/--/g, "- -").replace(/--/g, "- -").replace(/-$/, "- ");
				}
				function oe(t) {
					return String(t).replace(/\]\]>/g, "]]]]><![CDATA[>");
				}
				function ae(t) {
					return String(t).replace(/"/g, "&quot;").replace(/'/g, "&apos;");
				}
				const le = ":A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", pe = ":A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿", ce = ":A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿\\-\\.\\d·̀-ͯ҇‿-⁀", he = (t, e, i = "") => {
					const n = `[${t.replace(":", "")}][${e.replace(":", "")}]*`;
					return {
						name: new RegExp(`^[${t}][${e}]*$`, i),
						ncName: new RegExp(`^${n}$`, i),
						qName: new RegExp(`^${n}(?::${n})?$`, i),
						nmToken: new RegExp(`^[${e}]+$`, i),
						nmTokens: new RegExp(`^[${e}]+(?:\\s+[${e}]+)*$`, i)
					};
				}, de = he(le, ":A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�\\-\\.\\d·̀-ͯ‿-⁀"), ue = he(pe, ce, "u"), fe = (t, { xmlVersion: e = "1.0" } = {}) => ((t = "1.0") => "1.1" === t ? ue : de)(e).qName.test(t);
				function ge(t, e, i, n, r) {
					return i.sanitizeName ? fe(t, { xmlVersion: r }) ? t : i.sanitizeName(t, {
						isAttribute: e,
						matcher: n.readOnly()
					}) : t;
				}
				function me(t, e) {
					let i = "";
					e.format && (i = "\n");
					const n = [];
					if (e.stopNodes && Array.isArray(e.stopNodes)) for (let t = 0; t < e.stopNodes.length; t++) {
						const i = e.stopNodes[t];
						"string" == typeof i ? n.push(new st(i)) : i instanceof st && n.push(i);
					}
					const r = function(t, e) {
						if (!Array.isArray(t) || 0 === t.length) return "1.0";
						const i = t[0];
						if ("?xml" === Ee(i)) {
							const t = i[":@"];
							if (t) {
								const i = e.attributeNamePrefix + "version";
								if (t[i]) return t[i];
							}
						}
						return "1.0";
					}(t, e);
					return xe(t, e, i, new rt(), n, r);
				}
				function xe(t, e, i, n, r, s) {
					let o = "", a = !1;
					if (e.maxNestedTags && n.getDepth() > e.maxNestedTags) throw new Error("Maximum nested tags exceeded");
					if (!Array.isArray(t)) {
						if (null != t) {
							let i = t.toString();
							return i = Se(i, e), i;
						}
						return "";
					}
					for (let l = 0; l < t.length; l++) {
						const p = t[l], c = Ee(p);
						if (void 0 === c) continue;
						const h = c === e.textNodeName || c === e.cdataPropName || c === e.commentPropName || "?" === c[0] ? c : ge(c, !1, e, n, s), d = be(p[":@"], e);
						n.push(h, d);
						const u = ve(n, r);
						if (h === e.textNodeName) {
							let t = p[c];
							u || (t = e.tagValueProcessor(h, t), t = Se(t, e)), a && (o += i), o += t, a = !1, n.pop();
							continue;
						}
						if (h === e.cdataPropName) {
							a && (o += i), o += `<![CDATA[${oe(p[c][0][e.textNodeName])}]]>`, a = !1, n.pop();
							continue;
						}
						if (h === e.commentPropName) {
							o += i + `\x3c!--${se(p[c][0][e.textNodeName])}--\x3e`, a = !0, n.pop();
							continue;
						}
						if ("?" === h[0]) {
							o += ("?xml" === h ? "" : i) + `<${h}${we(p[":@"], e, u, n, s)}?>`, a = !0, n.pop();
							continue;
						}
						let f = i;
						"" !== f && (f += e.indentBy);
						const g = i + `<${h}${we(p[":@"], e, u, n, s)}`;
						let m;
						m = u ? ye(p[c], e) : xe(p[c], e, f, n, r, s), -1 !== e.unpairedTags.indexOf(h) ? e.suppressUnpairedNode ? o += g + ">" : o += g + "/>" : m && 0 !== m.length || !e.suppressEmptyNode ? m && m.endsWith(">") ? o += g + `>${m}${i}</${h}>` : (o += g + ">", m && "" !== i && (m.includes("/>") || m.includes("</")) ? o += i + e.indentBy + m + i : o += m, o += `</${h}>`) : o += g + "/>", a = !0, n.pop();
					}
					return o;
				}
				function be(t, e) {
					if (!t || e.ignoreAttributes) return null;
					const i = {};
					let n = !1;
					for (let r in t) Object.prototype.hasOwnProperty.call(t, r) && (i[r.startsWith(e.attributeNamePrefix) ? r.substr(e.attributeNamePrefix.length) : r] = ae(t[r]), n = !0);
					return n ? i : null;
				}
				function ye(t, e) {
					if (!Array.isArray(t)) return null != t ? t.toString() : "";
					let i = "";
					for (let n = 0; n < t.length; n++) {
						const r = t[n], s = Ee(r);
						if (s === e.textNodeName) i += r[s];
						else if (s === e.cdataPropName) i += r[s][0][e.textNodeName];
						else if (s === e.commentPropName) i += r[s][0][e.textNodeName];
						else {
							if (s && "?" === s[0]) continue;
							if (s) {
								const t = Ne(r[":@"], e), n = ye(r[s], e);
								n && 0 !== n.length ? i += `<${s}${t}>${n}</${s}>` : i += `<${s}${t}/>`;
							}
						}
					}
					return i;
				}
				function Ne(t, e) {
					let i = "";
					if (t && !e.ignoreAttributes) for (let n in t) {
						if (!Object.prototype.hasOwnProperty.call(t, n)) continue;
						let r = t[n];
						!0 === r && e.suppressBooleanAttributes ? i += ` ${n.substr(e.attributeNamePrefix.length)}` : i += ` ${n.substr(e.attributeNamePrefix.length)}="${ae(r)}"`;
					}
					return i;
				}
				function Ee(t) {
					const e = Object.keys(t);
					for (let i = 0; i < e.length; i++) {
						const n = e[i];
						if (Object.prototype.hasOwnProperty.call(t, n) && ":@" !== n) return n;
					}
				}
				function we(t, e, i, n, r) {
					let s = "";
					if (t && !e.ignoreAttributes) for (let o in t) {
						if (!Object.prototype.hasOwnProperty.call(t, o)) continue;
						const a = o.substr(e.attributeNamePrefix.length), l = i ? a : ge(a, !0, e, n, r);
						let p;
						i ? p = t[o] : (p = e.attributeValueProcessor(o, t[o]), p = Se(p, e)), !0 === p && e.suppressBooleanAttributes ? s += ` ${l}` : s += ` ${l}="${ae(p)}"`;
					}
					return s;
				}
				function ve(t, e) {
					if (!e || 0 === e.length) return !1;
					for (let i = 0; i < e.length; i++) if (t.matches(e[i])) return !0;
					return !1;
				}
				function Se(t, e) {
					if (t && t.length > 0 && e.processEntities) for (let i = 0; i < e.entities.length; i++) {
						const n = e.entities[i];
						t = t.replace(n.regex, n.val);
					}
					return t;
				}
				const Ae = {
					attributeNamePrefix: "@_",
					attributesGroupName: !1,
					textNodeName: "#text",
					ignoreAttributes: !0,
					cdataPropName: !1,
					format: !1,
					indentBy: "  ",
					suppressEmptyNode: !1,
					suppressUnpairedNode: !0,
					suppressBooleanAttributes: !0,
					tagValueProcessor: function(t, e) {
						return e;
					},
					attributeValueProcessor: function(t, e) {
						return e;
					},
					preserveOrder: !1,
					commentPropName: !1,
					unpairedTags: [],
					entities: [
						{
							regex: /* @__PURE__ */ new RegExp("&", "g"),
							val: "&amp;"
						},
						{
							regex: /* @__PURE__ */ new RegExp(">", "g"),
							val: "&gt;"
						},
						{
							regex: /* @__PURE__ */ new RegExp("<", "g"),
							val: "&lt;"
						},
						{
							regex: /* @__PURE__ */ new RegExp("'", "g"),
							val: "&apos;"
						},
						{
							regex: /* @__PURE__ */ new RegExp("\"", "g"),
							val: "&quot;"
						}
					],
					processEntities: !0,
					stopNodes: [],
					oneListGroup: !1,
					maxNestedTags: 100,
					jPath: !0,
					sanitizeName: !1
				};
				function Te(t) {
					if (this.options = Object.assign({}, Ae, t), this.options.stopNodes && Array.isArray(this.options.stopNodes) && (this.options.stopNodes = this.options.stopNodes.map((t) => "string" == typeof t && t.startsWith("*.") ? ".." + t.substring(2) : t)), this.stopNodeExpressions = [], this.options.stopNodes && Array.isArray(this.options.stopNodes)) for (let t = 0; t < this.options.stopNodes.length; t++) {
						const e = this.options.stopNodes[t];
						"string" == typeof e ? this.stopNodeExpressions.push(new st(e)) : e instanceof st && this.stopNodeExpressions.push(e);
					}
					var e;
					!0 === this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
						return !1;
					} : (this.ignoreAttributesFn = "function" == typeof (e = this.options.ignoreAttributes) ? e : Array.isArray(e) ? (t) => {
						for (const i of e) {
							if ("string" == typeof i && t === i) return !0;
							if (i instanceof RegExp && i.test(t)) return !0;
						}
					} : () => !1, this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = Pe), this.processTextOrObjNode = Ce, this.options.format ? (this.indentate = $e, this.tagEndChar = ">\n", this.newLine = "\n") : (this.indentate = function() {
						return "";
					}, this.tagEndChar = ">", this.newLine = "");
				}
				function _e(t, e, i, n, r) {
					return i.sanitizeName ? fe(t, { xmlVersion: r }) ? t : i.sanitizeName(t, {
						isAttribute: e,
						matcher: n.readOnly()
					}) : t;
				}
				function Ce(t, e, i, n, r) {
					const s = this.extractAttributes(t);
					if (n.push(e, s), this.checkStopNode(n)) {
						const r = this.buildRawContent(t), s = this.buildAttributesForStopNode(t);
						return n.pop(), this.buildObjectNode(r, e, s, i);
					}
					const o = this.j2x(t, i + 1, n, r);
					return n.pop(), "?" === e[0] ? this.buildTextValNode("", e, o.attrStr, i, n) : void 0 !== t[this.options.textNodeName] && 1 === Object.keys(t).length ? this.buildTextValNode(t[this.options.textNodeName], e, o.attrStr, i, n) : this.buildObjectNode(o.val, e, o.attrStr, i);
				}
				function $e(t) {
					return this.options.indentBy.repeat(t);
				}
				function Pe(t) {
					return !(!t.startsWith(this.options.attributeNamePrefix) || t === this.options.textNodeName) && t.substr(this.attrPrefixLen);
				}
				Te.prototype.build = function(t) {
					if (this.options.preserveOrder) return me(t, this.options);
					{
						Array.isArray(t) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (t = { [this.options.arrayNodeName]: t });
						const e = new rt(), i = function(t, e) {
							const i = t["?xml"];
							if (i && "object" == typeof i) {
								if (e.attributesGroupName && i[e.attributesGroupName]) {
									const t = i[e.attributesGroupName][e.attributeNamePrefix + "version"];
									if (t) return t;
								}
								const t = i[e.attributeNamePrefix + "version"];
								if (t) return t;
							}
							return "1.0";
						}(t, this.options);
						return this.j2x(t, 0, e, i).val;
					}
				}, Te.prototype.j2x = function(t, e, i, n) {
					let r = "", s = "";
					if (this.options.maxNestedTags && i.getDepth() >= this.options.maxNestedTags) throw new Error("Maximum nested tags exceeded");
					const o = this.options.jPath ? i.toString() : i, a = this.checkStopNode(i);
					for (let l in t) {
						if (!Object.prototype.hasOwnProperty.call(t, l)) continue;
						const p = l === this.options.textNodeName || l === this.options.cdataPropName || l === this.options.commentPropName || this.options.attributesGroupName && l === this.options.attributesGroupName || this.isAttribute(l) || "?" === l[0] ? l : _e(l, !1, this.options, i, n);
						if (void 0 === t[l]) this.isAttribute(l) && (s += "");
						else if (null === t[l]) this.isAttribute(l) || p === this.options.cdataPropName || p === this.options.commentPropName ? s += "" : "?" === p[0] ? s += this.indentate(e) + "<" + p + "?" + this.tagEndChar : s += this.indentate(e) + "<" + p + "/" + this.tagEndChar;
						else if (t[l] instanceof Date) s += this.buildTextValNode(t[l], p, "", e, i);
						else if ("object" != typeof t[l]) {
							const c = this.isAttribute(l);
							if (c && !this.ignoreAttributesFn(c, o)) {
								const e = _e(c, !0, this.options, i, n);
								r += this.buildAttrPairStr(e, "" + t[l], a);
							} else if (!c) if (l === this.options.textNodeName) {
								let e = this.options.tagValueProcessor(l, "" + t[l]);
								s += this.replaceEntitiesValue(e);
							} else {
								i.push(p);
								const n = this.checkStopNode(i);
								if (i.pop(), n) {
									const i = "" + t[l];
									s += "" === i ? this.indentate(e) + "<" + p + this.closeTag(p) + this.tagEndChar : this.indentate(e) + "<" + p + ">" + i + "</" + p + this.tagEndChar;
								} else s += this.buildTextValNode(t[l], p, "", e, i);
							}
						} else if (Array.isArray(t[l])) {
							const r = t[l].length;
							let o = "", a = "";
							for (let c = 0; c < r; c++) {
								const r = t[l][c];
								if (void 0 === r);
								else if (null === r) "?" === p[0] ? s += this.indentate(e) + "<" + p + "?" + this.tagEndChar : s += this.indentate(e) + "<" + p + "/" + this.tagEndChar;
								else if ("object" == typeof r) if (this.options.oneListGroup) {
									i.push(p);
									const t = this.j2x(r, e + 1, i, n);
									i.pop(), o += t.val, this.options.attributesGroupName && r.hasOwnProperty(this.options.attributesGroupName) && (a += t.attrStr);
								} else o += this.processTextOrObjNode(r, p, e, i, n);
								else if (this.options.oneListGroup) {
									let t = this.options.tagValueProcessor(p, r);
									t = this.replaceEntitiesValue(t), o += t;
								} else {
									i.push(p);
									const t = this.checkStopNode(i);
									if (i.pop(), t) {
										const t = "" + r;
										o += "" === t ? this.indentate(e) + "<" + p + this.closeTag(p) + this.tagEndChar : this.indentate(e) + "<" + p + ">" + t + "</" + p + this.tagEndChar;
									} else o += this.buildTextValNode(r, p, "", e, i);
								}
							}
							this.options.oneListGroup && (o = this.buildObjectNode(o, p, a, e)), s += o;
						} else if (this.options.attributesGroupName && l === this.options.attributesGroupName) {
							const e = Object.keys(t[l]), s = e.length;
							for (let o = 0; o < s; o++) {
								const s = _e(e[o], !0, this.options, i, n);
								r += this.buildAttrPairStr(s, "" + t[l][e[o]], a);
							}
						} else s += this.processTextOrObjNode(t[l], p, e, i, n);
					}
					return {
						attrStr: r,
						val: s
					};
				}, Te.prototype.buildAttrPairStr = function(t, e, i) {
					return i || (e = this.options.attributeValueProcessor(t, "" + e), e = this.replaceEntitiesValue(e)), this.options.suppressBooleanAttributes && "true" === e ? " " + t : " " + t + "=\"" + ae(e) + "\"";
				}, Te.prototype.extractAttributes = function(t) {
					if (!t || "object" != typeof t) return null;
					const e = {};
					let i = !1;
					if (this.options.attributesGroupName && t[this.options.attributesGroupName]) {
						const n = t[this.options.attributesGroupName];
						for (let t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t.startsWith(this.options.attributeNamePrefix) ? t.substring(this.options.attributeNamePrefix.length) : t] = ae(n[t]), i = !0);
					} else for (let n in t) {
						if (!Object.prototype.hasOwnProperty.call(t, n)) continue;
						const r = this.isAttribute(n);
						r && (e[r] = ae(t[n]), i = !0);
					}
					return i ? e : null;
				}, Te.prototype.buildRawContent = function(t) {
					if ("string" == typeof t) return t;
					if ("object" != typeof t || null === t) return String(t);
					if (void 0 !== t[this.options.textNodeName]) return t[this.options.textNodeName];
					let e = "";
					for (let i in t) {
						if (!Object.prototype.hasOwnProperty.call(t, i)) continue;
						if (this.isAttribute(i)) continue;
						if (this.options.attributesGroupName && i === this.options.attributesGroupName) continue;
						const n = t[i];
						if (i === this.options.textNodeName) e += n;
						else if (Array.isArray(n)) {
							for (let t of n) if ("string" == typeof t || "number" == typeof t) e += `<${i}>${t}</${i}>`;
							else if ("object" == typeof t && null !== t) {
								const n = this.buildRawContent(t), r = this.buildAttributesForStopNode(t);
								e += "" === n ? `<${i}${r}/>` : `<${i}${r}>${n}</${i}>`;
							}
						} else if ("object" == typeof n && null !== n) {
							const t = this.buildRawContent(n), r = this.buildAttributesForStopNode(n);
							e += "" === t ? `<${i}${r}/>` : `<${i}${r}>${t}</${i}>`;
						} else e += `<${i}>${n}</${i}>`;
					}
					return e;
				}, Te.prototype.buildAttributesForStopNode = function(t) {
					if (!t || "object" != typeof t) return "";
					let e = "";
					if (this.options.attributesGroupName && t[this.options.attributesGroupName]) {
						const i = t[this.options.attributesGroupName];
						for (let t in i) {
							if (!Object.prototype.hasOwnProperty.call(i, t)) continue;
							const n = t.startsWith(this.options.attributeNamePrefix) ? t.substring(this.options.attributeNamePrefix.length) : t, r = i[t];
							!0 === r && this.options.suppressBooleanAttributes ? e += " " + n : e += " " + n + "=\"" + r + "\"";
						}
					} else for (let i in t) {
						if (!Object.prototype.hasOwnProperty.call(t, i)) continue;
						const n = this.isAttribute(i);
						if (n) {
							const r = t[i];
							!0 === r && this.options.suppressBooleanAttributes ? e += " " + n : e += " " + n + "=\"" + r + "\"";
						}
					}
					return e;
				}, Te.prototype.buildObjectNode = function(t, e, i, n) {
					if ("" === t) return "?" === e[0] ? this.indentate(n) + "<" + e + i + "?" + this.tagEndChar : this.indentate(n) + "<" + e + i + this.closeTag(e) + this.tagEndChar;
					if ("?" === e[0]) return this.indentate(n) + "<" + e + i + "?" + this.tagEndChar;
					{
						let r = "</" + e + this.tagEndChar, s = "";
						return "?" === e[0] && (s = "?", r = ""), !i && "" !== i || -1 !== t.indexOf("<") ? !1 !== this.options.commentPropName && e === this.options.commentPropName && 0 === s.length ? this.indentate(n) + `\x3c!--${t}--\x3e` + this.newLine : this.indentate(n) + "<" + e + i + s + this.tagEndChar + t + this.indentate(n) + r : this.indentate(n) + "<" + e + i + s + ">" + t + r;
					}
				}, Te.prototype.closeTag = function(t) {
					let e = "";
					return -1 !== this.options.unpairedTags.indexOf(t) ? this.options.suppressUnpairedNode || (e = "/") : e = this.options.suppressEmptyNode ? "/" : `></${t}`, e;
				}, Te.prototype.checkStopNode = function(t) {
					if (!this.stopNodeExpressions || 0 === this.stopNodeExpressions.length) return !1;
					for (let e = 0; e < this.stopNodeExpressions.length; e++) if (t.matches(this.stopNodeExpressions[e])) return !0;
					return !1;
				}, Te.prototype.buildTextValNode = function(t, e, i, n, r) {
					if (!1 !== this.options.cdataPropName && e === this.options.cdataPropName) {
						const e = oe(t);
						return this.indentate(n) + `<![CDATA[${e}]]>` + this.newLine;
					}
					if (!1 !== this.options.commentPropName && e === this.options.commentPropName) {
						const e = se(t);
						return this.indentate(n) + `\x3c!--${e}--\x3e` + this.newLine;
					}
					if ("?" === e[0]) return this.indentate(n) + "<" + e + i + "?" + this.tagEndChar;
					{
						let r = this.options.tagValueProcessor(e, t);
						return r = this.replaceEntitiesValue(r), "" === r ? this.indentate(n) + "<" + e + i + this.closeTag(e) + this.tagEndChar : this.indentate(n) + "<" + e + i + ">" + r + "</" + e + this.tagEndChar;
					}
				}, Te.prototype.replaceEntitiesValue = function(t) {
					if (t && t.length > 0 && this.options.processEntities) for (let e = 0; e < this.options.entities.length; e++) {
						const i = this.options.entities[e];
						t = t.replace(i.regex, i.val);
					}
					return t;
				};
				const Oe = Te, je = { validate: p };
				module.exports = e;
			})();
		}));
		//#endregion
		//#region node_modules/seqparse/dist/index.js
		var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			(function webpackUniversalModuleDefinition(root, factory) {
				if (typeof exports === "object" && typeof module === "object") module.exports = factory();
				else if (typeof define === "function" && define.amd) define("seqparse", [], factory);
				else if (typeof exports === "object") exports["seqparse"] = factory();
				else root["seqparse"] = factory();
			})(exports, () => {
				return (() => {
					"use strict";
					var __webpack_modules__ = [
						(function(__unused_webpack_module, exports$38, __webpack_require__) {
							var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
								function adopt(value) {
									return value instanceof P ? value : new P(function(resolve) {
										resolve(value);
									});
								}
								return new (P || (P = Promise))(function(resolve, reject) {
									function fulfilled(value) {
										try {
											step(generator.next(value));
										} catch (e) {
											reject(e);
										}
									}
									function rejected(value) {
										try {
											step(generator["throw"](value));
										} catch (e) {
											reject(e);
										}
									}
									function step(result) {
										result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
									}
									step((generator = generator.apply(thisArg, _arguments || [])).next());
								});
							};
							var __generator = this && this.__generator || function(thisArg, body) {
								var _ = {
									label: 0,
									sent: function() {
										if (t[0] & 1) throw t[1];
										return t[1];
									},
									trys: [],
									ops: []
								}, f, y, t, g;
								return g = {
									next: verb(0),
									"throw": verb(1),
									"return": verb(2)
								}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
									return this;
								}), g;
								function verb(n) {
									return function(v) {
										return step([n, v]);
									};
								}
								function step(op) {
									if (f) throw new TypeError("Generator is already executing.");
									while (_) try {
										if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
										if (y = 0, t) op = [op[0] & 2, t.value];
										switch (op[0]) {
											case 0:
											case 1:
												t = op;
												break;
											case 4:
												_.label++;
												return {
													value: op[1],
													done: false
												};
											case 5:
												_.label++;
												y = op[1];
												op = [0];
												continue;
											case 7:
												op = _.ops.pop();
												_.trys.pop();
												continue;
											default:
												if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
													_ = 0;
													continue;
												}
												if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
													_.label = op[1];
													break;
												}
												if (op[0] === 6 && _.label < t[1]) {
													_.label = t[1];
													t = op;
													break;
												}
												if (t && _.label < t[2]) {
													_.label = t[2];
													_.ops.push(op);
													break;
												}
												if (t[2]) _.ops.pop();
												_.trys.pop();
												continue;
										}
										op = body.call(thisArg, _);
									} catch (e) {
										op = [6, e];
										y = 0;
									} finally {
										f = t = 0;
									}
									if (op[0] & 5) throw op[1];
									return {
										value: op[0] ? op[1] : void 0,
										done: true
									};
								}
							};
							Object.defineProperty(exports$38, "__esModule", { value: true });
							exports$38.parseFile = void 0;
							var fetchFile_1 = __webpack_require__(1);
							var parseFile_1 = __webpack_require__(3);
							exports$38.parseFile = parseFile_1.default;
							exports$38["default"] = (function(input, options) {
								return __awaiter(void 0, void 0, void 0, function() {
									return __generator(this, function(_a) {
										switch (_a.label) {
											case 0:
												if (!(!(options === null || options === void 0 ? void 0 : options.fileName) && (0, fetchFile_1.isAccession)(input))) return [3, 2];
												return [4, (0, fetchFile_1.default)(input, options)];
											case 1: return [2, _a.sent()];
											case 2: return [2, (0, parseFile_1.default)(input, options)[0]];
										}
									});
								});
							});
						}),
						(function(__unused_webpack_module, exports$39, __webpack_require__) {
							var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
								function adopt(value) {
									return value instanceof P ? value : new P(function(resolve) {
										resolve(value);
									});
								}
								return new (P || (P = Promise))(function(resolve, reject) {
									function fulfilled(value) {
										try {
											step(generator.next(value));
										} catch (e) {
											reject(e);
										}
									}
									function rejected(value) {
										try {
											step(generator["throw"](value));
										} catch (e) {
											reject(e);
										}
									}
									function step(result) {
										result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
									}
									step((generator = generator.apply(thisArg, _arguments || [])).next());
								});
							};
							var __generator = this && this.__generator || function(thisArg, body) {
								var _ = {
									label: 0,
									sent: function() {
										if (t[0] & 1) throw t[1];
										return t[1];
									},
									trys: [],
									ops: []
								}, f, y, t, g;
								return g = {
									next: verb(0),
									"throw": verb(1),
									"return": verb(2)
								}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
									return this;
								}), g;
								function verb(n) {
									return function(v) {
										return step([n, v]);
									};
								}
								function step(op) {
									if (f) throw new TypeError("Generator is already executing.");
									while (_) try {
										if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
										if (y = 0, t) op = [op[0] & 2, t.value];
										switch (op[0]) {
											case 0:
											case 1:
												t = op;
												break;
											case 4:
												_.label++;
												return {
													value: op[1],
													done: false
												};
											case 5:
												_.label++;
												y = op[1];
												op = [0];
												continue;
											case 7:
												op = _.ops.pop();
												_.trys.pop();
												continue;
											default:
												if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
													_ = 0;
													continue;
												}
												if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
													_.label = op[1];
													break;
												}
												if (op[0] === 6 && _.label < t[1]) {
													_.label = t[1];
													t = op;
													break;
												}
												if (t && _.label < t[2]) {
													_.label = t[2];
													_.ops.push(op);
													break;
												}
												if (t[2]) _.ops.pop();
												_.trys.pop();
												continue;
										}
										op = body.call(thisArg, _);
									} catch (e) {
										op = [6, e];
										y = 0;
									} finally {
										f = t = 0;
									}
									if (op[0] & 5) throw op[1];
									return {
										value: op[0] ? op[1] : void 0,
										done: true
									};
								}
							};
							Object.defineProperty(exports$39, "__esModule", { value: true });
							exports$39.isAccession = void 0;
							var node_fetch_1 = __webpack_require__(2);
							var parseFile_1 = __webpack_require__(3);
							/**
							* Get a remote sequence from NCBI or the iGEM registry.
							*/
							exports$39["default"] = (function(accession, options) {
								return __awaiter(void 0, void 0, void 0, function() {
									var url, body, response, err_1;
									return __generator(this, function(_a) {
										switch (_a.label) {
											case 0:
												url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=".concat(accession.trim(), "&rettype=gbwithparts&retmode=text");
												if (accession.startsWith("BB")) {
													if (typeof window !== "undefined" && typeof process === "undefined" || (options === null || options === void 0 ? void 0 : options.cors)) url = "https://cors-anywhere.herokuapp.com/http://parts.igem.org/cgi/xml/part.cgi?part=".concat(accession.trim());
													else url = "http://parts.igem.org/cgi/xml/part.cgi?part=".concat(accession.trim());
												}
												body = "";
												_a.label = 1;
											case 1:
												_a.trys.push([
													1,
													4,
													,
													5
												]);
												return [4, (0, node_fetch_1.default)(url)];
											case 2:
												response = _a.sent();
												return [4, response.text()];
											case 3:
												body = _a.sent();
												return [3, 5];
											case 4:
												err_1 = _a.sent();
												throw new Error("Failed to get part: accession=".concat(accession, " url=").concat(url, " err=").concat(err_1));
											case 5:
												if (!response.ok || !body.length) throw new Error("Failed to get part, no body returned: accession=".concat(accession, " url=").concat(url));
												return [4, (0, parseFile_1.default)(body)];
											case 6: return [2, _a.sent()[0]];
										}
									});
								});
							});
							/** returns whether the passed ID is an accession in iGEM or NCBI */
							var isAccession = function(accession) {
								if (accession.startsWith("BB")) return true;
								if (accession.length < 14 && accession.match(/^[a-z0-9_\-.]+$/i)) return true;
								return false;
							};
							exports$39.isAccession = isAccession;
						}),
						((module$7) => {
							module$7.exports = require_browser();
						}),
						((__unused_webpack_module, exports$40, __webpack_require__) => {
							Object.defineProperty(exports$40, "__esModule", { value: true });
							var path_1 = __webpack_require__(4);
							var benchling_1 = __webpack_require__(5);
							var biobrick_1 = __webpack_require__(7);
							var fasta_1 = __webpack_require__(9);
							var genbank_1 = __webpack_require__(10);
							var jbei_1 = __webpack_require__(11);
							var sbol_1 = __webpack_require__(12);
							var seqbuilder_1 = __webpack_require__(15);
							var snapgene_1 = __webpack_require__(16);
							var utils_1 = __webpack_require__(6);
							/**
							* parseFile converts the contents of a sequence file to a an array of Seq
							*/
							exports$40["default"] = (function(file, opts) {
								var fileName = (opts === null || opts === void 0 ? void 0 : opts.fileName) || "";
								var sourceName = fileName.split(path_1.sep).pop() || fileName;
								if (!file) throw Error("cannot parse null or empty string");
								var firstLine = file.substring(0, file.search("\n"));
								var dnaOnlyFile = firstLine.replace(/[^atcgATCG]/, "").length / firstLine.length > .8;
								var name = fileName && sourceName ? sourceName.substring(0, sourceName.search("\\.")) : "Untitled";
								var isBenchling = false;
								try {
									var benchlingJSON_1 = JSON.parse(file);
									if ([
										"bases",
										"annotations",
										"primers"
									].every(function(k) {
										return typeof benchlingJSON_1[k] !== "undefined";
									})) isBenchling = true;
								} catch (ex) {}
								var prefix = file.substring(0, 200);
								var seqs;
								switch (true) {
									case prefix.includes(":seq=\"http://jbei.org/sequence\""):
									case file.startsWith("<seq:seq"):
										seqs = (0, jbei_1.default)(file);
										break;
									case file.startsWith(">"):
									case file.startsWith(";"):
									case fileName.endsWith(".seq"):
									case fileName.endsWith(".fa"):
									case fileName.endsWith(".fas"):
									case fileName.endsWith(".fasta"):
										seqs = (0, fasta_1.default)(file, fileName);
										break;
									case file.includes("LOCUS") && file.includes("ORIGIN"):
									case fileName.endsWith(".gb"):
									case fileName.endsWith(".gbk"):
									case fileName.endsWith(".genbank"):
									case fileName.endsWith(".ape"):
										seqs = (0, genbank_1.default)(file, fileName);
										break;
									case fileName.endsWith(".dna"):
										seqs = (0, snapgene_1.default)(opts);
										break;
									case prefix.includes("Written by SeqBuilder"):
									case fileName.endsWith(".sbd"):
										seqs = (0, seqbuilder_1.default)(file, fileName);
										break;
									case prefix.includes("Parts from the iGEM"):
									case prefix.includes("<part_list>"):
										seqs = (0, biobrick_1.default)(file);
										break;
									case isBenchling:
										seqs = (0, benchling_1.default)(file);
										break;
									case prefix.includes("RDF"):
										seqs = (0, sbol_1.default)(file, fileName);
										break;
									case dnaOnlyFile:
										var seq = (0, utils_1.complement)(file).seq;
										seqs = [{
											annotations: [],
											name,
											seq,
											type: (0, utils_1.guessType)(seq)
										}];
										break;
									default: throw Error("".concat(fileName, " File type not recognized: ").concat(file));
								}
								return seqs.map(function(p) {
									return {
										annotations: p.annotations.sort(function(a, b) {
											return a.start - b.start || a.end - b.end;
										}).map(function(a) {
											return {
												color: a.color,
												direction: a.direction,
												end: a.end,
												name: a.name,
												start: a.start,
												type: a.type
											};
										}),
										name: p.name,
										seq: p.seq,
										type: p.type
									};
								});
							});
						}),
						((module$8) => {
							function assertPath(path) {
								if (typeof path !== "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
							}
							function normalizeStringPosix(path, allowAboveRoot) {
								var res = "";
								var lastSegmentLength = 0;
								var lastSlash = -1;
								var dots = 0;
								var code;
								for (var i = 0; i <= path.length; ++i) {
									if (i < path.length) code = path.charCodeAt(i);
									else if (code === 47) break;
									else code = 47;
									if (code === 47) {
										if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
											if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
												if (res.length > 2) {
													var lastSlashIndex = res.lastIndexOf("/");
													if (lastSlashIndex !== res.length - 1) {
														if (lastSlashIndex === -1) {
															res = "";
															lastSegmentLength = 0;
														} else {
															res = res.slice(0, lastSlashIndex);
															lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
														}
														lastSlash = i;
														dots = 0;
														continue;
													}
												} else if (res.length === 2 || res.length === 1) {
													res = "";
													lastSegmentLength = 0;
													lastSlash = i;
													dots = 0;
													continue;
												}
											}
											if (allowAboveRoot) {
												if (res.length > 0) res += "/..";
												else res = "..";
												lastSegmentLength = 2;
											}
										} else {
											if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
											else res = path.slice(lastSlash + 1, i);
											lastSegmentLength = i - lastSlash - 1;
										}
										lastSlash = i;
										dots = 0;
									} else if (code === 46 && dots !== -1) ++dots;
									else dots = -1;
								}
								return res;
							}
							function _format(sep, pathObject) {
								var dir = pathObject.dir || pathObject.root;
								var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
								if (!dir) return base;
								if (dir === pathObject.root) return dir + base;
								return dir + sep + base;
							}
							var posix = {
								resolve: function resolve() {
									var resolvedPath = "";
									var resolvedAbsolute = false;
									var cwd;
									for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
										var path;
										if (i >= 0) path = arguments[i];
										else {
											if (cwd === void 0) cwd = process.cwd();
											path = cwd;
										}
										assertPath(path);
										if (path.length === 0) continue;
										resolvedPath = path + "/" + resolvedPath;
										resolvedAbsolute = path.charCodeAt(0) === 47;
									}
									resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
									if (resolvedAbsolute) {
										if (resolvedPath.length > 0) return "/" + resolvedPath;
										else return "/";
									} else if (resolvedPath.length > 0) return resolvedPath;
									else return ".";
								},
								normalize: function normalize(path) {
									assertPath(path);
									if (path.length === 0) return ".";
									var isAbsolute = path.charCodeAt(0) === 47;
									var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
									path = normalizeStringPosix(path, !isAbsolute);
									if (path.length === 0 && !isAbsolute) path = ".";
									if (path.length > 0 && trailingSeparator) path += "/";
									if (isAbsolute) return "/" + path;
									return path;
								},
								isAbsolute: function isAbsolute(path) {
									assertPath(path);
									return path.length > 0 && path.charCodeAt(0) === 47;
								},
								join: function join() {
									if (arguments.length === 0) return ".";
									var joined;
									for (var i = 0; i < arguments.length; ++i) {
										var arg = arguments[i];
										assertPath(arg);
										if (arg.length > 0) {
											if (joined === void 0) joined = arg;
											else joined += "/" + arg;
										}
									}
									if (joined === void 0) return ".";
									return posix.normalize(joined);
								},
								relative: function relative(from, to) {
									assertPath(from);
									assertPath(to);
									if (from === to) return "";
									from = posix.resolve(from);
									to = posix.resolve(to);
									if (from === to) return "";
									var fromStart = 1;
									for (; fromStart < from.length; ++fromStart) if (from.charCodeAt(fromStart) !== 47) break;
									var fromEnd = from.length;
									var fromLen = fromEnd - fromStart;
									var toStart = 1;
									for (; toStart < to.length; ++toStart) if (to.charCodeAt(toStart) !== 47) break;
									var toLen = to.length - toStart;
									var length = fromLen < toLen ? fromLen : toLen;
									var lastCommonSep = -1;
									var i = 0;
									for (; i <= length; ++i) {
										if (i === length) {
											if (toLen > length) {
												if (to.charCodeAt(toStart + i) === 47) return to.slice(toStart + i + 1);
												else if (i === 0) return to.slice(toStart + i);
											} else if (fromLen > length) {
												if (from.charCodeAt(fromStart + i) === 47) lastCommonSep = i;
												else if (i === 0) lastCommonSep = 0;
											}
											break;
										}
										var fromCode = from.charCodeAt(fromStart + i);
										if (fromCode !== to.charCodeAt(toStart + i)) break;
										else if (fromCode === 47) lastCommonSep = i;
									}
									var out = "";
									for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) if (i === fromEnd || from.charCodeAt(i) === 47) {
										if (out.length === 0) out += "..";
										else out += "/..";
									}
									if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
									else {
										toStart += lastCommonSep;
										if (to.charCodeAt(toStart) === 47) ++toStart;
										return to.slice(toStart);
									}
								},
								_makeLong: function _makeLong(path) {
									return path;
								},
								dirname: function dirname(path) {
									assertPath(path);
									if (path.length === 0) return ".";
									var code = path.charCodeAt(0);
									var hasRoot = code === 47;
									var end = -1;
									var matchedSlash = true;
									for (var i = path.length - 1; i >= 1; --i) {
										code = path.charCodeAt(i);
										if (code === 47) {
											if (!matchedSlash) {
												end = i;
												break;
											}
										} else matchedSlash = false;
									}
									if (end === -1) return hasRoot ? "/" : ".";
									if (hasRoot && end === 1) return "//";
									return path.slice(0, end);
								},
								basename: function basename(path, ext) {
									if (ext !== void 0 && typeof ext !== "string") throw new TypeError("\"ext\" argument must be a string");
									assertPath(path);
									var start = 0;
									var end = -1;
									var matchedSlash = true;
									var i;
									if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
										if (ext.length === path.length && ext === path) return "";
										var extIdx = ext.length - 1;
										var firstNonSlashEnd = -1;
										for (i = path.length - 1; i >= 0; --i) {
											var code = path.charCodeAt(i);
											if (code === 47) {
												if (!matchedSlash) {
													start = i + 1;
													break;
												}
											} else {
												if (firstNonSlashEnd === -1) {
													matchedSlash = false;
													firstNonSlashEnd = i + 1;
												}
												if (extIdx >= 0) {
													if (code === ext.charCodeAt(extIdx)) {
														if (--extIdx === -1) end = i;
													} else {
														extIdx = -1;
														end = firstNonSlashEnd;
													}
												}
											}
										}
										if (start === end) end = firstNonSlashEnd;
										else if (end === -1) end = path.length;
										return path.slice(start, end);
									} else {
										for (i = path.length - 1; i >= 0; --i) if (path.charCodeAt(i) === 47) {
											if (!matchedSlash) {
												start = i + 1;
												break;
											}
										} else if (end === -1) {
											matchedSlash = false;
											end = i + 1;
										}
										if (end === -1) return "";
										return path.slice(start, end);
									}
								},
								extname: function extname(path) {
									assertPath(path);
									var startDot = -1;
									var startPart = 0;
									var end = -1;
									var matchedSlash = true;
									var preDotState = 0;
									for (var i = path.length - 1; i >= 0; --i) {
										var code = path.charCodeAt(i);
										if (code === 47) {
											if (!matchedSlash) {
												startPart = i + 1;
												break;
											}
											continue;
										}
										if (end === -1) {
											matchedSlash = false;
											end = i + 1;
										}
										if (code === 46) {
											if (startDot === -1) startDot = i;
											else if (preDotState !== 1) preDotState = 1;
										} else if (startDot !== -1) preDotState = -1;
									}
									if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
									return path.slice(startDot, end);
								},
								format: function format(pathObject) {
									if (pathObject === null || typeof pathObject !== "object") throw new TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof pathObject);
									return _format("/", pathObject);
								},
								parse: function parse(path) {
									assertPath(path);
									var ret = {
										root: "",
										dir: "",
										base: "",
										ext: "",
										name: ""
									};
									if (path.length === 0) return ret;
									var code = path.charCodeAt(0);
									var isAbsolute = code === 47;
									var start;
									if (isAbsolute) {
										ret.root = "/";
										start = 1;
									} else start = 0;
									var startDot = -1;
									var startPart = 0;
									var end = -1;
									var matchedSlash = true;
									var i = path.length - 1;
									var preDotState = 0;
									for (; i >= start; --i) {
										code = path.charCodeAt(i);
										if (code === 47) {
											if (!matchedSlash) {
												startPart = i + 1;
												break;
											}
											continue;
										}
										if (end === -1) {
											matchedSlash = false;
											end = i + 1;
										}
										if (code === 46) {
											if (startDot === -1) startDot = i;
											else if (preDotState !== 1) preDotState = 1;
										} else if (startDot !== -1) preDotState = -1;
									}
									if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
										if (end !== -1) {
											if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);
											else ret.base = ret.name = path.slice(startPart, end);
										}
									} else {
										if (startPart === 0 && isAbsolute) {
											ret.name = path.slice(1, startDot);
											ret.base = path.slice(1, end);
										} else {
											ret.name = path.slice(startPart, startDot);
											ret.base = path.slice(startPart, end);
										}
										ret.ext = path.slice(startDot, end);
									}
									if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
									else if (isAbsolute) ret.dir = "/";
									return ret;
								},
								sep: "/",
								delimiter: ":",
								win32: null,
								posix: null
							};
							posix.posix = posix;
							module$8.exports = posix;
						}),
						(function(__unused_webpack_module, exports$41, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$41, "__esModule", { value: true });
							var utils_1 = __webpack_require__(6);
							/**
							* Benchling format is just JSON. It's virtually the same format.
							*/
							exports$41["default"] = (function(text) {
								var partJSON = JSON.parse(text);
								var seq = (0, utils_1.complement)(partJSON.bases).seq;
								if (seq.length < 1) throw new Error("Invalid Benchling part: empty sequence");
								return [{
									annotations: partJSON.annotations.map(function(a) {
										return __assign(__assign({}, a), { direction: (0, utils_1.parseDirection)(a.strand) });
									}),
									name: partJSON.name || partJSON._id,
									seq,
									type: (0, utils_1.guessType)(seq)
								}];
							});
						}),
						((__unused_webpack_module, exports$42) => {
							Object.defineProperty(exports$42, "__esModule", { value: true });
							exports$42.guessType = exports$42.parseDirection = exports$42.firstElement = exports$42.reverseComplement = exports$42.complement = void 0;
							var comp = {
								A: "T",
								B: "V",
								C: "G",
								D: "H",
								G: "C",
								H: "D",
								K: "M",
								M: "K",
								N: "N",
								R: "Y",
								S: "S",
								T: "A",
								U: "A",
								V: "B",
								W: "W",
								X: "X",
								Y: "R",
								a: "t",
								b: "v",
								c: "g",
								d: "h",
								g: "c",
								h: "d",
								k: "m",
								m: "k",
								n: "n",
								r: "y",
								s: "s",
								t: "a",
								u: "a",
								v: "b",
								w: "w",
								x: "x",
								y: "r"
							};
							/**
							* Return the filtered sequence and its complement if its an empty string, return the same for both.
							*/
							var complement = function(origSeq) {
								if (!origSeq) return {
									compSeq: "",
									seq: ""
								};
								var seq = "";
								var compSeq = "";
								for (var i = 0, origLength = origSeq.length; i < origLength; i += 1) if (comp[origSeq[i]]) {
									seq += origSeq[i];
									compSeq += comp[origSeq[i]];
								}
								return {
									compSeq,
									seq
								};
							};
							exports$42.complement = complement;
							/**
							* Return the reverse complement of a DNA sequence
							*/
							var reverseComplement = function(inputSeq) {
								return (0, exports$42.complement)(inputSeq).compSeq.split("").reverse().join("");
							};
							exports$42.reverseComplement = reverseComplement;
							var firstElement = function(arr) {
								if (!Array.isArray(arr)) return void 0;
								return arr[0];
							};
							exports$42.firstElement = firstElement;
							var fwd = /* @__PURE__ */ new Set([
								"FWD",
								"fwd",
								"FORWARD",
								"forward",
								"FOR",
								"for",
								"TOP",
								"top",
								"1",
								1
							]);
							var rev = /* @__PURE__ */ new Set([
								"REV",
								"rev",
								"REVERSE",
								"reverse",
								"BOTTOM",
								"bottom",
								"-1",
								-1
							]);
							/**
							* Parse the user defined direction, estimate the direction of the element
							*
							* ```js
							* parseDirection("FWD") => 1
							* parseDirection("FORWARD") => 1
							* ```
							*/
							var parseDirection = function(direction) {
								if (!direction) return 0;
								if (fwd.has(direction)) return 1;
								if (rev.has(direction)) return -1;
								return 0;
							};
							exports$42.parseDirection = parseDirection;
							var aminoAcids = Array.from(new Set(Object.values({
								AAA: "K",
								AAC: "N",
								AAG: "K",
								AAT: "N",
								ACA: "T",
								ACC: "T",
								ACG: "T",
								ACT: "T",
								AGA: "R",
								AGC: "S",
								AGG: "R",
								AGT: "S",
								ATA: "I",
								ATC: "I",
								ATG: "M",
								ATT: "I",
								CAA: "Q",
								CAC: "H",
								CAG: "Q",
								CAT: "H",
								CCA: "P",
								CCC: "P",
								CCG: "P",
								CCT: "P",
								CGA: "R",
								CGC: "R",
								CGG: "R",
								CGT: "R",
								CTA: "L",
								CTC: "L",
								CTG: "L",
								CTT: "L",
								GAA: "E",
								GAC: "D",
								GAG: "E",
								GAT: "D",
								GCA: "A",
								GCC: "A",
								GCG: "A",
								GCT: "A",
								GGA: "G",
								GGC: "G",
								GGG: "G",
								GGT: "G",
								GTA: "V",
								GTC: "V",
								GTG: "V",
								GTT: "V",
								TAA: "*",
								TAC: "Y",
								TAG: "*",
								TAT: "Y",
								TCA: "S",
								TCC: "S",
								TCG: "S",
								TCT: "S",
								TGA: "*",
								TGC: "C",
								TGG: "W",
								TGT: "C",
								TTA: "L",
								TTC: "F",
								TTG: "L",
								TTT: "F"
							})).values()).join("");
							var aminoAcidRegex = new RegExp("^[".concat(aminoAcids, "]+$"), "i");
							/** Infer the type of a sequence. This only allows a couple wildcard characters so may be overly strict. */
							var guessType = function(seq) {
								if (/^[atgcn.]+$/i.test(seq)) return "dna";
								else if (/^[augcn.]+$/i.test(seq)) return "rna";
								else if (aminoAcidRegex.test(seq)) return "aa";
								return "unknown";
							};
							exports$42.guessType = guessType;
						}),
						((__unused_webpack_module, exports$43, __webpack_require__) => {
							Object.defineProperty(exports$43, "__esModule", { value: true });
							var fast_xml_parser_1 = __webpack_require__(8);
							var utils_1 = __webpack_require__(6);
							/**
							* Parse a BioBrick in XML format to Seq[]
							*
							* Eg: https://parts.igem.org/cgi/xml/part.cgi?part=BBa_J23100
							*/
							exports$43["default"] = (function(file) {
								var bail = function(err) {
									throw new Error("Failed on BioBrick: ".concat(err));
								};
								var part = new fast_xml_parser_1.XMLParser({
									isArray: function(name) {
										return [
											"features",
											"part_name",
											"sequences"
										].includes(name);
									},
									removeNSPrefix: true
								}).parse(file).rsbpml.part_list.part;
								if (!part) bail("No part seen in part_list");
								var features = part.features, part_name = part.part_name, sequences = part.sequences;
								var name = (0, utils_1.firstElement)(part_name);
								var annotations = features.map(function(_a) {
									var feature = _a.feature;
									if (!feature) return null;
									var direction = feature.direction, endpos = feature.endpos, startpos = feature.startpos, type = feature.type;
									return {
										direction: (0, utils_1.parseDirection)(direction),
										end: +endpos,
										name: "".concat(direction, "-").concat(startpos),
										start: +startpos || 0,
										type: type || void 0
									};
								}).filter(function(a) {
									return a;
								});
								var seq = (0, utils_1.complement)(sequences[0].seq_data).seq;
								return [{
									annotations,
									name,
									seq,
									type: (0, utils_1.guessType)(seq)
								}];
							});
						}),
						((module$9) => {
							module$9.exports = require_fxp();
						}),
						((__unused_webpack_module, exports$44, __webpack_require__) => {
							Object.defineProperty(exports$44, "__esModule", { value: true });
							var utils_1 = __webpack_require__(6);
							exports$44["default"] = (function(text, fileName) {
								if (text.trim().startsWith(">")) return text.split(">").map(function(t) {
									var seq = t.substr(t.indexOf("\n"), t.length).replace(/\s/g, "");
									return {
										annotations: [],
										name: t.substring(0, t.search(/\n|\|/)).replace(/\//g, ""),
										seq,
										type: (0, utils_1.guessType)(seq)
									};
								}).filter(function(p) {
									return p.name && p.seq;
								});
								if (text.trim().startsWith(";")) {
									var name_1 = text.substring(0, text.search(/\n|\|/)).replace(/\//g, "");
									var newlineBeforeSeq = text.indexOf("\n", text.lastIndexOf(";"));
									var seq_1 = text.substring(newlineBeforeSeq, text.length);
									return [{
										annotations: [],
										name: name_1,
										seq: seq_1,
										type: (0, utils_1.guessType)(seq_1)
									}];
								}
								var lastChar = fileName.lastIndexOf(".") || fileName.length;
								var name = fileName.substring(0, lastChar) || "Untitled";
								var seq = text;
								return [{
									annotations: [],
									name,
									seq,
									type: (0, utils_1.guessType)(seq)
								}];
							});
						}),
						((__unused_webpack_module, exports$45, __webpack_require__) => {
							Object.defineProperty(exports$45, "__esModule", { value: true });
							var utils_1 = __webpack_require__(6);
							var tagNameSet = /* @__PURE__ */ new Set([
								"gene",
								"product",
								"note",
								"db_xref",
								"protein_id",
								"label",
								"lab_host",
								"locus_tag"
							]);
							var tagColorSet = /* @__PURE__ */ new Set([
								"ApEinfo_fwdcolor",
								"ApEinfo_revcolor",
								"loom_color"
							]);
							/**
							* takes in a string representation of a GenBank file and outputs our
							* part representation of it. an example of a Genbank file can be found
							* at ./parsers/Gebank, though there is significant variability to the
							* format
							*
							* another official example can be found at:
							* https://www.ncbi.nlm.nih.gov/Sitemap/samplerecord.html
							*/
							exports$45["default"] = (function(fileInput, fileName) {
								return fileInput.split(/\/\/\s/g).filter(function(f) {
									return f.length > 5;
								}).map(function(file) {
									var parsedName = file.substring(file.indexOf("LOCUS"), file.search(/\\n|\n/)).split(/\s{2,}/g).filter(function(h) {
										return h;
									})[1];
									if (parsedName === "Exported" && file.includes("SnapGene") || Number.parseInt(parsedName, 10)) {
										var accessionName = false;
										if (file.includes("ACCESSION")) {
											var accession = file.substring(file.indexOf("ACCESSION"), file.indexOf("\n", file.indexOf("ACCESSION"))).replace(".", "").split(/\s{2,}/).filter(function(a) {
												return a !== "ACCESSION";
											}).pop();
											if (accession) {
												parsedName = accession;
												accessionName = true;
											}
										}
										if (!accessionName && fileName) parsedName = fileName.substring(0, Math.max(fileName.search(/\n|\||\./), fileName.lastIndexOf("."))).replace(/\/\s/g, "");
										else if (!accessionName) parsedName = "Unnamed";
									}
									var seq = file.substring(file.lastIndexOf("ORIGIN") + 6, file.length).replace(/[^gatc]/gi, "");
									seq = (0, utils_1.complement)(seq).seq;
									var annotations = [];
									var primers = [];
									if (file.indexOf("FEATURES")) {
										var FEATURES_LINE = file.indexOf("FEATURES");
										var FEATURES_NEW_LINE = file.indexOf("\n", FEATURES_LINE);
										var ORIGIN_LINE = file.lastIndexOf("ORIGIN");
										if (file.includes("CONTIG")) ORIGIN_LINE = Math.min(ORIGIN_LINE, file.indexOf("CONTIG"));
										file.substring(FEATURES_NEW_LINE, ORIGIN_LINE).split(/\n/).filter(function(r) {
											return r;
										}).forEach(function(r) {
											var currLine = r.split(/\s{2,}/g).filter(function(l) {
												return l;
											});
											if (currLine.length > 1) {
												var type = currLine[0], rangeString = currLine[1];
												var rangeRegex = /\d+/g;
												var direction = r.includes("complement") ? -1 : 1;
												var _a = [0, 0], start = _a[0], end = _a[1];
												var startSearch = rangeRegex.exec(rangeString);
												if (startSearch) {
													start = +startSearch[0] - 1 % seq.length;
													end = (start + 1) % seq.length;
													var endSearch = rangeRegex.exec(rangeString);
													if (endSearch) end = +endSearch[0] % seq.length;
												}
												if (type !== "source") annotations.push({
													direction,
													end,
													name: "",
													start,
													type
												});
											} else if (currLine.length === 1) {
												if (currLine[0].startsWith("/")) {
													var tag = currLine[0];
													tag = tag.replace(/[/"]/g, "");
													var _b = tag.split(/=/), tagName = _b[0], tagValue = _b[1];
													var lastAnn = annotations.length - 1;
													if (tagNameSet.has(tagName.toLowerCase())) {
														if (lastAnn >= 0 && !annotations[lastAnn].name) annotations[lastAnn].name = tagValue.trim();
													} else if (tagColorSet.has(tagName)) {
														if (lastAnn > -1) annotations[lastAnn].color = tagValue;
													}
												}
											}
										});
									}
									return {
										annotations,
										name: parsedName.trim() || fileName,
										primers,
										seq,
										type: (0, utils_1.guessType)(seq)
									};
								});
							});
						}),
						((__unused_webpack_module, exports$46, __webpack_require__) => {
							Object.defineProperty(exports$46, "__esModule", { value: true });
							var fast_xml_parser_1 = __webpack_require__(8);
							var utils_1 = __webpack_require__(6);
							/**
							* Converts a JBEI file to a Seq
							*
							* https://j5.jbei.org/j5manual/pages/94.html
							*/
							exports$46["default"] = (function(JBEI) {
								var fileString = JBEI.replace(/“|”/g, "\"");
								var seq = new fast_xml_parser_1.XMLParser({ removeNSPrefix: true }).parse(fileString).seq;
								var features = seq.features, name = seq.name, sequence = seq.sequence;
								var parsedName = "Unnamed";
								if (name) parsedName = name;
								var parsedSeq = (0, utils_1.complement)(sequence).seq;
								if (!parsedSeq) return [];
								var annotations = [];
								if (features && features.feature) features.feature.forEach(function(feature) {
									if (!feature) return;
									var complement = feature.complement, label = feature.label, location = feature.location, type = feature.type;
									if (location && location.genbankStart && location.end) annotations.push({
										direction: complement ? -1 : 1,
										end: +location.end || 0,
										name: label || "Untitled",
										start: +location.genbankStart - 1 || 0,
										type: type || "N/A"
									});
								});
								return [{
									annotations,
									name: parsedName,
									seq: parsedSeq,
									type: (0, utils_1.guessType)(parsedSeq)
								}];
							});
						}),
						((__unused_webpack_module, exports$47, __webpack_require__) => {
							Object.defineProperty(exports$47, "__esModule", { value: true });
							var sbol_v1_1 = __webpack_require__(13);
							var sbol_v2_1 = __webpack_require__(14);
							/**
							* takes in an SBOL file in v1 or v2 format, and parses to an array of parts
							* that match the Loom data model
							*/
							exports$47["default"] = (function(sbol, fileName) {
								return sbol.includes("sbols.org/v1#") ? (0, sbol_v1_1.default)(sbol) : (0, sbol_v2_1.default)(sbol, fileName);
							});
						}),
						((__unused_webpack_module, exports$48, __webpack_require__) => {
							Object.defineProperty(exports$48, "__esModule", { value: true });
							var fast_xml_parser_1 = __webpack_require__(8);
							var utils_1 = __webpack_require__(6);
							/**
							* takes an SBOL file, as a string, and converts it into our DB
							* representation of a part(s). an example of this type of file can be
							* found in ../examples/j5.SBOL.xml
							*/
							exports$48["default"] = (function(sbol) {
								var fileString = sbol.replace(/“|”/g, "\"");
								var parsedSBOL = new fast_xml_parser_1.XMLParser({
									ignoreAttributes: false,
									isArray: function(name) {
										return [
											"Sequence",
											"Collection",
											"DnaComponent",
											"dnaSequence",
											"ComponentDefinition",
											"SequenceAnnotation",
											"sequenceAnnotation",
											"elements",
											"component",
											"annotation"
										].includes(name);
									},
									removeNSPrefix: true
								}).parse(fileString);
								var RDF = null;
								if (parsedSBOL.RDF) RDF = parsedSBOL.RDF;
								var Collection = RDF.Collection, DnaComponent = RDF.DnaComponent;
								if (Collection && Collection.length) {
									var partList_1 = [];
									Collection.forEach(function(_a) {
										var component = _a.component;
										if (component && component.length) component.forEach(function(_a) {
											var nestedDnaComponent = _a.DnaComponent;
											partList_1.push(dnaComponentToPart(nestedDnaComponent[0], {
												file: sbol,
												strict: false
											}));
										});
									});
									if (partList_1.length) return partList_1;
								} else if (DnaComponent && DnaComponent.length) {
									var validPart = dnaComponentToPart(DnaComponent[0], {
										file: sbol,
										strict: false
									});
									if (validPart) return [validPart];
								}
								var dnaComponentAccumulator = [];
								findDnaComponentNodes(dnaComponentAccumulator, RDF);
								var attemptedSeqs = dnaComponentAccumulator.map(function(p) {
									return dnaComponentToPart(p, {
										file: sbol,
										strict: true
									});
								}).filter(function(p) {
									return !!p;
								});
								if (attemptedSeqs.length) return attemptedSeqs;
								var dnaSequenceAccumulator = [];
								findSequenceNodes(dnaSequenceAccumulator, RDF);
								return dnaSequenceAccumulator.map(function(p) {
									return sequenceToPart(p, sbol);
								}).filter(function(p) {
									return p;
								});
							});
							/**
							* find all the nodes within the JSON document that are keyed "Sequence"
							*
							* this is another last-resort scrapper for trying to find valid parts
							*/
							var findSequenceNodes = function(acc, doc) {
								Object.keys(doc).forEach(function(k) {
									if (k === "Sequence" && doc[k].length) acc.push.apply(acc, doc[k]);
									if (Array.isArray(doc[k])) doc[k].forEach(function(nestedNode) {
										findSequenceNodes(acc, nestedNode);
									});
								});
							};
							/**
							* after getting a DnaComponent out of the SBOL document,
							* at either the root RDF level or from within a Collection/Annotation
							* hierarchy, convert that DnaComponent to a Seq
							*/
							var dnaComponentToPart = function(DnaComponent, options) {
								var _a = options.strict, strict = _a === void 0 ? false : _a;
								var annotation = DnaComponent.annotation, displayId = DnaComponent.displayId, dnaSequence = DnaComponent.dnaSequence, name = DnaComponent.name;
								var parsedName = "Unnamed";
								if (name) parsedName = name;
								else if (displayId) parsedName = displayId;
								else if (strict) return null;
								var seq = "";
								if (dnaSequence && dnaSequence[0].DnaSequence) seq = dnaSequence[0].DnaSequence.nucleotides;
								var parsedSeq = (0, utils_1.complement)(seq).seq;
								if (!parsedSeq) return null;
								var annotations = [];
								if (annotation) annotation.forEach(function(_a) {
									var SequenceAnnotation = _a.SequenceAnnotation;
									if (!SequenceAnnotation || !SequenceAnnotation[0]) return;
									var _b = SequenceAnnotation[0], bioEnd = _b.bioEnd, bioStart = _b.bioStart, strand = _b.strand, subComponent = _b.subComponent;
									if (subComponent && subComponent.DnaComponent && subComponent.DnaComponent[0]) {
										var _c = subComponent.DnaComponent[0], annId = _c.displayId, annName = _c.name, annType = _c.type;
										annotations.push({
											direction: strand === "+" ? 1 : -1,
											end: bioEnd - 1 || 0,
											name: annName || annId || "Untitled",
											start: bioStart - 1 || 0,
											type: annType["@_resource"] || "N/A"
										});
									}
								});
								return {
									annotations,
									name: parsedName,
									seq: parsedSeq,
									type: (0, utils_1.guessType)(seq)
								};
							};
							/**
							* find all nodes that of the type Sequence, and convert those to parts "Sequence" -> Part
							*
							* this is not the standard format. see A1.xml
							*/
							var sequenceToPart = function(Seq, file) {
								var name = Seq.displayId || Seq.title || "Unnamed";
								var seqOrig = Seq.elements[0] || "";
								var _a = (0, utils_1.complement)(seqOrig), compSeq = _a.compSeq, seq = _a.seq;
								return {
									annotations: [],
									circular: file.search(/plasmid/i) > 0,
									compSeq,
									name,
									seq,
									type: (0, utils_1.guessType)(seq)
								};
							};
							/**
							* find all the nodes within the SBOL JSON document that are keyed "DnaComponent"
							*
							* this is a last-resort scrapper that tries to find valid parts that aren't within a root
							* DnaComponent document or within a root Collection array
							*/
							var findDnaComponentNodes = function(acc, doc) {
								Object.keys(doc).forEach(function(k) {
									if (k === "DnaComponent" && doc[k].length) acc.push.apply(acc, doc[k]);
									if (Array.isArray(doc[k])) doc[k].forEach(function(nestedNode) {
										findDnaComponentNodes(acc, nestedNode);
									});
								});
							};
						}),
						((__unused_webpack_module, exports$49, __webpack_require__) => {
							Object.defineProperty(exports$49, "__esModule", { value: true });
							var fast_xml_parser_1 = __webpack_require__(8);
							var utils_1 = __webpack_require__(6);
							/**
							* Converts an SBOL file to our Seq format.
							*
							* SBOL v2.0 schema definition can be found at: http://sbolstandard.org/wp-content/uploads/2016/06/SBOL-data-model-2.2.1.pdf
							* differs from SBOL v1.0 in that the ComponentDefinitions are like the root parts,
							* and the sequence and annotations are separated (they're no longer defined relationally
							* by nesting but, instead, by id) we only care about components that have sequence information
							*/
							exports$49["default"] = (function(sbol, fileName) {
								var fileString = sbol.replace(/“|”/g, "\"");
								var parsedSBOL = new fast_xml_parser_1.XMLParser({
									ignoreAttributes: false,
									isArray: function(name) {
										return [
											"Sequence",
											"ComponentDefinition",
											"SequenceAnnotation",
											"sequenceAnnotation",
											"elements"
										].includes(name);
									},
									removeNSPrefix: true
								}).parse(fileString);
								try {
									var seqList = parseSBOL2(parsedSBOL, fileName);
									if (seqList.length) return seqList;
									else throw new Error("No Sequence info found");
								} catch (err) {
									throw new Error("Failed to parse SBOL v2 file: ".concat(err));
								}
							});
							var parseSBOL2 = function(parsedSBOL, fileName) {
								var RDF = null;
								if (parsedSBOL.RDF) RDF = parsedSBOL.RDF;
								if (!RDF) throw new Error("No root RDF document");
								var ComponentDefinition = RDF.ComponentDefinition, Sequence = RDF.Sequence;
								if (!ComponentDefinition && !Sequence) throw new Error("Failed to parse SBOL v2: No ComponentDefinition or Sequence");
								var getSeq = function(seqID) {
									var seqElement = seqID ? Sequence.find(function(s) {
										return s.persistentIdentity && s.persistentIdentity.length && s.persistentIdentity["@_resource"] === seqID || s["@_about"] === seqID;
									}) : Sequence[0];
									if (seqElement && seqElement.elements) {
										var seq_1 = (0, utils_1.complement)(seqElement.elements[0] || "").seq;
										return {
											annotations: [],
											name: seqElement.displayId,
											seq: seq_1,
											type: (0, utils_1.guessType)(seq_1)
										};
									}
									return null;
								};
								var seqList = [];
								ComponentDefinition === null || ComponentDefinition === void 0 || ComponentDefinition.forEach(function(c, i) {
									if (!c.sequence) return;
									var displayId = c.displayId, sequence = c.sequence, sequenceAnnotation = c.sequenceAnnotation;
									var name = displayId || "".concat(fileName, "_").concat(i + 1);
									var annotations = [];
									(sequenceAnnotation || []).forEach(function(_a) {
										var ann = _a.SequenceAnnotation[0];
										var annId = ann.displayId;
										var range = ann.location.Range;
										if (range) annotations.push({
											end: range.end - 1,
											name: annId,
											start: range.start - 1
										});
									});
									var seq = getSeq(sequence["@_resource"]);
									if (seq) seqList.push({
										annotations,
										name,
										seq: seq.seq,
										type: seq.type
									});
								});
								var seq = getSeq();
								if (!seqList.length && seq) seqList.push(seq);
								return seqList;
							};
						}),
						((__unused_webpack_module, exports$50, __webpack_require__) => {
							Object.defineProperty(exports$50, "__esModule", { value: true });
							var utils_1 = __webpack_require__(6);
							var tagNameList = [
								"gene",
								"product",
								"note",
								"db_xref",
								"protein_id",
								"label",
								"lab_host"
							];
							var tagColorList = [
								"ApEinfo_fwdcolor",
								"ApEinfo_revcolor",
								"loom_color"
							];
							/**
							* takes in a string representation of a SeqBuilder file and outputs our
							* part representation of it. an example of a SeqBuilder file can be found
							* at imports/io/examples/seqbuilder, though there may be variations to the
							* format
							*/
							exports$50["default"] = (function(fileInput, fileName) {
								return fileInput.split(/\/\/\s/g).map(function(file) {
									var seq = file.substring(file.search(/.*?written by seqbuilder .*?[0-9.]+[^actg]+/i) + file.match(/.*?written by seqbuilder .*?[0-9.]+[^actg]+/i)[0].length, file.length).match(/[actgyrwskmdvhbxn]+/gim)[0];
									seq = (0, utils_1.complement)(seq).seq;
									var parsedName = fileName.length > 0 ? fileName : "Unnamed";
									if (~file.indexOf("LOCUS")) {
										var HEADER_ROW = file.substring(file.indexOf("LOCUS"), file.search(/\\n|\n/));
										if (HEADER_ROW && HEADER_ROW.split(/\s{2,}/g)) parsedName = HEADER_ROW.split(/\s{2,}/g).filter(function(h) {
											return h;
										})[1];
									}
									if (parsedName === "Exported" && file.includes("SnapGene") || Number.parseInt(parsedName, 10)) {
										var accessionName = false;
										if (file.includes("ACCESSION")) {
											var accession = file.substring(file.indexOf("ACCESSION"), file.indexOf("\n", file.indexOf("ACCESSION"))).replace(".", "").split(/\s{2,}/).filter(function(a) {
												return a !== "ACCESSION";
											}).pop();
											if (accession) {
												parsedName = accession;
												accessionName = true;
											}
										}
										if (!accessionName && fileName) parsedName = fileName.substring(0, Math.max(fileName.search(/\n|\||\./), fileName.lastIndexOf("."))).replace(/\/\s/g, "");
										else if (!accessionName) parsedName = "Unnamed";
									}
									var annotations = [];
									if (file.indexOf("FEATURES")) {
										var FEATURES_LINE = file.indexOf("FEATURES");
										var FEATURES_NEW_LINE = file.indexOf("\n", FEATURES_LINE);
										var ORIGIN_LINE = file.lastIndexOf("ORIGIN");
										if (file.includes("CONTIG")) ORIGIN_LINE = Math.min(ORIGIN_LINE, file.indexOf("CONTIG"));
										file.substring(FEATURES_NEW_LINE, ORIGIN_LINE).split(/\n/).filter(function(r) {
											return r;
										}).forEach(function(r) {
											var currLine = r.split(/\s{2,}/g).filter(function(l) {
												return l;
											});
											if (currLine.length > 1) {
												var type = currLine[0], rangeString = currLine[1];
												var rangeRegex = /\d+/g;
												var direction = r.includes("complement") ? -1 : 1;
												var _a = [0, 0], start = _a[0], end = _a[1];
												var startSearch = rangeRegex.exec(rangeString);
												if (startSearch) {
													start = +startSearch[0] - 1 % seq.length;
													var endSearch = rangeRegex.exec(rangeString);
													if (endSearch) end = +endSearch[0] % seq.length;
												}
												if (type !== "source") annotations.push({
													direction,
													end,
													name: "",
													start,
													type
												});
											} else if (currLine.length === 1) {
												var tag = currLine[0];
												tag = tag.replace(/[/"]/g, "");
												var _b = tag.split(/=/), tagName = _b[0], tagValue = _b[1];
												var lastAnnIndex = annotations.length - 1;
												if (tagNameList.includes(tagName)) {
													if (lastAnnIndex > -1 && !annotations[annotations.length - 1].name) annotations[annotations.length - 1].name = tagValue.trim();
												} else if (tagColorList.includes(tagName)) {
													if (lastAnnIndex > -1) annotations[annotations.length - 1].color = tagValue;
												}
											}
										});
									}
									return {
										annotations,
										name: parsedName.trim() || fileName,
										seq,
										type: (0, utils_1.guessType)(seq)
									};
								});
							});
						}),
						(function(__unused_webpack_module, exports$51, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$51, "__esModule", { value: true });
							var fast_xml_parser_1 = __webpack_require__(8);
							var path_1 = __webpack_require__(4);
							var utils_1 = __webpack_require__(6);
							/**
							* Parse a SnapGene file to Seq[]
							*
							* this is adapted from https://github.com/TeselaGen/ve-sequence-parsers/blob/master/src/parsers/snapgeneToJson.js
							* which was adapted from https://github.com/IsaacLuo/SnapGeneFileReader/blob/master/snapgene_reader/snapgene_reader.py
							*/
							exports$51["default"] = (function(options) {
								var _a;
								if (!options || !options.source) throw new Error("Failed to parse SnapGene file. No valid file input");
								var fileName = (options === null || options === void 0 ? void 0 : options.fileName) || "";
								var seq = {
									annotations: [],
									circular: false,
									name: "",
									seq: "",
									type: "unknown"
								};
								var buffer = Buffer.from(options.source);
								var offset = 0;
								var read = function(size) {
									var start = offset;
									offset += size;
									return buffer.subarray(start, offset);
								};
								var readEnc = function(size, fmt) {
									return read(size).toString(fmt);
								};
								read(1);
								var length = read(4).readUInt32BE();
								var title = readEnc(8, "ascii");
								if (length !== 14 || title !== "SnapGene") throw new Error("Wrong format for a SnapGene file: length=".concat(length, " title=").concat(title));
								read(2);
								read(2);
								read(2);
								while (offset < buffer.length) {
									var nextByte = read(1);
									var blockSize = read(4).readUInt32BE();
									var ord = nextByte.toString().charCodeAt(0);
									if (ord === 0) {
										read(1);
										var size = blockSize - 1;
										if (size < 0) throw new Error("Failed parsing SnapGene: < 0 length sequence");
										seq.seq = readEnc(size, "ascii");
									} else if (ord === 10) {
										var xml = readEnc(blockSize, "utf8");
										new fast_xml_parser_1.XMLParser({
											attributeNamePrefix: "",
											ignoreAttributes: false,
											isArray: function(name) {
												return name === "Q" || name === "Segment";
											},
											removeNSPrefix: true
										}).parse(xml).Features.Feature.forEach(function(feature) {
											var minStart = 0;
											var maxEnd = 0;
											var _a = feature.Segment[0].range.split("-"), start = _a[0], end = _a[1];
											minStart = minStart === 0 ? +start : Math.min(minStart, +start);
											maxEnd = Math.max(maxEnd, +end);
											seq.annotations.push({
												direction: (0, utils_1.parseDirection)({
													"0": "NONE",
													"1": 1,
													"2": -1,
													"3": "BIDIRECTIONAL",
													undefined: "NONE"
												}[feature.directionality]),
												end: maxEnd - 1,
												name: feature.name,
												start: minStart - 1,
												type: feature.type
											});
										});
									} else read(blockSize);
								}
								return [__assign(__assign({}, seq), {
									name: ((_a = fileName.split(path_1.sep).pop()) === null || _a === void 0 ? void 0 : _a.replace(".dna", "")) || fileName,
									type: (0, utils_1.guessType)(seq.seq)
								})];
							});
						})
					];
					var __webpack_module_cache__ = {};
					function __webpack_require__(moduleId) {
						var cachedModule = __webpack_module_cache__[moduleId];
						if (cachedModule !== void 0) return cachedModule.exports;
						var module$10 = __webpack_module_cache__[moduleId] = { exports: {} };
						__webpack_modules__[moduleId].call(module$10.exports, module$10, module$10.exports, __webpack_require__);
						return module$10.exports;
					}
					return __webpack_require__(0);
				})();
			});
		}));
		//#endregion
		//#region node_modules/webfontloader/webfontloader.js
		var require_webfontloader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
			(function() {
				function aa(a, b, c) {
					return a.call.apply(a.bind, arguments);
				}
				function ba(a, b, c) {
					if (!a) throw Error();
					if (2 < arguments.length) {
						var d = Array.prototype.slice.call(arguments, 2);
						return function() {
							var c = Array.prototype.slice.call(arguments);
							Array.prototype.unshift.apply(c, d);
							return a.apply(b, c);
						};
					}
					return function() {
						return a.apply(b, arguments);
					};
				}
				function p(a, b, c) {
					p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
					return p.apply(null, arguments);
				}
				var q = Date.now || function() {
					return +/* @__PURE__ */ new Date();
				};
				function ca(a, b) {
					this.a = a;
					this.o = b || a;
					this.c = this.o.document;
				}
				var da = !!window.FontFace;
				function t(a, b, c, d) {
					b = a.c.createElement(b);
					if (c) for (var e in c) c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));
					d && b.appendChild(a.c.createTextNode(d));
					return b;
				}
				function u(a, b, c) {
					a = a.c.getElementsByTagName(b)[0];
					a || (a = document.documentElement);
					a.insertBefore(c, a.lastChild);
				}
				function v(a) {
					a.parentNode && a.parentNode.removeChild(a);
				}
				function w(a, b, c) {
					b = b || [];
					c = c || [];
					for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
						for (var f = !1, g = 0; g < d.length; g += 1) if (b[e] === d[g]) {
							f = !0;
							break;
						}
						f || d.push(b[e]);
					}
					b = [];
					for (e = 0; e < d.length; e += 1) {
						f = !1;
						for (g = 0; g < c.length; g += 1) if (d[e] === c[g]) {
							f = !0;
							break;
						}
						f || b.push(d[e]);
					}
					a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
				}
				function y(a, b) {
					for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) if (c[d] == b) return !0;
					return !1;
				}
				function ea(a) {
					return a.o.location.hostname || a.a.location.hostname;
				}
				function z(a, b, c) {
					function d() {
						m && e && f && (m(g), m = null);
					}
					b = t(a, "link", {
						rel: "stylesheet",
						href: b,
						media: "all"
					});
					var e = !1, f = !0, g = null, m = c || null;
					da ? (b.onload = function() {
						e = !0;
						d();
					}, b.onerror = function() {
						e = !0;
						g = Error("Stylesheet failed to load");
						d();
					}) : setTimeout(function() {
						e = !0;
						d();
					}, 0);
					u(a, "head", b);
				}
				function A(a, b, c, d) {
					var e = a.c.getElementsByTagName("head")[0];
					if (e) {
						var f = t(a, "script", { src: b }), g = !1;
						f.onload = f.onreadystatechange = function() {
							g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f));
						};
						e.appendChild(f);
						setTimeout(function() {
							g || (g = !0, c && c(Error("Script load timeout")));
						}, d || 5e3);
						return f;
					}
					return null;
				}
				function B() {
					this.a = 0;
					this.c = null;
				}
				function C(a) {
					a.a++;
					return function() {
						a.a--;
						D(a);
					};
				}
				function E(a, b) {
					a.c = b;
					D(a);
				}
				function D(a) {
					0 == a.a && a.c && (a.c(), a.c = null);
				}
				function F(a) {
					this.a = a || "-";
				}
				F.prototype.c = function(a) {
					for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
					return b.join(this.a);
				};
				function G(a, b) {
					this.c = a;
					this.f = 4;
					this.a = "n";
					var c = (b || "n4").match(/^([nio])([1-9])$/i);
					c && (this.a = c[1], this.f = parseInt(c[2], 10));
				}
				function fa(a) {
					return H(a) + " " + (a.f + "00") + " 300px " + I(a.c);
				}
				function I(a) {
					var b = [];
					a = a.split(/,\s*/);
					for (var c = 0; c < a.length; c++) {
						var d = a[c].replace(/['"]/g, "");
						-1 != d.indexOf(" ") || /^\d/.test(d) ? b.push("'" + d + "'") : b.push(d);
					}
					return b.join(",");
				}
				function J(a) {
					return a.a + a.f;
				}
				function H(a) {
					var b = "normal";
					"o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");
					return b;
				}
				function ga(a) {
					var b = 4, c = "n", d = null;
					a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
					return c + b;
				}
				function ha(a, b) {
					this.c = a;
					this.f = a.o.document.documentElement;
					this.h = b;
					this.a = new F("-");
					this.j = !1 !== b.events;
					this.g = !1 !== b.classes;
				}
				function ia(a) {
					a.g && w(a.f, [a.a.c("wf", "loading")]);
					K(a, "loading");
				}
				function L(a) {
					if (a.g) {
						var b = y(a.f, a.a.c("wf", "active")), c = [], d = [a.a.c("wf", "loading")];
						b || c.push(a.a.c("wf", "inactive"));
						w(a.f, c, d);
					}
					K(a, "inactive");
				}
				function K(a, b, c) {
					if (a.j && a.h[b]) if (c) a.h[b](c.c, J(c));
					else a.h[b]();
				}
				function ja() {
					this.c = {};
				}
				function ka(a, b, c) {
					var d = [], e;
					for (e in b) if (b.hasOwnProperty(e)) {
						var f = a.c[e];
						f && d.push(f(b[e], c));
					}
					return d;
				}
				function M(a, b) {
					this.c = a;
					this.f = b;
					this.a = t(this.c, "span", { "aria-hidden": "true" }, this.f);
				}
				function N(a) {
					u(a.c, "body", a.a);
				}
				function O(a) {
					return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + I(a.c) + ";" + ("font-style:" + H(a) + ";font-weight:" + (a.f + "00") + ";");
				}
				function P(a, b, c, d, e, f) {
					this.g = a;
					this.j = b;
					this.a = d;
					this.c = c;
					this.f = e || 3e3;
					this.h = f || void 0;
				}
				P.prototype.start = function() {
					var a = this.c.o.document, b = this, c = q(), d = new Promise(function(d, e) {
						function f() {
							q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function(a) {
								1 <= a.length ? d() : setTimeout(f, 25);
							}, function() {
								e();
							});
						}
						f();
					}), e = null, f = new Promise(function(a, d) {
						e = setTimeout(d, b.f);
					});
					Promise.race([f, d]).then(function() {
						e && (clearTimeout(e), e = null);
						b.g(b.a);
					}, function() {
						b.j(b.a);
					});
				};
				function Q(a, b, c, d, e, f, g) {
					this.v = a;
					this.B = b;
					this.c = c;
					this.a = d;
					this.s = g || "BESbswy";
					this.f = {};
					this.w = e || 3e3;
					this.u = f || null;
					this.m = this.j = this.h = this.g = null;
					this.g = new M(this.c, this.s);
					this.h = new M(this.c, this.s);
					this.j = new M(this.c, this.s);
					this.m = new M(this.c, this.s);
					a = new G(this.a.c + ",serif", J(this.a));
					a = O(a);
					this.g.a.style.cssText = a;
					a = new G(this.a.c + ",sans-serif", J(this.a));
					a = O(a);
					this.h.a.style.cssText = a;
					a = new G("serif", J(this.a));
					a = O(a);
					this.j.a.style.cssText = a;
					a = new G("sans-serif", J(this.a));
					a = O(a);
					this.m.a.style.cssText = a;
					N(this.g);
					N(this.h);
					N(this.j);
					N(this.m);
				}
				var R = {
					D: "serif",
					C: "sans-serif"
				}, S = null;
				function T() {
					if (null === S) {
						var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
						S = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10));
					}
					return S;
				}
				Q.prototype.start = function() {
					this.f.serif = this.j.a.offsetWidth;
					this.f["sans-serif"] = this.m.a.offsetWidth;
					this.A = q();
					U(this);
				};
				function la(a, b, c) {
					for (var d in R) if (R.hasOwnProperty(d) && b === a.f[R[d]] && c === a.f[R[d]]) return !0;
					return !1;
				}
				function U(a) {
					var b = a.g.a.offsetWidth, c = a.h.a.offsetWidth, d;
					(d = b === a.f.serif && c === a.f["sans-serif"]) || (d = T() && la(a, b, c));
					d ? q() - a.A >= a.w ? T() && la(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : ma(a) : V(a, a.v);
				}
				function ma(a) {
					setTimeout(p(function() {
						U(this);
					}, a), 50);
				}
				function V(a, b) {
					setTimeout(p(function() {
						v(this.g.a);
						v(this.h.a);
						v(this.j.a);
						v(this.m.a);
						b(this.a);
					}, a), 0);
				}
				function W(a, b, c) {
					this.c = a;
					this.a = b;
					this.f = 0;
					this.m = this.j = !1;
					this.s = c;
				}
				var X = null;
				W.prototype.g = function(a) {
					var b = this.a;
					b.g && w(b.f, [b.a.c("wf", a.c, J(a).toString(), "active")], [b.a.c("wf", a.c, J(a).toString(), "loading"), b.a.c("wf", a.c, J(a).toString(), "inactive")]);
					K(b, "fontactive", a);
					this.m = !0;
					na(this);
				};
				W.prototype.h = function(a) {
					var b = this.a;
					if (b.g) {
						var c = y(b.f, b.a.c("wf", a.c, J(a).toString(), "active")), d = [], e = [b.a.c("wf", a.c, J(a).toString(), "loading")];
						c || d.push(b.a.c("wf", a.c, J(a).toString(), "inactive"));
						w(b.f, d, e);
					}
					K(b, "fontinactive", a);
					na(this);
				};
				function na(a) {
					0 == --a.f && a.j && (a.m ? (a = a.a, a.g && w(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), K(a, "active")) : L(a.a));
				}
				function oa(a) {
					this.j = a;
					this.a = new ja();
					this.h = 0;
					this.f = this.g = !0;
				}
				oa.prototype.load = function(a) {
					this.c = new ca(this.j, a.context || this.j);
					this.g = !1 !== a.events;
					this.f = !1 !== a.classes;
					pa(this, new ha(this.c, a), a);
				};
				function qa(a, b, c, d, e) {
					var f = 0 == --a.h;
					(a.f || a.g) && setTimeout(function() {
						var a = e || null, m = d || {};
						if (0 === c.length && f) L(b.a);
						else {
							b.f += c.length;
							f && (b.j = f);
							var h, l = [];
							for (h = 0; h < c.length; h++) {
								var k = c[h], n = m[k.c], r = b.a, x = k;
								r.g && w(r.f, [r.a.c("wf", x.c, J(x).toString(), "loading")]);
								K(r, "fontloading", x);
								r = null;
								if (null === X) if (window.FontFace) {
									var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), xa = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
									X = x ? 42 < parseInt(x[1], 10) : xa ? !1 : !0;
								} else X = !1;
								X ? r = new P(p(b.g, b), p(b.h, b), b.c, k, b.s, n) : r = new Q(p(b.g, b), p(b.h, b), b.c, k, b.s, a, n);
								l.push(r);
							}
							for (h = 0; h < l.length; h++) l[h].start();
						}
					}, 0);
				}
				function pa(a, b, c) {
					var d = [], e = c.timeout;
					ia(b);
					var d = ka(a.a, c, a.c), f = new W(a.c, b, e);
					a.h = d.length;
					b = 0;
					for (c = d.length; b < c; b++) d[b].load(function(b, d, c) {
						qa(a, f, b, d, c);
					});
				}
				function ra(a, b) {
					this.c = a;
					this.a = b;
				}
				ra.prototype.load = function(a) {
					function b() {
						if (f["__mti_fntLst" + d]) {
							var c = f["__mti_fntLst" + d](), e = [], h;
							if (c) for (var l = 0; l < c.length; l++) {
								var k = c[l].fontfamily;
								void 0 != c[l].fontStyle && void 0 != c[l].fontWeight ? (h = c[l].fontStyle + c[l].fontWeight, e.push(new G(k, h))) : e.push(new G(k));
							}
							a(e);
						} else setTimeout(function() {
							b();
						}, 50);
					}
					var c = this, d = c.a.projectId, e = c.a.version;
					if (d) {
						var f = c.c.o;
						A(this.c, (c.a.api || "https://fast.fonts.net/jsapi") + "/" + d + ".js" + (e ? "?v=" + e : ""), function(e) {
							e ? a([]) : (f["__MonotypeConfiguration__" + d] = function() {
								return c.a;
							}, b());
						}).id = "__MonotypeAPIScript__" + d;
					} else a([]);
				};
				function sa(a, b) {
					this.c = a;
					this.a = b;
				}
				sa.prototype.load = function(a) {
					var b, c, d = this.a.urls || [], e = this.a.families || [], f = this.a.testStrings || {}, g = new B();
					b = 0;
					for (c = d.length; b < c; b++) z(this.c, d[b], C(g));
					var m = [];
					b = 0;
					for (c = e.length; b < c; b++) if (d = e[b].split(":"), d[1]) for (var h = d[1].split(","), l = 0; l < h.length; l += 1) m.push(new G(d[0], h[l]));
					else m.push(new G(d[0]));
					E(g, function() {
						a(m, f);
					});
				};
				function ta(a, b) {
					a ? this.c = a : this.c = ua;
					this.a = [];
					this.f = [];
					this.g = b || "";
				}
				var ua = "https://fonts.googleapis.com/css";
				function va(a, b) {
					for (var c = b.length, d = 0; d < c; d++) {
						var e = b[d].split(":");
						3 == e.length && a.f.push(e.pop());
						var f = "";
						2 == e.length && "" != e[1] && (f = ":");
						a.a.push(e.join(f));
					}
				}
				function wa(a) {
					if (0 == a.a.length) throw Error("No fonts to load!");
					if (-1 != a.c.indexOf("kit=")) return a.c;
					for (var b = a.a.length, c = [], d = 0; d < b; d++) c.push(a.a[d].replace(/ /g, "+"));
					b = a.c + "?family=" + c.join("%7C");
					0 < a.f.length && (b += "&subset=" + a.f.join(","));
					0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));
					return b;
				}
				function ya(a) {
					this.f = a;
					this.a = [];
					this.c = {};
				}
				var za = {
					latin: "BESbswy",
					"latin-ext": "çöüğş",
					cyrillic: "йяЖ",
					greek: "αβΣ",
					khmer: "កខគ",
					Hanuman: "កខគ"
				}, Aa = {
					thin: "1",
					extralight: "2",
					"extra-light": "2",
					ultralight: "2",
					"ultra-light": "2",
					light: "3",
					regular: "4",
					book: "4",
					medium: "5",
					"semi-bold": "6",
					semibold: "6",
					"demi-bold": "6",
					demibold: "6",
					bold: "7",
					"extra-bold": "8",
					extrabold: "8",
					"ultra-bold": "8",
					ultrabold: "8",
					black: "9",
					heavy: "9",
					l: "3",
					r: "4",
					b: "7"
				}, Ba = {
					i: "i",
					italic: "i",
					n: "n",
					normal: "n"
				}, Ca = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
				function Da(a) {
					for (var b = a.f.length, c = 0; c < b; c++) {
						var d = a.f[c].split(":"), e = d[0].replace(/\+/g, " "), f = ["n4"];
						if (2 <= d.length) {
							var g;
							var m = d[1];
							g = [];
							if (m) for (var m = m.split(","), h = m.length, l = 0; l < h; l++) {
								var k = m[l];
								if (k.match(/^[\w-]+$/)) {
									var n = Ca.exec(k.toLowerCase());
									if (null == n) k = "";
									else {
										k = n[2];
										k = null == k || "" == k ? "n" : Ba[k];
										n = n[1];
										if (null == n || "" == n) n = "4";
										else var r = Aa[n], n = r ? r : isNaN(n) ? "4" : n.substr(0, 1);
										k = [k, n].join("");
									}
								} else k = "";
								k && g.push(k);
							}
							0 < g.length && (f = g);
							3 == d.length && (d = d[2], g = [], d = d ? d.split(",") : g, 0 < d.length && (d = za[d[0]]) && (a.c[e] = d));
						}
						a.c[e] || (d = za[e]) && (a.c[e] = d);
						for (d = 0; d < f.length; d += 1) a.a.push(new G(e, f[d]));
					}
				}
				function Ea(a, b) {
					this.c = a;
					this.a = b;
				}
				var Fa = {
					Arimo: !0,
					Cousine: !0,
					Tinos: !0
				};
				Ea.prototype.load = function(a) {
					var b = new B(), c = this.c, d = new ta(this.a.api, this.a.text), e = this.a.families;
					va(d, e);
					var f = new ya(e);
					Da(f);
					z(c, wa(d), C(b));
					E(b, function() {
						a(f.a, f.c, Fa);
					});
				};
				function Ga(a, b) {
					this.c = a;
					this.a = b;
				}
				Ga.prototype.load = function(a) {
					var b = this.a.id, c = this.c.o;
					b ? A(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function(b) {
						if (b) a([]);
						else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
							b = c.Typekit.config.fn;
							for (var e = [], f = 0; f < b.length; f += 2) for (var g = b[f], m = b[f + 1], h = 0; h < m.length; h++) e.push(new G(g, m[h]));
							try {
								c.Typekit.load({
									events: !1,
									classes: !1,
									async: !0
								});
							} catch (l) {}
							a(e);
						}
					}, 2e3) : a([]);
				};
				function Ha(a, b) {
					this.c = a;
					this.f = b;
					this.a = [];
				}
				Ha.prototype.load = function(a) {
					var b = this.f.id, c = this.c.o, d = this;
					b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function(b, c) {
						for (var g = 0, m = c.fonts.length; g < m; ++g) {
							var h = c.fonts[g];
							d.a.push(new G(h.name, ga("font-weight:" + h.weight + ";font-style:" + h.style)));
						}
						a(d.a);
					}, A(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + ea(this.c) + "/" + b + ".js", function(b) {
						b && a([]);
					})) : a([]);
				};
				var Y = new oa(window);
				Y.a.c.custom = function(a, b) {
					return new sa(b, a);
				};
				Y.a.c.fontdeck = function(a, b) {
					return new Ha(b, a);
				};
				Y.a.c.monotype = function(a, b) {
					return new ra(b, a);
				};
				Y.a.c.typekit = function(a, b) {
					return new Ga(b, a);
				};
				Y.a.c.google = function(a, b) {
					return new Ea(b, a);
				};
				var Z = { load: p(Y.load, Y) };
				"function" === typeof define && define.amd ? define(function() {
					return Z;
				}) : "undefined" !== typeof module && module.exports ? module.exports = Z : (window.WebFont = Z, window.WebFontConfig && Y.load(window.WebFontConfig));
			})();
		}));
		/*!
		* seqviz - 3.10.24
		* provided and maintained by Lattice Automation (https://latticeautomation.com/)
		* LICENSE MIT
		*/
		//#endregion
		//#region src/client/formats.ts
		var import_index_browser = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
			(function webpackUniversalModuleDefinition(root, factory) {
				if (typeof exports === "object" && typeof module === "object") module.exports = factory();
				else if (typeof define === "function" && define.amd) define("seqviz", [], factory);
				else if (typeof exports === "object") exports["seqviz"] = factory();
				else root["seqviz"] = factory();
			})(exports, () => {
				return (() => {
					"use strict";
					var __webpack_modules__ = [
						,
						(function(__unused_webpack_module, exports$1, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$1, "__esModule", { value: true });
							exports$1.Arc = exports$1.RENDER_SEQ_LENGTH_CUTOFF = void 0;
							var React = __webpack_require__(2);
							var SeqViewerContainer_1 = __webpack_require__(3);
							var centralIndexContext_1 = __webpack_require__(6);
							var elementsToRows_1 = __webpack_require__(9);
							var isEqual_1 = __webpack_require__(10);
							var style_1 = __webpack_require__(13);
							var Annotations_1 = __webpack_require__(27);
							var CutSites_1 = __webpack_require__(28);
							var Find_1 = __webpack_require__(29);
							var Index_1 = __webpack_require__(30);
							var Labels_1 = __webpack_require__(31);
							var Selection_1 = __webpack_require__(33);
							/** Sequence length cutoff below which the circular viewer's sequence won't be rendered. */
							exports$1.RENDER_SEQ_LENGTH_CUTOFF = 250;
							exports$1["default"] = function(_super) {
								__extends(Circular, _super);
								function Circular(props) {
									var _this = _super.call(this, props) || this;
									/**
									* Deep equality comparison
									*/
									_this.shouldComponentUpdate = function(nextProps) {
										return !(0, isEqual_1.isEqual)(nextProps, _this.props);
									};
									/**
									* Return the SVG rotation transformation needed to put a child element in the
									* correct location around the plasmid. This func makes use of the centralIndex field in parent state
									* to rotate the plasmid viewer.
									*/
									_this.getRotation = function(index) {
										var center = _this.props.center;
										var seqLength = _this.state.seqLength;
										var degrees = (index - _this.context.circular) / seqLength * 360;
										return "rotate(".concat(degrees || 0, ", ").concat(center.x, ", ").concat(center.y, ")");
									};
									/**
									* Given an index along the plasmid and its radius, find the coordinate
									* will be used in many of the child components
									*
									* In general, this is for lines and labels
									*/
									_this.findCoor = function(index, radius, rotate) {
										var center = _this.props.center;
										var seqLength = _this.state.seqLength;
										var radians = ((rotate ? index - _this.context.circular : index) / seqLength - .25) * Math.PI * 2;
										var xAdjust = Math.cos(radians) * radius;
										var yAdjust = Math.sin(radians) * radius;
										return {
											x: center.x + xAdjust,
											y: center.y + yAdjust
										};
									};
									/**
									* Given a coordinate, and the degrees to rotate it, find the new coordinate
									* (assuming that the rotation is around the center)
									*
									* in general this is for text and arcs
									*/
									_this.rotateCoor = function(coor, degrees) {
										var center = _this.props.center;
										var angle = degrees * (Math.PI / 180);
										var cos = Math.cos(angle);
										var sin = Math.sin(angle);
										var xDiff = coor.x - center.x;
										var yDiff = coor.y - center.y;
										var cosX = cos * xDiff;
										var cosY = cos * yDiff;
										var sinX = sin * xDiff;
										var xAdjust = cosX - sin * yDiff;
										var yAdjust = sinX + cosY;
										return {
											x: center.x + xAdjust,
											y: center.y + yAdjust
										};
									};
									/**
									* Given an inner and outer radius, and the length of the element, return the
									* path for an arc that circles the plasmid. The optional paramters sweepFWD and sweepREV
									* are needed for selection arcs (where the direction of the arc isn't known beforehand)
									* and arrowFWD and arrowREV are needed for annotations, where there may be directionality
									*/
									_this.genArc = function(args) {
										var arrowFWD = args.arrowFWD, arrowREV = args.arrowREV, innerRadius = args.innerRadius, largeArc = args.largeArc, length = args.length, outerRadius = args.outerRadius, sweepFWD = args.sweepFWD;
										var radius = _this.props.radius;
										var _a = _this.state, lineHeight = _a.lineHeight, seqLength = _a.seqLength;
										var offset = args.offset === void 0 ? 0 : args.offset;
										var leftBottom = _this.findCoor(offset, innerRadius);
										var leftTop = _this.findCoor(offset, outerRadius);
										var rightBottom = _this.findCoor(length + offset, innerRadius);
										var rightTop = _this.findCoor(length + offset, outerRadius);
										var leftArrow = "";
										var rightArrow = "";
										if (arrowREV || arrowFWD) {
											var centralAngle = lineHeight / 4 / radius;
											var centralAngleDeg = Math.min(centralAngle / 2, length / seqLength) * 360;
											if (arrowREV) {
												leftBottom = _this.rotateCoor(leftBottom, centralAngleDeg);
												leftTop = _this.rotateCoor(leftTop, centralAngleDeg);
												var lArrowC = _this.findCoor(0, (innerRadius + outerRadius) / 2);
												leftArrow = "L ".concat(lArrowC.x, " ").concat(lArrowC.y);
											} else {
												rightBottom = _this.rotateCoor(rightBottom, -centralAngleDeg);
												rightTop = _this.rotateCoor(rightTop, -centralAngleDeg);
												var rArrowC = _this.findCoor(length, (innerRadius + outerRadius) / 2);
												rightArrow = "L ".concat(rArrowC.x, " ").concat(rArrowC.y);
											}
										}
										var lArc = largeArc ? 1 : 0;
										var sFlagF = sweepFWD ? 1 : 0;
										var sFlagR = sweepFWD ? 0 : 1;
										return "M ".concat(rightBottom.x, " ").concat(rightBottom.y, "\n      A ").concat(innerRadius, " ").concat(innerRadius, ", 0, ").concat(lArc, ", ").concat(sFlagR, ", ").concat(leftBottom.x, " ").concat(leftBottom.y, "\n      L ").concat(leftBottom.x, " ").concat(leftBottom.y, "\n      ").concat(leftArrow, "\n      L ").concat(leftTop.x, " ").concat(leftTop.y, "\n      A ").concat(outerRadius, " ").concat(outerRadius, ", 0, ").concat(lArc, ", ").concat(sFlagF, ", ").concat(rightTop.x, " ").concat(rightTop.y, "\n      ").concat(rightArrow, "\n      Z");
									};
									/**
									* handle a scroll event and, if it's a CIRCULAR viewer, update the
									* current central index
									*/
									_this.handleScrollEvent = function(e) {
										var _a = _this.props, rotateOnScroll = _a.rotateOnScroll, seq = _a.seq;
										if (!rotateOnScroll) return;
										var delta = seq.length * (e.deltaY / 5e3);
										delta = Math.floor(delta);
										if (delta === 0) {
											if (e.deltaY > 0) delta = 1;
											else delta = -1;
										}
										var newCentralIndex = _this.context.circular + delta;
										newCentralIndex = (newCentralIndex + seq.length) % seq.length;
										_this.context.setCentralIndex("CIRCULAR", newCentralIndex);
									};
									_this.state = {
										annotationsInRows: [],
										inlinedLabels: [],
										lineHeight: 0,
										outerLabels: [],
										seqLength: 0
									};
									return _this;
								}
								Circular.prototype.render = function() {
									var _a = this.props, center = _a.center, compSeq = _a.compSeq, cutSites = _a.cutSites, handleMouseEvent = _a.handleMouseEvent, inputRef = _a.inputRef, name = _a.name, radius = _a.radius, search = _a.search, seq = _a.seq, showComplement = _a.showComplement, showIndex = _a.showIndex, size = _a.size, yDiff = _a.yDiff;
									var _b = this.state, annotationsInRows = _b.annotationsInRows, inlinedLabels = _b.inlinedLabels, lineHeight = _b.lineHeight, outerLabels = _b.outerLabels, seqLength = _b.seqLength;
									var _c = this;
									var props = {
										center,
										findCoor: _c.findCoor,
										genArc: _c.genArc,
										getRotation: _c.getRotation,
										inputRef,
										lineHeight,
										radius,
										rotateCoor: _c.rotateCoor,
										seqLength
									};
									var totalRows = 4 + annotationsInRows.length;
									var plasmidId = "la-vz-".concat(name, "-viewer-circular");
									if (!size.height) return null;
									return React.createElement("svg", {
										ref: inputRef(plasmidId, {
											type: "SEQ",
											viewer: "CIRCULAR"
										}),
										className: "la-vz-viewer-circular",
										"data-testid": "la-vz-viewer-circular",
										height: size.height,
										id: plasmidId,
										overflow: "visible",
										style: style_1.viewerCircular,
										width: size.width >= 0 ? size.width : 0,
										onMouseDown: handleMouseEvent,
										onMouseMove: handleMouseEvent,
										onMouseUp: handleMouseEvent,
										onWheel: this.handleScrollEvent
									}, React.createElement("g", {
										className: "la-vz-circular-root",
										transform: "translate(0, ".concat(yDiff, ")")
									}, React.createElement(Selection_1.Selection, __assign({}, props, {
										seq,
										totalRows
									})), React.createElement(CutSites_1.CutSites, __assign({}, props, {
										cutSites,
										selectionRows: 4
									})), React.createElement(Index_1.Index, __assign({}, props, {
										compSeq,
										name,
										seq,
										showComplement,
										showIndex,
										size,
										totalRows,
										yDiff
									})), React.createElement(Find_1.Find, {
										genArc: props.genArc,
										getRotation: props.getRotation,
										highlights: this.props.highlights,
										inputRef: props.inputRef,
										lineHeight: props.lineHeight,
										radius: props.radius,
										search,
										seqLength: props.seqLength
									}), React.createElement(Annotations_1.Annotations, __assign({}, props, {
										annotations: annotationsInRows,
										inlinedAnnotations: inlinedLabels,
										rowsToSkip: 0
									})), React.createElement(Labels_1.Labels, __assign({}, props, {
										labels: outerLabels,
										size,
										yDiff
									}))));
								};
								Circular.contextType = centralIndexContext_1.default;
								Circular.getDerivedStateFromProps = function(nextProps) {
									var lineHeight = 14;
									var annotationsInRows = (0, elementsToRows_1.stackElements)(nextProps.annotations, nextProps.seq.length);
									/**
									* find the element labels that need to be rendered outside the plasmid. This is done for
									* annotation names/etc for element titles that don't fit within the width of the element
									* they represent. For example, an annotation might be named "Transcription Factor XYZ"
									* but be only 20bps long on a plasmid that's 20k bps. Obviously that name doesn't fit.
									* But, a gene that's 15k on the same plasmid shouldn't have it's label outside the plasmid
									* when it can easily fit on top of the annotation itself
									*/
									var seqLength = nextProps.seq.length;
									var cutSiteLabels = nextProps.cutSites;
									var innerRadius = nextProps.radius - 3 * lineHeight;
									var inlinedLabels = [];
									var outerLabels = [];
									annotationsInRows.forEach(function(r) {
										var circumf = innerRadius * Math.PI;
										r.forEach(function(ann) {
											var annNameLengthPixels = (ann.name.length + 2) * SeqViewerContainer_1.CHAR_WIDTH;
											var annLengthBases = ann.end - ann.start;
											if (ann.start >= ann.end) annLengthBases += seqLength;
											if (annNameLengthPixels < 2 * circumf * (annLengthBases / seqLength)) inlinedLabels.push(ann.id);
											else {
												var end = ann.end, id = ann.id, name_1 = ann.name, start = ann.start;
												outerLabels.push({
													end,
													id,
													name: name_1,
													start,
													type: "annotation"
												});
											}
										});
										innerRadius -= lineHeight;
									});
									cutSiteLabels.forEach(function(c) {
										return outerLabels.push(__assign(__assign(__assign({}, c.enzyme), c), {
											start: c.fcut,
											type: "enzyme"
										}));
									});
									outerLabels.sort(function(a, b) {
										return Math.min(a.start, a.end) - Math.min(b.start, b.end);
									});
									return {
										annotationsInRows,
										inlinedLabels,
										lineHeight,
										outerLabels,
										seqLength: nextProps.seq.length
									};
								};
								return Circular;
							}(React.Component);
							/**
							* Create an SVG arc around a single element in the Circular Viewer.
							*/
							var Arc = function(props) {
								var className = props.className, color = props.color, direction = props.direction, genArc = props.genArc, getRotation = props.getRotation, inputRef = props.inputRef, lineHeight = props.lineHeight, radius = props.radius, seqLength = props.seqLength, start = props.start, style = props.style;
								var end = props.end;
								if (end < start) end += seqLength;
								var resultLength = Math.abs(end - start);
								var findPath = genArc({
									innerRadius: radius - lineHeight / 2,
									largeArc: resultLength > seqLength / 2,
									length: resultLength,
									outerRadius: radius + lineHeight / 2,
									sweepFWD: true
								});
								var id = "circular-".concat(start, "-").concat(end, "-").concat(direction);
								return React.createElement("path", {
									key: id,
									ref: inputRef(id, {
										end,
										ref: id,
										start,
										type: "FIND",
										viewer: "CIRCULAR"
									}),
									className,
									cursor: "pointer",
									d: findPath,
									fill: color,
									id,
									shapeRendering: "auto",
									stroke: "rgba(0, 0, 0, 0.5)",
									strokeWidth: 1,
									style,
									transform: getRotation(start)
								});
							};
							exports$1.Arc = Arc;
						}),
						((module$1) => {
							module$1.exports = require("react");
						}),
						(function(__unused_webpack_module, exports$2, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							var __rest = this && this.__rest || function(s, e) {
								var t = {};
								for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
								if (s != null && typeof Object.getOwnPropertySymbols === "function") {
									for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
								}
								return t;
							};
							Object.defineProperty(exports$2, "__esModule", { value: true });
							exports$2.CHAR_WIDTH = void 0;
							var React = __webpack_require__(2);
							var react_resize_detector_1 = __webpack_require__(4);
							var Circular_1 = __webpack_require__(1);
							var EventHandler_1 = __webpack_require__(5);
							var Linear_1 = __webpack_require__(8);
							var SelectionHandler_1 = __webpack_require__(26);
							var centralIndexContext_1 = __webpack_require__(6);
							var isEqual_1 = __webpack_require__(10);
							var selectionContext_1 = __webpack_require__(24);
							/**
							* This is the width in pixels of a character that's 12px
							* This will need to change whenever the css of the plasmid viewer text changes
							* just divide the width of some rectangular text by it's number of characters
							*/
							exports$2.CHAR_WIDTH = 7.2;
							/**
							* a parent sequence viewer component that holds whatever is common between
							* the linear and circular sequence viewers. The Header is an example
							*/
							var SeqViewerContainer = function(_super) {
								__extends(SeqViewerContainer, _super);
								function SeqViewerContainer(props) {
									var _this = _super.call(this, props) || this;
									_this.componentDidUpdate = function(prevProps) {
										if (_this.selectionIsProgramatic(_this.props.selection)) {
											var sel = _this.props.selection;
											var prevSel = prevProps.selection;
											if (((sel === null || sel === void 0 ? void 0 : sel.start) !== (prevSel === null || prevSel === void 0 ? void 0 : prevSel.start) || (sel === null || sel === void 0 ? void 0 : sel.end) !== (prevSel === null || prevSel === void 0 ? void 0 : prevSel.end)) && (sel === null || sel === void 0 ? void 0 : sel.start) !== (sel === null || sel === void 0 ? void 0 : sel.end)) _this.setCentralIndex("LINEAR", (sel === null || sel === void 0 ? void 0 : sel.start) || 0);
										}
									};
									/** this is here because the size listener is returning a new "size" prop every time */
									_this.shouldComponentUpdate = function(nextProps, nextState) {
										return !(0, isEqual_1.isEqual)(nextProps, _this.props) || !(0, isEqual_1.isEqual)(nextState, _this.state);
									};
									/**
									* Update the central index of the linear or circular viewer.
									*/
									_this.setCentralIndex = function(type, value) {
										if (type !== "LINEAR" && type !== "CIRCULAR") throw new Error("Unknown central index type: ".concat(type));
										if (type === "LINEAR") _this.setState({ centralIndex: __assign(__assign({}, _this.state.centralIndex), {
											linear: value,
											linearScrollToken: _this.state.centralIndex.linearScrollToken + 1
										}) });
										else {
											if (_this.state.centralIndex.circular === value) return;
											_this.setState({ centralIndex: __assign(__assign({}, _this.state.centralIndex), { circular: value }) });
										}
									};
									/**
									* Update selection in state. Should only be performed from handlers/selection.jsx
									*/
									_this.setSelection = function(selection) {
										selection.parent;
										selection.ref;
										var rest = __rest(selection, ["parent", "ref"]);
										if (!_this.props.selection) _this.setState({ selection });
										if (_this.props.onSelection) _this.props.onSelection(rest);
									};
									/**
									* Returns the selection that was either a prop (optional) or the selection maintained in state.
									*/
									_this.getSelection = function(state, prop) {
										if (prop) return __assign(__assign({}, prop), {
											clockwise: typeof prop.clockwise === "undefined" || !!prop.clockwise,
											type: ""
										});
										return state;
									};
									/**
									* given the width of the screen, and the current zoom, how many basepairs should be displayed
									* on the screen at a given time and what should their size be
									*/
									_this.linearProps = function() {
										var _a, _b;
										var _c = _this.props, seq = _c.seq, seqType = _c.seqType, viewer = _c.viewer;
										var size = _this.props.testSize || {
											height: _this.props.height,
											width: _this.props.width
										};
										var zoom = _this.props.zoom.linear;
										if (((_b = (_a = _this.props.refs) === null || _a === void 0 ? void 0 : _a.linear) === null || _b === void 0 ? void 0 : _b.current) && _this.props.children) {
											size.width = _this.props.refs.linear.current.clientWidth;
											size.height = _this.props.refs.linear.current.clientHeight;
										} else if (viewer.includes("both")) size.width /= 2;
										var seqFontSize = Math.min(Math.round(zoom * .1 + 9.5), 18);
										var bpsPerBlock = Math.round(size.width / seqFontSize * 1.4) || 1;
										if (seqType === "aa") bpsPerBlock = Math.round(bpsPerBlock / 3);
										if (zoom <= 5) bpsPerBlock *= 3;
										else if (zoom <= 10) bpsPerBlock *= 2;
										else if (zoom > 70) bpsPerBlock = Math.round(bpsPerBlock * (70 / zoom));
										bpsPerBlock = Math.max(1, bpsPerBlock);
										if (size.width && bpsPerBlock < seq.length) size.width -= 28;
										var charWidth = size.width / bpsPerBlock;
										var lineHeight = 1.4 * seqFontSize;
										return __assign(__assign({}, _this.props), {
											bpsPerBlock,
											charWidth,
											elementHeight: 16,
											lineHeight,
											seqFontSize,
											size,
											zoom: { linear: zoom }
										});
									};
									/**
									* given the length of the sequence and the dimensions of the viewbox, how should
									* zoom of the plasmid viewer affect the radius of the circular viewer and its vertical shift
									*
									* minPixelPerBP = s / 50 where
									* s = theta * radius where
									* radius = h / 2 + c ^ 2 / 8 h    (https://en.wikipedia.org/wiki/Circular_segment)
									* and theta = 50 / seqLength
									*/
									_this.circularProps = function() {
										var _a, _b;
										var _c = _this.props, seqLength = _c.seq.length, viewer = _c.viewer;
										var size = _this.props.testSize || {
											height: _this.props.height,
											width: _this.props.width
										};
										var zoom = _this.props.zoom.circular;
										if ((_b = (_a = _this.props.refs) === null || _a === void 0 ? void 0 : _a.circular) === null || _b === void 0 ? void 0 : _b.current) {
											size.width = _this.props.refs.circular.current.clientWidth;
											size.height = _this.props.refs.circular.current.clientHeight;
										} else if (viewer.includes("both")) size.width /= 2;
										var center = {
											x: size.width / 2,
											y: size.height / 2
										};
										var limitingDim = Math.min(size.height, size.width);
										var bpsOnArc = seqLength * Math.exp(Math.log(50 / seqLength) / -Math.pow(100, .83));
										var radius = limitingDim * .34;
										return __assign(__assign({}, _this.props), {
											bpsOnArc,
											center,
											radius: radius === 0 ? 1 : radius,
											size,
											yDiff: 0,
											zoom: { circular: zoom }
										});
									};
									_this.state = {
										centralIndex: {
											circular: 0,
											linear: 0,
											linearScrollToken: 0,
											setCentralIndex: _this.setCentralIndex
										},
										selection: _this.getSelection(selectionContext_1.defaultSelection, props.selection)
									};
									return _this;
								}
								SeqViewerContainer.prototype.selectionIsProgramatic = function(selection) {
									if (selection) return !selection.type;
									return false;
								};
								SeqViewerContainer.prototype.render = function() {
									var _this = this;
									var _a = this.props, selectionProp = _a.selection, seq = _a.seq, viewer = _a.viewer;
									var _b = this.state, centralIndex = _b.centralIndex, selection = _b.selection;
									var linearProps = this.linearProps();
									var circularProps = this.circularProps();
									var mergedSelection = this.getSelection(selection, selectionProp);
									return React.createElement("div", {
										ref: this.props.targetRef,
										className: "la-vz-viewer-container",
										"data-testid": "la-vz-viewer-container",
										style: {
											height: "100%",
											position: "relative",
											width: "100%"
										}
									}, React.createElement(centralIndexContext_1.default.Provider, { value: centralIndex }, React.createElement(selectionContext_1.default.Provider, { value: mergedSelection }, React.createElement(SelectionHandler_1.default, {
										bpsPerBlock: linearProps.bpsPerBlock,
										center: circularProps.center,
										centralIndex: centralIndex.circular,
										seq,
										setCentralIndex: this.setCentralIndex,
										setSelection: this.setSelection,
										yDiff: circularProps.yDiff
									}, function(inputRef, handleMouseEvent, onUnmount) {
										return React.createElement(EventHandler_1.EventHandler, {
											bpsPerBlock: linearProps.bpsPerBlock,
											copyEvent: _this.props.copyEvent,
											handleMouseEvent,
											selectAllEvent: _this.props.selectAllEvent,
											selection: mergedSelection,
											seq,
											setSelection: _this.setSelection
										}, _this.props.children ? _this.props.children({
											circularProps,
											handleMouseEvent,
											inputRef,
											linearProps,
											onUnmount
										}) : React.createElement(React.Fragment, null, viewer === "linear" && React.createElement(Linear_1.default, __assign({}, linearProps, {
											handleMouseEvent,
											inputRef,
											onUnmount
										})), viewer === "circular" && React.createElement(Circular_1.default, __assign({}, circularProps, {
											handleMouseEvent,
											inputRef,
											onUnmount
										})), viewer === "both" && React.createElement(React.Fragment, null, React.createElement(Circular_1.default, __assign({}, circularProps, {
											handleMouseEvent,
											inputRef,
											onUnmount
										})), React.createElement(Linear_1.default, __assign({}, linearProps, {
											handleMouseEvent,
											inputRef,
											onUnmount
										}))), viewer === "both_flip" && React.createElement(React.Fragment, null, React.createElement(Linear_1.default, __assign({}, linearProps, {
											handleMouseEvent,
											inputRef,
											onUnmount
										})), React.createElement(Circular_1.default, __assign({}, circularProps, {
											handleMouseEvent,
											inputRef,
											onUnmount
										})))));
									}))));
								};
								return SeqViewerContainer;
							}(React.Component);
							var SeqViewerContainerWithResize = function(props) {
								var _a = (0, react_resize_detector_1.useResizeDetector)(), height = _a.height, ref = _a.ref, width = _a.width;
								return React.createElement(SeqViewerContainer, __assign({}, props, {
									height: height || 0,
									targetRef: ref,
									width: width || 0
								}));
							};
							exports$2["default"] = SeqViewerContainerWithResize;
						}),
						((module$2) => {
							module$2.exports = (init_build(), __toCommonJS(build_exports));
						}),
						(function(__unused_webpack_module, exports$3, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
								function adopt(value) {
									return value instanceof P ? value : new P(function(resolve) {
										resolve(value);
									});
								}
								return new (P || (P = Promise))(function(resolve, reject) {
									function fulfilled(value) {
										try {
											step(generator.next(value));
										} catch (e) {
											reject(e);
										}
									}
									function rejected(value) {
										try {
											step(generator["throw"](value));
										} catch (e) {
											reject(e);
										}
									}
									function step(result) {
										result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
									}
									step((generator = generator.apply(thisArg, _arguments || [])).next());
								});
							};
							var __generator = this && this.__generator || function(thisArg, body) {
								var _ = {
									label: 0,
									sent: function() {
										if (t[0] & 1) throw t[1];
										return t[1];
									},
									trys: [],
									ops: []
								}, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
								return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
									return this;
								}), g;
								function verb(n) {
									return function(v) {
										return step([n, v]);
									};
								}
								function step(op) {
									if (f) throw new TypeError("Generator is already executing.");
									while (g && (g = 0, op[0] && (_ = 0)), _) try {
										if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
										if (y = 0, t) op = [op[0] & 2, t.value];
										switch (op[0]) {
											case 0:
											case 1:
												t = op;
												break;
											case 4:
												_.label++;
												return {
													value: op[1],
													done: false
												};
											case 5:
												_.label++;
												y = op[1];
												op = [0];
												continue;
											case 7:
												op = _.ops.pop();
												_.trys.pop();
												continue;
											default:
												if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
													_ = 0;
													continue;
												}
												if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
													_.label = op[1];
													break;
												}
												if (op[0] === 6 && _.label < t[1]) {
													_.label = t[1];
													t = op;
													break;
												}
												if (t && _.label < t[2]) {
													_.label = t[2];
													_.ops.push(op);
													break;
												}
												if (t[2]) _.ops.pop();
												_.trys.pop();
												continue;
										}
										op = body.call(thisArg, _);
									} catch (e) {
										op = [6, e];
										y = 0;
									} finally {
										f = t = 0;
									}
									if (op[0] & 5) throw op[1];
									return {
										value: op[0] ? op[1] : void 0,
										done: true
									};
								}
							};
							Object.defineProperty(exports$3, "__esModule", { value: true });
							exports$3.EventHandler = void 0;
							var React = __webpack_require__(2);
							var centralIndexContext_1 = __webpack_require__(6);
							var debounce_1 = __webpack_require__(7);
							exports$3.EventHandler = function(_super) {
								__extends(EventHandler, _super);
								function EventHandler() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									_this.clickedOnce = null;
									_this.clickedTwice = null;
									/**
									* action handler for a keyboard keypresses.
									*/
									_this.handleKeyPress = function(e) {
										var keyType = _this.keypressMap(e);
										if (!keyType) return;
										e.preventDefault();
										_this.handleSeqInteraction(keyType);
									};
									/**
									* maps a keypress to an interaction (String)
									*
									* ["All", "Copy", "Up", "Right", "Down", "Left"]
									*/
									_this.keypressMap = function(e) {
										var _a = _this.props, copyEvent = _a.copyEvent, selectAllEvent = _a.selectAllEvent;
										if (copyEvent && copyEvent(e)) return "Copy";
										if (selectAllEvent && selectAllEvent(e)) return "SelectAll";
										var key = e.key, shiftKey = e.shiftKey;
										switch (key) {
											case "ArrowLeft":
											case "ArrowRight":
											case "ArrowUp":
											case "ArrowDown": return shiftKey ? "Shift".concat(key) : key;
											default: return null;
										}
									};
									/**
									* Respond to any of:
									* 	All: cmd + A, select all
									* 	Copy: cmd + C, copy
									* 	Up, Right, Down, Left: some directional movement of the cursor
									*/
									_this.handleSeqInteraction = function(type) {
										return __awaiter(_this, void 0, void 0, function() {
											var seq, seqLength, bpsPerBlock, _a, selection, setSelection, end, start, clockwise, newPos, selLength;
											return __generator(this, function(_b) {
												seq = this.props.seq;
												seqLength = seq.length;
												bpsPerBlock = this.props.bpsPerBlock || 1;
												switch (type) {
													case "SelectAll":
														this.selectAllHotkey();
														break;
													case "Copy":
														this.handleCopy();
														break;
													case "ArrowUp":
													case "ArrowRight":
													case "ArrowDown":
													case "ArrowLeft":
													case "ShiftArrowUp":
													case "ShiftArrowRight":
													case "ShiftArrowDown":
													case "ShiftArrowLeft":
														_a = this.props, selection = _a.selection, setSelection = _a.setSelection;
														end = selection.end, start = selection.start;
														if (typeof start === "undefined" || typeof end === "undefined") return [2];
														clockwise = selection.clockwise;
														newPos = end;
														if (type === "ArrowUp" || type === "ShiftArrowUp") {
															if (seqLength / bpsPerBlock > 1) newPos -= bpsPerBlock;
															else newPos -= 1;
														} else if (type === "ArrowRight" || type === "ShiftArrowRight") newPos += 1;
														else if (type === "ArrowDown" || type === "ShiftArrowDown") {
															if (seqLength / bpsPerBlock > 1) newPos += bpsPerBlock;
															else newPos += 1;
														} else if (type === "ArrowLeft" || type === "ShiftArrowLeft") newPos -= 1;
														if (newPos <= -1) newPos = seqLength + newPos;
														if (newPos >= seqLength + 1) newPos -= seqLength;
														selLength = Math.abs(start - end);
														clockwise = selLength === 0 ? type === "ArrowRight" || type === "ShiftArrowRight" || type === "ArrowDown" || type === "ShiftArrowDown" : clockwise;
														if (newPos !== start && !type.startsWith("Shift")) setSelection({
															clockwise: true,
															end: newPos,
															start: newPos,
															type: "SEQ"
														});
														else if (type.startsWith("Shift")) setSelection({
															clockwise,
															end: newPos,
															start,
															type: "SEQ"
														});
												}
												return [2];
											});
										});
									};
									/**
									* Copy the current sequence selection to the user's clipboard
									*/
									_this.handleCopy = function() {
										var _a = _this.props, _b = _a.selection, end = _b.end, ref = _b.ref, start = _b.start, seq = _a.seq;
										if (!document) return;
										var formerFocus = document.activeElement;
										var tempNode = document.createElement("textarea");
										if (ref === "ALL") tempNode.innerText = seq;
										else tempNode.innerText = seq.substring(start || 0, end);
										if (document.body) document.body.appendChild(tempNode);
										tempNode.select();
										document.execCommand("copy");
										tempNode.remove();
										if (formerFocus) formerFocus.focus();
									};
									/**
									* select all of the sequence
									*/
									_this.selectAllHotkey = function() {
										var _a = _this.props, selection = _a.selection, seq = _a.seq, setSelection = _a.setSelection;
										setSelection(__assign(__assign({}, selection), {
											clockwise: true,
											end: seq.length,
											start: 0
										}));
									};
									_this.handleTripleClick = function() {
										_this.selectAllHotkey();
									};
									_this.resetClicked = (0, debounce_1.default)(function() {
										_this.clickedOnce = null;
										_this.clickedTwice = null;
									}, 250);
									/**
									* if the contextMenu button is clicked, check whether it was clicked
									* over a noteworthy element, for which db mutations have been written.
									*
									* if it is, mutate the contextMenu to account for those potential interactions
									* and pass on the click. Otherwise, do nothing
									*
									* if it is a regular click, pass on as normal
									*/
									_this.handleMouseEvent = function(e) {
										var handleMouseEvent = _this.props.handleMouseEvent;
										if (e.type === "mouseup") {
											_this.resetClicked();
											if (_this.clickedOnce === e.target && _this.clickedTwice === e.target) {
												_this.handleTripleClick();
												_this.resetClicked();
											} else if (_this.clickedOnce === e.target && _this.clickedTwice === null) {
												_this.clickedOnce = e.target;
												_this.clickedTwice = e.target;
												_this.resetClicked();
											} else {
												_this.clickedOnce = e.target;
												_this.resetClicked();
											}
										}
										var button = e.button, ctrlKey = e.ctrlKey;
										var ctxMenuClick = e.type === "mousedown" && button === 0 && ctrlKey;
										if (e.button === 0 && !ctxMenuClick) handleMouseEvent(e);
									};
									_this.render = function() {
										return React.createElement("div", {
											className: "la-vz-viewer-event-router",
											id: "la-vz-event-router",
											role: "presentation",
											style: {
												display: "flex",
												flexDirection: "row",
												height: "100%",
												outline: "none",
												position: "absolute",
												width: "100%"
											},
											tabIndex: -1,
											onKeyDown: _this.handleKeyPress,
											onMouseDown: _this.handleMouseEvent,
											onMouseMove: _this.props.handleMouseEvent,
											onMouseUp: _this.handleMouseEvent
										}, _this.props.children);
									};
									return _this;
								}
								EventHandler.contextType = centralIndexContext_1.default;
								return EventHandler;
							}(React.PureComponent);
						}),
						((__unused_webpack_module, exports$4, __webpack_require__) => {
							Object.defineProperty(exports$4, "__esModule", { value: true });
							/** The "central index" is used to scroll the linear or circular viewer when you click on an annotation */
							var CentralIndexContext = __webpack_require__(2).createContext({
								circular: 0,
								linear: 0,
								/** Incremented each time an explicit scroll-to-linear is requested, even if the position hasn't changed */
								linearScrollToken: 0,
								setCentralIndex: function(_, __) {}
							});
							CentralIndexContext.displayName = "CentralIndexContext";
							exports$4["default"] = CentralIndexContext;
						}),
						((__unused_webpack_module, exports$5) => {
							Object.defineProperty(exports$5, "__esModule", { value: true });
							/**
							* Returns a function, that, as long as it continues to be invoked, will not
							* be triggered. The function will be called after it stops being called for
							* N milliseconds. If `immediate` is passed, trigger the function on the
							* leading edge, instead of the trailing.
							*
							* from: https://davidwalsh.name/javascript-debounce-function
							*/
							exports$5["default"] = (function(func, wait, immediate) {
								if (immediate === void 0) immediate = true;
								var timeout;
								return function() {
									var args = [];
									for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
									var later = function() {
										timeout = null;
										if (!immediate) func.apply(this, args);
									};
									var callNow = immediate && !timeout;
									clearTimeout(timeout);
									timeout = setTimeout(later, wait);
									if (callNow) func.apply(this, args);
								};
							});
						}),
						(function(__unused_webpack_module, exports$6, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							Object.defineProperty(exports$6, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var elementsToRows_1 = __webpack_require__(9);
							var isEqual_1 = __webpack_require__(10);
							var sequence_1 = __webpack_require__(11);
							var InfiniteScroll_1 = __webpack_require__(12);
							var SeqBlock_1 = __webpack_require__(14);
							exports$6["default"] = function(_super) {
								__extends(Linear, _super);
								function Linear() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									/**
									* Deep equality comparison
									*/
									_this.shouldComponentUpdate = function(nextProps) {
										return !(0, isEqual_1.isEqual)(nextProps, _this.props);
									};
									return _this;
								}
								/**
								* given all the information needed to render all the seqblocks (ie, sequence, compSeq
								* list of annotations), cut up all that information into an array.
								* Each element in that array pertaining to one SeqBlock
								*
								* For example, if each seqblock has 2 bps, and the seq is "ATGCAG", this should first
								* make an array of ["AT", "GC", "AG"], and then pass "AT" to the first SeqBlock, "GC" to
								* the second seqBlock, and "AG" to the third seqBlock.
								*/
								Linear.prototype.render = function() {
									var _a = this.props, annotations = _a.annotations, bpsPerBlock = _a.bpsPerBlock, compSeq = _a.compSeq, cutSites = _a.cutSites, elementHeight = _a.elementHeight, highlights = _a.highlights, lineHeight = _a.lineHeight, onUnmount = _a.onUnmount, primers = _a.primers, search = _a.search, seq = _a.seq, seqType = _a.seqType, showComplement = _a.showComplement, showIndex = _a.showIndex, size = _a.size, translations = _a.translations, zoom = _a.zoom;
									var zoomed = zoom.linear > 10;
									var seqLength = seq.length;
									var arrSize = Math.round(Math.ceil(seqLength / bpsPerBlock));
									if (arrSize === Number.POSITIVE_INFINITY) arrSize = 1;
									var ids = new Array(arrSize);
									var seqs = new Array(arrSize);
									var compSeqs = new Array(arrSize);
									var blockHeights = new Array(arrSize);
									var cutSiteRows = cutSites.length ? (0, elementsToRows_1.createSingleRows)(cutSites, bpsPerBlock, arrSize) : new Array(arrSize).fill([]);
									/**
									* Mutate elements that start or end at zero index
									*/
									function vetAnnotations(annotations) {
										annotations.forEach(function(ann) {
											if (ann.end > seqLength) ann.end = ann.end % seqLength;
											if (ann.end === 0 && ann.start > ann.end) ann.end = seqLength;
											if (ann.start === seqLength && ann.end < ann.start) ann.start = 0;
										});
										return annotations;
									}
									var primerFwdRows = (0, elementsToRows_1.createMultiRows)((0, elementsToRows_1.stackElements)(vetAnnotations(primers.filter(function(p) {
										return p.direction === 1;
									})), seq.length), bpsPerBlock, arrSize);
									var primerRevRows = (0, elementsToRows_1.createMultiRows)((0, elementsToRows_1.stackElements)(vetAnnotations(primers.filter(function(p) {
										return p.direction === -1;
									})), seq.length), bpsPerBlock, arrSize);
									var annotationRows = (0, elementsToRows_1.createMultiRows)((0, elementsToRows_1.stackElements)(vetAnnotations(annotations), seq.length), bpsPerBlock, arrSize);
									var searchRows = search && search.length ? (0, elementsToRows_1.createSingleRows)(search, bpsPerBlock, arrSize) : new Array(arrSize).fill([]);
									var highlightRows = (0, elementsToRows_1.createSingleRows)(highlights, bpsPerBlock, arrSize);
									var translationRows = translations.length ? (0, elementsToRows_1.createMultiRows)((0, elementsToRows_1.stackElements)((0, sequence_1.createTranslations)(translations, seq, seqType), seq.length), bpsPerBlock, arrSize) : new Array(arrSize).fill([]);
									for (var i = 0; i < arrSize; i += 1) {
										var firstBase = i * bpsPerBlock;
										var lastBase = firstBase + bpsPerBlock;
										seqs[i] = seq.substring(firstBase, lastBase);
										compSeqs[i] = compSeq.substring(firstBase, lastBase);
										ids[i] = seqs[i] + String(i);
										var blockHeight = lineHeight * 1.1;
										if (seqType != "aa") blockHeight += lineHeight;
										if (zoomed) blockHeight += showComplement ? lineHeight : 0;
										if (primerFwdRows[i].length) blockHeight += primerFwdRows[i].length * lineHeight;
										if (primerRevRows[i].length) blockHeight += primerRevRows[i].length * lineHeight;
										if (showIndex) blockHeight += lineHeight;
										if (translationRows[i].length) blockHeight += translationRows[i].length * elementHeight * 2;
										if (annotationRows[i].length) blockHeight += annotationRows[i].length * elementHeight;
										if (cutSiteRows[i].length) blockHeight += lineHeight;
										blockHeights[i] = blockHeight;
									}
									var seqBlocks = [];
									var yDiff = 0;
									for (var i = 0; i < arrSize; i += 1) {
										var firstBase = i * bpsPerBlock;
										seqBlocks.push(React.createElement(SeqBlock_1.SeqBlock, {
											key: ids[i],
											annotationRows: annotationRows[i],
											blockHeight: blockHeights[i],
											bpColors: this.props.bpColors,
											bpsPerBlock,
											charWidth: this.props.charWidth,
											compSeq: compSeqs[i],
											cutSiteRows: cutSiteRows[i],
											elementHeight,
											firstBase,
											fullSeq: seq,
											handleMouseEvent: this.props.handleMouseEvent,
											highlights: highlightRows[i],
											id: ids[i],
											inputRef: this.props.inputRef,
											lineHeight,
											primerFwdRows: primerFwdRows[i],
											primerRevRows: primerRevRows[i],
											searchRows: searchRows[i],
											seq: seqs[i],
											seqFontSize: this.props.seqFontSize,
											seqType,
											showComplement,
											showIndex,
											size,
											translationRows: translationRows[i],
											y: yDiff,
											zoom,
											zoomed,
											onUnmount
										}));
										yDiff += blockHeights[i];
									}
									return seqBlocks.length && React.createElement(InfiniteScroll_1.InfiniteScroll, {
										blockHeights,
										bpsPerBlock,
										seqBlocks,
										size,
										totalHeight: blockHeights.reduce(function(acc, h) {
											return acc + h;
										}, 0)
									});
								};
								return Linear;
							}(React.Component);
						}),
						(function(__unused_webpack_module, exports$7) {
							var __spreadArray = this && this.__spreadArray || function(to, from, pack) {
								if (pack || arguments.length === 2) {
									for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
										if (!ar) ar = Array.prototype.slice.call(from, 0, i);
										ar[i] = from[i];
									}
								}
								return to.concat(ar || Array.prototype.slice.call(from));
							};
							Object.defineProperty(exports$7, "__esModule", { value: true });
							exports$7.createSingleRows = exports$7.createMultiRows = exports$7.stackElements = void 0;
							var last = function(arr) {
								return arr[arr.length - 1];
							};
							var first = function(arr) {
								return arr[0];
							};
							/**
							* Take an array of elements and create a 2D array where non-overlapping elements are in
							* the same row. Example:
							*
							* input (`T[]`):
							* ```
							* 		[ ---Ann---	---Ann3---
							* 			 ---Ann2--- ]
							* ```
							*
							* output (`T[][]`):
							* ```
							* 		[ ---Ann--- ---Ann3---]
							* 		[		---Ann2---    ]
							* ```
							*/
							var stackElements = function(elements, seqL) {
								return __spreadArray([], elements, true).sort(function(a, b) {
									return a.end - b.end;
								}).sort(function(a, b) {
									return a.start - b.start;
								}).reduce(function(acc, a) {
									var insertIndex = acc.findIndex(function(elements) {
										if (a.end === a.start) return false;
										if (last(elements).end <= last(elements).start) return last(elements).end + seqL <= a.start;
										if (a.end > a.start) return last(elements).end <= a.start;
										return last(elements).end < a.start && a.end < first(elements).start;
									});
									if (insertIndex > -1) acc[insertIndex].push(a);
									else acc.push([a]);
									return acc;
								}, []);
							};
							exports$7.stackElements = stackElements;
							/**
							* given an array of arrays of an element, fragment the element into seq blocks
							*
							* this is needed in the Linear sequence viewer because it's easier to send only the
							* relevant elements to the child SeqBlocks, rather to send every SeqBlock everything
							* and have the block figure out whether element is included within it
							*
							* NOTE: if an element has a start and end index that are the same, it's assumed to
							* cover the entire plasmid
							*/
							var createMultiRows = function(elements, rowLength, rowCount) {
								var newArr = new Array(rowCount);
								for (var i = 0; i < rowCount; i += 1) {
									newArr[i] = [];
									for (var j = 0; j < elements.length; j += 1) newArr[i][j] = [];
								}
								for (var i = 0; i < elements.length; i += 1) for (var j = 0; j < elements[i].length; j += 1) if (elements[i][j].start < elements[i][j].end) {
									var k = Math.max(0, Math.floor(elements[i][j].start / rowLength));
									var end = Math.floor((elements[i][j].end - 1) / rowLength);
									while (k <= end && k < rowCount) {
										newArr[k][i].push(elements[i][j]);
										k += 1;
									}
								} else if (elements[i][j].end < elements[i][j].start) {
									var e = Math.floor((elements[i][j].end - 1) / rowLength);
									if (elements[i][j].end === 0) e = -1;
									while (e >= 0 && e < newArr.length) {
										newArr[e][i].push(elements[i][j]);
										e -= 1;
									}
									var s = Math.floor(elements[i][j].start / rowLength);
									while (s < rowCount) {
										newArr[s][i].push(elements[i][j]);
										s += 1;
									}
								} else if (elements[i][j].end === elements[i][j].start) {
									for (var a = 0; a < newArr.length; a += 1) newArr[a][i].push(elements[i][j]);
									if (elements[i][j].end === 0) continue;
									var s = Math.floor(elements[i][j].start / rowLength);
									newArr[s][i].push(elements[i][j]);
								}
								for (var i = 0; i < rowCount; i += 1) newArr[i] = newArr[i].filter(function(a) {
									return a[0];
								});
								return newArr;
							};
							exports$7.createMultiRows = createMultiRows;
							/**
							* Given an array of elements and an interval (`rowLength`), bin elements into rows.
							*
							* This is used by the Linear viewer for CutSites and Highlights where it's okay for
							* elements to overlap one another.
							*/
							var createSingleRows = function(elements, rowLength, rowCount, duplicateIdsAllowed) {
								if (duplicateIdsAllowed === void 0) duplicateIdsAllowed = true;
								var newArr = new Array(rowCount);
								for (var i = 0; i < rowCount; i += 1) newArr[i] = [];
								var _loop_1 = function(i) {
									var _a = elements[i], end = _a.end, start = _a.start;
									if (start < end) {
										var k = Math.floor(start / rowLength);
										var rowEnd = Math.floor((end - 1) / rowLength);
										while (k <= rowEnd && k < rowCount) {
											newArr[k].push(elements[i]);
											k += 1;
										}
									} else {
										var e = Math.floor(end / rowLength);
										while (e >= 0) {
											newArr[e].push(elements[i]);
											e -= 1;
										}
										var s = Math.floor(start / rowLength);
										while (s < rowCount) {
											if (duplicateIdsAllowed || newArr[s].every(function(el) {
												return el.id !== elements[i].id;
											})) newArr[s].push(elements[i]);
											s += 1;
										}
									}
								};
								for (var i = 0; i < elements.length; i += 1) _loop_1(i);
								return newArr;
							};
							exports$7.createSingleRows = createSingleRows;
						}),
						((__unused_webpack_module, exports$8) => {
							Object.defineProperty(exports$8, "__esModule", { value: true });
							exports$8.isEqual = void 0;
							/**
							* Deep equality comparison between two objects
							*
							* copy-paste from StackOverflow: https://stackoverflow.com/a/25456134
							*
							*/
							var isEqual = function(x, y) {
								if (x === y) return true;
								else if (typeof x === "object" && x !== null && typeof y === "object" && y !== null) {
									if (Object.keys(x).length !== Object.keys(y).length) return false;
									for (var prop in x) if (Object.prototype.hasOwnProperty.call(y, prop)) {
										if (!(0, exports$8.isEqual)(x[prop], y[prop])) return false;
									} else return false;
									return true;
								}
								return false;
							};
							exports$8.isEqual = isEqual;
						}),
						(function(__unused_webpack_module, exports$9) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$9, "__esModule", { value: true });
							exports$9.randomID = exports$9.createTranslations = exports$9.translate = exports$9.directionality = exports$9.reverseComplement = exports$9.complement = exports$9.reverse = exports$9.guessType = exports$9.getAlphabet = exports$9.nucleotides = void 0;
							/**
							* Map of nucleotide bases
							*/
							exports$9.nucleotides = {
								a: "a",
								c: "c",
								g: "g",
								t: "t",
								u: "u"
							};
							/**
							* Map of DNA basepairs to all the bases encoded by that character in the DNA alphabet.
							*
							* https://meme-suite.org/meme/doc/alphabets.html
							*/
							var dnaAlphabet = {
								b: {
									c: "c",
									g: "g",
									t: "t"
								},
								d: {
									a: "a",
									g: "g",
									t: "t"
								},
								h: {
									a: "a",
									c: "c",
									t: "t"
								},
								k: {
									g: "g",
									t: "t"
								},
								m: {
									a: "a",
									c: "c"
								},
								n: {
									a: "a",
									c: "c",
									g: "g",
									t: "t"
								},
								r: {
									a: "a",
									g: "g"
								},
								s: {
									c: "c",
									g: "g"
								},
								v: {
									a: "a",
									c: "c",
									g: "g"
								},
								w: {
									a: "a",
									t: "t"
								},
								x: {
									a: "a",
									c: "c",
									g: "g",
									t: "t"
								},
								y: {
									c: "c",
									t: "t"
								}
							};
							/**
							* Map of RNA basepairs to all the bases encoded by that character in the RNA alphabet.
							*
							* https://meme-suite.org/meme/doc/alphabets.html
							*/
							var rnaAlphabet = {
								b: {
									c: "c",
									g: "g",
									u: "u"
								},
								d: {
									a: "a",
									g: "g",
									u: "u"
								},
								h: {
									a: "a",
									c: "c",
									u: "u"
								},
								k: {
									g: "g",
									u: "u"
								},
								m: {
									a: "a",
									c: "c"
								},
								n: {
									a: "a",
									c: "c",
									g: "g",
									u: "u"
								},
								r: {
									a: "a",
									g: "g"
								},
								s: {
									c: "c",
									g: "g"
								},
								v: {
									a: "a",
									c: "c",
									g: "g"
								},
								w: {
									a: "a",
									u: "u"
								},
								x: {
									a: "a",
									c: "c",
									g: "g",
									u: "u"
								},
								y: {
									c: "c",
									u: "u"
								}
							};
							/**
							* mapping the 64 standard codons to amino acids
							*
							* adapted from: "https://github.com/keithwhor/NtSeq/blob/master/lib/nt.js
							*/
							var dnaCodonToAminoAcid = {
								AAA: "K",
								AAC: "N",
								AAG: "K",
								AAT: "N",
								ACA: "T",
								ACC: "T",
								ACG: "T",
								ACT: "T",
								AGA: "R",
								AGC: "S",
								AGG: "R",
								AGT: "S",
								ATA: "I",
								ATC: "I",
								ATG: "M",
								ATT: "I",
								CAA: "Q",
								CAC: "H",
								CAG: "Q",
								CAT: "H",
								CCA: "P",
								CCC: "P",
								CCG: "P",
								CCT: "P",
								CGA: "R",
								CGC: "R",
								CGG: "R",
								CGT: "R",
								CTA: "L",
								CTC: "L",
								CTG: "L",
								CTT: "L",
								GAA: "E",
								GAC: "D",
								GAG: "E",
								GAT: "D",
								GCA: "A",
								GCC: "A",
								GCG: "A",
								GCT: "A",
								GGA: "G",
								GGC: "G",
								GGG: "G",
								GGT: "G",
								GTA: "V",
								GTC: "V",
								GTG: "V",
								GTT: "V",
								TAA: "*",
								TAC: "Y",
								TAG: "*",
								TAT: "Y",
								TCA: "S",
								TCC: "S",
								TCG: "S",
								TCT: "S",
								TGA: "*",
								TGC: "C",
								TGG: "W",
								TGT: "C",
								TTA: "L",
								TTC: "F",
								TTG: "L",
								TTT: "F"
							};
							var aminoAcids = Array.from(new Set(Object.values(dnaCodonToAminoAcid)).values()).join("");
							var aminoAcidsMap = aminoAcids.toLowerCase().split("").filter(function(aa) {
								return aa !== "*";
							}).reduce(function(acc, aa) {
								var _a;
								return __assign(__assign({}, acc), (_a = {}, _a[aa] = aa, _a));
							}, {});
							/**
							* Map of amino acids alphabet characters to what each matches.
							*
							* https://meme-suite.org/meme/doc/alphabets.html
							*/
							var aaAlphabet = {
								b: {
									d: "d",
									n: "n"
								},
								j: {
									i: "i",
									l: "l"
								},
								x: aminoAcidsMap,
								z: {
									e: "e",
									q: "q"
								}
							};
							/** Given a seq type, return the associated symbol alphabet */
							var getAlphabet = function(seqType) {
								return {
									aa: aaAlphabet,
									dna: dnaAlphabet,
									rna: rnaAlphabet,
									unknown: dnaAlphabet
								}[seqType];
							};
							exports$9.getAlphabet = getAlphabet;
							var aminoAcidRegex = new RegExp("^[".concat(aminoAcids, "BJXZ]+$"), "i");
							/**
							* Infer the type of a sequence. This is *without* any ambiguous symbols, so maybe wrong by being overly strict.
							*/
							var guessType = function(seq) {
								seq = seq.substring(0, 1e3);
								if (/^[atgcn.]+$/i.test(seq)) return "dna";
								else if (/^[augcn.]+$/i.test(seq)) return "rna";
								else if (aminoAcidRegex.test(seq)) return "aa";
								return "unknown";
							};
							exports$9.guessType = guessType;
							/**
							* Reverses a string sequence
							*/
							var reverse = function(seq) {
								return seq.split("").reverse().join("");
							};
							exports$9.reverse = reverse;
							var dnaComp = {
								a: "t",
								b: "v",
								c: "g",
								d: "h",
								g: "c",
								h: "d",
								k: "m",
								m: "k",
								n: "n",
								r: "y",
								s: "s",
								t: "a",
								u: "a",
								v: "b",
								w: "w",
								x: "x",
								y: "r"
							};
							dnaComp = __assign(__assign({}, dnaComp), Object.keys(dnaComp).reduce(function(acc, k) {
								var _a;
								return __assign(__assign({}, acc), (_a = {}, _a[k.toUpperCase()] = dnaComp[k].toUpperCase(), _a));
							}, {}));
							/**
							* A map from each basepair to its complement
							*/
							var typeToCompMap = {
								aa: Object.keys(aminoAcidsMap).reduce(function(acc, k) {
									var _a;
									return __assign(__assign({}, acc), (_a = {}, _a[k.toUpperCase()] = "", _a[k.toLowerCase()] = "", _a));
								}, {
									B: "",
									J: "",
									Z: "",
									b: "",
									j: "",
									z: ""
								}),
								dna: dnaComp,
								rna: __assign(__assign({}, dnaComp), {
									A: "U",
									a: "u"
								}),
								undefined: dnaComp
							};
							/**
							* Return the filtered sequence and its complement if its an empty string, return the same for both.
							*/
							var complement = function(origSeq, seqType) {
								if (!origSeq) return {
									compSeq: "",
									seq: ""
								};
								var compMap = typeToCompMap[seqType];
								var seq = "";
								var compSeq = "";
								for (var i = 0, origLength = origSeq.length; i < origLength; i += 1) if (origSeq[i] in compMap) {
									seq += origSeq[i];
									compSeq += compMap[origSeq[i]];
								}
								return {
									compSeq,
									seq
								};
							};
							exports$9.complement = complement;
							/**
							* Return the reverse complement of a DNA sequence
							*/
							var reverseComplement = function(inputSeq, seqType) {
								return (0, exports$9.complement)(inputSeq, seqType).compSeq.split("").reverse().join("");
							};
							exports$9.reverseComplement = reverseComplement;
							var fwd = /* @__PURE__ */ new Set([
								"FWD",
								"fwd",
								"FORWARD",
								"forward",
								"FOR",
								"for",
								"TOP",
								"top",
								"1",
								1
							]);
							var rev = /* @__PURE__ */ new Set([
								"REV",
								"rev",
								"REVERSE",
								"reverse",
								"BOTTOM",
								"bottom",
								"-1",
								-1
							]);
							/**
							* Parse the user defined direction, estimate the direction of the element
							*
							* ```js
							* directionality("FWD") => 1
							* directionality("FORWARD") => 1
							* ```
							*/
							var directionality = function(direction) {
								if (!direction) return 0;
								if (fwd.has(direction)) return 1;
								if (rev.has(direction)) return -1;
								return 0;
							};
							exports$9.directionality = directionality;
							var rnaCodonToAminoAcid = Object.keys(dnaCodonToAminoAcid).reduce(function(acc, k) {
								var _a;
								return __assign(__assign({}, acc), (_a = {}, _a[k.replace(/T/gi, "U")] = dnaCodonToAminoAcid[k], _a));
							}, {});
							/**
							* Given a sequence, translate it into an Amino Acid sequence
							*/
							var translate = function(seqInput, seqType) {
								if (seqType === "aa") return seqInput;
								var codonMap = dnaCodonToAminoAcid;
								if (seqType === "rna") codonMap = rnaCodonToAminoAcid;
								var seq = seqInput.toUpperCase();
								var seqLength = seq.length;
								var aaSeq = "";
								for (var i = 0, j = 0; i < seqLength; i += 3, j += 1) if (i + 2 < seqLength) aaSeq += codonMap[seq[i] + seq[i + 1] + seq[i + 2]] || "?";
								return aaSeq;
							};
							exports$9.translate = translate;
							/**
							* for each translation (range + direction) and the input sequence, convert it to a translation and amino acid sequence
							*/
							var createTranslations = function(translations, seq, seqType) {
								var seqDoubled = seq + seq;
								var bpPerBlock = seqType === "aa" ? 1 : 3;
								return translations.map(function(t) {
									var direction = t.direction, start = t.start;
									var end = t.end;
									if (start > end) end += seq.length;
									var subSeq = direction === 1 ? seqDoubled.substring(start, end) : (0, exports$9.reverseComplement)(seqDoubled.substring(start, end), seqType);
									var aaSeq = direction === 1 ? (0, exports$9.translate)(subSeq, seqType) : (0, exports$9.translate)(subSeq, seqType).split("").reverse().join("");
									var tStart = direction === 1 ? start : end - aaSeq.length * bpPerBlock;
									var tEnd = direction === 1 ? (start + aaSeq.length * bpPerBlock) % seq.length : end % seq.length;
									if (tEnd === 0) tEnd += seq.length;
									return __assign(__assign({}, t), {
										AAseq: aaSeq,
										end: tEnd,
										start: tStart
									});
								});
							};
							exports$9.createTranslations = createTranslations;
							/**
							* Create a random 10 digit string ID
							*
							* Lazily copied from StackOverflow: https://stackoverflow.com/a/57355127
							*/
							var randomID = function(n) {
								if (n === void 0) n = 10;
								var add = 1;
								var max = 12 - add;
								max = Math.pow(10, n + add);
								var min = max / 10;
								var number = Math.floor(Math.random() * (max - min + 1)) + min;
								return String(number).substring(add);
							};
							exports$9.randomID = randomID;
						}),
						(function(__unused_webpack_module, exports$10, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							Object.defineProperty(exports$10, "__esModule", { value: true });
							exports$10.InfiniteScroll = void 0;
							var React = __webpack_require__(2);
							var centralIndexContext_1 = __webpack_require__(6);
							var isEqual_1 = __webpack_require__(10);
							var style_1 = __webpack_require__(13);
							exports$10.InfiniteScroll = function(_super) {
								__extends(InfiniteScroll, _super);
								function InfiniteScroll(props) {
									var _this = _super.call(this, props) || this;
									_this.scroller = React.createRef();
									_this.insideDOM = React.createRef();
									_this.componentDidMount = function() {
										_this.handleScrollOrResize();
										window.addEventListener("resize", _this.handleScrollOrResize);
									};
									_this.componentDidUpdate = function(prevProps, prevState, snapshot) {
										if (!_this.scroller.current) return;
										var _a = _this.props, seqBlocks = _a.seqBlocks, size = _a.size;
										var _b = _this.state, centralIndex = _b.centralIndex, scrollToken = _b.scrollToken, visibleBlocks = _b.visibleBlocks;
										if (_this.context && (centralIndex !== _this.context.linear || scrollToken !== _this.context.linearScrollToken)) _this.scrollToCentralIndex();
										else if (!(0, isEqual_1.isEqual)(prevProps.size, size) || seqBlocks.length !== prevProps.seqBlocks.length) _this.handleScrollOrResize();
										else if ((0, isEqual_1.isEqual)(prevState.visibleBlocks, visibleBlocks)) _this.restoreSnapshot(snapshot);
									};
									_this.componentWillUnmount = function() {
										window.removeEventListener("resize", _this.handleScrollOrResize);
									};
									/**
									* more info at: https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
									*/
									_this.getSnapshotBeforeUpdate = function(prevProps) {
										var top = _this.scroller.current ? _this.scroller.current.scrollTop : 0;
										var blockHeights = prevProps.blockHeights;
										var blockIndex = 0;
										var accumulatedY = 0;
										do {
											accumulatedY += blockHeights[blockIndex];
											blockIndex += 1;
										} while (accumulatedY + blockHeights[blockIndex] < top && blockIndex < blockHeights.length);
										var blockY = top - accumulatedY;
										return {
											blockIndex,
											blockY
										};
									};
									/**
									* Scroll to centralIndex. Likely from circular clicking on an element
									* that should then be scrolled to in linear
									*/
									_this.scrollToCentralIndex = function() {
										if (!_this.scroller.current) return;
										var _a = _this.props, blockHeights = _a.blockHeights, bpsPerBlock = _a.bpsPerBlock, seqBlocks = _a.seqBlocks, height = _a.size.height, totalHeight = _a.totalHeight;
										var visibleBlocks = _this.state.visibleBlocks;
										var _b = _this.scroller.current, clientHeight = _b.clientHeight, scrollHeight = _b.scrollHeight;
										var centralIndex = _this.context.linear;
										var centerBlockIndex = seqBlocks.findIndex(function(block) {
											return block.props.firstBase <= centralIndex && block.props.firstBase + bpsPerBlock >= centralIndex;
										});
										var newVisibleBlocks = [];
										if (scrollHeight <= clientHeight) newVisibleBlocks = visibleBlocks;
										else if (centerBlockIndex > -1) {
											var centerBlock = seqBlocks[centerBlockIndex];
											var topAdjust = centerBlockIndex > 0 ? blockHeights[centerBlockIndex - 1] : 0;
											var top_1 = centerBlock.props.y - topAdjust;
											var bottom_1 = top_1 + height;
											if (bottom_1 > totalHeight) {
												bottom_1 = totalHeight;
												top_1 = totalHeight - height;
											}
											blockHeights.reduce(function(total, h, i) {
												if (total >= top_1 && total <= bottom_1) newVisibleBlocks.push(i);
												return total + h;
											}, 0);
											_this.scroller.current.scrollTop = centerBlock.props.y - blockHeights[0] / 2;
										}
										var newState = {
											centralIndex,
											scrollToken: _this.context.linearScrollToken
										};
										if (!(0, isEqual_1.isEqual)(newVisibleBlocks, visibleBlocks) && newVisibleBlocks.length > 0) newState.visibleBlocks = newVisibleBlocks;
										_this.setState(newState);
									};
									/**
									* the component has mounted to the DOM or updated, and the window should be scrolled downwards
									* so that the central index is visible
									*/
									_this.restoreSnapshot = function(snapshot) {
										if (!_this.scroller.current) return;
										var blockHeights = _this.props.blockHeights;
										var blockIndex = snapshot.blockIndex, blockY = snapshot.blockY;
										var scrollTop = blockHeights.slice(0, blockIndex).reduce(function(acc, h) {
											return acc + h;
										}, 0) + blockY;
										_this.scroller.current.scrollTop = scrollTop;
									};
									/**
									* check whether the blocks that should be visible have changed from what's in state,
									* update if so
									*/
									_this.handleScrollOrResize = function() {
										if (!_this.scroller.current || !_this.insideDOM.current) return;
										var _a = _this.props, blockHeights = _a.blockHeights, height = _a.size.height, totalHeight = _a.totalHeight;
										var visibleBlocks = _this.state.visibleBlocks;
										var newVisibleBlocks = [];
										var top = 0;
										if (_this.scroller && _this.insideDOM) {
											var parentTop = _this.scroller.current.getBoundingClientRect().top;
											top = _this.insideDOM.current.getBoundingClientRect().top - parentTop;
										}
										top = -top + 35;
										top = Math.max(0, top);
										top = Math.min(totalHeight - height, top);
										var bottom = top + height;
										top -= 2 * blockHeights[0];
										blockHeights.reduce(function(total, h, i) {
											if (total >= top && total <= bottom) newVisibleBlocks.push(i);
											return total + h;
										}, 0);
										if (!(0, isEqual_1.isEqual)(newVisibleBlocks, visibleBlocks)) _this.setState({ visibleBlocks: newVisibleBlocks });
									};
									_this.incrementScroller = function(incAmount) {
										_this.stopIncrementingScroller();
										_this.timeoutID = setTimeout(function() {
											if (!_this.scroller.current) return;
											_this.scroller.current.scrollTop += incAmount;
											_this.incrementScroller(incAmount);
										}, 5);
									};
									_this.stopIncrementingScroller = function() {
										if (_this.timeoutID) {
											clearTimeout(_this.timeoutID);
											_this.timeoutID = null;
										}
									};
									/**
									* handleMouseOver is for detecting when the user is performing a drag event
									* at the very top or the very bottom of DIV. If they are, this starts
									* a incrementing the div's scrollTop (ie an upward or downward scroll event) that's
									* terminated by the user leaving the scroll area
									*
									* The rate of the scrollTop is proportional to how far from the top or the
									* bottom the user is (within [-40, 0] for top, and [0, 40] for bottom)
									*/
									_this.handleMouseOver = function(e) {
										if (!_this.scroller.current) return;
										if (e.buttons !== 1) {
											if (_this.timeoutID) _this.stopIncrementingScroller();
											return;
										}
										var scrollerBlock = _this.scroller.current.getBoundingClientRect();
										var scrollRatio = (e.clientY - scrollerBlock.top) / scrollerBlock.height;
										if (scrollRatio > .9) {
											scrollRatio = Math.min(1, scrollRatio);
											var scalingRatio = scrollRatio - .9;
											scalingRatio *= 10;
											var scaledScroll = 15 * scalingRatio;
											_this.incrementScroller(scaledScroll);
										} else if (scrollRatio < .1) {
											scrollRatio = .1 - Math.max(0, scrollRatio);
											var scalingRatio = 10 * scrollRatio;
											var scaledScroll = -15 * scalingRatio;
											_this.incrementScroller(scaledScroll);
										} else _this.stopIncrementingScroller();
									};
									_this.state = {
										centralIndex: 0,
										scrollToken: 0,
										visibleBlocks: new Array(Math.min(5, props.seqBlocks.length)).fill(null).map(function(_, i) {
											return i;
										})
									};
									return _this;
								}
								InfiniteScroll.prototype.render = function() {
									var _a = this.props, blockHeights = _a.blockHeights, seqBlocks = _a.seqBlocks, width = _a.size.width, height = _a.totalHeight;
									var visibleBlocks = this.state.visibleBlocks;
									var firstRendered = visibleBlocks[0];
									var spaceAbove = blockHeights.slice(0, firstRendered).reduce(function(acc, h) {
										return acc + h;
									}, 0);
									return React.createElement("div", {
										ref: this.scroller,
										className: "la-vz-linear-scroller",
										"data-testid": "la-vz-viewer-linear",
										style: style_1.linearScroller,
										onFocus: function() {},
										onMouseOver: this.handleMouseOver,
										onScroll: this.handleScrollOrResize
									}, React.createElement("div", {
										ref: this.insideDOM,
										className: "la-vz-seqblock-container",
										style: {
											height,
											width: "100%"
										}
									}, React.createElement("div", {
										className: "la-vz-seqblock-padding-top",
										style: {
											height: spaceAbove,
											width: width || 0
										}
									}), visibleBlocks.map(function(i) {
										return seqBlocks[i];
									})));
								};
								InfiniteScroll.contextType = centralIndexContext_1.default;
								return InfiniteScroll;
							}(React.PureComponent);
						}),
						(function(__unused_webpack_module, exports$11) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$11, "__esModule", { value: true });
							exports$11.seqBlock = exports$11.linearScroller = exports$11.circularLabelLine = exports$11.circularLabelHover = exports$11.circularLabel = exports$11.viewerCircular = exports$11.translationAminoAcidLabel = exports$11.translationHandleLabel = exports$11.translationHandle = exports$11.annotationLabel = exports$11.annotation = exports$11.indexTickLabel = exports$11.indexTick = exports$11.indexLine = exports$11.cutSiteHighlight = exports$11.cutSite = exports$11.selectionEdge = exports$11.selection = exports$11.highlight = exports$11.search = exports$11.svgText = void 0;
							exports$11.svgText = {
								MozUserSelect: "none",
								WebkitUserSelect: "none",
								background: "none",
								fill: "rgb(42, 42, 42)",
								fontFamily: "Roboto Mono, Monaco, monospace",
								msUserSelect: "none",
								userSelect: "none"
							};
							exports$11.search = {
								cursor: "pointer",
								fill: "rgba(255, 251, 7, 0.5)"
							};
							exports$11.highlight = {
								cursor: "pointer",
								fill: "rgba(255, 251, 7, 0.25)",
								strokeWidth: "1"
							};
							exports$11.selection = {
								fill: "rgb(222, 246, 255)",
								shapeRendering: "auto"
							};
							exports$11.selectionEdge = {
								fill: "black",
								shapeRendering: "geometricPrecision",
								stroke: "black"
							};
							exports$11.cutSite = {
								fill: "transparent",
								shapeRendering: "auto",
								stroke: "rgb(115, 119, 125)",
								strokeWidth: "1"
							};
							exports$11.cutSiteHighlight = {
								cursor: "pointer",
								fill: "rgb(255, 251, 7)",
								fillOpacity: 0,
								shapeRendering: "auto",
								stroke: "rgb(115, 119, 125)",
								strokeWidth: "1"
							};
							exports$11.indexLine = {
								fill: "transparent",
								shapeRendering: "geometricPrecision",
								stroke: "rgb(115, 119, 125)",
								strokeWidth: "1"
							};
							exports$11.indexTick = {
								fill: "transparent",
								shapeRendering: "geometricPrecision",
								stroke: "rgb(115, 119, 125)",
								strokeWidth: "1"
							};
							exports$11.indexTickLabel = __assign(__assign({}, exports$11.svgText), {
								fill: "rgb(115, 119, 125)",
								fontSize: "12",
								fontWeight: 300,
								textRendering: "optimizeLegibility"
							});
							exports$11.annotation = {
								fillOpacity: "0.7",
								shapeRendering: "geometricPrecision",
								strokeWidth: "0.5"
							};
							exports$11.annotationLabel = __assign(__assign({}, exports$11.svgText), {
								color: "rgb(42, 42, 42)",
								fontWeight: 400,
								shapeRendering: "geometricPrecision",
								strokeLinejoin: "round",
								textRendering: "optimizeLegibility"
							});
							exports$11.translationHandle = {
								fillOpacity: "0.7",
								shapeRendering: "geometricPrecision",
								strokeWidth: "0.5"
							};
							exports$11.translationHandleLabel = __assign(__assign({}, exports$11.svgText), {
								color: "rgb(42, 42, 42)",
								fontSize: "9",
								fontWeight: 400,
								shapeRendering: "geometricPrecision",
								strokeLinejoin: "round",
								textRendering: "optimizeLegibility"
							});
							exports$11.translationAminoAcidLabel = __assign(__assign({}, exports$11.svgText), {
								color: "rgb(42, 42, 42)",
								fontSize: "12",
								fontWeight: 400
							});
							exports$11.viewerCircular = {
								cursor: "text",
								fontSize: "12",
								fontWeight: 300,
								margin: "auto"
							};
							exports$11.circularLabel = __assign(__assign({}, exports$11.svgText), { cursor: "pointer" });
							exports$11.circularLabelHover = __assign(__assign({}, exports$11.circularLabel), { textDecoration: "underline" });
							exports$11.circularLabelLine = {
								fill: "none",
								stroke: "rgb(158, 170, 184)",
								strokeWidth: "1"
							};
							exports$11.linearScroller = {
								cursor: "text",
								fontWeight: 300,
								height: "100%",
								outline: "none !important",
								overflowX: "hidden",
								overflowY: "scroll",
								padding: "10px",
								position: "relative"
							};
							exports$11.seqBlock = {
								overflow: "visible",
								padding: 0,
								width: "100%"
							};
						}),
						(function(__unused_webpack_module, exports$12, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$12, "__esModule", { value: true });
							exports$12.SeqBlock = void 0;
							var React = __webpack_require__(2);
							var style_1 = __webpack_require__(13);
							var Annotations_1 = __webpack_require__(15);
							var CutSites_1 = __webpack_require__(18);
							var Find_1 = __webpack_require__(19);
							var Highlights_1 = __webpack_require__(20);
							var Index_1 = __webpack_require__(21);
							var Primers_1 = __webpack_require__(22);
							var Selection_1 = __webpack_require__(23);
							var Translations_1 = __webpack_require__(25);
							exports$12.SeqBlock = function(_super) {
								__extends(SeqBlock, _super);
								function SeqBlock() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									_this.componentDidMount = function() {
										_this.registerSelf();
									};
									_this.componentDidUpdate = function(prevProps) {
										if (prevProps.id !== _this.props.id || prevProps.firstBase !== _this.props.firstBase) _this.registerSelf();
									};
									_this.componentWillUnmount = function() {
										var _a = _this.props, id = _a.id, onUnmount = _a.onUnmount;
										onUnmount(id);
									};
									_this.registerSelf = function() {
										var _a = _this.props, firstBase = _a.firstBase, id = _a.id, inputRef = _a.inputRef, seq = _a.seq;
										inputRef(id, {
											end: firstBase + seq.length,
											ref: id,
											start: firstBase,
											type: "SEQ",
											viewer: "LINEAR"
										});
									};
									/**
									* For elements in arrays, check whether it wraps around the zero index.
									*/
									_this.findXAndWidthElement = function(i, element, elements) {
										var _a, _b, _c, _d;
										var _e = _this.props, bpsPerBlock = _e.bpsPerBlock, firstBase = _e.firstBase, fullSeq = _e.fullSeq;
										var lastBase = firstBase + _e.seq.length;
										var end = element.end, start = element.start;
										var _f = _this.findXAndWidth(start, end), width = _f.width, x = _f.x;
										var overflowLeft = start < firstBase;
										var overflowRight = end > lastBase || start === end && fullSeq.length > bpsPerBlock;
										if (elements.reduce(function(acc, el) {
											return el.id === element.id ? acc + 1 : acc;
										}, 0) > 1) {
											if (elements.findIndex(function(el) {
												return el.id === element.id;
											}) === i) {
												_a = _this.findXAndWidth(firstBase, end), width = _a.width, x = _a.x;
												overflowLeft = true;
												overflowRight = false;
											} else {
												_b = _this.findXAndWidth(start, lastBase), width = _b.width, x = _b.x;
												overflowLeft = false;
												overflowRight = true;
											}
										} else if (start > end) {
											_c = _this.findXAndWidth(start > lastBase ? firstBase : Math.max(firstBase, start), end < firstBase ? lastBase : Math.min(lastBase, end)), width = _c.width, x = _c.x;
											if (start > firstBase) {
												overflowLeft = true;
												overflowRight = end > lastBase;
											}
											if (end < firstBase) {
												overflowLeft = start < firstBase;
												overflowRight = true;
											}
										} else if (start === end) {
											_d = _this.findXAndWidth(firstBase, lastBase), width = _d.width, x = _d.x;
											overflowLeft = true;
											overflowRight = true;
										}
										return {
											overflowLeft,
											overflowRight,
											width,
											x
										};
									};
									/**
									* A helper used in child components to position elements on rows. Given first and last base, how far from the left
									* and how wide should it be?
									*
									* If an element and elements are provided, it also factors in whether the element circles around the 0-index.
									*/
									_this.findXAndWidth = function(firstIndex, lastIndex) {
										if (firstIndex === void 0) firstIndex = 0;
										if (lastIndex === void 0) lastIndex = 0;
										var _a = _this.props, bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, firstBase = _a.firstBase, seqLength = _a.fullSeq.length, size = _a.size;
										firstIndex |= 0;
										lastIndex |= 0;
										var lastBase = Math.min(firstBase + bpsPerBlock, seqLength);
										var multiBlock = seqLength >= bpsPerBlock;
										var x = 0;
										if (firstIndex >= firstBase) {
											x = (firstIndex - firstBase) * charWidth;
											x = Math.max(x, 0) || 0;
										}
										var width = size.width;
										if (firstIndex === lastIndex) width = 0;
										else if (firstIndex >= firstBase || lastIndex < lastBase) {
											var start = Math.max(firstIndex, firstBase);
											var end = Math.min(lastIndex, lastBase);
											width = size.width * ((end - start) / bpsPerBlock);
											width = Math.abs(width) || 0;
										} else if (firstBase + bpsPerBlock > seqLength && multiBlock) width = size.width * (seqLength % bpsPerBlock / bpsPerBlock);
										return {
											width,
											x
										};
									};
									/**
									* Given a bp, return either the bp as was or a text span if it should have a color.
									*
									* We're looking up each bp in the props.bpColors map to see if it should be shaded and, if so,
									* wrapping it in a textSpan with that color as a fill
									*/
									_this.seqTextSpan = function(bp, i) {
										var _a = _this.props, bpColors = _a.bpColors, charWidth = _a.charWidth, firstBase = _a.firstBase, id = _a.id;
										var color;
										if (bpColors) color = bpColors[bp] || bpColors[bp.toUpperCase()] || bpColors[bp.toLowerCase()] || bpColors[i + firstBase] || void 0;
										return React.createElement("tspan", {
											key: i + bp + id,
											fill: color || void 0,
											x: charWidth * i + charWidth * .2
										}, bp);
									};
									return _this;
								}
								SeqBlock.prototype.render = function() {
									var _a = this.props, annotationRows = _a.annotationRows, blockHeight = _a.blockHeight, bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, compSeq = _a.compSeq, cutSiteRows = _a.cutSiteRows, elementHeight = _a.elementHeight, firstBase = _a.firstBase, fullSeq = _a.fullSeq, handleMouseEvent = _a.handleMouseEvent, highlights = _a.highlights, id = _a.id, inputRef = _a.inputRef, lineHeight = _a.lineHeight, onUnmount = _a.onUnmount, primerFwdRows = _a.primerFwdRows, primerRevRows = _a.primerRevRows, searchRows = _a.searchRows, seq = _a.seq, seqFontSize = _a.seqFontSize, seqType = _a.seqType, showComplement = _a.showComplement, showIndex = _a.showIndex, size = _a.size, translationRows = _a.translationRows, zoom = _a.zoom, zoomed = _a.zoomed;
									if (!size.width || !size.height) return null;
									var textProps = {
										fontSize: seqFontSize,
										lengthAdjust: "spacing",
										textAnchor: "start",
										textLength: size.width >= 0 ? size.width : 1,
										textRendering: "optimizeLegibility"
									};
									var lastBase = firstBase + seq.length;
									var primerFwdYDiff = 0;
									var primerFwdHeight = primerFwdRows.length ? elementHeight * primerFwdRows.length : 0;
									var cutSiteYDiff = primerFwdYDiff + primerFwdHeight;
									var cutSiteHeight = zoomed && cutSiteRows.length ? lineHeight : 0;
									var indexYDiff = cutSiteYDiff + cutSiteHeight;
									var indexHeight = seqType === "aa" ? 0 : lineHeight;
									var compYDiff = indexYDiff + indexHeight;
									var compHeight = zoomed && showComplement ? lineHeight : 0;
									var primerRevYDiff = compYDiff + compHeight;
									var primerRevHeight = primerRevRows.length ? elementHeight * primerRevRows.length : 0;
									var translationYDiff = primerRevYDiff + primerRevHeight;
									var translationHeight = 0;
									for (var i = 0; i < translationRows.length; i++) {
										var multiplier = translationRows[i][0]["name"] ? 2 : 1;
										translationHeight += elementHeight * multiplier;
									}
									var annYDiff = translationYDiff + translationHeight;
									var annHeight = elementHeight * annotationRows.length;
									var elementGap = primerRevRows.length + primerRevRows.length + annotationRows.length + translationRows.length ? 3 : 0;
									var indexRowYDiff = annYDiff + annHeight + elementGap;
									var selectHeight = primerFwdHeight + cutSiteHeight + indexHeight + compHeight + translationHeight + annHeight + primerRevHeight + elementGap + 5;
									var selectEdgeHeight = selectHeight + 9;
									if (!zoomed && selectHeight <= elementHeight) selectEdgeHeight = elementHeight;
									return React.createElement("svg", {
										className: "la-vz-seqblock",
										cursor: "text",
										"data-testid": "la-vz-seqblock",
										display: "block",
										height: blockHeight,
										id,
										overflow: "visible",
										style: style_1.seqBlock,
										width: size.width >= 0 ? size.width : 0,
										onMouseDown: handleMouseEvent,
										onMouseMove: handleMouseEvent,
										onMouseUp: handleMouseEvent
									}, showIndex && React.createElement(Index_1.default, {
										charWidth,
										findXAndWidth: this.findXAndWidth,
										firstBase,
										lastBase,
										seq,
										seqType,
										showIndex,
										size,
										yDiff: indexRowYDiff,
										zoom
									}), React.createElement(Selection_1.default.Block, {
										findXAndWidth: this.findXAndWidth,
										firstBase,
										fullSeq,
										lastBase,
										selectHeight,
										onUnmount
									}), primerFwdRows.length && React.createElement(Primers_1.default, {
										bpsPerBlock,
										direction: 1,
										elementHeight,
										findXAndWidth: this.findXAndWidthElement,
										firstBase,
										fullSeq,
										inputRef,
										lastBase,
										primerRows: primerFwdRows,
										seqBlockRef: this,
										width: size.width,
										yDiff: primerFwdYDiff
									}), React.createElement(Highlights_1.Highlights, {
										compYDiff: compYDiff - 3,
										findXAndWidth: this.findXAndWidthElement,
										firstBase,
										highlights,
										indexYDiff: indexYDiff - 3,
										inputRef,
										lastBase,
										lineHeight,
										listenerOnly: false,
										seqBlockRef: this
									}), React.createElement(Selection_1.default.Edges, {
										findXAndWidth: this.findXAndWidth,
										firstBase,
										fullSeq,
										lastBase,
										selectEdgeHeight
									}), React.createElement(Find_1.default, {
										compYDiff: compYDiff - 3,
										filteredRows: showComplement ? searchRows : searchRows.filter(function(r) {
											return r.direction === 1;
										}),
										findXAndWidth: this.findXAndWidth,
										firstBase,
										indexYDiff: indexYDiff - 3,
										inputRef,
										lastBase,
										lineHeight,
										listenerOnly: false,
										zoomed
									}), primerRevRows.length && React.createElement(Primers_1.default, {
										bpsPerBlock,
										direction: -1,
										elementHeight,
										findXAndWidth: this.findXAndWidthElement,
										firstBase,
										fullSeq,
										inputRef,
										lastBase,
										primerRows: primerRevRows,
										seqBlockRef: this,
										width: size.width,
										yDiff: primerRevYDiff
									}), translationRows.length && React.createElement(Translations_1.TranslationRows, {
										bpsPerBlock,
										charWidth,
										elementHeight,
										findXAndWidth: this.findXAndWidth,
										findXAndWidthElement: this.findXAndWidthElement,
										firstBase,
										fullSeq,
										inputRef,
										lastBase,
										seqType,
										translationRows,
										yDiff: translationYDiff,
										onUnmount
									}), annotationRows.length && React.createElement(Annotations_1.default, {
										annotationRows,
										bpsPerBlock,
										elementHeight,
										findXAndWidth: this.findXAndWidthElement,
										firstBase,
										fullSeq,
										inputRef,
										lastBase,
										seqBlockRef: this,
										width: size.width,
										yDiff: annYDiff
									}), zoomed && seqType !== "aa" ? React.createElement("text", __assign({}, textProps, {
										className: "la-vz-seq",
										"data-testid": "la-vz-seq",
										id,
										style: style_1.svgText,
										transform: "translate(0, ".concat(indexYDiff + lineHeight / 2, ")")
									}), seq.split("").map(this.seqTextSpan)) : null, compSeq && zoomed && showComplement && seqType !== "aa" ? React.createElement("text", __assign({}, textProps, {
										className: "la-vz-comp-seq",
										"data-testid": "la-vz-comp-seq",
										id,
										style: style_1.svgText,
										transform: "translate(0, ".concat(compYDiff + lineHeight / 2, ")")
									}), compSeq.split("").map(this.seqTextSpan)) : null, zoomed && React.createElement(CutSites_1.CutSites, {
										cutSites: cutSiteRows,
										findXAndWidth: this.findXAndWidth,
										firstBase,
										inputRef,
										lastBase,
										lineHeight,
										size,
										yDiff: cutSiteYDiff - 3,
										zoom
									}), React.createElement(Find_1.default, {
										compYDiff: compYDiff - 3,
										filteredRows: showComplement ? searchRows : searchRows.filter(function(r) {
											return r.direction === 1;
										}),
										findXAndWidth: this.findXAndWidth,
										firstBase,
										indexYDiff: indexYDiff - 3,
										inputRef,
										lastBase,
										lineHeight,
										listenerOnly: true,
										zoomed
									}), React.createElement(Highlights_1.Highlights, {
										compYDiff: compYDiff - 3,
										findXAndWidth: this.findXAndWidthElement,
										firstBase,
										highlights,
										indexYDiff: indexYDiff - 3,
										inputRef,
										lastBase,
										lineHeight,
										listenerOnly: true,
										seqBlockRef: this
									}));
								};
								SeqBlock.defaultProps = {};
								return SeqBlock;
							}(React.PureComponent);
						}),
						(function(__unused_webpack_module, exports$13, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$13, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var colors_1 = __webpack_require__(16);
							var style_1 = __webpack_require__(13);
							var hoverOtherAnnotationRows = function(className, opacity) {
								if (!document) return;
								var elements = document.getElementsByClassName(className);
								for (var i = 0; i < elements.length; i += 1) elements[i].style.fillOpacity = "".concat(opacity);
							};
							/**
							* Render each row of annotations into its own row.
							* This is not a default export for sake of the React component displayName.
							*/
							var AnnotationRows = function(props) {
								return React.createElement("g", null, props.annotationRows.map(function(anns, i) {
									return React.createElement(AnnotationRow, {
										key: "annotation-linear-row-".concat(anns[0].id, "-").concat(props.firstBase, "-").concat(props.lastBase),
										annotations: anns,
										bpsPerBlock: props.bpsPerBlock,
										findXAndWidth: props.findXAndWidth,
										firstBase: props.firstBase,
										fullSeq: props.fullSeq,
										height: props.elementHeight,
										inputRef: props.inputRef,
										lastBase: props.lastBase,
										seqBlockRef: props.seqBlockRef,
										width: props.width,
										y: props.yDiff + props.elementHeight * i
									});
								}));
							};
							exports$13["default"] = AnnotationRows;
							/**
							* A single row of annotations. Multiple of these may be in one seqBlock
							* vertically stacked on top of one another in non-overlapping arrays.
							*/
							var AnnotationRow = function(props) {
								return React.createElement("g", {
									className: "la-vz-linear-annotation-row",
									height: props.height * .8,
									transform: "translate(0, ".concat(props.y, ")"),
									width: props.width
								}, props.annotations.map(function(a, i) {
									return React.createElement(SingleNamedElement, __assign({}, props, {
										key: "annotation-linear-".concat(a.id, "-").concat(i, "-").concat(props.firstBase, "-").concat(props.lastBase),
										element: a,
										elements: props.annotations,
										index: i
									}));
								}));
							};
							/**
							* SingleNamedElement is a single rectangular element in the SeqBlock.
							* It does a bunch of stuff to avoid edge-cases from wrapping around the 0-index, edge of blocks, etc.
							*/
							var SingleNamedElement = function(props) {
								var element = props.element, elements = props.elements, findXAndWidth = props.findXAndWidth, firstBase = props.firstBase, index = props.index, inputRef = props.inputRef, lastBase = props.lastBase;
								var color = element.color, direction = element.direction, end = element.end, name = element.name, start = element.start;
								var forward = direction === 1;
								var reverse = direction === -1;
								var _a = findXAndWidth(index, element, elements), overflowLeft = _a.overflowLeft, overflowRight = _a.overflowRight, width = _a.width, origX = _a.x;
								var crossZero = start > end && end < firstBase;
								var endFWD = forward && end > firstBase && end <= lastBase;
								var endREV = reverse && start >= firstBase && start <= lastBase;
								var height = props.height * .8;
								var cW = 4;
								var cH = height / 4;
								var _b = [origX, width], x = _b[0], w = _b[1];
								var topLeft = endREV ? "M ".concat(2 * cW, " 0") : "M 0 0";
								var topRight = endFWD ? "L ".concat(width - 2 * cW, " 0") : "L ".concat(width, " 0");
								var linePath = "";
								var bottomRight = "L ".concat(width, " ").concat(height);
								if (overflowRight && width > 2 * cW || crossZero) bottomRight = "\n        L ".concat(width - cW, " ").concat(cH, "\n        L ").concat(width, " ").concat(2 * cH, "\n        L ").concat(width - cW, " ").concat(3 * cH, "\n        L ").concat(width, " ").concat(4 * cH);
								else if (endFWD) bottomRight = "\n        L ".concat(width, " ").concat(height / 2, "\n        L ").concat(width - Math.min(2 * cW, w), " ").concat(height);
								var bottomLeft = "L 0 ".concat(height, " L 0 0");
								if (overflowLeft && width > 2 * cW) bottomLeft = "\n        L 0 ".concat(height, "\n        L ").concat(cW, " ").concat(3 * cH, "\n        L 0 ").concat(2 * cH, "\n        L ").concat(cW, " ").concat(cH, "\n        L 0 0");
								else if (endREV) bottomLeft = "\n        L ".concat(Math.min(2 * cW, w), " ").concat(height, "\n        L 0 ").concat(height / 2, "\n        L ").concat(Math.min(2 * cW, w), " 0");
								linePath = "".concat(topLeft, " ").concat(topRight, " ").concat(bottomRight, " ").concat(bottomLeft);
								if (forward && overflowRight || forward && crossZero) {
									if (width > 15) linePath += "\n        M ".concat(width - 3 * cW, " ").concat(cH, "\n        L ").concat(width - 2 * cW, " ").concat(2 * cH, "\n        L ").concat(width - 3 * cW, " ").concat(3 * cH, "\n        M ").concat(width - 4 * cW, " ").concat(cH, "\n        L ").concat(width - 3 * cW, " ").concat(2 * cH, "\n        L ").concat(width - 4 * cW, " ").concat(3 * cH);
								} else if (reverse && overflowLeft || reverse && crossZero) {
									if (width > 15) linePath += "\n        M ".concat(3 * cW, " ").concat(3 * cH, "\n        L ").concat(2 * cW, " ").concat(cH * 2, "\n        L ").concat(3 * cW, " ").concat(cH, "\n        M ").concat(4 * cW, " ").concat(3 * cH, "\n        L ").concat(3 * cW, " ").concat(cH * 2, "\n        L ").concat(4 * cW, " ").concat(cH);
								}
								var fontSize = 12;
								var annotationCharacterWidth = .591 * fontSize;
								var availableCharacters = Math.floor((width - 40) / annotationCharacterWidth);
								var displayName = name;
								if (name.length > availableCharacters) {
									var charactersToShow = availableCharacters - 1;
									if (charactersToShow < 3) displayName = "";
									else displayName = "".concat(name.slice(0, charactersToShow), "…");
								}
								return React.createElement("g", {
									id: element.id,
									transform: "translate(".concat(x, ", ").concat(.1 * height, ")")
								}, React.createElement("title", null, name), React.createElement("path", {
									ref: inputRef(element.id, {
										end,
										name: element.name,
										ref: element.id,
										start,
										type: "ANNOTATION",
										viewer: "LINEAR"
									}),
									className: "".concat(element.id, " la-vz-annotation"),
									cursor: "pointer",
									d: linePath,
									fill: color,
									id: element.id,
									stroke: color ? colors_1.COLOR_BORDER_MAP[color] || (0, colors_1.darkerColor)(color) : "gray",
									style: style_1.annotation,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverOtherAnnotationRows(element.id, .7);
									},
									onMouseOver: function() {
										return hoverOtherAnnotationRows(element.id, 1);
									}
								}), React.createElement("text", {
									className: "la-vz-annotation-label",
									cursor: "pointer",
									dominantBaseline: "middle",
									fontSize,
									id: element.id,
									style: style_1.annotationLabel,
									textAnchor: "middle",
									x: width / 2,
									y: height / 2 + 1,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverOtherAnnotationRows(element.id, .7);
									},
									onMouseOver: function() {
										return hoverOtherAnnotationRows(element.id, 1);
									}
								}, displayName));
							};
						}),
						((__unused_webpack_module, exports$14, __webpack_require__) => {
							Object.defineProperty(exports$14, "__esModule", { value: true });
							exports$14.darkerColor = exports$14.borderColorByIndex = exports$14.colorByIndex = exports$14.chooseRandomColor = exports$14.COLOR_BORDER_MAP = exports$14.COLORS = void 0;
							var pSBC_1 = __webpack_require__(17);
							/**
							* a color pallete of colors (for LinearSeq right now)\
							* generated using:
							* https://material.io/color/#!/?view.left=0&view.right=0&primary.color=FFCC80
							*/
							exports$14.COLORS = [
								"#9DEAED",
								"#8FDE8C",
								"#CFF283",
								"#8CDEBD",
								"#F0A3CE",
								"#F7C672",
								"#F07F7F",
								"#FAA887",
								"#F099F7",
								"#C59CFF",
								"#6B81FF",
								"#85A6FF"
							];
							exports$14.COLOR_BORDER_MAP = {
								"#6B81FF": "#2E3B85",
								"#85A6FF": "#4C66AD",
								"#8CDEBD": "#4CA17F",
								"#8FDE8C": "#5CA35A",
								"#9DEAED": "#5EB5B8",
								"#C59CFF": "#8A60C4",
								"#CFF283": "#8DB041",
								"#F07F7F": "#AD4040",
								"#F099F7": "#AB63B0",
								"#F0A3CE": "#BD6295",
								"#F7C672": "#BD872B",
								"#FAA887": "#B36446"
							};
							var chooseRandomColor = function(colors) {
								var choices = colors || exports$14.COLORS;
								return choices[Math.floor(Math.random() * choices.length)];
							};
							exports$14.chooseRandomColor = chooseRandomColor;
							/** get an "indexed" color from the colors array */
							var colorByIndex = function(i, colors) {
								return (colors || exports$14.COLORS)[i % (colors || exports$14.COLORS).length];
							};
							exports$14.colorByIndex = colorByIndex;
							/** get an "indexed" color from the colors array */
							var borderColorByIndex = function(i) {
								return exports$14.COLOR_BORDER_MAP[exports$14.COLORS[i % exports$14.COLORS.length]];
							};
							exports$14.borderColorByIndex = borderColorByIndex;
							/** cache for input color to those 50% darker */
							var darkerColorCache = {};
							/** darken a HEX color by 50% */
							var darkerColor = function(c) {
								if (darkerColorCache[c]) return darkerColorCache[c];
								var darkerColor = (0, pSBC_1.pSBC)(-.5, c);
								darkerColorCache[c] = darkerColor;
								return darkerColor || c;
							};
							exports$14.darkerColor = darkerColor;
						}),
						((__unused_webpack_module, exports$15) => {
							Object.defineProperty(exports$15, "__esModule", { value: true });
							exports$15.pSBC = void 0;
							var pSBC = function(p, c0, c1, l) {
								var i = parseInt;
								var m = Math.round;
								var r, g, b, P, f, t, h, a = typeof c1 == "string";
								if (typeof p !== "number" || p < -1 || p > 1 || typeof c0 !== "string" || c0[0] !== "r" && c0[0] !== "#" || c1 && !a) return null;
								var pSBCr = function(d) {
									var _a;
									var n = d.length;
									var x = {};
									if (n > 9) {
										_a = d = d.split(","), r = _a[0], g = _a[1], b = _a[2], a = _a[3];
										n = d.length;
										if (n < 3 || n > 4) return null;
										x.r = i(r[3] === "a" ? r.slice(5) : r.slice(4));
										x.g = i(g);
										x.b = i(b);
										x.a = a ? parseFloat(a) : -1;
									} else {
										if (n === 8 || n === 6 || n < 4) return null;
										if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
										d = i(d.slice(1), 16);
										if (n === 9 || n === 5) {
											x.r = d >> 24 & 255;
											x.g = d >> 16 & 255;
											x.b = d >> 8 & 255;
											x.a = m((d & 255) / .255) / 1e3;
										} else {
											x.r = d >> 16;
											x.g = d >> 8 & 255;
											x.b = d & 255;
											x.a = -1;
										}
									}
									return x;
								};
								h = c0.length > 9;
								h = a ? c1.length > 9 ? true : c1 === "c" ? !h : false : h;
								f = pSBCr(c0);
								P = p < 0;
								t = c1 && c1 !== "c" ? pSBCr(c1) : P ? {
									a: -1,
									b: 0,
									g: 0,
									r: 0
								} : {
									a: -1,
									b: 255,
									g: 255,
									r: 255
								};
								p = P ? p * -1 : p;
								P = 1 - p;
								if (!f || !t) return null;
								if (l) {
									r = m(P * f.r + p * t.r);
									g = m(P * f.g + p * t.g);
									b = m(P * f.b + p * t.b);
								} else {
									r = m(Math.pow(P * Math.pow(f.r, 2) + p * Math.pow(t.r, 2), .5));
									g = m(Math.pow(P * Math.pow(f.g, 2) + p * Math.pow(t.g, 2), .5));
									b = m(Math.pow(P * Math.pow(f.b, 2) + p * Math.pow(t.b, 2), .5));
								}
								a = f.a;
								t = t.a;
								f = a >= 0 || t >= 0;
								a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
								if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1e3) / 1e3 : "") + ")";
								else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? void 0 : -2);
							};
							exports$15.pSBC = pSBC;
						}),
						(function(__unused_webpack_module, exports$16, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$16, "__esModule", { value: true });
							exports$16.CutSites = void 0;
							var React = __webpack_require__(2);
							var SeqViewerContainer_1 = __webpack_require__(3);
							var style_1 = __webpack_require__(13);
							/**
							* Renders enzyme cut sites on the linear viewer. This includes a few things:
							* - the cut site itself (some lines for the cut site on top and bottom sequences)
							* - an outline of the total recognition site (can span SeqBlocks)
							* - a label above the cut-site
							*/
							var CutSites = function(props) {
								var cutSites = props.cutSites, findXAndWidth = props.findXAndWidth, firstBase = props.firstBase, inputRef = props.inputRef, lastBase = props.lastBase, lineHeight = props.lineHeight, size = props.size, yDiff = props.yDiff, zoom = props.zoom.linear;
								var enhancedCutSites = enhanceCutSites(cutSites, firstBase, lastBase, findXAndWidth);
								if (!enhancedCutSites.length) return null;
								var labelledCutSites = withLabels(enhancedCutSites, size);
								var lineYDiff = yDiff + lineHeight;
								return React.createElement("g", { className: "la-vz-cut-sites" }, labelledCutSites.map(function(c) {
									var _a;
									return React.createElement("g", { key: "cut-site-".concat(c.c.id, "-").concat(firstBase) }, c.label.render && React.createElement("text", {
										className: "la-vz-cut-site-text ".concat(c.c.id, "-label"),
										dominantBaseline: "hanging",
										id: c.c.id,
										style: __assign(__assign({}, style_1.svgText), {
											cursor: "pointer",
											fontSize: 12
										}),
										textAnchor: "start",
										x: c.label.x,
										y: yDiff,
										onBlur: function() {
											return 0;
										},
										onFocus: function() {
											return 0;
										},
										onMouseOut: function() {
											return onCutSiteHover(c.c.id, false);
										},
										onMouseOver: function() {
											return onCutSiteHover(c.c.id, true);
										}
									}, c.label.text), zoom > 10 && React.createElement("path", {
										ref: inputRef(c.c.id, {
											clockwise: true,
											end: c.c.end,
											id: c.c.id,
											start: c.c.start,
											type: "ENZYME",
											viewer: "LINEAR"
										}),
										className: "la-vz-cut-site-highlight ".concat(c.c.id),
										d: "M ".concat(c.highlight.x, " ").concat(lineYDiff, "\n                    L ").concat(c.highlight.x + c.highlight.width, " ").concat(lineYDiff, "\n                    L ").concat(c.highlight.x + c.highlight.width, " ").concat(lineYDiff + 2 * lineHeight, "\n                    L ").concat(c.highlight.x, " ").concat(lineYDiff + 2 * lineHeight, " Z"),
										style: ((_a = c.c.color) === null || _a === void 0 ? void 0 : _a.length) ? __assign(__assign({}, style_1.cutSiteHighlight), { fill: c.c.color }) : style_1.cutSiteHighlight,
										onMouseOut: function() {
											return onCutSiteHover(c.c.id, false);
										},
										onMouseOver: function() {
											return onCutSiteHover(c.c.id, true);
										}
									}), c.top.render && React.createElement("path", {
										className: "la-vz-cut-site ".concat(c.c.id),
										d: "M ".concat(c.top.x, " ").concat(lineYDiff, " L ").concat(c.top.x, " ").concat(lineYDiff + lineHeight),
										style: style_1.cutSite
									}), c.connector.render && zoom > 10 && React.createElement("path", {
										className: "la-vz-cut-site ".concat(c.c.id),
										d: "M ".concat(c.connector.x, " ").concat(lineYDiff + lineHeight, "\n                    L ").concat(c.connector.x + c.connector.width, " ").concat(lineYDiff + lineHeight),
										style: style_1.cutSite
									}), c.bottom.render && zoom > 10 && React.createElement("path", {
										className: "la-vz-cut-site ".concat(c.c.id),
										d: "M ".concat(c.bottom.x, " ").concat(lineYDiff + lineHeight, " L ").concat(c.bottom.x, " ").concat(lineYDiff + 2 * lineHeight),
										style: style_1.cutSite
									}));
								}));
							};
							exports$16.CutSites = CutSites;
							/**
							* This takes cut-sites and does some piecemeal calculations to add meta about:
							* - top (x position of the top line and whether to render)
							* - connector (x position and width of the connector and whether to render)
							* - bottom (x position of the bottom line and whether to render)
							* - highlight (x/width/color of the highlight block)
							*/
							var enhanceCutSites = function(cutSites, firstBase, lastBase, findXAndWidth) {
								return cutSites.map(function(c) {
									var showTopLine = c.fcut > firstBase && c.fcut < lastBase;
									if (c.fcut === firstBase && c.rcut > firstBase && c.rcut <= lastBase) showTopLine = true;
									else if (c.fcut === lastBase && c.rcut >= firstBase && c.rcut <= lastBase) showTopLine = true;
									var showBottomLine = c.rcut > firstBase && c.rcut < lastBase;
									if (c.rcut === firstBase && c.fcut > firstBase && c.fcut <= lastBase) showBottomLine = true;
									else if (c.rcut === lastBase && c.fcut >= firstBase && c.fcut <= lastBase) showBottomLine = true;
									var enhancedCutSite = c;
									if (c.end < c.start) {
										if (c.start > firstBase && c.start < lastBase) {
											enhancedCutSite = __assign(__assign({}, c), { end: lastBase });
											if (c.fcut < c.start) enhancedCutSite = __assign(__assign({}, enhancedCutSite), { fcut: lastBase });
											if (c.rcut < c.start) enhancedCutSite = __assign(__assign({}, enhancedCutSite), { rcut: lastBase });
										} else {
											enhancedCutSite = __assign(__assign({}, c), { start: firstBase });
											if (c.fcut > c.end) enhancedCutSite = __assign(__assign({}, enhancedCutSite), { fcut: firstBase });
											if (c.rcut > c.end) enhancedCutSite = __assign(__assign({}, enhancedCutSite), { rcut: firstBase });
										}
									}
									var topX = findXAndWidth(enhancedCutSite.fcut, enhancedCutSite.fcut).x;
									var bottomX = findXAndWidth(enhancedCutSite.rcut, enhancedCutSite.rcut).x;
									return {
										bottom: {
											render: showBottomLine,
											x: bottomX
										},
										c,
										connector: calcConnector(enhancedCutSite, topX, bottomX, firstBase, lastBase, showTopLine, showBottomLine, findXAndWidth),
										highlight: calcHighlight(enhancedCutSite, firstBase, lastBase, findXAndWidth),
										top: {
											render: showTopLine,
											x: topX
										}
									};
								});
							};
							/**
							* calcHighlight returns the x and width of the enzyme recognition site's highlight block.
							*/
							var calcHighlight = function(c, firstBase, lastBase, findXAndWidth) {
								if (isWithinSeqBlock(c.start, c.end, firstBase, lastBase)) {
									if (c.start > c.end) return findXAndWidth(c.end < firstBase ? lastBase : Math.min(lastBase, c.end), c.start > lastBase ? firstBase : Math.max(firstBase, c.start));
									return findXAndWidth(c.start < firstBase ? lastBase : Math.min(lastBase, c.start), c.end > lastBase ? firstBase : Math.max(firstBase, c.end));
								}
								return findXAndWidth(c.start, c.end);
							};
							/**
							* isWithinSeqBlock returns whether the cut site is entirely within this SeqBlock
							*/
							var isWithinSeqBlock = function(start, end, firstBase, lastBase) {
								if (start < firstBase && end < firstBase || start > lastBase && end > lastBase) return true;
								if (end >= start) return end < lastBase && start > firstBase;
								return start < lastBase && end > firstBase;
							};
							var calcConnector = function(c, topX, bottomX, firstBase, lastBase, showTopLine, showBottomLine, findXAndWidth) {
								if (showTopLine && showBottomLine) return {
									render: true,
									width: Math.abs(bottomX - topX),
									x: Math.min(topX, bottomX)
								};
								if (showTopLine) {
									if (c.start + topX > c.end + bottomX) return __assign({ render: true }, findXAndWidth(firstBase, c.fcut));
									if (c.fcut > c.rcut) return __assign({ render: true }, findXAndWidth(firstBase, c.fcut));
									return __assign({ render: true }, findXAndWidth(c.fcut, lastBase));
								}
								if (showBottomLine) {
									if (c.start + topX > c.end + bottomX) return __assign({ render: true }, findXAndWidth(c.rcut, lastBase));
									if (c.fcut > c.rcut) return __assign({ render: true }, findXAndWidth(c.rcut, lastBase));
									return __assign({ render: true }, findXAndWidth(firstBase, c.rcut));
								}
								return {
									render: false,
									width: 0,
									x: 0
								};
							};
							/**
							* This tries to position the cut-site labels so they don't overlap.
							*
							* I'm doing something simple here where I shift the labels left/right. I don't try to
							* move the labels vertically or draw a line from the labels to the cut-sites (like on
							* the circular viewer).
							*
							* Steps:
							*   - move off the left/right side of the screen if the label is too close to the edge
							*   - if the label is too close to another label, move it left/right
							*   - if it's now all the way off the screen, don't render it
							*
							* context: https://github.com/Lattice-Automation/seqviz/issues/104
							*/
							var withLabels = function(cutSites, size) {
								var unlabelled = cutSites.filter(function(c) {
									return !c.top.render;
								}).map(function(c) {
									return __assign(__assign({}, c), { label: {
										render: false,
										text: c.c.name,
										x: c.highlight.x
									} });
								});
								var labelled = cutSites.filter(function(c) {
									return c.top.render;
								}).sort(function(a, b) {
									return a.top.x - b.top.x;
								}).map(function(c) {
									return __assign(__assign({}, c), { label: {
										render: c.top.render,
										text: c.c.name,
										x: c.highlight.x
									} });
								});
								var overflow = function(c) {
									return c.label.x + c.label.text.length * SeqViewerContainer_1.CHAR_WIDTH > size.width;
								};
								labelled.forEach(function(c) {
									var width = c.label.text.length * SeqViewerContainer_1.CHAR_WIDTH;
									if (overflow(c)) c.label.x = size.width - width;
								});
								var overlap = function(c1, c2) {
									return c1.label.x + c1.label.text.length * SeqViewerContainer_1.CHAR_WIDTH > c2.label.x;
								};
								labelled.forEach(function(c, i) {
									if (i == 0) return c;
									var last = labelled[i - 1];
									while (overlap(last, c)) c.label.x += SeqViewerContainer_1.CHAR_WIDTH * 2;
									return c;
								});
								labelled.forEach(function(c) {
									if (overflow(c)) c.label.render = false;
								});
								return unlabelled.concat(labelled);
							};
							/**
							* This changes the opacity of the enzyme recognition sequence.
							*
							* on hover, an enzyme recognition site should have an opacity of 0.5. 0 otherwise
							* on hover, an enzyme name should have opacity 1.0, 0 otherwise
							*/
							var onCutSiteHover = function(className, on) {
								if (on === void 0) on = false;
								if (!document) return;
								var elements = document.getElementsByClassName("".concat(className, "-label"));
								for (var i = 0; i < elements.length; i += 1) {
									elements[i].style.fillOpacity = on ? "1.0" : "0.8";
									elements[i].style.fontWeight = on ? "400" : "300";
								}
								elements = document.getElementsByClassName(className);
								for (var i = 0; i < elements.length; i += 1) {
									elements[i].style.fillOpacity = on ? "0.25" : "0";
									elements[i].style.stroke = on ? "black" : "rgb(115, 119, 125)";
								}
							};
						}),
						((__unused_webpack_module, exports$17, __webpack_require__) => {
							Object.defineProperty(exports$17, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var sequence_1 = __webpack_require__(11);
							var style_1 = __webpack_require__(13);
							/**
							* Render rectangles around Search results.
							*/
							var Find = function(_a) {
								var compYDiff = _a.compYDiff, searchRows = _a.filteredRows, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, indexYDiff = _a.indexYDiff, inputRef = _a.inputRef, lastBase = _a.lastBase, lineHeight = _a.lineHeight, listenerOnly = _a.listenerOnly, zoomed = _a.zoomed;
								return React.createElement(React.Fragment, null, searchRows.map(function(s) {
									return React.createElement(FindBlock, {
										key: JSON.stringify(s),
										compYDiff,
										direction: s.direction || 1,
										end: s.end,
										findXAndWidth,
										firstBase,
										indexYDiff,
										inputRef,
										lastBase,
										lineHeight,
										listenerOnly,
										start: s.start,
										zoomed
									});
								}));
							};
							exports$17["default"] = Find;
							var FindBlock = function(_a) {
								var _b;
								var compYDiff = _a.compYDiff, direction = _a.direction, end = _a.end, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, indexYDiff = _a.indexYDiff, inputRef = _a.inputRef, lastBase = _a.lastBase, lineHeight = _a.lineHeight, listenerOnly = _a.listenerOnly, start = _a.start, zoomed = _a.zoomed;
								var _c = findXAndWidth(start, end), width = _c.width, x = _c.x;
								if (start > end) _b = findXAndWidth(start > lastBase ? firstBase : Math.max(firstBase, start), end < firstBase ? lastBase : Math.min(lastBase, end)), width = _b.width, x = _b.x;
								var id = (0, sequence_1.randomID)();
								var y = indexYDiff;
								if (direction < 0 || !zoomed) y = compYDiff;
								return React.createElement("rect", {
									key: id,
									ref: inputRef(id, {
										end,
										id,
										start,
										type: "FIND",
										viewer: "LINEAR"
									}),
									className: "la-vz-search",
									cursor: "pointer",
									height: lineHeight,
									id,
									shapeRendering: "crispEdges",
									stroke: listenerOnly ? "none" : "rgba(0, 0, 0, 0.5)",
									strokeWidth: 1,
									style: listenerOnly ? { fill: "transparent" } : style_1.search,
									width,
									x,
									y
								});
							};
						}),
						(function(__unused_webpack_module, exports$18, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$18, "__esModule", { value: true });
							exports$18.Highlights = void 0;
							var React = __webpack_require__(2);
							var style_1 = __webpack_require__(13);
							/**
							* Render rectangles around highlighted ranges.
							*/
							var Highlights = function(props) {
								return React.createElement(React.Fragment, null, props.highlights.map(function(h, i) {
									return React.createElement(SingleHighlight, __assign({ key: "linear-highlight-".concat(h.id, "-").concat(props.listenerOnly) }, props, {
										highlight: h,
										index: i
									}));
								}));
							};
							exports$18.Highlights = Highlights;
							var SingleHighlight = function(props) {
								var _a;
								var _b = props.findXAndWidth(props.index, props.highlight, props.highlights), width = _b.width, x = _b.x;
								var fill = style_1.highlight.fill;
								if (props.listenerOnly) fill = "transparent";
								else if ((_a = props.highlight.color) === null || _a === void 0 ? void 0 : _a.length) fill = props.highlight.color;
								var rectProps = {
									className: "la-vz-highlight",
									height: props.lineHeight,
									id: props.highlight.id,
									stroke: props.listenerOnly ? "none" : "rgba(0, 0, 0, 0.5)",
									style: __assign(__assign({}, style_1.highlight), { fill }),
									width,
									x
								};
								return React.createElement(React.Fragment, null, React.createElement("rect", __assign({
									key: "linear-highlight-".concat(props.highlight.id, "-top"),
									ref: props.inputRef(props.highlight.id, __assign(__assign({ ref: props.highlight.id }, props.highlight), {
										type: "HIGHLIGHT",
										viewer: "LINEAR"
									}))
								}, rectProps, { y: props.indexYDiff })), React.createElement("rect", __assign({
									key: "linear-highlight-".concat(props.highlight.id, "-bottom"),
									ref: props.inputRef(props.highlight.id, __assign(__assign({ ref: props.highlight.id }, props.highlight), {
										type: "HIGHLIGHT",
										viewer: "LINEAR"
									}))
								}, rectProps, { y: props.compYDiff })));
							};
						}),
						(function(__unused_webpack_module, exports$19, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							Object.defineProperty(exports$19, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var style_1 = __webpack_require__(13);
							exports$19["default"] = function(_super) {
								__extends(Index, _super);
								function Index() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									_this.genTicks = function() {
										var _a = _this.props, charWidth = _a.charWidth, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, seq = _a.seq, seqType = _a.seqType, size = _a.size, zoom = _a.zoom;
										var seqLength = seq.length;
										var tickInc = 0;
										switch (true) {
											case zoom.linear > 85:
												tickInc = 5;
												break;
											case zoom.linear > 40:
												tickInc = 10;
												break;
											case zoom.linear > 10:
												tickInc = 20;
												break;
											case zoom.linear >= 0:
												tickInc = 50;
												break;
											default: tickInc = 10;
										}
										if (seqType === "aa") tickInc = tickInc / 2;
										var tickIndexes = [];
										if (firstBase === 0) tickIndexes.push(1);
										var i = 0;
										while ((i + firstBase) % tickInc !== 0) i += 1;
										while (i < seqLength) {
											if (i + firstBase !== 0) tickIndexes.push(i + firstBase);
											i += tickInc;
										}
										return tickIndexes.map(function(p) {
											var tickFromLeft = findXAndWidth(p - 1, p - 1).x;
											tickFromLeft += charWidth / 2;
											var digits = Math.ceil(Math.log10(p + 1));
											digits -= 1;
											var textWidth = digits * 7.7;
											var textFromLeft = findXAndWidth(p - 1, p - 1).x;
											textFromLeft += charWidth / 2;
											textFromLeft -= textWidth / 2 + 3;
											textFromLeft = Math.max(0, textFromLeft);
											textFromLeft = Math.min(size.width - textWidth / 2, textFromLeft);
											var transTick = "translate(".concat(tickFromLeft, ", 1)");
											var transText = "translate(".concat(textFromLeft, ", 10)");
											return React.createElement(React.Fragment, { key: p }, React.createElement("path", {
												className: "la-vz-index-tick",
												d: "M 0 0 L 0 7",
												style: style_1.indexTick,
												transform: transTick
											}), React.createElement("text", {
												className: "la-vz-index-tick-label",
												dominantBaseline: "hanging",
												style: style_1.indexTickLabel,
												transform: transText
											}, p));
										});
									};
									return _this;
								}
								Index.prototype.render = function() {
									var _a = this.props, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, lastBase = _a.lastBase, showIndex = _a.showIndex, yDiff = _a.yDiff;
									if (!showIndex) return null;
									var _b = findXAndWidth(firstBase, lastBase), width = _b.width, x = _b.x;
									return React.createElement("g", { transform: "translate(0, ".concat(yDiff, ")") }, React.createElement("path", {
										className: "la-vz-index-line",
										d: "M 0 1 L ".concat(x + width, " 1"),
										style: style_1.indexLine
									}), this.genTicks());
								};
								return Index;
							}(React.PureComponent);
						}),
						(function(__unused_webpack_module, exports$20, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$20, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var colors_1 = __webpack_require__(16);
							var style_1 = __webpack_require__(13);
							var hoverOtherPrimerRows = function(className, opacity) {
								if (!document) return;
								var elements = document.getElementsByClassName(className);
								for (var i = 0; i < elements.length; i += 1) elements[i].style.fillOpacity = "".concat(opacity);
							};
							/**
							* Render each row of annotations into its own row.
							* This is not a default export for sake of the React component displayName.
							*/
							var PrimeRows = function(props) {
								return React.createElement("g", null, props.primerRows.map(function(primers, i) {
									return React.createElement(PrimerRow, {
										key: "primer-linear-row-".concat(primers[0].id, "-").concat(props.firstBase, "-").concat(props.lastBase),
										bpsPerBlock: props.bpsPerBlock,
										direction: props.direction,
										findXAndWidth: props.findXAndWidth,
										firstBase: props.firstBase,
										fullSeq: props.fullSeq,
										height: props.elementHeight,
										inputRef: props.inputRef,
										lastBase: props.lastBase,
										primers,
										seqBlockRef: props.seqBlockRef,
										width: props.width,
										y: props.yDiff + props.elementHeight * i
									});
								}));
							};
							exports$20["default"] = PrimeRows;
							/**
							* A single row of annotations. Multiple of these may be in one seqBlock
							* vertically stacked on top of one another in non-overlapping arrays.
							*/
							var PrimerRow = function(props) {
								return React.createElement("g", {
									className: "la-vz-linear-primer-row",
									height: props.height * .8,
									transform: "translate(0, ".concat(props.y, ")"),
									width: props.width
								}, props.primers.filter(function(a) {
									return a.direction == props.direction;
								}).map(function(a, i) {
									return React.createElement(SingleNamedElement, __assign({}, props, {
										key: "primer-linear-".concat(a.id, "-").concat(i, "-").concat(props.firstBase, "-").concat(props.lastBase),
										element: a,
										elements: props.primers,
										index: i
									}));
								}));
							};
							/**
							* SingleNamedElement is a single rectangular element in the SeqBlock.
							* It does a bunch of stuff to avoid edge-cases from wrapping around the 0-index, edge of blocks, etc.
							*/
							var SingleNamedElement = function(props) {
								var element = props.element, elements = props.elements, findXAndWidth = props.findXAndWidth, firstBase = props.firstBase, index = props.index, inputRef = props.inputRef, lastBase = props.lastBase;
								var color = element.color, direction = element.direction, end = element.end, name = element.name, start = element.start;
								var forward = direction === 1;
								var reverse = direction === -1;
								var _a = findXAndWidth(index, element, elements), overflowLeft = _a.overflowLeft, overflowRight = _a.overflowRight, width = _a.width, origX = _a.x;
								var crossZero = start > end && end < firstBase;
								var endFWD = forward && end > firstBase && end <= lastBase;
								var endREV = reverse && start >= firstBase && start <= lastBase;
								var height = props.height * .7;
								var cW = 4;
								var cH = height / 4;
								var aH = 3;
								var _b = [origX, width], x = _b[0], w = _b[1];
								var topLeft = "M 0 0";
								var topRight = endFWD ? "\n      L ".concat(width - Math.min(8 * cW, w), " 0\n      L ").concat(width - Math.min(8 * cW, w), " ").concat(-aH, "\n    ") : "L ".concat(width, " 0");
								var linePath = "";
								var bottomRight = "L ".concat(width, " ").concat(height);
								if (overflowRight && width > 2 * cW || crossZero) bottomRight = "\n        L ".concat(width - cW, " ").concat(cH, "\n        L ").concat(width, " ").concat(2 * cH, "\n        L ").concat(width - cW, " ").concat(3 * cH, "\n        L ").concat(width, " ").concat(4 * cH);
								else if (endFWD) bottomRight = "\n        L ".concat(width, " ").concat(height);
								var bottomLeft = "L 0 ".concat(height, " L 0 0");
								if (overflowLeft && width > 2 * cW) bottomLeft = "\n        L 0 ".concat(height, "\n        L ").concat(cW, " ").concat(3 * cH, "\n        L 0 ").concat(2 * cH, "\n        L ").concat(cW, " ").concat(cH, "\n        L 0 0");
								else if (endREV) bottomLeft = "\n        L ".concat(Math.min(8 * cW, w), " ").concat(height, "\n        L ").concat(Math.min(8 * cW, w), " ").concat(height + aH);
								linePath = "".concat(topLeft, " ").concat(topRight, " ").concat(bottomRight, " ").concat(bottomLeft);
								if (forward && overflowRight || forward && crossZero) {
									if (width > 15) linePath += "\n        M ".concat(width - 3 * cW, " ").concat(cH, "\n        L ").concat(width - 2 * cW, " ").concat(2 * cH, "\n        L ").concat(width - 3 * cW, " ").concat(3 * cH, "\n        M ").concat(width - 4 * cW, " ").concat(cH, "\n        L ").concat(width - 3 * cW, " ").concat(2 * cH, "\n        L ").concat(width - 4 * cW, " ").concat(3 * cH);
								}
								if (reverse && overflowLeft || reverse && crossZero) {
									if (width > 15) linePath += "\n        M ".concat(3 * cW, " ").concat(3 * cH, "\n        L ").concat(2 * cW, " ").concat(cH * 2, "\n        L ").concat(3 * cW, " ").concat(cH, "\n        M ").concat(4 * cW, " ").concat(3 * cH, "\n        L ").concat(3 * cW, " ").concat(cH * 2, "\n        L ").concat(4 * cW, " ").concat(cH);
								}
								var fontSize = 12;
								var annotationCharacterWidth = .591 * fontSize;
								var availableCharacters = Math.floor((width - 40) / annotationCharacterWidth);
								var displayName = name;
								if (name.length > availableCharacters) {
									var charactersToShow = availableCharacters - 1;
									if (charactersToShow < 3) displayName = "";
									else displayName = "".concat(name.slice(0, charactersToShow), "…");
								}
								return React.createElement("g", {
									id: element.id,
									transform: "translate(".concat(x, ", ").concat(.1 * height, ")")
								}, React.createElement("title", null, name), React.createElement("path", {
									ref: inputRef(element.id, {
										end,
										name: element.name,
										ref: element.id,
										start,
										type: "PRIMER",
										viewer: "LINEAR"
									}),
									className: "".concat(element.id, " la-vz-primer"),
									cursor: "pointer",
									d: linePath,
									fill: color,
									id: element.id,
									stroke: color ? colors_1.COLOR_BORDER_MAP[color] || (0, colors_1.darkerColor)(color) : "gray",
									style: style_1.annotation,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverOtherPrimerRows(element.id, .7);
									},
									onMouseOver: function() {
										return hoverOtherPrimerRows(element.id, 1);
									}
								}), React.createElement("text", {
									className: "la-vz-primer-label",
									cursor: "pointer",
									dominantBaseline: "middle",
									fontSize,
									id: element.id,
									style: style_1.annotationLabel,
									textAnchor: "middle",
									x: width / 2,
									y: height / 2 + 1,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverOtherPrimerRows(element.id, .7);
									},
									onMouseOver: function() {
										return hoverOtherPrimerRows(element.id, 1);
									}
								}, displayName));
							};
						}),
						(function(__unused_webpack_module, exports$21, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$21, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var selectionContext_1 = __webpack_require__(24);
							var sequence_1 = __webpack_require__(11);
							var style_1 = __webpack_require__(13);
							/**
							* Edges on the side of selections of the Selection Viewer
							*
							* Only shown at the selection's start and end, not intermediate blocks (if there are intermediate blocks)
							*/
							var Edges = function(_super) {
								__extends(Edges, _super);
								function Edges() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									_this.id = (0, sequence_1.randomID)();
									return _this;
								}
								Edges.prototype.render = function() {
									var _a;
									var _b = this.props, findXAndWidth = _b.findXAndWidth, firstBase = _b.firstBase, fullSeq = _b.fullSeq, lastBase = _b.lastBase, selectEdgeHeight = _b.selectEdgeHeight;
									var _c = this.context, clockwise = _c.clockwise, end = _c.end, ref = _c.ref, start = _c.start;
									if (typeof start === "undefined" || typeof end === "undefined") return;
									var startEdge = null;
									var lastEdge = null;
									if (clockwise) {
										if (start >= firstBase && start < lastBase) startEdge = start;
										if (end > firstBase && end <= lastBase) lastEdge = end;
									} else {
										if (start > firstBase && start <= lastBase) startEdge = start;
										if (end >= firstBase && end < lastBase) lastEdge = end;
									}
									if (ref === "ALL" || start === 0 && end === fullSeq.length - 1) {
										startEdge = null;
										lastEdge = null;
									}
									if (startEdge === null && lastEdge === null) return null;
									if (startEdge === null) {
										startEdge = lastEdge;
										lastEdge = null;
									}
									var _d = findXAndWidth(startEdge, lastEdge), width = _d.width, x = _d.x;
									if (clockwise === false && startEdge !== null && lastEdge !== null) _a = findXAndWidth(lastEdge, startEdge), width = _a.width, x = _a.x;
									var secondEdgeX = x + width;
									if (startEdge !== null && lastEdge !== null) {
										if (start > end && clockwise === true || end > start && clockwise === false) secondEdgeX = x - width;
									}
									if (start === end && start === lastBase) return null;
									if (startEdge === null && lastEdge === null) return null;
									if (startEdge == lastEdge) lastEdge = null;
									return React.createElement("g", null, startEdge !== null && React.createElement("rect", {
										className: "la-vz-selection-edge",
										"data-testid": "la-vz-selection-edge",
										height: selectEdgeHeight,
										shapeRendering: "crispEdges",
										strokeWidth: 0,
										style: style_1.selectionEdge,
										width: 1,
										x,
										y: -5
									}), lastEdge !== null && React.createElement("rect", {
										className: "la-vz-selection-edge",
										"data-testid": "la-vz-selection-edge",
										height: selectEdgeHeight,
										shapeRendering: "crispEdges",
										strokeWidth: 0,
										style: style_1.selectionEdge,
										width: 1,
										x: secondEdgeX,
										y: -5
									}));
								};
								Edges.contextType = selectionContext_1.default;
								return Edges;
							}(React.PureComponent);
							exports$21["default"] = {
								Block: function(_super) {
									__extends(Block, _super);
									function Block() {
										var _this = _super !== null && _super.apply(this, arguments) || this;
										_this.id = (0, sequence_1.randomID)();
										return _this;
									}
									Block.prototype.render = function() {
										var _a, _b, _c, _d, _e, _f, _g;
										var _h = this.props, findXAndWidth = _h.findXAndWidth, firstBase = _h.firstBase, fullSeq = _h.fullSeq, lastBase = _h.lastBase, selectHeight = _h.selectHeight;
										var _j = this.context, clockwise = _j.clockwise, ref = _j.ref;
										var _k = this.context, end = _k.end, start = _k.start;
										if (typeof start === "undefined" || typeof end === "undefined") return;
										if (start === end && ref !== "ALL") return null;
										if (ref === "ALL" || start === 0 && end === fullSeq.length) {
											start = 0;
											end = 0;
										}
										var blockProps = {
											"data-testid": "la-vz-selection-block",
											height: selectHeight,
											style: style_1.selection,
											y: -5
										};
										var x = null;
										var width = null;
										var secondBlock = null;
										if (clockwise && end > start) {
											if (start <= lastBase && end > firstBase) _a = findXAndWidth(Math.max(firstBase, start), Math.min(lastBase, end)), width = _a.width, x = _a.x;
										} else if (clockwise && start > end) {
											if (!(start > lastBase && end < firstBase)) {
												if (start < lastBase && end > firstBase) {
													var _l = findXAndWidth(start, lastBase), secBlockWidth = _l.width, secBlockX = _l.x;
													secondBlock = React.createElement("rect", __assign({}, blockProps, {
														width: secBlockWidth,
														x: secBlockX
													}));
													_b = findXAndWidth(firstBase, end), width = _b.width, x = _b.x;
												} else _c = findXAndWidth(start > lastBase ? firstBase : Math.max(firstBase, start), end < firstBase ? lastBase : Math.min(lastBase, end)), width = _c.width, x = _c.x;
											}
										} else if (!clockwise && start > end) {
											if (end <= lastBase && start >= firstBase) _d = findXAndWidth(Math.max(firstBase, end), Math.min(lastBase, start)), width = _d.width, x = _d.x;
										} else if (!clockwise && end > start) {
											if (start > firstBase || end < lastBase) {
												if (start > firstBase && start < lastBase && end > firstBase) {
													var _m = findXAndWidth(end, lastBase), secBlockWidth = _m.width, secBlockX = _m.x;
													secondBlock = React.createElement("rect", __assign({}, blockProps, {
														width: secBlockWidth,
														x: secBlockX
													}));
													_e = findXAndWidth(firstBase, start), width = _e.width, x = _e.x;
												} else _f = findXAndWidth(start < firstBase ? end : firstBase, end > lastBase ? start : lastBase), width = _f.width, x = _f.x;
											}
										}
										if (ref === "ALL" || start === end) _g = findXAndWidth(Math.max(firstBase, 0), Math.min(lastBase, fullSeq.length + 1)), width = _g.width, x = _g.x;
										if (!x && !width) return null;
										return React.createElement(React.Fragment, null, React.createElement("rect", __assign({}, blockProps, {
											width: width ? width + 1 : void 0,
											x: x || void 0
										})), secondBlock);
									};
									Block.contextType = selectionContext_1.default;
									return Block;
								}(React.PureComponent),
								Edges
							};
						}),
						((__unused_webpack_module, exports$22, __webpack_require__) => {
							Object.defineProperty(exports$22, "__esModule", { value: true });
							exports$22.defaultSelection = void 0;
							var React = __webpack_require__(2);
							/** Initial/default selection */
							exports$22.defaultSelection = {
								clockwise: true,
								end: 0,
								length: 0,
								name: "",
								ref: null,
								start: 0,
								type: ""
							};
							/** Default context object */
							var SelectionContext = React.createContext(exports$22.defaultSelection);
							SelectionContext.displayName = "SelectionContext";
							exports$22["default"] = SelectionContext;
						}),
						(function(__unused_webpack_module, exports$23, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$23, "__esModule", { value: true });
							exports$23.TranslationRows = void 0;
							var React = __webpack_require__(2);
							var colors_1 = __webpack_require__(16);
							var sequence_1 = __webpack_require__(11);
							var style_1 = __webpack_require__(13);
							var hoverOtherTranshlationHandleRows = function(className, opacity) {
								if (!document) return;
								var elements = document.getElementsByClassName(className);
								for (var i = 0; i < elements.length; i += 1) elements[i].style.fillOpacity = "".concat(opacity);
							};
							/** Rows of translations */
							var TranslationRows = function(_a) {
								var bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, elementHeight = _a.elementHeight, findXAndWidth = _a.findXAndWidth, findXAndWidthElement = _a.findXAndWidthElement, firstBase = _a.firstBase, fullSeq = _a.fullSeq, inputRef = _a.inputRef, lastBase = _a.lastBase, onUnmount = _a.onUnmount, seqType = _a.seqType, translationRows = _a.translationRows, yDiff = _a.yDiff;
								return React.createElement("g", {
									className: "la-vz-linear-translation",
									"data-testid": "la-vz-linear-translation"
								}, translationRows.map(function(translations, i) {
									var currentElementY = yDiff;
									for (var j = 0; j < i; j += 1) {
										var multiplier = translationRows[j][0]["name"] ? 2 : 1;
										currentElementY += elementHeight * multiplier;
									}
									return React.createElement(TranslationRow, {
										key: "i-".concat(firstBase),
										bpsPerBlock,
										charWidth,
										elementHeight,
										findXAndWidth,
										findXAndWidthElement,
										firstBase,
										fullSeq,
										height: elementHeight,
										inputRef,
										lastBase,
										seqType,
										translations,
										y: currentElementY,
										onUnmount
									});
								}));
							};
							exports$23.TranslationRows = TranslationRows;
							/**
							* A single row of translations. Multiple of these may be in one seqBlock
							* vertically stacked on top of one another in non-overlapping arrays.
							*/
							var TranslationRow = function(props) {
								return React.createElement(React.Fragment, null, props.translations.map(function(t, i) {
									return React.createElement(React.Fragment, { key: "translation-linear-".concat(t.id, "-").concat(i, "-").concat(props.firstBase, "-").concat(props.lastBase) }, React.createElement(SingleNamedElementAminoacids, __assign({}, props, { translation: t })), t.name && React.createElement(SingleNamedElementHandle, __assign({}, props, {
										element: t,
										elements: props.translations,
										index: i
									})));
								}));
							};
							/**
							* A single row for translations of DNA into Amino Acid sequences so a user can
							* see the resulting protein or peptide sequence in the viewer
							*/
							var SingleNamedElementAminoacids = function(_super) {
								__extends(SingleNamedElementAminoacids, _super);
								function SingleNamedElementAminoacids() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									_this.AAs = [];
									_this.componentWillUnmount = function() {
										var onUnmount = _this.props.onUnmount;
										_this.AAs.forEach(function(a) {
											return onUnmount(a);
										});
									};
									/**
									* make the actual path string
									*/
									_this.genPath = function(count, multiplier) {
										var _a = _this.props, charWidth = _a.charWidth, h = _a.height;
										var nW = count * charWidth;
										var wA = multiplier * 3;
										return "M 0 0\n			L ".concat(nW, " 0\n			L ").concat(nW + wA, " ").concat(h / 2, "\n			L ").concat(nW, " ").concat(h, "\n			L 0 ").concat(h, "\n			L ").concat(wA, " ").concat(h / 2, "\n			Z");
									};
									return _this;
								}
								SingleNamedElementAminoacids.prototype.render = function() {
									var _this = this;
									var _a = this.props, bpsPerBlock = _a.bpsPerBlock, charWidth = _a.charWidth, findXAndWidth = _a.findXAndWidth, firstBase = _a.firstBase, fullSeq = _a.fullSeq, h = _a.height, inputRef = _a.inputRef, lastBase = _a.lastBase, seqType = _a.seqType, translation = _a.translation, y = _a.y;
									var AAseq = translation.AAseq, direction = translation.direction, end = translation.end, id = translation.id, start = translation.start;
									var bpPerBlockCount = seqType === "aa" ? 1 : 3;
									var AAs = AAseq.split("");
									return React.createElement("g", {
										ref: inputRef(id, {
											end,
											name: "translation",
											parent: __assign(__assign({}, translation), { type: "TRANSLATION" }),
											start,
											type: "AMINOACID",
											viewer: "LINEAR"
										}),
										className: "la-vz-linear-aa-translation",
										"data-testid": "la-vz-linear-aa-translation",
										id,
										transform: "translate(0, ".concat(y, ")")
									}, AAs.map(function(a, i) {
										var aaId = (0, sequence_1.randomID)();
										_this.AAs.push(aaId);
										var AAStart = (start + i * bpPerBlockCount) % fullSeq.length;
										var AAEnd = start + i * bpPerBlockCount + bpPerBlockCount;
										if (AAStart > AAEnd && firstBase >= bpsPerBlock) AAEnd += fullSeq.length;
										else if (AAStart > AAEnd && firstBase < bpsPerBlock) AAStart -= fullSeq.length;
										else if (AAStart === 0 && firstBase >= bpsPerBlock) {
											AAStart += fullSeq.length;
											AAEnd += fullSeq.length;
										}
										if (AAStart >= lastBase || AAEnd <= firstBase) return null;
										var showAminoAcidLabel = true;
										var bpCount = bpPerBlockCount;
										if (AAStart < firstBase) {
											bpCount = Math.min(bpPerBlockCount, AAEnd - firstBase);
											if (bpCount < 2 && seqType !== "aa") showAminoAcidLabel = false;
										} else if (AAEnd > lastBase) {
											bpCount = Math.min(bpPerBlockCount, lastBase - AAStart);
											if (bpCount < 2 && seqType !== "aa") showAminoAcidLabel = false;
										}
										var x = findXAndWidth(Math.max(AAStart, firstBase)).x;
										var path = _this.genPath(bpCount, direction === 1 ? 1 : -1);
										return React.createElement("g", {
											key: aaId,
											ref: inputRef(aaId, {
												end: AAEnd,
												parent: __assign(__assign({}, translation), { type: "TRANSLATION" }),
												start: AAStart,
												type: "AMINOACID",
												viewer: "LINEAR"
											}),
											id: aaId,
											transform: "translate(".concat(x, ", 0)")
										}, React.createElement("path", {
											d: path,
											fill: (0, colors_1.colorByIndex)(a.charCodeAt(0)),
											id: aaId,
											shapeRendering: "geometricPrecision",
											stroke: (0, colors_1.borderColorByIndex)(a.charCodeAt(0)),
											style: {
												cursor: "pointer",
												opacity: .7,
												strokeWidth: .8
											}
										}), showAminoAcidLabel && React.createElement("text", {
											className: "la-vz-translation-amino-acid-label",
											cursor: "pointer",
											"data-testid": "la-vz-translation",
											dominantBaseline: "middle",
											id: aaId,
											style: style_1.translationAminoAcidLabel,
											textAnchor: "middle",
											x: bpCount * .5 * charWidth,
											y: "".concat(h / 2 + 1)
										}, a));
									}));
								};
								return SingleNamedElementAminoacids;
							}(React.PureComponent);
							/**
							* SingleNamedElement is a single rectangular element in the SeqBlock.
							* It does a bunch of stuff to avoid edge-cases from wrapping around the 0-index, edge of blocks, etc.
							*/
							var SingleNamedElementHandle = function(props) {
								var element = props.element, elementHeight = props.elementHeight, elements = props.elements, findXAndWidthElement = props.findXAndWidthElement, index = props.index, inputRef = props.inputRef, y = props.y;
								var color = element.color, end = element.end, name = element.name, start = element.start;
								var _a = findXAndWidthElement(index, element, elements), width = _a.width, origX = _a.x;
								var fontSize = 9;
								var characterWidth = .591 * fontSize;
								var availableCharacters = Math.floor(width / 4 / characterWidth);
								var displayName = name !== null && name !== void 0 ? name : "";
								if (name && name.length > availableCharacters) {
									var charactersToShow = availableCharacters - 1;
									if (charactersToShow < 3) displayName = "";
									else displayName = "".concat(name.slice(0, charactersToShow), "…");
								}
								var nameHandleLeftMargin = 10;
								var nameHandleWidth = displayName.length * characterWidth + nameHandleLeftMargin * 2;
								var x = origX;
								var w = width;
								var height = props.height;
								var marginBottom = 2;
								var marginTop = 2;
								var linePath = "";
								linePath += "M 0 ".concat(marginTop, " \n              L ").concat(nameHandleWidth, " ").concat(marginTop, "\n              L ").concat(nameHandleWidth, " ").concat(height / 4 - marginBottom / 2 + marginTop / 2, "\n              L ").concat(w, " ").concat(height / 4 - marginBottom / 2 + marginTop / 2, " \n              L ").concat(w, " ").concat(3 * height / 4 - marginBottom / 2 + marginTop / 2, " \n              L ").concat(nameHandleWidth, " ").concat(3 * height / 4 - marginBottom / 2 + marginTop / 2, "  \n              L ").concat(nameHandleWidth, " ").concat(height - marginBottom, " \n              L 0 ").concat(height - marginBottom, "\n              Z");
								return React.createElement("g", {
									ref: inputRef(element.id, {
										end,
										name,
										start,
										type: "TRANSLATION_HANDLE",
										viewer: "LINEAR"
									}),
									id: element.id,
									transform: "translate(0, ".concat(y + elementHeight, ")")
								}, React.createElement("g", {
									id: element.id,
									transform: "translate(".concat(x, ", 0)")
								}, React.createElement("title", null, name), React.createElement("path", {
									className: "".concat(element.id, " la-vz-translation-handle"),
									cursor: "pointer",
									d: linePath,
									fill: color,
									id: element.id,
									stroke: color,
									style: style_1.translationHandle,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverOtherTranshlationHandleRows(element.id, .7);
									},
									onMouseOver: function() {
										return hoverOtherTranshlationHandleRows(element.id, 1);
									}
								}), React.createElement("text", {
									className: "la-vz-handle-label",
									cursor: "pointer",
									dominantBaseline: "middle",
									fontSize,
									id: element.id,
									style: style_1.translationHandleLabel,
									textAnchor: "start",
									x: nameHandleLeftMargin,
									y: height / 2 + 1,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverOtherTranshlationHandleRows(element.id, .7);
									},
									onMouseOver: function() {
										return hoverOtherTranshlationHandleRows(element.id, 1);
									}
								}, displayName)));
							};
						}),
						(function(__unused_webpack_module, exports$24, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$24, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var selectionContext_1 = __webpack_require__(24);
							exports$24["default"] = function(_super) {
								__extends(SelectionHandler, _super);
								function SelectionHandler() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									/** Only state is the selection range */
									_this.state = __assign({}, selectionContext_1.defaultSelection);
									_this.previousBase = null;
									_this.forward = null;
									_this.fullSelectionLength = 0;
									_this.dragEvent = false;
									_this.selectionStarted = false;
									_this.shiftSelection = false;
									_this.lastClick = Date.now();
									/** a map between the id of child elements and their associated SelectRanges */
									_this.idToRange = /* @__PURE__ */ new Map();
									_this.componentDidMount = function() {
										if (!document) return;
										document.addEventListener("mouseup", _this.stopDrag);
									};
									_this.componentWillUnmount = function() {
										if (!document) return;
										document.removeEventListener("mouseup", _this.stopDrag);
									};
									/** Stop the current drag event from happening */
									_this.stopDrag = function() {
										_this.dragEvent = false;
									};
									/**
									* Called at start of drag to make sure checkers are reset to default state
									*/
									_this.resetCircleDragVars = function(start) {
										_this.previousBase = start;
										_this.forward = null;
										_this.fullSelectionLength = 0;
										_this.dragEvent = true;
									};
									/**
									* a ref callback for mapping the id of child to its SelectRange
									* it stores the id of all elements
									**/
									_this.inputRef = function(ref, selectRange) {
										var _a;
										if (selectRange.viewer === "LINEAR" && ((_a = _this.idToRange.get(ref)) === null || _a === void 0 ? void 0 : _a.viewer) === "CIRCULAR") return;
										_this.idToRange.set(ref, __assign({ ref }, selectRange));
									};
									/**
									* remove the ref by ID.
									*/
									_this.removeMountedBlock = function(ref) {
										_this.idToRange.delete(ref);
									};
									/**
									* the selected child element is something that is known by reference.
									* update its SeqBlock's range (or any others affected) with the newly
									* active range
									*/
									_this.mouseEvent = function(e) {
										var setCentralIndex = _this.props.setCentralIndex;
										if ((e.type === "mousemove" || e.type === "mouseup") && !_this.dragEvent) return;
										var msSinceLastClick = Date.now() - _this.lastClick;
										var knownRange = _this.dragEvent ? _this.idToRange.get(e.currentTarget.id) : _this.idToRange.get(e.target.id) || _this.idToRange.get(e.currentTarget.id);
										if (!knownRange) return;
										knownRange = __assign(__assign({}, knownRange), {
											end: knownRange.end || 0,
											start: knownRange.start || 0
										});
										var direction = knownRange.direction, end = knownRange.end, start = knownRange.start, viewer = knownRange.viewer;
										switch (knownRange.type) {
											case "ANNOTATION":
											case "FIND":
											case "TRANSLATION":
											case "TRANSLATION_HANDLE":
											case "ENZYME":
											case "PRIMER":
											case "HIGHLIGHT":
												if (viewer !== "LINEAR" && setCentralIndex) setCentralIndex("LINEAR", start || 0);
												var clockwise = direction ? direction === 1 : true;
												var selectionStart = clockwise ? start : end;
												var selectionEnd = clockwise ? end : start;
												_this.setSelection(__assign(__assign({}, knownRange), {
													clockwise,
													end: selectionEnd,
													start: selectionStart
												}));
												_this.dragEvent = false;
												_this.lastClick = Date.now();
												break;
											case "AMINOACID":
												var clockwise = direction ? direction === 1 : true;
												var selectionStart = clockwise ? start : end;
												var selectionEnd = clockwise ? end : start;
												if (msSinceLastClick < 300 && knownRange.parent) {
													knownRange = __assign(__assign({}, knownRange.parent), {
														end: knownRange.parent.end || 0,
														start: knownRange.parent.start || 0
													});
													selectionStart = clockwise ? knownRange.start : knownRange.end;
													selectionEnd = clockwise ? knownRange.end : knownRange.start;
												}
												_this.setSelection(__assign(__assign({}, knownRange), {
													clockwise,
													end: selectionEnd,
													start: selectionStart
												}));
												_this.dragEvent = false;
												_this.lastClick = Date.now();
												e.stopPropagation();
												break;
											case "SEQ": if (viewer === "LINEAR") _this.handleLinearSeqEvent(e, __assign(__assign({}, knownRange), {
												end: knownRange.end || 0,
												start: knownRange.start || 0
											}));
											else if (viewer === "CIRCULAR") _this.handleCircularSeqEvent(e);
										}
									};
									/**
									* Handle a sequence selection on a linear viewer
									*/
									_this.handleLinearSeqEvent = function(e, knownRange) {
										var selection = _this.context;
										var currBase = _this.calculateBaseLinear(e, knownRange);
										var clockwiseDrag = selection.start !== null && currBase >= (selection.start || 0);
										if (e.type === "mousedown" && currBase !== null) {
											_this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), {
												clockwise: clockwiseDrag,
												end: currBase,
												start: e.shiftKey ? selection.start : currBase
											}));
											_this.dragEvent = true;
										} else if (_this.dragEvent && currBase !== null) _this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), {
											clockwise: clockwiseDrag,
											end: currBase,
											start: selection.start
										}));
									};
									/**
									* Handle a sequence selection event on the circular viewer
									*/
									_this.handleCircularSeqEvent = function(e) {
										var _a = _this.props, seq = _a.seq, setCentralIndex = _a.setCentralIndex;
										var selection = _this.context;
										var start = selection.start;
										var clockwise = selection.clockwise, end = selection.end;
										var currBase = _this.calculateBaseCircular(e);
										var seqLength = seq.length;
										if (e.type === "mousedown") {
											var selStart = e.shiftKey ? start || 0 : currBase;
											_this.selectionStarted = (e.shiftKey ? _this.calcSelectionLength(selStart, currBase, false) : _this.calcSelectionLength(selStart, currBase, true)) > 0;
											_this.resetCircleDragVars(selStart);
											setCentralIndex === null || setCentralIndex === void 0 || setCentralIndex("LINEAR", selStart);
											_this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), {
												clockwise,
												end: currBase,
												ref: "",
												start: selStart,
												type: "SEQ"
											}));
										} else if (e.type === "mousemove" && _this.dragEvent && currBase && _this.previousBase && currBase !== _this.previousBase) {
											var increased = currBase > _this.previousBase;
											var changeThreshold = seqLength * .9;
											var change = Math.abs(_this.previousBase - currBase);
											var crossedZero = change > changeThreshold;
											_this.forward = increased ? !crossedZero : crossedZero;
											var lengthChange = crossedZero ? seqLength - change : change;
											var sameDirectionMove = _this.forward === selection.clockwise || selection.clockwise === null;
											if (sameDirectionMove) _this.fullSelectionLength += lengthChange;
											else _this.fullSelectionLength -= lengthChange;
											_this.previousBase = currBase;
											if (_this.fullSelectionLength < seqLength * .01 && !_this.shiftSelection) {
												clockwise = _this.forward;
												var check_1 = _this.calcSelectionLength(selection.start || 0, currBase, _this.forward);
												if (_this.fullSelectionLength < 0) _this.fullSelectionLength = check_1;
												if (check_1 > _this.fullSelectionLength) clockwise = !_this.forward;
												end = currBase;
											}
											sameDirectionMove = _this.forward === selection.clockwise;
											var check = _this.calcSelectionLength(selection.start || 0, currBase, selection.clockwise || true);
											if (_this.selectionStarted && _this.shiftSelection && check > _this.fullSelectionLength) _this.fullSelectionLength = check;
											var sameDirectionDrag = _this.dragEvent && sameDirectionMove;
											var fullSelection = false;
											var hitFullSelection = !fullSelection && _this.fullSelectionLength >= seqLength;
											if (sameDirectionDrag && hitFullSelection) end = start;
											else if (fullSelection) {
												_this.fullSelectionLength = seqLength + _this.fullSelectionLength % seqLength;
												if (!sameDirectionDrag && check === _this.fullSelectionLength - seqLength && check > seqLength * .9) {
													end = currBase;
													_this.fullSelectionLength = _this.fullSelectionLength - seqLength;
												}
											} else end = currBase;
											_this.shiftSelection = false;
											_this.setSelection(__assign(__assign({}, selectionContext_1.defaultSelection), {
												clockwise,
												end,
												start,
												type: "SEQ"
											}));
										}
									};
									/**
									* in a linear sequence viewer, given the bounding box of a component, the basepairs
									* by SeqBlock and the position of the mouse event, find the current base
									*/
									_this.calculateBaseLinear = function(e, knownRange) {
										var bpsPerBlock = _this.props.bpsPerBlock;
										var block = e.currentTarget.getBoundingClientRect();
										var ratioFromLeft = (e.clientX - block.left) / block.width;
										var bpsFromLeft = Math.round(ratioFromLeft * bpsPerBlock);
										return Math.min(knownRange.start + bpsFromLeft, knownRange.end);
									};
									/**
									* in a circular plasmid viewer, given the center of the viewer, and position of the
									* mouse event, find the currently hovered or clicked basepair
									*/
									_this.calculateBaseCircular = function(e) {
										var _a = _this.props, center = _a.center, centralIndex = _a.centralIndex, seq = _a.seq, yDiff = _a.yDiff;
										if (!center) return 0;
										var block = e.currentTarget.getBoundingClientRect();
										var distFromLeft = e.clientX - block.left;
										var distFromTop = e.clientY - block.top;
										var x = distFromLeft - center.x;
										var riseToRun = (distFromTop - (center.y + yDiff)) / x;
										var posInDeg = Math.atan(riseToRun) * (180 / Math.PI) + 90;
										if (x < 0) posInDeg += 180;
										var posInPerc = posInDeg / 360;
										var currBase = Math.round(seq.length * posInPerc);
										currBase += centralIndex;
										if (currBase > seq.length) currBase -= seq.length;
										return currBase;
									};
									/**
									* Update the selection in state. Only update the specified
									* properties of the selection that should be updated.
									*/
									_this.setSelection = function(newSelection) {
										var selection = _this.context;
										var setSelection = _this.props.setSelection;
										if (newSelection.start === selection.start && newSelection.end === selection.end && newSelection.ref === selection.ref && [
											"SEQ",
											"AMINOACID",
											""
										].includes(newSelection.type || "")) return;
										var _a = __assign(__assign({}, selection), newSelection), clockwise = _a.clockwise, end = _a.end, name = _a.name, ref = _a.ref, start = _a.start, type = _a.type;
										setSelection({
											clockwise,
											end,
											length: _this.calcSelectionLength(start, end, clockwise),
											name,
											ref,
											start,
											type
										});
									};
									/**
									* Check what the length of the selection is in circle drag select
									*/
									_this.calcSelectionLength = function(start, base, clock) {
										var seq = _this.props.seq;
										if (base < start && !clock) return start - base;
										if (base > start && !clock) return start + (seq.length - base);
										if (base > start && clock) return base - start;
										if (base < start && clock) return seq.length - start + base;
										return 0;
									};
									return _this;
								}
								SelectionHandler.prototype.render = function() {
									return this.props.children(this.inputRef, this.mouseEvent, this.removeMountedBlock);
								};
								SelectionHandler.displayName = "WithSelectionHandler";
								SelectionHandler.contextType = selectionContext_1.default;
								return SelectionHandler;
							}(React.PureComponent);
						}),
						(function(__unused_webpack_module, exports$25, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							Object.defineProperty(exports$25, "__esModule", { value: true });
							exports$25.Annotations = void 0;
							var React = __webpack_require__(2);
							var centralIndexContext_1 = __webpack_require__(6);
							var colors_1 = __webpack_require__(16);
							var style_1 = __webpack_require__(13);
							exports$25.Annotations = function(_super) {
								__extends(Annotations, _super);
								function Annotations() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									/** during an annotation hover event, darken all other pieces of the same annotation */
									_this.hoverAnnotation = function(className, opacity) {
										if (!document) return;
										var elements = document.getElementsByClassName(className);
										for (var i = 0; i < elements.length; i += 1) elements[i].style.fillOpacity = opacity;
									};
									return _this;
								}
								Annotations.prototype.render = function() {
									var _this = this;
									var _a = this.props, annotations = _a.annotations, lineHeight = _a.lineHeight, radius = _a.radius;
									var rowShiftHeight = lineHeight * _a.rowsToSkip;
									var currBRadius = radius - (lineHeight * 2 + 3) - rowShiftHeight;
									var currTRadius = currBRadius - lineHeight;
									return React.createElement(centralIndexContext_1.default.Consumer, null, function(_a) {
										var circular = _a.circular;
										return React.createElement("g", { className: "la-vz-circular-annotations" }, annotations.reduce(function(acc, anns, i) {
											if (i) {
												currBRadius -= lineHeight + 3;
												currTRadius -= lineHeight + 3;
											}
											return acc.concat(anns.map(function(ann) {
												return React.createElement(SingleAnnotation, {
													key: "la-vz-".concat(ann.id, "-annotation-circular-row"),
													annotation: ann,
													calcBorderColor: colors_1.darkerColor,
													centralIndex: circular,
													currBRadius,
													currTRadius,
													genArc: _this.props.genArc,
													getRotation: _this.props.getRotation,
													hoverAnnotation: _this.hoverAnnotation,
													id: "la-vz-".concat(ann.id, "-annotation-circular-row"),
													inlinedAnnotations: _this.props.inlinedAnnotations,
													inputRef: _this.props.inputRef,
													lineHeight,
													seqLength: _this.props.seqLength
												});
											}));
										}, []));
									});
								};
								return Annotations;
							}(React.PureComponent);
							/**
							* SingleAnnotation renders a single annotation within the Circular Viewer
							*/
							var SingleAnnotation = function(props) {
								var a = props.annotation, calcBorderColor = props.calcBorderColor, centralIndex = props.centralIndex, currBRadius = props.currBRadius, currTRadius = props.currTRadius, genArc = props.genArc, getRotation = props.getRotation, hoverAnnotation = props.hoverAnnotation, inlinedAnnotations = props.inlinedAnnotations, inputRef = props.inputRef, lineHeight = props.lineHeight, seqLength = props.seqLength;
								var annLength = a.end >= a.start ? a.end - a.start : seqLength - a.start + a.end;
								annLength = annLength === 0 ? seqLength - .1 : annLength;
								var rotation = getRotation(a.start);
								if (currBRadius < 0 || currTRadius < 0) return null;
								var mid = (annLength / 2 + a.start + seqLength - centralIndex) % seqLength;
								var bottomHalf = mid > seqLength * .25 && mid < seqLength * .75;
								var path = genArc({
									arrowFWD: a.direction === 1,
									arrowREV: a.direction === -1,
									innerRadius: currBRadius,
									largeArc: annLength > seqLength / 2,
									length: annLength,
									outerRadius: currTRadius,
									sweepFWD: true
								});
								var namePath = genArc({
									arrowFWD: false,
									arrowREV: false,
									innerRadius: bottomHalf ? currBRadius : currTRadius,
									largeArc: annLength > seqLength / 2,
									length: annLength,
									outerRadius: bottomHalf ? currBRadius : currTRadius,
									sweepFWD: true
								});
								var circAnnID = "la-vz-".concat(a.id, "-circular");
								return React.createElement("g", {
									id: "la-vz-".concat(a.id, "-annotation-circular"),
									transform: rotation
								}, React.createElement("path", {
									d: namePath,
									fill: "transparent",
									id: circAnnID,
									stroke: "transparent"
								}), React.createElement("path", {
									ref: inputRef(a.id, {
										direction: a.direction,
										end: a.end,
										name: a.name,
										ref: a.id,
										start: a.start,
										type: "ANNOTATION",
										viewer: "CIRCULAR"
									}),
									className: "".concat(a.id, " la-vz-annotation"),
									cursor: "pointer",
									d: path,
									fill: a.color,
									id: a.id,
									stroke: a.color ? colors_1.COLOR_BORDER_MAP[a.color] || calcBorderColor(a.color) : "gray",
									style: style_1.annotation,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverAnnotation(a.id, "0.7");
									},
									onMouseOver: function() {
										return hoverAnnotation(a.id, "1.0");
									}
								}), inlinedAnnotations.includes(a.id) && React.createElement("text", {
									dy: -.4 * lineHeight,
									id: a.id,
									style: style_1.svgText,
									onBlur: function() {},
									onFocus: function() {},
									onMouseOut: function() {
										return hoverAnnotation(a.id, "0.7");
									},
									onMouseOver: function() {
										return hoverAnnotation(a.id, "1.0");
									}
								}, React.createElement("textPath", {
									className: "la-vz-annotation-label",
									cursor: "pointer",
									dominantBaseline: "middle",
									fontSize: 12,
									id: a.id,
									startOffset: bottomHalf ? "25%" : "75%",
									style: style_1.annotationLabel,
									textAnchor: "middle",
									xlinkHref: "#".concat(circAnnID)
								}, a.name)));
							};
						}),
						(function(__unused_webpack_module, exports$26, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$26, "__esModule", { value: true });
							exports$26.CutSites = void 0;
							var React = __webpack_require__(2);
							var style_1 = __webpack_require__(13);
							var Circular_1 = __webpack_require__(1);
							var CutSites = function(props) {
								var cutSites = props.cutSites;
								if (!cutSites.length) return null;
								var calculateLinePath = function(index, startRadius, endRadius) {
									var findCoor = props.findCoor;
									var lineStart = findCoor(index, startRadius);
									var lineEnd = findCoor(index, endRadius);
									return "M ".concat(lineEnd.x, " ").concat(lineEnd.y, " L ").concat(lineStart.x, " ").concat(lineStart.y);
								};
								return React.createElement("g", { className: "la-vz-circular-cutsites" }, cutSites.map(function(c) {
									return React.createElement(SingleCutSite, __assign({ key: "circular-cut-site-".concat(c.id) }, props, {
										calculateLinePath,
										cutSite: c
									}));
								}));
							};
							exports$26.CutSites = CutSites;
							var SingleCutSite = function(props) {
								var calculateLinePath = props.calculateLinePath, cutSite = props.cutSite, genArc = props.genArc, getRotation = props.getRotation, inputRef = props.inputRef, lineHeight = props.lineHeight, radius = props.radius, seqLength = props.seqLength;
								var id = cutSite.id, start = cutSite.start;
								var end = cutSite.end, fcut = cutSite.fcut, rcut = cutSite.rcut;
								if (start > end || start > fcut || start > rcut) {
									if (start > end) end += seqLength;
									if (start > fcut) fcut += seqLength;
									if (start > rcut) rcut += seqLength;
								}
								var cutSiteLength = Math.abs(end - start);
								var botR = radius;
								var midR = radius + .5 * lineHeight;
								var topR = radius + lineHeight;
								if (seqLength < Circular_1.RENDER_SEQ_LENGTH_CUTOFF) {
									midR += lineHeight + 1.5;
									topR += 2 * lineHeight + 1.5;
								}
								return React.createElement("g", {
									key: "la-vz-circular-cutsite-".concat(id),
									id: "la-vz-circular-cutsite-".concat(id),
									transform: getRotation(start)
								}, React.createElement("path", {
									ref: inputRef(id, {
										end,
										ref: id,
										start,
										type: "ENZYME",
										viewer: "CIRCULAR"
									}),
									className: "la-vz-cut-site",
									cursor: "pointer",
									d: genArc({
										innerRadius: botR,
										largeArc: cutSiteLength > seqLength / 2,
										length: cutSiteLength,
										outerRadius: topR,
										sweepFWD: true
									}),
									style: cutSite.enzyme.color ? __assign(__assign({}, style_1.cutSiteHighlight), { fill: cutSite.enzyme.color }) : style_1.cutSiteHighlight
								}), React.createElement("path", {
									className: "la-vz-cut-site",
									d: calculateLinePath(fcut - start, topR, midR),
									style: style_1.cutSite
								}), React.createElement("path", {
									className: "la-vz-cut-site",
									d: genArc({
										innerRadius: midR,
										largeArc: Math.abs(fcut - rcut) > seqLength / 2,
										length: Math.abs(fcut - rcut),
										offset: Math.min(fcut, rcut) - start,
										outerRadius: midR,
										sweepFWD: true
									}),
									style: style_1.cutSite
								}), React.createElement("path", {
									className: "la-vz-cut-site",
									d: calculateLinePath(rcut - start, midR, botR),
									style: style_1.cutSite
								}));
							};
						}),
						((__unused_webpack_module, exports$27, __webpack_require__) => {
							Object.defineProperty(exports$27, "__esModule", { value: true });
							exports$27.Find = void 0;
							var React = __webpack_require__(2);
							var style_1 = __webpack_require__(13);
							var Circular_1 = __webpack_require__(1);
							var Find = function(props) {
								var genArc = props.genArc, getRotation = props.getRotation, highlights = props.highlights, inputRef = props.inputRef, lineHeight = props.lineHeight, radius = props.radius, search = props.search, seqLength = props.seqLength;
								var threshold = seqLength > Circular_1.RENDER_SEQ_LENGTH_CUTOFF ? search.length / seqLength <= .02 : true;
								return React.createElement("g", { className: "la-vz-circular-search" }, threshold && search.map(function(s) {
									return React.createElement(Circular_1.Arc, {
										key: JSON.stringify(s),
										className: "la-vz-search",
										direction: s.direction || 1,
										end: s.end,
										genArc,
										getRotation,
										inputRef,
										lineHeight,
										radius,
										seqLength,
										start: s.start,
										style: style_1.search
									});
								}), highlights.map(function(_a) {
									var color = _a.color, end = _a.end, start = _a.start;
									return React.createElement(Circular_1.Arc, {
										key: "la-vz-highlight-".concat(start, "-").concat(end),
										className: "la-vz-search",
										color,
										direction: 1,
										end,
										genArc,
										getRotation,
										inputRef,
										lineHeight,
										radius,
										seqLength,
										start,
										style: style_1.search
									});
								}));
							};
							exports$27.Find = Find;
						}),
						(function(__unused_webpack_module, exports$28, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$28, "__esModule", { value: true });
							exports$28.Index = void 0;
							var React = __webpack_require__(2);
							var centralIndexContext_1 = __webpack_require__(6);
							var style_1 = __webpack_require__(13);
							var Circular_1 = __webpack_require__(1);
							exports$28.Index = function(_super) {
								__extends(Index, _super);
								function Index() {
									var _this = _super !== null && _super.apply(this, arguments) || this;
									_this.state = {
										indexInc: 10,
										ticks: []
									};
									/**
									* return a react element for the basepairs along the surface of the plasmid viewer
									*/
									_this.renderBasepairs = function() {
										var _b = _this.props, compSeq = _b.compSeq, findCoor = _b.findCoor, getRotation = _b.getRotation, lineHeight = _b.lineHeight, radius = _b.radius, seq = _b.seq, seqLength = _b.seqLength, showComplement = _b.showComplement;
										var indexInc = _this.state.indexInc;
										var centralIndex = _this.context.circular;
										var seqForCircular = seq + seq;
										var compSeqForCircular = compSeq + compSeq;
										var firstBase = centralIndex - indexInc * 5;
										var lastBase = centralIndex + indexInc * 5;
										if (centralIndex < seqLength / 2) {
											firstBase += seqLength;
											lastBase += seqLength;
										}
										var basepairsToRender = [];
										for (var i = firstBase; i <= lastBase; i += 1) {
											basepairsToRender.push(React.createElement("text", __assign({ key: "la-vz-base-".concat(i) }, findCoor(0, radius + 2 * lineHeight), {
												dominantBaseline: "middle",
												style: style_1.svgText,
												transform: getRotation(i)
											}), seqForCircular.charAt(i)));
											if (showComplement) basepairsToRender.push(React.createElement("text", __assign({ key: "la-vz-base-comp-".concat(i) }, findCoor(0, radius + lineHeight), {
												dominantBaseline: "middle",
												style: style_1.svgText,
												transform: getRotation(i)
											}), compSeqForCircular.charAt(i)));
										}
										return basepairsToRender;
									};
									return _this;
								}
								Index.prototype.render = function() {
									var _b = this.props, center = _b.center, findCoor = _b.findCoor, genArc = _b.genArc, getRotation = _b.getRotation, lineHeight = _b.lineHeight, name = _b.name, radius = _b.radius, seq = _b.seq, seqLength = _b.seqLength, showIndex = _b.showIndex, size = _b.size, totalRows = _b.totalRows, yDiff = _b.yDiff;
									var ticks = this.state.ticks;
									if (!showIndex) return null;
									var mostInwardElementRadius = radius - totalRows * lineHeight;
									var cutoff = 30;
									var nameSpans = [];
									var nameIndex = 0;
									while (nameIndex < name.length) {
										nameSpans.push(name.substring(nameIndex, nameIndex + cutoff).trim());
										nameIndex += cutoff;
									}
									var nameYAdjust = 14 + 20 * nameSpans.length;
									var nameCoor = (nameSpans.length ? nameSpans[0].length / 2 * 12 : 0) > mostInwardElementRadius ? {
										x: center.x,
										y: size.height - nameYAdjust - yDiff
									} : {
										x: center.x,
										y: center.y - (nameSpans.length - 1) / 2 * 25
									};
									var tickCoorStart = findCoor(0, radius);
									var tickCoorEnd = findCoor(0, radius - 7);
									var subtitleStyle = {
										fill: "gray",
										fontSize: 12,
										textAnchor: "middle"
									};
									var indexCurve = genArc({
										innerRadius: radius,
										largeArc: true,
										length: seqLength / 2,
										outerRadius: radius
									});
									return React.createElement("g", null, React.createElement("text", {
										fontSize: 20,
										fontWeight: 500,
										style: style_1.svgText,
										textAnchor: "middle"
									}, nameSpans.map(function(n, i) {
										return React.createElement("tspan", {
											key: n,
											x: nameCoor.x,
											y: nameCoor.y + i * 25
										}, n);
									})), React.createElement("text", __assign({
										x: nameCoor.x,
										y: nameCoor.y + 14 + 25 * (nameSpans.length - 1)
									}, subtitleStyle, { style: style_1.svgText }), "".concat(seqLength, " bp")), seq.length <= Circular_1.RENDER_SEQ_LENGTH_CUTOFF && React.createElement("g", { className: "la-vz-circular-bps" }, this.renderBasepairs()), ticks.map(function(t) {
										return React.createElement("g", {
											key: "la-vz-tick-".concat(t),
											transform: getRotation(t - .5)
										}, React.createElement("path", {
											className: "la-vz-index-tick",
											d: "M ".concat(tickCoorStart.x, " ").concat(tickCoorStart.y, " L ").concat(tickCoorEnd.x, " ").concat(tickCoorEnd.y),
											style: style_1.indexTick
										}), React.createElement("text", {
											className: "la-vz-index-tick-label",
											style: style_1.indexTickLabel,
											textAnchor: "middle",
											x: tickCoorEnd.x,
											y: tickCoorEnd.y + lineHeight
										}, t));
									}), React.createElement("g", null, React.createElement("path", {
										className: "la-vz-index-line",
										d: indexCurve,
										style: style_1.indexLine,
										transform: getRotation(seqLength * .75)
									}), React.createElement("path", {
										className: "la-vz-index-line",
										d: indexCurve,
										style: style_1.indexLine,
										transform: getRotation(seqLength * .25)
									})));
								};
								var _a = Index;
								Index.contextType = centralIndexContext_1.default;
								Index.getDerivedStateFromProps = function(nextProps) {
									var seqLength = nextProps.seqLength;
									var centralIndex = 0;
									if (_a.context) centralIndex = _a.context.circular;
									var increments = Math.floor(seqLength / 6);
									var indexInc = Math.max(+increments.toPrecision(2), 10);
									while (indexInc % 10 !== 0) indexInc += 1;
									var ticks = [];
									for (var i = 0; i <= seqLength - indexInc / 2; i += indexInc) ticks.push(i === 0 ? 1 : i);
									var tickTolerance = indexInc * 6;
									ticks = ticks.filter(function(t) {
										return Math.abs(centralIndex - t) < tickTolerance || Math.abs(centralIndex + seqLength - t) < tickTolerance || Math.abs(centralIndex - seqLength - t) < tickTolerance;
									});
									return {
										indexInc,
										ticks
									};
								};
								return Index;
							}(React.PureComponent);
						}),
						(function(__unused_webpack_module, exports$29, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$29, "__esModule", { value: true });
							exports$29.Labels = void 0;
							var React = __webpack_require__(2);
							var SeqViewerContainer_1 = __webpack_require__(3);
							var style_1 = __webpack_require__(13);
							var Circular_1 = __webpack_require__(1);
							var WrappedGroupLabel_1 = __webpack_require__(32);
							exports$29.Labels = function(_super) {
								__extends(Labels, _super);
								function Labels(props) {
									var _this = _super.call(this, props) || this;
									_this.setHoveredGroup = function(hoveredGroup) {
										if (hoveredGroup !== _this.state.hoveredGroup) _this.setState({ hoveredGroup });
									};
									_this.state = {
										hoveredGroup: "",
										labelGroups: []
									};
									return _this;
								}
								Labels.prototype.render = function() {
									var _this = this;
									var _a = this.state, hoveredGroup = _a.hoveredGroup, labelGroups = _a.labelGroups;
									var _b = this.props, lineHeight = _b.lineHeight, size = _b.size;
									var hovered = labelGroups.find(function(g) {
										return g.labels[0].id === hoveredGroup;
									});
									return React.createElement("g", {
										className: "la-vz-circular-labels",
										onMouseLeave: function() {
											return _this.setHoveredGroup("");
										}
									}, labelGroups.map(function(g) {
										var first = g.labels[0];
										var fC = g.forkCoor || g.textCoor;
										var labelLines = React.createElement(React.Fragment, null, React.createElement("path", {
											className: "la-vz-label-line",
											d: "M".concat(g.lineCoor.x, " ").concat(g.lineCoor.y, " L").concat(fC.x, " ").concat(fC.y),
											style: style_1.circularLabelLine
										}), g.forkCoor && React.createElement("path", {
											className: "la-vz-label-line",
											d: "M".concat(fC.x, " ").concat(fC.y, " L").concat(g.textCoor.x, " ").concat(g.textCoor.y),
											style: style_1.circularLabelLine
										}));
										if (!g.grouped) return React.createElement("g", { key: first.id }, labelLines, React.createElement("text", __assign({
											className: "la-vz-circular-label",
											id: first.id
										}, g.textCoor, {
											dominantBaseline: "middle",
											style: style_1.circularLabel,
											textAnchor: g.textAnchor,
											onMouseEnter: function() {
												return (0, WrappedGroupLabel_1.setHoveredLabelUnderline)(first.id || "", true);
											},
											onMouseLeave: function() {
												return (0, WrappedGroupLabel_1.setHoveredLabelUnderline)(first.id || "", false);
											}
										}), g.name));
										else if (first.id === hoveredGroup) return null;
										return React.createElement("g", {
											key: "".concat(first.id, "-listener"),
											id: "".concat(first.id, "-label")
										}, labelLines, React.createElement("text", __assign({
											className: "la-vz-circular-label",
											dominantBaseline: "middle",
											id: first.id,
											style: style_1.circularLabel,
											textAnchor: g.textAnchor,
											onMouseEnter: function() {
												return _this.setHoveredGroup(first.id || "");
											}
										}, g.textCoor), g.name));
									}), hovered && React.createElement(WrappedGroupLabel_1.WrappedGroupLabel, {
										group: hovered,
										lineHeight,
										setHoveredGroup: this.setHoveredGroup,
										size
									}));
								};
								Labels.getDerivedStateFromProps = function(nextProps, prevState) {
									return {
										hoveredGroup: prevState.hoveredGroup,
										labelGroups: Labels.groupOverlappingLabels(nextProps)
									};
								};
								/**
								* need to avoid having overlapping names. if names
								* overlap with one another, they should be grouped together and
								* just show the first name of the group. Ex: "M13-rev,GTP,+3"
								*
								* On hover over this group, all the other names should be shown
								*
								* this should return all the informaiton needed to render the
								* name by itself or in a grouping
								*/
								Labels.groupOverlappingLabels = function(props) {
									var center = props.center, findCoor = props.findCoor, labels = props.labels, lineHeight = props.lineHeight, radius = props.radius, seqLength = props.seqLength, size = props.size, yDiff = props.yDiff;
									var textRadius = radius + (seqLength > Circular_1.RENDER_SEQ_LENGTH_CUTOFF ? lineHeight * 2 : lineHeight * 3.5);
									/**
									* Add positional information to each label. This includes:
									* - textCoor: point next to the text
									* - lineCoor: point next to the plasmid arc/circle
									* - textAnchor: alignment
									*/
									var labelsWithCoordinates = labels.reduce(function(acc, labelRow) {
										return acc.concat(labelRow);
									}, []).map(function(a) {
										var annCenter;
										if (a.type === "enzyme") annCenter = a.start;
										else if (a.end > a.start) annCenter = (a.end + a.start) / 2;
										else annCenter = (a.start - seqLength + a.end) / 2;
										var lineCoorRadius = seqLength > Circular_1.RENDER_SEQ_LENGTH_CUTOFF ? radius : textRadius - lineHeight / 2;
										var lineCoor = findCoor(annCenter, lineCoorRadius, true);
										var textCoor = findCoor(annCenter, textRadius, true);
										return {
											label: a,
											lineCoor,
											textAnchor: textCoor.x <= center.x ? "end" : "start",
											textCoor
										};
									});
									var groupOverflows = function(label, textCoor) {
										var nameLength = (label.name.length + 4) * SeqViewerContainer_1.CHAR_WIDTH;
										var overflow = false;
										var heightYPos = textCoor.y + yDiff;
										if (heightYPos < 0 || heightYPos > size.height) overflow = true;
										else if (textCoor.x - nameLength < 0 || textCoor.x + nameLength > size.width) overflow = true;
										return overflow;
									};
									/**
									* merge overlapping names into groupings. If multiple of the labels
									* will overlap with one another, create an array of them and generate an
									* overview name to show for all of them (ex above)
									*/
									var labelsGrouped = labelsWithCoordinates.reduce(function(acc, n) {
										var overlapIndex = acc.findIndex(function(g) {
											if (g.textAnchor === n.textAnchor) return Math.abs(g.textCoor.y - n.textCoor.y) < 15;
											return false;
										});
										if (overlapIndex > -1) {
											acc[overlapIndex].labels.push(n.label);
											acc[overlapIndex].grouped = true;
											return acc;
										}
										var overflow = groupOverflows(n.label, n.textCoor);
										return acc.concat({
											forkCoor: null,
											grouped: overflow,
											labels: [n.label],
											lineCoor: n.lineCoor,
											name: n.label.name,
											overflow,
											textAnchor: n.textAnchor,
											textCoor: n.textCoor
										});
									}, []);
									/**
									* we now want to *ungroup* labels that we can do overlap avoidance for by doing small vertical
									* adjustments. So for every group that is grouped but doesn't overlap (ie, the labels
									* overlap but the group doesn't overflow the viewer's edge), try to spread out the
									* labels so the user can see all of them at once and by default
									*
									* to do this we need to create a forkCoor, where the textCoors of the constituent
									* labels will connect. That forkCoor, in turn, will be what connects to the edge of
									* the plasmid
									*/
									labelsGrouped = labelsGrouped.reduce(function(acc, g, i) {
										if (!g.grouped || g.overflow || g.labels.length > 4) return acc.concat(g);
										var leftNeighbor = acc[acc.length - 1];
										var rightNeighbor = labelsGrouped[i + 1];
										if (leftNeighbor && leftNeighbor.textAnchor !== g.textAnchor) leftNeighbor = void 0;
										if (rightNeighbor && rightNeighbor.textAnchor !== g.textAnchor) rightNeighbor = void 0;
										var newLabels = g.labels.map(function(l, i2) {
											var xDelta = i2 * (3 * SeqViewerContainer_1.CHAR_WIDTH);
											if (g.textAnchor === "end") xDelta = -xDelta;
											var yDelta = (g.labels.length - i2) * -15;
											if (g.textCoor.y > center.y) yDelta = (g.labels.length - i2) * 15;
											var newTextCoor = {
												x: g.textCoor.x + xDelta,
												y: g.textCoor.y + yDelta
											};
											var overflow = groupOverflows(l, newTextCoor);
											return __assign(__assign({}, g), {
												forkCoor: g.textCoor,
												grouped: overflow,
												labels: [l],
												overflow,
												textCoor: newTextCoor
											});
										});
										if (newLabels.some(function(l) {
											return [leftNeighbor, rightNeighbor].some(function(n) {
												return n && Math.abs(n.textCoor.y - l.textCoor.y) < 15;
											});
										})) return acc.concat(g);
										return acc.concat.apply(acc, newLabels);
									}, []);
									/**
									* give actual names. this is in a separate loop because the group name
									* is going to indicate how many other sub labels are in a block/grouping
									* and it's easier to make them once than to update continually in the reduce above
									*/
									labelsGrouped = labelsGrouped.map(function(a) {
										var firstName = a.labels[0].name;
										var restLength = a.labels.length - 1;
										if (a.overflow) return __assign(__assign({}, a), { name: "+".concat(restLength + 1) });
										else if (a.grouped) return __assign(__assign({}, a), { name: "".concat(firstName, ",+").concat(restLength) });
										return __assign(__assign({}, a), { name: firstName });
									});
									/**
									* prevent the labels from overflowing the side of the viewer
									* even the small "+1" labels can overflow the sides if the viewer is small enough
									* this pushes their textCoors inward to prevent that
									*/
									return labelsGrouped.map(function(g) {
										var _a = g.textCoor, x = _a.x, y = _a.y;
										x = Math.max(SeqViewerContainer_1.CHAR_WIDTH * (g.name.length + 1), x);
										x = Math.min(size.width - (g.name.length + 1) * SeqViewerContainer_1.CHAR_WIDTH, x);
										y = Math.max(SeqViewerContainer_1.CHAR_WIDTH, y);
										y = Math.min(size.height - SeqViewerContainer_1.CHAR_WIDTH - 12, y);
										return __assign(__assign({}, g), { textCoor: {
											x,
											y
										} });
									});
								};
								return Labels;
							}(React.Component);
						}),
						(function(__unused_webpack_module, exports$30, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$30, "__esModule", { value: true });
							exports$30.setHoveredLabelUnderline = exports$30.WrappedGroupLabel = void 0;
							var React = __webpack_require__(2);
							var SeqViewerContainer_1 = __webpack_require__(3);
							var style_1 = __webpack_require__(13);
							/**
							* Groups several other labels together so they're all viewable at once
							*
							* given the currently active annotation block, with multiple annotations and enzymes,
							* render each in a single "block", which is a g element with a rect "containing" the
							* names. This is slightly tricky because we can't put the text elements inside
							* the rect as though it were a div and have them fill it. instead, we must calculate
							* the height and width of the resulting annotaiton block
							*/
							var WrappedGroupLabel = function(props) {
								var group = props.group, lineHeight = props.lineHeight, setHoveredGroup = props.setHoveredGroup, _a = props.size, height = _a.height, width = _a.width;
								var calcRowWidth = function(row) {
									return row.reduce(function(acc, label) {
										return acc + (label.name.length + 1) * SeqViewerContainer_1.CHAR_WIDTH;
									}, 0);
								};
								var lastRow = function(acc) {
									return acc[acc.length - 1];
								};
								var labelRows = group.labels.reduce(function(acc, l) {
									var nameWidth = l.name.length * SeqViewerContainer_1.CHAR_WIDTH;
									if (nameWidth > width) {
										var maxCharPerRow = Math.floor(width * .75 / SeqViewerContainer_1.CHAR_WIDTH);
										var splitRegex = new RegExp(".{1,".concat(maxCharPerRow, "}"), "g");
										var splitLabelNameRows = l.name.match(splitRegex) || [];
										if (splitLabelNameRows.length) {
											splitLabelNameRows.forEach(function(splitLabel) {
												acc.push([__assign(__assign({}, l), { name: splitLabel.trim() })]);
											});
											return acc;
										}
									}
									if (lastRow(acc)) {
										if (calcRowWidth(lastRow(acc)) + nameWidth <= 200) {
											acc[acc.length - 1].push(l);
											return acc;
										}
									}
									acc.push([l]);
									return acc;
								}, []);
								var groupHeight = labelRows.length * lineHeight;
								var groupWidth = labelRows.reduce(function(max, row, i) {
									return Math.max(max, calcRowWidth(row) - (i === labelRows.length - 1 ? SeqViewerContainer_1.CHAR_WIDTH : 0));
								}, 0);
								var _b = [groupHeight, groupWidth].map(function(x) {
									return x + 2 * SeqViewerContainer_1.CHAR_WIDTH;
								}), rectHeight = _b[0], rectWidth = _b[1];
								var forkCoor = group.forkCoor || group.textCoor;
								var linePath = group.forkCoor ? "M".concat(group.textCoor.x, " ").concat(group.textCoor.y, " L").concat(forkCoor.x, " ").concat(forkCoor.y) : "M".concat(group.lineCoor.x, " ").concat(group.lineCoor.y, " L").concat(forkCoor.x, " ").concat(forkCoor.y);
								var _c = group.textCoor, x = _c.x, y = _c.y;
								x = group.textAnchor === "end" ? x - (group.labels[0].name.length + 3) * SeqViewerContainer_1.CHAR_WIDTH : x;
								y -= SeqViewerContainer_1.CHAR_WIDTH;
								x = Math.max(x, 2 * SeqViewerContainer_1.CHAR_WIDTH);
								x = Math.min(x, width - 2 * SeqViewerContainer_1.CHAR_WIDTH - groupWidth);
								y = Math.max(y, 2 * SeqViewerContainer_1.CHAR_WIDTH);
								y = Math.min(y, height - 2 * SeqViewerContainer_1.CHAR_WIDTH - groupHeight);
								var groupCoor = {
									x,
									y
								};
								var rectCoor = {
									x: x - SeqViewerContainer_1.CHAR_WIDTH,
									y: y - SeqViewerContainer_1.CHAR_WIDTH - 2
								};
								var key = "".concat(group.labels[0].id, "_overlay");
								return React.createElement("g", {
									key,
									onMouseLeave: function() {
										return setHoveredGroup("");
									}
								}, React.createElement("path", {
									className: "la-vz-label-line",
									d: linePath
								}), React.createElement("rect", __assign({
									fill: "white",
									height: rectHeight,
									stroke: "none",
									width: rectWidth
								}, rectCoor)), React.createElement("text", __assign({}, groupCoor, { style: style_1.svgText }), labelRows.map(function(r, i) {
									return React.createElement("tspan", {
										key: "".concat(key, "_").concat(i),
										dominantBaseline: "middle",
										x: groupCoor.x,
										y: groupCoor.y + (i + .5) * lineHeight
									}, r.map(function(l, i2) {
										return React.createElement(React.Fragment, { key: l.id }, React.createElement("tspan", {
											className: "la-vz-circular-label",
											dominantBaseline: "middle",
											id: l.id,
											style: style_1.circularLabel,
											tabIndex: -1,
											y: groupCoor.y + (i + .5) * lineHeight,
											onMouseLeave: function() {
												return (0, exports$30.setHoveredLabelUnderline)(l.id || "", false);
											},
											onMouseOver: function() {
												return (0, exports$30.setHoveredLabelUnderline)(l.id || "", true);
											}
										}, l.name), i2 < r.length - 1 || i !== labelRows.length - 1 ? "," : "");
									}));
								})), React.createElement("rect", __assign({
									fill: "none",
									height: rectHeight,
									stroke: "black",
									strokeWidth: 1.5,
									width: rectWidth
								}, rectCoor)));
							};
							exports$30.WrappedGroupLabel = WrappedGroupLabel;
							var setHoveredLabelUnderline = function(id, underline) {
								if (!document) return;
								var element = document.getElementById(id);
								if (!element) return;
								if (underline) element.style.textDecoration = "underline";
								else element.style.textDecoration = "none";
							};
							exports$30.setHoveredLabelUnderline = setHoveredLabelUnderline;
						}),
						(function(__unused_webpack_module, exports$31, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							Object.defineProperty(exports$31, "__esModule", { value: true });
							exports$31.Selection = void 0;
							var React = __webpack_require__(2);
							var selectionContext_1 = __webpack_require__(24);
							var style_1 = __webpack_require__(13);
							var Circular_1 = __webpack_require__(1);
							exports$31.Selection = function(_super) {
								__extends(Selection, _super);
								function Selection() {
									return _super !== null && _super.apply(this, arguments) || this;
								}
								Selection.prototype.render = function() {
									var _a = this.props, findCoor = _a.findCoor, genArc = _a.genArc, getRotation = _a.getRotation, lineHeight = _a.lineHeight, radius = _a.radius, seq = _a.seq, seqLength = _a.seqLength, totalRows = _a.totalRows;
									var _b = this.context, clockwise = _b.clockwise, end = _b.end, ref = _b.ref, start = _b.start;
									if (typeof start === "undefined" || typeof end === "undefined") return;
									var selLength = 0;
									if (start === end && ref === "ALL") selLength = seqLength;
									else if (start > end) selLength = clockwise !== false ? Math.abs(end - start + seqLength) : -Math.abs(start - end);
									else if (start < end) selLength = clockwise !== false ? Math.abs(end - start) : -Math.abs(start - end + seqLength);
									if (Math.abs(selLength) === seqLength) selLength += selLength > 0 ? -.1 : .1;
									var topR = radius + lineHeight;
									if (seq.length <= Circular_1.RENDER_SEQ_LENGTH_CUTOFF) topR += 2 * lineHeight + 3;
									var bottomR = radius - lineHeight * (totalRows - 1);
									if (bottomR < 0 || topR < 0) {
										bottomR = 0;
										topR = radius;
									}
									var lineTop = findCoor(0, topR);
									var lineBottom = findCoor(0, bottomR);
									var edgePath = "M ".concat(lineBottom.x, " ").concat(lineBottom.y, "\n			L ").concat(lineTop.x, " ").concat(lineTop.y);
									var sFlagF = clockwise !== false || ref === "ALL" ? true : false;
									var lArc = false;
									if (clockwise !== false && selLength > seqLength / 2) lArc = true;
									else if (clockwise === false && Math.abs(selLength) > seqLength / 2) lArc = true;
									return React.createElement("g", null, selLength && React.createElement("path", {
										className: "la-vz-selection",
										d: genArc({
											innerRadius: bottomR,
											largeArc: lArc,
											length: selLength,
											outerRadius: topR,
											sweepFWD: sFlagF
										}),
										shapeRendering: "auto",
										stroke: "none",
										style: style_1.selection,
										transform: getRotation(start)
									}), React.createElement("path", {
										className: "la-vz-selection-edge",
										d: edgePath,
										strokeWidth: 1,
										style: style_1.selectionEdge,
										transform: getRotation(start)
									}), selLength && React.createElement("path", {
										className: "la-vz-selection-edge",
										d: edgePath,
										style: style_1.selectionEdge,
										transform: getRotation(end)
									}));
								};
								Selection.contextType = selectionContext_1.default;
								return Selection;
							}(React.PureComponent);
						}),
						(function(__unused_webpack_module, exports$32, __webpack_require__) {
							var __extends = this && this.__extends || (function() {
								var extendStatics = function(d, b) {
									extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
										d.__proto__ = b;
									} || function(d, b) {
										for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
									};
									return extendStatics(d, b);
								};
								return function(d, b) {
									if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
									extendStatics(d, b);
									function __() {
										this.constructor = d;
									}
									d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
								};
							})();
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$32, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var seqparse_1 = __webpack_require__(35);
							var SeqViewerContainer_1 = __webpack_require__(3);
							var colors_1 = __webpack_require__(16);
							var digest_1 = __webpack_require__(36);
							var isEqual_1 = __webpack_require__(10);
							var search_1 = __webpack_require__(38);
							var sequence_1 = __webpack_require__(11);
							exports$32["default"] = function(_super) {
								__extends(SeqViz, _super);
								function SeqViz(props) {
									var _this = _super.call(this, props) || this;
									/**
									* Re-parse props to state if there are changes to:
									* - seq/accession/file (this probably means we need to update the rest)
									* - search input changes
									* - enzymes change
									* - annotations
									*
									* This is needed for the parse(accession) call that makes an async fetch to a remote repository
									* https://reactjs.org/docs/react-component.html#componentdidupdate
									*/
									_this.componentDidUpdate = function(_a, _b) {
										var _c = _a.accession, accession = _c === void 0 ? "" : _c, annotations = _a.annotations, enzymes = _a.enzymes, enzymesCustom = _a.enzymesCustom, file = _a.file, search = _a.search;
										var seq = _b.seq, seqType = _b.seqType, name = _b.name;
										if (accession !== _this.props.accession || file !== _this.props.file || _this.props.seq && _this.props.seq !== seq || _this.props.name && _this.props.name !== name || _this.props.seqType && _this.props.seqType !== seqType) {
											var input = _this.parseInput();
											_this.setState(__assign(__assign({
												annotations: input.annotations,
												compSeq: input.compSeq,
												name: input.name,
												seq: input.seq,
												seqType: input.seqType
											}, _this.search(_this.props, input.seq)), _this.cut(input.seq, input.seqType)));
											return;
										}
										if (search && (!_this.props.search || search.query !== _this.props.search.query || search.mismatch !== _this.props.search.mismatch)) _this.setState(_this.search(_this.props, seq));
										if (!(0, isEqual_1.isEqual)(enzymes, _this.props.enzymes) || !(0, isEqual_1.isEqual)(enzymesCustom, _this.props.enzymesCustom)) _this.setState(_this.cut(seq, seqType));
										if (!(0, isEqual_1.isEqual)(annotations, _this.props.annotations)) _this.setState({ annotations: _this.parseAnnotations(_this.props.annotations, _this.props.seq) });
									};
									/**
									* If a file is provided or a sequence is provided, parse it and its annotations.
									* If an accession is provided, query a remote repository and parse the sequence and annotations.
									*/
									_this.parseInput = function(props) {
										var _a = props || _this.props, annotations = _a.annotations, compSeq = _a.compSeq, file = _a.file, _b = _a.name, name = _b === void 0 ? "" : _b, seq = _a.seq, seqType = _a.seqType;
										if (file) {
											var parseOptions = {};
											if (file && file instanceof File) parseOptions.fileName = file.name;
											var parsed = (0, seqparse_1.parseFile)(file.toString(), parseOptions);
											if (parsed.length) {
												var parsedSeqType = seqType !== null && seqType !== void 0 ? seqType : (0, sequence_1.guessType)(parsed[0].seq);
												return {
													annotations: _this.parseAnnotations(parsed[0].annotations, parsed[0].seq),
													compSeq: (0, sequence_1.complement)(parsed[0].seq, parsedSeqType).compSeq,
													name: parsed[0].name,
													seq: parsed[0].seq,
													seqType: parsedSeqType
												};
											}
										} else if (seq) {
											var parsedSeqType = seqType !== null && seqType !== void 0 ? seqType : (0, sequence_1.guessType)(seq);
											return {
												annotations: _this.parseAnnotations(annotations, seq),
												compSeq: compSeq || (0, sequence_1.complement)(seq, parsedSeqType).compSeq,
												name,
												seq,
												seqType: parsedSeqType
											};
										}
										return {
											annotations: [],
											compSeq: "",
											name: "",
											seq: "",
											seqType: "dna"
										};
									};
									/**
									* Search for the query sequence in the part sequence, set in state.
									*/
									_this.search = function(props, seq) {
										var onSearch = props.onSearch, searchProp = props.search, seqType = props.seqType;
										if (!searchProp || !seq || !seq.length) return { search: [] };
										var results = (0, search_1.default)(searchProp.query, searchProp.mismatch, seq, seqType || (0, sequence_1.guessType)(seq));
										if (_this.state && (0, isEqual_1.isEqual)(results, _this.state.search)) return { search: _this.state.search };
										onSearch && onSearch(results);
										return { search: results };
									};
									/**
									* Find and save enzymes' cut-site locations.
									*/
									_this.cut = function(seq, seqType) {
										return { cutSites: (0, digest_1.default)(seq || "", seqType, _this.props.enzymes || [], _this.props.enzymesCustom || {}) };
									};
									/**
									* Fix annotations to add unique ids, fix directionality, and modulo the start and end of each.
									*/
									_this.parseAnnotations = function(annotations, seq) {
										if (annotations === void 0) annotations = null;
										if (seq === void 0) seq = "";
										return (annotations || []).map(function(a, i) {
											return __assign(__assign({ id: (0, sequence_1.randomID)() }, a), {
												color: a.color || (0, colors_1.colorByIndex)(i, colors_1.COLORS),
												direction: (0, sequence_1.directionality)(a.direction),
												end: a.end > seq.length ? a.end % seq.length : a.end,
												start: a.start % (seq.length + 1)
											});
										});
									};
									var seq = _this.parseInput(props);
									_this.state = __assign(__assign(__assign({}, seq), _this.search(props, seq.seq)), _this.cut(seq.seq, seq.seqType));
									return _this;
								}
								/**
								* If an accession was provided, query it here.
								*/
								SeqViz.prototype.componentDidMount = function() {
									var _this = this;
									if (typeof window !== "undefined") {
										if (!this.props.disableExternalFonts) __webpack_require__(39).load({ google: { families: ["Roboto Mono:300,400,500"] } });
									}
									var accession = this.props.accession;
									if (!accession || !accession.length) return;
									(0, seqparse_1.default)(accession, { cors: true }).then(function(parsed) {
										var seqType = (0, sequence_1.guessType)(parsed.seq);
										_this.setState(__assign(__assign({
											annotations: _this.parseAnnotations(parsed.annotations, parsed.seq),
											compSeq: (0, sequence_1.complement)(parsed.seq, seqType).compSeq,
											name: parsed.name,
											seq: parsed.seq,
											seqType
										}, _this.search(_this.props, parsed.seq)), _this.cut(parsed.seq, seqType)));
									});
								};
								/** Log caught errors. */
								SeqViz.prototype.componentDidCatch = function(error, errorInfo) {
									console.error("Error caught in SeqViz: %v %v", error, errorInfo);
								};
								SeqViz.prototype.render = function() {
									var _a = this.props, highlightedRegions = _a.highlightedRegions, highlights = _a.highlights, primers = _a.primers, showComplement = _a.showComplement, showIndex = _a.showIndex, style = _a.style, zoom = _a.zoom;
									var translations = this.props.translations;
									var _b = this.state, compSeq = _b.compSeq, seq = _b.seq, seqType = _b.seqType;
									if (!seq) return React.createElement("div", { className: "la-vz-seqviz" });
									if (seqType === "aa") translations = [{
										direction: 1,
										end: seq.length,
										start: 0,
										name: ""
									}];
									var props = {
										bpColors: this.props.bpColors || {},
										copyEvent: this.props.copyEvent || (function() {
											return false;
										}),
										selectAllEvent: this.props.selectAllEvent || (function() {
											return false;
										}),
										cutSites: this.state.cutSites,
										highlights: (highlights || []).concat(highlightedRegions || []).map(function(h, i) {
											return __assign(__assign({}, h), {
												direction: 1,
												end: h.end > seq.length ? h.end % seq.length : h.end,
												id: "highlight-".concat(i, "-").concat(h.start, "-").concat(h.end),
												name: "",
												start: h.start % (seq.length + 1)
											});
										}),
										onSelection: this.props.onSelection || (function() {}),
										primers: primers.map(function(p, i) {
											return __assign({
												color: (0, colors_1.colorByIndex)(i),
												id: "primer".concat(p.name).concat(i).concat(p.start).concat(p.end)
											}, p);
										}),
										rotateOnScroll: !!this.props.rotateOnScroll,
										showComplement: !!compSeq && (typeof showComplement !== "undefined" ? showComplement : true) || false,
										showIndex: !!showIndex,
										translations: (translations || []).map(function(t, i) {
											return {
												direction: t.direction ? t.direction < 0 ? -1 : 1 : 1,
												end: seqType === "aa" ? t.end : t.start + Math.floor((t.end - t.start) / 3) * 3,
												start: t.start % seq.length,
												color: t.color || (0, colors_1.colorByIndex)(i, colors_1.COLORS),
												id: "translation".concat(t.name).concat(i).concat(t.start).concat(t.end),
												name: t.name
											};
										}),
										viewer: this.props.viewer || "both",
										zoom: {
											circular: typeof (zoom === null || zoom === void 0 ? void 0 : zoom.circular) == "number" ? Math.min(Math.max(zoom.circular, 0), 100) : 0,
											linear: typeof (zoom === null || zoom === void 0 ? void 0 : zoom.linear) == "number" ? Math.min(Math.max(zoom.linear, 0), 100) : 50
										}
									};
									return React.createElement("div", {
										className: "la-vz-seqviz",
										"data-testid": "la-vz-seqviz",
										style: __assign({
											height: "100%",
											width: "100%"
										}, style)
									}, React.createElement(SeqViewerContainer_1.default, __assign({}, this.props, props, this.state)));
								};
								SeqViz.defaultProps = {
									accession: "",
									annotations: [],
									backbone: "",
									bpColors: {},
									colors: [],
									compSeq: "",
									copyEvent: function(e) {
										return e.key === "c" && (e.metaKey || e.ctrlKey);
									},
									disableExternalFonts: false,
									enzymes: [],
									enzymesCustom: {},
									name: "",
									onSearch: function(_) {
										return null;
									},
									onSelection: function(_) {
										return null;
									},
									primers: [],
									rotateOnScroll: true,
									search: {
										mismatch: 0,
										query: ""
									},
									selectAllEvent: function(e) {
										return e.key === "a" && (e.metaKey || e.ctrlKey);
									},
									seq: "",
									showComplement: true,
									showIndex: true,
									style: {},
									translations: [],
									viewer: "both",
									zoom: {
										circular: 0,
										linear: 50
									}
								};
								return SeqViz;
							}(React.Component);
						}),
						((module$3) => {
							module$3.exports = require_dist();
						}),
						(function(__unused_webpack_module, exports$33, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$33, "__esModule", { value: true });
							exports$33.findCutSites = void 0;
							var enzymes_1 = __webpack_require__(37);
							var search_1 = __webpack_require__(38);
							var sequence_1 = __webpack_require__(11);
							/**
							* Digest a sequence with the enzymes and return an array of cut-site.
							*
							* This is slow enough to impact rendering so shouldn't be ran on each prop change.
							*/
							exports$33["default"] = (function(seq, seqType, enzymes, enzymesCustom) {
								if (enzymes === void 0) enzymes = [];
								if (enzymesCustom === void 0) enzymesCustom = {};
								var seqToCut = seq + seq;
								var cutSites = enzymes.map(function(e) {
									return typeof e === "string" ? enzymes_1.default[e.toLowerCase()] : e;
								}).filter(function(e) {
									return e;
								}).concat(Object.values(enzymesCustom)).reduce(function(acc, enzyme) {
									(0, exports$33.findCutSites)(enzyme, seqToCut, seqType, seq.length).forEach(function(c) {
										return acc["".concat(c.fcut, "-").concat(c.direction)] = c;
									});
									return acc;
								}, {});
								return Object.values(cutSites);
							});
							/**
							* Search through the sequence with the enzyme and return an array of cut and hang indexes.
							*
							* Exported for testing.
							*/
							var findCutSites = function(enzyme, seq, seqType, seqL) {
								if (seqType === "aa") return [];
								var fcut = enzyme.fcut, rcut = enzyme.rcut, rseq = enzyme.rseq;
								var cutSites = [];
								var matcher = (0, search_1.createRegex)(rseq, seqType);
								var result = matcher.exec(seq);
								while (result) {
									var index = result.index;
									cutSites.push({
										direction: 1,
										end: index + rseq.length,
										enzyme,
										fcut: index + fcut,
										id: "",
										name: enzyme.name,
										rcut: index + rcut,
										start: index
									});
									result = matcher.exec(seq);
								}
								var dupRevComp = rseq === (0, sequence_1.reverseComplement)(rseq, seqType);
								var rcMatcher = (0, search_1.createRegex)((0, sequence_1.reverseComplement)(rseq, seqType), seqType);
								result = rcMatcher.exec(seq);
								while (result && !dupRevComp) {
									var index = result.index;
									cutSites.push({
										direction: -1,
										end: index + rseq.length,
										enzyme,
										fcut: index + rseq.length - rcut,
										id: "",
										name: enzyme.name,
										rcut: index + rseq.length - fcut,
										start: index
									});
									result = rcMatcher.exec(seq);
								}
								return cutSites.sort(function(a, b) {
									return a.fcut - b.fcut;
								}).filter(function(c) {
									return !(c.fcut === 0 && c.rcut === 0);
								}).map(function(c) {
									return __assign(__assign({}, c), {
										end: c.end % seqL,
										fcut: c.fcut % seqL,
										id: "".concat(enzyme.name, "-").concat(enzyme.rseq, "-").concat(c.fcut, "-").concat(c.direction > 0 ? "fwd" : "rev"),
										rcut: c.rcut % seqL,
										start: c.start % seqL
									});
								}).filter(function(c) {
									return c.enzyme.range ? c.start >= c.enzyme.range.start && c.end <= c.enzyme.range.end : true;
								});
							};
							exports$33.findCutSites = findCutSites;
						}),
						((__unused_webpack_module, exports$34) => {
							Object.defineProperty(exports$34, "__esModule", { value: true });
							exports$34["default"] = {
								aatii: {
									fcut: 5,
									name: "AatII",
									rcut: 1,
									rseq: "GACGTC"
								},
								abasi: {
									fcut: 14,
									name: "AbaSI",
									rcut: 12,
									rseq: "hmCNNNNNNNNNNN"
								},
								acc65i: {
									fcut: 1,
									name: "Acc65I",
									rcut: 5,
									rseq: "GGTACC"
								},
								acci: {
									fcut: 2,
									name: "AccI",
									rcut: 4,
									rseq: "GTMKAC"
								},
								acii: {
									fcut: 1,
									name: "AciI",
									rcut: 3,
									rseq: "CCGC"
								},
								acli: {
									fcut: 2,
									name: "AclI",
									rcut: 4,
									rseq: "AACGTT"
								},
								acui: {
									fcut: 22,
									name: "AcuI",
									rcut: 20,
									rseq: "CTGAAGNNNNNNNNNNNNNNNN"
								},
								afei: {
									fcut: 3,
									name: "AfeI",
									rcut: 3,
									rseq: "AGCGCT"
								},
								aflii: {
									fcut: 1,
									name: "AflII",
									rcut: 5,
									rseq: "CTTAAG"
								},
								afliii: {
									fcut: 1,
									name: "AflIII",
									rcut: 5,
									rseq: "ACRYGT"
								},
								agei: {
									fcut: 1,
									name: "AgeI",
									rcut: 5,
									rseq: "ACCGGT"
								},
								ahdi: {
									fcut: 6,
									name: "AhdI",
									rcut: 5,
									rseq: "GACNNNNNGTC"
								},
								alei: {
									fcut: 5,
									name: "AleI",
									rcut: 5,
									rseq: "CACNNNNGTG"
								},
								alui: {
									fcut: 2,
									name: "AluI",
									rcut: 2,
									rseq: "AGCT"
								},
								alwi: {
									fcut: 9,
									name: "AlwI",
									rcut: 10,
									rseq: "GGATCNNNNN"
								},
								alwni: {
									fcut: 6,
									name: "AlwNI",
									rcut: 3,
									rseq: "CAGNNNCTG"
								},
								apai: {
									fcut: 5,
									name: "ApaI",
									rcut: 1,
									rseq: "GGGCCC"
								},
								apali: {
									fcut: 1,
									name: "ApaLI",
									rcut: 5,
									rseq: "GTGCAC"
								},
								apeki: {
									fcut: 1,
									name: "ApeKI",
									rcut: 4,
									rseq: "GCWGC"
								},
								apoi: {
									fcut: 1,
									name: "ApoI",
									rcut: 5,
									rseq: "RAATTY"
								},
								asci: {
									fcut: 2,
									name: "AscI",
									rcut: 6,
									rseq: "GGCGCGCC"
								},
								asei: {
									fcut: 2,
									name: "AseI",
									rcut: 4,
									rseq: "ATTAAT"
								},
								asisi: {
									fcut: 5,
									name: "AsiSI",
									rcut: 3,
									rseq: "GCGATCGC"
								},
								avai: {
									fcut: 1,
									name: "AvaI",
									rcut: 5,
									rseq: "CYCGRG"
								},
								avaii: {
									fcut: 1,
									name: "AvaII",
									rcut: 4,
									rseq: "GGWCC"
								},
								avrii: {
									fcut: 1,
									name: "AvrII",
									rcut: 5,
									rseq: "CCTAGG"
								},
								baegi: {
									fcut: 5,
									name: "BaeGI",
									rcut: 1,
									rseq: "GKGCMC"
								},
								baei: {
									fcut: 38,
									name: "BaeI",
									rcut: 33,
									rseq: "NNNNNNNNNNNNNNNACNNNNGTAYCNNNNNNNNNNNN"
								},
								bamhi: {
									fcut: 1,
									name: "BamHI",
									rcut: 5,
									rseq: "GGATCC"
								},
								bani: {
									fcut: 1,
									name: "BanI",
									rcut: 5,
									rseq: "GGYRCC"
								},
								banii: {
									fcut: 5,
									name: "BanII",
									rcut: 1,
									rseq: "GRGCYC"
								},
								bbsi: {
									fcut: 8,
									name: "BbsI",
									rcut: 12,
									rseq: "GAAGACNNNNNN"
								},
								bbvci: {
									fcut: 2,
									name: "BbvCI",
									rcut: 5,
									rseq: "CCTCAGC"
								},
								bbvi: {
									fcut: 13,
									name: "BbvI",
									rcut: 17,
									rseq: "GCAGCNNNNNNNNNNNN"
								},
								bcci: {
									fcut: 9,
									name: "BccI",
									rcut: 10,
									rseq: "CCATCNNNNN"
								},
								bceai: {
									fcut: 17,
									name: "BceAI",
									rcut: 19,
									rseq: "ACGGCNNNNNNNNNNNNNN"
								},
								bcgi: {
									fcut: 36,
									name: "BcgI",
									rcut: 34,
									rseq: "NNNNNNNNNNNNCGANNNNNNTGCNNNNNNNNNNNN"
								},
								bcivi: {
									fcut: 12,
									name: "BciVI",
									rcut: 11,
									rseq: "GTATCCNNNNNN"
								},
								bcli: {
									fcut: 1,
									name: "BclI",
									rcut: 5,
									rseq: "TGATCA"
								},
								bcodi: {
									fcut: 6,
									name: "BcoDI",
									rcut: 10,
									rseq: "GTCTCNNNNN"
								},
								bfai: {
									fcut: 1,
									name: "BfaI",
									rcut: 3,
									rseq: "CTAG"
								},
								bfuai: {
									fcut: 10,
									name: "BfuAI",
									rcut: 14,
									rseq: "ACCTGCNNNNNNNN"
								},
								bgli: {
									fcut: 7,
									name: "BglI",
									rcut: 4,
									rseq: "GCCNNNNNGGC"
								},
								bglii: {
									fcut: 1,
									name: "BglII",
									rcut: 5,
									rseq: "AGATCT"
								},
								blpi: {
									fcut: 2,
									name: "BlpI",
									rcut: 5,
									rseq: "GCTNAGC"
								},
								bmgbi: {
									fcut: 3,
									name: "BmgBI",
									rcut: 3,
									rseq: "CACGTC"
								},
								bmri: {
									fcut: 11,
									name: "BmrI",
									rcut: 10,
									rseq: "ACTGGGNNNNN"
								},
								bmti: {
									fcut: 5,
									name: "BmtI",
									rcut: 1,
									rseq: "GCTAGC"
								},
								bpmi: {
									fcut: 22,
									name: "BpmI",
									rcut: 20,
									rseq: "CTGGAGNNNNNNNNNNNNNNNN"
								},
								bpu10i: {
									fcut: 2,
									name: "Bpu10I",
									rcut: 5,
									rseq: "CCTNAGC"
								},
								bpuei: {
									fcut: 22,
									name: "BpuEI",
									rcut: 20,
									rseq: "CTTGAGNNNNNNNNNNNNNNNN"
								},
								bsaai: {
									fcut: 3,
									name: "BsaAI",
									rcut: 3,
									rseq: "YACGTR"
								},
								bsabi: {
									fcut: 5,
									name: "BsaBI",
									rcut: 5,
									rseq: "GATNNNNATC"
								},
								bsahi: {
									fcut: 2,
									name: "BsaHI",
									rcut: 4,
									rseq: "GRCGYC"
								},
								bsai: {
									fcut: 7,
									name: "BsaI",
									rcut: 11,
									rseq: "GGTCTCNNNNN"
								},
								bsaji: {
									fcut: 1,
									name: "BsaJI",
									rcut: 5,
									rseq: "CCNNGG"
								},
								bsawi: {
									fcut: 1,
									name: "BsaWI",
									rcut: 5,
									rseq: "WCCGGW"
								},
								bsaxi: {
									fcut: 33,
									name: "BsaXI",
									rcut: 30,
									rseq: "NNNNNNNNNNNNACNNNNNCTCCNNNNNNNNNN"
								},
								bseri: {
									fcut: 16,
									name: "BseRI",
									rcut: 14,
									rseq: "GAGGAGNNNNNNNNNN"
								},
								bseyi: {
									fcut: 1,
									name: "BseYI",
									rcut: 5,
									rseq: "CCCAGC"
								},
								bsgi: {
									fcut: 22,
									name: "BsgI",
									rcut: 20,
									rseq: "GTGCAGNNNNNNNNNNNNNNNN"
								},
								bsiei: {
									fcut: 4,
									name: "BsiEI",
									rcut: 2,
									rseq: "CGRYCG"
								},
								bsihkai: {
									fcut: 5,
									name: "BsiHKAI",
									rcut: 1,
									rseq: "GWGCWC"
								},
								bsiwi: {
									fcut: 1,
									name: "BsiWI",
									rcut: 5,
									rseq: "CGTACG"
								},
								bsli: {
									fcut: 7,
									name: "BslI",
									rcut: 4,
									rseq: "CCNNNNNNNGG"
								},
								bsmai: {
									fcut: 6,
									name: "BsmAI",
									rcut: 10,
									rseq: "GTCTCNNNNN"
								},
								bsmbi: {
									fcut: 7,
									name: "BsmBI",
									rcut: 11,
									rseq: "CGTCTCNNNNN"
								},
								bsmfi: {
									fcut: 15,
									name: "BsmFI",
									rcut: 19,
									rseq: "GGGACNNNNNNNNNNNNNN"
								},
								bsmi: {
									fcut: 7,
									name: "BsmI",
									rcut: 5,
									rseq: "GAATGCN"
								},
								bsobi: {
									fcut: 1,
									name: "BsoBI",
									rcut: 5,
									rseq: "CYCGRG"
								},
								bsp1286i: {
									fcut: 5,
									name: "Bsp1286I",
									rcut: 1,
									rseq: "GDGCHC"
								},
								bspcni: {
									fcut: 14,
									name: "BspCNI",
									rcut: 12,
									rseq: "CTCAGNNNNNNNNN"
								},
								bspdi: {
									fcut: 2,
									name: "BspDI",
									rcut: 4,
									rseq: "ATCGAT"
								},
								bspei: {
									fcut: 1,
									name: "BspEI",
									rcut: 5,
									rseq: "TCCGGA"
								},
								bsphi: {
									fcut: 1,
									name: "BspHI",
									rcut: 5,
									rseq: "TCATGA"
								},
								bspmi: {
									fcut: 10,
									name: "BspMI",
									rcut: 14,
									rseq: "ACCTGCNNNNNNNN"
								},
								bspqi: {
									fcut: 8,
									name: "BspQI",
									rcut: 11,
									rseq: "GCTCTTCNNNN"
								},
								bsrbi: {
									fcut: 3,
									name: "BsrBI",
									rcut: 3,
									rseq: "CCGCTC"
								},
								bsrdi: {
									fcut: 8,
									name: "BsrDI",
									rcut: 6,
									rseq: "GCAATGNN"
								},
								bsrfi: {
									fcut: 1,
									name: "BsrFI",
									rcut: 5,
									rseq: "RCCGGY"
								},
								bsrgi: {
									fcut: 1,
									name: "BsrGI",
									rcut: 5,
									rseq: "TGTACA"
								},
								bsri: {
									fcut: 6,
									name: "BsrI",
									rcut: 4,
									rseq: "ACTGGN"
								},
								bsshii: {
									fcut: 1,
									name: "BssHII",
									rcut: 5,
									rseq: "GCGCGC"
								},
								bsssi: {
									fcut: 1,
									name: "BssSI",
									rcut: 5,
									rseq: "CACGAG"
								},
								bstapi: {
									fcut: 7,
									name: "BstAPI",
									rcut: 4,
									rseq: "GCANNNNNTGC"
								},
								bstbi: {
									fcut: 2,
									name: "BstBI",
									rcut: 4,
									rseq: "TTCGAA"
								},
								bsteii: {
									fcut: 1,
									name: "BstEII",
									rcut: 6,
									rseq: "GGTNACC"
								},
								bstni: {
									fcut: 2,
									name: "BstNI",
									rcut: 3,
									rseq: "CCWGG"
								},
								bstui: {
									fcut: 2,
									name: "BstUI",
									rcut: 2,
									rseq: "CGCG"
								},
								bstxi: {
									fcut: 8,
									name: "BstXI",
									rcut: 4,
									rseq: "CCANNNNNNTGG"
								},
								bstyi: {
									fcut: 1,
									name: "BstYI",
									rcut: 5,
									rseq: "RGATCY"
								},
								bstz17i: {
									fcut: 3,
									name: "BstZ17I",
									rcut: 3,
									rseq: "GTATAC"
								},
								bsu36i: {
									fcut: 2,
									name: "Bsu36I",
									rcut: 5,
									rseq: "CCTNAGG"
								},
								btgi: {
									fcut: 1,
									name: "BtgI",
									rcut: 5,
									rseq: "CCRYGG"
								},
								btgzi: {
									fcut: 16,
									name: "BtgZI",
									rcut: 20,
									rseq: "GCGATGNNNNNNNNNNNNNN"
								},
								btsci: {
									fcut: 7,
									name: "BtsCI",
									rcut: 5,
									rseq: "GGATGNN"
								},
								btsi: {
									fcut: 8,
									name: "BtsI",
									rcut: 6,
									rseq: "GCAGTGNN"
								},
								btsimuti: {
									fcut: 7,
									name: "BtsIMutI",
									rcut: 5,
									rseq: "CAGTGNN"
								},
								cac8i: {
									fcut: 3,
									name: "Cac8I",
									rcut: 3,
									rseq: "GCNNGC"
								},
								clai: {
									fcut: 2,
									name: "ClaI",
									rcut: 4,
									rseq: "ATCGAT"
								},
								cspci: {
									fcut: 37,
									name: "CspCI",
									rcut: 35,
									rseq: "NNNNNNNNNNNNNCAANNNNNGTGGNNNNNNNNNNNN"
								},
								cviaii: {
									fcut: 1,
									name: "CviAII",
									rcut: 3,
									rseq: "CATG"
								},
								"cviki-1": {
									fcut: 2,
									name: "CviKI-1",
									rcut: 2,
									rseq: "RGCY"
								},
								cviqi: {
									fcut: 1,
									name: "CviQI",
									rcut: 3,
									rseq: "GTAC"
								},
								ddei: {
									fcut: 1,
									name: "DdeI",
									rcut: 4,
									rseq: "CTNAG"
								},
								dpni: {
									fcut: 3,
									name: "DpnI",
									rcut: 3,
									rseq: "GmATC"
								},
								dpnii: {
									fcut: 0,
									name: "DpnII",
									rcut: 4,
									rseq: "GATC"
								},
								drai: {
									fcut: 3,
									name: "DraI",
									rcut: 3,
									rseq: "TTTAAA"
								},
								draiii: {
									fcut: 6,
									name: "DraIII",
									rcut: 3,
									rseq: "CACNNNGTG"
								},
								drdi: {
									fcut: 7,
									name: "DrdI",
									rcut: 5,
									rseq: "GACNNNNNNGTC"
								},
								eaei: {
									fcut: 1,
									name: "EaeI",
									rcut: 5,
									rseq: "YGGCCR"
								},
								eagi: {
									fcut: 1,
									name: "EagI",
									rcut: 5,
									rseq: "CGGCCG"
								},
								eari: {
									fcut: 7,
									name: "EarI",
									rcut: 10,
									rseq: "CTCTTCNNNN"
								},
								ecii: {
									fcut: 17,
									name: "EciI",
									rcut: 15,
									rseq: "GGCGGANNNNNNNNNNN"
								},
								eco53ki: {
									fcut: 3,
									name: "Eco53kI",
									rcut: 3,
									rseq: "GAGCTC"
								},
								econi: {
									fcut: 5,
									name: "EcoNI",
									rcut: 6,
									rseq: "CCTNNNNNAGG"
								},
								ecoo109i: {
									fcut: 2,
									name: "EcoO109I",
									rcut: 5,
									rseq: "RGGNCCY"
								},
								ecori: {
									fcut: 1,
									name: "EcoRI",
									rcut: 5,
									rseq: "GAATTC"
								},
								ecorv: {
									fcut: 3,
									name: "EcoRV",
									rcut: 3,
									rseq: "GATATC"
								},
								esp3i: {
									fcut: 7,
									name: "Esp3I",
									rcut: 11,
									rseq: "CGTCTCNNNNN"
								},
								fati: {
									fcut: 0,
									name: "FatI",
									rcut: 4,
									rseq: "CATG"
								},
								faui: {
									fcut: 9,
									name: "FauI",
									rcut: 11,
									rseq: "CCCGCNNNNNN"
								},
								fnu4hi: {
									fcut: 2,
									name: "Fnu4HI",
									rcut: 3,
									rseq: "GCNGC"
								},
								foki: {
									fcut: 14,
									name: "FokI",
									rcut: 18,
									rseq: "GGATGNNNNNNNNNNNNN"
								},
								fsei: {
									fcut: 6,
									name: "FseI",
									rcut: 2,
									rseq: "GGCCGGCC"
								},
								fspei: {
									fcut: 15,
									name: "FspEI",
									rcut: 19,
									rseq: "CmCNNNNNNNNNNNNNNNN"
								},
								fspi: {
									fcut: 3,
									name: "FspI",
									rcut: 3,
									rseq: "TGCGCA"
								},
								haeii: {
									fcut: 5,
									name: "HaeII",
									rcut: 1,
									rseq: "RGCGCY"
								},
								haeiii: {
									fcut: 2,
									name: "HaeIII",
									rcut: 2,
									rseq: "GGCC"
								},
								hgai: {
									fcut: 10,
									name: "HgaI",
									rcut: 15,
									rseq: "GACGCNNNNNNNNNN"
								},
								hhai: {
									fcut: 3,
									name: "HhaI",
									rcut: 1,
									rseq: "GCGC"
								},
								hincii: {
									fcut: 3,
									name: "HincII",
									rcut: 3,
									rseq: "GTYRAC"
								},
								hindiii: {
									fcut: 1,
									name: "HindIII",
									rcut: 5,
									rseq: "AAGCTT"
								},
								hinfi: {
									fcut: 1,
									name: "HinfI",
									rcut: 4,
									rseq: "GANTC"
								},
								hinp1i: {
									fcut: 1,
									name: "HinP1I",
									rcut: 3,
									rseq: "GCGC"
								},
								hpai: {
									fcut: 3,
									name: "HpaI",
									rcut: 3,
									rseq: "GTTAAC"
								},
								hpaii: {
									fcut: 1,
									name: "HpaII",
									rcut: 3,
									rseq: "CCGG"
								},
								hphi: {
									fcut: 13,
									name: "HphI",
									rcut: 12,
									rseq: "GGTGANNNNNNNN"
								},
								hpy166ii: {
									fcut: 3,
									name: "Hpy166II",
									rcut: 3,
									rseq: "GTNNAC"
								},
								hpy188i: {
									fcut: 3,
									name: "Hpy188I",
									rcut: 2,
									rseq: "TCNGA"
								},
								hpy188iii: {
									fcut: 2,
									name: "Hpy188III",
									rcut: 4,
									rseq: "TCNNGA"
								},
								hpy99i: {
									fcut: 5,
									name: "Hpy99I",
									rcut: 0,
									rseq: "CGWCG"
								},
								hpyav: {
									fcut: 11,
									name: "HpyAV",
									rcut: 10,
									rseq: "CCTTCNNNNNN"
								},
								hpych4iii: {
									fcut: 3,
									name: "HpyCH4III",
									rcut: 2,
									rseq: "ACNGT"
								},
								hpych4iv: {
									fcut: 1,
									name: "HpyCH4IV",
									rcut: 3,
									rseq: "ACGT"
								},
								hpych4v: {
									fcut: 2,
									name: "HpyCH4V",
									rcut: 2,
									rseq: "TGCA"
								},
								"i-ceui": {
									fcut: 18,
									name: "I-CeuI",
									rcut: 14,
									rseq: "TAACTATAACGGTCCTAAGGTAGCGAA"
								},
								"i-scei": {
									fcut: 9,
									name: "I-SceI",
									rcut: 5,
									rseq: "TAGGGATAACAGGGTAAT"
								},
								kasi: {
									fcut: 1,
									name: "KasI",
									rcut: 5,
									rseq: "GGCGCC"
								},
								kpni: {
									fcut: 5,
									name: "KpnI",
									rcut: 1,
									rseq: "GGTACC"
								},
								lpnpi: {
									fcut: 15,
									name: "LpnPI",
									rcut: 19,
									rseq: "CmCDGNNNNNNNNNNNNNN"
								},
								mboi: {
									fcut: 0,
									name: "MboI",
									rcut: 4,
									rseq: "GATC"
								},
								mboii: {
									fcut: 13,
									name: "MboII",
									rcut: 12,
									rseq: "GAAGANNNNNNNN"
								},
								mfei: {
									fcut: 1,
									name: "MfeI",
									rcut: 5,
									rseq: "CAATTG"
								},
								mluci: {
									fcut: 0,
									name: "MluCI",
									rcut: 4,
									rseq: "AATT"
								},
								mlui: {
									fcut: 1,
									name: "MluI",
									rcut: 5,
									rseq: "ACGCGT"
								},
								mlyi: {
									fcut: 10,
									name: "MlyI",
									rcut: 10,
									rseq: "GAGTCNNNNN"
								},
								mmei: {
									fcut: 26,
									name: "MmeI",
									rcut: 24,
									rseq: "TCCRACNNNNNNNNNNNNNNNNNNNN"
								},
								mnli: {
									fcut: 11,
									name: "MnlI",
									rcut: 10,
									rseq: "CCTCNNNNNNN"
								},
								msci: {
									fcut: 3,
									name: "MscI",
									rcut: 3,
									rseq: "TGGCCA"
								},
								msei: {
									fcut: 1,
									name: "MseI",
									rcut: 3,
									rseq: "TTAA"
								},
								msli: {
									fcut: 5,
									name: "MslI",
									rcut: 5,
									rseq: "CAYNNNNRTG"
								},
								mspa1i: {
									fcut: 3,
									name: "MspA1I",
									rcut: 3,
									rseq: "CMGCKG"
								},
								mspi: {
									fcut: 1,
									name: "MspI",
									rcut: 3,
									rseq: "CCGG"
								},
								mspji: {
									fcut: 14,
									name: "MspJI",
									rcut: 18,
									rseq: "mCNNRNNNNNNNNNNNNN"
								},
								mwoi: {
									fcut: 7,
									name: "MwoI",
									rcut: 4,
									rseq: "GCNNNNNNNGC"
								},
								naei: {
									fcut: 3,
									name: "NaeI",
									rcut: 3,
									rseq: "GCCGGC"
								},
								nari: {
									fcut: 2,
									name: "NarI",
									rcut: 4,
									rseq: "GGCGCC"
								},
								ncii: {
									fcut: 2,
									name: "NciI",
									rcut: 3,
									rseq: "CCSGG"
								},
								ncoi: {
									fcut: 1,
									name: "NcoI",
									rcut: 5,
									rseq: "CCATGG"
								},
								ndei: {
									fcut: 2,
									name: "NdeI",
									rcut: 4,
									rseq: "CATATG"
								},
								ngomiv: {
									fcut: 1,
									name: "NgoMIV",
									rcut: 5,
									rseq: "GCCGGC"
								},
								nhei: {
									fcut: 1,
									name: "NheI",
									rcut: 5,
									rseq: "GCTAGC"
								},
								nlaiii: {
									fcut: 4,
									name: "NlaIII",
									rcut: 0,
									rseq: "CATG"
								},
								nlaiv: {
									fcut: 3,
									name: "NlaIV",
									rcut: 3,
									rseq: "GGNNCC"
								},
								nmeaiii: {
									fcut: 26,
									name: "NmeAIII",
									rcut: 25,
									rseq: "GCCGAGNNNNNNNNNNNNNNNNNNNN"
								},
								noti: {
									fcut: 2,
									name: "NotI",
									rcut: 6,
									rseq: "GCGGCCGC"
								},
								nrui: {
									fcut: 3,
									name: "NruI",
									rcut: 3,
									rseq: "TCGCGA"
								},
								nsii: {
									fcut: 5,
									name: "NsiI",
									rcut: 1,
									rseq: "ATGCAT"
								},
								nspi: {
									fcut: 5,
									name: "NspI",
									rcut: 1,
									rseq: "RCATGY"
								},
								paci: {
									fcut: 5,
									name: "PacI",
									rcut: 3,
									rseq: "TTAATTAA"
								},
								paer7i: {
									fcut: 1,
									name: "PaeR7I",
									rcut: 5,
									rseq: "CTCGAG"
								},
								pcii: {
									fcut: 1,
									name: "PciI",
									rcut: 5,
									rseq: "ACATGT"
								},
								pflfi: {
									fcut: 4,
									name: "PflFI",
									rcut: 5,
									rseq: "GACNNNGTC"
								},
								pflmi: {
									fcut: 7,
									name: "PflMI",
									rcut: 4,
									rseq: "CCANNNNNTGG"
								},
								"pi-pspi": {
									fcut: 17,
									name: "PI-PspI",
									rcut: 13,
									rseq: "TGGCAAACAGCTATTATGGGTATTATGGGT"
								},
								"pi-scei": {
									fcut: 15,
									name: "PI-SceI",
									rcut: 11,
									rseq: "ATCTATGTCGGGTGCGGAGAAAGAGGTAATGAAATGG"
								},
								plei: {
									fcut: 9,
									name: "PleI",
									rcut: 10,
									rseq: "GAGTCNNNNN"
								},
								pluti: {
									fcut: 5,
									name: "PluTI",
									rcut: 1,
									rseq: "GGCGCC"
								},
								pmei: {
									fcut: 4,
									name: "PmeI",
									rcut: 4,
									rseq: "GTTTAAAC"
								},
								pmli: {
									fcut: 3,
									name: "PmlI",
									rcut: 3,
									rseq: "CACGTG"
								},
								ppumi: {
									fcut: 2,
									name: "PpuMI",
									rcut: 5,
									rseq: "RGGWCCY"
								},
								pshai: {
									fcut: 5,
									name: "PshAI",
									rcut: 5,
									rseq: "GACNNNNGTC"
								},
								psii: {
									fcut: 3,
									name: "PsiI",
									rcut: 3,
									rseq: "TTATAA"
								},
								pspgi: {
									fcut: 0,
									name: "PspGI",
									rcut: 5,
									rseq: "CCWGG"
								},
								pspomi: {
									fcut: 1,
									name: "PspOMI",
									rcut: 5,
									rseq: "GGGCCC"
								},
								pspxi: {
									fcut: 2,
									name: "PspXI",
									rcut: 6,
									rseq: "VCTCGAGB"
								},
								psti: {
									fcut: 5,
									name: "PstI",
									rcut: 1,
									rseq: "CTGCAG"
								},
								pvui: {
									fcut: 4,
									name: "PvuI",
									rcut: 2,
									rseq: "CGATCG"
								},
								pvuii: {
									fcut: 3,
									name: "PvuII",
									rcut: 3,
									rseq: "CAGCTG"
								},
								rsai: {
									fcut: 2,
									name: "RsaI",
									rcut: 2,
									rseq: "GTAC"
								},
								rsrii: {
									fcut: 2,
									name: "RsrII",
									rcut: 5,
									rseq: "CGGWCCG"
								},
								saci: {
									fcut: 5,
									name: "SacI",
									rcut: 1,
									rseq: "GAGCTC"
								},
								sacii: {
									fcut: 4,
									name: "SacII",
									rcut: 2,
									rseq: "CCGCGG"
								},
								sali: {
									fcut: 1,
									name: "SalI",
									rcut: 5,
									rseq: "GTCGAC"
								},
								sapi: {
									fcut: 8,
									name: "SapI",
									rcut: 11,
									rseq: "GCTCTTCNNNN"
								},
								sau3ai: {
									fcut: 0,
									name: "Sau3AI",
									rcut: 4,
									rseq: "GATC"
								},
								sau96i: {
									fcut: 1,
									name: "Sau96I",
									rcut: 4,
									rseq: "GGNCC"
								},
								sbfi: {
									fcut: 6,
									name: "SbfI",
									rcut: 2,
									rseq: "CCTGCAGG"
								},
								scai: {
									fcut: 3,
									name: "ScaI",
									rcut: 3,
									rseq: "AGTACT"
								},
								scrfi: {
									fcut: 2,
									name: "ScrFI",
									rcut: 3,
									rseq: "CCNGG"
								},
								sexai: {
									fcut: 1,
									name: "SexAI",
									rcut: 6,
									rseq: "ACCWGGT"
								},
								sfani: {
									fcut: 10,
									name: "SfaNI",
									rcut: 14,
									rseq: "GCATCNNNNNNNNN"
								},
								sfci: {
									fcut: 1,
									name: "SfcI",
									rcut: 5,
									rseq: "CTRYAG"
								},
								sfii: {
									fcut: 8,
									name: "SfiI",
									rcut: 5,
									rseq: "GGCCNNNNNGGCC"
								},
								sfoi: {
									fcut: 3,
									name: "SfoI",
									rcut: 3,
									rseq: "GGCGCC"
								},
								sgrai: {
									fcut: 2,
									name: "SgrAI",
									rcut: 6,
									rseq: "CRCCGGYG"
								},
								smai: {
									fcut: 3,
									name: "SmaI",
									rcut: 3,
									rseq: "CCCGGG"
								},
								smli: {
									fcut: 1,
									name: "SmlI",
									rcut: 5,
									rseq: "CTYRAG"
								},
								snabi: {
									fcut: 3,
									name: "SnaBI",
									rcut: 3,
									rseq: "TACGTA"
								},
								spei: {
									fcut: 1,
									name: "SpeI",
									rcut: 5,
									rseq: "ACTAGT"
								},
								sphi: {
									fcut: 5,
									name: "SphI",
									rcut: 1,
									rseq: "GCATGC"
								},
								srfi: {
									fcut: 4,
									name: "SrfI",
									rcut: 4,
									rseq: "GCCCGGGC"
								},
								sspi: {
									fcut: 3,
									name: "SspI",
									rcut: 3,
									rseq: "AATATT"
								},
								stui: {
									fcut: 3,
									name: "StuI",
									rcut: 3,
									rseq: "AGGCCT"
								},
								styd4i: {
									fcut: 0,
									name: "StyD4I",
									rcut: 5,
									rseq: "CCNGG"
								},
								styi: {
									fcut: 1,
									name: "StyI",
									rcut: 5,
									rseq: "CCWWGG"
								},
								swai: {
									fcut: 4,
									name: "SwaI",
									rcut: 4,
									rseq: "ATTTAAAT"
								},
								taqi: {
									fcut: 1,
									name: "TaqI",
									rcut: 3,
									rseq: "TCGA"
								},
								tfii: {
									fcut: 1,
									name: "TfiI",
									rcut: 4,
									rseq: "GAWTC"
								},
								tsei: {
									fcut: 1,
									name: "TseI",
									rcut: 4,
									rseq: "GCWGC"
								},
								tsp45i: {
									fcut: 0,
									name: "Tsp45I",
									rcut: 5,
									rseq: "GTSAC"
								},
								tspmi: {
									fcut: 1,
									name: "TspMI",
									rcut: 5,
									rseq: "CCCGGG"
								},
								tspri: {
									fcut: 9,
									name: "TspRI",
									rcut: 0,
									rseq: "NNCASTGNN"
								},
								tth111i: {
									fcut: 4,
									name: "Tth111I",
									rcut: 5,
									rseq: "GACNNNGTC"
								},
								xbai: {
									fcut: 1,
									name: "XbaI",
									rcut: 5,
									rseq: "TCTAGA"
								},
								xcmi: {
									fcut: 8,
									name: "XcmI",
									rcut: 7,
									rseq: "CCANNNNNNNNNTGG"
								},
								xhoi: {
									fcut: 1,
									name: "XhoI",
									rcut: 5,
									rseq: "CTCGAG"
								},
								xmai: {
									fcut: 1,
									name: "XmaI",
									rcut: 5,
									rseq: "CCCGGG"
								},
								xmni: {
									fcut: 5,
									name: "XmnI",
									rcut: 5,
									rseq: "GAANNNNTTC"
								},
								zrai: {
									fcut: 3,
									name: "ZraI",
									rcut: 3,
									rseq: "GACGTC"
								}
							};
						}),
						((__unused_webpack_module, exports$35, __webpack_require__) => {
							Object.defineProperty(exports$35, "__esModule", { value: true });
							exports$35.createRegex = void 0;
							var sequence_1 = __webpack_require__(11);
							/**
							* Search the seq in the forward and reverse complement strands.
							* Return all matched regions. Accounts for abiguous BP encodings and allows for mismatches
							*/
							exports$35["default"] = (function(query, mismatch, seq, seqType) {
								if (mismatch === void 0) mismatch = 0;
								if (seq === void 0) seq = "";
								if (!query || !query.length || !seq || !seq.length) return [];
								if (query.length - mismatch < 2) return [];
								var indices = search(query, seq, mismatch, true, seqType);
								if (["dna", "rna"].includes(seqType)) {
									var compSeq = (0, sequence_1.complement)(seq, seqType).compSeq;
									var compIndices = search((0, sequence_1.reverse)(query), compSeq, mismatch, false, seqType);
									indices.push.apply(indices, compIndices);
								}
								if (indices.length > 4e3) {
									console.error("Search too broad: >4000 matches. Please narrow parameters.");
									return [];
								}
								return indices.sort(function(a, b) {
									return a.start - b.start;
								});
							});
							/**
							* If there's no mismatch, just use a RegExp to search over the sequence repeatedly
							* Otherwise, use the modified hamming search in `searchWithMismatch()`
							*/
							var search = function(query, subject, mismatch, fwd, seqType) {
								if (mismatch > 0) return searchWithMismatch(query, subject, mismatch, fwd, seqType);
								var seqLength = subject.length;
								var regex = (0, exports$35.createRegex)(query, seqType);
								var match = regex.exec(subject);
								var results = [];
								while (match) {
									var start = match.index % seqLength;
									var end = (start + query.length) % seqLength || seqLength;
									results.push({
										direction: fwd ? 1 : -1,
										end,
										id: "".concat(start, "-").concat(fwd ? "fwd" : "rev"),
										name: "",
										start
									});
									match = regex.exec(subject);
								}
								return results;
							};
							/**
							* A slightly modified Hamming Distance algorithm for approximate string Matching for patterns
							*/
							var searchWithMismatch = function(query, subject, mismatch, fwd, seqType) {
								var alphabet = (0, sequence_1.getAlphabet)(seqType);
								var results = [];
								for (var i = 0; i < subject.length - query.length; i += 1) {
									var missed = 0;
									for (var j = 0; j < query.length; j += 1) {
										var targetChar = subject[i + j].toLowerCase();
										var queryChar = query[j].toLowerCase();
										if (sequence_1.nucleotides[queryChar]) {
											if (targetChar !== queryChar) missed += 1;
										} else if (alphabet[queryChar]) {
											if (!alphabet[queryChar][targetChar]) missed += 1;
										}
										if (missed > mismatch) break;
									}
									if (missed <= mismatch) {
										var end = (i + query.length) % subject.length || subject.length;
										results.push({
											direction: fwd ? 1 : -1,
											end,
											id: "".concat(i, "-").concat(fwd ? "fwd" : "rev"),
											name: "",
											start: i
										});
									}
								}
								return results;
							};
							/**
							* Translate common symbols to their wildcards to build up a regex. The regex is case insensitive.
							*
							* Eg "N" matches [ATGCU]. So a query of "ANN" maps to "A(A|T|G|C|U)(A|T|G|C|U)"
							*/
							var createRegex = function(query, seqType) {
								var alphabet = (0, sequence_1.getAlphabet)(seqType);
								var pattern = query.toLowerCase().split("").map(function(symbol) {
									return alphabet[symbol] ? "(".concat(Object.keys(alphabet[symbol]).join("|"), ")") : symbol;
								}).join("");
								return new RegExp(pattern.trim(), "gi");
							};
							exports$35.createRegex = createRegex;
						}),
						((module$4) => {
							module$4.exports = require_webfontloader();
						}),
						(function(__unused_webpack_module, exports$36, __webpack_require__) {
							var __assign = this && this.__assign || function() {
								__assign = Object.assign || function(t) {
									for (var s, i = 1, n = arguments.length; i < n; i++) {
										s = arguments[i];
										for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
									}
									return t;
								};
								return __assign.apply(this, arguments);
							};
							Object.defineProperty(exports$36, "__esModule", { value: true });
							var React = __webpack_require__(2);
							var client_1 = __webpack_require__(41);
							var SeqViz_1 = __webpack_require__(34);
							/**
							* Create a Viewer bound to a DOM element. Returns `render`, `setState` and a live
							* `element` getter. The node entrypoint layers `renderToString` on top of this via
							* `element`; the browser entrypoint exposes only `render` and `setState`.
							*/
							var createBaseViewer = function(element, options) {
								if (element === void 0) element = "root";
								var root = null;
								var domElement;
								if (!document) return;
								if (typeof element === "string") {
									if (document.getElementById(element)) domElement = document.getElementById(element);
									else throw new Error("Failed to find an element with ID: ".concat(element));
								} else domElement = element;
								var viewer = React.createElement(SeqViz_1.default, options, null);
								/**
								* Render the Viewer to the element passed
								*/
								var render = function() {
									if (!root && domElement) root = (0, client_1.createRoot)(domElement);
									root === null || root === void 0 || root.render(viewer);
									return viewer;
								};
								/**
								* Update the viewer with new settings. Re-renders if render was already called.
								*/
								var setState = function(state) {
									options = __assign(__assign({}, options), state);
									viewer = React.createElement(SeqViz_1.default, options, null);
									if (root) root.render(viewer);
									return viewer;
								};
								return {
									get element() {
										return viewer;
									},
									render,
									setState
								};
							};
							exports$36["default"] = createBaseViewer;
						}),
						((module$5) => {
							module$5.exports = require("react-dom/client");
						})
					];
					var __webpack_module_cache__ = {};
					function __webpack_require__(moduleId) {
						var cachedModule = __webpack_module_cache__[moduleId];
						if (cachedModule !== void 0) return cachedModule.exports;
						var module$6 = __webpack_module_cache__[moduleId] = { exports: {} };
						__webpack_modules__[moduleId].call(module$6.exports, module$6, module$6.exports, __webpack_require__);
						return module$6.exports;
					}
					var __webpack_exports__ = {};
					(() => {
						var exports$37 = __webpack_exports__;
						Object.defineProperty(exports$37, "__esModule", { value: true });
						exports$37.Viewer = exports$37.SeqViz = exports$37.Linear = exports$37.Enzymes = exports$37.Circular = void 0;
						exports$37.Circular = __webpack_require__(1).default;
						exports$37.Linear = __webpack_require__(8).default;
						var SeqViz_1 = __webpack_require__(34);
						exports$37.SeqViz = SeqViz_1.default;
						exports$37.Enzymes = __webpack_require__(37).default;
						var baseViewer_1 = __webpack_require__(40);
						exports$37["default"] = SeqViz_1.default;
						/**
						* Return a Viewer object with two properties:
						*  - `render` to an HTML element
						*  - `setState(options)` to update the viewer's internal state
						*/
						var Viewer = function(element, options) {
							if (element === void 0) element = "root";
							var baseViewer = (0, baseViewer_1.default)(element, options);
							if (!baseViewer) return;
							return {
								render: baseViewer.render,
								setState: baseViewer.setState
							};
						};
						exports$37.Viewer = Viewer;
					})();
					return __webpack_exports__;
				})();
			});
		})))();
		/** Extract the lowercase extension (no leading dot) from a workspace-relative
		*  path; '' when absent. Mirrors dsh-file-explorer's `extensionOf`. */
		function extensionOf(filePath) {
			const lastDot = filePath.lastIndexOf(".");
			if (lastDot === -1 || lastDot === filePath.length - 1) return "";
			return filePath.slice(lastDot + 1).toLowerCase();
		}
		/** Human-readable format label for an extension, or null when unknown. */
		function formatLabelFor(ext) {
			const key = ext.toLowerCase();
			if (!(key in SEQUENCE_FORMATS)) return null;
			return SEQUENCE_FORMATS[key];
		}
		/** Ambiguous extensions: when parsing fails, render plain text instead of an
		*  error (so generic `.xml` / non-JBEI `.seq` files still preview). */
		function fallsBackToText(ext) {
			const key = ext.toLowerCase();
			return key === "xml" || key === "seq";
		}
		//#endregion
		//#region src/client/parse.ts
		var import_dist = require_dist();
		/** Parse file content (string) into a unified Seq. Uses seqparse's `parseFile`
		*  (not its default export) so a non-empty `fileName` drives extension-based
		*  disambiguation (.seq/.xml) and the accession-ID fetch branch is never hit. */
		async function parseSequence(content, fileName) {
			const seqs = (0, import_dist.parseFile)(content, { fileName });
			if (seqs.length === 0) throw new Error(`no sequence parsed from ${fileName}`);
			return seqs[0];
		}
		/**
		* Parse raw bytes (ArrayBuffer) into a unified Seq. For text-based formats
		* (FASTA, GenBank, JBEI, SBOL) the buffer is decoded via TextDecoder first.
		* For SnapGene (.dna) the buffer is passed directly to seqparse.
		*/
		async function parseSequenceFromBuffer(buffer, fileName) {
			if ((fileName.includes(".") ? fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() : "") === "dna") try {
				const seqs = (0, import_dist.parseFile)("", {
					fileName,
					source: buffer
				});
				if (seqs.length > 0) return seqs[0];
			} catch {}
			return parseSequence(new TextDecoder().decode(buffer), fileName);
		}
		/** Normalize seqparse annotations into SeqViz's AnnotationProp shape, dropping
		*  the `type` field (SeqViz has no type). direction/color are kept only when
		*  defined. */
		function toSeqvizAnnotations(annotations) {
			return annotations.map((a) => ({
				name: a.name,
				start: a.start,
				end: a.end,
				...a.direction !== void 0 ? { direction: a.direction } : {},
				...a.color !== void 0 ? { color: a.color } : {}
			}));
		}
		//#endregion
		//#region src/client/SequencePreview.tsx
		const TOPOLOGIES = [
			{
				id: "both",
				labelKey: "both"
			},
			{
				id: "circular",
				labelKey: "circular"
			},
			{
				id: "linear",
				labelKey: "linear"
			},
			{
				id: "both_flip",
				labelKey: "bothFlip"
			}
		];
		const ENZYME_CHOICES = [
			"PstI",
			"EcoRI",
			"XbaI",
			"SpeI",
			"NotI",
			"HindIII",
			"BamHI",
			"XhoI"
		];
		function makeSequencePreview(readRaw, t) {
			return function SequencePreview({ preview, filePath, onViewSource }) {
				const [state, setState] = (0, react.useState)({ phase: "loading" });
				const [viewer, setViewer] = (0, react.useState)("both");
				const [zoom, setZoom] = (0, react.useState)(50);
				const [showComplement, setShowComplement] = (0, react.useState)(true);
				const [showIndex, setShowIndex] = (0, react.useState)(true);
				const [enzymes, setEnzymes] = (0, react.useState)([...ENZYME_CHOICES]);
				const [query, setQuery] = (0, react.useState)("");
				const [selection, setSelection] = (0, react.useState)("");
				const ext = extensionOf(filePath);
				const formatLabel = formatLabelFor(ext);
				const previewable = preview.kind === "text" || preview.kind === "binary" || preview.kind === "too-large";
				(0, react.useEffect)(() => {
					if (!previewable) return;
					let cancelled = false;
					setState({ phase: "loading" });
					(async () => {
						try {
							if (preview.kind === "text") {
								const seq = await parseSequence(preview.content, preview.name);
								if (!cancelled) setState({
									phase: "ready",
									seq
								});
							} else {
								if (readRaw === void 0) {
									if (!cancelled) setState({ phase: "unsupported" });
									return;
								}
								const seq = await parseSequenceFromBuffer(await readRaw(filePath), preview.name);
								if (!cancelled) setState({
									phase: "ready",
									seq
								});
							}
						} catch (error) {
							if (cancelled) return;
							if (preview.kind === "text" && fallsBackToText(ext)) setState({
								phase: "plain",
								content: preview.content
							});
							else setState({
								phase: "error",
								message: error instanceof Error ? error.message : String(error)
							});
						}
					})();
					return () => {
						cancelled = true;
					};
				}, [
					preview,
					filePath,
					ext,
					previewable,
					readRaw,
					t
				]);
				if (!previewable) return null;
				const toggleEnzyme = (enzyme) => {
					setEnzymes((prev) => prev.includes(enzyme) ? prev.filter((e) => e !== enzyme) : [...prev, enzyme]);
				};
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "dsh-sq",
					children: [
						state.phase === "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "dsh-sq-toolbar",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
										className: "dsh-sq-select",
										value: viewer,
										onChange: (e) => setViewer(e.target.value),
										title: t("topology"),
										children: TOPOLOGIES.map((opt) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
											value: opt.id,
											children: t(opt.labelKey)
										}, opt.id))
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: "dsh-sq-field",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("search") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											className: "dsh-sq-input",
											value: query,
											onChange: (e) => setQuery(e.target.value),
											placeholder: t("searchPlaceholder")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: "dsh-sq-field",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("zoom") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											className: "dsh-sq-range",
											type: "range",
											min: 1,
											max: 100,
											value: zoom,
											onChange: (e) => setZoom(Number(e.target.value))
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: "dsh-sq-check",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: showComplement,
											onChange: (e) => setShowComplement(e.target.checked)
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("complement") })]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: "dsh-sq-check",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: showIndex,
											onChange: (e) => setShowIndex(e.target.checked)
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("index") })]
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsh-sq-enzymes",
								children: ENZYME_CHOICES.map((enzyme) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `dsh-sq-chip${enzymes.includes(enzyme) ? " is-active" : ""}`,
									onClick: () => toggleEnzyme(enzyme),
									children: enzyme
								}, enzyme))
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "dsh-sq-viewport",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(import_index_browser.SeqViz, {
									name: state.seq.name,
									seq: state.seq.seq,
									seqType: state.seq.type === "unknown" ? void 0 : state.seq.type,
									annotations: toSeqvizAnnotations(state.seq.annotations),
									viewer,
									zoom: { linear: zoom },
									showComplement,
									showIndex,
									enzymes,
									search: query ? { query } : void 0,
									onSelection: (sel) => setSelection(sel.start !== void 0 && sel.end !== void 0 ? `${sel.start}–${sel.end}` : ""),
									disableExternalFonts: true
								})
							})
						] }),
						state.phase === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsh-sq-overlay",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "dsh-sq-spinner" }), t("loading")]
						}),
						state.phase === "plain" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							className: "dsh-sq-plain",
							children: state.content
						}),
						state.phase === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsh-sq-overlay is-error",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
								t("loadError"),
								": ",
								state.message
							] }), onViewSource && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "dsh-sq-btn",
								onClick: onViewSource,
								children: t("viewSource")
							})]
						}),
						state.phase === "unsupported" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "dsh-sq-overlay is-error",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: t("unsupportedYet") })
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "dsh-sq-status",
							children: [
								formatLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "dsh-sq-format",
									children: formatLabel
								}),
								state.phase === "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
									state.seq.name,
									" · ",
									state.seq.type,
									" · ",
									state.seq.seq.length,
									" ",
									state.seq.type === "aa" ? t("aa") : t("bp"),
									selection && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
										" · ",
										t("selection"),
										": ",
										selection
									] })
								] }),
								state.phase === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("loading") })
							]
						})
					]
				});
			};
		}
		//#endregion
		//#region src/client/locale.ts
		/** Locale namespace owning the viewer toolbar/status copy. */
		const SEQ_NS = "file-explorer-preview-sequence";
		const ZH = {
			loading: "解析中…",
			loadError: "解析失败",
			unsupportedYet: "暂不支持预览此文件（二进制或文件过大）",
			viewSource: "查看源文件",
			topology: "拓扑",
			both: "环状 + 线性",
			circular: "环状",
			linear: "线性",
			bothFlip: "线性 + 环状",
			search: "搜索",
			searchPlaceholder: "搜索序列…",
			zoom: "缩放",
			complement: "互补链",
			index: "刻度",
			enzymes: "酶切位点",
			bp: "bp",
			aa: "aa",
			selection: "选中"
		};
		const EN = {
			loading: "Loading…",
			loadError: "Failed to load",
			unsupportedYet: "Cannot preview this file yet (binary or too large)",
			viewSource: "View source",
			topology: "Topology",
			both: "Circular + Linear",
			circular: "Circular",
			linear: "Linear",
			bothFlip: "Linear + Circular",
			search: "Search",
			searchPlaceholder: "Search sequence…",
			zoom: "Zoom",
			complement: "Complement",
			index: "Index",
			enzymes: "Enzymes",
			bp: "bp",
			aa: "aa",
			selection: "Selection"
		};
		/** Register the plugin's zh/en dictionaries; returns a disposer for both. */
		function registerSequenceLocale(ctx) {
			const d1 = ctx.locale.register(SEQ_NS, "zh", ZH);
			const d2 = ctx.locale.register(SEQ_NS, "en", EN);
			return () => {
				d1();
				d2();
			};
		}
		//#endregion
		//#region src/client/styles.ts
		/** Viewer styles injected as a <style> tag (external plugins cannot import CSS modules). */
		const VIEWER_CSS = `
.dsh-sq { display: flex; flex-direction: column; height: 100%; min-height: 0; font-family: system-ui, -apple-system, sans-serif; }
.dsh-sq-toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; flex-shrink: 0; padding: 4px 8px; border-bottom: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-layer-1, #f5f5f5); user-select: none; }
.dsh-sq-select { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-base, #fff); color: var(--dsw-alias-label-primary, #333); border-radius: 4px; padding: 2px 4px; font-size: 12px; line-height: 18px; }
.dsh-sq-field { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--dsw-alias-label-secondary, #666); }
.dsh-sq-input { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-base, #fff); color: var(--dsw-alias-label-primary, #333); border-radius: 4px; padding: 2px 6px; font-size: 12px; width: 140px; }
.dsh-sq-range { width: 80px; }
.dsh-sq-check { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--dsw-alias-label-secondary, #666); }
.dsh-sq-enzymes { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; flex-shrink: 0; padding: 2px 8px; border-bottom: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-layer-1, #f5f5f5); }
.dsh-sq-chip { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: transparent; color: var(--dsw-alias-label-primary, #333); border-radius: 10px; padding: 1px 8px; font-size: 11px; line-height: 16px; cursor: pointer; }
.dsh-sq-chip.is-active { background: var(--dsw-alias-state-business-primary, #4a90d9); color: #fff; border-color: transparent; }
.dsh-sq-viewport { flex: 1; min-height: 0; overflow: auto; }
.dsh-sq-plain { margin: 0; padding: 8px; font-size: 12px; white-space: pre-wrap; word-break: break-all; overflow: auto; height: 100%; box-sizing: border-box; color: var(--dsw-alias-label-primary, #333); }
.dsh-sq-overlay { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--dsw-alias-label-secondary, #666); font-size: 12px; }
.dsh-sq-overlay.is-error { color: var(--dsw-alias-state-error, #d32f2f); }
.dsh-sq-spinner { width: 20px; height: 20px; border: 2px solid var(--dsw-alias-border-l2, #0000001a); border-top-color: var(--dsw-alias-state-business-primary, #4a90d9); border-radius: 50%; animation: dsh-sq-spin 0.8s linear infinite; }
@keyframes dsh-sq-spin { to { transform: rotate(360deg); } }
.dsh-sq-btn { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: transparent; color: var(--dsw-alias-label-primary, #333); border-radius: 4px; padding: 2px 8px; cursor: pointer; font-size: 12px; line-height: 18px; }
.dsh-sq-status { display: flex; align-items: center; gap: 8px; flex-shrink: 0; padding: 2px 8px; border-top: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-layer-1, #f5f5f5); font-size: 12px; color: var(--dsw-alias-label-secondary, #666); }
.dsh-sq-format { background: var(--dsw-alias-state-business-primary, #4a90d9); color: #fff; border-radius: 3px; padding: 0 6px; font-size: 11px; line-height: 16px; }
`;
		//#endregion
		//#region src/client/index.ts
		const inject = ["fileExplorer", "locale"];
		function apply(ctx) {
			const styleEl = document.createElement("style");
			styleEl.setAttribute("data-sequence-preview-style", "");
			styleEl.textContent = VIEWER_CSS;
			document.head.appendChild(styleEl);
			ctx.effect(() => {
				const disposeLocale = registerSequenceLocale(ctx);
				const t = ctx.locale.bind(SEQ_NS);
				const component = makeSequencePreview(typeof ctx.fileExplorer.readRawFile === "function" ? ctx.fileExplorer.readRawFile : void 0, t);
				const disposers = SEQUENCE_EXTS.map((ext) => ctx.fileExplorer.registerPreview(ext, component, 10));
				return () => {
					for (const dispose of disposers) dispose();
					disposeLocale();
					styleEl.remove();
				};
			}, "file-explorer-preview-sequence: client");
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map