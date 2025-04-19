<script>
	import { theme } from '$lib/stores/theme';
</script>

<div class="logo">
	<svg id="logo-svg" xmlns="http://www.w3.org/2000/svg" href="/" data-theme={$theme}>
		<g id="g" transform="translate(0, 115) scale(0.02, -0.02)">
			<path
				d="M300 3600 l0 -60 -150 0 c-116 0 -150 -3 -150 -13 0 -7 47 -348 105
-757 l105 -744 -50 -880 c-27 -485 -52 -914 -55 -954 l-6 -72 190 0 190 0 7
-60 7 -60 305 2 306 3 57 370 c31 204 60 393 64 420 l8 50 11 -45 12 -45 230
-3 229 -2 19 85 c10 47 22 85 25 85 4 0 38 -207 76 -460 l70 -460 297 0 296 0
6 30 c3 16 9 43 12 60 l5 30 177 2 177 3 -48 850 -48 849 126 831 c70 456 129
842 132 858 l6 27 -181 0 -181 0 -3 58 -3 57 -317 3 c-175 1 -318 1 -318 -1 0
-10 -181 -805 -187 -817 -3 -8 -12 23 -19 70 -8 47 -19 115 -25 153 l-11 67
-276 -2 -277 -3 -33 -210 c-19 -115 -37 -218 -41 -228 -4 -12 -50 166 -120
465 -63 266 -116 489 -119 496 -3 9 -76 12 -318 12 l-314 0 0 -60z m525 -1159
c102 -399 185 -736 185 -749 0 -14 -40 -277 -90 -584 -49 -308 -90 -562 -91
-566 -1 -4 -44 326 -96 733 l-94 740 -2 582 c-1 321 -1 580 0 575 1 -4 86
-333 188 -731z m1485 -41 c6 -190 17 -444 25 -565 l14 -220 -75 -534 c-40
-294 -75 -535 -76 -537 -2 -1 -50 303 -107 676 l-103 678 153 642 154 643 2
-219 c1 -121 7 -374 13 -564z m-740 -194 l57 -379 -58 -261 c-33 -144 -62
-269 -67 -279 -5 -12 -27 67 -65 230 -31 136 -57 257 -57 268 0 42 125 838
129 820 2 -11 29 -191 61 -399z"
			/>
		</g></svg
	>
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.logo {
		width: auto;
		height: 100%;

		display: flex;
		align-items: center;

		@include for-phone-only {
			gap: 8px;
		}

		#logo-svg {
			width: auto;
			height: auto;
			max-height: auto;
			fill: var(--color--text);
			transform: translate(0, 115) scale(0.02, -0.02);
		}
		&:hover {
			#logo-svg {
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}
	}

	@media screen and (prefers-reduced-motion: no-preference) {
		.animated {
			#icon {
				> path {
					--text-color: var(--color--text-shade);
					stroke-width: 2;
					animation: svg-text-stroke 3s;
				}

				#darker {
					> path {
						--text-color: var(--color--text);
						stroke-width: 2;
						animation: svg-text-stroke 3s;
					}
				}
			}
		}
	}
</style>
