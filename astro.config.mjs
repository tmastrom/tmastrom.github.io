// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	site: "https://tmastrom.github.io",
	base: "/",
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Satoshi",
			cssVariable: "--font-satoshi",
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/Satoshi-Variable.woff2"],
						weight: "100 900",
						style: "normal",
					},
				],
			},
		},
	],
});
