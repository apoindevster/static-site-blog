<script>
	import SparklingHighlight from '$lib/components/molecules/SparklingHighlight.svelte';
	import Socials from '$lib/components/molecules/Socials.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="about">
	<div class="info">
		<h3>Tech Enthusiast and Developer documenting things to inspire other's self-betterment</h3>
		<p>
			I try to inspire those around me to push the boundary of what they know and/or do each day.
			Part of that includes documenting things I find interesting in hopes that others will learn as
			well.
		</p>
		<div class="socials">
			<span>Socials:</span>
			<Socials />
		</div>
	</div>
</section>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	#about {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 50px;
		padding: 0px 20px 50px 20px;
		border-bottom: 1px solid;

		@include for-phone-only {
			padding: 20px 10px 50px 10px;
			// border-bottom: 1px solid;
			gap: 20px;
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: 10px;
			h2 {
				@include for-phone-only {
					text-align: center;
				}
			}

			p {
				@include for-phone-only {
					text-align: justify;
				}
			}

			@include for-phone-only {
				gap: 20px;
			}
		}

		.socials {
			display: flex;
			align-items: center;
			gap: 15px;

			@include for-phone-only {
				justify-content: center;
				margin-bottom: 10px;
				span {
					display: none;
				}
			}
		}
	}
</style>
