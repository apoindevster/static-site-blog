<script>
	import ExternalLink from '$lib/icons/external-link.svelte';
	import FeaturesIcon from '$lib/icons/features.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import BlogIcon from '$lib/icons/blog.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="hero">
	<div class="image">
		<Image src="/images/profile.webp" alt="Image of Matt" />
	</div>
	<div class="functions">
		<h1 class="hello">Hello, I'm Matt</h1>
		<p class="intro">
			<span class="left"> Husband. Father. </span>
			<span class="right"> Developer. Homelabber. </span>
		</p>
		<div class="ctas">
			<!-- <Sparkles>
				<Button href="https://github.com/matfantinel/sveltekit-static-blog-template">
					<GitHubIcon slot="icon" />
					Source Code
				</Button>
			</Sparkles> -->
			<Button color="primary" href="https://linktree.weiler.xyz">
				<ExternalLink slot="icon" />
				LinkTree
			</Button>
			<Button color="secondary" href="/blog">
				<BlogIcon slot="icon" />
				Blog
			</Button>
			<!-- <Button color="primary" href="https://histoire-sveltekit-static-blog-template.vercel.app/">
				<FeaturesIcon slot="icon" />
				Components
			</Button> -->
		</div>
	</div>
</section>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	#hero {
		display: grid;
		grid-template-columns: 250px 500px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		position: relative;
		padding: 80px 0;

		@include for-phone-only {
			display: flex;
			padding: 40px 0 50px;
		}
		.functions {
			.hello {
				text-align: center;
			}

			.intro {
				font-weight: 500;
				font-size: 1.4rem;
				width: min(100%, 440px);
				display: flex;
				flex-direction: column;

				.left {
					text-align: left;
				}
				.right {
					text-align: right;
				}

				@include for-phone-only {
					display: none;
				}
			}

			.ctas {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				padding: 15px;
				gap: 5px;
				width: 100%;
			}
		}
	}
	.image {
		width: 220px;
		height: 220px;
		display: flex;
		flex-direction: column;
		justify-content: right;
		align-items: right;
		gap: 15px;
		position: relative;
	}
</style>
